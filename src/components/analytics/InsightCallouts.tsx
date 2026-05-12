import { Card } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Insight } from "@/lib/analytics/types";

export function InsightCallouts({ insights }: { insights: Insight[] }) {
  if (!insights.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {insights.map((i, idx) => (
        <Card
          key={idx}
          className={cn(
            "p-4 border-l-4",
            i.kind === "win" ? "border-l-emerald-400" : "border-l-orange-400",
          )}
        >
          <div className="flex items-start gap-2">
            <div
              className={cn(
                "rounded-md p-1.5",
                i.kind === "win" ? "bg-emerald-400/10 text-emerald-400" : "bg-orange-400/10 text-orange-400",
              )}
            >
              {i.kind === "win" ? <TrendingUp className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium leading-snug">{i.title}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{i.detail}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
