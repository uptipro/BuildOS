import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

/**
 * Thin, fault-tolerant wrapper around the shared ioredis client.
 *
 * Every method is safe to call even when Redis is unavailable or disabled:
 * reads return `null`/empty, writes return `false`, and errors are swallowed
 * (logged at debug level) so a Redis outage never breaks a request path.
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly logger = new Logger(RedisService.name);

    constructor(@Inject(REDIS_CLIENT) private readonly client: Redis | null) {}

    /** Whether a Redis client is configured (does not guarantee a live connection). */
    get isEnabled(): boolean {
        return this.client !== null;
    }

    getClient(): Redis | null {
        return this.client;
    }

    private async safe<T>(op: (client: Redis) => Promise<T>, fallback: T): Promise<T> {
        if (!this.client) return fallback;
        try {
            return await op(this.client);
        } catch (error) {
            this.logger.debug(`Redis operation failed: ${(error as Error).message}`);
            return fallback;
        }
    }

    getRaw(key: string): Promise<string | null> {
        return this.safe((client) => client.get(key), null);
    }

    async getJson<T>(key: string): Promise<T | null> {
        const raw = await this.getRaw(key);
        if (raw == null) return null;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    setRaw(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
        return this.safe(async (client) => {
            if (ttlSeconds && ttlSeconds > 0) {
                await client.set(key, value, 'EX', ttlSeconds);
            } else {
                await client.set(key, value);
            }
            return true;
        }, false);
    }

    setJson(key: string, value: unknown, ttlSeconds?: number): Promise<boolean> {
        return this.setRaw(key, JSON.stringify(value), ttlSeconds);
    }

    del(...keys: string[]): Promise<number> {
        if (keys.length === 0) return Promise.resolve(0);
        return this.safe((client) => client.del(...keys), 0);
    }

    /** Delete every key matching a glob pattern using a non-blocking SCAN loop. */
    delByPattern(pattern: string): Promise<number> {
        return this.safe(async (client) => {
            let cursor = '0';
            let removed = 0;
            do {
                const [next, keys] = await client.scan(cursor, 'MATCH', pattern, 'COUNT', 250);
                cursor = next;
                if (keys.length > 0) {
                    removed += await client.del(...keys);
                }
            } while (cursor !== '0');
            return removed;
        }, 0);
    }

    incrBy(key: string, amount = 1): Promise<number> {
        return this.safe((client) => client.incrby(key, amount), 0);
    }

    expire(key: string, ttlSeconds: number): Promise<boolean> {
        return this.safe(async (client) => (await client.expire(key, ttlSeconds)) === 1, false);
    }

    exists(key: string): Promise<boolean> {
        return this.safe(async (client) => (await client.exists(key)) === 1, false);
    }

    sAdd(key: string, ...members: string[]): Promise<number> {
        if (members.length === 0) return Promise.resolve(0);
        return this.safe((client) => client.sadd(key, ...members), 0);
    }

    sIsMember(key: string, member: string): Promise<boolean> {
        return this.safe(async (client) => (await client.sismember(key, member)) === 1, false);
    }

    async ping(): Promise<boolean> {
        return this.safe(async (client) => (await client.ping()) === 'PONG', false);
    }

    onModuleDestroy(): void {
        if (!this.client) return;
        this.client.quit().catch(() => this.client?.disconnect());
    }
}
