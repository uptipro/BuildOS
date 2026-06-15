import { apiFetch } from './client';
import type { HSEMatrix } from '../pages/construction/types';

export const listHseRecords = (projectId?: string) =>
    apiFetch<HSEMatrix[]>(`/hse-records${projectId ? `?projectId=${projectId}` : ''}`);
export const getHseRecord = (id: string) => apiFetch<HSEMatrix>(`/hse-records/${id}`);
export const createHseRecord = (data: Partial<HSEMatrix>) =>
    apiFetch<HSEMatrix>(`/hse-records`, { method: 'POST', body: JSON.stringify(data) });
export const updateHseRecord = (id: string, data: Partial<HSEMatrix>) =>
    apiFetch<HSEMatrix>(`/hse-records/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteHseRecord = (id: string) =>
    apiFetch<void>(`/hse-records/${id}`, { method: 'DELETE' });
