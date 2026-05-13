import { useEffect, useState } from "react";
import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import { DemoDataBanner } from "@/components/analytics/DemoDataBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { fetchShopifyProducts, generateLandingPage } from "@/lib/analytics/shopify";
import type {
  GenerateRequest,
  GoalKind,
  LandingPageOutput,
  ProductOption,
  TrafficKind,
} from "@/lib/analytics/types";

const GOALS: { value: GoalKind; label: string }[] = [
  { value: "conversion", label: "Conversion" },
  { value: "awareness", label: "Awareness" },
  { value: "upsell", label: "Upsell" },
];

const TRAFFIC: { value: TrafficKind; label: string }[] = [
  { value: "organic", label: "Organic" },
  { value: "paid_social", label: "Paid social" },
  { value: "email", label: "Email" },
];

function CopyableSection({ title, children, copyText }: { title: string; children: React.ReactNode; copyText: string }) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={() => {
            navigator.clipboard.writeText(copyText);
            toast.success(`${title} copied`);
          }}
        >
          <Copy className="h-3 w-3" /> Copy
        </Button>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </Card>
  );
}

export default function AnalyticsGenerate() {
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [isDemo, setIsDemo] = useState(true);
  const [productId, setProductId] = useState<string>("");
  const [goal, setGoal] = useState<GoalKind>("conversion");
  const [trafficSource, setTrafficSource] = useState<TrafficKind>("paid_social");
  const [hypothesis, setHypothesis] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LandingPageOutput | null>(null);

  useEffect(() => {
    fetchShopifyProducts()
      .then((d) => {
        setProducts(d.products);
        setIsDemo(d.isDemo);
        if (d.products[0]) setProductId(d.products[0].id);
      })
      .catch((e) => toast.error(`Could not load products: ${e.message}`));
  }, []);

  async function onGenerate() {
    if (!productId) {
      toast.error("Pick a product first");
      return;
    }
    setBusy(true);
    setResult(null);
    const payload: GenerateRequest = { productId, goal, trafficSource, hypothesis };
    try {
      const r = await generateLandingPage(payload);
      setResult(r.result);
      if (r.llm === "mock") {
        toast.message("Demo copy only", {
          description: "Set ANTHROPIC_API_KEY in flowxsell/.env (server-side) and restart dev for live Claude.",
        });
      } else {
        toast.success("Landing page generated");
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Generate landing page</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated landing page recommendations grounded in your store's live performance data.
          </p>
        </header>

        <DemoDataBanner visible={isDemo} />

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-2 h-fit">
            <div className="grid gap-4">
              <div>
                <Label className="text-xs">Product</Label>
                <Select value={productId} onValueChange={setProductId}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Goal</Label>
                <Select value={goal} onValueChange={(v) => setGoal(v as GoalKind)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GOALS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Traffic source</Label>
                <Select value={trafficSource} onValueChange={(v) => setTrafficSource(v as TrafficKind)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRAFFIC.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Hypothesis / notes (optional)</Label>
                <Textarea
                  className="mt-1.5 min-h-[88px]"
                  placeholder="What angle, audience, or objection do you want this page to address?"
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                />
              </div>

              <Button onClick={onGenerate} disabled={busy} className="gap-2">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {busy ? "Generating…" : "Generate"}
              </Button>
            </div>
          </Card>

          <div className="lg:col-span-3">
            {!result && !busy ? (
              <Card className="flex h-64 items-center justify-center p-6 text-center text-sm text-muted-foreground">
                Pick a product and click Generate to see headlines, hero copy, key points, CTA, layout, and SEO.
              </Card>
            ) : null}

            {busy ? (
              <Card className="flex h-64 items-center justify-center p-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating with Claude…
              </Card>
            ) : null}

            {result ? (
              <div className="grid gap-3">
                <CopyableSection
                  title="Headlines (3 options)"
                  copyText={result.headlines.join("\n")}
                >
                  <ul className="list-disc pl-5 space-y-1.5">
                    {result.headlines.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </CopyableSection>

                <CopyableSection title="Hero copy" copyText={result.heroCopy}>
                  <p>{result.heroCopy}</p>
                </CopyableSection>

                <CopyableSection
                  title="Key selling points"
                  copyText={result.keyPoints.join("\n")}
                >
                  <ul className="list-disc pl-5 space-y-1.5">
                    {result.keyPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </CopyableSection>

                <CopyableSection title="CTA" copyText={result.ctaText}>
                  <span className="inline-flex rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium">
                    {result.ctaText}
                  </span>
                </CopyableSection>

                <CopyableSection
                  title="Above-the-fold layout"
                  copyText={result.layoutRecommendation}
                >
                  <p className="text-muted-foreground">{result.layoutRecommendation}</p>
                </CopyableSection>

                <CopyableSection
                  title="SEO meta"
                  copyText={`${result.seoTitle}\n${result.seoDescription}`}
                >
                  <div className="space-y-1">
                    <div className="font-medium">{result.seoTitle}</div>
                    <div className="text-muted-foreground">{result.seoDescription}</div>
                  </div>
                </CopyableSection>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
