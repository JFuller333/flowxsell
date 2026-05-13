import { buildMockMetrics, buildMockProducts } from "./mock-data";
import type {
  GenerateLandingPageResponse,
  GenerateRequest,
  RangeDays,
  ShopifyMetricsResponse,
  ShopifyProductsResponse,
} from "./types";

// ─── Live → mock fallback ────────────────────────────────────────────────────
// The API returns 503 when env is missing or (for metrics) when Shopify denies access;
// the frontend falls back to Tuskegee demo fixtures.

export async function fetchShopifyMetrics(range: RangeDays): Promise<ShopifyMetricsResponse> {
  const res = await fetch(`/api/shopify-metrics?days=${range}`);
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (res.status === 503) return buildMockMetrics(range);
  if (!res.ok) {
    const detail = typeof data.error === "string" ? data.error : res.statusText;
    throw new Error(`Metrics fetch failed (${res.status}): ${detail}`);
  }
  return data as unknown as ShopifyMetricsResponse;
}

export async function fetchShopifyProducts(): Promise<ShopifyProductsResponse> {
  const res = await fetch(`/api/shopify-products`);
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (res.status === 503) return buildMockProducts();
  if (!res.ok) {
    const detail = typeof data.error === "string" ? data.error : res.statusText;
    throw new Error(`Products fetch failed (${res.status}): ${detail}`);
  }
  return data as unknown as ShopifyProductsResponse;
}

export async function generateLandingPage(
  payload: GenerateRequest,
): Promise<GenerateLandingPageResponse> {
  const res = await fetch(`/api/generate-landing-page`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const detail = typeof data.error === "string" ? data.error : res.statusText;
    throw new Error(detail || `Generation failed: ${res.status}`);
  }
  return data as unknown as GenerateLandingPageResponse;
}
