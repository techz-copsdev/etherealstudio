import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the service role key when available (bypasses RLS for admin writes),
 * falls back to anon key for read-only access. Returns null if env is missing.
 */

let serverClient: SupabaseClient | null | undefined;

export function getServerSupabase(): SupabaseClient | null {
  if (serverClient !== undefined) return serverClient;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !key) {
    serverClient = null;
    return null;
  }

  try {
    serverClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    return serverClient;
  } catch {
    serverClient = null;
    return null;
  }
}

/** True when both URL and any key are configured. */
export function isSupabaseAvailable(): boolean {
  return getServerSupabase() !== null;
}
