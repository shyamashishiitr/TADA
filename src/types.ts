/**
 * Backward-compatibility re-export.
 *
 * All types now live in `src/types/index.ts`.
 * Existing `import … from '../types'` statements keep working.
 */
export type {
  TaskPriority,
  TaskCategory,
  EnergyLevel,
  CelebrationType,
  SubTask,
  Task,
  TimerState,
  DailyStats,
  StreakData,
} from './types/index';
