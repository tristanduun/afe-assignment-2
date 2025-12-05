"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DraftExercise } from "@/lib/types";
import { validateDraftExercise, draftToCreateExerciseDto, createEmptyDraftExercise } from "@/lib/exercise-utils";
import { addExerciseToProgramClient } from "@/lib/api-client";
import { ExerciseFields } from "@/components/forms/ExerciseForm";

interface AddExerciseFormProps {
  programId: number;
}

export default function AddExerciseForm({ programId }: AddExerciseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exercise, setExercise] = useState<DraftExercise>(createEmptyDraftExercise());

  const updateField = (field: keyof DraftExercise, value: string | number | "") => {
    setExercise(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingFields = validateDraftExercise(exercise);
    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      await addExerciseToProgramClient(programId, draftToCreateExerciseDto(exercise));
      router.push(`/program/${programId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add exercise");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <ExerciseFields exercise={exercise} onUpdate={updateField} />

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Exercise"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
