/**
 * TADA — localStorage schema migrations.
 *
 * Every time the persisted data shape changes, add a new entry to
 * `MIGRATIONS` and bump `CURRENT_SCHEMA_VERSION` in constants.ts.
 *
 * On app startup `runMigrations()` is called once. It reads the stored
 * version number, applies any pending migrations in order, and writes the
 * new version back.
 */

import type { Migration } from '../types/index';
import { STORAGE_KEYS, CURRENT_SCHEMA_VERSION } from './constants';

// ---------------------------------------------------------------------------
// Migration definitions
// ---------------------------------------------------------------------------

/**
 * Ordered list of migrations. Each entry describes how to upgrade from the
 * **previous** version to this one.
 *
 * Version 1 is the *initial* schema — its migrate function is a no-op
 * because there's nothing to transform when the data already matches.
 */
const MIGRATIONS: Migration[] = [
  {
    version: 1,
    description: 'Initial schema — tasks, settings, stats, streak, timer.',
    migrate: (_data: unknown) => {
      // Version 1 is the baseline. Nothing to transform.
      // If someone has pre-versioned data it's already in the v1 shape
      // because the original code never changed the format.
      return _data;
    },
  },
  // -----------------------------------------------------------------------
  // Future migrations go here. Example:
  //
  // {
  //   version: 2,
  //   description: 'Add `tags` array to each task.',
  //   migrate: (data: unknown) => {
  //     const tasks = data as Task[];
  //     return tasks.map(t => ({ ...t, tags: t.tags ?? [] }));
  //   },
  // },
  // -----------------------------------------------------------------------
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read the current stored schema version (defaults to 0 for un-versioned data).
 */
export function getStoredVersion(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCHEMA_VERSION);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Persist the current schema version number.
 */
export function setStoredVersion(version: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, String(version));
  } catch (err) {
    console.error('[TADA] Failed to write schema version:', err);
  }
}

/**
 * Run all pending migrations and update the stored version.
 *
 * Call this **once** during app bootstrap (e.g. in `main.tsx`) before
 * any hooks read from localStorage.
 *
 * The function is idempotent — calling it multiple times is harmless.
 */
export function runMigrations(): void {
  const storedVersion = getStoredVersion();

  if (storedVersion >= CURRENT_SCHEMA_VERSION) {
    // Already up to date — nothing to do.
    return;
  }

  console.log(
    `[TADA] Migrating data from v${storedVersion} → v${CURRENT_SCHEMA_VERSION}`,
  );

  const pending = MIGRATIONS.filter((m) => m.version > storedVersion).sort(
    (a, b) => a.version - b.version,
  );

  for (const migration of pending) {
    try {
      console.log(`[TADA]  ↳ Running migration v${migration.version}: ${migration.description}`);

      // Each migration is responsible for reading / writing the keys it cares
      // about. For v1 (baseline) we simply validate the tasks array exists.
      if (migration.version === 1) {
        // Ensure the tasks key is a valid JSON array.
        const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
              console.warn('[TADA]  ⚠ Tasks was not an array — resetting to [].');
              localStorage.setItem(STORAGE_KEYS.TASKS, '[]');
            }
          } catch {
            console.warn('[TADA]  ⚠ Tasks JSON was corrupted — resetting to [].');
            localStorage.setItem(STORAGE_KEYS.TASKS, '[]');
          }
        }
      }

      // Future migrations can read → transform → write as needed.
    } catch (err) {
      console.error(`[TADA] Migration v${migration.version} failed:`, err);
      // Don't update the version — the migration will be retried next time.
      return;
    }
  }

  setStoredVersion(CURRENT_SCHEMA_VERSION);
  console.log('[TADA] Migrations complete.');
}

/**
 * Emergency reset — wipes **all** TADA data from localStorage.
 *
 * Useful as a last resort in the Error Boundary when data is corrupt.
 */
export function resetAllData(): void {
  const keys = Object.values(STORAGE_KEYS);
  for (const key of keys) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Best-effort
    }
  }
  console.log('[TADA] All data has been reset.');
}
