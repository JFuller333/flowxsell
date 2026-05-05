import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, Search, TrendingDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ItemResult = { score: number; evidence: string };
type DimResults = Record<string, ItemResult>;
type AllResults = { pdp: DimResults; offer: DimResults; trust: DimResults; friction: DimResults; checkout: DimResults };
type Leak = { dim: string; id: string; score: number; evidence: string; leak: string };
type AuditResult = {
  storeUrl: string;
  productUrl: string | null;
  shopify: { isShopify: boolean; confidence: string; signals: string[] };
  allResults: AllResults;
  scores: { dimensions: Record<string, number>; overall: number };
  leaks: Leak[];
  itemLabels: Record<string, Record<string, string>>;
  dimensions: Record<string, { label: string; weight: number }>;
  fixes: Record<string, Record<string, string>>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LOADING_STEPS = [
  "Fetching homepage…",
  "Detecting Shopify signals…",
  "Finding product page…",
  "Analyzing CRO signals…",
];

function scoreColor(s: number) {
  if (s >= 3.5) return "text-primary";
  if (s >= 2.5) return "text-[#a3e635]";
  if (s >= 1.5) return "text-orange-400";
  return "text-red-400";
}

function scoreLabel(s: number) {
  if (s >= 3.5) return "Excellent";
  if (s >= 2.5) return "Good";
  if (s >= 1.5) return "Needs Work";
  return "Critical";
}

function priorityTag(s: number): { label: string; cls: string } {
  if (s < 1.5) return { label: "P0 URGENT", cls: "text-red-400 border-red-400/30 bg-red-400/10" };
  if (s < 2.5) return { label: "P1 HIGH",   cls: "text-orange-400 border-orange-400/30 bg-orange-400/10" };
  if (s < 3.5) return { label: "P2 MEDIUM", cls: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" };
  return         { label: "P3 POLISH", cls: "text-muted-foreground border-border bg-card" };
}

function ScoreBar({ value, max = 4 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  const color =
    value >= 3.5 ? "bg-primary" :
    value >= 2.5 ? "bg-[#a3e635]" :
    value >= 1.5 ? "bg-orange-400" :
    "bg-red-400";
  return (
    <div className="h-1.5 w-full rounded-full bg-primary/10">
      <div className={`h-1.5 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const CALENDLY = "https://calendly.com/flowxsell/30min";

const ShopifyAuditTool = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStepCycle = () => {
    setStepIdx(0);
    stepTimer.current = setInterval(() => {
      setStepIdx(i => (i + 1) % LOADING_STEPS.length);
    }, 3500);
  };

  const stopStepCycle = () => {
    if (stepTimer.current) {
      clearInterval(stepTimer.current);
      stepTimer.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    startStepCycle();

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setResult(data);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      stopStepCycle();
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* ── Hero + Form ── */}
        <section className="relative px-4 pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent" aria-hidden />
          <div className="relative z-10 mx-auto max-w-[52rem] text-center">
            <p className="mb-6 inline-flex border border-primary/30 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">
              Free Automated Store Scan
            </p>
            <h1 className="normal-case text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl md:leading-[1.08] lg:text-[3.25rem]">
              Find where your Shopify store
              <br />
              <span className="text-primary neon-text-glow">is leaking revenue.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-lg">
              Paste any Shopify store URL. We'll scan the homepage and a live product page across 25 CRO signals — and surface every revenue leak in under 60 seconds.
            </p>

            {/* URL Form */}
            <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://your-store.com"
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-md border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-6px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)] disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run Audit"}
              </Button>
            </form>

            {/* Loading state */}
            {loading && (
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-primary/20 bg-primary/5 px-4 py-2.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">{LOADING_STEPS[stepIdx]}</span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="mt-8 flex items-start gap-3 rounded-md border border-red-400/20 bg-red-400/5 px-4 py-3 text-left">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <p className="mt-5 text-xs text-muted-foreground/60">
              No login required · Works on any public Shopify store · Takes ~30 seconds
            </p>
          </div>
        </section>

        {/* ── Results ── */}
        {result && (
          <div ref={resultsRef}>
            <div className="h-px w-full bg-border" aria-hidden />

            {/* Store info bar */}
            <div className="bg-card/40 px-4 py-4">
              <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Store scanned</span>
                  <a href={result.storeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground underline-offset-2 hover:underline">
                    {result.storeUrl}
                  </a>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Product page used</span>
                  {result.productUrl ? (
                    <a href={result.productUrl} target="_blank" rel="noopener noreferrer" className="max-w-xs truncate text-sm font-medium text-foreground underline-offset-2 hover:underline">
                      {result.productUrl}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">None found — homepage used</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-semibold ${result.shopify.isShopify ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`}>
                    {result.shopify.isShopify ? <CheckCircle2 className="h-3 w-3" /> : null}
                    {result.shopify.isShopify ? `Shopify · ${result.shopify.confidence} confidence` : "Not Shopify"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-4xl space-y-0 px-4 py-12 md:py-16">

              {/* Overall Score */}
              <section className="mb-12 text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">Overall Score</p>
                <div className={`text-6xl font-bold tabular-nums leading-none md:text-7xl ${scoreColor(result.scores.overall)} neon-text-glow`}>
                  {result.scores.overall.toFixed(2)}
                </div>
                <div className="mt-2 text-lg font-medium text-muted-foreground">/ 4.00 — {scoreLabel(result.scores.overall)}</div>
                {result.leaks.length > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded border border-red-400/20 bg-red-400/5 px-3 py-1.5">
                    <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-xs font-medium text-red-400">{result.leaks.length} revenue leak{result.leaks.length > 1 ? "s" : ""} detected</span>
                  </div>
                )}
              </section>

              {/* Dimension Breakdown */}
              <section className="mb-12">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">Dimension Breakdown</p>
                <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground md:text-2xl">How each area scored</h2>
                <div className="space-y-3">
                  {Object.entries(result.dimensions).map(([key, dim]) => {
                    const avg = result.scores.dimensions[key];
                    const tag = priorityTag(avg);
                    return (
                      <Card key={key} className="border-border bg-card/60 p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="w-36 shrink-0 text-sm font-medium text-foreground">{dim.label}</span>
                          <div className="flex-1">
                            <ScoreBar value={avg} />
                          </div>
                          <span className={`w-14 text-right text-sm font-semibold tabular-nums ${scoreColor(avg)}`}>
                            {avg.toFixed(2)}
                          </span>
                          <span className={`hidden shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase sm:inline-flex ${tag.cls}`}>
                            {tag.label}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* Per-dimension detail */}
              {Object.entries(result.dimensions).map(([dimKey, dim]) => (
                <section key={dimKey} className="mb-12">
                  <div className="mb-4 flex items-baseline gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">{dim.label}</p>
                    <span className="text-xs text-muted-foreground">{Math.round(dim.weight * 100)}% weight</span>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(result.allResults[dimKey as keyof AllResults]).map(([itemKey, item]) => {
                      const label = result.itemLabels[dimKey]?.[itemKey] ?? itemKey;
                      const tag   = priorityTag(item.score);
                      const fix   = result.fixes[dimKey]?.[itemKey];
                      return (
                        <Card key={itemKey} className={`border-border bg-card/60 p-4 backdrop-blur-sm ${item.score <= 1 ? "border-red-400/20" : item.score <= 2 ? "border-orange-400/20" : ""}`}>
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">{label}</span>
                                <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${tag.cls}`}>
                                  {tag.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold tabular-nums ${scoreColor(item.score)}`}>{item.score}/4</span>
                                <div className="w-20">
                                  <ScoreBar value={item.score} />
                                </div>
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground">
                                <span className="font-medium text-foreground/70">Evidence: </span>
                                {item.evidence}
                              </p>
                              {item.score < 4 && fix && (
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                  <span className="font-medium text-primary">Fix: </span>
                                  {fix}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* Revenue Leaks */}
              {result.leaks.length > 0 && (
                <section className="mb-12">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-400 md:text-xs">Revenue Leaks</p>
                  <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {result.leaks.length} issue{result.leaks.length > 1 ? "s" : ""} costing you revenue now
                  </h2>
                  <div className="space-y-3">
                    {result.leaks.map((leak, i) => {
                      const label = result.itemLabels[leak.dim]?.[leak.id] ?? leak.id;
                      const dimLabel = result.dimensions[leak.dim]?.label ?? leak.dim;
                      return (
                        <Card key={i} className="border-red-400/20 bg-red-400/[0.04] p-5">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">{label}</span>
                                <span className="text-xs text-muted-foreground">· {dimLabel} · score {leak.score}/4</span>
                              </div>
                              <p className="text-sm leading-relaxed text-red-300/90">{leak.leak}</p>
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium text-foreground/70">Evidence: </span>
                                {leak.evidence}
                              </p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Priority Action List */}
              <section className="mb-12">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">Priority Action List</p>
                <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground md:text-2xl">What to fix, in order</h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(n => {
                    const items = Object.entries(result.allResults)
                      .flatMap(([dk, dimItems]) =>
                        Object.entries(dimItems as DimResults).map(([ik, item]) => ({
                          label: result.itemLabels[dk]?.[ik] ?? ik,
                          score: item.score,
                          dim: result.dimensions[dk]?.label ?? dk,
                        }))
                      )
                      .filter(f => f.score === n);
                    if (!items.length) return null;
                    const tag = priorityTag(n === 1 ? 1 : n === 2 ? 2 : n === 3 ? 3 : 4);
                    return (
                      <Card key={n} className="border-border bg-card/60 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase ${tag.cls}`}>
                            {tag.label}
                          </span>
                          <span className="text-xs text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {items.map(f => (
                            <li key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                              <span className="font-medium text-foreground">{f.label}</span>
                              <span className="text-muted-foreground/60">· {f.dim}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* CTA */}
              <section className="rounded-md border border-primary/20 bg-primary/[0.04] p-8 text-center md:p-10">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs">Want to go deeper?</p>
                <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  This scan reads HTML signals.
                  <br />
                  <span className="text-primary neon-text-glow">A real audit reads your revenue data.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  In 60 minutes I'll walk through your actual Shopify analytics, checkout flows, and integrations — and hand you a ranked fix list you can act on immediately.
                </p>
                <Button
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-6 text-[15px] font-semibold text-primary-foreground shadow-[0_0_24px_-8px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)]"
                  asChild
                >
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                    Book a $500 Audit Call <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-3 text-xs text-muted-foreground/60">No fluff · Actionable fixes · Starting at $500</p>
              </section>
            </div>
          </div>
        )}
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

export default ShopifyAuditTool;
