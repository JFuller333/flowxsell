import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Sticky promo for Metrics to Message, links to the analytics dashboard. Hidden on that route. */
export function SiteBottomPromoBar() {
  const { pathname } = useLocation();
  if (pathname === "/analytics") return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2",
      )}
      role="region"
      aria-label="Metrics to Message: open analytics dashboard"
    >
      <Link
        to="/analytics"
        className={cn(
          "pointer-events-auto flex max-w-lg flex-col gap-1 rounded-lg border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md transition-colors",
          "hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <Badge variant="default" className="shrink-0 px-2 py-0 text-[10px] uppercase tracking-wide">
              New
            </Badge>
            <span className="text-sm font-semibold leading-tight text-foreground">Metrics to Message</span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-primary sm:text-sm">
            Go
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
        <p className="text-[11px] leading-snug text-muted-foreground sm:text-xs">
          Interpret, Strategize, Ship in one place.
        </p>
      </Link>
    </div>
  );
}
