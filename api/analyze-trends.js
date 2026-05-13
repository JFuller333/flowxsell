import Anthropic from '@anthropic-ai/sdk';
import { cleanEnv } from './_shopifyClient.js';
import { computeShopifyMetrics } from './shopify-metrics.js';

// POST /api/analyze-trends
// Same Claude path as generate-landing-page: ANTHROPIC_API_KEY, optional ANTHROPIC_MODEL,
// Anthropic Messages API + json_schema + adaptive thinking.
// Body: { range?, framework?, industry?, targetingClaim?, question?, ga4Paste?, metaPaste?, shopifySnapshot? }

const DEFAULT_MODEL = 'claude-sonnet-4-6';

const ALLOWED_RANGE = new Set([30, 60, 90, 180, 270]);

const FRAMEWORK_IDS = new Set([
  'north_star',
  'funnel_conversion',
  'channel_mix',
  'incrementality_guardrails',
  'seasonality_baseline',
  'strategic_alignment',
  'executive_memo',
]);

const BI_OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    executiveSummary: {
      type: 'string',
      description:
        'Three to five sentences. Lead with whether the data supports confident conclusions. Mention industry only as general patterns, not specific competitors.',
    },
    truthAndDataQuality: {
      type: 'string',
      description:
        'Plain English: what data we have, time window, Shopify vs GA4 vs Meta coverage, obvious gaps, prod vs test unknowns. Say what cannot be concluded from missing inputs.',
    },
    directionVsData: {
      type: 'string',
      description:
        'Compare the user targeting/strategy claim to the numbers: supported, weakly supported, contradicted, or unknown. Separate evidence strength from opinion.',
    },
    risksAndGaps: {
      type: 'string',
      description: 'Risks, contradictions between sources, vanity metrics, cohort blind spots, and what would invalidate the story.',
    },
    industryAndEmergingContext: {
      type: 'string',
      description:
        'Typical patterns in the stated industry and emerging trends that could matter, clearly labeled as general context, not verified facts about this merchant.',
    },
    recommendations: {
      type: 'string',
      description:
        'Prioritized next steps: metrics to watch, experiments, data pulls, or stakeholder questions. Use short bullets separated by newlines inside this string.',
    },
  },
  required: [
    'executiveSummary',
    'truthAndDataQuality',
    'directionVsData',
    'risksAndGaps',
    'industryAndEmergingContext',
    'recommendations',
  ],
};

const SYSTEM = `You are a principal BI / analytics partner for a commerce team.

Rules:
- Do not invent statistics. Only interpret what is in the user payload.
- Always address whether conclusions are trustworthy given data quality and coverage.
- Always address whether the merchant's stated targeting/strategy is directionally right given the evidence, or where the data is silent.
- Prefer plain English. Short paragraphs and bullets inside string fields are fine.
- Return STRICTLY JSON conforming to the provided schema. No prose outside the JSON.`;

function normalizeFramework(v) {
  const s = typeof v === 'string' ? v.trim() : '';
  return FRAMEWORK_IDS.has(s) ? s : 'strategic_alignment';
}

function frameworkLensBlock(id) {
  const blocks = {
    north_star: `Analysis lens: NORTH STAR & MEASUREMENT SANITY
- Name the implied north-star metric from the data (e.g. revenue, orders, efficiency).
- Check definitions: are we mixing revenue with GMV, sessions with users, paid vs all traffic?
- Flag vanity metrics and suggest one better diagnostic if the data allows.`,
    funnel_conversion: `Analysis lens: FUNNEL / CONVERSION
- Walk sessions → orders logic only with numbers provided; do not assume missing funnel steps.
- Identify the biggest drop-off the data can actually support vs where data ends.
- Tie recommendations to measurable funnel checks.`,
    channel_mix: `Analysis lens: CHANNEL & MIX
- If GA4/Meta pastes exist, interpret channel or spend story vs Shopify revenue/orders timing.
- If channel data is missing, say so clearly and limit conclusions to Shopify-only signals.`,
    incrementality_guardrails: `Analysis lens: INCREMENTALITY & CAUSATION GUARDRAILS
- Separate correlation from causation. What would a skeptic say?
- List what an experiment or holdout would be needed to prove.`,
    seasonality_baseline: `Analysis lens: SEASONALITY & BASELINE
- Comment on window length vs volatility; avoid overfitting short windows.
- Compare current period to internal baselines only if present in payload.`,
    strategic_alignment: `Analysis lens: STRATEGIC ALIGNMENT
- Explicitly test the user's targeting/strategy claim against the strongest contradictory and supportive signals in the data.`,
    executive_memo: `Analysis lens: EXECUTIVE MEMO
- Decision-first: what to believe, what not to, and what to do next in the fewest words while still covering truth and direction.`,
  };
  return blocks[id] || blocks.strategic_alignment;
}

function formatShopifyPayloadForPrompt(m) {
  const lines = [];
  lines.push('=== SHOPIFY DATA (same link as dashboard) ===');
  lines.push(`Store: ${m.storeDomain ?? '(unknown)'}`);
  lines.push(`Sample/demo fixture: ${m.isDemo ? 'yes' : 'no'}`);
  lines.push(`Window: last ${m.range} days`);
  if (m.sessionsSource) lines.push(`Sessions: ${m.sessionsSource}`);
  const s = m.summary;
  lines.push(
    `Revenue $${Math.round(s.revenue).toLocaleString('en-US')} | Orders ${s.orders} | AOV $${Number(s.aov).toFixed(2)} | CVR ${Number(s.cvr).toFixed(2)}%`,
  );
  lines.push(
    `Internal prior-period baseline: revenue $${Math.round(s.prevRevenue).toLocaleString('en-US')}, orders ${s.prevOrders}, CVR ${Number(s.prevCvr).toFixed(2)}%`,
  );
  if (Array.isArray(m.insights) && m.insights.length) {
    lines.push('Signals:');
    for (const i of m.insights) lines.push(`- [${i.kind}] ${i.title}, ${i.detail}`);
  }
  if (Array.isArray(m.topProducts) && m.topProducts.length) {
    lines.push('Top products (revenue):');
    for (const p of m.topProducts.slice(0, 8)) {
      lines.push(
        `- ${p.title}: $${Math.round(p.revenue).toLocaleString('en-US')}, ${p.units} units, CVR ~${Number(p.cvr).toFixed(2)}%`,
      );
    }
  }
  lines.push('Recent daily (last 7 buckets in window):');
  const ts = m.timeseries || [];
  for (const p of ts.slice(-7)) {
    lines.push(`- ${p.date}: revenue $${Math.round(p.revenue)}, sessions ${p.sessions ?? 0}`);
  }
  if (!m.trafficSources?.length) {
    lines.push('Channel mix: not in Admin export, use GA4 paste if you have it.');
  }
  return lines.join('\n');
}

function joinReportMarkdown(r) {
  if (!r || typeof r !== 'object') return '';
  const order = [
    ['Executive summary', 'executiveSummary'],
    ['Truth & data quality', 'truthAndDataQuality'],
    ['Direction vs your targeting', 'directionVsData'],
    ['Risks & gaps', 'risksAndGaps'],
    ['Industry & emerging context', 'industryAndEmergingContext'],
    ['Recommendations', 'recommendations'],
  ];
  const parts = [];
  for (const [title, key] of order) {
    const v = r[key];
    if (typeof v === 'string' && v.trim()) parts.push(`## ${title}\n\n${v.trim()}`);
  }
  return parts.join('\n\n');
}

function mockBiResult(shopifySource, industry, framework) {
  const ind = industry?.trim() ? ` (${industry.trim()})` : '';
  const fw = framework.replace(/_/g, ' ');
  return {
    executiveSummary: `Demo mode, add ANTHROPIC_API_KEY to flowxsell/.env and restart npm run dev:full for a full structured BI report${ind}. Framework selected: ${fw}.`,
    truthAndDataQuality:
      shopifySource === 'live'
        ? 'Live Shopify metrics were loaded on the server. GA4/Meta blocks depend on what you pasted; missing pastes mean channel conclusions are limited.'
        : shopifySource === 'client_demo'
          ? 'Shopify text came from the browser (demo fixture or manual paste). Treat all numbers as unverified until reconciled to a system of record.'
          : 'No Shopify payload was available for this demo response.',
    directionVsData:
      'With demo mode, the model does not run, add the API key to test whether your targeting claim is supported by your real metrics.',
    risksAndGaps: 'Without live AI, we cannot stress-test assumptions or list contradictions automatically.',
    industryAndEmergingContext:
      'General industry patterns are not generated in demo mode. After enabling the key, this section will anchor to your stated industry without inventing competitor facts.',
    recommendations:
      '- Set ANTHROPIC_API_KEY in .env\n- Restart dev:full\n- Re-run BI Analysis with the same framework dropdown',
  };
}

function buildUserPrompt({
  shopifyText,
  industry,
  targetingClaim,
  question,
  ga4Paste,
  metaPaste,
  framework,
}) {
  return [
    frameworkLensBlock(framework),
    '',
    '--- USER INPUTS ---',
    `Industry: ${industry?.trim() || '(not specified)'}`,
    `Targeting / strategy claim (what we believe we are doing): ${targetingClaim?.trim() || '(not specified, say conclusions on direction are limited)'}`,
    `Additional question: ${question?.trim() || '(none)'}`,
    '',
    shopifyText || '(No Shopify block)',
    '',
    '=== GA4 (user paste) ===',
    ga4Paste?.trim() || '(none)',
    '',
    '=== META / ADS (user paste) ===',
    metaPaste?.trim() || '(none)',
  ].join('\n');
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST required' });
    return;
  }

  const body = readBody(req);
  const range = ALLOWED_RANGE.has(Number(body.range)) ? Number(body.range) : 30;
  const framework = normalizeFramework(body.framework);
  const industry = typeof body.industry === 'string' ? body.industry : '';
  const targetingClaim = typeof body.targetingClaim === 'string' ? body.targetingClaim : '';
  const question = typeof body.question === 'string' ? body.question : '';
  const ga4Paste = typeof body.ga4Paste === 'string' ? body.ga4Paste : '';
  const metaPaste = typeof body.metaPaste === 'string' ? body.metaPaste : '';
  const clientSnapshot = typeof body.shopifySnapshot === 'string' ? body.shopifySnapshot.trim() : '';

  let shopifyText = '';
  let shopifySource = 'none';

  const live = await computeShopifyMetrics(range);
  if (live.ok) {
    shopifyText = formatShopifyPayloadForPrompt(live.data);
    shopifySource = 'live';
  } else if (clientSnapshot) {
    shopifyText = clientSnapshot.slice(0, 14000);
    shopifySource = 'client_demo';
  }

  if (!shopifyText && !ga4Paste.trim() && !metaPaste.trim()) {
    res.status(400).json({
      error:
        'No data to analyze. Connect Shopify in .env (same as the dashboard), or paste GA4 / Meta notes, or load the page so the Shopify box fills from demo data.',
    });
    return;
  }

  const apiKey = cleanEnv(process.env.ANTHROPIC_API_KEY || '');
  if (!apiKey) {
    const result = mockBiResult(shopifySource, industry, framework);
    res.status(200).json({
      isDemo: true,
      llm: 'mock',
      shopifySource,
      framework,
      result,
      analysis: joinReportMarkdown(result),
    });
    return;
  }

  const model = cleanEnv(process.env.ANTHROPIC_MODEL || '') || DEFAULT_MODEL;
  const userPrompt = buildUserPrompt({
    shopifyText,
    industry,
    targetingClaim,
    question,
    ga4Paste,
    metaPaste,
    framework,
  });

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model,
      max_tokens: 8192,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: BI_OUTPUT_SCHEMA },
      },
      system: SYSTEM,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock?.text) {
      res.status(502).json({ error: 'Model returned no text content' });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(textBlock.text);
    } catch (e) {
      console.error('[analyze-trends] JSON parse failed:', textBlock.text.slice(0, 500));
      res.status(502).json({ error: 'Model returned non-JSON content' });
      return;
    }

    res.status(200).json({
      isDemo: false,
      llm: 'anthropic',
      model,
      shopifySource,
      framework,
      result: parsed,
      analysis: joinReportMarkdown(parsed),
    });
  } catch (err) {
    console.error('[analyze-trends] Anthropic error:', err);
    const status = typeof err?.status === 'number' ? err.status : 500;
    const msg = err?.message || 'Anthropic call failed';
    res.status(status >= 400 && status < 600 ? status : 500).json({ error: msg });
  }
}
