import { apiFetch } from './client';
import type { Delay } from '../pages/construction/types';

export const listDelays = (projectId?: string) =>
    apiFetch<Delay[]>(`/delays${projectId ? `?projectId=${projectId}` : ''}`);
export const getDelay = (id: string) => apiFetch<Delay>(`/delays/${id}`);
export const createDelay = (data: Partial<Delay>) =>
    apiFetch<Delay>(`/delays`, { method: 'POST', body: JSON.stringify(data) });
export const updateDelay = (id: string, data: Partial<Delay>) =>
    apiFetch<Delay>(`/delays/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteDelay = (id: string) =>
    apiFetch<void>(`/delays/${id}`, { method: 'DELETE' });
