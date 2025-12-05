import { getAuth, isManager, isTrainer } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form";

export default async function RegisterPage() {
  const user = await getAuth();

  // Only managers and personal trainers can access this page
  if (!isManager(user) && !isTrainer(user)) {
    redirect("/");
  }

  // Managers create personal trainers, trainers create clients
  const accountType = isManager(user) ? "PersonalTrainer" : "Client";
  const personalTrainerId = isTrainer(user) ? Number(user?.userId) : undefined;

  return (
    <div className="p-6 max-w-md mx-auto">
      <RegisterForm 
        accountType={accountType} 
        personalTrainerId={personalTrainerId}
      />
    </div>
  );
}
