import { clearAuthSession, ensureValidAccessToken } from '../utils/authSession';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/$/, '');

export async function apiFetch<T = any>(path: string, options?: RequestInit): Promise<T> {
    const token = await ensureValidAccessToken();

    const doFetch = (authToken: string | null) =>
        fetch(`${BASE_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                ...options?.headers,
            },
            ...options,
        });

    let res = await doFetch(token);
    if (res.status === 401) {
        const refreshedToken = await ensureValidAccessToken();
        if (!refreshedToken) {
            clearAuthSession();
            throw new Error('Session expired. Please log in again.');
        }
        res = await doFetch(refreshedToken);
    }

    if (!res.ok) {
        const text = await res.text();
        if (res.status === 401) {
            clearAuthSession();
            throw new Error('Session expired. Please log in again.');
        }
        throw new Error(`API error ${res.status}: ${text}`);
    }

    const statusNoContent = res.status === 204;
    if (statusNoContent) {
        return undefined as T;
    }

    return (await res.json()) as T;
}
