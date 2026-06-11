export interface SupabaseConfigStatus {
  configured: boolean;
  missing: string[];
}

const requiredEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const;

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
