// Minimal Shopify Admin GraphQL client shared by the analytics endpoints.
// Returns { ok, data } / { ok: false, status, error }.

const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

export function shopifyCreds() {
  const domain = (process.env.SHOPIFY_STORE_DOMAIN || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN || '';
  return { domain, token, configured: Boolean(domain && token) };
}

export async function shopifyGraphQL(query, variables = {}) {
  const { domain, token } = shopifyCreds();
  if (!domain || !token) {
    return { ok: false, status: 503, error: 'Shopify credentials not configured' };
  }

  const url = `https://${domain}/admin/api/${API_VERSION}/graphql.json`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      return { ok: false, status: res.status, error: json?.errors?.[0]?.message || `HTTP ${res.status}` };
    }
    if (json?.errors?.length) {
      return { ok: false, status: 400, error: json.errors.map((e) => e.message).join('; ') };
    }
    return { ok: true, data: json.data };
  } catch (err) {
    return { ok: false, status: 500, error: err?.message || 'Network error' };
  } finally {
    clearTimeout(timer);
  }
}
