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
