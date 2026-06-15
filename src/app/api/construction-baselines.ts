import { apiFetch } from './client';
import type { ProjectBaseline } from '../pages/construction/types';

export const listConstructionBaselines = (projectId?: string) =>
    apiFetch<ProjectBaseline[]>(`/construction-baselines${projectId ? `?projectId=${projectId}` : ''}`);
export const getConstructionBaseline = (id: string) => apiFetch<ProjectBaseline>(`/construction-baselines/${id}`);
export const createConstructionBaseline = (data: Partial<ProjectBaseline>) =>
    apiFetch<ProjectBaseline>(`/construction-baselines`, { method: 'POST', body: JSON.stringify(data) });
export const updateConstructionBaseline = (id: string, data: Partial<ProjectBaseline>) =>
    apiFetch<ProjectBaseline>(`/construction-baselines/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteConstructionBaseline = (id: string) =>
    apiFetch<void>(`/construction-baselines/${id}`, { method: 'DELETE' });
