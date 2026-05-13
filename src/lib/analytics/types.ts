// ─── Shared types for the /analytics surface ─────────────────────────────────

export type RangeDays = 30 | 60 | 90 | 180 | 270;

export type MetricSummary = {
  revenue: number;
  orders: number;
  aov: number;
  cvr: number;
  prevRevenue: number;
  prevOrders: number;
  prevAov: number;
  prevCvr: number;
};

export type TimeseriesPoint = {
  date: string; // ISO date
  revenue: number;
  sessions: number;
};

export type TopProduct = {
  id: string;
  title: string;
  handle: string;
  revenue: number;
  units: number;
  cvr: number;
  price: number;
};

export type TopPage = {
  path: string;
  visits: number;
  cvr: number;
};

export type TrafficSource = {
  source: string;
  sessions: number;
  share: number;
};

export type Insight = {
  kind: "win" | "warning";
  title: string;
  detail: string;
};

export type ShopifyMetricsResponse = {
  isDemo: boolean;
  storeDomain: string | null;
  range: RangeDays;
  /** Present when live: `shopifyql` = Shopify Analytics sessions; `estimated` = derived from orders. */
  sessionsSource?: "shopifyql" | "estimated";
  summary: MetricSummary;
  timeseries: TimeseriesPoint[];
  topProducts: TopProduct[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  insights: Insight[];
};

export type ProductOption = {
  id: string;
  title: string;
  handle: string;
  price: number;
  description: string;
  topVariant: string | null;
  cvr: number;
  revenue: number;
};

export type ShopifyProductsResponse = {
  isDemo: boolean;
  products: ProductOption[];
};

// ─── Landing-page generator types ─────────────────────────────────────────────

export type GoalKind = "conversion" | "awareness" | "upsell";
export type TrafficKind = "organic" | "paid_social" | "email";

export type GenerateRequest = {
  productId: string;
  goal: GoalKind;
  trafficSource: TrafficKind;
  hypothesis?: string;
};

export type LandingPageOutput = {
  headlines: string[];
  heroCopy: string;
  keyPoints: string[];
  ctaText: string;
  layoutRecommendation: string;
  seoTitle: string;
  seoDescription: string;
};

export type GenerateLandingPageResponse = {
  isDemo: boolean;
  result: LandingPageOutput;
  llm?: "mock" | "anthropic";
  model?: string;
};
