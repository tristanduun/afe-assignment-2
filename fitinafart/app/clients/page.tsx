import { getClients } from "@/lib/api";
import { getAuth, isTrainer } from "@/lib/auth";
import { User } from "@/lib/types";
import UserListPage from "@/app/components/UserListPage";
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
    <UserListPage
      title="My Clients"
      users={clients}
      emptyMessage="No clients found."
      registerPath="/register?type=Client"
      createButtonLabel="Create Client"
    />
  );
}
