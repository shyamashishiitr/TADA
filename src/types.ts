export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'inbox' | 'today' | 'week' | 'someday';
export type EnergyLevel = 'high' | 'medium' | 'low';

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
  energyLevel?: EnergyLevel; // energy level required for task
}
