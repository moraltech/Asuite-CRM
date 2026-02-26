"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { LoadStatusChart } from "@/components/dashboard/load-status-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, TrendingUp, Calendar } from "lucide-react";

interface DashboardStats {
  totalDrivers: number;
  activeDrivers: number;
  totalLoads: number;
  pendingLoads: number;
  inTransitLoads: number;
  deliveredLoads: number;
  totalVehicles: number;
  employees: number;
  totalRevenue: number;
  totalPayroll: number;
  revenueChart: { month: string; revenue: number }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-gray-500">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here&apos;s your fleet overview.
        </p>
      </div>

      <StatsCards
        stats={{
          totalRevenue: stats.totalRevenue,
          totalLoads: stats.totalLoads,
          inTransitLoads: stats.inTransitLoads,
          activeDrivers: stats.activeDrivers,
          totalDrivers: stats.totalDrivers,
          totalVehicles: stats.totalVehicles,
        }}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={stats.revenueChart} />
        </div>
        <div>
          <LoadStatusChart
            data={{
              pendingLoads: stats.pendingLoads,
              inTransitLoads: stats.inTransitLoads,
              deliveredLoads: stats.deliveredLoads,
            }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Employees</span>
                <span className="font-semibold">{stats.employees}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Payroll</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(stats.totalPayroll)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Pending Loads</span>
                <span className="font-semibold">{stats.pendingLoads}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">In Transit</span>
                <span className="font-semibold">{stats.inTransitLoads}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">System initialized</p>
                  <p className="text-xs text-gray-500">
                    Dashboard ready with live data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium">
                    {stats.totalLoads} loads in system
                  </p>
                  <p className="text-xs text-gray-500">
                    {stats.deliveredLoads} delivered successfully
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                <div>
                  <p className="text-sm font-medium">
                    {stats.totalDrivers} drivers registered
                  </p>
                  <p className="text-xs text-gray-500">
                    {stats.activeDrivers} currently available
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
