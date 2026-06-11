export interface SupabaseConfigStatus {
  configured: boolean;
  missing: string[];
}

export interface SupabaseSession {
  accessToken: string;
  expiresAt?: number;
  refreshToken?: string;
  user?: unknown;
}

const requiredEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const;
const sessionKey = 'futurocraque-supabase-session';

function supabaseUrl() {
  return String(import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
}

function anonKey() {
  return String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');
}

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const missing = requiredEnv.filter((key) => !import.meta.env[key]);

  return {
    configured: missing.length === 0,
    missing,
  };
}

export function assertSupabaseReady() {
  const status = getSupabaseConfigStatus();

  if (!status.configured) {
    throw new Error(`Supabase nao configurado. Variaveis ausentes: ${status.missing.join(', ')}`);
  }
}

export function getGoogleOAuthUrl() {
  assertSupabaseReady();

  const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin;
  const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL).replace(/\/$/, '');
  const redirectTo = encodeURIComponent(`${siteUrl}/dashboard`);

  return `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;
}

export function saveSupabaseSession(session: SupabaseSession) {
  localStorage.setItem(sessionKey, JSON.stringify(session));
}

export function getSupabaseSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(sessionKey);
    return raw ? (JSON.parse(raw) as SupabaseSession) : null;
  } catch {
    return null;
  }
}

export function clearSupabaseSession() {
  localStorage.removeItem(sessionKey);
}

export function consumeOAuthSessionFromUrl() {
  if (!window.location.hash.includes('access_token=')) {
    return null;
  }

  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get('access_token');

  if (!accessToken) {
    return null;
  }

  const expiresIn = Number(params.get('expires_in') || 0);
  const session: SupabaseSession = {
    accessToken,
    expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
    refreshToken: params.get('refresh_token') || undefined,
  };

  saveSupabaseSession(session);
  window.history.replaceState({}, '', window.location.pathname || '/dashboard');
  return session;
}

async function supabaseFetch<T>(path: string, options: RequestInit = {}) {
  assertSupabaseReady();

  const session = getSupabaseSession();
  const headers = new Headers(options.headers);
  headers.set('apikey', anonKey());
  headers.set('Authorization', `Bearer ${session?.accessToken || anonKey()}`);

  if (!headers.has('Content-Type') && !(options.body instanceof FormData) && !(options.body instanceof Blob)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${supabaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase ${response.status}: ${details}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function signUpWithEmail(email: string, password: string, metadata: Record<string, unknown>) {
  return supabaseFetch('/auth/v1/signup', {
    body: JSON.stringify({
      data: metadata,
      email,
      password,
    }),
    method: 'POST',
  });
}

export async function signInWithPassword(email: string, password: string) {
  const result = await supabaseFetch<{
    access_token: string;
    expires_in?: number;
    refresh_token?: string;
    user?: unknown;
  }>('/auth/v1/token?grant_type=password', {
    body: JSON.stringify({ email, password }),
    method: 'POST',
  });

  saveSupabaseSession({
    accessToken: result.access_token,
    expiresAt: result.expires_in ? Date.now() + result.expires_in * 1000 : undefined,
    refreshToken: result.refresh_token,
    user: result.user,
  });

  return result;
}

export async function restSelect<T>(table: string, query = 'select=*') {
  return supabaseFetch<T[]>(`/rest/v1/${table}?${query}`);
}

export async function restInsert<T>(table: string, payload: unknown) {
  return supabaseFetch<T[]>(`/rest/v1/${table}`, {
    body: JSON.stringify(payload),
    headers: {
      Prefer: 'return=representation',
    },
    method: 'POST',
  });
}

export async function uploadVideoToStorage(file: File, path: string) {
  assertSupabaseReady();

  const session = getSupabaseSession();
  const response = await fetch(`${supabaseUrl()}/storage/v1/object/athlete-videos/${path}`, {
    body: file,
    headers: {
      apikey: anonKey(),
      Authorization: `Bearer ${session?.accessToken || anonKey()}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Upload Supabase ${response.status}: ${await response.text()}`);
  }

  return response.json();
}
