"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  Plus,
  Truck,
  Loader2,
  Package,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function DispatchPage() {
  const [loads, setLoads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLoads();
  }, []);

  async function fetchLoads() {
    const res = await fetch("/api/dispatch");
    const data = await res.json();
    setLoads(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setShowDialog(false);
    setSubmitting(false);
    fetchLoads();
  }

  const inTransit = loads.filter((l) => l.status === "in_transit").length;
  const pending = loads.filter((l) => l.status === "pending").length;
  const totalRate = loads.reduce((s, l) => s + l.rate, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispatch</h1>
          <p className="text-gray-500 mt-1">
            Manage load assignments, routes, and trip status
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create Load
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{loads.length}</p>
              <p className="text-sm text-gray-500">Total Loads</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inTransit}</p>
              <p className="text-sm text-gray-500">In Transit</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalRate)}</p>
              <p className="text-sm text-gray-500">Total Value</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : loads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Truck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No loads yet</p>
              <p className="text-sm">Create your first load to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load #</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Pickup</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loads.map((load) => (
                  <TableRow key={load.id}>
                    <TableCell className="font-mono font-medium">
                      {load.loadNumber}
                    </TableCell>
                    <TableCell>{load.origin}</TableCell>
                    <TableCell>{load.destination}</TableCell>
                    <TableCell className="text-gray-500">
                      {load.driver
                        ? `${load.driver.firstName} ${load.driver.lastName}`
                        : "Unassigned"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          load.status
                        )}`}
                      >
                        {load.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(load.rate)}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatDate(load.pickupDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title="Create Load"
        className="max-w-2xl"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="origin"
              label="Origin"
              placeholder="Chicago, IL"
              required
            />
            <Input
              name="destination"
              label="Destination"
              placeholder="Los Angeles, CA"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              name="rate"
              type="number"
              step="0.01"
              label="Rate ($)"
              placeholder="5000"
              required
            />
            <Input
              name="distance"
              type="number"
              label="Distance (mi)"
              placeholder="2000"
            />
            <Input
              name="weight"
              type="number"
              label="Weight (lbs)"
              placeholder="40000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="pickupDate"
              type="date"
              label="Pickup Date"
              required
            />
            <Input name="deliveryDate" type="date" label="Delivery Date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="commodity"
              label="Commodity"
              placeholder="General Freight"
            />
            <Input name="broker" label="Broker" placeholder="XYZ Logistics" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Create Load
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
