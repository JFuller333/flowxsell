import { shopifyCreds, shopifyGraphQL } from './_shopifyClient.js';

// GET /api/shopify-smoke
// Minimal Admin GraphQL call (one product) to verify domain + token + API version.
// Uses the same client as /api/shopify-metrics — no Storefront, no VITE_*.

const SMOKE_QUERY = `
  query Smoke {
    products(first: 1) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-10';
  const creds = shopifyCreds();
  const { domain, token, configured } = creds;

  /** No secrets — helps spot truncated .env, wrong prefix, or domain/token swap. */
  const diagnostics = {
    hasDomain: Boolean(domain),
    hasToken: Boolean(token),
    domainLength: domain.length,
    tokenLength: token.length,
    tokenLooksLikeAdminShpat: token.startsWith('shpat_'),
    apiVersionUsed: apiVersion,
  };

  if (!configured) {
    return res.status(503).json({
      ok: false,
      configured: false,
      error: 'not_configured',
      hint: 'Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_API_TOKEN (server env only, not VITE_*).',
      diagnostics,
    });
  }

  const r = await shopifyGraphQL(SMOKE_QUERY, {});
  if (!r.ok) {
    return res.status(r.status >= 400 && r.status < 600 ? r.status : 502).json({
      ok: false,
      configured: true,
      requestHost: domain,
      apiVersion,
      upstreamStatus: r.status,
      error: r.error,
      diagnostics,
      bypass: {
        note:
          'If this fails too, the token/store/version pair is wrong outside FlowXsell. If it succeeds, compare with smoke on port 3001.',
        method: 'POST',
        url: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': '(paste SHOPIFY_ADMIN_API_TOKEN here)' },
        body: JSON.stringify({ query: '{ products(first: 1) { edges { node { id title } } } }' }),
      },
      decode: {
        401: 'Token rejected for this host — wrong SHOPIFY_STORE_DOMAIN, wrong token, revoked token, or not Admin API access token.',
        403: 'Missing Admin scope — enable read_products (and read_orders for metrics) on the custom app, reinstall, rotate token if needed.',
        404: 'Unknown API version path — bump SHOPIFY_API_VERSION to a supported version (see Shopify API release notes).',
        402: 'Payment required on shop (rare for GraphQL) — check Shopify account status.',
      },
    });
  }

  const first = r.data?.products?.edges?.[0]?.node;
  return res.status(200).json({
    ok: true,
    configured: true,
    requestHost: domain,
    apiVersion,
    endpointShape: `https://${domain}/admin/api/${apiVersion}/graphql.json`,
    sampleProductId: first?.id ?? null,
    sampleProductTitle: first?.title ?? null,
    diagnostics,
  });
}
