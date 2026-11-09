import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/provider", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("skillbridge-auth")?.value;

  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const session = JSON.parse(decodeURIComponent(authCookie));
    const role = session?.role;

    if (pathname === "/provider" || pathname.startsWith("/provider/")) {
      if (role !== "provider" && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/provider/:path*", "/admin/:path*"],
};
