import { CacheModule, type CacheModuleOptions, type CacheStore } from '@nestjs/cache-manager';
import { Global, Logger, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis-yet';
import { getRedisConnectionOptions, isRedisEnabled } from '../redis/redis.config';
import { CacheService } from './cache.service';

const DEFAULT_TTL_MS = 30_000;

/**
 * Application cache. Uses a Redis-backed store when Redis is configured and
 * falls back to a bounded in-memory store otherwise. Exposed globally so any
 * feature module can inject {@link CacheService}.
 */
@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async (): Promise<CacheModuleOptions> => {
                if (!isRedisEnabled()) {
                    return { ttl: DEFAULT_TTL_MS, max: 1000 };
                }
                try {
                    const store = await redisStore({
                        ...getRedisConnectionOptions(),
                        ttl: DEFAULT_TTL_MS,
                    });
                    return { store: store as unknown as CacheStore, ttl: DEFAULT_TTL_MS };
                } catch (error) {
                    new Logger('AppCacheModule').warn(
                        `Redis cache store init failed; using in-memory cache: ${(error as Error).message}`,
                    );
                    return { ttl: DEFAULT_TTL_MS, max: 1000 };
                }
            },
        }),
    ],
    providers: [CacheService],
    exports: [CacheModule, CacheService],
})
export class AppCacheModule {}
