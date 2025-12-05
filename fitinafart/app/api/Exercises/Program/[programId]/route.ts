import { NextRequest, NextResponse } from "next/server";
import { addExerciseToProgram } from "@/lib/api";

interface RouteParams {
  params: Promise<{ programId: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { programId } = await params;

  try {
    const body = await request.json();
    await addExerciseToProgram(Number(programId), body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add exercise";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
