import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { companyName, name, email, password } = await req.json();

    if (!companyName || !name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const hashedPassword = await hash(password, 12);

    const tenant = await prisma.tenant.create({
      data: {
        name: companyName,
        slug: `${slug}-${Date.now().toString(36)}`,
        users: {
          create: {
            name,
            email,
            password: hashedPassword,
            role: "ADMIN",
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", tenantId: tenant.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
