import { toast } from "sonner";
import type { CartLineInput } from "./cartAdapter";

/** Local UX until Storefront cart is connected. */
export function addLinesToCartPlaceholder(lines: CartLineInput[], productTitle: string) {
  const totalQty = lines.reduce((s, l) => s + l.quantity, 0);
  toast.success("Cart (demo)", {
    description: `${totalQty} × line(s) for “${productTitle}”. Replace addLinesToCartPlaceholder with Shopify cart in cartAdapter.ts.`,
  });
}
