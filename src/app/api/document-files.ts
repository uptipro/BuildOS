import { apiFetch } from './client';
import type { DocumentFile } from '../pages/construction/types';

export const listDocumentFiles = (projectId?: string) =>
    apiFetch<DocumentFile[]>(`/document-files${projectId ? `?projectId=${projectId}` : ''}`);
export const getDocumentFile = (id: string) => apiFetch<DocumentFile>(`/document-files/${id}`);
export const createDocumentFile = (data: Partial<DocumentFile>) =>
    apiFetch<DocumentFile>(`/document-files`, { method: 'POST', body: JSON.stringify(data) });
export const updateDocumentFile = (id: string, data: Partial<DocumentFile>) =>
    apiFetch<DocumentFile>(`/document-files/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteDocumentFile = (id: string) =>
    apiFetch<void>(`/document-files/${id}`, { method: 'DELETE' });
