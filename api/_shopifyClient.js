// Minimal Shopify Admin GraphQL client shared by the analytics endpoints.
// Returns { ok, data } / { ok: false, status, error }.

const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

/** Strip whitespace and accidental wrapping quotes from .env values. */
export function cleanEnv(value) {
  if (!value || typeof value !== 'string') return '';
  let s = value.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/** Shopify HTTP errors: often `errors` as a string; GraphQL can return `{ errors: [{ message }] }`. */
function parseShopifyHttpError(json, status) {
  if (!json) return `HTTP ${status}`;
  const e = json.errors;
  if (typeof e === 'string') return e;
  if (Array.isArray(e) && e.length) {
    return e.map((item) => (typeof item === 'string' ? item : item?.message || JSON.stringify(item))).join('; ');
  }
  if (json.error && typeof json.error === 'string') return json.error;
  return `HTTP ${status}`;
}

export function shopifyCreds() {
  const domain = cleanEnv(process.env.SHOPIFY_STORE_DOMAIN || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const token = cleanEnv(process.env.SHOPIFY_ADMIN_API_TOKEN || '');
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
      return { ok: false, status: res.status, error: parseShopifyHttpError(json, res.status) };
    }
    if (json?.errors) {
      if (typeof json.errors === 'string') {
        return { ok: false, status: 400, error: json.errors };
      }
      if (Array.isArray(json.errors) && json.errors.length) {
        return {
          ok: false,
          status: 400,
          error: json.errors.map((e) => (typeof e === 'string' ? e : e.message || JSON.stringify(e))).join('; '),
        };
      }
    }
    return { ok: true, data: json.data };
  } catch (err) {
    return { ok: false, status: 500, error: err?.message || 'Network error' };
  } finally {
    clearTimeout(timer);
  }
}
