import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { options } from "./app/api/auth/[...nextauth]/options";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const session = await req.cookies.get("next-auth.session-token");
  const loginRedirectUrl = new URL("/login", req.url);
  const homeRedirectUrl = new URL("/home", req.url);

  if (req.nextUrl.pathname === "/home") {
    if (!session) {
      return NextResponse.redirect(loginRedirectUrl);
    } else {
      return NextResponse.next();
    }
  }
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    
    if (session) {
      return NextResponse.redirect(homeRedirectUrl);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/home", "/home/:path*", "/api/:path*"]
}
