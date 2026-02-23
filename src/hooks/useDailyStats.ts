import { useState, useEffect, useCallback } from 'react';
import type { DailyStats, StreakData } from '../types';

const STATS_KEY = 'tada-daily-stats';
const STREAK_KEY = 'tada-streak-data';

const getTodayKey = () => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
};

const getYesterdayKey = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

export const useDailyStats = () => {
  const [stats, setStats] = useState<Record<string, DailyStats>>(() => {
    const saved = localStorage.getItem(STATS_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState<StreakData>(() => {
    const saved = localStorage.getItem(STREAK_KEY);
    return saved
      ? JSON.parse(saved)
      : { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };
  });

  // Persist stats
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  }, [streak]);

  // Get today's stats
  const getTodayStats = useCallback((): DailyStats => {
    const today = getTodayKey();
    return (
      stats[today] || {
        date: today,
        tasksCompleted: 0,
        focusedMinutes: 0,
        estimateAccuracy: [],
        subtasksCompleted: 0,
      }
    );
  }, [stats]);

  // Update streak on task completion
  const updateStreak = useCallback(() => {
    const today = getTodayKey();
    const yesterday = getYesterdayKey();

    setStreak((prev) => {
      // If already counted today, don't update
      if (prev.lastActiveDate === today) {
        return prev;
      }

      let newStreak = prev.currentStreak;

      // If yesterday was active, increment streak
      if (prev.lastActiveDate === yesterday) {
        newStreak = prev.currentStreak + 1;
      }
      // If today is the first day or there was a gap, reset to 1
      else if (prev.lastActiveDate !== today) {
        newStreak = 1;
      }

      return {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastActiveDate: today,
      };
    });
  }, []);

  // Record a completed task
  const recordTaskCompletion = useCallback(
    (estimatedMinutes?: number, actualMinutes?: number) => {
      const today = getTodayKey();

      setStats((prev) => {
        const todayStats = prev[today] || {
          date: today,
          tasksCompleted: 0,
          focusedMinutes: 0,
          estimateAccuracy: [],
          subtasksCompleted: 0,
        };

        const newEstimateAccuracy = [...todayStats.estimateAccuracy];

        // Calculate accuracy if both values exist
        if (estimatedMinutes && actualMinutes && estimatedMinutes > 0) {
          const accuracy = (actualMinutes / estimatedMinutes) * 100;
          newEstimateAccuracy.push(accuracy);
        }

        return {
          ...prev,
          [today]: {
            ...todayStats,
            tasksCompleted: todayStats.tasksCompleted + 1,
            estimateAccuracy: newEstimateAccuracy,
          },
        };
      });

      updateStreak();
    },
    [updateStreak]
  );

  // Record a completed subtask
  const recordSubtaskCompletion = useCallback(() => {
    const today = getTodayKey();

    setStats((prev) => {
      const todayStats = prev[today] || {
        date: today,
        tasksCompleted: 0,
        focusedMinutes: 0,
        estimateAccuracy: [],
        subtasksCompleted: 0,
      };

      return {
        ...prev,
        [today]: {
          ...todayStats,
          subtasksCompleted: todayStats.subtasksCompleted + 1,
        },
      };
    });

    updateStreak();
  }, [updateStreak]);

  // Add focused time
  const addFocusedTime = useCallback((minutes: number) => {
    const today = getTodayKey();

    setStats((prev) => {
      const todayStats = prev[today] || {
        date: today,
        tasksCompleted: 0,
        focusedMinutes: 0,
        estimateAccuracy: [],
        subtasksCompleted: 0,
      };

      return {
        ...prev,
        [today]: {
          ...todayStats,
          focusedMinutes: todayStats.focusedMinutes + minutes,
        },
      };
    });
  }, []);

  // Get average estimate accuracy
  const getAverageAccuracy = useCallback((dateKey?: string): number => {
    const key = dateKey || getTodayKey();
    const dayStats = stats[key];

    if (!dayStats || dayStats.estimateAccuracy.length === 0) {
      return 0;
    }

    const sum = dayStats.estimateAccuracy.reduce((acc, val) => acc + val, 0);
    return sum / dayStats.estimateAccuracy.length;
  }, [stats]);

  // Get stats for a specific date range
  const getStatsRange = useCallback(
    (days: number): DailyStats[] => {
      const result: DailyStats[] = [];
      const today = new Date();

      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split('T')[0];

        result.push(
          stats[key] || {
            date: key,
            tasksCompleted: 0,
            focusedMinutes: 0,
            estimateAccuracy: [],
            subtasksCompleted: 0,
          }
        );
      }

      return result.reverse();
    },
    [stats]
  );

  return {
    todayStats: getTodayStats(),
    streak,
    recordTaskCompletion,
    recordSubtaskCompletion,
    addFocusedTime,
    getAverageAccuracy,
    getStatsRange,
  };
};
