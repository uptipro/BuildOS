import { apiFetch } from './client';
import type { Disbursement } from '../pages/construction/types';

export const listDisbursements = (projectId?: string) =>
    apiFetch<Disbursement[]>(`/disbursements${projectId ? `?projectId=${projectId}` : ''}`);
export const getDisbursement = (id: string) => apiFetch<Disbursement>(`/disbursements/${id}`);
export const createDisbursement = (data: Partial<Disbursement>) =>
    apiFetch<Disbursement>(`/disbursements`, { method: 'POST', body: JSON.stringify(data) });
export const updateDisbursement = (id: string, data: Partial<Disbursement>) =>
    apiFetch<Disbursement>(`/disbursements/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteDisbursement = (id: string) =>
    apiFetch<void>(`/disbursements/${id}`, { method: 'DELETE' });
