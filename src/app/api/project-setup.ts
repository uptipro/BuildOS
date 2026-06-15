import { apiFetch } from './client';

export interface ProjectSetupPayload {
    basicInfo?: any;
    projectType?: any;
    humanResources?: any;
    dailyReporting?: any;
    materials?: any;
    equipment?: any;
    calendar?: any;
    schedule?: any;
    setupComplete?: boolean;
    setupLocked?: boolean;
    currentStep?: number;
    completedSteps?: number[];
    auditLog?: any[];
}

export function getProjectSetup(projectId: string) {
    return apiFetch<ProjectSetupPayload | null>(`/project-setup/${projectId}`);
}

export function saveProjectSetup(projectId: string, payload: ProjectSetupPayload) {
    return apiFetch<ProjectSetupPayload>(`/project-setup/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export function lockProjectSetup(projectId: string, performedBy?: string) {
    return apiFetch<ProjectSetupPayload>(`/project-setup/${projectId}/lock`, {
        method: 'POST',
        body: JSON.stringify({ performedBy }),
    });
}

export function unlockProjectSetup(projectId: string, reason: string, performedBy?: string) {
    return apiFetch<ProjectSetupPayload>(`/project-setup/${projectId}/unlock`, {
        method: 'POST',
        body: JSON.stringify({ reason, performedBy }),
    });
}
