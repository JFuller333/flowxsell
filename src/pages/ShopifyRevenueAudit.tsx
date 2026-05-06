import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { TrendingDown, ShoppingCart, Plug, PackageOpen } from "lucide-react";

const CALENDLY_AUDIT = "https://calendly.com/flowxsell/30min";
const AUDIT_LIST_PRICE = 500;
const AUDIT_SALE_PRICE = 250;

const symptoms = [
  {
    icon: TrendingDown,
    title: "Traffic but no sales",
    body: "People show up — then vanish. Something between the click and the cart is breaking trust.",
  },
  {
    icon: ShoppingCart,
    title: "Checkout drop-off",
    body: "They almost bought. Then didn’t. Usually it’s a small friction you can’t see from the dashboard.",
  },
  {
    icon: Plug,
    title: "Broken connections",
    body: "Email, payments, apps — when one link breaks, sales quietly leak out the side.",
  },
  {
    icon: PackageOpen,
    title: "Quiet after the sale",
    body: "The order goes through… then crickets. Repeat revenue left on the table.",
  },
];

const steps = [
  {
    num: "01",
    title: "Traffic → Storefront",
    body: "Does the page match the promise that got them there? Confusion here costs you the whole visit.",
  },
  {
    num: "02",
    title: "Storefront → Checkout",
    body: "We find where desire dies — usually one sticky step in the path to cart.",
  },
  {
    num: "03",
    title: "Checkout → Payment",
    body: "Where most stores hemorrhage sales: mobile, fields, trust — the invisible leaks.",
  },
  {
    num: "04",
    title: "Payment → Post-purchase",
    body: "After they pay, the relationship shouldn’t end. This is repeat money most founders skip.",
  },
  {
    num: "05",
    title: "The verdict",
    body: "Three fixes, ranked by impact — what to do first, in plain terms.",
  },
];

const deliverables = [
  "A recording of our chat — yours to keep",
  "Three changes that would help your store most",
  "One simple page that sums things up",
  "How your tools connect — in plain English",
  "Friendly next steps",
  "A path forward that feels doable",
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
            <p className="mb-6 inline-flex border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
              Shopify Revenue Audit
            </p>
            <h1 className="normal-case text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl md:leading-[1.08] lg:text-[3.5rem]">
              Your store has traffic.
              <br />
              <span className="text-primary neon-text-glow">So why isn&apos;t it converting?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-xl">
              You don&apos;t have to figure your store out alone. Book a relaxed session to{" "}
              <span className="font-medium text-foreground/90">review your results</span> — what they mean, what to do first, and
              how to get sales moving — in language that actually makes sense.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              If you&apos;d rather have someone <span className="font-medium text-foreground/85">implement</span> the fixes, we can
              outline what that could look like on the same call — no obligation to book build work.
            </p>
            <div className="mx-auto mt-8 max-w-xl text-center">
              <div className="rounded-md border border-primary/35 bg-primary/[0.08] px-6 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:px-7 md:py-6">
                <p className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
                  Review your audit results
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-primary neon-text-glow md:text-2xl">
                  Live 1:1 Review w/
                </p>
                <p className="mt-3 text-base leading-snug text-muted-foreground md:text-lg">
                  Sit with your questions — we&apos;ll walk through what you need together.
                </p>
              </div>
              <p className="mt-6 text-lg font-semibold text-foreground md:text-xl">Jazlyn Fuller</p>
              <p className="mt-1 text-base text-muted-foreground md:text-[17px]">Sr. Shopify Developer</p>
            </div>
            <div className="mt-5 flex flex-col items-center gap-1">
              <div className="flex flex-wrap items-baseline justify-center gap-3">
                <span className="text-3xl font-semibold tabular-nums text-muted-foreground line-through decoration-muted-foreground/80 md:text-4xl">
                  ${AUDIT_LIST_PRICE}
                </span>
                <span className="text-[3rem] font-bold tabular-nums leading-none text-primary neon-text-glow md:text-[3.5rem]">
                  ${AUDIT_SALE_PRICE}
                </span>
              </div>
              <span className="text-sm font-medium tracking-wide text-muted-foreground md:text-base">
                Limited-time rate · 5 spots available
              </span>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Button
                className="rounded-md bg-primary px-8 py-7 text-base font-semibold text-primary-foreground shadow-[0_0_24px_-8px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)] md:text-lg"
                asChild
              >
                <a href={CALENDLY_AUDIT} target="_blank" rel="noopener noreferrer">
                  Book time to review my results
                </a>
              </Button>
              <p className="max-w-md text-center text-sm text-muted-foreground md:text-base">
                No pressure · Your store, your pace, clear next steps
              </p>
              <p className="mx-auto mt-3 max-w-md text-center text-xs text-muted-foreground/85 md:text-sm">
                Need implementation help later? We&apos;ll map it out if you want — your call.
              </p>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-border" aria-hidden />

        {/* Problem */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">The problem</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Sound familiar?</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Four patterns I see again and again — the reason sales never feel steady.
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
                <h3 className="text-lg font-semibold text-foreground md:text-xl">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-[17px]">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-border" aria-hidden />

        {/* Process */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">What we cover</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">The audit, step by step</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            You share read-only access before we meet. On the call we fix — we don&apos;t wander.
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
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">{step.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground md:text-[17px]">{step.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Card className="mt-12 border-primary/20 bg-card/60 p-6 backdrop-blur-sm md:p-8">
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">What you get after the call</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base text-muted-foreground md:text-[17px]">
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">Who this is for</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            This audit is built for one type of founder
          </h2>
          <Card className="mt-8 border-primary/20 bg-card/60 p-6 backdrop-blur-sm md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              You have <strong className="font-semibold text-foreground">real traffic</strong> — but the numbers don&apos;t match
              the effort. You&apos;ve tweaked, guessed, refreshed. It still feels like a black box.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              You don&apos;t need another checklist. You need{" "}
              <strong className="font-semibold text-foreground">eyes on the whole path</strong> — from first click to post-purchase
              — and someone to say plainly where the money is going.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              You want to <strong className="font-semibold text-foreground">move</strong> — not stack more PDFs you never open.
            </p>
          </Card>
          <div className="mt-8 border-l-2 border-primary bg-primary/5 px-5 py-6 md:px-7">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;ve built and wired Shopify stores end to end — storefront to checkout to the tools behind them.{" "}
              <strong className="font-semibold text-foreground">I look where it actually breaks, because I&apos;ve built what lies underneath.</strong>
            </p>
            <p className="mt-3 text-base font-semibold text-primary md:text-lg">— Jazlyn Fuller, FlowXsell</p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border bg-card/40 px-4 py-16 text-center md:py-20">
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Ready to stop guessing?
            </h2>
            <p className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Sit down with Jazlyn to <span className="font-medium text-foreground/90">review your audit results</span> —{" "}
              {`$${AUDIT_SALE_PRICE}`} for now (usually {`$${AUDIT_LIST_PRICE}`}). Only the first 5 at this rate. Optional: talk
              through implementation if you&apos;re ready for hands-on help.
            </p>
            <div className="mt-8 flex flex-wrap items-baseline justify-center gap-3">
              <span className="text-2xl font-semibold tabular-nums text-muted-foreground line-through decoration-muted-foreground/80 md:text-3xl">
                ${AUDIT_LIST_PRICE}
              </span>
              <p className="text-3xl font-bold tabular-nums text-primary neon-text-glow md:text-4xl">${AUDIT_SALE_PRICE}</p>
            </div>
            <Button
              className="mt-8 rounded-md bg-primary px-8 py-7 text-base font-semibold text-primary-foreground shadow-[0_0_24px_-8px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)] md:text-lg"
              asChild
            >
              <a href={CALENDLY_AUDIT} target="_blank" rel="noopener noreferrer">
                Book time to review my results →
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground/80 md:text-base">
              No pressure · Your results, your questions, a clear next step
            </p>
            <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground/85 md:text-sm">
              Need implementation help too? We can outline what it would take on the same call — you decide when you&apos;re
              ready.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <span>&copy; {new Date().getFullYear()} FlowXsell. Built for founders, by a founder.</span>
          <span>flowxsell.vercel.app</span>
        </div>
      </footer>
    </div>
  );
};

export default ShopifyRevenueAudit;
