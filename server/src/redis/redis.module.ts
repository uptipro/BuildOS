import { Global, Logger, Module } from '@nestjs/common';
import IORedis, { type Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { buildRedisOptions, getRedisConfig } from './redis.config';
import { RedisService } from './redis.service';

const logger = new Logger('RedisModule');

function createRedisClient(): Redis | null {
    const cfg = getRedisConfig();
    if (!cfg.enabled) {
        logger.warn(
            'REDIS_URL / REDIS_HOST not set — caching, queues, throttling and session features run in degraded (in-memory / inline) mode.',
        );
        return null;
    }

    const options = buildRedisOptions({
        lazyConnect: true,
        enableOfflineQueue: false,
        maxRetriesPerRequest: 2,
        connectTimeout: 10_000,
        retryStrategy: (times: number) => (times > 10 ? null : Math.min(times * 200, 2000)),
    });

    const client = cfg.url ? new IORedis(cfg.url, options) : new IORedis(options);

    let errorLogged = false;
    client.on('error', (error: Error) => {
        if (!errorLogged) {
            logger.error(`Redis connection error (continuing in degraded mode): ${error.message}`);
            errorLogged = true;
        }
    });
    client.on('connect', () => {
        logger.log('Redis connection established');
        errorLogged = false;
    });
    client.on('close', () => logger.warn('Redis connection closed'));

    // Kick off the initial connection without blocking application bootstrap.
    client.connect().catch((error: Error) => {
        logger.warn(`Initial Redis connection failed (degraded mode): ${error.message}`);
    });

    return client;
}

@Global()
@Module({
    providers: [
        {
            provide: REDIS_CLIENT,
            useFactory: createRedisClient,
        },
        RedisService,
    ],
    exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
