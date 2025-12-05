import { DraftExercise, CreateExerciseDto } from "./types";

/**
 * Validates a draft exercise and returns an array of missing field names.
 * Returns empty array if all fields are valid.
 */
export function validateDraftExercise(exercise: DraftExercise): string[] {
  const missingFields: string[] = [];
  if (!exercise.name.trim()) missingFields.push("Name");
  if (!exercise.description.trim()) missingFields.push("Description");
  if (exercise.sets === "" || exercise.sets <= 0) missingFields.push("Sets");
  if (exercise.repetitions === "" || exercise.repetitions <= 0) missingFields.push("Repetitions");
  if (!exercise.time.trim()) missingFields.push("Time");
  return missingFields;
}

/**
 * Converts a draft exercise to the API DTO format.
 * Should only be called after validation passes.
 */
export function draftToCreateExerciseDto(exercise: DraftExercise): CreateExerciseDto {
  return {
    name: exercise.name.trim(),
    description: exercise.description.trim(),
    sets: exercise.sets as number,
    repetitions: exercise.repetitions as number,
    time: exercise.time.trim(),
  };
}

/**
 * Creates a new empty draft exercise for form initialization.
 */
export function createEmptyDraftExercise(): DraftExercise {
  return { name: "", description: "", sets: "", repetitions: "", time: "" };
}
