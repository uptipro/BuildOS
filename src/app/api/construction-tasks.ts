import { apiFetch } from './client';
import type { Task } from '../pages/construction/types';

export const listConstructionTasks = (projectId?: string) =>
    apiFetch<Task[]>(`/construction-tasks${projectId ? `?projectId=${projectId}` : ''}`);
export const getConstructionTask = (id: string) => apiFetch<Task>(`/construction-tasks/${id}`);
export const createConstructionTask = (data: Partial<Task>) =>
    apiFetch<Task>(`/construction-tasks`, { method: 'POST', body: JSON.stringify(data) });
export const updateConstructionTask = (id: string, data: Partial<Task>) =>
    apiFetch<Task>(`/construction-tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteConstructionTask = (id: string) =>
    apiFetch<void>(`/construction-tasks/${id}`, { method: 'DELETE' });
