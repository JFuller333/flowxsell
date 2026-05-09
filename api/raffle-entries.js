import { getRaffleSupabase, isRaffleStorageConfigured } from './_raffleSupabase.js';

const RAFFLE_BUCKET = 'raffle-cards';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default async function handler(req, res) {
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!isRaffleStorageConfigured()) {
    return res.status(200).json({ configured: false, entries: [] });
  }

  const supabase = getRaffleSupabase();
  if (!supabase) {
    return res.status(200).json({ configured: false, entries: [] });
  }

  let limit = 120;
  try {
    const raw = typeof req.url === 'string' ? req.url : '';
    const query = raw.includes('?') ? raw.split('?')[1] ?? '' : '';
    for (const part of query.split('&')) {
      const [key, val] = part.split('=');
      if (key === 'limit' && val != null && val !== '') {
        const l = Number(decodeURIComponent(val));
        if (Number.isFinite(l) && l > 0) limit = Math.min(l, 250);
      }
    }
  } catch {
    /* use default limit */
  }

  const { data: rows, error } = await supabase
    .from('raffle_entries')
    .select('id, created_at, image_path')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[raffle-entries]', error.message);
    return res.status(500).json({ error: 'Could not load entries' });
  }

  const entries = (rows ?? []).map(row => ({
    id: row.id,
    createdAt: row.created_at,
    imageUrl:
      supabase.storage.from(RAFFLE_BUCKET).getPublicUrl(row.image_path)?.data?.publicUrl ?? '',
  }));

  return res.status(200).json({ configured: true, entries });
}
