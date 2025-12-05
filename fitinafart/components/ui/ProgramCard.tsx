import { WorkoutProgram } from "@/lib/types";
import ExerciseCard from "./ExerciseCard";
import Link from "next/link";

interface ProgramCardProps {
  program: WorkoutProgram;
  showClientInfo?: boolean;
  showAddExercise?: boolean;
}

export default function ProgramCard({
  program,
  showClientInfo = false,
  showAddExercise = false,
}: ProgramCardProps) {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">
            {program.name || "Untitled Program"}
          </h1>
          <p className="text-gray-600 mt-2">
            {program.description || "No description"}
          </p>
        </div>

        {showAddExercise && (
          <Link
            href={`/program/${program.workoutProgramId}/add-exercise`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Exercise
          </Link>
        )}
      </div>

      {showClientInfo && program.clientId && (
        <p className="text-sm text-gray-500 mb-4">
          Client ID: {program.clientId}
        </p>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Exercises</h2>

        {!program.exercises || program.exercises.length === 0 ? (
          <p className="text-gray-500">No exercises in this program yet.</p>
        ) : (
          <div className="space-y-4">
            {program.exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.exerciseId}
                exercise={exercise}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
