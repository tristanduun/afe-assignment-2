import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkoutProgram } from "@/lib/api";
import AddExerciseForm from "@/components/forms/AddExerciseForm";

interface AddExercisePageProps {
  params: Promise<{ id: string }>;
}

export default async function AddExercisePage({ params }: AddExercisePageProps) {
  const { id } = await params;
  const programId = Number(id);

  let program;
  try {
    program = await getWorkoutProgram(programId);
  } catch {
    notFound();
  }

  if (!program) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href={`/program/${programId}`} className="text-blue-500 hover:underline">
          ← Back to {program.name || "Program"}
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Add Exercise to {program.name || "Program"}
      </h1>

      <AddExerciseForm programId={programId} />
    </div>
  );
}
