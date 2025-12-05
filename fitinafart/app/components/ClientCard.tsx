import { User } from "@/lib/types";

interface ClientCardProps {
  client: User;
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold">
        {client.firstName} {client.lastName}
      </h2>
      <p className="text-gray-600">{client.email}</p>
    </div>
  );
}
