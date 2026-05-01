import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { MerchProductPageModel } from "@/lib/shopify/storefrontTypes";
import { findVariantByOptions } from "@/lib/shopify/variantSelection";
import { addLinesToCartPlaceholder } from "@/lib/shopify/cartPlaceholder";
import { Check, Minus, Plus, Star } from "lucide-react";
import { useMemo, useState } from "react";

function formatMoney(amount: string, currencyCode: string) {
  const n = Number(amount);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  }).format(n);
}

function StarRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4 shrink-0">
            <Star className="h-4 w-4 text-muted-foreground/35" strokeWidth={1.25} aria-hidden />
            <span
              className="pointer-events-none absolute inset-0 overflow-hidden text-amber-400"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-4 w-4 fill-current" strokeWidth={1.25} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

type MerchBuyBoxProps = {
  product: MerchProductPageModel;
};

export function MerchBuyBox({ product }: MerchBuyBoxProps) {
  const [picks, setPicks] = useState<Record<string, string>>(() => {
    const v0 = product.variants[0];
    return Object.fromEntries((v0?.selectedOptions ?? []).map((o) => [o.name, o.value]));
  });
  const [qty, setQty] = useState(1);

  const variant = useMemo(
    () => findVariantByOptions(product.variants, picks) ?? product.variants[0],
    [product.variants, picks],
  );

  const setOption = (name: string, value: string) => {
    setPicks((prev) => ({ ...prev, [name]: value }));
  };

  const priceStr = variant
    ? formatMoney(variant.price.amount, variant.price.currencyCode)
    : "";
  const compareStr =
    variant?.compareAtPrice &&
    Number(variant.compareAtPrice.amount) > Number(variant.price.amount)
      ? formatMoney(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)
      : null;

  const addToCart = () => {
    if (!variant) return;
    addLinesToCartPlaceholder(
      [{ merchandiseId: variant.id, quantity: qty }],
      product.title,
    );
  };

  return (
    <div className="flex w-full flex-col gap-6 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-5 lg:py-8 xl:px-7 xl:py-10">
      <div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">{product.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-tight">
          {product.title}
        </h1>
        {product.vendor ? (
          <p className="mt-1 text-sm text-muted-foreground">by {product.vendor}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <StarRow value={product.rating.value} />
        <span className="text-sm text-muted-foreground">
          {product.rating.value.toFixed(1)} · {product.rating.count} reviews
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-2xl font-semibold tabular-nums">{priceStr}</span>
        {compareStr ? (
          <span className="text-lg text-muted-foreground line-through tabular-nums">{compareStr}</span>
        ) : null}
      </div>

      <ul className="grid gap-2 text-sm text-muted-foreground">
        {product.merchandisingBullets.map((line) => (
          <li key={line} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <Separator className="bg-primary/10" />

      {product.options.map((opt) => (
        <div key={opt.id}>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{opt.name}</p>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((val) => {
              const active = picks[opt.name] === val;
              const candidate = findVariantByOptions(product.variants, { ...picks, [opt.name]: val });
              const disabled = !candidate || !candidate.availableForSale;
              return (
                <button
                  key={val}
                  type="button"
                  disabled={disabled}
                  onClick={() => setOption(opt.name, val)}
                  className={`min-h-11 min-w-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-primary/20 bg-background hover:border-primary/50"
                  } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Quantity</p>
          <div className="inline-flex items-center rounded-lg border border-primary/20">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center hover:bg-muted"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-medium tabular-nums">{qty}</span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center hover:bg-muted"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <Button
          size="lg"
          variant="neon"
          className="h-11 w-full flex-1 sm:h-12 sm:min-w-[200px]"
          disabled={!variant?.availableForSale}
          onClick={addToCart}
        >
          {variant?.availableForSale ? "Add to cart" : "Sold out"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Checkout will use your Shopify cart once wired. Variant <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">{variant?.id}</code> maps to{" "}
        <code className="font-mono text-[10px]">merchandiseId</code> in Storefront <code className="font-mono text-[10px]">cartLinesAdd</code>.
      </p>
    </div>
  );
}
