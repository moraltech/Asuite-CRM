"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, BarChart3, TrendingUp, PieChart as PieIcon, Activity } from "lucide-react";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const loadStatusData = stats ? [
    { name: "Pending", value: stats.pendingLoads },
    { name: "In Transit", value: stats.inTransitLoads },
    { name: "Delivered", value: stats.deliveredLoads },
  ] : [];

  const performanceData = [
    { metric: "On-Time Delivery", value: 94 },
    { metric: "Customer Satisfaction", value: 88 },
    { metric: "Fleet Utilization", value: 76 },
    { metric: "Safety Score", value: 97 },
    { metric: "Fuel Efficiency", value: 82 },
  ];

  const monthlyData = stats?.revenueChart?.length ? stats.revenueChart : [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">Financial reports, performance metrics, and KPIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><BarChart3 className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-2xl font-bold">{stats?.totalLoads || 0}</p>
              <p className="text-sm text-gray-500">Total Loads</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><TrendingUp className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-2xl font-bold">94%</p>
              <p className="text-sm text-gray-500">On-Time Rate</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg"><PieIcon className="w-5 h-5 text-purple-600" /></div>
            <div>
              <p className="text-2xl font-bold">76%</p>
              <p className="text-sm text-gray-500">Fleet Utilization</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg"><Activity className="w-5 h-5 text-orange-600" /></div>
            <div>
              <p className="text-2xl font-bold">97</p>
              <p className="text-sm text-gray-500">Safety Score</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Load Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie data={loadStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value" strokeWidth={0}>
                    {loadStatusData.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {loadStatusData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Performance KPIs</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis dataKey="metric" type="category" width={150} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={30}>
                {performanceData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
