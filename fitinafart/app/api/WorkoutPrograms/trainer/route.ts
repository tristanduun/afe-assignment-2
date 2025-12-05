import { NextResponse } from "next/server";
import { getTrainerWorkoutPrograms } from "@/lib/api";

export async function GET() {
  try {
    const programs = await getTrainerWorkoutPrograms();
    return NextResponse.json(programs);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch workout programs";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
