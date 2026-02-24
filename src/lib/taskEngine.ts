/**
 * TADA — Pure task-logic engine.
 *
 * Every function here is a **pure function**: no React, no DOM, no side-effects.
 * This makes them trivially testable and reusable outside of component code.
 */

import type {
  Task,
  SubTask,
  TaskFilters,
  TaskSortBy,
  TaskStats,
  TaskCategory,
  TaskPriority,
  ValidationResult,
} from '../types/index';
import {
  PRIORITY_WEIGHT,
  MAX_TASK_TITLE_LENGTH,
  MIN_TASK_TITLE_LENGTH,
  MAX_SUBTASKS_PER_TASK,
  MAX_TOTAL_TASKS,
  MAX_ESTIMATE_MINUTES,
} from './constants';
import { todayKey } from './utils';

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

/**
 * Return a **new** sorted copy of the task list.
 *
 * - `priority`  — high → low, then by due date, then newest first.
 * - `dueDate`   — tasks with a due date first (earliest first), then by priority.
 * - `createdAt` — newest first.
 * - `category`  — grouped by category (inbox → today → week → someday).
 */
export function sortTasks(tasks: readonly Task[], sortBy: TaskSortBy): Task[] {
  const copy = [...tasks];

  switch (sortBy) {
    case 'priority':
      return copy.sort((a, b) => {
        const pw = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
        if (pw !== 0) return pw;
        // Secondary: due date (soonest first, no-date last)
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        if (a.dueDate && b.dueDate) {
          const dd = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          if (dd !== 0) return dd;
        }
        // Tertiary: newest first
        return b.createdAt - a.createdAt;
      });

    case 'dueDate':
      return copy.sort((a, b) => {
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        if (a.dueDate && b.dueDate) {
          const dd = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          if (dd !== 0) return dd;
        }
        return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
      });

    case 'createdAt':
      return copy.sort((a, b) => b.createdAt - a.createdAt);

    case 'category': {
      const order: Record<TaskCategory, number> = { inbox: 0, today: 1, week: 2, someday: 3 };
      return copy.sort((a, b) => {
        const co = order[a.category] - order[b.category];
        if (co !== 0) return co;
        return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
      });
    }

    default:
      return copy;
  }
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/**
 * Return tasks matching the supplied filters.
 */
export function filterTasks(tasks: readonly Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    if (filters.showCompleted === false && task.completed) return false;
    if (filters.category && filters.category !== 'all' && task.category !== filters.category) return false;
    if (filters.energyLevel && task.energyLevel !== filters.energyLevel) return false;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/**
 * Case-insensitive substring search across title & description.
 */
export function searchTasks(tasks: readonly Task[], query: string): Task[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [...tasks];
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q)),
  );
}

// ---------------------------------------------------------------------------
// Statistics
// ---------------------------------------------------------------------------

/**
 * Compute aggregate statistics for a task list.
 */
export function getTaskStats(tasks: readonly Task[]): TaskStats {
  const today = todayKey();
  const stats: TaskStats = {
    total: tasks.length,
    active: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
    byCategory: { inbox: 0, today: 0, week: 0, someday: 0 },
    byPriority: { high: 0, medium: 0, low: 0 },
  };

  for (const t of tasks) {
    if (t.completed) {
      stats.completed++;
    } else {
      stats.active++;
      if (t.dueDate) {
        if (t.dueDate < today) stats.overdue++;
        if (t.dueDate === today) stats.dueToday++;
      }
    }
    stats.byCategory[t.category]++;
    stats.byPriority[t.priority]++;
  }

  return stats;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validate a partial task object (e.g. before creating or updating).
 */
export function validateTask(
  task: Partial<Task>,
  existingTasks?: readonly Task[],
): ValidationResult {
  const errors: string[] = [];

  // Title checks
  if (task.title !== undefined) {
    const trimmed = task.title.trim();
    if (trimmed.length < MIN_TASK_TITLE_LENGTH) {
      errors.push('Task title cannot be empty.');
    }
    if (trimmed.length > MAX_TASK_TITLE_LENGTH) {
      errors.push(`Task title cannot exceed ${MAX_TASK_TITLE_LENGTH} characters.`);
    }
    // Duplicate check (case-insensitive, active tasks only)
    if (existingTasks) {
      const lower = trimmed.toLowerCase();
      const dup = existingTasks.find(
        (t) => !t.completed && t.id !== task.id && t.title.trim().toLowerCase() === lower,
      );
      if (dup) {
        errors.push('A task with this title already exists.');
      }
    }
  }

  // Subtask limit
  if (task.subtasks && task.subtasks.length > MAX_SUBTASKS_PER_TASK) {
    errors.push(`A task cannot have more than ${MAX_SUBTASKS_PER_TASK} subtasks.`);
  }

  // Estimate limit
  if (task.estimatedMinutes !== undefined && task.estimatedMinutes > MAX_ESTIMATE_MINUTES) {
    errors.push(`Time estimate cannot exceed ${MAX_ESTIMATE_MINUTES} minutes.`);
  }

  // Total tasks soft limit
  if (existingTasks && existingTasks.length >= MAX_TOTAL_TASKS && !task.id) {
    errors.push(`You have reached the maximum of ${MAX_TOTAL_TASKS} tasks. Delete or archive some first.`);
  }

  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// Immutable task operations
// ---------------------------------------------------------------------------

/**
 * Create a new task with sensible defaults. Does **not** persist — that's the
 * caller's responsibility.
 */
export function createTask(
  title: string,
  category: TaskCategory = 'inbox',
  priority: TaskPriority = 'medium',
  id?: string,
): Task {
  return {
    id: id ?? crypto.randomUUID(),
    title: title.trim(),
    priority,
    category,
    completed: false,
    createdAt: Date.now(),
  };
}

/**
 * Immutably toggle the completed state of a task.
 */
export function toggleTaskComplete(task: Task): Task {
  return {
    ...task,
    completed: !task.completed,
    completedAt: !task.completed ? Date.now() : undefined,
  };
}

/**
 * Immutably toggle a subtask's completion and optionally auto-complete the
 * parent when all subtasks are done.
 */
export function toggleSubtaskComplete(task: Task, subtaskId: string): Task {
  const updatedSubtasks = task.subtasks?.map((st) =>
    st.id === subtaskId ? { ...st, completed: !st.completed } : st,
  );

  const allComplete = updatedSubtasks?.every((st) => st.completed) ?? false;
  const hadSubtasks = updatedSubtasks && updatedSubtasks.length > 0;

  return {
    ...task,
    subtasks: updatedSubtasks,
    completed: allComplete && hadSubtasks ? true : task.completed,
    completedAt:
      allComplete && hadSubtasks && !task.completed ? Date.now() : task.completedAt,
  };
}

/**
 * Immutably add a new subtask to a task.
 */
export function addSubtaskToTask(task: Task, subtaskTitle: string): Task {
  const newSubtask: SubTask = {
    id: crypto.randomUUID(),
    title: subtaskTitle.trim(),
    completed: false,
  };
  return {
    ...task,
    subtasks: [...(task.subtasks ?? []), newSubtask],
  };
}

/**
 * Immutably remove a subtask from a task.
 */
export function removeSubtaskFromTask(task: Task, subtaskId: string): Task {
  return {
    ...task,
    subtasks: task.subtasks?.filter((st) => st.id !== subtaskId),
  };
}

/**
 * Check whether a task is overdue (has a past due date and is not completed).
 */
export function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) return false;
  return task.dueDate < todayKey();
}

/**
 * Check whether a task is due today.
 */
export function isDueToday(task: Task): boolean {
  if (!task.dueDate) return false;
  return task.dueDate === todayKey();
}
