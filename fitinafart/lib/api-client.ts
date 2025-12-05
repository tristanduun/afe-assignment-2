import { CreateWorkoutDto, CreateExerciseDto, WorkoutProgram } from "./types";

// ============================================
// Client-side API calls (via Next.js API routes)
// These functions can be used in client components
// ============================================

export async function createWorkoutProgramClient(data: CreateWorkoutDto): Promise<WorkoutProgram | null> {
  const res = await fetch("/api/WorkoutPrograms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create program");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function addExerciseToProgramClient(
  programId: number,
  data: CreateExerciseDto
): Promise<void> {
  const res = await fetch(`/api/Exercises/Program/${programId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to add exercise");
  }
}
