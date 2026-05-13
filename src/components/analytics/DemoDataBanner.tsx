import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export function DemoDataBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="mb-6 flex items-start gap-3 rounded-md border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">
      <Info className="h-4 w-4 mt-0.5 shrink-0" />
      <div>
        Running on demo data.{" "}
        <Link to="/analytics/settings" className="underline underline-offset-2 hover:text-orange-50">
          connect your Shopify store in Settings
        </Link>
        .
      </div>
    </div>
  );
}
