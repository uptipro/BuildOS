import { ForbiddenException, UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { JwtAuthGuard } from './jwt-auth.guard';

const SECRET = 'test-secret';

interface MockMeta {
    isPublic?: boolean;
    roles?: string[];
    permissions?: string[];
    requiredApps?: string[];
}

function makeContext(meta: MockMeta, headers: Record<string, string> = {}): {
    context: ExecutionContext;
    request: { headers: Record<string, string>; user?: unknown };
} {
    const request: { headers: Record<string, string>; user?: unknown } = { headers };
    const context = {
        switchToHttp: () => ({ getRequest: () => request }),
        getHandler: () => () => undefined,
        getClass: () => class {},
    } as unknown as ExecutionContext;
    return { context, request };
}

function makeReflector(meta: MockMeta) {
    return {
        getAllAndOverride: (key: string) => (meta as Record<string, unknown>)[key],
    } as unknown as ConstructorParameters<typeof JwtAuthGuard>[0];
}

function makeRedis(overrides: Partial<{ isEnabled: boolean; revokedAt: string | null }> = {}) {
    return {
        isEnabled: overrides.isEnabled ?? false,
        getRaw: jest.fn().mockResolvedValue(overrides.revokedAt ?? null),
    } as unknown as ConstructorParameters<typeof JwtAuthGuard>[1];
}

function token(payload: Record<string, unknown>): string {
    return sign(payload, SECRET);
}

describe('JwtAuthGuard', () => {
    beforeEach(() => {
        process.env.JWT_SECRET = SECRET;
    });

    it('allows public routes with no token', async () => {
        const guard = new JwtAuthGuard(makeReflector({ isPublic: true }), makeRedis());
        const { context } = makeContext({ isPublic: true });
        await expect(guard.canActivate(context)).resolves.toBe(true);
    });

    it('rejects protected routes with no token (401)', async () => {
        const guard = new JwtAuthGuard(makeReflector({}), makeRedis());
        const { context } = makeContext({});
        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('rejects protected routes with an invalid token (401)', async () => {
        const guard = new JwtAuthGuard(makeReflector({}), makeRedis());
        const { context } = makeContext({}, { authorization: 'Bearer not-a-real-token' });
        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('allows a valid token when no roles are required and sets request.user', async () => {
        const guard = new JwtAuthGuard(makeReflector({}), makeRedis());
        const { context, request } = makeContext(
            {},
            { authorization: `Bearer ${token({ sub: 'u1', email: 'a@b.c', role: 'staff' })}` },
        );
        await expect(guard.canActivate(context)).resolves.toBe(true);
        expect((request.user as { sub: string }).sub).toBe('u1');
    });

    it('enforces required roles (403 when missing)', async () => {
        const meta = { roles: ['admin'] };
        const guard = new JwtAuthGuard(makeReflector(meta), makeRedis());
        const { context } = makeContext(meta, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'staff' })}`,
        });
        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('allows when the user has the required role (case-insensitive)', async () => {
        const meta = { roles: ['Admin'] };
        const guard = new JwtAuthGuard(makeReflector(meta), makeRedis());
        const { context } = makeContext(meta, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'admin' })}`,
        });
        await expect(guard.canActivate(context)).resolves.toBe(true);
    });

    it('rejects a token issued before a revocation marker (401)', async () => {
        const guard = new JwtAuthGuard(
            makeReflector({}),
            makeRedis({ isEnabled: true, revokedAt: '9999999999' }),
        );
        const { context } = makeContext({}, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'staff' })}`,
        });
        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('allows a token issued after the revocation marker', async () => {
        const guard = new JwtAuthGuard(
            makeReflector({}),
            makeRedis({ isEnabled: true, revokedAt: '1' }),
        );
        const { context } = makeContext({}, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'staff' })}`,
        });
        await expect(guard.canActivate(context)).resolves.toBe(true);
    });

    it('allows when the user has a required app', async () => {
        const meta = { requiredApps: ['hr'] };
        const guard = new JwtAuthGuard(makeReflector(meta), makeRedis());
        const { context } = makeContext(meta, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'staff', assignedApps: ['hr', 'ess'] })}`,
        });
        await expect(guard.canActivate(context)).resolves.toBe(true);
    });

    it('denies when the user lacks the required app (403)', async () => {
        const meta = { requiredApps: ['hr'] };
        const guard = new JwtAuthGuard(makeReflector(meta), makeRedis());
        const { context } = makeContext(meta, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'staff', assignedApps: ['construction'] })}`,
        });
        await expect(guard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('lets admins bypass app restrictions', async () => {
        const meta = { requiredApps: ['hr'] };
        const guard = new JwtAuthGuard(makeReflector(meta), makeRedis());
        const { context } = makeContext(meta, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'admin', assignedApps: [] })}`,
        });
        await expect(guard.canActivate(context)).resolves.toBe(true);
    });

    it('allows legacy tokens without an assignedApps claim (backward compat)', async () => {
        const meta = { requiredApps: ['hr'] };
        const guard = new JwtAuthGuard(makeReflector(meta), makeRedis());
        const { context } = makeContext(meta, {
            authorization: `Bearer ${token({ sub: 'u1', role: 'staff' })}`,
        });
        await expect(guard.canActivate(context)).resolves.toBe(true);
    });
});
