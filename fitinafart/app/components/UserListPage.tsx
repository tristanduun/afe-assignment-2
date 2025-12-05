import { User } from "@/lib/types";
import UserCard from "./UserCard";
import Link from "next/link";

interface UserListPageProps {
  title: string;
  users: User[];
  emptyMessage: string;
  registerPath: string;
  createButtonLabel: string;
}

export default function UserListPage({
  title,
  users,
  emptyMessage,
  registerPath,
  createButtonLabel,
}: UserListPageProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          href={registerPath}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {createButtonLabel}
        </Link>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
