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

const RANGES: RangeDays[] = [30, 60, 90];

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
    <div className="flex min-h-screen bg-background text-foreground">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Live metrics from your connected Shopify store.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
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
                {r} days
              </button>
            ))}
          </div>
        </header>

        <DemoDataBanner visible={Boolean(data?.isDemo)} />

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
