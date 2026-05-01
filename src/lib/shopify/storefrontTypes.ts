/**
 * Types aligned with Shopify Storefront API naming so you can map GraphQL
 * responses (Product, ProductVariant, MoneyV2, Image) without reshaping.
 *
 * @see https://shopify.dev/docs/api/storefront/latest/objects/Product
 */

export type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type StorefrontImage = {
  id?: string;
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type MerchProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type MerchProductVariant = {
  /** Storefront global id, e.g. gid://shopify/ProductVariant/123 */
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  selectedOptions: SelectedOption[];
  sku?: string | null;
};

export type MerchProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  vendor?: string | null;
  productType?: string | null;
  tags: string[];
  images: StorefrontImage[];
  options: MerchProductOption[];
  variants: MerchProductVariant[];
};

/** UI-only fields until you source them from metafields or metaobjects. */
export type MerchProductPageModel = MerchProduct & {
  eyebrow: string;
  rating: { value: number; count: number };
  merchandisingBullets: string[];
  statHighlights?: {
    label: string;
    value: string;
    description: string;
  }[];
};
