import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("serendivia_session");
    
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Very crude way to peek into the base64 encoded JSON
      const decoded = atob(sessionCookie.value);
      const session = JSON.parse(decoded);
      
      if (session.role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


