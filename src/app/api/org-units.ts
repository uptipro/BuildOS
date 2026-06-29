import { apiFetch } from './client';

export type OrgUnitKind = 'tier1' | 'tier2' | 'tier3' | 'craft' | 'circle';

export interface OrgUnit {
    id: string;
    name: string;
    description: string;
    kind: OrgUnitKind;
    members: number;
    archived: boolean;
    sortOrder: number;
}

export const fetchOrgUnits = (kind?: OrgUnitKind) =>
    apiFetch<OrgUnit[]>(`/org-units${kind ? `?kind=${kind}` : ''}`);
export const createOrgUnit = (data: Partial<Omit<OrgUnit, 'id'>>) =>
    apiFetch<OrgUnit>('/org-units', { method: 'POST', body: JSON.stringify(data) });
export const updateOrgUnit = (id: string, data: Partial<Omit<OrgUnit, 'id'>>) =>
    apiFetch<OrgUnit>(`/org-units/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteOrgUnit = (id: string) =>
    apiFetch<void>(`/org-units/${id}`, { method: 'DELETE' });
