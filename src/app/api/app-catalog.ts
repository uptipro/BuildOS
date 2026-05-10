import { apiFetch } from './client';

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

export function fetchAppCatalog() {
    return apiFetch<AppCatalogItem[]>('/app-catalog');
}
