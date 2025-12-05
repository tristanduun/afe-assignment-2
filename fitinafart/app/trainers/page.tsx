import { getTrainers } from "@/lib/api";
import { getAuth, isManager } from "@/lib/auth";
import { User } from "@/lib/types";
import UserListPage from "@/components/ui/UserListPage";
import { redirect } from "next/navigation";

export default async function TrainersPage() {
  const user = await getAuth();

  if (!isManager(user)) {
    redirect("/");
  }

  let trainers: User[] = [];
  try {
    trainers = await getTrainers();
  } catch {
    trainers = [];
  }

  return (
    <UserListPage
      title="Trainers"
      users={trainers}
      emptyMessage="No trainers found."
      registerPath="/register"
      createButtonLabel="Create Trainer"
    />
  );
}
