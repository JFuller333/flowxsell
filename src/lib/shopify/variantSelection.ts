import type { MerchProductVariant } from "./storefrontTypes";

export function findVariantByOptions(
  variants: MerchProductVariant[],
  picks: Record<string, string>,
): MerchProductVariant | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((so) => picks[so.name] === so.value),
  );
}

export function initialPicksFromVariant(v: MerchProductVariant): Record<string, string> {
  return Object.fromEntries(v.selectedOptions.map((o) => [o.name, o.value]));
}
