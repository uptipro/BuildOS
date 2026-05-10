import { Injectable } from '@nestjs/common';

export interface AppCatalogItem {
    id: string;
    name: string;
    full: string;
    tagline: string;
    icon: string;
    href: string;
    cardBg: string;
    border: string;
    stripe: string;
    accent: string;
    accentDim: string;
    textPrimary: string;
    textSecondary: string;
    cols: number;
    rows: number;
}

@Injectable()
export class AppCatalogService {
    findAll(): AppCatalogItem[] {
        return [
            {
                id: 'construction',
                name: 'Projects',
                full: 'BuildOS Projects',
                tagline: 'Site execution · Timeline · Approvals',
                icon: 'Building2',
                href: '/apps/construction',
                cardBg: '#f0f7ff',
                border: '#93c5fd',
                stripe: '#2563eb',
                accent: '#1d4ed8',
                accentDim: '#dbeafe',
                textPrimary: '#1e3a8a',
                textSecondary: '#3b82f6',
                cols: 2,
                rows: 2,
            },
            {
                id: 'finance',
                name: 'Finance',
                full: 'BuildOS Finance',
                tagline: 'Budgets · Expenses · Payroll',
                icon: 'DollarSign',
                href: '/apps/finance',
                cardBg: '#f0fdf6',
                border: '#6ee7b7',
                stripe: '#059669',
                accent: '#047857',
                accentDim: '#d1fae5',
                textPrimary: '#064e3b',
                textSecondary: '#10b981',
                cols: 1,
                rows: 2,
            },
            {
                id: 'hr',
                name: 'HR',
                full: 'BuildOS HR',
                tagline: 'People · Payroll · Leave',
                icon: 'Users',
                href: '/apps/hr',
                cardBg: '#fffbeb',
                border: '#fcd34d',
                stripe: '#d97706',
                accent: '#b45309',
                accentDim: '#fef3c7',
                textPrimary: '#78350f',
                textSecondary: '#d97706',
                cols: 1,
                rows: 1,
            },
            {
                id: 'procurement',
                name: 'Procurement',
                full: 'BuildOS Procurement',
                tagline: 'RFQ · PO · Vendor Management',
                icon: 'ShoppingCart',
                href: '/apps/procurement',
                cardBg: '#faf5ff',
                border: '#c4b5fd',
                stripe: '#7c3aed',
                accent: '#6d28d9',
                accentDim: '#ede9fe',
                textPrimary: '#4c1d95',
                textSecondary: '#7c3aed',
                cols: 1,
                rows: 1,
            },
            {
                id: 'storefront',
                name: 'Storefront',
                full: 'BuildOS Storefront',
                tagline: 'Inventory · Materials · Stores',
                icon: 'Store',
                href: '/apps/storefront',
                cardBg: '#f0fdfa',
                border: '#5eead4',
                stripe: '#0d9488',
                accent: '#0f766e',
                accentDim: '#ccfbf1',
                textPrimary: '#134e4a',
                textSecondary: '#0d9488',
                cols: 1,
                rows: 1,
            },
            {
                id: 'ess',
                name: 'ESS',
                full: 'BuildOS ESS',
                tagline: 'Self-Service · Pay Slips · Requests',
                icon: 'UserCircle',
                href: '/apps/ess',
                cardBg: '#eef2ff',
                border: '#a5b4fc',
                stripe: '#4f46e5',
                accent: '#4338ca',
                accentDim: '#e0e7ff',
                textPrimary: '#312e81',
                textSecondary: '#6366f1',
                cols: 1,
                rows: 1,
            },
            {
                id: 'admin',
                name: 'Admin',
                full: 'BuildOS Admin',
                tagline: 'Users · Roles · System Settings',
                icon: 'Settings',
                href: '/apps/admin',
                cardBg: '#f8fafc',
                border: '#cbd5e1',
                stripe: '#475569',
                accent: '#334155',
                accentDim: '#e2e8f0',
                textPrimary: '#0f172a',
                textSecondary: '#64748b',
                cols: 2,
                rows: 1,
            },
        ];
    }
}
