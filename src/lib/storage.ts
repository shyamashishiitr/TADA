/**
 * TADA — Storage abstraction layer.
 *
 * All persistence goes through a {@link StorageAdapter} implementation.
 * The default export is a `LocalStorageAdapter` — swap it for an
 * `APIStorageAdapter` to back the app with a real server without touching
 * any React code.
 */

import type {
  Task,
  AppSettings,
  DailyStats,
  StreakData,
  TimerState,
  StorageAdapter,
} from '../types/index';

import { STORAGE_KEYS, DEFAULT_SETTINGS, DEFAULT_TIMER_DURATION } from './constants';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`[Storage] Failed to read "${key}":`, err);
    return fallback;
  }
}

function safeSetItem(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`[Storage] Failed to write "${key}":`, err);
  }
}

// ---------------------------------------------------------------------------
// LocalStorageAdapter
// ---------------------------------------------------------------------------

/**
 * Stores everything in the browser's localStorage.
 *
 * Every method returns a `Promise` so the interface stays consistent with
 * async back-ends, but the underlying calls are synchronous.
 */
class LocalStorageAdapter implements StorageAdapter {
  // ----- Tasks -----

  async getTasks(): Promise<Task[]> {
    return safeGetItem<Task[]>(STORAGE_KEYS.TASKS, []);
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    safeSetItem(STORAGE_KEYS.TASKS, tasks);
  }

  // ----- Settings -----

  async getSettings(): Promise<AppSettings> {
    // Settings are stored in individual keys for backward compatibility.
    const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
    const adhdMode = localStorage.getItem(STORAGE_KEYS.ADHD_MODE) === 'true';
    const energyRaw = localStorage.getItem(STORAGE_KEYS.ENERGY_FILTER);
    return {
      darkMode,
      adhdMode,
      energyFilter: energyRaw ? (energyRaw as AppSettings['energyFilter']) : null,
    };
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(settings.darkMode));
      localStorage.setItem(STORAGE_KEYS.ADHD_MODE, String(settings.adhdMode));
      if (settings.energyFilter) {
        localStorage.setItem(STORAGE_KEYS.ENERGY_FILTER, settings.energyFilter);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ENERGY_FILTER);
      }
    } catch (err) {
      console.error('[Storage] Failed to save settings:', err);
    }
  }

  // ----- Daily Stats -----

  async getStats(): Promise<Record<string, DailyStats>> {
    return safeGetItem<Record<string, DailyStats>>(STORAGE_KEYS.DAILY_STATS, {});
  }

  async saveStats(stats: Record<string, DailyStats>): Promise<void> {
    safeSetItem(STORAGE_KEYS.DAILY_STATS, stats);
  }

  // ----- Streak -----

  async getStreak(): Promise<StreakData> {
    return safeGetItem<StreakData>(STORAGE_KEYS.STREAK, {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',
    });
  }

  async saveStreak(streak: StreakData): Promise<void> {
    safeSetItem(STORAGE_KEYS.STREAK, streak);
  }

  // ----- Timer -----

  async getTimer(): Promise<TimerState> {
    return safeGetItem<TimerState>(STORAGE_KEYS.FOCUS_TIMER, {
      isRunning: false,
      taskId: null,
      startTime: null,
      duration: DEFAULT_TIMER_DURATION,
      elapsed: 0,
    });
  }

  async saveTimer(timer: TimerState): Promise<void> {
    safeSetItem(STORAGE_KEYS.FOCUS_TIMER, timer);
  }
}

// ---------------------------------------------------------------------------
// Singleton export
// ---------------------------------------------------------------------------

/**
 * The active storage adapter.
 *
 * To switch to an API-backed adapter:
 * ```ts
 * import { setStorageAdapter } from '@/lib/storage';
 * setStorageAdapter(new APIStorageAdapter(baseUrl));
 * ```
 */
let _adapter: StorageAdapter = new LocalStorageAdapter();

/** Get the current active adapter. */
export function getStorage(): StorageAdapter {
  return _adapter;
}

/** Replace the active adapter (e.g. for testing or API migration). */
export function setStorageAdapter(adapter: StorageAdapter): void {
  _adapter = adapter;
}

export default _adapter;

// Re-export the default settings constant for convenience
export { DEFAULT_SETTINGS };
