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
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { Plus, DollarSign, Loader2, TrendingUp, Clock } from "lucide-react";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  async function fetchPayrolls() {
    const res = await fetch("/api/payroll");
    const data = await res.json();
    setPayrolls(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    await fetch("/api/payroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setShowDialog(false);
    setSubmitting(false);
    fetchPayrolls();
  }

  const totalPaid = payrolls
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.netPay, 0);
  const totalPending = payrolls
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + p.netPay, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-500 mt-1">
            Manage driver pay, deductions, and tax reports
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Run Payroll
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
              <p className="text-sm text-gray-500">Total Paid</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(totalPending)}
              </p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{payrolls.length}</p>
              <p className="text-sm text-gray-500">Total Records</p>
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
          ) : payrolls.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No payroll records</p>
              <p className="text-sm">Run your first payroll to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Base Pay</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Bonuses</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrolls.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      {p.employeeName}
                    </TableCell>
                    <TableCell className="text-gray-500">{p.period}</TableCell>
                    <TableCell>{formatCurrency(p.basePay)}</TableCell>
                    <TableCell>{formatCurrency(p.overtime)}</TableCell>
                    <TableCell>{formatCurrency(p.bonuses)}</TableCell>
                    <TableCell className="text-red-600">
                      -{formatCurrency(p.deductions)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(p.netPay)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
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
        title="Run Payroll"
        className="max-w-2xl"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            name="employeeName"
            label="Employee Name"
            placeholder="John Smith"
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <Input name="period" label="Period" placeholder="Jan 2026" required />
            <Input name="periodStart" type="date" label="Start Date" required />
            <Input name="periodEnd" type="date" label="End Date" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="basePay"
              type="number"
              step="0.01"
              label="Base Pay ($)"
              placeholder="4000"
              required
            />
            <Input
              name="overtime"
              type="number"
              step="0.01"
              label="Overtime ($)"
              placeholder="0"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              name="bonuses"
              type="number"
              step="0.01"
              label="Bonuses ($)"
              placeholder="0"
            />
            <Input
              name="deductions"
              type="number"
              step="0.01"
              label="Deductions ($)"
              placeholder="0"
            />
            <Input
              name="taxes"
              type="number"
              step="0.01"
              label="Taxes ($)"
              placeholder="0"
            />
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
              Process Payroll
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
