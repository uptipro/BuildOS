import { apiFetch } from './client';

export interface Cluster {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export const getClusters = () => apiFetch<Cluster[]>('/clusters');
export const getCluster = (id: string) => apiFetch<Cluster>(`/clusters/${id}`);
export const createCluster = (data: Partial<Cluster>) =>
    apiFetch<Cluster>('/clusters', { method: 'POST', body: JSON.stringify(data) });
export const updateCluster = (id: string, data: Partial<Cluster>) =>
    apiFetch<Cluster>(`/clusters/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteCluster = (id: string) =>
    apiFetch<void>(`/clusters/${id}`, { method: 'DELETE' });
