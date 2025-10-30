import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("i am in middleware...");
  const token = req.cookies?.get("token")?.value;
  const gtoken = req.cookies?.get("next-auth.session-token")?.value;
  const { pathname } = req.nextUrl;
  const publicRoutes = ["/", "/login"];

  if ((token || gtoken) && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!token && !gtoken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",               
    "/login",     
    "/dashboard/:path*",
  ],
};
