import Anthropic from '@anthropic-ai/sdk';
import { cleanEnv, shopifyCreds, shopifyGraphQL } from './_shopifyClient.js';

// POST /api/generate-landing-page
// Body: { productId, goal: "conversion"|"awareness"|"upsell",
//         trafficSource: "organic"|"paid_social"|"email", hypothesis?: string }
//
// Live: Anthropic Messages API + structured JSON (ANTHROPIC_API_KEY).
// Without a key: returns static demo copy so /generate still works locally.

const DEFAULT_MODEL = 'claude-sonnet-4-6';

const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    headlines: {
      type: 'array',
      description: 'Exactly three distinct headline options, each under 12 words. Return exactly 3 items.',
      items: { type: 'string' },
    },
    heroCopy: {
      type: 'string',
      description: 'Two-to-three sentence hero subhead. No fluff, lead with the strongest specific value claim.',
    },
    keyPoints: {
      type: 'array',
      description: 'Between three and five concise selling points. Concrete benefits, not vague adjectives. Return 3 to 5 items.',
      items: { type: 'string' },
    },
    ctaText: {
      type: 'string',
      description: 'Short, action-oriented CTA button copy (under 5 words).',
    },
    layoutRecommendation: {
      type: 'string',
      description:
        'Two-to-three sentence prescription for the above-the-fold layout — what goes where and why, given traffic source and goal.',
    },
    seoTitle: { type: 'string', description: 'SEO title tag, under 60 chars.' },
    seoDescription: { type: 'string', description: 'SEO meta description, 140–160 chars.' },
  },
  required: ['headlines', 'heroCopy', 'keyPoints', 'ctaText', 'layoutRecommendation', 'seoTitle', 'seoDescription'],
};

const PRODUCT_QUERY = `
  query Product($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      description
      variants(first: 5) { edges { node { title price inventoryQuantity } } }
    }
  }
`;

async function loadProduct(productId) {
  if (!shopifyCreds().configured) return null;
  const r = await shopifyGraphQL(PRODUCT_QUERY, { id: productId });
  if (!r.ok || !r.data?.product) return null;
  const p = r.data.product;
  const variants = (p.variants?.edges || []).map((e) => e.node);
  const top = variants.sort((a, b) => (b.inventoryQuantity || 0) - (a.inventoryQuantity || 0))[0];
  return {
    title: p.title,
    handle: p.handle,
    description: (p.description || '').slice(0, 600),
    price: parseFloat(top?.price || variants[0]?.price || '0'),
    topVariant: top?.title || null,
  };
}

// Mock product table used when Shopify isn't connected — mirrors mock-data.ts entries.
const MOCK_PRODUCTS = {
  'gid://shopify/Product/1': {
    title: "Let's Rebuild Tuskegee — Founders Edition Tee",
    handle: 'founders-edition-tee',
    description:
      'Premium heavyweight tee honoring the rebuild of Tuskegee. Embroidered crest, ringspun cotton, made for everyday wear.',
    price: 42,
    topVariant: 'L / Black',
    cvr: 4.8,
    revenue: 18420,
  },
  'gid://shopify/Product/2': {
    title: 'Heritage Hoodie',
    handle: 'heritage-hoodie',
    description: 'Cream-on-black heritage hoodie with raised embroidery. Brushed inner fleece, drop-shoulder fit.',
    price: 78,
    topVariant: 'M / Cream',
    cvr: 3.2,
    revenue: 24960,
  },
  'gid://shopify/Product/3': {
    title: 'Campus Cap',
    handle: 'campus-cap',
    description: 'Six-panel structured cap with vintage block lettering. Adjustable strap, unisex.',
    price: 32,
    topVariant: 'OS / Maroon',
    cvr: 2.1,
    revenue: 6080,
  },
  'gid://shopify/Product/4': {
    title: "Builder's Tote",
    handle: 'builders-tote',
    description: 'Canvas tote engineered for carry. Reinforced base, screen-printed mark, gusseted bottom.',
    price: 28,
    topVariant: 'OS / Natural',
    cvr: 5.6,
    revenue: 8260,
  },
  'gid://shopify/Product/5': {
    title: 'Rebuild Crewneck',
    handle: 'rebuild-crewneck',
    description: 'Mid-weight crewneck. Tonal embroidery, side seam, pre-shrunk.',
    price: 68,
    topVariant: 'L / Stone',
    cvr: 2.9,
    revenue: 15640,
  },
  'gid://shopify/Product/6': {
    title: 'Legacy Beanie',
    handle: 'legacy-beanie',
    description: 'Cuffed knit beanie in soft acrylic-wool blend. Embroidered patch.',
    price: 24,
    topVariant: 'OS / Black',
    cvr: 3.7,
    revenue: 3120,
  },
};

const SYSTEM = `You are a senior conversion copywriter and landing-page strategist working with a Shopify merchant.

You write copy that:
- Leads with the buyer's specific outcome, not generic adjectives.
- Reflects the traffic source's intent (paid social = pattern interrupt, organic = clarity & match, email = continuation of the warm relationship).
- Is honest, specific, and free of AI clichés like "elevate", "unlock", "transform your X", "in today's fast-paced world", or emoji.

You are working with real product data and real store performance. Use the numbers when they're given. Do not make up stats.

Return STRICTLY JSON conforming to the provided schema. No prose outside the JSON.`;

function buildUserMessage({ product, goal, trafficSource, hypothesis }) {
  const sourceContext = {
    organic:
      'Visitors arrive via search with explicit intent — match the query, lead with the clearest specific value claim, and trust signal early.',
    paid_social:
      'Visitors arrive cold from feed scroll. Pattern interrupt with a strong specific claim or surprising angle. Trust must be earned in the fold.',
    email:
      'Visitors are warm and have a relationship with the brand. Continue the conversation; do not re-introduce the brand. Focus on next-step nudges.',
  }[trafficSource];

  const goalContext = {
    conversion: 'Optimize for add-to-cart and checkout. Prioritize purchase confidence and risk-reversal.',
    awareness: 'Optimize for time-on-page and email capture. Lead with story, not transaction.',
    upsell: "Visitor already bought or is in-list. Surface complement / upgrade angle, lean on existing buyer's trust.",
  }[goal];

  const perfLine = product.cvr
    ? `Current PDP performance: ${product.cvr.toFixed(1)}% CVR, $${product.revenue?.toLocaleString?.() || product.revenue} revenue in the recent window.`
    : 'No performance data available for this product yet.';

  return `Generate landing-page copy and layout for this product:

Product: ${product.title}
Handle: ${product.handle}
Price: $${product.price.toFixed(2)}
Top variant: ${product.topVariant || 'n/a'}
Description: ${product.description || '(no description provided)'}

${perfLine}

Goal: ${goal} — ${goalContext}
Traffic source: ${trafficSource} — ${sourceContext}
${hypothesis ? `Marketer hypothesis / angle to test: ${hypothesis}` : ''}

Return the JSON object now.`;
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return {};
}

/** Placeholder landing output when ANTHROPIC_API_KEY is unset (matches LandingPageOutput shape). */
function mockLandingForProduct(product) {
  const title = product?.title || 'This product';
  return {
    headlines: [
      `${title} — built for daily wear`,
      `Why shoppers keep choosing ${title.split(' — ')[0].slice(0, 40)}`,
      `Same quality. Clearer story. Stronger fold.`,
    ],
    heroCopy: `Lead with one concrete outcome tied to ${title}. Add a single proof point (material, fit, or origin) in the second sentence — no hype adjectives.`,
    keyPoints: [
      'One specific material or construction detail buyers can verify.',
      'Who it is for (use case) in plain language.',
      'Shipping / returns / trust line appropriate to your store policy.',
    ],
    ctaText: 'Add to cart',
    layoutRecommendation:
      'Hero: headline + 2-line subhead + primary CTA + one trust row (reviews or guarantee). Below fold: three bullets, then variant picker. Keep paid-social visitors on one clear action.',
    seoTitle: `${String(title).slice(0, 55)} | Shop`,
    seoDescription: `Shop ${String(title).slice(0, 80)}. Clear details, easy checkout — configure this meta in your theme or SEO app.`,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST required' });
    return;
  }

  const body = readBody(req);
  const { productId, goal, trafficSource, hypothesis } = body;
  if (!productId || !goal || !trafficSource) {
    res.status(400).json({ error: 'productId, goal, and trafficSource are required' });
    return;
  }

  // Try live Shopify product first, fall back to the demo catalog so /generate works during demos.
  let product = await loadProduct(productId);
  if (!product) product = MOCK_PRODUCTS[productId];
  if (!product) {
    res.status(404).json({ error: `Unknown productId: ${productId}` });
    return;
  }

  const apiKey = cleanEnv(process.env.ANTHROPIC_API_KEY || '');
  if (!apiKey) {
    res.status(200).json({
      isDemo: true,
      llm: 'mock',
      result: mockLandingForProduct(product),
    });
    return;
  }

  const model = cleanEnv(process.env.ANTHROPIC_MODEL || '') || DEFAULT_MODEL;
  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model,
      max_tokens: 8192,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: OUTPUT_SCHEMA },
      },
      system: SYSTEM,
      messages: [{ role: 'user', content: buildUserMessage({ product, goal, trafficSource, hypothesis }) }],
    });

    // Pull the text block — structured outputs put the JSON there (after any thinking blocks).
    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock?.text) {
      res.status(502).json({ error: 'Model returned no text content' });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(textBlock.text);
    } catch (e) {
      console.error('[generate-landing-page] JSON parse failed:', textBlock.text.slice(0, 500));
      res.status(502).json({ error: 'Model returned non-JSON content' });
      return;
    }

    res.status(200).json({
      isDemo: !shopifyCreds().configured,
      llm: 'anthropic',
      model,
      result: parsed,
    });
  } catch (err) {
    console.error('[generate-landing-page] Anthropic error:', err);
    const status = typeof err?.status === 'number' ? err.status : 500;
    const msg = err?.message || 'Anthropic call failed';
    res.status(status >= 400 && status < 600 ? status : 500).json({ error: msg });
  }
}
