import { getTrainerWorkoutPrograms, getClientWorkoutPrograms } from "@/lib/api";
import { getAuth, isTrainer } from "@/lib/auth";
import { WorkoutProgram } from "@/lib/types";
import ProgramsList from "@/components/ui/ProgramsList";
import Link from "next/link";

export default async function ProgramPage() {
  const user = await getAuth();
  let programs: WorkoutProgram[] = [];

  try {
    if (isTrainer(user)) {
      programs = await getTrainerWorkoutPrograms();
    } else if (user) {
      programs = await getClientWorkoutPrograms(Number(user.userId));
    }
  } catch {
    programs = [];
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Workout Programs</h1>
        {isTrainer(user) && (
          <Link
            href="/new-program"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Program
          </Link>
        )}
      </div>

      <ProgramsList programs={programs} showClientInfo={isTrainer(user)} />
    </div>
  );
}
