/**
 * Future: wire to Shopify Online Store `POST /cart/add.js` (same origin on
 * Shopify themes) or Storefront API `cartLinesAdd` / Cart AJAX API from a
 * custom storefront. Keep variant `id` as the Storefront merchandise id.
 */

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export async function addLinesToShopifyCart(_lines: CartLineInput[]): Promise<void> {
  // Implement with your storefront proxy or Hydrogen cart handler.
  throw new Error("Shopify cart not wired yet — use addLinesToCartPlaceholder from cartPlaceholder.ts");
}
