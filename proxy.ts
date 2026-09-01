import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.ADMIN_SESSION_SECRET;

if (!secret) {
  throw new Error("ADMIN_SESSION_SECRET is not defined");
}

const SECRET = new TextEncoder().encode(secret);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow the admin login page
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/")
  ) {
    return NextResponse.next();
  }

  // Ignore everything outside /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;

  // No session → login
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    await jwtVerify(token, SECRET);

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    response.cookies.delete("admin_session");

    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};