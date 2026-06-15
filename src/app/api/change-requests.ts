import { apiFetch } from './client';
import type { ChangeRequest } from '../pages/construction/types';

export const listChangeRequests = (projectId?: string) =>
    apiFetch<ChangeRequest[]>(`/change-requests${projectId ? `?projectId=${projectId}` : ''}`);
export const getChangeRequest = (id: string) => apiFetch<ChangeRequest>(`/change-requests/${id}`);
export const createChangeRequest = (data: Partial<ChangeRequest>) =>
    apiFetch<ChangeRequest>(`/change-requests`, { method: 'POST', body: JSON.stringify(data) });
export const updateChangeRequest = (id: string, data: Partial<ChangeRequest>) =>
    apiFetch<ChangeRequest>(`/change-requests/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteChangeRequest = (id: string) =>
    apiFetch<void>(`/change-requests/${id}`, { method: 'DELETE' });
