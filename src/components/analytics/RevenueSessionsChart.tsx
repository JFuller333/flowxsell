import { Card } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeseriesPoint } from "@/lib/analytics/types";

function shortDate(s: string) {
  const d = new Date(s);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function RevenueSessionsChart({ data }: { data: TimeseriesPoint[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <div className="text-sm font-medium">Revenue & Sessions</div>
          <div className="text-xs text-muted-foreground">Daily, full range</div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={shortDate}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="rev"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="sess"
              orientation="right"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                fontSize: 12,
              }}
              labelFormatter={(v) => new Date(v).toLocaleDateString()}
              formatter={(value: number, name: string) =>
                name === "Revenue"
                  ? [`$${value.toLocaleString()}`, name]
                  : [value.toLocaleString(), name]
              }
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              yAxisId="rev"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="sess"
              type="monotone"
              dataKey="sessions"
              name="Sessions"
              stroke="#a3e635"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
