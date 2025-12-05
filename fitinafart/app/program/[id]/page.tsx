import { getWorkoutProgram } from "@/lib/api";
import { getAuth, isTrainer } from "@/lib/auth";
import ProgramCard from "@/app/components/ProgramCard";
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

  const isUserTrainer = isTrainer(user);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/program" className="text-blue-500 hover:underline">
          ← Back to Programs
        </Link>
      </div>

      <ProgramCard
        program={program}
        showClientInfo={isUserTrainer}
        showAddExercise={isUserTrainer}
      />
    </div>
  );
}
