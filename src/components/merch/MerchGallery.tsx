import { cn } from "@/lib/utils";
import type { StorefrontImage } from "@/lib/shopify/storefrontTypes";
import { useState } from "react";

type MerchGalleryProps = {
  images: StorefrontImage[];
  productTitle: string;
};

export function MerchGallery({ images, productTitle }: MerchGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  if (!main) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-muted text-muted-foreground lg:aspect-auto lg:h-full lg:rounded-none">
        No images
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:h-full lg:min-h-0 lg:flex-row lg:gap-0">
      <div
        className="flex flex-row gap-2 overflow-x-auto pb-1 lg:h-full lg:w-[5.5rem] lg:shrink-0 lg:flex-col lg:gap-0 lg:divide-y lg:divide-primary/15 lg:overflow-y-auto lg:overflow-x-hidden lg:border-r lg:border-primary/10 lg:pb-0 lg:pr-0"
        aria-label="Product images"
      >
        {images.map((img, i) => (
          <button
            key={img.id ?? img.url}
            type="button"
            aria-pressed={i === active}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-24 sm:w-24 lg:h-24 lg:w-full lg:max-h-none lg:rounded-none lg:border-0 lg:ring-inset",
              i === active ? "z-[1] ring-2 ring-primary" : "bg-muted hover:brightness-95 dark:hover:brightness-110",
            )}
          >
            <img
              src={img.url}
              alt={img.altText ?? `${productTitle} view ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <div className="relative min-h-[min(56vh,520px)] flex-1 overflow-hidden rounded-xl bg-muted lg:h-full lg:min-h-0 lg:rounded-none">
        <img
          src={main.url}
          alt={main.altText ?? productTitle}
          className="h-full w-full min-h-[280px] object-cover object-center lg:absolute lg:inset-0 lg:min-h-0 lg:min-w-full"
          loading="eager"
          width={main.width}
          height={main.height}
        />
      </div>
    </div>
  );
}
