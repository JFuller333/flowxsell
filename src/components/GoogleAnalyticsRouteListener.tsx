import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { sendGAPageView } from "@/lib/gtag";

/**
 * GA4 gtag in index.html only fires on the first full page load. React Router
 * navigations do not reload the document, so we send page_view on each route change.
 */
export function GoogleAnalyticsRouteListener() {
  const location = useLocation();
  const lastSentPath = useRef<string | undefined>(undefined);

  useEffect(() => {
    const pathWithQuery = `${location.pathname}${location.search}`;

    if (lastSentPath.current === undefined) {
      lastSentPath.current = pathWithQuery;
      return;
    }
    if (lastSentPath.current === pathWithQuery) return;
    lastSentPath.current = pathWithQuery;

    const id = requestAnimationFrame(() => {
      sendGAPageView(pathWithQuery);
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.search]);

  return null;
}
