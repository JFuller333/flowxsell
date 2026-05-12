import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TopPage } from "@/lib/analytics/types";

export function TopPagesBarChart({ data }: { data: TopPage[] }) {
  const sorted = [...data].sort((a, b) => b.cvr - a.cvr).slice(0, 10);
  return (
    <Card className="p-5">
      <div className="mb-4">
        <div className="text-sm font-medium">Top 10 pages by conversion rate</div>
        <div className="text-xs text-muted-foreground">CVR % across recent traffic</div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="path"
              width={170}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                fontSize: 12,
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, "CVR"]}
            />
            <Bar dataKey="cvr" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
