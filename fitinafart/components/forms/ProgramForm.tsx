"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateWorkoutDto, DraftExercise, User } from "@/lib/types";
import { validateDraftExercise, draftToCreateExerciseDto, createEmptyDraftExercise } from "@/lib/exercise-utils";
import { createWorkoutProgramClient } from "@/lib/api-client";
import ExerciseForm from "@/components/forms/ExerciseForm";

interface ProgramFormProps {
  clients: User[];
}

export default function ProgramForm({ clients }: ProgramFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState<number | "">("");
  const [exercises, setExercises] = useState<DraftExercise[]>([]);

  const addExercise = () => {
    setExercises([...exercises, createEmptyDraftExercise()]);
  };

  const updateExercise = (
    index: number,
    field: keyof DraftExercise,
    value: string | number | ""
  ) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const validateAllExercises = (): string | null => {
    for (let i = 0; i < exercises.length; i++) {
      const missingFields = validateDraftExercise(exercises[i]);
      if (missingFields.length > 0) {
        return `Exercise ${i + 1}: Please fill in ${missingFields.join(", ")}`;
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (exercises.length > 0) {
      const validationError = validateAllExercises();
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    
    setIsSubmitting(true);

    const programData: CreateWorkoutDto = {
      name: name || null,
      description: description || null,
      clientId: clientId === "" ? null : clientId,
      exercises: exercises.length > 0 ? exercises.map(draftToCreateExerciseDto) : null,
    };

    try {
      await createWorkoutProgramClient(programData);
      router.push("/program");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create program");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Program Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Program Details</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Program Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Full Body Workout"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the workout program..."
          />
        </div>

        <div>
          <label htmlFor="client" className="block text-sm font-medium mb-1">
            Assign to Client (optional)
          </label>
          <select
            id="client"
            value={clientId}
            onChange={(e) =>
              setClientId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- No client assigned --</option>
            {clients.map((client) => (
              <option key={client.userId} value={client.userId}>
                {client.firstName} {client.lastName} ({client.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Exercises</h2>
          <button
            type="button"
            onClick={addExercise}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
          >
            + Add Exercise
          </button>
        </div>

        {exercises.length === 0 && (
          <p className="text-gray-500 text-sm">
            No exercises added yet. Click &quot;Add Exercise&quot; to include exercises in
            this program.
          </p>
        )}

        {exercises.map((exercise, index) => (
          <ExerciseForm
            key={index}
            exercise={exercise}
            index={index}
            onUpdate={updateExercise}
            onRemove={removeExercise}
          />
        ))}
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Program"}
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
