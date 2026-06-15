import { apiFetch } from './client';
import type { EarnedValueData } from '../pages/construction/types';

export const listEarnedValueRecords = (projectId?: string) =>
    apiFetch<EarnedValueData[]>(`/earned-value-records${projectId ? `?projectId=${projectId}` : ''}`);
export const getEarnedValueRecord = (id: string) => apiFetch<EarnedValueData>(`/earned-value-records/${id}`);
export const createEarnedValueRecord = (data: Partial<EarnedValueData>) =>
    apiFetch<EarnedValueData>(`/earned-value-records`, { method: 'POST', body: JSON.stringify(data) });
export const updateEarnedValueRecord = (id: string, data: Partial<EarnedValueData>) =>
    apiFetch<EarnedValueData>(`/earned-value-records/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteEarnedValueRecord = (id: string) =>
    apiFetch<void>(`/earned-value-records/${id}`, { method: 'DELETE' });
