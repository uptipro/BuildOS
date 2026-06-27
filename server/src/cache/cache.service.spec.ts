import { CacheService } from './cache.service';

describe('CacheService', () => {
    const makeCache = (overrides: Record<string, unknown> = {}) => ({
        get: jest.fn().mockResolvedValue(undefined),
        set: jest.fn().mockResolvedValue(undefined),
        del: jest.fn().mockResolvedValue(undefined),
        ...overrides,
    });

    it('returns the cached value', async () => {
        const cache = makeCache({ get: jest.fn().mockResolvedValue('v') });
        const svc = new CacheService(cache as never);
        expect(await svc.get('k')).toBe('v');
    });

    it('returns undefined when the cache throws', async () => {
        const cache = makeCache({ get: jest.fn().mockRejectedValue(new Error('x')) });
        const svc = new CacheService(cache as never);
        expect(await svc.get('k')).toBeUndefined();
    });

    it('getOrSet computes and caches on a miss', async () => {
        const cache = makeCache();
        const svc = new CacheService(cache as never);
        const factory = jest.fn().mockResolvedValue(42);
        const result = await svc.getOrSet('k', factory, 1000);
        expect(result).toBe(42);
        expect(factory).toHaveBeenCalledTimes(1);
        expect(cache.set).toHaveBeenCalledWith('k', 42, 1000);
    });

    it('getOrSet returns the cached value without calling the factory on a hit', async () => {
        const cache = makeCache({ get: jest.fn().mockResolvedValue('cached') });
        const svc = new CacheService(cache as never);
        const factory = jest.fn();
        const result = await svc.getOrSet('k', factory);
        expect(result).toBe('cached');
        expect(factory).not.toHaveBeenCalled();
    });
});
