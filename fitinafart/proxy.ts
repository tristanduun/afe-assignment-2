import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "@/lib/auth";

// Routes that require specific roles
const trainerOnlyRoutes = ["/new-program", "/clients"];
const trainerOnlyPatterns = [/\/program\/\d+\/add-exercise/];
const managerOnlyRoutes = ["/trainers"];
const managerOrTrainerRoutes = ["/register"];

export function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/login";

  // Redirect logged-in users away from login page
  if (isLoginPage && jwt) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect non-logged-in users to login page
  if (!isLoginPage && !jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control
  if (jwt) {
    const user = decodeJwt(jwt);
    if (user) {
      const isTrainer = user.role === "PersonalTrainer";
      const isManager = user.role === "Manager";

      // Manager-only routes
      if (managerOnlyRoutes.some((route) => pathname.startsWith(route)) && !isManager) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Trainer-only routes
      const isTrainerOnlyRoute = 
        trainerOnlyRoutes.some((route) => pathname.startsWith(route)) ||
        trainerOnlyPatterns.some((pattern) => pattern.test(pathname));
      
      if (isTrainerOnlyRoute && !isTrainer) {
        return NextResponse.redirect(new URL("/program", request.url));
      }

      // Manager or Trainer routes
      if (managerOrTrainerRoutes.some((route) => pathname.startsWith(route)) && !isManager && !isTrainer) {
        return NextResponse.redirect(new URL("/program", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.ico$).*)"],
};
