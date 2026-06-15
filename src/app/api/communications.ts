import { apiFetch } from './client';
import type { CommunicationLogEntry } from '../pages/construction/types';

export const listCommunications = (projectId?: string) =>
    apiFetch<CommunicationLogEntry[]>(`/communications${projectId ? `?projectId=${projectId}` : ''}`);
export const getCommunication = (id: string) => apiFetch<CommunicationLogEntry>(`/communications/${id}`);
export const createCommunication = (data: Partial<CommunicationLogEntry>) =>
    apiFetch<CommunicationLogEntry>(`/communications`, { method: 'POST', body: JSON.stringify(data) });
export const updateCommunication = (id: string, data: Partial<CommunicationLogEntry>) =>
    apiFetch<CommunicationLogEntry>(`/communications/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteCommunication = (id: string) =>
    apiFetch<void>(`/communications/${id}`, { method: 'DELETE' });
