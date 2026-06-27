import type { RedisOptions } from 'ioredis';

export interface RedisConnectionConfig {
    enabled: boolean;
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    tls?: boolean;
    keyPrefix: string;
}

/**
 * Resolve Redis connection details from the environment.
 *
 * Redis is treated as OPTIONAL infrastructure: when neither `REDIS_URL` nor
 * `REDIS_HOST` is configured, every Redis-backed feature degrades gracefully
 * (in-memory cache, inline job execution, in-memory throttling). This keeps
 * local development and existing deployments working without Redis.
 */
export function getRedisConfig(): RedisConnectionConfig {
    const keyPrefix = (process.env.REDIS_KEY_PREFIX || 'buildos:').trim();
    const url = process.env.REDIS_URL?.trim();
    if (url) {
        return { enabled: true, url, keyPrefix };
    }

    const host = process.env.REDIS_HOST?.trim();
    if (host) {
        return {
            enabled: true,
            host,
            port: Number(process.env.REDIS_PORT) || 6379,
            username: process.env.REDIS_USERNAME?.trim() || undefined,
            password: process.env.REDIS_PASSWORD || undefined,
            tls: String(process.env.REDIS_TLS).toLowerCase() === 'true',
            keyPrefix,
        };
    }

    return { enabled: false, keyPrefix };
}

export function isRedisEnabled(): boolean {
    return getRedisConfig().enabled;
}

/**
 * Build ioredis connection options shared across the general client, BullMQ and
 * the throttler store. Pass `forBullmq: true` for queue connections, which
 * require `maxRetriesPerRequest: null` and the offline queue enabled.
 */
export function buildRedisOptions(overrides: RedisOptions = {}): RedisOptions {
    const cfg = getRedisConfig();
    const base: RedisOptions = {};

    if (cfg.host) {
        base.host = cfg.host;
        base.port = cfg.port;
    }
    if (cfg.username) base.username = cfg.username;
    if (cfg.password) base.password = cfg.password;
    if (cfg.tls) base.tls = {};

    return { ...base, ...overrides };
}

/**
 * Normalise the configured connection into a plain ioredis options object,
 * parsing `REDIS_URL` when present. Useful for libraries (BullMQ, cache store,
 * throttler storage) that expect an options object rather than a URL string.
 */
export function getRedisConnectionOptions(overrides: RedisOptions = {}): RedisOptions {
    const cfg = getRedisConfig();
    if (cfg.url) {
        const parsed = new URL(cfg.url);
        const options: RedisOptions = {
            host: parsed.hostname,
            port: Number(parsed.port) || 6379,
        };
        if (parsed.username) options.username = decodeURIComponent(parsed.username);
        if (parsed.password) options.password = decodeURIComponent(parsed.password);
        if (parsed.protocol === 'rediss:') options.tls = {};
        return { ...options, ...overrides };
    }
    return buildRedisOptions(overrides);
}
