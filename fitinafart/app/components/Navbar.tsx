import { cookies } from "next/headers";
import Link from "next/link";

interface JwtPayload {
  Name: string;
  Role: "Manager" | "PersonalTrainer" | "Client";
  UserId: string;
  GroupId: string;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const user = jwt ? decodeJwt(jwt) : null;

  if (!user) {
    return null;
  }

  const isManager = user.Role === "Manager";
  const isTrainer = user.Role === "PersonalTrainer";
  const isClient = user.Role === "Client";

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          FitInAFart
        </Link>

        <div className="flex items-center gap-6">
          {/* Manager & Personal Trainer */}
          {(isManager || isTrainer) && (
            <Link href="/register" className="hover:text-gray-300">
              Create Users
            </Link>
          )}

          {/* Personal Trainer only */}
          {isTrainer && (
            <>
              <Link href="/new-program" className="hover:text-gray-300">
                New Program
              </Link>
              <Link href="/new-exercise" className="hover:text-gray-300">
                New Exercise
              </Link>
              <Link href="/clients" className="hover:text-gray-300">
                Clients
              </Link>
            </>
          )}

          {/* Personal Trainer & Client */}
          {(isTrainer || isClient) && (
            <Link href="/program" className="hover:text-gray-300">
              Programs
            </Link>
          )}

          <span className="text-gray-400 text-sm">
            {user.Name} ({user.Role})
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
