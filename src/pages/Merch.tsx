import { MerchBuyBox } from "@/components/merch/MerchBuyBox";
import { MerchGallery } from "@/components/merch/MerchGallery";
import { Navbar } from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { flowxsellMerchProduct } from "@/data/merchProductFlowxsell";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const product = flowxsellMerchProduct;

const Merch = () => {
  return (
    <div className="min-h-svh w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <div className="w-full pt-20 md:pt-24">
        <div className="w-full border-b border-primary/10 bg-primary/[0.04] px-3 py-2.5 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-primary sm:text-xs">
          Demo merch PDP — layout mirrors a full-width Shopify product template
        </div>

        <nav
          className="w-full border-b border-primary/10 px-3 py-3 sm:px-5 lg:px-10"
          aria-label="Breadcrumb"
        >
          <ol className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-1 text-xs text-muted-foreground sm:text-sm">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
            <li>
              <Link to="/merch" className="hover:text-foreground">
                Merch
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
            <li className="font-medium text-foreground">{product.title}</li>
          </ol>
        </nav>

        {/* Desktop: true edge-to-edge split (no outer padding / no column gap); fills viewport below chrome */}
        <section className="w-full border-b border-primary/10 lg:h-[calc(100svh-10.5rem)] lg:min-h-[520px]">
          <div className="grid h-full w-full grid-cols-1 items-stretch gap-8 px-3 py-8 sm:px-5 sm:py-10 lg:grid-cols-[1fr_minmax(22rem,30rem)] lg:gap-0 lg:px-0 lg:py-0 xl:grid-cols-[1fr_minmax(23rem,32rem)]">
            <MerchGallery images={product.images} productTitle={product.title} />
            <div className="flex min-h-0 min-w-0 flex-col lg:h-full lg:overflow-hidden">
              <MerchBuyBox product={product} />
            </div>
          </div>
        </section>

        {product.statHighlights?.length ? (
          <section className="w-full border-b border-primary/10 bg-muted/25">
            <div className="mx-auto grid max-w-[1600px] gap-px bg-primary/10 sm:grid-cols-3">
              {product.statHighlights.map((s) => (
                <div key={s.label} className="bg-background/95 px-5 py-10 sm:px-8">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">{s.label}</p>
                  <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">{s.value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="w-full px-3 py-14 sm:px-5 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[56rem]">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why this piece exists</h2>
            <div
              className="prose prose-neutral dark:prose-invert mt-6 max-w-none text-muted-foreground prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </section>

        <section className="w-full border-t border-primary/10 bg-muted/20 px-3 py-14 sm:px-5 lg:px-10">
          <div className="mx-auto max-w-xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-left">Shipping</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Standard rates at checkout. Swap this block for Shopify policy pages or metafields when integrated.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="text-left">Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  30-day returns on unworn items with tags. Wire to your actual return rules from Shopify settings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger className="text-left">Care</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Machine wash cold, tumble low. Example only — replace with product metafields in Liquid or Storefront.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="w-full border-t border-primary/10 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-lg font-semibold tracking-tight">Reviews</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Reserve this band for Okendo, Judge.me, Shopify Reviews, or Storefront metafields. Your{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">product.id</code> is already shaped for
              Storefront widgets.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Merch;
