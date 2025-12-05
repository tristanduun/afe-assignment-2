import { NextRequest, NextResponse } from "next/server";
import { LoginDto } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginDto = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://assignment2.swafe.dk/api/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("jwt", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to authentication service" },
      { status: 500 }
    );
  }
}
