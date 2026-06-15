import { apiFetch } from './client';
import type { DailyReport } from '../pages/construction/types';

export const listDailyReports = (projectId?: string) =>
    apiFetch<DailyReport[]>(`/daily-reports${projectId ? `?projectId=${projectId}` : ''}`);
export const getDailyReport = (id: string) => apiFetch<DailyReport>(`/daily-reports/${id}`);
export const createDailyReport = (data: Partial<DailyReport>) =>
    apiFetch<DailyReport>(`/daily-reports`, { method: 'POST', body: JSON.stringify(data) });
export const updateDailyReport = (id: string, data: Partial<DailyReport>) =>
    apiFetch<DailyReport>(`/daily-reports/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteDailyReport = (id: string) =>
    apiFetch<void>(`/daily-reports/${id}`, { method: 'DELETE' });
