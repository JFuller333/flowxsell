import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { BookCallCard } from "@/components/BookCallCard";
import {
  AlertTriangle,
  ArrowDown,
  Gauge,
  Globe,
  Loader2,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

const CALENDLY = "https://calendly.com/flowxsell/30min";
type FunnelStage = {
  label: string;
  visitors: number;
  pctOfTop: number;
  dropFromPrev: number;
  note: string;
};

type Leak = {
  stage: string;
  severity: "critical" | "high" | "medium" | "low";
  dropEstimate: number;
  reason: string;
  signal: string;
};

type PerfStrategy = {
  score: number | null;
  lcpMs: number | null;
  clsValue: number | null;
  fcpMs: number | null;
  ttiMs: number | null;
  tbtMs: number | null;
} | null;

type SnapshotResult = {
  domain: string;
  finalUrl: string;
  checkoutUrl: string;
  scannedAt: string;
  techStack: string[];
  performance: {
    mobile: PerfStrategy;
    desktop: PerfStrategy;
    mobileError: string | null;
    desktopError: string | null;
  };
  forms: { fieldCount: number; hiddenFieldCount: number };
  expressPay: {
    shopPay: boolean;
    applePay: boolean;
    googlePay: boolean;
    paypal: boolean;
    klarna: boolean;
    afterpay: boolean;
  };
  hasStickyCta: boolean;
  leaks: Leak[];
  benchmark: { vertical: string; median: number; topQuartile: number };
  funnel: FunnelStage[];
  sources: Record<string, string>;
};

const LOADING_STEPS = [
  "Fetching homepage and headers…",
  "Detecting tech stack from script signatures…",
  "Scanning cart and checkout pages…",
  "Running Google PageSpeed Insights (this is the slow one)…",
  "Modeling funnel stages from real signals…",
];

function normalizeUrl(raw: string): string | null {
  let s = raw.trim();
  if (!s) return null;
  if (s.startsWith("//")) s = `https:${s}`;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    return u.hostname ? u.href : null;
  } catch {
    return null;
  }
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function dropColor(drop: number): string {
  if (drop >= 70) return "text-red-400";
  if (drop >= 50) return "text-orange-400";
  if (drop >= 30) return "text-yellow-400";
  return "text-[#a3e635]";
}

function dropBg(drop: number): string {
  if (drop >= 70) return "bg-red-400";
  if (drop >= 50) return "bg-orange-400";
  if (drop >= 30) return "bg-yellow-400";
  return "bg-[#a3e635]";
}

function perfColor(score: number | null): string {
  if (score == null) return "text-muted-foreground";
  if (score >= 90) return "text-[#a3e635]";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function severityColor(sev: Leak["severity"]): string {
  if (sev === "critical") return "text-red-400";
  if (sev === "high") return "text-orange-400";
  if (sev === "medium") return "text-yellow-400";
  return "text-[#a3e635]";
}

function SourceBadge({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
      <span className="h-1 w-1 rounded-full bg-primary/60" aria-hidden />
      <span className="font-medium uppercase tracking-[0.1em]">Source:</span>
      <span>{children}</span>
    </p>
  );
}

function GooglePageSpeedMark() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      Google PageSpeed Insights
    </span>
  );
}

function FunnelBar({ stage, isLast }: { stage: FunnelStage; isLast: boolean }) {
  const widthPct = Math.max(8, stage.pctOfTop);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="text-base font-semibold text-foreground md:text-lg">{stage.label}</span>
          <span className="text-sm text-muted-foreground">{stage.note}</span>
        </div>
        <div className="flex items-baseline gap-3 text-right">
          <span className="text-base font-semibold tabular-nums text-foreground md:text-lg">
            ~{formatNumber(stage.visitors)}
          </span>
          <span className="w-14 text-sm tabular-nums text-muted-foreground">{stage.pctOfTop}%</span>
        </div>
      </div>
      <div className="h-3 w-full rounded-md bg-primary/5">
        <div
          className="h-3 rounded-md bg-primary/70 shadow-[0_0_18px_-4px_hsla(74,99%,49%,0.55)] transition-all"
          style={{ width: `${widthPct}%` }}
        />
      </div>
      {!isLast && (
        <div className="flex items-center gap-2 pt-1 pl-1 text-sm">
          <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          <span className={`font-semibold tabular-nums ${dropColor(stage.dropFromPrev)}`}>
            -{stage.dropFromPrev}%
          </span>
          <span className="text-muted-foreground">drop to next stage</span>
        </div>
      )}
    </div>
  );
}

const FunnelSnapshot = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<SnapshotResult | null>(null);
  const [error, setError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStepCycle = () => {
    setStepIdx(0);
    stepTimer.current = setInterval(() => {
      setStepIdx(i => Math.min(i + 1, LOADING_STEPS.length - 1));
    }, 4500);
  };

  const stopStepCycle = () => {
    if (stepTimer.current) {
      clearInterval(stepTimer.current);
      stepTimer.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeUrl(url);
    if (!normalized) {
      setError(url.trim() ? "Enter a valid site URL (e.g. yourbrand.com)." : "Enter a site URL to scan.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    startStepCycle();

    try {
      const res = await fetch("/api/funnel-snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      const text = await res.text();
      if (!text.trim()) {
        const hint =
          res.status === 502 || res.status === 503
            ? " The local API on port 3001 is not running, use npm run dev:full (or start the API separately)."
            : "";
        throw new Error(`Empty response from server (${res.status}).${hint}`);
      }
      let data: unknown;
      try {
        data = JSON.parse(text) as unknown;
      } catch {
        throw new Error(
          "Server returned invalid JSON. If you're developing locally, run npm run dev:full so Vite and the API both start."
        );
      }
      const payload = data as { error?: string };
      if (!res.ok) throw new Error(payload.error || "Snapshot failed");
      setResult(data as SnapshotResult);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      stopStepCycle();
      setLoading(false);
    }
  };

  const expressPayDetected =
    result &&
    Object.entries(result.expressPay)
      .filter(([, v]) => v)
      .map(([k]) => k);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <section className="relative px-4 pb-16 pt-28 md:pb-20 md:pt-32">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-[52rem] text-center">
            <p className="mb-6 inline-flex border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
              Funnel Snapshot · No login required
            </p>
            <h1 className="normal-case text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl md:leading-[1.08] lg:text-[3.5rem]">
              See where your funnel
              <br />
              <span className="text-primary neon-text-glow">is bleeding traffic.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-xl">
              Paste your site. We pull real PageSpeed data, scan your checkout structure, and detect your stack -
              then model the funnel from those signals. No GA, Shopify, or ad credentials needed.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  type="text"
                  name="site-url"
                  inputMode="url"
                  autoComplete="url"
                  value={url}
                  onChange={e => {
                    setUrl(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="yourbrand.com"
                  aria-invalid={Boolean(error)}
                  disabled={loading}
                  className="h-14 w-full rounded-md border border-border bg-card pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-14 rounded-md bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_0_20px_-6px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)] disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run snapshot"}
              </Button>
            </form>

            {loading && (
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-primary/20 bg-primary/5 px-4 py-2.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span className="text-base text-muted-foreground">{LOADING_STEPS[stepIdx]}</span>
              </div>
            )}

            {error && (
              <div className="mt-8 flex items-start gap-3 rounded-md border border-red-400/20 bg-red-400/5 px-4 py-3 text-left">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-base text-red-400">{error}</p>
              </div>
            )}

            <p className="mt-5 text-sm text-muted-foreground/60 md:text-base">
              No credentials · Real PageSpeed data · ~30-60 second scan
            </p>
          </div>
        </section>

        {result && (
          <div ref={resultsRef}>
            <div className="h-px w-full bg-border" aria-hidden />

            <div className="bg-card/40 px-4 py-4">
              <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" aria-hidden />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-muted-foreground">Site scanned</span>
                    <a
                      href={result.finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-foreground underline-offset-2 hover:underline"
                    >
                      {result.domain}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Detected stack ({result.techStack.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.techStack.length === 0 ? (
                      <span className="text-sm text-muted-foreground">No common signatures detected</span>
                    ) : (
                      result.techStack.slice(0, 8).map(tech => (
                        <span
                          key={tech}
                          className="inline-flex rounded border border-primary/25 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {tech}
                        </span>
                      ))
                    )}
                    {result.techStack.length > 8 && (
                      <span className="text-xs text-muted-foreground">+{result.techStack.length - 8} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 md:py-16">
              <section className="grid gap-4 md:grid-cols-3">
                <Card className="border-border bg-card/60 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">PageSpeed (mobile)</p>
                  </div>
                  {result.performance.mobile ? (
                    <>
                      <div className={`mt-3 text-4xl font-bold tabular-nums leading-none md:text-5xl ${perfColor(result.performance.mobile.score)}`}>
                        {result.performance.mobile.score ?? "-"}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        LCP{" "}
                        <span className="font-semibold text-foreground">
                          {result.performance.mobile.lcpMs != null ? (result.performance.mobile.lcpMs / 1000).toFixed(1) : "-"}s
                        </span>{" "}
                        · CLS{" "}
                        <span className="font-semibold text-foreground">
                          {result.performance.mobile.clsValue != null ? result.performance.mobile.clsValue.toFixed(3) : "-"}
                        </span>{" "}
                        · TBT{" "}
                        <span className="font-semibold text-foreground">
                          {result.performance.mobile.tbtMs != null ? Math.round(result.performance.mobile.tbtMs) : "-"}ms
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Mobile scan unavailable{result.performance.mobileError ? `: ${result.performance.mobileError}` : ""}
                    </p>
                  )}
                  <SourceBadge>
                    <GooglePageSpeedMark />
                  </SourceBadge>
                </Card>

                <Card className="border-border bg-card/60 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">PageSpeed (desktop)</p>
                  </div>
                  {result.performance.desktop ? (
                    <>
                      <div className={`mt-3 text-4xl font-bold tabular-nums leading-none md:text-5xl ${perfColor(result.performance.desktop.score)}`}>
                        {result.performance.desktop.score ?? "-"}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        LCP{" "}
                        <span className="font-semibold text-foreground">
                          {result.performance.desktop.lcpMs != null ? (result.performance.desktop.lcpMs / 1000).toFixed(1) : "-"}s
                        </span>{" "}
                        · CLS{" "}
                        <span className="font-semibold text-foreground">
                          {result.performance.desktop.clsValue != null ? result.performance.desktop.clsValue.toFixed(3) : "-"}
                        </span>{" "}
                        · TBT{" "}
                        <span className="font-semibold text-foreground">
                          {result.performance.desktop.tbtMs != null ? Math.round(result.performance.desktop.tbtMs) : "-"}ms
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Desktop scan unavailable{result.performance.desktopError ? `: ${result.performance.desktopError}` : ""}
                    </p>
                  )}
                  <SourceBadge>
                    <GooglePageSpeedMark />
                  </SourceBadge>
                </Card>

                <Card className="border-border bg-card/60 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Checkout signals</p>
                  </div>
                  <div className="mt-3 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl">
                    {result.forms.fieldCount}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">visible form fields detected</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Express pay:{" "}
                    {expressPayDetected && expressPayDetected.length > 0 ? (
                      <span className="font-semibold text-[#a3e635]">{expressPayDetected.join(", ")}</span>
                    ) : (
                      <span className="font-semibold text-red-400">none detected</span>
                    )}
                  </p>
                  <SourceBadge>Cart/checkout HTML scan</SourceBadge>
                </Card>
              </section>

              <section>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
                  Funnel snapshot
                </p>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Where visitors slip through
                </h2>
                <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Drop-offs are <span className="font-medium text-foreground">modeled</span> from real signals
                  (PageSpeed, form complexity, express-pay availability) and {result.benchmark.vertical} benchmarks.
                  Connect GA4 later to replace these with measured numbers.
                </p>
                <Card className="border-border bg-card/60 p-6 backdrop-blur-sm md:p-8">
                  <div className="space-y-6">
                    {result.funnel.map((stage, i) => (
                      <FunnelBar key={stage.label} stage={stage} isLast={i === result.funnel.length - 1} />
                    ))}
                  </div>
                  <SourceBadge>Modeled from PageSpeed + checkout scan + industry benchmarks</SourceBadge>
                </Card>
              </section>

              {result.leaks.length > 0 && (
                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
                    Biggest leaks
                  </p>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Top {result.leaks.length} place{result.leaks.length === 1 ? "" : "s"} to fix first
                  </h2>
                  <div className="space-y-3">
                    {result.leaks.map((leak, i) => (
                      <Card key={i} className="border-red-400/20 bg-red-400/[0.04] p-6">
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-background ${dropBg(
                              leak.dropEstimate
                            )}`}
                          >
                            {i + 1}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-semibold text-foreground md:text-lg">{leak.stage}</span>
                              <span className={`text-sm font-semibold uppercase tracking-[0.1em] ${severityColor(leak.severity)}`}>
                                {leak.severity}
                              </span>
                              <span className={`text-sm font-semibold tabular-nums ${dropColor(leak.dropEstimate)}`}>
                                · est -{leak.dropEstimate}% drop
                              </span>
                            </div>
                            <p className="text-base leading-relaxed text-muted-foreground md:text-[17px]">{leak.reason}</p>
                            <SourceBadge>
                              {leak.signal === "Google PageSpeed Insights" ? <GooglePageSpeedMark /> : leak.signal}
                            </SourceBadge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-md border border-primary/15 bg-card/40 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <p className="font-semibold text-foreground">Where this data comes from</p>
                    <ul className="space-y-1.5">
                      {Object.entries(result.sources).map(([key, label]) => (
                        <li key={key} className="flex gap-2">
                          <span className="font-medium capitalize text-foreground/80">{key}:</span>
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="pt-1">
                      Performance and checkout numbers are <span className="font-medium text-foreground">measured</span>.
                      Funnel drop-offs are <span className="font-medium text-foreground">modeled</span> from those
                      measurements + vertical benchmarks. On the deep-dive call we connect a read-only GA4 share to
                      replace estimates with real conversion data.
                    </p>
                  </div>
                </div>
              </section>

              <section className="relative border-t border-primary/20 bg-gradient-to-b from-primary/[0.08] via-background to-background">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,hsla(74,99%,49%,0.1),transparent_65%)]"
                  aria-hidden
                />
                <div className="relative mx-auto max-w-md px-4 py-14 md:py-20">
                  <BookCallCard
                    calendlyUrl={CALENDLY}
                    highlightTitle="Book a free walkthrough of your snapshot."
                    personName="Jazlyn Fuller"
                    personTitle="Funnel & Conversion Strategist"
                    bookButtonLabel="Book the call"
                    bookButtonIcon={<Zap className="h-5 w-5" aria-hidden />}
                    trackingContext="funnel-snapshot"
                  />
                </div>
              </section>
            </div>
          </div>
        )}
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

export default FunnelSnapshot;
