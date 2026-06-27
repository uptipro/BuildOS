import { apiFetch } from './client';
import type { ConstructionSetting } from '../pages/construction/types';

export const listConstructionSettings = (projectId?: string) =>
    apiFetch<ConstructionSetting[]>(`/construction-settings${projectId ? `?projectId=${projectId}` : ''}`);
export const getConstructionSetting = (id: string) => apiFetch<ConstructionSetting>(`/construction-settings/${id}`);
export const createConstructionSetting = (data: Partial<ConstructionSetting>) =>
    apiFetch<ConstructionSetting>(`/construction-settings`, { method: 'POST', body: JSON.stringify(data) });
export const updateConstructionSetting = (id: string, data: Partial<ConstructionSetting>) =>
    apiFetch<ConstructionSetting>(`/construction-settings/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteConstructionSetting = (id: string) =>
    apiFetch<void>(`/construction-settings/${id}`, { method: 'DELETE' });

// Project configuration (types + statuses) — persisted as JSON collections.
export const getProjectTypes = () => apiFetch<any[]>('/project-types');
export const saveProjectTypes = (types: any[]) =>
    apiFetch<any[]>('/project-types', { method: 'PUT', body: JSON.stringify({ types }) });
export const getProjectStatuses = () => apiFetch<any[]>('/project-statuses');
export const saveProjectStatuses = (statuses: any[]) =>
    apiFetch<any[]>('/project-statuses', { method: 'PUT', body: JSON.stringify({ statuses }) });
