import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";

  // Redirect logged-in users away from login page
  if (isLoginPage && jwt) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect non-logged-in users to login page
  if (!isLoginPage && !jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
