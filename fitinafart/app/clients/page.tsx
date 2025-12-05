import { getClients } from "@/lib/api";
import { getAuth, isTrainer } from "@/lib/auth";
import { User } from "@/lib/types";
import ClientCard from "@/app/components/ClientCard";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
  const user = await getAuth();

  if (!isTrainer(user)) {
    redirect("/");
  }

  let clients: User[] = [];
  try {
    clients = await getClients();
  } catch {
    clients = [];
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Clients</h1>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients found.</p>
      ) : (
        <div className="grid gap-4">
          {clients.map((client) => (
            <ClientCard key={client.userId} client={client} />
          ))}
        </div>
      )}
    </div>
  );
}
