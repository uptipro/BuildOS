import { apiFetch } from './client';
import type { FundingAllocation } from '../pages/construction/types';

export const listFundingAllocations = (projectId?: string) =>
    apiFetch<FundingAllocation[]>(`/funding-allocations${projectId ? `?projectId=${projectId}` : ''}`);
export const getFundingAllocation = (id: string) => apiFetch<FundingAllocation>(`/funding-allocations/${id}`);
export const createFundingAllocation = (data: Partial<FundingAllocation>) =>
    apiFetch<FundingAllocation>(`/funding-allocations`, { method: 'POST', body: JSON.stringify(data) });
export const updateFundingAllocation = (id: string, data: Partial<FundingAllocation>) =>
    apiFetch<FundingAllocation>(`/funding-allocations/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteFundingAllocation = (id: string) =>
    apiFetch<void>(`/funding-allocations/${id}`, { method: 'DELETE' });
