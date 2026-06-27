import { apiFetch } from './client';

const statusMap: Record<string, string> = {
    Active: 'Active', Planning: 'Planning', OnHold: 'On Hold',
    Completed: 'Completed', Cancelled: 'Cancelled',
};

function fmt(date: string | null) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function mapProject(p: any) {
    return {
        id: p.id,
        name: p.name,
        client: p.client ?? '',
        location: p.location ?? '',
        state: p.state ?? '',
        city: p.city ?? '',
        status: statusMap[p.status] ?? p.status,
        type: p.type,
        budget: p.budget ?? 0,
        spent: p.spent ?? 0,
        progress: p.progress ?? 0,
        startDate: fmt(p.startDate),
        endDate: fmt(p.endDate),
        manager: p.manager ?? '',
        team: p.team ?? [],
    };
}

export async function fetchProjects(params?: { status?: string; type?: string }) {
    const qs = new URLSearchParams();
    if (params?.status) qs.set('status', params.status);
    if (params?.type) qs.set('type', params.type);
    const query = qs.toString() ? `?${qs}` : '';
    const data = await apiFetch<any[]>(`/projects${query}`);
    return data.map(mapProject);
}

const ragMap: Record<string, string> = {
    Green: 'on-track', Amber: 'at-risk', Red: 'delayed',
    'on-track': 'on-track', 'at-risk': 'at-risk', delayed: 'delayed',
};

function isoDate(date: string | null | undefined) {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

/**
 * Maps a backend project DTO into the construction module's rich `Project`
 * shape, filling construction-specific fields with safe defaults when the
 * backend does not provide them.
 */
function mapConstructionProject(p: any) {
    return {
        id: p.id,
        name: p.name,
        siteAddress: p.siteAddress ?? p.location ?? '',
        client: p.client ?? '',
        projectManager: p.projectManager ?? p.manager ?? '',
        mainContractor: p.mainContractor ?? '',
        mainContractorId: p.mainContractorId ?? undefined,
        contractType: p.contractType ?? 'Lump Sum',
        plannedStartDate: isoDate(p.plannedStartDate ?? p.startDate),
        plannedEndDate: isoDate(p.plannedEndDate ?? p.endDate),
        description: p.description ?? '',
        clusterId: p.clusterId ?? '',
        status: statusMap[p.status] ?? p.status ?? 'Active',
        ragStatus: ragMap[p.ragStatus] ?? 'on-track',
        budget: p.budget ?? 0,
        spent: p.spent ?? 0,
        location: p.location ?? '',
        createdAt: isoDate(p.createdAt) || new Date().toISOString().slice(0, 10),
        lastReportDate: isoDate(p.lastReportDate) || undefined,
        setupComplete: p.setupComplete ?? false,
        setupProgress: p.setupProgress ?? 0,
    };
}

/**
 * Fetches projects from the backend and returns them in the construction
 * module's `Project` shape. Pages can fall back to mock data if this rejects
 * or returns an empty list.
 */
export async function fetchConstructionProjects(params?: { status?: string; type?: string }) {
    const qs = new URLSearchParams();
    if (params?.status) qs.set('status', params.status);
    if (params?.type) qs.set('type', params.type);
    const query = qs.toString() ? `?${qs}` : '';
    const data = await apiFetch<any[]>(`/projects${query}`);
    return data.map(mapConstructionProject);
}

export function getProject(id: string) {
    return apiFetch<any>(`/projects/${id}`);
}

/**
 * Fetches a single project from the backend and maps it into the construction
 * module's `Project` shape.
 */
export async function getConstructionProject(id: string) {
    const p = await apiFetch<any>(`/projects/${id}`);
    return mapConstructionProject(p);
}

export function createProject(data: any) {
    return apiFetch(`/projects`, { method: 'POST', body: JSON.stringify(data) });
}

export function updateProject(id: string, data: any) {
    return apiFetch(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteProject(id: string) {
    return apiFetch(`/projects/${id}`, { method: 'DELETE' });
}
