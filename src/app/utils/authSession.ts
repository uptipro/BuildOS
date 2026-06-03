const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/$/, '');

type TokenPayload = {
  exp?: number;
  sub?: string;
  email?: string;
  role?: string;
};

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    assignedApps?: string[];
  };
};

let refreshInFlight: Promise<string | null> | null = null;

function decodeJwtPayload(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}

function isExpired(token: string, skewSeconds = 10): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  return payload.exp <= Math.floor(Date.now() / 1000) + skewSeconds;
}

export function clearAuthSession() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('auth_user');
}

export function saveAuthSession(data: {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    assignedApps?: string[];
  };
}) {
  localStorage.setItem('auth_token', data.accessToken);
  localStorage.setItem('refresh_token', data.refreshToken);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
}

export function hasValidAuthSession(): boolean {
  const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (!token || !refreshToken) return false;
  if (isExpired(refreshToken, 0)) return false;
  return !isExpired(token, 0) || !isExpired(refreshToken, 0);
}

async function requestTokenRefresh(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken || isExpired(refreshToken, 0)) {
    clearAuthSession();
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      clearAuthSession();
      return null;
    }

    const data = (await res.json()) as RefreshResponse;
    saveAuthSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: data.user,
    });

    return data.access_token;
  } catch {
    clearAuthSession();
    return null;
  }
}

export async function ensureValidAccessToken(): Promise<string | null> {
  const token = localStorage.getItem('auth_token');
  if (!token) return null;

  if (!isExpired(token)) return token;

  if (!refreshInFlight) {
    refreshInFlight = requestTokenRefresh().finally(() => {
      refreshInFlight = null;
    });
  }

  return refreshInFlight;
}

export function getAccessTokenUnsafe() {
  return localStorage.getItem('auth_token');
}

export function isAccessTokenExpired(): boolean {
  const token = localStorage.getItem('auth_token');
  if (!token) return true;
  return isExpired(token, 0);
}

export async function logoutServerSideIfPossible(): Promise<void> {
  const token = getAccessTokenUnsafe();
  if (!token || isExpired(token, 0)) return;

  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Ignore network/logout failures on client-side sign out.
  }
}
