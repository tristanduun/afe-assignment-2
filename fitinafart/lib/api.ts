import { cookies } from "next/headers";
import {
  CreateUserDto,
  CreateWorkoutDto,
  CreateExerciseDto,
  User,
  WorkoutProgram,
} from "./types";

const API_BASE = "https://assignment2.swafe.dk/api";

async function getJwt(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("jwt")?.value || null;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const jwt = await getJwt();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `API error: ${res.status}`);
  }

  // Handle empty responses
  const text = await res.text();
  return text ? JSON.parse(text) : (null as T);
}

// ============================================
// Auth
// ============================================

export async function login(email: string, password: string): Promise<{ jwt: string }> {
  const res = await fetch(`${API_BASE}/Users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

// ============================================
// Users
// ============================================

export async function createUser(data: CreateUserDto): Promise<User> {
  return fetchApi<User>("/Users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getClients(): Promise<User[]> {
  return fetchApi<User[]>("/Users/Clients");
}

export async function getTrainers(): Promise<User[]> {
  return fetchApi<User[]>("/Users/Trainers");
}

// ============================================
// Workout Programs
// ============================================

export async function getTrainerWorkoutPrograms(): Promise<WorkoutProgram[]> {
  return fetchApi<WorkoutProgram[]>("/WorkoutPrograms/trainer");
}

export async function getClientWorkoutPrograms(clientId: number): Promise<WorkoutProgram[]> {
  return fetchApi<WorkoutProgram[]>(`/WorkoutPrograms/client/${clientId}`);
}

export async function getWorkoutProgram(id: number): Promise<WorkoutProgram> {
  return fetchApi<WorkoutProgram>(`/WorkoutPrograms/${id}`);
}

export async function createWorkoutProgram(data: CreateWorkoutDto): Promise<WorkoutProgram> {
  return fetchApi<WorkoutProgram>("/WorkoutPrograms", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ============================================
// Exercises
// ============================================

export async function addExerciseToProgram(
  programId: number,
  data: CreateExerciseDto
): Promise<void> {
  return fetchApi<void>(`/Exercises/Program/${programId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
