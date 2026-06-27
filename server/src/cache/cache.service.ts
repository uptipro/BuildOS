import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Cache } from 'cache-manager';

/**
 * Fault-tolerant caching helper over the configured cache-manager store
 * (Redis when available, in-memory otherwise). All cache failures are
 * swallowed so a cache outage degrades to a direct read rather than an error.
 */
@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get<T>(key: string): Promise<T | undefined> {
        try {
            return (await this.cache.get<T>(key)) ?? undefined;
        } catch {
            return undefined;
        }
    }

    async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
        try {
            await this.cache.set(key, value, ttlMs);
        } catch (error) {
            this.logger.debug(`Cache set failed for ${key}: ${(error as Error).message}`);
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.cache.del(key);
        } catch {
            /* ignore */
        }
    }

    /**
     * Return the cached value for `key`, or compute it via `factory`, cache it,
     * and return it. Cache errors never prevent returning a freshly computed value.
     */
    async getOrSet<T>(key: string, factory: () => Promise<T>, ttlMs?: number): Promise<T> {
        const cached = await this.get<T>(key);
        if (cached !== undefined) {
            return cached;
        }
        const value = await factory();
        await this.set(key, value, ttlMs);
        return value;
    }
}
