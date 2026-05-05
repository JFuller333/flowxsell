import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { TrendingDown, ShoppingCart, Plug, PackageOpen } from "lucide-react";

const CALENDLY_AUDIT = "https://calendly.com/flowxsell/30min";

const symptoms = [
  {
    icon: TrendingDown,
    title: "Traffic but no sales",
    body: "Ads are running, people are landing — but the cart stays empty. The storefront isn't converting the visit.",
  },
  {
    icon: ShoppingCart,
    title: "Checkout drop-off",
    body: "People add to cart and disappear. Your checkout flow has friction points killing mobile conversions.",
  },
  {
    icon: Plug,
    title: "Broken integrations",
    body: "Klaviyo, Supabase, your payment processor — something in the stack isn't talking to something else.",
  },
  {
    icon: PackageOpen,
    title: "Dead post-purchase flow",
    body: "The order confirms and then... silence. You're leaving repeat revenue on the table every single day.",
  },
];

const steps = [
  {
    num: "01",
    title: "Traffic → Storefront",
    body: "Are your landing pages matching ad intent? Is your homepage creating clarity or confusion? We start where attention enters.",
  },
  {
    num: "02",
    title: "Storefront → Checkout",
    body: "Add-to-cart rate, checkout initiation rate, where drop-off is happening. We find the friction point in your purchase path.",
  },
  {
    num: "03",
    title: "Checkout → Payment",
    body: "Accelerated checkout, mobile form fields, abandoned cart recovery. Most stores lose 30–60% of revenue here.",
  },
  {
    num: "04",
    title: "Payment → Post-purchase",
    body: "Confirmation flow, upsell sequence, fulfillment communication, repeat buyer triggers. This is where compounding revenue lives.",
  },
  {
    num: "05",
    title: "The verdict",
    body: "Three specific fixes ranked by revenue impact. You leave knowing exactly what to do first — and what it'll take to implement.",
  },
];

const deliverables = [
  "Recorded session you keep",
  "3-point fix priority list",
  "Revenue leak summary doc",
  "Integration audit notes",
  "Recommended next steps",
  "Clear implementation path",
];

const ShopifyRevenueAudit = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative px-4 pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent" aria-hidden />
          <div className="relative z-10 mx-auto max-w-[52rem] text-center">
            <p className="mb-6 inline-flex border border-primary/30 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">
              Shopify Revenue Audit
            </p>
            <h1 className="normal-case text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl md:leading-[1.08] lg:text-[3.25rem]">
              Your store has traffic.
              <br />
              <span className="text-primary neon-text-glow">So why isn&apos;t it converting?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-lg">
              In 60 minutes I&apos;ll walk through your entire Shopify system — storefront to fulfilled order — and show you
              exactly where revenue is leaking and what to fix first.
            </p>
            <div className="mt-10 flex flex-col items-center gap-1">
              <span className="text-[2.5rem] font-bold tabular-nums leading-none text-primary neon-text-glow md:text-[3rem]">
                $500
              </span>
              <span className="text-xs font-medium tracking-wide text-muted-foreground md:text-sm">
                Introductory rate · 5 spots available
              </span>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Button
                className="rounded-md bg-primary px-8 py-6 text-[15px] font-semibold text-primary-foreground shadow-[0_0_24px_-8px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)]"
                asChild
              >
                <a href={CALENDLY_AUDIT} target="_blank" rel="noopener noreferrer">
                  Book Your Audit Call
                </a>
              </Button>
              <p className="max-w-md text-center text-xs text-muted-foreground md:text-sm">
                No fluff · Actionable fixes you can implement immediately
              </p>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-border" aria-hidden />

        {/* Problem */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">The problem</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">Sound familiar?</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            These are the four system leaks I find in almost every Shopify store I audit.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-primary/20 bg-border sm:grid-cols-2">
            {symptoms.map(({ icon: Icon, title, body }) => (
              <Card
                key={title}
                className="rounded-none border-0 bg-card/80 p-6 backdrop-blur-sm md:p-7"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-border" aria-hidden />

        {/* Process */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">What we cover</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">The audit, step by step</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            I come prepared. You give me read-only Shopify + analytics access before the call. We spend the session diagnosing,
            not discovering.
          </p>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {steps.map((step) => (
              <li key={step.num} className="grid grid-cols-[auto_1fr] gap-5 py-6 md:gap-6 md:py-7">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold tabular-nums text-primary md:h-10 md:w-10"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground md:text-lg">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{step.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Card className="mt-12 border-primary/20 bg-card/60 p-6 backdrop-blur-sm md:p-8">
            <h3 className="text-lg font-semibold text-foreground md:text-xl">What you get after the call</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <div className="h-px w-full bg-border" aria-hidden />

        {/* Who + founder */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">Who this is for</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            This audit is built for one type of founder
          </h2>
          <Card className="mt-8 border-primary/20 bg-card/60 p-6 backdrop-blur-sm md:p-8">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              You&apos;re running a <strong className="font-semibold text-foreground">Shopify store that has real traffic</strong>{" "}
              — paid or organic — but conversions aren&apos;t where they should be. You&apos;ve tried tweaking things yourself but
              the system feels like a black box.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              You&apos;re not looking for a generic &quot;optimize your product page&quot; checklist. You want someone who can{" "}
              <strong className="font-semibold text-foreground">look at your actual stack</strong> — storefront, checkout,
              integrations, post-purchase — and tell you where the money is actually going.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              You&apos;re ready to <strong className="font-semibold text-foreground">act on the findings</strong>, not just collect
              another PDF that sits in a folder.
            </p>
          </Card>
          <div className="mt-8 border-l-2 border-primary bg-primary/5 px-5 py-6 md:px-7">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I&apos;ve built headless Shopify systems on Hydrogen + Remix, connected stores to Supabase, Klaviyo, and Contentful,
              and audited stores making $0 despite real traffic.{" "}
              <strong className="font-semibold text-foreground">I know where to look because I&apos;ve built the systems underneath.</strong>
            </p>
            <p className="mt-3 text-sm font-semibold text-primary">— Jazlyn Fuller, FlowXsell</p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border bg-card/40 px-4 py-16 text-center md:py-20">
          <div className="mx-auto max-w-xl">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Ready to find out
              <br />
              where your revenue went?
            </h2>
            <p className="mx-auto mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Book an audit call. Starting at $500 — introductory rate for the first 5 clients.
            </p>
            <p className="mt-8 text-2xl font-bold tabular-nums text-primary neon-text-glow md:text-3xl">$500</p>
            <Button
              className="mt-8 rounded-md bg-primary px-8 py-6 text-[15px] font-semibold text-primary-foreground shadow-[0_0_24px_-8px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)]"
              asChild
            >
              <a href={CALENDLY_AUDIT} target="_blank" rel="noopener noreferrer">
                Book Your Audit Call →
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground/80 md:text-sm">
              No long-term commitment. No fluff. Just clarity on what to fix.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <span>&copy; {new Date().getFullYear()} FlowXsell. Built for founders, by a founder.</span>
          <span>flowxsell.vercel.app</span>
        </div>
      </footer>
    </div>
  );
};

export default ShopifyRevenueAudit;
