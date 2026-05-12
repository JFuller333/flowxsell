import { shopifyCreds, shopifyGraphQL } from './_shopifyClient.js';

// GET /api/shopify-products
// Returns the store's product list (id, title, description, price, top variant)
// for use in the /analytics/generate dropdown.

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          description
          variants(first: 5) {
            edges {
              node {
                title
                price
                inventoryQuantity
              }
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req, res) {
  if (!shopifyCreds().configured) {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  try {
    const r = await shopifyGraphQL(PRODUCTS_QUERY, { first: 50 });
    if (!r.ok) {
      const isScopeError = /access denied|scope/i.test(r.error || '');
      res.status(isScopeError ? 503 : (r.status || 502))
         .json({ error: r.error, reason: isScopeError ? 'missing_scopes' : undefined });
      return;
    }
    const products = (r.data?.products?.edges || []).map((e) => {
      const node = e.node;
      const variants = (node.variants?.edges || []).map((v) => v.node);
      const top = variants.sort((a, b) => (b.inventoryQuantity || 0) - (a.inventoryQuantity || 0))[0];
      const price = parseFloat(top?.price || variants[0]?.price || '0');
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: (node.description || '').slice(0, 600),
        price,
        topVariant: top?.title || null,
        // CVR and revenue per product require attribution we can't get from Admin alone.
        // The dashboard's metrics endpoint estimates these; the generate flow uses prompt context only.
        cvr: 0,
        revenue: 0,
      };
    });
    res.status(200).json({ isDemo: false, products });
  } catch (err) {
    console.error('[shopify-products] error:', err);
    res.status(500).json({ error: err?.message || 'unknown error' });
  }
}
