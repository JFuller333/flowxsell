import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  prevValue?: number;
  currentValue?: number;
  hint?: string;
};

function pctChange(curr?: number, prev?: number) {
  if (curr === undefined || prev === undefined || prev === 0) return null;
  return ((curr - prev) / prev) * 100;
}

export function MetricCard({ label, value, prevValue, currentValue, hint }: Props) {
  const delta = pctChange(currentValue, prevValue);
  const positive = delta !== null && delta >= 0;
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== null ? (
          <span
            className={cn(
              "inline-flex items-center gap-1",
              positive ? "text-emerald-400" : "text-red-400",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        ) : null}
        {hint ? <span className="text-muted-foreground">{hint}</span> : null}
      </div>
    </Card>
  );
}
