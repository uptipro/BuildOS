import { apiFetch } from './client';

export interface Equipment {
    id: string;
    name: string;
    category: string;
    defaultInternalCostPerDay: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const getEquipment = () => apiFetch<Equipment[]>('/equipment');
export const getEquipmentItem = (id: string) => apiFetch<Equipment>(`/equipment/${id}`);
export const createEquipment = (data: Partial<Equipment>) =>
    apiFetch<Equipment>('/equipment', { method: 'POST', body: JSON.stringify(data) });
export const updateEquipment = (id: string, data: Partial<Equipment>) =>
    apiFetch<Equipment>(`/equipment/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteEquipment = (id: string) =>
    apiFetch<void>(`/equipment/${id}`, { method: 'DELETE' });
