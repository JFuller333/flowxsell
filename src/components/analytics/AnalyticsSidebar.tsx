import { NavLink } from "react-router-dom";
import { LayoutDashboard, Sparkles, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/analytics", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/analytics/generate", label: "Generate", icon: Sparkles, end: false },
  { to: "/analytics/settings", label: "Settings", icon: SettingsIcon, end: false },
];

export function AnalyticsSidebar() {
  return (
    <aside className="hidden md:flex md:w-60 lg:w-64 shrink-0 flex-col border-r border-border bg-card/40">
      <div className="px-6 py-6 border-b border-border">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">FlowXsell</div>
        <div className="mt-1 text-lg font-semibold">Analytics</div>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-4 pb-6 text-[11px] text-muted-foreground/70">
        Built on the Tuskegee Shopify store. Swap creds in Settings to point at any store.
      </div>
    </aside>
  );
}
