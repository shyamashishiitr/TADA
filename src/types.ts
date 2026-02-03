export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'inbox' | 'today' | 'week' | 'someday';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}
