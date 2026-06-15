import { apiFetch } from './client';

export interface ContractorApi {
    id: string;
    name: string;
    trade: string;
    payRate: number;
    payRateUnit: 'daily' | 'weekly' | 'monthly' | 'lump-sum';
    skilledCount: number;
    unskilledCount: number;
    manDays: number;
    status: 'Active' | 'Completed' | 'Terminated';
    mobile?: string;
    email?: string;
}

function mapContractor(c: any): ContractorApi {
    return {
        id: c.id,
        name: c.name,
        trade: c.trade,
        payRate: c.payRate ?? 0,
        payRateUnit: c.payRateUnit ?? 'daily',
        skilledCount: c.skilledCount ?? 0,
        unskilledCount: c.unskilledCount ?? 0,
        manDays: c.manDays ?? 0,
        status: c.status ?? 'Active',
        mobile: c.mobile ?? undefined,
        email: c.email ?? undefined,
    };
}

export async function listContractors(): Promise<ContractorApi[]> {
    const data = await apiFetch<any[]>('/contractors');
    return (data ?? []).map(mapContractor);
}

export async function createContractor(data: Record<string, any>): Promise<ContractorApi> {
    const res = await apiFetch<any>('/contractors', { method: 'POST', body: JSON.stringify(data) });
    return mapContractor(res);
}

export async function updateContractor(id: string, data: Record<string, any>): Promise<ContractorApi> {
    const res = await apiFetch<any>(`/contractors/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    return mapContractor(res);
}

export async function deleteContractor(id: string): Promise<void> {
    await apiFetch(`/contractors/${id}`, { method: 'DELETE' });
}
