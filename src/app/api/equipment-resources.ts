import { apiFetch } from './client';
import type { EquipmentResource } from '../pages/construction/types';

export const listEquipmentResources = (projectId?: string) =>
    apiFetch<EquipmentResource[]>(`/equipment-resources${projectId ? `?projectId=${projectId}` : ''}`);
export const getEquipmentResource = (id: string) => apiFetch<EquipmentResource>(`/equipment-resources/${id}`);
export const createEquipmentResource = (data: Partial<EquipmentResource>) =>
    apiFetch<EquipmentResource>(`/equipment-resources`, { method: 'POST', body: JSON.stringify(data) });
export const updateEquipmentResource = (id: string, data: Partial<EquipmentResource>) =>
    apiFetch<EquipmentResource>(`/equipment-resources/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteEquipmentResource = (id: string) =>
    apiFetch<void>(`/equipment-resources/${id}`, { method: 'DELETE' });
