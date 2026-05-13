import { AnalyticsSidebar } from "@/components/analytics/AnalyticsSidebar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { useEffect, useMemo, useState } from "react";

const LS_KEY = "fx_analytics_settings";

type Ga4Settings = {
  propertyId: string;
  measurementId: string;
  /** Service account JSON (GA4 Data API) or paste path note, stored only in browser for demo */
  serviceAccountJson: string;
};

type MetaSettings = {
  appId: string;
  appSecret: string;
  /** Marketing API / Graph: long-lived or system user token */
  accessToken: string;
  adAccountId: string;
  pixelId: string;
};

type Settings = {
  storeDomain: string;
  adminToken: string;
  ga4: Ga4Settings;
  meta: MetaSettings;
};

const emptyGa4: Ga4Settings = {
  propertyId: "",
  measurementId: "",
  serviceAccountJson: "",
};

const emptyMeta: MetaSettings = {
  appId: "",
  appSecret: "",
  accessToken: "",
  adAccountId: "",
  pixelId: "",
};

function normalizeSettings(raw: unknown): Settings {
  if (!raw || typeof raw !== "object") {
    return { storeDomain: "", adminToken: "", ga4: { ...emptyGa4 }, meta: { ...emptyMeta } };
  }
  const o = raw as Record<string, unknown>;
  const ga4Raw = o.ga4 && typeof o.ga4 === "object" ? (o.ga4 as Record<string, unknown>) : {};
  const metaRaw = o.meta && typeof o.meta === "object" ? (o.meta as Record<string, unknown>) : {};
  return {
    storeDomain: typeof o.storeDomain === "string" ? o.storeDomain : "",
    adminToken: typeof o.adminToken === "string" ? o.adminToken : "",
    ga4: {
      propertyId: typeof ga4Raw.propertyId === "string" ? ga4Raw.propertyId : "",
      measurementId: typeof ga4Raw.measurementId === "string" ? ga4Raw.measurementId : "",
      serviceAccountJson:
        typeof ga4Raw.serviceAccountJson === "string" ? ga4Raw.serviceAccountJson : "",
    },
    meta: {
      appId: typeof metaRaw.appId === "string" ? metaRaw.appId : "",
      appSecret: typeof metaRaw.appSecret === "string" ? metaRaw.appSecret : "",
      accessToken: typeof metaRaw.accessToken === "string" ? metaRaw.accessToken : "",
      adAccountId: typeof metaRaw.adAccountId === "string" ? metaRaw.adAccountId : "",
      pixelId: typeof metaRaw.pixelId === "string" ? metaRaw.pixelId : "",
    },
  };
}

export default function AnalyticsSettings() {
  const [settings, setSettings] = useState<Settings>(() => ({
    storeDomain: "",
    adminToken: "",
    ga4: { ...emptyGa4 },
    meta: { ...emptyMeta },
  }));

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setSettings(normalizeSettings(JSON.parse(raw)));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const hasGa4 = useMemo(
    () =>
      Boolean(
        settings.ga4.propertyId.trim() ||
          settings.ga4.measurementId.trim() ||
          settings.ga4.serviceAccountJson.trim(),
      ),
    [settings.ga4],
  );

  const hasMeta = useMemo(
    () =>
      Boolean(
        settings.meta.appId.trim() ||
          settings.meta.appSecret.trim() ||
          settings.meta.accessToken.trim() ||
          settings.meta.adAccountId.trim() ||
          settings.meta.pixelId.trim(),
      ),
    [settings.meta],
  );

  function persist(next: Settings) {
    setSettings(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  function update(patch: Partial<Pick<Settings, "storeDomain" | "adminToken">>) {
    persist({ ...settings, ...patch });
  }

  function updateGa4(patch: Partial<Ga4Settings>) {
    persist({ ...settings, ga4: { ...settings.ga4, ...patch } });
  }

  function updateMeta(patch: Partial<MetaSettings>) {
    persist({ ...settings, meta: { ...settings.meta, ...patch } });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <AnalyticsSidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Connect data sources. Shopify secrets for the live API belong in <code>.env</code>; GA4 and Meta fields
            below are saved in your browser for when we wire reporting (not sent to the server yet).
          </p>
        </header>

        <Tabs defaultValue="shopify" className="max-w-xl">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="shopify">Shopify</TabsTrigger>
            <TabsTrigger value="ga4">
              GA4
              {hasGa4 ? <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden /> : null}
            </TabsTrigger>
            <TabsTrigger value="meta">
              Meta
              {hasMeta ? <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden /> : null}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shopify" className="mt-0">
            <Card className="p-6">
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
                    Stored locally for reference only. The server reads from <code>SHOPIFY_ADMIN_API_TOKEN</code> in{" "}
                    <code>.env</code>.
                  </p>
                </div>

                <div className="rounded-md border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
                  <div className="mb-2 text-sm font-medium text-foreground">How to get an Admin API token</div>
                  <ol className="list-decimal space-y-1 pl-5">
                    <li>In Shopify admin, open <strong>Apps → App and sales channel settings → Develop apps</strong>.</li>
                    <li>Create a new app, then open <strong>Configuration → Admin API access scopes</strong>.</li>
                    <li>
                      Grant: <code>read_products</code> and <code>read_orders</code>. Add <code>read_all_orders</code>{" "}
                      only if you need older order history than the default window allows.
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
                    type="button"
                    className="mt-3 underline underline-offset-2 hover:text-foreground"
                    onClick={() => toast.info("Restart the dev server after updating .env")}
                  >
                    I've updated .env, what now?
                  </button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ga4" className="mt-0">
            <Card className="p-6">
              <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-950 dark:text-amber-100">
                GA4 reporting uses Google&apos;s APIs. Keep service account keys out of git; production should use
                server env or a secret manager, not long-term browser storage.
              </div>
              <div className="grid gap-5">
                <div>
                  <Label htmlFor="ga4-property" className="text-xs">
                    GA4 property ID
                  </Label>
                  <Input
                    id="ga4-property"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="123456789"
                    inputMode="numeric"
                    autoComplete="off"
                    value={settings.ga4.propertyId}
                    onChange={(e) => updateGa4({ propertyId: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Admin → Property settings → Property ID (numeric). Used with the Data API once connected.
                  </p>
                </div>
                <div>
                  <Label htmlFor="ga4-measurement" className="text-xs">
                    Measurement ID (optional)
                  </Label>
                  <Input
                    id="ga4-measurement"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="G-XXXXXXXXXX"
                    autoComplete="off"
                    value={settings.ga4.measurementId}
                    onChange={(e) => updateGa4({ measurementId: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Matches your web data stream; useful for GTM / gtag alignment.</p>
                </div>
                <div>
                  <Label htmlFor="ga4-sa-json" className="text-xs">
                    Service account JSON (Data API)
                  </Label>
                  <Textarea
                    id="ga4-sa-json"
                    className="mt-1.5 min-h-[140px] font-mono text-xs"
                    placeholder='Paste the full JSON key from Google Cloud (type "service_account"…)'
                    spellCheck={false}
                    autoComplete="off"
                    value={settings.ga4.serviceAccountJson}
                    onChange={(e) => updateGa4({ serviceAccountJson: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    In Google Cloud: IAM → service account → Keys → Add JSON. In GA4: Property access management → add
                    that service account email as <strong>Viewer</strong> (or Analyst).
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="meta" className="mt-0">
            <Card className="p-6">
              <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-950 dark:text-amber-100">
                Meta Marketing API credentials are highly sensitive. This UI only stores them in localStorage for
                future server-side pulls; do not commit tokens or use shared machines for production secrets.
              </div>
              <div className="grid gap-5">
                <div>
                  <Label htmlFor="meta-app-id" className="text-xs">
                    Meta app ID
                  </Label>
                  <Input
                    id="meta-app-id"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="e.g. 1234567890123456"
                    autoComplete="off"
                    value={settings.meta.appId}
                    onChange={(e) => updateMeta({ appId: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="meta-app-secret" className="text-xs">
                    App secret
                  </Label>
                  <Input
                    id="meta-app-secret"
                    type="password"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="From Meta Developer → App → Settings → Basic"
                    autoComplete="off"
                    value={settings.meta.appSecret}
                    onChange={(e) => updateMeta({ appSecret: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="meta-token" className="text-xs">
                    Access token
                  </Label>
                  <Input
                    id="meta-token"
                    type="password"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="Long-lived user or system user token with ads_read / ads_management as needed"
                    autoComplete="off"
                    value={settings.meta.accessToken}
                    onChange={(e) => updateMeta({ accessToken: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="meta-ad-account" className="text-xs">
                    Ad account ID
                  </Label>
                  <Input
                    id="meta-ad-account"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="act_1234567890"
                    autoComplete="off"
                    value={settings.meta.adAccountId}
                    onChange={(e) => updateMeta({ adAccountId: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Ads Manager → account settings; include the act_ prefix.</p>
                </div>
                <div>
                  <Label htmlFor="meta-pixel" className="text-xs">
                    Pixel ID (optional)
                  </Label>
                  <Input
                    id="meta-pixel"
                    className="mt-1.5 font-mono text-sm"
                    placeholder="Numeric pixel ID"
                    autoComplete="off"
                    value={settings.meta.pixelId}
                    onChange={(e) => updateMeta({ pixelId: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">For Events / CAPI alignment alongside Ads insights.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
