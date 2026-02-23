export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'inbox' | 'today' | 'week' | 'someday';
export type EnergyLevel = 'high' | 'medium' | 'low';
export type CelebrationType = 'subtask' | 'task' | 'bigwin' | 'streak';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  dueDate?: string; // ISO date string (YYYY-MM-DD)
  subtasks?: SubTask[];
  estimatedMinutes?: number; // time estimate for ADHD mode
  actualMinutes?: number; // actual time spent
  energyLevel?: EnergyLevel; // energy level required for task
  timerStartedAt?: number; // timestamp when timer started
}

export interface TimerState {
  isRunning: boolean;
  taskId: string | null;
  startTime: number | null;
  duration: number; // in minutes
  elapsed: number; // in seconds
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  tasksCompleted: number;
  focusedMinutes: number;
  estimateAccuracy: number[]; // array of accuracy percentages
  subtasksCompleted: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
}
