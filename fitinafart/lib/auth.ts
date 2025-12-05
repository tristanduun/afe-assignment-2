import { cookies } from "next/headers";
import { AccountType } from "@/lib/types";

export interface AuthUser {
  userId: string;
  name: string;
  role: AccountType;
  groupId: string;
}

export function decodeJwt(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      userId: payload.UserId,
      name: payload.Name,
      role: payload.Role,
      groupId: payload.GroupId,
    };
  } catch {
    return null;
  }
}

export async function getAuth(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return null;
  }

  return decodeJwt(jwt);
}

export function isTrainer(user: AuthUser | null): boolean {
  return user?.role === "PersonalTrainer";
}

export function isClient(user: AuthUser | null): boolean {
  return user?.role === "Client";
}

export function isManager(user: AuthUser | null): boolean {
  return user?.role === "Manager";
}
