import Link from "next/link";
import { WorkoutProgram } from "@/lib/types";

interface ProgramsListProps {
  programs: WorkoutProgram[];
  showClientInfo?: boolean;
}

export default function ProgramsList({ programs, showClientInfo = false }: ProgramsListProps) {
  if (programs.length === 0) {
    return <p className="text-gray-500">No workout programs found.</p>;
  }

  return (
    <div className="grid gap-4">
      {programs.map((program) => (
        <Link
          key={program.workoutProgramId}
          href={`/program/${program.workoutProgramId}`}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold">
            {program.name || "Untitled Program"}
          </h2>
          <p className="text-gray-600 mb-2">
            {program.description || "No description"}
          </p>

          {showClientInfo && program.clientId && (
            <p className="text-sm text-gray-500">Client ID: {program.clientId}</p>
          )}

          {program.exercises && program.exercises.length > 0 && (
            <p className="text-sm text-gray-500">
              {program.exercises.length} exercise{program.exercises.length !== 1 ? "s" : ""}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
