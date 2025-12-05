import { getWorkoutProgram } from "@/lib/api";
import { getAuth, isTrainer } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProgramDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { id } = await params;
  const user = await getAuth();

  let program;
  try {
    program = await getWorkoutProgram(Number(id));
  } catch {
    notFound();
  }

  if (!program) {
    notFound();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/program" className="text-blue-500 hover:underline">
          ← Back to Programs
        </Link>
      </div>

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

          {isTrainer(user) && (
            <Link
              href={`/program/${id}/add-exercise`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Exercise
            </Link>
          )}
        </div>

        {isTrainer(user) && program.clientId && (
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
                <div
                  key={exercise.exerciseId}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-medium">
                      {exercise.name || "Unnamed Exercise"}
                    </h3>
                  </div>

                  {exercise.description && (
                    <p className="text-gray-600 mt-2 ml-11">
                      {exercise.description}
                    </p>
                  )}

                  <div className="mt-3 ml-11 flex gap-4 text-sm">
                    {exercise.sets && (
                      <span className="bg-gray-200 px-2 py-1 rounded">
                        {exercise.sets} sets
                      </span>
                    )}
                    {exercise.repetitions && (
                      <span className="bg-gray-200 px-2 py-1 rounded">
                        {exercise.repetitions} reps
                      </span>
                    )}
                    {exercise.time && (
                      <span className="bg-gray-200 px-2 py-1 rounded">
                        {exercise.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
