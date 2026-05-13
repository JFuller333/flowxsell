/** GA4 measurement ID (override with VITE_GA_MEASUREMENT_ID in .env). */
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? "G-WFT80SQKPP";

export function sendGAPageView(pathWithQuery: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!GA_MEASUREMENT_ID) return;
  window.gtag("event", "page_view", {
    page_path: pathWithQuery,
    page_title: document.title,
    page_location: `${window.location.origin}${pathWithQuery}${window.location.hash}`,
  });
}
