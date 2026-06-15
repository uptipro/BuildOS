import { apiFetch } from './client';
import type { ProjectCalendar } from '../pages/construction/types';

export const listConstructionCalendars = (projectId?: string) =>
    apiFetch<ProjectCalendar[]>(`/construction-calendars${projectId ? `?projectId=${projectId}` : ''}`);
export const getConstructionCalendar = (id: string) => apiFetch<ProjectCalendar>(`/construction-calendars/${id}`);
export const createConstructionCalendar = (data: Partial<ProjectCalendar>) =>
    apiFetch<ProjectCalendar>(`/construction-calendars`, { method: 'POST', body: JSON.stringify(data) });
export const updateConstructionCalendar = (id: string, data: Partial<ProjectCalendar>) =>
    apiFetch<ProjectCalendar>(`/construction-calendars/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteConstructionCalendar = (id: string) =>
    apiFetch<void>(`/construction-calendars/${id}`, { method: 'DELETE' });
