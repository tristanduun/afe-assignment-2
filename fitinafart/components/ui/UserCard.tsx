import { User } from "@/lib/types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}
