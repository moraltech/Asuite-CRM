"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { formatNumber, getStatusColor, getInitials } from "@/lib/utils";
import { Plus, UserCheck, Loader2, Star, MapPin, Award } from "lucide-react";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchDrivers(); }, []);

  async function fetchDrivers() {
    const res = await fetch("/api/drivers");
    const data = await res.json();
    setDrivers(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    await fetch("/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setShowDialog(false);
    setSubmitting(false);
    fetchDrivers();
  }

  const available = drivers.filter((d) => d.status === "available").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <p className="text-gray-500 mt-1">Manage driver profiles, licenses, and compliance</p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><UserCheck className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-2xl font-bold">{drivers.length}</p>
              <p className="text-sm text-gray-500">Total Drivers</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><Award className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-2xl font-bold">{available}</p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg"><MapPin className="w-5 h-5 text-purple-600" /></div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(drivers.reduce((s, d) => s + d.totalMiles, 0))}</p>
              <p className="text-sm text-gray-500">Total Miles</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
          ) : drivers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <UserCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No drivers yet</p>
              <p className="text-sm">Add your first driver to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Trips</TableHead>
                  <TableHead>Miles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                          {getInitials(`${d.firstName} ${d.lastName}`)}
                        </div>
                        <div>
                          <p className="font-medium">{d.firstName} {d.lastName}</p>
                          <p className="text-xs text-gray-500">{d.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{d.licenseNumber}</p>
                      <p className="text-xs text-gray-500">{d.licenseClass}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(d.status)}`}>
                        {d.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{d.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{d.totalTrips}</TableCell>
                    <TableCell>{formatNumber(d.totalMiles)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)} title="Add Driver" className="max-w-2xl">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="firstName" label="First Name" placeholder="Mike" required />
            <Input name="lastName" label="Last Name" placeholder="Johnson" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" type="email" label="Email" placeholder="mike@company.com" required />
            <Input name="phone" label="Phone" placeholder="(555) 123-4567" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input name="licenseNumber" label="License Number" placeholder="CDL-12345" required />
            <Select name="licenseClass" label="License Class" options={[
              { value: "Class A CDL", label: "Class A CDL" },
              { value: "Class B CDL", label: "Class B CDL" },
            ]} />
            <Input name="licenseExpiry" type="date" label="License Expiry" required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Add Driver
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
