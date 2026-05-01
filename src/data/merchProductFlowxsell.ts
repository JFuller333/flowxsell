import type { MerchProductPageModel } from "@/lib/shopify/storefrontTypes";

/**
 * Demo PDP payload. Replace with a Storefront API query or pass JSON from
 * Liquid (`{{ product | json }}`) through a headless bootstrap script.
 */
export const flowxsellMerchProduct: MerchProductPageModel = {
  id: "gid://shopify/Product/1000000000001",
  handle: "flowxsell-framework-tee",
  title: "FlowXsell Framework Tee",
  vendor: "FlowXsell",
  productType: "Apparel",
  tags: ["framework", "founder", "limited"],
  eyebrow: "Merch · Limited drop",
  rating: { value: 4.8, count: 127 },
  merchandisingBullets: [
    "Premium cotton blend",
    "Printed in small batches",
    "Ships in recyclable mailers",
  ],
  statHighlights: [
    {
      label: "Fit satisfaction",
      value: "96%",
      description: "From post-purchase survey, first 90 days (demo data).",
    },
    {
      label: "Reorder intent",
      value: "4.6 / 5",
      description: "Self-reported likelihood to buy another colorway.",
    },
    {
      label: "Carbon-neutral shipping",
      value: "Yes",
      description: "Offset on outbound parcels via partner network (demo).",
    },
  ],
  descriptionHtml: `
    <p>A wearable reminder that growth is a system—not a hustle. Cut for everyday wear with a clean chest mark and tonal sleeve detail.</p>
    <p>Designed to pair with the FlowXsell quiz and framework: audit, align, automate, multiply.</p>
  `,
  images: [
    {
      id: "gid://shopify/ProductImage/1",
      url: "https://picsum.photos/seed/fxtee1/960/1200",
      altText: "FlowXsell Framework Tee — front",
      width: 960,
      height: 1200,
    },
    {
      id: "gid://shopify/ProductImage/2",
      url: "https://picsum.photos/seed/fxtee2/960/1200",
      altText: "FlowXsell Framework Tee — detail",
      width: 960,
      height: 1200,
    },
    {
      id: "gid://shopify/ProductImage/3",
      url: "https://picsum.photos/seed/fxtee3/960/1200",
      altText: "FlowXsell Framework Tee — lifestyle",
      width: 960,
      height: 1200,
    },
  ],
  options: [
    {
      id: "gid://shopify/ProductOption/1",
      name: "Size",
      values: ["S", "M", "L", "XL"],
    },
  ],
  variants: [
    {
      id: "gid://shopify/ProductVariant/1001",
      title: "S",
      availableForSale: true,
      sku: "FX-TEE-S",
      price: { amount: "38.00", currencyCode: "USD" },
      compareAtPrice: { amount: "44.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Size", value: "S" }],
    },
    {
      id: "gid://shopify/ProductVariant/1002",
      title: "M",
      availableForSale: true,
      sku: "FX-TEE-M",
      price: { amount: "38.00", currencyCode: "USD" },
      compareAtPrice: { amount: "44.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Size", value: "M" }],
    },
    {
      id: "gid://shopify/ProductVariant/1003",
      title: "L",
      availableForSale: true,
      sku: "FX-TEE-L",
      price: { amount: "38.00", currencyCode: "USD" },
      compareAtPrice: { amount: "44.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Size", value: "L" }],
    },
    {
      id: "gid://shopify/ProductVariant/1004",
      title: "XL",
      availableForSale: true,
      sku: "FX-TEE-XL",
      price: { amount: "40.00", currencyCode: "USD" },
      compareAtPrice: { amount: "46.00", currencyCode: "USD" },
      selectedOptions: [{ name: "Size", value: "XL" }],
    },
  ],
};
