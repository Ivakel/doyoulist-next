import { NextResponse, type NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const session = await req.cookies.get("next-auth.session-token");
  if (req.nextUrl.pathname === "/home") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (session) {
      return NextResponse.redirect(new URL("/home", req.url));
    } else {
      return NextResponse.next();
    }
  }
}
