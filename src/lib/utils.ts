/**
 * TADA — Generic utility functions.
 *
 * Pure helpers with no React or DOM dependencies so they can be imported from
 * hooks, components **and** tests without side-effects.
 */

// ---------------------------------------------------------------------------
// className merging (shadcn/ui `cn` pattern — no dependency)
// ---------------------------------------------------------------------------

/**
 * Merge CSS class strings, filtering out falsy values.
 *
 * ```ts
 * cn('px-4', condition && 'bg-red-500', undefined, 'text-white')
 * // → "px-4 bg-red-500 text-white"  (if condition is truthy)
 * ```
 */
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// ID generation
// ---------------------------------------------------------------------------

/**
 * Generate a globally-unique identifier.
 *
 * Uses `crypto.randomUUID()` where available (modern browsers), with a
 * Math.random-based fallback for older environments.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback — not cryptographically secure but unique enough for client IDs.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Format a `Date` or ISO string into a short human-readable form.
 *
 * @example formatDate('2025-03-15') → "Mar 15"
 */
export function formatDate(date: Date | string | number): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Produce a human-friendly relative label like "Today", "Yesterday", "3 days ago".
 */
export function formatRelativeDate(date: Date | string | number): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();

  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
  return formatDate(d);
}

/**
 * Format a duration in **minutes** into a compact string.
 *
 * @example formatMinutes(90) → "1h 30m"
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Format seconds into `mm:ss`.
 *
 * @example formatTimer(125) → "2:05"
 */
export function formatTimer(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Date helpers (pure — no side effects)
// ---------------------------------------------------------------------------

/** Return today's date key as `YYYY-MM-DD`. */
export function todayKey(): string {
  return new Date().toISOString().split('T')[0];
}

/** Return yesterday's date key as `YYYY-MM-DD`. */
export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Debounce & Throttle
// ---------------------------------------------------------------------------

/**
 * Classic trailing-edge debounce.
 *
 * Returns a wrapper function that delays invoking `fn` until after `ms`
 * milliseconds have elapsed since the last call.
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Classic leading-edge throttle.
 *
 * Ensures `fn` is called at most once every `ms` milliseconds.
 */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let lastRun = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun >= ms) {
      lastRun = now;
      fn(...args);
    }
  };
}

// ---------------------------------------------------------------------------
// Misc text helpers
// ---------------------------------------------------------------------------

/**
 * Naive English pluralise: appends "s" when `count !== 1`.
 *
 * @example pluralize(3, 'task') → "3 tasks"
 */
export function pluralize(count: number, word: string, plural?: string): string {
  const form = count === 1 ? word : (plural ?? `${word}s`);
  return `${count} ${form}`;
}

/**
 * Clamp a number between `min` and `max` (inclusive).
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Pick a random element from an array.
 */
export function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
