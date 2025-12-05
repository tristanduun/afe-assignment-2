import { getAuth, isManager, isTrainer, isClient } from "@/lib/auth";
import Link from "next/link";

export default async function Navbar() {
  const user = await getAuth();

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          FitInAFart
        </Link>

        <div className="flex items-center gap-6">
          {/* Manager & Personal Trainer */}
          {(isManager(user) || isTrainer(user)) && (
            <Link href="/register" className="hover:text-gray-300">
              Create Users
            </Link>
          )}

          {/* Personal Trainer only */}
          {isTrainer && (
            <Link href="/clients" className="hover:text-gray-300">
              Clients
            </Link>
          )}

          {/* Personal Trainer & Client */}
          {(isTrainer(user) || isClient(user)) && (
            <Link href="/program" className="hover:text-gray-300">
              Programs
            </Link>
          )}

          <span className="text-gray-400 text-sm">
            {user.name} ({user.role})
          </span>

          <form action="/api/logout" method="POST">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
