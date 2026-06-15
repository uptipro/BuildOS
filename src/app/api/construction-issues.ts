import { apiFetch } from './client';
import type { Issue } from '../pages/construction/types';

export const listIssues = (projectId?: string) =>
    apiFetch<Issue[]>(`/construction-issues${projectId ? `?projectId=${projectId}` : ''}`);
export const getIssue = (id: string) => apiFetch<Issue>(`/construction-issues/${id}`);
export const createIssue = (data: Partial<Issue>) =>
    apiFetch<Issue>(`/construction-issues`, { method: 'POST', body: JSON.stringify(data) });
export const updateIssue = (id: string, data: Partial<Issue>) =>
    apiFetch<Issue>(`/construction-issues/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteIssue = (id: string) =>
    apiFetch<void>(`/construction-issues/${id}`, { method: 'DELETE' });
