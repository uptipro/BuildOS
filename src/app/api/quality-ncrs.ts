import { apiFetch } from './client';
import type { QualityNCR } from '../pages/construction/types';

export const listQualityNcrs = (projectId?: string) =>
    apiFetch<QualityNCR[]>(`/quality-ncrs${projectId ? `?projectId=${projectId}` : ''}`);
export const getQualityNcr = (id: string) => apiFetch<QualityNCR>(`/quality-ncrs/${id}`);
export const createQualityNcr = (data: Partial<QualityNCR>) =>
    apiFetch<QualityNCR>(`/quality-ncrs`, { method: 'POST', body: JSON.stringify(data) });
export const updateQualityNcr = (id: string, data: Partial<QualityNCR>) =>
    apiFetch<QualityNCR>(`/quality-ncrs/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteQualityNcr = (id: string) =>
    apiFetch<void>(`/quality-ncrs/${id}`, { method: 'DELETE' });
