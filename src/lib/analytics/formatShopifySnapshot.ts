import type { ShopifyMetricsResponse } from "./types";

/** Plain-text summary for prompts and the BI Analysis page (matches server-side snapshot shape). */
export function formatShopifyMetricsSnapshot(m: ShopifyMetricsResponse): string {
  const lines: string[] = [];
  lines.push("=== SHOPIFY DATA (same link as dashboard) ===");
  lines.push(`Store: ${m.storeDomain ?? "(unknown)"}`);
  lines.push(`Sample/demo fixture: ${m.isDemo ? "yes" : "no"}`);
  lines.push(`Window: last ${m.range} days`);
  if (m.sessionsSource) lines.push(`Sessions: ${m.sessionsSource}`);
  const s = m.summary;
  lines.push(
    `Revenue $${Math.round(s.revenue).toLocaleString("en-US")} | Orders ${s.orders} | AOV $${s.aov.toFixed(2)} | CVR ${s.cvr.toFixed(2)}%`,
  );
  lines.push(
    `Internal prior-period baseline: revenue $${Math.round(s.prevRevenue).toLocaleString("en-US")}, orders ${s.prevOrders}, CVR ${s.prevCvr.toFixed(2)}%`,
  );
  if (m.insights?.length) {
    lines.push("Signals:");
    for (const i of m.insights) lines.push(`- [${i.kind}] ${i.title}, ${i.detail}`);
  }
  if (m.topProducts?.length) {
    lines.push("Top products (revenue):");
    for (const p of m.topProducts.slice(0, 8)) {
      lines.push(
        `- ${p.title}: $${Math.round(p.revenue).toLocaleString("en-US")}, ${p.units} units, CVR ~${p.cvr.toFixed(2)}%`,
      );
    }
  }
  lines.push("Recent daily (last 7 buckets in window):");
  for (const p of m.timeseries.slice(-7)) {
    lines.push(`- ${p.date}: revenue $${Math.round(p.revenue)}, sessions ${p.sessions ?? 0}`);
  }
  if (!m.trafficSources?.length) {
    lines.push("Channel mix: not in Admin export, use GA4 paste if you have it.");
  }
  return lines.join("\n");
}
