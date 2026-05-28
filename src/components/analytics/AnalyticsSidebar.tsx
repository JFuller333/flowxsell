import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  Settings as SettingsIcon,
  BarChart3,
  ShieldCheck,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/analytics", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/analytics/generate", label: "Generate", icon: Sparkles, end: false },
  { to: "/analytics/bi-analysis", label: "BI Analysis", icon: BarChart3, end: false },
  { to: "/analytics/security", label: "Security", icon: ShieldCheck, end: false },
  { to: "/analytics/settings", label: "Settings", icon: SettingsIcon, end: false },
];

function navLinkClass(isActive: boolean) {
  return cn(
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:bg-accent hover:text-foreground",
  );
}

export function AnalyticsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="min-w-0">
          <Link
            to="/"
            className="block text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            FlowXsell
          </Link>
          <div className="truncate text-sm font-semibold">Analytics</div>
          <div className="truncate text-xs font-semibold text-primary">Metrics to Message</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border bg-background/80 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="FlowXsell homepage"
          >
            <Home className="h-5 w-5 shrink-0" aria-hidden />
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background/80 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              aria-expanded={mobileOpen}
              aria-controls="analytics-mobile-nav"
              aria-label={mobileOpen ? "Close analytics menu" : "Open analytics menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          <SheetContent
            id="analytics-mobile-nav"
            side="right"
            className="flex w-[min(100vw-1rem,20rem)] flex-col gap-0 border-l border-primary/15 bg-background p-0 pt-12"
          >
            <SheetTitle className="sr-only">Analytics sections</SheetTitle>
            <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-8">
              <div className="mb-4 border-b border-border pb-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                >
                  FlowXsell
                </Link>
                <div className="mt-1 text-lg font-semibold">Analytics</div>
                <div className="mt-1 text-sm font-semibold text-primary">Metrics to Message</div>
              </div>
              <nav className="flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass(false)}
                >
                  <Home className="h-4 w-4 shrink-0" />
                  <span>Homepage</span>
                </Link>
                {NAV.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => navLinkClass(isActive)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
              <p className="mt-auto pt-6 text-[11px] leading-relaxed text-muted-foreground/80">
                Built on the Tuskegee Shopify store. Swap creds in Settings to point at any store.
              </p>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </header>

      <aside className="hidden shrink-0 flex-col border-r border-border bg-card/40 md:flex md:w-60 lg:w-64">
        <div className="border-b border-border px-6 py-6">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            FlowXsell
          </Link>
          <div className="mt-1 text-lg font-semibold">Analytics</div>
          <div className="mt-2 text-base font-semibold tracking-tight text-primary">Metrics to Message</div>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          <Link to="/" className={navLinkClass(false)}>
            <Home className="h-4 w-4 shrink-0" />
            <span>Homepage</span>
          </Link>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-4 pb-6 text-[11px] text-muted-foreground/70">
          Built on the Tuskegee Shopify store. Swap creds in Settings to point at any store.
        </div>
      </aside>
    </>
  );
}
