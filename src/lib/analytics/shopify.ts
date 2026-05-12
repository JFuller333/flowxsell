import { buildMockMetrics, buildMockProducts } from "./mock-data";
import type {
  GenerateRequest,
  LandingPageOutput,
  RangeDays,
  ShopifyMetricsResponse,
  ShopifyProductsResponse,
} from "./types";

// ─── Live → mock fallback ────────────────────────────────────────────────────
// The API returns 503 with { error: "not_configured" } when env vars are missing.
// The frontend handles the demo fixture so the server stays cred-aware only.

export async function fetchShopifyMetrics(range: RangeDays): Promise<ShopifyMetricsResponse> {
  const res = await fetch(`/api/shopify-metrics?days=${range}`);
  if (res.status === 503) return buildMockMetrics(range);
  if (!res.ok) throw new Error(`Metrics fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchShopifyProducts(): Promise<ShopifyProductsResponse> {
  const res = await fetch(`/api/shopify-products`);
  if (res.status === 503) return buildMockProducts();
  if (!res.ok) throw new Error(`Products fetch failed: ${res.status}`);
  return res.json();
}

export async function generateLandingPage(
  payload: GenerateRequest,
): Promise<{ isDemo: boolean; result: LandingPageOutput }> {
  const res = await fetch(`/api/generate-landing-page`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Generation failed: ${res.status}`);
  }
  return res.json();
}
