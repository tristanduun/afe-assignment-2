// User roles
export type AccountType = 'Manager' | 'PersonalTrainer' | 'Client';

// ============================================
// User Types
// ============================================

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId?: number | null;
  accountType: AccountType;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId?: number | null;
  accountType: AccountType;
}

export interface LoginDto {
  email: string;
  password: string;
}

// ============================================
// Exercise Types
// ============================================

export interface Exercise {
  exerciseId: number;
  groupId: string; // UUID
  name?: string | null;
  description?: string | null;
  sets?: number | null;
  repetitions?: number | null;
  time?: string | null;
  workoutProgramId?: number | null;
  personalTrainerId?: number | null;
}

// Draft exercise type for form state (allows empty values during editing)
export interface DraftExercise {
  name: string;
  description: string;
  sets: number | "";
  repetitions: number | "";
  time: string;
}

export interface CreateExerciseDto {
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  time: string;
}

// ============================================
// Workout Program Types
// ============================================

export interface WorkoutProgram {
  workoutProgramId: number;
  groupId: string; // UUID
  name?: string | null;
  description?: string | null;
  exercises?: Exercise[] | null;
  personalTrainerId: number;
  clientId?: number | null;
}

export interface CreateWorkoutDto {
  name?: string | null;
  description?: string | null;
  exercises?: CreateExerciseDto[] | null;
  clientId?: number | null;
}
