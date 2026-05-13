import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import { DemoDataBanner } from "@/components/analytics/DemoDataBanner";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeTrends, fetchShopifyMetrics } from "@/lib/analytics/shopify";
import { formatShopifyMetricsSnapshot } from "@/lib/analytics/formatShopifySnapshot";
import type {
  BiAnalysisReport,
  BiFrameworkKind,
  RangeDays,
  ShopifyMetricsResponse,
} from "@/lib/analytics/types";

const RANGES: RangeDays[] = [30, 60, 90, 180, 270];

const BI_FRAMEWORKS: { value: BiFrameworkKind; label: string }[] = [
  { value: "strategic_alignment", label: "Strategic alignment" },
  { value: "north_star", label: "North star & measurement sanity" },
  { value: "funnel_conversion", label: "Funnel & conversion" },
  { value: "channel_mix", label: "Channel & mix" },
  { value: "incrementality_guardrails", label: "Incrementality & causation" },
  { value: "seasonality_baseline", label: "Seasonality & baseline" },
  { value: "executive_memo", label: "Executive memo" },
];

const REPORT_SECTIONS: { key: keyof BiAnalysisReport; title: string }[] = [
  { key: "executiveSummary", title: "Executive summary" },
  { key: "truthAndDataQuality", title: "Truth & data quality" },
  { key: "directionVsData", title: "Direction vs your targeting" },
  { key: "risksAndGaps", title: "Risks & gaps" },
  { key: "industryAndEmergingContext", title: "Industry & emerging context" },
  { key: "recommendations", title: "Recommendations" },
];

function rangeButtonLabel(r: RangeDays): string {
  if (r === 180) return "6 mo";
  if (r === 270) return "9 mo";
  return `${r}d`;
}

function CopyableSection({ title, children, copyText }: { title: string; children: ReactNode; copyText: string }) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 shrink-0 gap-1.5 text-xs"
          onClick={() => {
            void navigator.clipboard.writeText(copyText);
            toast.success(`${title} copied`);
          }}
        >
          <Copy className="h-3 w-3" /> Copy
        </Button>
      </div>
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/95">{children}</div>
    </Card>
  );
}

export default function AnalyticsBiAnalysis() {
  const [range, setRange] = useState<RangeDays>(30);
  const [framework, setFramework] = useState<BiFrameworkKind>("strategic_alignment");
  const [metrics, setMetrics] = useState<ShopifyMetricsResponse | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [shopifyText, setShopifyText] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetingClaim, setTargetingClaim] = useState("");
  const [question, setQuestion] = useState("");
  const [ga4Paste, setGa4Paste] = useState("");
  const [metaPaste, setMetaPaste] = useState("");
  const [result, setResult] = useState<BiAnalysisReport | null>(null);
  const [fullMarkdown, setFullMarkdown] = useState<string | null>(null);
  const [shopifySource, setShopifySource] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadMetrics = useCallback(() => {
    let alive = true;
    setMetricsLoading(true);
    fetchShopifyMetrics(range)
      .then((d) => {
        if (!alive) return;
        setMetrics(d);
        setShopifyText(formatShopifyMetricsSnapshot(d));
      })
      .catch((e) => toast.error(`Could not load Shopify metrics: ${(e as Error).message}`))
      .finally(() => alive && setMetricsLoading(false));
    return () => {
      alive = false;
    };
  }, [range]);

  useEffect(() => {
    return loadMetrics();
  }, [loadMetrics]);

  async function onRunAnalysis() {
    setBusy(true);
    setResult(null);
    setFullMarkdown(null);
    try {
      const r = await analyzeTrends({
        range,
        framework,
        industry,
        targetingClaim,
        question,
        ga4Paste,
        metaPaste,
        shopifySnapshot: shopifyText.trim() || undefined,
      });
      if (r.result) setResult(r.result);
      setFullMarkdown(r.analysis ?? null);
      setShopifySource(r.shopifySource ?? null);
      if (r.llm === "mock") {
        toast.message("Demo mode", {
          description: "Set ANTHROPIC_API_KEY in flowxsell/.env (server-side) and restart dev for live Claude, same as Generate.",
        });
      } else {
        toast.success("BI analysis generated");
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function copyFullReport() {
    const text =
      fullMarkdown ||
      (result
        ? REPORT_SECTIONS.map(({ key, title }) => `## ${title}\n\n${String(result[key] ?? "").trim()}`).join("\n\n")
        : "");
    if (!text) return;
    void navigator.clipboard.writeText(text);
    toast.success("Full report copied");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">BI Analysis</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Structured read on whether your data supports confident conclusions and whether your{" "}
            <strong className="text-foreground/90">targeting and strategy</strong> are directionally right. Shopify loads
            from the same linked store as the dashboard; add GA4/Meta paste for channel context. Pick a framework, then
            run the report, uses the <strong className="text-foreground/90">same Claude API</strong> as{" "}
            <Link to="/analytics/generate" className="text-primary underline-offset-2 hover:underline">
              Generate landing page
            </Link>{" "}
            (<code className="rounded bg-muted px-1 text-xs">ANTHROPIC_API_KEY</code> + optional{" "}
            <code className="rounded bg-muted px-1 text-xs">ANTHROPIC_MODEL</code> in <code className="rounded bg-muted px-1 text-xs">flowxsell/.env</code>
            ).
          </p>
        </header>

        <Card className="mb-6 max-w-3xl border-border bg-muted/20 p-4">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground/90">In-browser only:</strong> set{" "}
            <code className="rounded bg-muted px-1">SHOPIFY_*</code> + <code className="rounded bg-muted px-1">ANTHROPIC_API_KEY</code> in{" "}
            <code className="rounded bg-muted px-1">flowxsell/.env</code>, restart{" "}
            <code className="rounded bg-muted px-1">npm run dev:full</code>. Details in{" "}
            <Link to="/analytics/settings" className="text-primary underline-offset-2 hover:underline">
              Settings
            </Link>
            .
          </p>
        </Card>

        <DemoDataBanner visible={Boolean(metrics?.isDemo)} />

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-2 h-fit">
            <div className="grid gap-4">
              <div>
                <Label className="text-xs">Shopify date window</Label>
                <div className="mt-1.5 flex flex-wrap gap-1 rounded-md border border-border bg-card p-1">
                  {RANGES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRange(r)}
                      className={cn(
                        "rounded px-2.5 py-1 text-xs transition-colors",
                        range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {rangeButtonLabel(r)}
                    </button>
                  ))}
                </div>
                {metricsLoading ? (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> Loading Shopify…
                  </p>
                ) : metrics && !metrics.isDemo ? (
                  <p className="mt-1.5 text-xs font-medium text-primary">Live store data loaded</p>
                ) : null}
              </div>

              <div>
                <Label className="text-xs">Analysis framework</Label>
                <Select value={framework} onValueChange={(v) => setFramework(v as BiFrameworkKind)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BI_FRAMEWORKS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Each option changes which professional questions the model prioritizes.
                </p>
              </div>

              <div>
                <Label htmlFor="bi-industry" className="text-xs">
                  Industry (one line)
                </Label>
                <Input
                  id="bi-industry"
                  className="mt-1.5"
                  placeholder="e.g. Skincare DTC, running gear"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bi-targeting" className="text-xs">
                  Targeting / strategy claim (recommended)
                </Label>
                <Textarea
                  id="bi-targeting"
                  className="mt-1.5 min-h-[72px] text-sm"
                  placeholder="What we believe is working and who we are targeting, the report checks this against the data."
                  value={targetingClaim}
                  onChange={(e) => setTargetingClaim(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bi-question" className="text-xs">
                  Extra question (optional)
                </Label>
                <Textarea
                  id="bi-question"
                  className="mt-1.5 min-h-[56px] text-sm"
                  placeholder="Anything else you want the analysis to stress-test…"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bi-ga4" className="text-xs">
                  GA4, paste export or summary
                </Label>
                <Textarea
                  id="bi-ga4"
                  className="mt-1.5 min-h-[72px] text-sm"
                  placeholder="Sessions, channels, landing pages…"
                  value={ga4Paste}
                  onChange={(e) => setGa4Paste(e.target.value)}
                  spellCheck={false}
                />
              </div>

              <div>
                <Label htmlFor="bi-meta" className="text-xs">
                  Meta / ads, paste summary
                </Label>
                <Textarea
                  id="bi-meta"
                  className="mt-1.5 min-h-[72px] text-sm"
                  placeholder="Spend, results, CTR…"
                  value={metaPaste}
                  onChange={(e) => setMetaPaste(e.target.value)}
                  spellCheck={false}
                />
              </div>

              <div>
                <Label htmlFor="bi-shopify-snap" className="text-xs">
                  Shopify snapshot (auto-filled; editable)
                </Label>
                <Textarea
                  id="bi-shopify-snap"
                  className="mt-1.5 min-h-[160px] font-mono text-xs leading-relaxed"
                  value={shopifyText}
                  onChange={(e) => setShopifyText(e.target.value)}
                  disabled={metricsLoading}
                  spellCheck={false}
                />
              </div>

              <Button onClick={onRunAnalysis} disabled={busy} className="gap-2">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {busy ? "Generating with Claude…" : "Run BI analysis"}
              </Button>
            </div>
          </Card>

          <div className="lg:col-span-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {shopifySource === "live" ? (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    Shopify: live
                  </span>
                ) : shopifySource === "client_demo" ? (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Shopify: demo / pasted
                  </span>
                ) : null}
              </div>
              {result || fullMarkdown ? (
                <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={copyFullReport}>
                  <Copy className="h-3.5 w-3.5" />
                  Copy full report
                </Button>
              ) : null}
            </div>

            {!result && !busy ? (
              <Card className="flex min-h-[240px] items-center justify-center p-6 text-center text-sm text-muted-foreground">
                Choose a framework, optionally add targeting and GA4/Meta paste, then{" "}
                <strong className="text-foreground/90">Run BI analysis</strong> to see structured sections here.
              </Card>
            ) : null}

            {busy ? (
              <Card className="flex min-h-[240px] items-center justify-center p-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating with Claude…
              </Card>
            ) : null}

            {result ? (
              <div className="grid gap-3">
                {REPORT_SECTIONS.map(({ key, title }) => (
                  <CopyableSection key={key} title={title} copyText={String(result[key] ?? "").trim()}>
                    {String(result[key] ?? "").trim() || "-"}
                  </CopyableSection>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
