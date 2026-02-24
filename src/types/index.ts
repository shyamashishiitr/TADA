/**
 * TADA — Core Type Definitions
 *
 * This module is the single source of truth for every shared type in the app.
 * When adding a new domain concept, define its type here first.
 */

// ---------------------------------------------------------------------------
// Task Domain
// ---------------------------------------------------------------------------

/** Visual / urgency ranking of a task. */
export type TaskPriority = 'high' | 'medium' | 'low';

/** Bucket a task belongs to (maps to sidebar filters). */
export type TaskCategory = 'inbox' | 'today' | 'week' | 'someday';

/** Subjective energy cost of a task — used by ADHD-mode energy filter. */
export type EnergyLevel = 'high' | 'medium' | 'low';

/** Kind of celebration animation triggered on completion. */
export type CelebrationType = 'subtask' | 'task' | 'bigwin' | 'streak';

/** Sort criteria for the task list. */
export type TaskSortBy = 'priority' | 'dueDate' | 'createdAt' | 'category';

/** Filter criteria applied to the task list. */
export interface TaskFilters {
  /** Show only tasks in this category (omit / `undefined` = all). */
  category?: TaskCategory | 'all';
  /** Hide or show completed tasks. */
  showCompleted?: boolean;
  /** Filter by energy cost. */
  energyLevel?: EnergyLevel;
}

/**
 * A single checklist item nested inside a {@link Task}.
 */
export interface SubTask {
  /** Globally-unique identifier. */
  id: string;
  /** Short description shown in the list. */
  title: string;
  /** Whether this step has been finished. */
  completed: boolean;
}

/**
 * The central domain object — everything revolves around tasks.
 */
export interface Task {
  /** Globally-unique identifier (UUID v4). */
  id: string;
  /** The one-line summary displayed in lists. */
  title: string;
  /** Optional longer description / notes. */
  description?: string;
  /** Urgency ranking. */
  priority: TaskPriority;
  /** Which bucket/filter the task appears under. */
  category: TaskCategory;
  /** Whether the task has been marked done. */
  completed: boolean;
  /** Unix-epoch ms when the task was created. */
  createdAt: number;
  /** Unix-epoch ms when the task was completed (set on toggle). */
  completedAt?: number;
  /** Optional due date as an ISO date string (`YYYY-MM-DD`). */
  dueDate?: string;
  /** Ordered list of micro-steps. */
  subtasks?: SubTask[];
  /** User's time estimate in **minutes** (ADHD-mode feature). */
  estimatedMinutes?: number;
  /** Actual time spent in **minutes** (accumulated by focus timer). */
  actualMinutes?: number;
  /** Subjective energy cost — used for energy-based filtering. */
  energyLevel?: EnergyLevel;
  /** Unix-epoch ms when the focus timer was last started for this task. */
  timerStartedAt?: number;
}

// ---------------------------------------------------------------------------
// Focus Timer
// ---------------------------------------------------------------------------

/**
 * Serialisable state of the Pomodoro-style focus timer.
 */
export interface TimerState {
  /** Is the timer currently counting down? */
  isRunning: boolean;
  /** Which task the timer is attached to (`null` when idle). */
  taskId: string | null;
  /** Unix-epoch ms when the current session began (`null` when idle). */
  startTime: number | null;
  /** Configured session length in **minutes** (default 25). */
  duration: number;
  /** Seconds elapsed since `startTime`. */
  elapsed: number;
}

// ---------------------------------------------------------------------------
// Stats & Streaks
// ---------------------------------------------------------------------------

/**
 * Aggregated productivity metrics for a single calendar day.
 */
export interface DailyStats {
  /** Calendar date key (`YYYY-MM-DD`). */
  date: string;
  /** Number of tasks marked complete today. */
  tasksCompleted: number;
  /** Total minutes spent in focus-timer sessions. */
  focusedMinutes: number;
  /** Per-task accuracy ratios (actual / estimated × 100). */
  estimateAccuracy: number[];
  /** Number of subtasks / micro-steps checked off. */
  subtasksCompleted: number;
}

/**
 * Consecutive-day usage streak data.
 */
export interface StreakData {
  /** How many days in a row the user has been active. */
  currentStreak: number;
  /** All-time longest streak length. */
  longestStreak: number;
  /** `YYYY-MM-DD` of the most recent active day. */
  lastActiveDate: string;
}

// ---------------------------------------------------------------------------
// Settings & Storage
// ---------------------------------------------------------------------------

/**
 * All user-configurable preferences persisted across sessions.
 */
export interface AppSettings {
  /** Whether the UI is in dark mode. */
  darkMode: boolean;
  /** Whether ADHD / focus mode is active. */
  adhdMode: boolean;
  /** Active energy-level filter (`null` = no filter). */
  energyFilter: EnergyLevel | null;
}

/**
 * Async-capable storage back-end.
 *
 * Implement this interface to swap localStorage for a REST API, IndexedDB,
 * or any other persistence layer without touching React code.
 */
export interface StorageAdapter {
  // Tasks
  getTasks(): Promise<Task[]>;
  saveTasks(tasks: Task[]): Promise<void>;

  // Settings
  getSettings(): Promise<AppSettings>;
  saveSettings(settings: AppSettings): Promise<void>;

  // Daily stats
  getStats(): Promise<Record<string, DailyStats>>;
  saveStats(stats: Record<string, DailyStats>): Promise<void>;

  // Streak
  getStreak(): Promise<StreakData>;
  saveStreak(streak: StreakData): Promise<void>;

  // Timer
  getTimer(): Promise<TimerState>;
  saveTimer(timer: TimerState): Promise<void>;
}

// ---------------------------------------------------------------------------
// Data-migration helpers
// ---------------------------------------------------------------------------

/**
 * Describes a single schema version and how to migrate *from the previous*.
 */
export interface Migration {
  /** Target version number (1-based). */
  version: number;
  /** Human-readable description of what changed. */
  description: string;
  /** Takes raw data at version N-1 and returns data at version N. */
  migrate: (data: unknown) => unknown;
}

// ---------------------------------------------------------------------------
// Task-engine result types (pure-function helpers)
// ---------------------------------------------------------------------------

/** Aggregate numbers computed from a task list. */
export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
  dueToday: number;
  byCategory: Record<TaskCategory, number>;
  byPriority: Record<TaskPriority, number>;
}

/** Result of {@link validateTask}. */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
