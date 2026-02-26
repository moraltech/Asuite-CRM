import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const drivers = await prisma.driver.findMany({
    where: { tenantId: session.user.tenantId },
    include: { _count: { select: { loads: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(drivers);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const driver = await prisma.driver.create({
    data: {
      ...data,
      licenseExpiry: new Date(data.licenseExpiry),
      hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
      tenantId: session.user.tenantId,
    },
  });

  return NextResponse.json(driver, { status: 201 });
}
