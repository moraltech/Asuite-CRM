import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payrolls = await prisma.payroll.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(payrolls);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const basePay = parseFloat(data.basePay);
  const overtime = parseFloat(data.overtime || "0");
  const bonuses = parseFloat(data.bonuses || "0");
  const deductions = parseFloat(data.deductions || "0");
  const taxes = parseFloat(data.taxes || "0");
  const netPay = basePay + overtime + bonuses - deductions - taxes;

  const payroll = await prisma.payroll.create({
    data: {
      employeeName: data.employeeName,
      employeeId: data.employeeId || null,
      period: data.period,
      periodStart: new Date(data.periodStart),
      periodEnd: new Date(data.periodEnd),
      basePay,
      overtime,
      bonuses,
      deductions,
      taxes,
      netPay,
      status: "pending",
      tenantId: session.user.tenantId,
    },
  });

  return NextResponse.json(payroll, { status: 201 });
}
