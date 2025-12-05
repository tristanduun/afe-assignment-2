import { getTrainerWorkoutPrograms } from "@/lib/api";
import { WorkoutProgram } from "@/lib/types";

export default async function ProgramPage() {
  let programs: WorkoutProgram[] = [];
  
  try {
    programs = await getTrainerWorkoutPrograms();
  } catch {
    programs = [];
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workout Programs</h1>

      {programs.length === 0 ? (
        <p className="text-gray-500">No workout programs found.</p>
      ) : (
        <div className="grid gap-4">
          {programs.map((program) => (
            <div
              key={program.workoutProgramId}
              className="border rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold">{program.name || "Untitled Program"}</h2>
              <p className="text-gray-600 mb-4">{program.description || "No description"}</p>

              {program.exercises && program.exercises.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Exercises:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {program.exercises.map((exercise) => (
                      <li key={exercise.exerciseId} className="text-sm">
                        <span className="font-medium">{exercise.name}</span>
                        {exercise.sets && exercise.repetitions && (
                          <span className="text-gray-500">
                            {" "}— {exercise.sets} sets × {exercise.repetitions} reps
                          </span>
                        )}
                        {exercise.time && (
                          <span className="text-gray-500"> — {exercise.time}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
