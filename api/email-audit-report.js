import { Resend } from 'resend';

const OVERALL_SCORE_MAX = 4;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PAYLOAD_CHARS = 450_000;

function scoreLabel(s) {
  if (s >= 3.5) return 'Excellent';
  if (s >= 2.5) return 'Good';
  if (s >= 1.5) return 'Needs Work';
  return 'Critical';
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isPlainObject(x) {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}

/** Light validation — enough to reject garbage / wrong shape. */
function isValidAuditPayload(result) {
  if (!isPlainObject(result)) return false;
  if (typeof result.storeUrl !== 'string' || result.storeUrl.length > 2048) return false;
  if (!isPlainObject(result.scores) || typeof result.scores.overall !== 'number') return false;
  if (!isPlainObject(result.dimensions)) return false;
  if (!isPlainObject(result.shopify)) return false;
  if (!isPlainObject(result.scores.dimensions)) return false;
  if (!Array.isArray(result.leaks)) return false;
  return true;
}

function buildTextReport(result) {
  const lines = [];
  lines.push('FlowXsell — Store scan summary');
  lines.push('');
  lines.push(`Store: ${result.storeUrl}`);
  lines.push(`Product page: ${result.productUrl ?? 'None (homepage used)'}`);
  lines.push(
    `Shopify: ${result.shopify.isShopify ? `Yes (${result.shopify.confidence})` : 'No'}`
  );
  lines.push('');
  const overall = result.scores.overall;
  lines.push(
    `Overall score: ${overall.toFixed(2)} / ${OVERALL_SCORE_MAX.toFixed(2)} — ${scoreLabel(overall)}`
  );
  lines.push('');
  lines.push('Dimensions:');
  for (const [key, dim] of Object.entries(result.dimensions)) {
    const avg = result.scores.dimensions[key];
    if (typeof avg !== 'number') continue;
    lines.push(`• ${dim.label}: ${avg.toFixed(2)} / 4`);
  }
  if (result.leaks.length > 0) {
    lines.push('');
    lines.push(`Areas to revisit (${result.leaks.length}):`);
    result.leaks.slice(0, 20).forEach((leak, i) => {
      const label = result.itemLabels?.[leak.dim]?.[leak.id] ?? leak.id;
      const dimLabel = result.dimensions[leak.dim]?.label ?? leak.dim;
      lines.push(`${i + 1}. [${dimLabel}] ${label} — ${leak.leak}`);
    });
    if (result.leaks.length > 20) {
      lines.push(`…and ${result.leaks.length - 20} more on the full report page.`);
    }
  }
  lines.push('');
  lines.push(
    `Generated ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`
  );
  let text = lines.join('\n');
  if (text.length > 7500) text = `${text.slice(0, 7470)}\n…(truncated)`;
  return text;
}

function buildHtmlReport(result) {
  const overall = result.scores.overall;
  const dimRows = Object.entries(result.dimensions)
    .map(([key, dim]) => {
      const avg = result.scores.dimensions[key];
      if (typeof avg !== 'number') return '';
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;">${escapeHtml(dim.label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:600;">${avg.toFixed(2)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#666;">/ 4</td></tr>`;
    })
    .join('');

  const leakBlocks = result.leaks.slice(0, 12).map(leak => {
    const label = result.itemLabels?.[leak.dim]?.[leak.id] ?? leak.id;
    const dimLabel = result.dimensions[leak.dim]?.label ?? leak.dim;
    return `
      <div style="margin-bottom:16px;padding:14px;background:#fdf2f2;border-radius:8px;border-left:4px solid #ef4444;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#111;">${escapeHtml(label)} <span style="color:#666;font-weight:400;">· ${escapeHtml(dimLabel)}</span></p>
        <p style="margin:0;font-size:15px;line-height:1.45;color:#7f1d1d;">${escapeHtml(leak.leak)}</p>
      </div>`;
  });

  const moreLeaks =
    result.leaks.length > 12
      ? `<p style="font-size:14px;color:#666;">+ ${result.leaks.length - 12} more on your scan page.</p>`
      : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#171717;line-height:1.5;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="margin:0 0 24px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:#16a34a;font-weight:600;">FlowXsell · Store scan</p>
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;">Your scan results</h1>
    <p style="margin:0 0 28px;font-size:15px;color:#525252;">
      <a href="${escapeHtml(result.storeUrl)}" style="color:#171717;font-weight:500;">${escapeHtml(result.storeUrl)}</a>
    </p>
    <div style="padding:24px;background:#fff;border-radius:12px;border:1px solid #e5e5e5;margin-bottom:20px;text-align:center;">
      <p style="margin:0 0 4px;font-size:13px;color:#737373;text-transform:uppercase;letter-spacing:0.06em;">Overall score</p>
      <p style="margin:0;font-size:42px;font-weight:800;line-height:1;letter-spacing:-0.02em;">${overall.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#737373;"> / ${OVERALL_SCORE_MAX.toFixed(2)}</span></p>
      <p style="margin:8px 0 0;font-size:15px;color:#404040;font-weight:500;">${escapeHtml(scoreLabel(overall))}</p>
      <p style="margin:12px 0 0;font-size:14px;color:#525252;">
        Product page: ${result.productUrl ? `<a href="${escapeHtml(result.productUrl)}" style="color:#16a34a;">view</a>` : escapeHtml('None (homepage used)')}
      </p>
      <p style="margin:6px 0 0;font-size:14px;color:#525252;">
        Shopify: ${result.shopify.isShopify ? `Yes (${escapeHtml(result.shopify.confidence)})` : 'No'}
      </p>
    </div>
    <div style="padding:20px;background:#fff;border-radius:12px;border:1px solid #e5e5e5;margin-bottom:20px;">
      <h2 style="margin:0 0 14px;font-size:16px;">Dimension breakdown</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        ${dimRows}
      </table>
    </div>
    ${
      result.leaks.length
        ? `
    <div style="padding:20px;background:#fff;border-radius:12px;border:1px solid #e5e5e5;margin-bottom:20px;">
      <h2 style="margin:0 0 14px;font-size:16px;">Worth a closer look</h2>
      ${leakBlocks.join('')}
      ${moreLeaks}
    </div>`
        : ''
    }
    <p style="font-size:12px;color:#a3a3a3;text-align:center;margin-top:28px;">
      Sent by FlowXsell · ${escapeHtml(new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }))}
    </p>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || typeof apiKey !== 'string' || !from || typeof from !== 'string') {
    return res.status(503).json({
      error:
        'Email delivery is not configured. Add RESEND_API_KEY and RESEND_FROM (verified sender) in production or .env locally.',
    });
  }

  let body;
  try {
    body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const rawSize =
    typeof req.body === 'string'
      ? req.body.length
      : JSON.stringify(body ?? {}).length;
  if (rawSize > MAX_PAYLOAD_CHARS) {
    return res.status(413).json({ error: 'Report payload too large.' });
  }

  const toRaw = typeof body.to === 'string' ? body.to.trim() : '';
  if (!toRaw || !EMAIL_RE.test(toRaw)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const { result } = body;
  if (!isValidAuditPayload(result)) {
    return res.status(400).json({ error: 'Invalid report data.' });
  }

  const host = String(result.storeUrl)
    .replace(/^https?:\/\//i, '')
    .split('/')[0]
    .slice(0, 80);
  const subject = `FlowXsell store scan — ${host || 'your store'}`;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [toRaw],
      subject,
      text: buildTextReport(result),
      html: buildHtmlReport(result),
    });

    if (error) {
      console.error('[email-audit-report] Resend:', error);
      return res.status(502).json({ error: error.message || 'Could not send email.' });
    }

    return res.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('[email-audit-report]', err);
    return res.status(500).json({ error: err.message || 'Server error sending email.' });
  }
}
