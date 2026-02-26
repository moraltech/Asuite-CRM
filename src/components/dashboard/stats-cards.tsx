"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { DollarSign, Truck, Users, MapPin } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalRevenue: number;
    totalLoads: number;
    inTransitLoads: number;
    activeDrivers: number;
    totalDrivers: number;
    totalVehicles: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
      badge: "All time",
    },
    {
      label: "Active Loads",
      value: formatNumber(stats.inTransitLoads),
      icon: Truck,
      color: "bg-blue-50 text-blue-600",
      badge: `${stats.totalLoads} total`,
    },
    {
      label: "Active Drivers",
      value: formatNumber(stats.activeDrivers),
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      badge: `${stats.totalDrivers} total`,
    },
    {
      label: "Fleet Size",
      value: formatNumber(stats.totalVehicles),
      icon: MapPin,
      color: "bg-orange-50 text-orange-600",
      badge: "Vehicles",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.label} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-400">
              {card.badge}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
