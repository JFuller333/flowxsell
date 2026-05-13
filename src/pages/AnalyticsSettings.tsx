import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

const LS_KEY = "fx_analytics_settings";

type Settings = {
  storeDomain: string;
  adminToken: string;
};

export default function AnalyticsSettings() {
  const [settings, setSettings] = useState<Settings>({ storeDomain: "", adminToken: "" });

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setSettings(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  function update(patch: Partial<Settings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Connect a Shopify store. Server-side credentials live in <code>.env</code> — the fields below mirror them for demo convenience.
          </p>
        </header>

        <Card className="max-w-xl p-6">
          <div className="grid gap-5">
            <div>
              <Label htmlFor="store-domain" className="text-xs">
                Store domain
              </Label>
              <Input
                id="store-domain"
                className="mt-1.5"
                placeholder="your-store.myshopify.com"
                value={settings.storeDomain}
                onChange={(e) => update({ storeDomain: e.target.value })}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Example: <code>letsrebuildtuskegee.myshopify.com</code>
              </p>
            </div>
            <div>
              <Label htmlFor="admin-token" className="text-xs">
                Shopify Admin API token
              </Label>
              <Input
                id="admin-token"
                type="password"
                className="mt-1.5"
                placeholder="shpat_…"
                value={settings.adminToken}
                onChange={(e) => update({ adminToken: e.target.value })}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Stored locally for reference only. The server reads from <code>SHOPIFY_ADMIN_API_TOKEN</code> in <code>.env</code>.
              </p>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
              <div className="mb-2 text-sm font-medium text-foreground">How to get an Admin API token</div>
              <ol className="list-decimal pl-5 space-y-1">
                <li>In Shopify admin, open <strong>Apps → App and sales channel settings → Develop apps</strong>.</li>
                <li>Create a new app, then open <strong>Configuration → Admin API access scopes</strong>.</li>
                <li>
                  Grant: <code>read_products</code> and <code>read_orders</code>. Add <code>read_all_orders</code> only if you need older order history than the default window allows.
                </li>
                <li>Install the app, then copy the Admin API access token from the API credentials tab.</li>
                <li>
                  Paste it into <code>flowxsell/.env</code> as <code>SHOPIFY_ADMIN_API_TOKEN</code>, restart{" "}
                  <code>npm run dev:full</code>.
                </li>
                <li>
                  Smoke test (direct to API, not Vite):{" "}
                  <code className="break-all">curl -sS &quot;http://localhost:3001/api/shopify-smoke&quot;</code>
                </li>
              </ol>
              <button
                className="mt-3 underline underline-offset-2 hover:text-foreground"
                onClick={() => toast.info("Restart the dev server after updating .env")}
              >
                I've updated .env — what now?
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
