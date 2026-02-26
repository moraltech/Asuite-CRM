import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const loads = await prisma.load.findMany({
    where: { tenantId: session.user.tenantId },
    include: { driver: true, vehicle: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(loads);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const loadCount = await prisma.load.count({ where: { tenantId: session.user.tenantId } });
  
  const load = await prisma.load.create({
    data: {
      loadNumber: `LD-${String(loadCount + 1).padStart(5, "0")}`,
      origin: data.origin,
      destination: data.destination,
      pickupDate: new Date(data.pickupDate),
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      rate: parseFloat(data.rate),
      distance: data.distance ? parseFloat(data.distance) : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      commodity: data.commodity || null,
      broker: data.broker || null,
      driverId: data.driverId || null,
      vehicleId: data.vehicleId || null,
      status: data.driverId ? "assigned" : "pending",
      tenantId: session.user.tenantId,
    },
    include: { driver: true, vehicle: true },
  });

  return NextResponse.json(load, { status: 201 });
}
