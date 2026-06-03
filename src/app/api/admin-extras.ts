import { apiFetch } from './client';

export interface AppUser {
    id: string; name: string; email: string; role: string;
    department?: string; position?: string; status: string;
    lastLogin?: string; createdAt: string;
}
export interface AppRole {
    id: string; name: string; description?: string;
    permissions: string[] | Record<string, unknown>;
    isSystem?: boolean;
    isSuper?: boolean;
    createdAt: string;
}
export interface AdminSystemSummary {
    users: number;
    roles: number;
    activeSessions: number;
    pendingApprovals: number;
    openTickets?: number;
    usersThisMonth: number;
    pendingInvites: number;
    healthPercent: number;
    health: { status: string; uptimeSeconds: number; checkedAt: string };
}
export interface AdminActivity {
    id: string;
    actor: string;
    action: string;
    subject: string;
    status: string;
    date: string;
}

export interface IssueTypeConfig {
    id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    color: string;
    slaHours: number;
    active: boolean;
}

export interface ChangeCategoryConfig {
    id: string;
    name: string;
    description: string;
}

export interface UnitOfMeasurement {
    id: string;
    name: string;
    abbreviation: string;
    category: string;
    baseUnit: string;
    conversionFactor: number;
}

export interface EmailTemplateConfig {
    id: string;
    name: string;
    subject: string;
    trigger: string;
}

export interface NotificationRuleConfig {
    id: string;
    name: string;
    event: string;
    recipients: string;
    channels: string[];
    enabled: boolean;
}

export const getAdminSystemSummary = () =>
    apiFetch<AdminSystemSummary>('/admin/system-summary');
export const getAdminActivityLog = () =>
    apiFetch<AdminActivity[]>('/admin/activity-log');
export const getAuditLogs = (params?: { limit?: number; offset?: number }) => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set('limit', params.limit.toString());
    if (params?.offset) qs.set('offset', params.offset.toString());
    const query = qs.toString() ? `?${qs}` : '';
    return apiFetch<any[]>(`/audit-logs${query}`);
};
export const inviteUser = (data: { email: string; name: string; role: string }) =>
    apiFetch<{
        id: string;
        email: string;
        inviteToken: string;
        activationLink: string;
        inviteEmailSent: boolean;
    }>(
        '/admin/users/invite', { method: 'POST', body: JSON.stringify(data) }
    );

// Users
export const getUsers = (search?: string) =>
    apiFetch<AppUser[]>(search ? `/users?search=${encodeURIComponent(search)}` : '/users');
export const getUser = (id: string) => apiFetch<AppUser>(`/users/${id}`);
export const createUser = (data: Partial<AppUser> & { password?: string }) =>
    apiFetch<AppUser>('/users', { method: 'POST', body: JSON.stringify(data) });
export const updateUser = (id: string, data: Partial<AppUser> & { password?: string }) =>
    apiFetch<AppUser>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteUser = (id: string) =>
    apiFetch<void>(`/users/${id}`, { method: 'DELETE' });

// App Roles
export const getAppRoles = () => apiFetch<AppRole[]>('/app-roles');
export const getAppRole = (id: string) => apiFetch<AppRole>(`/app-roles/${id}`);
export const createAppRole = (data: Partial<AppRole>) =>
    apiFetch<AppRole>('/app-roles', { method: 'POST', body: JSON.stringify(data) });
export const updateAppRole = (id: string, data: Partial<AppRole>) =>
    apiFetch<AppRole>(`/app-roles/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAppRole = (id: string) =>
    apiFetch<void>(`/app-roles/${id}`, { method: 'DELETE' });

// Issue Types
export const getIssueTypes = () => apiFetch<IssueTypeConfig[]>('/admin/issue-types');
export const createIssueType = (data: Omit<IssueTypeConfig, 'id'>) =>
    apiFetch<IssueTypeConfig>('/admin/issue-types', { method: 'POST', body: JSON.stringify(data) });
export const updateIssueType = (id: string, data: Partial<Omit<IssueTypeConfig, 'id'>>) =>
    apiFetch<IssueTypeConfig>(`/admin/issue-types/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteIssueType = (id: string) =>
    apiFetch<{ ok: boolean }>(`/admin/issue-types/${id}`, { method: 'DELETE' });

// Change Categories
export const getChangeCategories = () => apiFetch<ChangeCategoryConfig[]>('/admin/change-categories');
export const createChangeCategory = (data: Omit<ChangeCategoryConfig, 'id'>) =>
    apiFetch<ChangeCategoryConfig>('/admin/change-categories', { method: 'POST', body: JSON.stringify(data) });
export const updateChangeCategory = (id: string, data: Partial<Omit<ChangeCategoryConfig, 'id'>>) =>
    apiFetch<ChangeCategoryConfig>(`/admin/change-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteChangeCategory = (id: string) =>
    apiFetch<{ ok: boolean }>(`/admin/change-categories/${id}`, { method: 'DELETE' });

// Units of Measurement
export const getUnits = () => apiFetch<UnitOfMeasurement[]>('/admin-extras/units');
export const createUnit = (data: Omit<UnitOfMeasurement, 'id'>) =>
    apiFetch<UnitOfMeasurement>('/admin-extras/units', { method: 'POST', body: JSON.stringify(data) });
export const updateUnit = (id: string, data: Partial<Omit<UnitOfMeasurement, 'id'>>) =>
    apiFetch<UnitOfMeasurement>(`/admin-extras/units/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteUnit = (id: string) =>
    apiFetch<{ ok: boolean }>(`/admin-extras/units/${id}`, { method: 'DELETE' });

// Notifications & Templates
export const getEmailTemplates = () =>
    apiFetch<EmailTemplateConfig[]>('/admin-extras/email-templates');
export const getNotificationRules = () =>
    apiFetch<NotificationRuleConfig[]>('/admin-extras/notification-rules');

// Company Profile
export interface CompanyProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    logoUrl?: string | null;
    updatedAt?: string;
}
export const getCompanyProfile = () => apiFetch<CompanyProfile>('/company-profile');
export const updateCompanyProfile = (data: Partial<CompanyProfile>) =>
    apiFetch<CompanyProfile>('/company-profile', { method: 'PUT', body: JSON.stringify(data) });

// Directors
export interface Director {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    designation: string;
    sequence: number;
    createdAt?: string;
    updatedAt?: string;
}
export const getDirectors = () => apiFetch<Director[]>('/directors');
export const createDirector = (data: Omit<Director, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiFetch<Director>('/directors', { method: 'POST', body: JSON.stringify(data) });
export const updateDirector = (id: string, data: Partial<Director>) =>
    apiFetch<Director>(`/directors/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteDirector = (id: string) =>
    apiFetch<void>(`/directors/${id}`, { method: 'DELETE' });