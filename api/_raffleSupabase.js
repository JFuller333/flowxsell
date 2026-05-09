import { createClient } from '@supabase/supabase-js';

export function isRaffleStorageConfigured() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url?.length && key?.length);
}

/** Admin client — use only inside /api handlers (never in the browser). */
export function getRaffleSupabase() {
  if (!isRaffleStorageConfigured()) return null;
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshSession: false,
      autoRefreshToken: false,
    },
  });
}
