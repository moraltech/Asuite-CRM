import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vehicles = await prisma.vehicle.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vehicles);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const vehicle = await prisma.vehicle.create({
    data: {
      ...data,
      year: parseInt(data.year),
      mileage: parseFloat(data.mileage || "0"),
      tenantId: session.user.tenantId,
    },
  });

  return NextResponse.json(vehicle, { status: 201 });
}
