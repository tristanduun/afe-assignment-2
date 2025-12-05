import { NextRequest, NextResponse } from "next/server";
import { createWorkoutProgram } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const program = await createWorkoutProgram(body);
    return NextResponse.json(program, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create workout program";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
