import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          error: "Invalid credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const passwordValid = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          error: "Invalid credentials.",
        },
        {
          status: 401,
        }
      );
    }

    await createAdminSession(admin.id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}