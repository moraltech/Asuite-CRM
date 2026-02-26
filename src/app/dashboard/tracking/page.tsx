"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Truck, Navigation, AlertTriangle } from "lucide-react";

const FleetMap = dynamic(() => import("@/components/tracking/fleet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

const simulatedTrucks = [
  { id: "1", name: "Truck #101 - Mike Johnson", lat: 41.8781, lng: -87.6298, status: "In Transit", speed: 62, heading: "SW on I-55" },
  { id: "2", name: "Truck #102 - Sarah Williams", lat: 34.0522, lng: -118.2437, status: "Loading", speed: 0, heading: "At dock - LA Terminal" },
  { id: "3", name: "Truck #103 - James Brown", lat: 29.7604, lng: -95.3698, status: "In Transit", speed: 58, heading: "NE on I-10" },
  { id: "4", name: "Truck #104 - David Lee", lat: 39.7392, lng: -104.9903, status: "Rest Stop", speed: 0, heading: "I-70 Rest Area" },
  { id: "5", name: "Truck #105 - Chris Wilson", lat: 36.1627, lng: -86.7816, status: "In Transit", speed: 65, heading: "E on I-40" },
  { id: "6", name: "Truck #106 - Tom Martinez", lat: 47.6062, lng: -122.3321, status: "Delivered", speed: 0, heading: "Seattle Terminal" },
];

export default function TrackingPage() {
  const [trucks] = useState(simulatedTrucks);

  const inTransit = trucks.filter((t) => t.status === "In Transit").length;
  const stopped = trucks.filter((t) => t.speed === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fleet Tracking</h1>
        <p className="text-gray-500 mt-1">Real-time GPS tracking and fleet monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><Truck className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-2xl font-bold">{trucks.length}</p>
              <p className="text-sm text-gray-500">Total Fleet</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><Navigation className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-2xl font-bold">{inTransit}</p>
              <p className="text-sm text-gray-500">In Transit</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg"><MapPin className="w-5 h-5 text-orange-600" /></div>
            <div>
              <p className="text-2xl font-bold">{stopped}</p>
              <p className="text-sm text-gray-500">Stopped</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-500">Alerts</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[500px]">
                <FleetMap trucks={trucks} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trucks.map((truck) => (
                  <div key={truck.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-2 h-2 rounded-full ${truck.speed > 0 ? "bg-green-500" : "bg-yellow-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{truck.name}</p>
                      <p className="text-xs text-gray-500">{truck.heading}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500">{truck.speed > 0 ? `${truck.speed} mph` : "Stopped"}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
