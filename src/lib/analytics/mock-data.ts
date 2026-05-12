import type {
  Insight,
  ProductOption,
  RangeDays,
  ShopifyMetricsResponse,
  ShopifyProductsResponse,
  TimeseriesPoint,
  TopPage,
  TopProduct,
  TrafficSource,
} from "./types";

// ─── Deterministic seeded RNG so the demo doesn't shift between renders ───────
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const PRODUCTS: ProductOption[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Let's Rebuild Tuskegee — Founders Edition Tee",
    handle: "founders-edition-tee",
    price: 42,
    description:
      "Premium heavyweight tee honoring the rebuild of Tuskegee. Embroidered crest, ringspun cotton, made for everyday wear.",
    topVariant: "L / Black",
    cvr: 4.8,
    revenue: 18420,
  },
  {
    id: "gid://shopify/Product/2",
    title: "Heritage Hoodie",
    handle: "heritage-hoodie",
    price: 78,
    description:
      "Cream-on-black heritage hoodie with raised embroidery. Brushed inner fleece, drop-shoulder fit.",
    topVariant: "M / Cream",
    cvr: 3.2,
    revenue: 24960,
  },
  {
    id: "gid://shopify/Product/3",
    title: "Campus Cap",
    handle: "campus-cap",
    price: 32,
    description:
      "Six-panel structured cap with vintage block lettering. Adjustable strap, unisex.",
    topVariant: "OS / Maroon",
    cvr: 2.1,
    revenue: 6080,
  },
  {
    id: "gid://shopify/Product/4",
    title: "Builder's Tote",
    handle: "builders-tote",
    price: 28,
    description:
      "Canvas tote engineered for carry. Reinforced base, screen-printed mark, gusseted bottom.",
    topVariant: "OS / Natural",
    cvr: 5.6,
    revenue: 8260,
  },
  {
    id: "gid://shopify/Product/5",
    title: "Rebuild Crewneck",
    handle: "rebuild-crewneck",
    price: 68,
    description:
      "Mid-weight crewneck. Tonal embroidery, side seam, pre-shrunk.",
    topVariant: "L / Stone",
    cvr: 2.9,
    revenue: 15640,
  },
  {
    id: "gid://shopify/Product/6",
    title: "Legacy Beanie",
    handle: "legacy-beanie",
    price: 24,
    description:
      "Cuffed knit beanie in soft acrylic-wool blend. Embroidered patch.",
    topVariant: "OS / Black",
    cvr: 3.7,
    revenue: 3120,
  },
];

const TOP_PAGES: TopPage[] = [
  { path: "/products/builders-tote", visits: 4280, cvr: 5.6 },
  { path: "/products/founders-edition-tee", visits: 9120, cvr: 4.8 },
  { path: "/products/legacy-beanie", visits: 1840, cvr: 3.7 },
  { path: "/products/heritage-hoodie", visits: 7640, cvr: 3.2 },
  { path: "/products/rebuild-crewneck", visits: 5210, cvr: 2.9 },
  { path: "/collections/all", visits: 12480, cvr: 2.4 },
  { path: "/products/campus-cap", visits: 2840, cvr: 2.1 },
  { path: "/pages/our-story", visits: 3120, cvr: 1.8 },
  { path: "/", visits: 18420, cvr: 1.5 },
  { path: "/pages/shipping", visits: 1240, cvr: 0.6 },
];

const TRAFFIC_SOURCES: TrafficSource[] = [
  { source: "Direct", sessions: 14820, share: 0.31 },
  { source: "Organic Search", sessions: 11240, share: 0.24 },
  { source: "Paid Social", sessions: 9680, share: 0.20 },
  { source: "Email", sessions: 6120, share: 0.13 },
  { source: "Referral", sessions: 3840, share: 0.08 },
  { source: "Other", sessions: 1900, share: 0.04 },
];

function buildTimeseries(days: RangeDays): TimeseriesPoint[] {
  const rng = seeded(days * 1337);
  const out: TimeseriesPoint[] = [];
  const now = new Date();
  const baseRev = 2400;
  const baseSess = 1600;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const wow = Math.sin(i / 6) * 0.18;
    const noise = (rng() - 0.5) * 0.22;
    const lift = (days - i) / days * 0.35;
    const rev = Math.round(baseRev * (1 + wow + noise + lift));
    const sess = Math.round(baseSess * (1 + wow * 0.7 + noise * 0.5 + lift * 0.6));
    out.push({ date: d.toISOString().slice(0, 10), revenue: rev, sessions: sess });
  }
  return out;
}

function buildSummary(timeseries: TimeseriesPoint[]) {
  const totalRev = timeseries.reduce((a, b) => a + b.revenue, 0);
  const totalSess = timeseries.reduce((a, b) => a + b.sessions, 0);
  const ordersGuess = Math.round(totalRev / 62);
  const aov = ordersGuess > 0 ? totalRev / ordersGuess : 0;
  const cvr = totalSess > 0 ? (ordersGuess / totalSess) * 100 : 0;
  return {
    revenue: totalRev,
    orders: ordersGuess,
    aov,
    cvr,
    prevRevenue: Math.round(totalRev * 0.86),
    prevOrders: Math.round(ordersGuess * 0.91),
    prevAov: aov * 0.95,
    prevCvr: cvr * 0.93,
  };
}

function buildInsights(topProducts: TopProduct[], topPages: TopPage[]): Insight[] {
  const storeAvgCvr =
    topPages.reduce((a, b) => a + b.cvr, 0) / Math.max(topPages.length, 1);
  const best = [...topProducts].sort((a, b) => b.cvr - a.cvr)[0];
  const worst = [...topPages].sort((a, b) => a.cvr - b.cvr)[0];

  const wins: Insight[] = [];
  if (best && best.cvr > storeAvgCvr * 1.5) {
    wins.push({
      kind: "win",
      title: `${best.title} converts ${(best.cvr / storeAvgCvr).toFixed(1)}x site average`,
      detail: `At ${best.cvr.toFixed(1)}% CVR vs ${storeAvgCvr.toFixed(1)}% store average. Scale paid traffic to this PDP — it's your sharpest conversion surface.`,
    });
  }
  const warnings: Insight[] = [];
  if (worst && worst.cvr < storeAvgCvr * 0.5 && worst.visits > 1000) {
    warnings.push({
      kind: "warning",
      title: `${worst.path} leaks traffic at ${worst.cvr.toFixed(1)}% CVR`,
      detail: `${worst.visits.toLocaleString()} sessions in window with conversion well below store average. Likely a content-only page being treated as a destination — fix the call-to-action above the fold.`,
    });
  }
  warnings.push({
    kind: "warning",
    title: "AOV trending flat — bundle opportunity",
    detail: "Three top SKUs are commonly bought together but no bundle exists. A two-item discount of 10% projects +$3.40 AOV.",
  });
  return [...wins, ...warnings].slice(0, 3);
}

export function buildMockMetrics(range: RangeDays): ShopifyMetricsResponse {
  const timeseries = buildTimeseries(range);
  const summary = buildSummary(timeseries);
  const topProducts: TopProduct[] = PRODUCTS.map((p) => ({
    id: p.id,
    title: p.title,
    handle: p.handle,
    revenue: p.revenue,
    units: Math.round(p.revenue / p.price),
    cvr: p.cvr,
    price: p.price,
  })).sort((a, b) => b.revenue - a.revenue);

  return {
    isDemo: true,
    storeDomain: null,
    range,
    summary,
    timeseries,
    topProducts,
    topPages: [...TOP_PAGES].sort((a, b) => b.cvr - a.cvr).slice(0, 10),
    trafficSources: TRAFFIC_SOURCES,
    insights: buildInsights(topProducts, TOP_PAGES),
  };
}

export function buildMockProducts(): ShopifyProductsResponse {
  return { isDemo: true, products: PRODUCTS };
}
