import { apiFetch } from './client';
import type { MaterialResource } from '../pages/construction/types';

export const listMaterialResources = (projectId?: string) =>
    apiFetch<MaterialResource[]>(`/material-resources${projectId ? `?projectId=${projectId}` : ''}`);
export const getMaterialResource = (id: string) => apiFetch<MaterialResource>(`/material-resources/${id}`);
export const createMaterialResource = (data: Partial<MaterialResource>) =>
    apiFetch<MaterialResource>(`/material-resources`, { method: 'POST', body: JSON.stringify(data) });
export const updateMaterialResource = (id: string, data: Partial<MaterialResource>) =>
    apiFetch<MaterialResource>(`/material-resources/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteMaterialResource = (id: string) =>
    apiFetch<void>(`/material-resources/${id}`, { method: 'DELETE' });
