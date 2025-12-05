"use client";

import { DraftExercise } from "@/lib/types";

interface ExerciseFieldsProps {
  exercise: DraftExercise;
  onUpdate: (field: keyof DraftExercise, value: string | number | "") => void;
  idPrefix?: string;
}

// Reusable exercise fields component
export function ExerciseFields({ exercise, onUpdate, idPrefix = "" }: ExerciseFieldsProps) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor={`${idPrefix}name`} className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          id={`${idPrefix}name`}
          value={exercise.name}
          onChange={(e) => onUpdate("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Squats"
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}description`} className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          id={`${idPrefix}description`}
          value={exercise.description}
          onChange={(e) => onUpdate("description", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Barbell back squats"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${idPrefix}sets`} className="block text-sm font-medium mb-1">Sets</label>
          <input
            type="number"
            id={`${idPrefix}sets`}
            min="1"
            value={exercise.sets}
            onChange={(e) => onUpdate("sets", e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3"
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}repetitions`} className="block text-sm font-medium mb-1">Repetitions</label>
          <input
            type="number"
            id={`${idPrefix}repetitions`}
            min="1"
            value={exercise.repetitions}
            onChange={(e) => onUpdate("repetitions", e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}time`} className="block text-sm font-medium mb-1">Time</label>
        <input
          type="text"
          id={`${idPrefix}time`}
          value={exercise.time}
          onChange={(e) => onUpdate("time", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 30 seconds"
        />
      </div>
    </div>
  );
}

interface ExerciseFormProps {
  exercise: DraftExercise;
  index: number;
  onUpdate: (index: number, field: keyof DraftExercise, value: string | number | "") => void;
  onRemove: (index: number) => void;
}

// Exercise form card with remove button (used in ProgramForm)
export default function ExerciseForm({ exercise, index, onUpdate, onRemove }: ExerciseFormProps) {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">Exercise {index + 1}</span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>

      <ExerciseFields
        exercise={exercise}
        onUpdate={(field, value) => onUpdate(index, field, value)}
        idPrefix={`exercise-${index}-`}
      />
    </div>
  );
}
