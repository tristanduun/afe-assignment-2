import { Exercise } from "@/lib/types";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export default function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center gap-3">
        <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        <h3 className="text-lg font-medium text-gray-900">
          {exercise.name || "Unnamed Exercise"}
        </h3>
      </div>

      {exercise.description && (
        <p className="text-gray-600 mt-2 ml-11">{exercise.description}</p>
      )}

      <div className="mt-3 ml-11 flex gap-4 text-sm">
        {exercise.sets && (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {exercise.sets} sets
          </span>
        )}
        {exercise.repetitions && (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {exercise.repetitions} reps
          </span>
        )}
        {exercise.time && (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{exercise.time}</span>
        )}
      </div>
    </div>
  );
}
