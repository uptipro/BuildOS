import { apiFetch } from './client';

export interface VisitorLogEntry {
    id: string;
    projectId?: string;
    date: string;
    name: string;
    organization: string;
    purpose: string;
    host: string;
    badgeNumber?: string;
}

export const listVisitorLogs = (projectId?: string) =>
    apiFetch<VisitorLogEntry[]>(`/visitor-logs${projectId ? `?projectId=${projectId}` : ''}`);
export const getVisitorLog = (id: string) => apiFetch<VisitorLogEntry>(`/visitor-logs/${id}`);
export const createVisitorLog = (data: Partial<VisitorLogEntry>) =>
    apiFetch<VisitorLogEntry>(`/visitor-logs`, { method: 'POST', body: JSON.stringify(data) });
export const updateVisitorLog = (id: string, data: Partial<VisitorLogEntry>) =>
    apiFetch<VisitorLogEntry>(`/visitor-logs/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteVisitorLog = (id: string) =>
    apiFetch<void>(`/visitor-logs/${id}`, { method: 'DELETE' });
