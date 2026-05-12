import { Card } from "@/components/ui/card";
import type { TopProduct } from "@/lib/analytics/types";

export function TopProductsTable({ data }: { data: TopProduct[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <div className="text-sm font-medium">Top products</div>
        <div className="text-xs text-muted-foreground">Revenue, units sold, conversion rate</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="text-left py-2 pr-4 font-normal">Product</th>
              <th className="text-right py-2 px-2 font-normal">Revenue</th>
              <th className="text-right py-2 px-2 font-normal">Units</th>
              <th className="text-right py-2 pl-2 font-normal">CVR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-b border-border/40 last:border-0">
                <td className="py-2 pr-4">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">${p.price.toFixed(2)}</div>
                </td>
                <td className="py-2 px-2 text-right tabular-nums">${p.revenue.toLocaleString()}</td>
                <td className="py-2 px-2 text-right tabular-nums">{p.units.toLocaleString()}</td>
                <td className="py-2 pl-2 text-right tabular-nums">{p.cvr.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
