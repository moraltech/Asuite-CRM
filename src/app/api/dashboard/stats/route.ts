import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tenantId = session.user.tenantId;

  const [
    totalDrivers,
    activeDrivers,
    totalLoads,
    pendingLoads,
    inTransitLoads,
    deliveredLoads,
    totalVehicles,
    employees,
    loads,
    payrolls,
  ] = await Promise.all([
    prisma.driver.count({ where: { tenantId } }),
    prisma.driver.count({ where: { tenantId, status: "available" } }),
    prisma.load.count({ where: { tenantId } }),
    prisma.load.count({ where: { tenantId, status: "pending" } }),
    prisma.load.count({ where: { tenantId, status: "in_transit" } }),
    prisma.load.count({ where: { tenantId, status: "delivered" } }),
    prisma.vehicle.count({ where: { tenantId } }),
    prisma.employee.count({ where: { tenantId } }),
    prisma.load.findMany({
      where: { tenantId },
      select: { rate: true, status: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.payroll.findMany({
      where: { tenantId },
      select: { netPay: true, status: true },
    }),
  ]);

  const totalRevenue = loads.reduce((sum, l) => sum + l.rate, 0);
  const totalPayroll = payrolls.reduce((sum, p) => sum + p.netPay, 0);

  const monthlyRevenue: Record<string, number> = {};
  loads.forEach((load) => {
    const month = new Date(load.createdAt).toLocaleString("en-US", {
      month: "short",
    });
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + load.rate;
  });

  const revenueChart = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue: Math.round(revenue),
  }));

  return NextResponse.json({
    totalDrivers,
    activeDrivers,
    totalLoads,
    pendingLoads,
    inTransitLoads,
    deliveredLoads,
    totalVehicles,
    employees,
    totalRevenue,
    totalPayroll,
    revenueChart,
  });
}
