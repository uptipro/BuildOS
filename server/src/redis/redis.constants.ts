export const REDIS_CLIENT = 'REDIS_CLIENT';

/**
 * Centralised key namespaces so every Redis-backed feature uses a predictable,
 * collision-free prefix. Keep raw client keys un-prefixed at the connection
 * level (so SCAN/MATCH works) and namespace explicitly through these helpers.
 */
export const RedisKeys = {
    cache: (suffix: string) => `cache:${suffix}`,
    session: (userId: string) => `session:${userId}`,
    refreshToken: (userId: string) => `auth:refresh:${userId}`,
    tokenDenylist: (jti: string) => `auth:denylist:${jti}`,
    userTokenVersion: (userId: string) => `auth:tokenver:${userId}`,
    userRevokedAt: (userId: string) => `auth:revokedat:${userId}`,
} as const;
