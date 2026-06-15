import { apiFetch } from './client';
import type { FundingRelease } from '../pages/construction/types';

export const listFundingReleases = (projectId?: string) =>
    apiFetch<FundingRelease[]>(`/funding-releases${projectId ? `?projectId=${projectId}` : ''}`);
export const getFundingRelease = (id: string) => apiFetch<FundingRelease>(`/funding-releases/${id}`);
export const createFundingRelease = (data: Partial<FundingRelease>) =>
    apiFetch<FundingRelease>(`/funding-releases`, { method: 'POST', body: JSON.stringify(data) });
export const updateFundingRelease = (id: string, data: Partial<FundingRelease>) =>
    apiFetch<FundingRelease>(`/funding-releases/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteFundingRelease = (id: string) =>
    apiFetch<void>(`/funding-releases/${id}`, { method: 'DELETE' });
