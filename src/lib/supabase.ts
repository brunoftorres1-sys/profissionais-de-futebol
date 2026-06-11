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
