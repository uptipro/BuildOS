import { apiFetch } from './client';
import type { HumanResource } from '../pages/construction/types';

export const listHumanResources = (projectId?: string) =>
    apiFetch<HumanResource[]>(`/human-resources${projectId ? `?projectId=${projectId}` : ''}`);
export const getHumanResource = (id: string) => apiFetch<HumanResource>(`/human-resources/${id}`);
export const createHumanResource = (data: Partial<HumanResource>) =>
    apiFetch<HumanResource>(`/human-resources`, { method: 'POST', body: JSON.stringify(data) });
export const updateHumanResource = (id: string, data: Partial<HumanResource>) =>
    apiFetch<HumanResource>(`/human-resources/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteHumanResource = (id: string) =>
    apiFetch<void>(`/human-resources/${id}`, { method: 'DELETE' });
