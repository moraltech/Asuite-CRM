"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LoadStatusChartProps {
  data: {
    pendingLoads: number;
    inTransitLoads: number;
    deliveredLoads: number;
  };
}

const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

export function LoadStatusChart({ data }: LoadStatusChartProps) {
  const chartData = [
    { name: "Pending", value: data.pendingLoads },
    { name: "In Transit", value: data.inTransitLoads },
    { name: "Delivered", value: data.deliveredLoads },
  ];

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Status</CardTitle>
      </CardHeader>
      <CardContent>
        {total > 0 ? (
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {chartData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[180px] flex items-center justify-center text-gray-400">
            No loads yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
