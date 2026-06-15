import { apiFetch } from './client';
import type { DocumentFolder } from '../pages/construction/types';

export const listDocumentFolders = (projectId?: string) =>
    apiFetch<DocumentFolder[]>(`/document-folders${projectId ? `?projectId=${projectId}` : ''}`);
export const getDocumentFolder = (id: string) => apiFetch<DocumentFolder>(`/document-folders/${id}`);
export const createDocumentFolder = (data: Partial<DocumentFolder>) =>
    apiFetch<DocumentFolder>(`/document-folders`, { method: 'POST', body: JSON.stringify(data) });
export const updateDocumentFolder = (id: string, data: Partial<DocumentFolder>) =>
    apiFetch<DocumentFolder>(`/document-folders/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteDocumentFolder = (id: string) =>
    apiFetch<void>(`/document-folders/${id}`, { method: 'DELETE' });
