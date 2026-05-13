import { useEffect, useState } from "react";
import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import { DemoDataBanner } from "@/components/analytics/DemoDataBanner";
import { MetricCard } from "@/components/analytics/MetricCard";
import { RevenueSessionsChart } from "@/components/analytics/RevenueSessionsChart";
import { TopPagesBarChart } from "@/components/analytics/TopPagesBarChart";
import { TopProductsTable } from "@/components/analytics/TopProductsTable";
import { InsightCallouts } from "@/components/analytics/InsightCallouts";
import { fetchShopifyMetrics } from "@/lib/analytics/shopify";
import type { RangeDays, ShopifyMetricsResponse } from "@/lib/analytics/types";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const RANGES: RangeDays[] = [30, 60, 90, 180, 270];

function rangeButtonLabel(r: RangeDays): string {
  if (r === 180) return "6 mo";
  if (r === 270) return "9 mo";
  return `${r}d`;
}

function rangeHuman(r: RangeDays): string {
  if (r === 180) return "180 days (~6 months)";
  if (r === 270) return "270 days (~9 months)";
  return `${r} days`;
}

function usd(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<RangeDays>(30);
  const [data, setData] = useState<ShopifyMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);
    fetchShopifyMetrics(range)
      .then((d) => alive && setData(d))
      .catch((e) => alive && setErr(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [range]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Live metrics from your connected Shopify store when Admin API env is set; otherwise demo data.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-card p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded px-3 py-1 text-xs transition-colors",
                  range === r
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {rangeButtonLabel(r)}
              </button>
            ))}
          </div>
        </header>

        <DemoDataBanner visible={Boolean(data?.isDemo)} />

        {data && !data.isDemo && data.summary.orders === 0 ? (
          <div className="mb-6 rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Connected to {data.storeDomain ?? "your store"}</p>
            <p className="mt-1">
              This dashboard only counts orders with financial status{" "}
              <strong className="text-foreground/90">Paid</strong> or{" "}
              <strong className="text-foreground/90">Partially paid</strong> in the last {rangeHuman(data.range)}. If
              everything is still <strong className="text-foreground/90">Pending</strong>, or you have no sales in
              this window, revenue and top products stay at zero, that is real data from Shopify, not a broken
              connection.
            </p>
            <p className="mt-2 text-xs">
              Top pages / traffic are not available from Admin orders (use GA4 or Shopify&apos;s own analytics for
              that). Try <strong className="text-foreground/90">60 / 90 / 6 mo / 9 mo</strong> if your paid orders are older.
            </p>
          </div>
        ) : null}

        {err ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
            Failed to load: {err}
          </div>
        ) : null}

        {loading && !data ? (
          <div className="flex h-96 items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading metrics…
          </div>
        ) : data ? (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <MetricCard
                label="Revenue"
                value={usd(data.summary.revenue)}
                currentValue={data.summary.revenue}
                prevValue={data.summary.prevRevenue}
                hint="vs prior period"
              />
              <MetricCard
                label="Orders"
                value={data.summary.orders.toLocaleString()}
                currentValue={data.summary.orders}
                prevValue={data.summary.prevOrders}
                hint="vs prior period"
              />
              <MetricCard
                label="AOV"
                value={`$${data.summary.aov.toFixed(2)}`}
                currentValue={data.summary.aov}
                prevValue={data.summary.prevAov}
                hint="vs prior period"
              />
              <MetricCard
                label="CVR"
                value={`${data.summary.cvr.toFixed(2)}%`}
                currentValue={data.summary.cvr}
                prevValue={data.summary.prevCvr}
                hint="store-wide"
              />
            </div>

            <div className="mt-6">
              <InsightCallouts insights={data.insights} />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <RevenueSessionsChart data={data.timeseries} />
              </div>
              <div className="lg:col-span-2">
                <TopPagesBarChart data={data.topPages} />
              </div>
            </div>

            <div className="mt-6">
              <TopProductsTable data={data.topProducts} />
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
