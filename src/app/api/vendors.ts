import { apiFetch } from './client';
import type { Vendor } from '../pages/construction/types';

function mapVendor(v: any): Vendor {
    return {
        id: v.id,
        projectId: v.projectId ?? '',
        name: v.name,
        trade: v.trade,
        contractType: v.contractType ?? 'Labor-only',
        isNominated: v.isNominated ?? false,
        contractSum: v.contractSum ?? 0,
        assignedWorkPackages: v.assignedWorkPackages ?? [],
        blockAssignment: v.blockAssignment ?? '',
        skilledCount: v.skilledCount ?? 0,
        unskilledCount: v.unskilledCount ?? 0,
        mandaysEstimate: v.mandaysEstimate ?? 0,
        status: v.status ?? 'Awarded',
        skilledDays: v.skilledDays ?? undefined,
        skilledRate: v.skilledRate ?? undefined,
        unskilledDays: v.unskilledDays ?? undefined,
        unskilledRate: v.unskilledRate ?? undefined,
        vendorMargin: v.vendorMargin ?? undefined,
        isMainContractor: v.isMainContractor ?? undefined,
        subcontractorIds: v.subcontractorIds ?? undefined,
        parentContractorId: v.parentContractorId ?? undefined,
        representatives: v.representatives ?? undefined,
    };
}

export async function listVendors(projectId?: string): Promise<Vendor[]> {
    const query = projectId ? `?projectId=${encodeURIComponent(projectId)}` : '';
    const data = await apiFetch<any[]>(`/vendors${query}`);
    return (data ?? []).map(mapVendor);
}

export async function createVendor(data: Record<string, any>): Promise<Vendor> {
    const res = await apiFetch<any>('/vendors', { method: 'POST', body: JSON.stringify(data) });
    return mapVendor(res);
}

export async function updateVendor(id: string, data: Record<string, any>): Promise<Vendor> {
    const res = await apiFetch<any>(`/vendors/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    return mapVendor(res);
}

export async function deleteVendor(id: string): Promise<void> {
    await apiFetch(`/vendors/${id}`, { method: 'DELETE' });
}
