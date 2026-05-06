import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { AlertTriangle, CheckCircle2, Loader2, Mail, Search, TrendingDown } from "lucide-react";

import { cn } from "@/lib/utils";

/** Set `true` to re-enable blur + modal email capture before full results. Commented-off behavior for now. */
const EMAIL_GATE_ENABLED = false;

const EMAIL_GATE_STORAGE = "flowxsell-audit-email";
const AUDIT_LEADS_LOG = "flowxsell_audit_leads_v1";

function basicEmailOk(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

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

/** Weighted overall score uses the same 0–4 scale as per-item checks (see ScoreBar). */
const OVERALL_SCORE_MAX = 4;

const CALENDLY = "https://calendly.com/flowxsell/30min";
const AUDIT_LIST_PRICE = 500;
const AUDIT_SALE_PRICE = 250;

/** Accepts pasted domains (e.g. mystore.com) — `type="url"` rejects those in the browser. */
function normalizeStoreUrl(raw: string): string | null {
  let s = raw.trim();
  if (!s) return null;
  if (s.startsWith("//")) s = `https:${s}`;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (!u.hostname) return null;
    return u.href.replace(/\/$/, "") || u.href;
  } catch {
    return null;
  }
}

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

function auditScoreUrgencyBadge(overall: number, max: number): { label: string; cls: string } {
  const ratio = overall / max;
  if (ratio < 0.5) return { label: "Let’s improve together", cls: "border-red-400/35 bg-red-400/15 text-red-300" };
  if (ratio < 0.75) return { label: "Room to grow", cls: "border-yellow-400/40 bg-yellow-400/15 text-yellow-200" };
  return { label: "Strong start", cls: "border-[#a3e635]/40 bg-[#a3e635]/12 text-[#c8f079]" };
}

function AuditDeepDiveCta({ result, calendlyUrl }: { result: AuditResult; calendlyUrl: string }) {
  const score = result.scores.overall;
  const maxScore = OVERALL_SCORE_MAX;
  const leakCount = result.leaks.length;
  const urgency = auditScoreUrgencyBadge(score, maxScore);

  return (
    <section className="rounded-md border border-primary/20 bg-primary/[0.04] p-8 md:p-12">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-base leading-relaxed text-foreground md:text-lg">
          Your store scored{" "}
          <span className="font-semibold tabular-nums text-foreground">{score.toFixed(2)}</span> out of{" "}
          <span className="font-semibold tabular-nums text-foreground">{maxScore.toFixed(2)}</span>. We highlighted{" "}
          <span className="font-semibold tabular-nums text-foreground">{leakCount}</span> thing
          {leakCount === 1 ? "" : "s"} worth going over together — questions welcome.
        </p>
        <span
          className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${urgency.cls}`}
        >
          {urgency.label}
        </span>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr,min(280px,100%)] md:items-start md:gap-12 lg:grid-cols-[1fr,min(320px,100%)]">
        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              A lot to take in?
              <br />
              <span className="text-primary neon-text-glow">On the call we walk through your scan together — plain English, your pace.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              ~1 hour: what your scan says, what to fix first, and a short list for today — questions welcome, no jargon.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Want <span className="font-medium text-foreground/85">implementation</span> help later? We can sketch options on the
              same call — zero obligation.
            </p>
          </div>
          <ul className="space-y-3 text-base text-muted-foreground md:text-lg">
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>Call recording (yours)</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>Top 3 fixes from your scan</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>One-page summary</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>Clear next steps</span>
            </li>
          </ul>
        </div>

        <Card className="border-border bg-card/80 p-7 shadow-none backdrop-blur-sm md:p-8">
          <div className="text-center">
            <div className="rounded-md border border-primary/35 bg-primary/[0.08] px-5 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:px-6 md:py-5">
              <p className="text-xl font-bold leading-tight tracking-tight text-primary neon-text-glow md:text-2xl">
                Review your scan results LIVE.
              </p>
            </div>
            <p className="mt-5 text-lg font-semibold text-foreground md:text-xl">Jazlyn Fuller</p>
            <p className="mt-1 text-base text-muted-foreground md:text-[17px]">Sr. Shopify Developer</p>
            <div className="mt-6 flex flex-wrap items-baseline justify-center gap-3">
              <span className="text-2xl font-semibold tabular-nums text-muted-foreground line-through decoration-muted-foreground/80 md:text-3xl">
                ${AUDIT_LIST_PRICE}
              </span>
              <span className="text-4xl font-bold tabular-nums text-primary neon-text-glow md:text-5xl">${AUDIT_SALE_PRICE}</span>
            </div>
            <Button
              className="mt-7 w-full items-center justify-center gap-2 rounded-md bg-primary py-7 text-base font-semibold text-primary-foreground shadow-[0_0_24px_-8px_hsla(74,99%,49%,0.45)] transition-colors hover:bg-[hsl(74,99%,54%)] md:text-lg"
              asChild
            >
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/80 md:text-base">
              No pressure · Your results, your questions, a clear next step
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/75 md:text-sm">
              Need implementation help too? We can outline what it would take on the same call — you decide if you want to move
              forward.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const ShopifyAuditTool = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [resultsUnlocked, setResultsUnlocked] = useState(false);
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [captureEmail, setCaptureEmail] = useState("");
  const [captureError, setCaptureError] = useState("");
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

  /** New scan resets email gate (when EMAIL_GATE_ENABLED) */
  useEffect(() => {
    if (!result) {
      setResultsUnlocked(false);
      setEmailGateOpen(false);
      setCaptureEmail("");
      setCaptureError("");
      return;
    }
    if (!EMAIL_GATE_ENABLED) {
      setResultsUnlocked(true);
      setEmailGateOpen(false);
      return;
    }
    try {
      if (typeof sessionStorage !== "undefined") {
        const saved = sessionStorage.getItem(EMAIL_GATE_STORAGE);
        if (saved && basicEmailOk(saved)) {
          setResultsUnlocked(true);
          setEmailGateOpen(false);
          setCaptureEmail(saved);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setResultsUnlocked(false);
    setEmailGateOpen(true);
  }, [result]);

  const handleEmailGateSubmit = (e: React.FormEvent) => {
    if (!EMAIL_GATE_ENABLED) return;
    e.preventDefault();
    const trimmed = captureEmail.trim();
    if (!basicEmailOk(trimmed)) {
      setCaptureError("Please enter a valid email.");
      return;
    }
    setCaptureError("");
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem(EMAIL_GATE_STORAGE, trimmed);
      }
    } catch {
      /* ignore */
    }
    try {
      if (typeof localStorage !== "undefined") {
        const prev = JSON.parse(localStorage.getItem(AUDIT_LEADS_LOG) || "[]") as { email: string; at: string }[];
        prev.push({ email: trimmed, at: new Date().toISOString() });
        localStorage.setItem(AUDIT_LEADS_LOG, JSON.stringify(prev.slice(-100)));
      }
    } catch {
      /* ignore */
    }
    const hook = typeof import.meta.env !== "undefined" ? import.meta.env.VITE_AUDIT_LEAD_WEBHOOK : undefined;
    if (hook && typeof hook === "string" && hook.startsWith("http")) {
      void fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "shopify_audit_scan" }),
      }).catch(() => {});
    }
    setResultsUnlocked(true);
    setEmailGateOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUrl = normalizeStoreUrl(url);
    if (!normalizedUrl) {
      setError(
        url.trim()
          ? "Enter a valid store URL (e.g. yourstore.com or https://your-store.com/products/…)."
          : "Enter a store URL to scan."
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    if (EMAIL_GATE_ENABLED) {
      try {
        if (typeof sessionStorage !== "undefined") sessionStorage.removeItem(EMAIL_GATE_STORAGE);
      } catch {
        /* ignore */
      }
    }
    startStepCycle();

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
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
            <p className="mb-6 inline-flex border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
              Free Automated Store Scan
            </p>
            <h1 className="normal-case text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl md:leading-[1.08] lg:text-[3.5rem]">
              Find where your Shopify store
              <br />
              <span className="text-primary neon-text-glow">is leaking revenue.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-xl">
              Paste your store link. We&apos;ll take a quick, free look at your homepage and a product page and show you where
              shoppers might be slipping away — usually in under a minute. No login, no jargon.
            </p>

            {/* URL Form */}
            <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <input
                  type="text"
                  name="store-url"
                  inputMode="url"
                  autoComplete="url"
                  value={url}
                  onChange={e => {
                    setUrl(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="yourstore.com or https://..."
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
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run free scan"}
              </Button>
            </form>

            {/* Loading state */}
            {loading && (
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-primary/20 bg-primary/5 px-4 py-2.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span className="text-base text-muted-foreground">{LOADING_STEPS[stepIdx]}</span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="mt-8 flex items-start gap-3 rounded-md border border-red-400/20 bg-red-400/5 px-4 py-3 text-left">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-base text-red-400">{error}</p>
              </div>
            )}

            <p className="mt-5 text-sm text-muted-foreground/60 md:text-base">
              No login required · Works on any public Shopify store · Takes ~30 seconds
            </p>
          </div>
        </section>

        {/* ── Results ── */}
        {result && (
          <div ref={resultsRef}>
            <div className="h-px w-full bg-border" aria-hidden />

            {/* Email gate modal — gated by EMAIL_GATE_ENABLED at top of file */}
            {EMAIL_GATE_ENABLED && (
              <Dialog
                open={emailGateOpen && !resultsUnlocked}
                onOpenChange={open => {
                  if (!open && !resultsUnlocked) return;
                  setEmailGateOpen(open);
                }}
              >
                <DialogContent
                  className="sm:max-w-md [&>button.absolute]:hidden"
                  onInteractOutside={e => e.preventDefault()}
                  onEscapeKeyDown={e => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                      <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                      Email to unlock your full scan
                    </DialogTitle>
                    <DialogDescription>
                      We&apos;ll send occasional tips tailored to Shopify founders — no spam. Your results stay private.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEmailGateSubmit}>
                    <div className="grid gap-2 py-2">
                      <label htmlFor="audit-email" className="sr-only">
                        Email
                      </label>
                      <Input
                        id="audit-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@brand.com"
                        value={captureEmail}
                        onChange={e => {
                          setCaptureEmail(e.target.value);
                          setCaptureError("");
                        }}
                        className="h-11 text-base"
                        required
                      />
                      {captureError && (
                        <p className="text-sm text-red-400" role="alert">
                          {captureError}
                        </p>
                      )}
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button type="submit" className="w-full sm:w-auto">
                        Unlock results
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            <div className="relative">
              {/* Subtle veil + blur while email gate is active */}
              <div
                className={cn(
                  "transition-[filter,opacity] duration-300",
                  EMAIL_GATE_ENABLED && !resultsUnlocked && "pointer-events-none select-none blur-[2px] opacity-[0.92] saturate-[0.96]"
                )}
              >
            {/* Store info bar */}
            <div className="bg-card/40 px-4 py-4">
              <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Store scanned</span>
                  <a href={result.storeUrl} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-foreground underline-offset-2 hover:underline">
                    {result.storeUrl}
                  </a>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Product page used</span>
                  {result.productUrl ? (
                    <a href={result.productUrl} target="_blank" rel="noopener noreferrer" className="max-w-xs truncate text-base font-medium text-foreground underline-offset-2 hover:underline">
                      {result.productUrl}
                    </a>
                  ) : (
                    <span className="text-base text-muted-foreground">None found — homepage used</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-semibold ${result.shopify.isShopify ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`}>
                    {result.shopify.isShopify ? <CheckCircle2 className="h-3 w-3" /> : null}
                    {result.shopify.isShopify ? `Shopify · ${result.shopify.confidence} confidence` : "Not Shopify"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-4xl space-y-0 px-4 py-12 md:py-16">

              {/* Overall Score */}
              <section className="mb-12 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">Overall Score</p>
                <div className={`text-7xl font-bold tabular-nums leading-none md:text-8xl ${scoreColor(result.scores.overall)} neon-text-glow`}>
                  {result.scores.overall.toFixed(2)}
                </div>
                <div className="mt-2 text-xl font-medium text-muted-foreground md:text-2xl">
                  / {OVERALL_SCORE_MAX.toFixed(2)} — {scoreLabel(result.scores.overall)}
                </div>
                {result.leaks.length > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded border border-primary/25 bg-primary/5 px-4 py-2">
                    <TrendingDown className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary md:text-base">
                      {result.leaks.length} area{result.leaks.length > 1 ? "s" : ""} we can unpack together on a call
                    </span>
                  </div>
                )}
              </section>

              {/* Dimension Breakdown */}
              <section className="mb-12">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">Dimension Breakdown</p>
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">How each area scored</h2>
                <div className="space-y-3">
                  {Object.entries(result.dimensions).map(([key, dim]) => {
                    const avg = result.scores.dimensions[key];
                    const tag = priorityTag(avg);
                    return (
                      <Card key={key} className="border-border bg-card/60 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="w-36 shrink-0 text-base font-medium text-foreground">{dim.label}</span>
                          <div className="flex-1">
                            <ScoreBar value={avg} />
                          </div>
                          <span className={`w-14 text-right text-base font-semibold tabular-nums ${scoreColor(avg)}`}>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">{dim.label}</p>
                    <span className="text-sm text-muted-foreground">{Math.round(dim.weight * 100)}% weight</span>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(result.allResults[dimKey as keyof AllResults]).map(([itemKey, item]) => {
                      const label = result.itemLabels[dimKey]?.[itemKey] ?? itemKey;
                      const tag   = priorityTag(item.score);
                      const fix   = result.fixes[dimKey]?.[itemKey];
                      return (
                        <Card key={itemKey} className={`border-border bg-card/60 p-5 backdrop-blur-sm ${item.score <= 1 ? "border-red-400/20" : item.score <= 2 ? "border-orange-400/20" : ""}`}>
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base font-semibold text-foreground">{label}</span>
                                <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${tag.cls}`}>
                                  {tag.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-base font-bold tabular-nums ${scoreColor(item.score)}`}>{item.score}/4</span>
                                <div className="w-20">
                                  <ScoreBar value={item.score} />
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                                <span className="font-medium text-foreground/70">Evidence: </span>
                                {item.evidence}
                              </p>
                              {item.score < 4 && fix && (
                                <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
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
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">
                    Worth a closer look
                  </p>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {result.leaks.length} spot{result.leaks.length > 1 ? "s" : ""} to go over when you&apos;re ready
                  </h2>
                  <div className="space-y-3">
                    {result.leaks.map((leak, i) => {
                      const label = result.itemLabels[leak.dim]?.[leak.id] ?? leak.id;
                      const dimLabel = result.dimensions[leak.dim]?.label ?? leak.dim;
                      return (
                        <Card key={i} className="border-red-400/20 bg-red-400/[0.04] p-6">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base font-semibold text-foreground">{label}</span>
                                <span className="text-sm text-muted-foreground">· {dimLabel} · score {leak.score}/4</span>
                              </div>
                              <p className="text-base leading-relaxed text-red-300/90 md:text-[17px]">{leak.leak}</p>
                              <p className="text-sm text-muted-foreground md:text-[15px]">
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary md:text-sm">Priority Action List</p>
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">What to fix, in order</h2>
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
                      <Card key={n} className="border-border bg-card/60 p-5">
                        <div className="mb-3 flex items-center gap-2">
                          <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase ${tag.cls}`}>
                            {tag.label}
                          </span>
                          <span className="text-sm text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {items.map(f => (
                            <li key={f.label} className="flex items-center gap-2 text-base text-muted-foreground">
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
              <AuditDeepDiveCta result={result} calendlyUrl={CALENDLY} />
            </div>
              </div>

              {EMAIL_GATE_ENABLED && !resultsUnlocked && (
                <button
                  type="button"
                  className="absolute inset-0 z-[1] cursor-pointer bg-transparent"
                  aria-label="Open email form to reveal full scan results"
                  onClick={() => setEmailGateOpen(true)}
                />
              )}
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

export default ShopifyAuditTool;
