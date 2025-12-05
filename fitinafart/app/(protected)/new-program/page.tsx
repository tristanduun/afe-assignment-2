import { getClients } from "@/lib/api";
import ProgramForm from "@/components/forms/ProgramForm";
import { User } from "@/lib/types";

export default async function NewProgramPage() {
  let clients: User[] = [];
  try {
    clients = await getClients();
  } catch {
    clients = [];
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Workout Program</h1>
      <ProgramForm clients={clients} />
    </div>
  );
}
