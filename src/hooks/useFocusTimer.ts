import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerState } from '../types';

const TIMER_KEY = 'tada-focus-timer';

export const useFocusTimer = () => {
  const [timer, setTimer] = useState<TimerState>(() => {
    const saved = localStorage.getItem(TIMER_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Calculate elapsed time if timer was running
      if (parsed.isRunning && parsed.startTime) {
        const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
        return { ...parsed, elapsed };
      }
      return parsed;
    }
    return {
      isRunning: false,
      taskId: null,
      startTime: null,
      duration: 25, // default 25 minutes
      elapsed: 0,
    };
  });

  const intervalRef = useRef<number | null>(null);

  // Persist timer state
  useEffect(() => {
    localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
  }, [timer]);

  // Tick effect - runs every second when timer is active
  useEffect(() => {
    if (timer.isRunning && timer.startTime) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (!prev.startTime) return prev;
          const newElapsed = Math.floor((Date.now() - prev.startTime) / 1000);
          return { ...prev, elapsed: newElapsed };
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [timer.isRunning, timer.startTime]);

  const startTimer = useCallback((taskId: string, durationMinutes: number = 25) => {
    setTimer({
      isRunning: true,
      taskId,
      startTime: Date.now(),
      duration: durationMinutes,
      elapsed: 0,
    });
  }, []);

  const pauseTimer = useCallback(() => {
    setTimer((prev) => ({
      ...prev,
      isRunning: false,
    }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimer((prev) => {
      if (!prev.taskId) return prev;
      return {
        ...prev,
        isRunning: true,
        startTime: Date.now() - (prev.elapsed * 1000),
      };
    });
  }, []);

  const stopTimer = useCallback(() => {
    const elapsed = timer.elapsed;
    setTimer({
      isRunning: false,
      taskId: null,
      startTime: null,
      duration: 25,
      elapsed: 0,
    });
    return Math.floor(elapsed / 60); // return minutes spent
  }, [timer.elapsed]);

  const extendTimer = useCallback((additionalMinutes: number) => {
    setTimer((prev) => ({
      ...prev,
      duration: prev.duration + additionalMinutes,
    }));
  }, []);

  const setDuration = useCallback((minutes: number) => {
    setTimer((prev) => ({
      ...prev,
      duration: minutes,
    }));
  }, []);

  const remainingSeconds = Math.max(0, (timer.duration * 60) - timer.elapsed);
  const isTimeUp = timer.isRunning && remainingSeconds === 0;
  const progress = timer.duration > 0 ? Math.min(100, (timer.elapsed / (timer.duration * 60)) * 100) : 0;

  return {
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    extendTimer,
    setDuration,
    remainingSeconds,
    isTimeUp,
    progress,
  };
};
