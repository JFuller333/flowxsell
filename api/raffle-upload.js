import { randomUUID } from 'node:crypto';
import { getRaffleSupabase, isRaffleStorageConfigured } from './_raffleSupabase.js';

const RAFFLE_BUCKET = 'raffle-cards';
/** Max JPEG size after decoding (~2 MiB payload). */
const MAX_BYTES = 2_097_152;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Raffle-Secret',
  };
}

function isLikelyJpeg(buf) {
  return buf.length > 10 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function parseBase64Image(body) {
  const raw = typeof body.imageBase64 === 'string' ? body.imageBase64.trim() : '';
  if (!raw) return { error: 'imageBase64 is required' };

  let b64 = raw;
  const dataMatch = /^data:image\/jpeg;base64,(.+)$/i.exec(raw);
  if (dataMatch) b64 = dataMatch[1];
  try {
    const buf = Buffer.from(b64, 'base64');
    if (buf.byteLength === 0) return { error: 'Invalid base64 image' };
    if (buf.byteLength > MAX_BYTES) return { error: 'Image too large (max ~2 MB after decode)' };
    if (!isLikelyJpeg(buf)) return { error: 'Only JPEG uploads are accepted' };
    return { buffer: buf };
  } catch {
    return { error: 'Could not decode image' };
  }
}

export default async function handler(req, res) {
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.RAFFLE_UPLOAD_SECRET;
  if (secret && typeof secret === 'string' && secret.length > 0) {
    const sent = typeof req.headers['x-raffle-secret'] === 'string' ? req.headers['x-raffle-secret'] : '';
    if (sent !== secret) return res.status(403).json({ error: 'Not allowed' });
  }

  if (!isRaffleStorageConfigured()) {
    return res.status(503).json({ configured: false, error: 'Raffle storage is not configured on the server' });
  }

  const supabase = getRaffleSupabase();
  if (!supabase) {
    return res.status(503).json({ configured: false, error: 'Raffle storage is not configured on the server' });
  }

  const parsed = parseBase64Image(req.body ?? {});
  if ('error' in parsed) return res.status(400).json({ error: parsed.error });

  const fileName = `${randomUUID()}.jpg`;

  const { error: uploadErr } = await supabase.storage
    .from(RAFFLE_BUCKET)
    .upload(fileName, parsed.buffer, { contentType: 'image/jpeg', upsert: false });

  if (uploadErr) {
    console.error('[raffle-upload] storage:', uploadErr.message);
    return res.status(500).json({ error: 'Could not store image. Check Supabase bucket "raffle-cards" exists and is writable.' });
  }

  const { data: inserted, error: insertErr } = await supabase
    .from('raffle_entries')
    .insert({ image_path: fileName })
    .select('id, created_at, image_path')
    .single();

  if (insertErr || !inserted) {
    console.error('[raffle-upload] db:', insertErr?.message ?? 'insert failed');
    try {
      await supabase.storage.from(RAFFLE_BUCKET).remove([fileName]);
    } catch {
      /* best-effort cleanup */
    }
    return res.status(500).json({ error: 'Could not save raffle entry.' });
  }

  const imageUrl =
    supabase.storage.from(RAFFLE_BUCKET).getPublicUrl(inserted.image_path)?.data?.publicUrl ?? '';

  return res.status(200).json({
    configured: true,
    entry: {
      id: inserted.id,
      createdAt: inserted.created_at,
      imageUrl,
    },
  });
}
