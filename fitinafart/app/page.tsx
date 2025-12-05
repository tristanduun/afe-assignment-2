import { getAuth, isManager, isTrainer, isClient } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const user = await getAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome{user ? `, ${user.name}` : ""}</h1>
        <img src="/logo.png" alt="FitInAFart" width={360} height={280} className="mx-auto mb-6" />
      </div>
    </div>
  );
}
