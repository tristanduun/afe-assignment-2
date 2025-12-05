import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
  Role: "Manager" | "PersonalTrainer" | "Client";
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

// Routes that require specific roles
const trainerOnlyRoutes = ["/new-program", "/clients"];
const trainerOnlyPatterns = [/\/program\/\d+\/add-exercise/];
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
    const payload = decodeJwt(jwt);
    if (payload) {
      const isTrainer = payload.Role === "PersonalTrainer";
      const isManager = payload.Role === "Manager";

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
