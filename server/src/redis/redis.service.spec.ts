import { RedisService } from './redis.service';

describe('RedisService', () => {
    describe('when Redis is disabled (null client)', () => {
        const svc = new RedisService(null as never);

        it('reports disabled', () => expect(svc.isEnabled).toBe(false));
        it('getRaw returns null', async () => expect(await svc.getRaw('k')).toBeNull());
        it('getJson returns null', async () => expect(await svc.getJson('k')).toBeNull());
        it('setRaw returns false', async () => expect(await svc.setRaw('k', 'v')).toBe(false));
        it('setJson returns false', async () => expect(await svc.setJson('k', { a: 1 })).toBe(false));
        it('del returns 0', async () => expect(await svc.del('k')).toBe(0));
        it('exists returns false', async () => expect(await svc.exists('k')).toBe(false));
    });

    describe('with a working client', () => {
        const makeClient = (overrides: Record<string, unknown> = {}) => ({
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue('OK'),
            del: jest.fn().mockResolvedValue(1),
            ...overrides,
        });

        it('getJson parses stored JSON', async () => {
            const client = makeClient({ get: jest.fn().mockResolvedValue(JSON.stringify({ a: 1 })) });
            const svc = new RedisService(client as never);
            expect(await svc.getJson('k')).toEqual({ a: 1 });
        });

        it('setJson stringifies the value with a TTL', async () => {
            const client = makeClient();
            const svc = new RedisService(client as never);
            const ok = await svc.setJson('k', { a: 1 }, 30);
            expect(ok).toBe(true);
            expect(client.set).toHaveBeenCalledWith('k', JSON.stringify({ a: 1 }), 'EX', 30);
        });

        it('swallows client errors and returns the fallback', async () => {
            const client = makeClient({ get: jest.fn().mockRejectedValue(new Error('down')) });
            const svc = new RedisService(client as never);
            expect(await svc.getRaw('k')).toBeNull();
        });
    });
});
