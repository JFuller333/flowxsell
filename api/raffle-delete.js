import { getRaffleSupabase, isRaffleStorageConfigured } from './_raffleSupabase.js';

const RAFFLE_BUCKET = 'raffle-cards';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Raffle-Admin',
  };
}

export default async function handler(req, res) {
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = process.env.RAFFLE_ADMIN_KEY;
  if (!adminKey || adminKey.length < 8) {
    return res.status(503).json({ error: 'Admin key not configured on server' });
  }
  const sent = typeof req.headers['x-raffle-admin'] === 'string' ? req.headers['x-raffle-admin'] : '';
  if (sent !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!isRaffleStorageConfigured()) {
    return res.status(503).json({ error: 'Raffle storage is not configured on the server' });
  }
  const supabase = getRaffleSupabase();
  if (!supabase) {
    return res.status(503).json({ error: 'Raffle storage is not configured on the server' });
  }

  const id = typeof req.body?.id === 'string' ? req.body.id.trim() : '';
  if (!id) return res.status(400).json({ error: 'id is required' });

  const { data: row, error: fetchErr } = await supabase
    .from('raffle_entries')
    .select('image_path')
    .eq('id', id)
    .single();

  if (fetchErr || !row) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  const { error: storageErr } = await supabase.storage.from(RAFFLE_BUCKET).remove([row.image_path]);
  if (storageErr) {
    console.error('[raffle-delete] storage:', storageErr.message);
    return res.status(500).json({ error: 'Could not delete image file' });
  }

  const { error: dbErr } = await supabase.from('raffle_entries').delete().eq('id', id);
  if (dbErr) {
    console.error('[raffle-delete] db:', dbErr.message);
    return res.status(500).json({ error: 'Image removed but DB row delete failed' });
  }

  return res.status(200).json({ ok: true });
}
