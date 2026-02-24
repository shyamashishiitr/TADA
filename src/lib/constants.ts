/**
 * TADA — Application-wide constants.
 *
 * Centralises magic strings, numbers and configuration so they can be changed
 * in one place without hunting through components.
 */

import type { TaskCategory, TaskPriority, EnergyLevel, AppSettings } from '../types/index';

// ---------------------------------------------------------------------------
// localStorage keys
// ---------------------------------------------------------------------------

export const STORAGE_KEYS = {
  TASKS: 'tada-tasks',
  DARK_MODE: 'darkMode',
  ADHD_MODE: 'tada-adhd-mode',
  ENERGY_FILTER: 'tada-energy-filter',
  DAILY_STATS: 'tada-daily-stats',
  STREAK: 'tada-streak-data',
  FOCUS_TIMER: 'tada-focus-timer',
  INSTALL_PROMPT_DISMISSED: 'install-prompt-dismissed',
  VISIT_COUNT: 'visit-count',
  SCHEMA_VERSION: 'tada-schema-version',
} as const;

// ---------------------------------------------------------------------------
// Task limits & validation
// ---------------------------------------------------------------------------

/** Maximum number of characters in a task title. */
export const MAX_TASK_TITLE_LENGTH = 300;

/** Minimum number of characters in a task title. */
export const MIN_TASK_TITLE_LENGTH = 1;

/** Maximum number of subtasks per task. */
export const MAX_SUBTASKS_PER_TASK = 50;

/** Maximum total tasks stored (soft limit — warns but doesn't block). */
export const MAX_TOTAL_TASKS = 10_000;

/** Maximum time estimate in minutes (8 hours). */
export const MAX_ESTIMATE_MINUTES = 480;

/** Maximum custom focus timer duration in minutes (3 hours). */
export const MAX_FOCUS_DURATION_MINUTES = 180;

// ---------------------------------------------------------------------------
// Default values
// ---------------------------------------------------------------------------

/** Default focus-timer duration in minutes. */
export const DEFAULT_TIMER_DURATION = 25;

/** Default task category for new tasks. */
export const DEFAULT_CATEGORY: TaskCategory = 'inbox';

/** Default task priority for new tasks. */
export const DEFAULT_PRIORITY: TaskPriority = 'medium';

/** Default app settings for a fresh install. */
export const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  adhdMode: false,
  energyFilter: null,
};

// ---------------------------------------------------------------------------
// Priority configuration
// ---------------------------------------------------------------------------

/** Numeric weight used for sorting (higher = more urgent). */
export const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const PRIORITY_CONFIG: Record<TaskPriority, { emoji: string; label: string; borderColor: string }> = {
  high: { emoji: '🔴', label: 'High', borderColor: 'border-l-red-500' },
  medium: { emoji: '🟡', label: 'Medium', borderColor: 'border-l-yellow-500' },
  low: { emoji: '🟢', label: 'Low', borderColor: 'border-l-green-500' },
};

// ---------------------------------------------------------------------------
// Category configuration
// ---------------------------------------------------------------------------

export const CATEGORY_CONFIG: Record<TaskCategory, { emoji: string; label: string }> = {
  inbox: { emoji: '📥', label: 'Inbox' },
  today: { emoji: '🔥', label: 'Today' },
  week: { emoji: '📅', label: 'Week' },
  someday: { emoji: '💭', label: 'Someday' },
};

// ---------------------------------------------------------------------------
// Energy-level configuration
// ---------------------------------------------------------------------------

export const ENERGY_CONFIG: Record<EnergyLevel, { emoji: string; label: string; gradient: string }> = {
  high: { emoji: '🔋', label: 'High Energy', gradient: 'from-green-500 to-emerald-600' },
  medium: { emoji: '⚡', label: 'Medium', gradient: 'from-yellow-500 to-orange-500' },
  low: { emoji: '🪫', label: 'Low Energy', gradient: 'from-blue-500 to-purple-500' },
};

// ---------------------------------------------------------------------------
// Celebration / animation timing (ms)
// ---------------------------------------------------------------------------

export const CELEBRATION_DURATION: Record<string, number> = {
  subtask: 2_000,
  task: 3_000,
  bigwin: 5_000,
  streak: 5_000,
};

// ---------------------------------------------------------------------------
// Debounce / throttle intervals (ms)
// ---------------------------------------------------------------------------

/** How long to wait before persisting task changes to storage. */
export const SAVE_DEBOUNCE_MS = 300;

/** How frequently the focus-timer UI ticks (ms). */
export const TIMER_TICK_MS = 1_000;

/** Time after which the install-prompt is auto-shown (ms). */
export const INSTALL_PROMPT_DELAY_MS = 30_000;

/** Minimum visit count before showing the install prompt. */
export const INSTALL_PROMPT_MIN_VISITS = 2;

// ---------------------------------------------------------------------------
// Streak milestones (trigger special celebrations)
// ---------------------------------------------------------------------------

export const STREAK_MILESTONES = [3, 7, 30, 100] as const;

// ---------------------------------------------------------------------------
// Quick-pick options surfaced in the UI
// ---------------------------------------------------------------------------

export const QUICK_TIME_OPTIONS = [
  { label: '5m', value: 5 },
  { label: '15m', value: 15 },
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '2h+', value: 120 },
] as const;

export const QUICK_FOCUS_DURATIONS = [5, 10, 15, 25, 45] as const;

// ---------------------------------------------------------------------------
// Schema / migration version
// ---------------------------------------------------------------------------

/** Current localStorage data schema version. Increment when data shape changes. */
export const CURRENT_SCHEMA_VERSION = 1;
