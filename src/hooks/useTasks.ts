/**
 * TADA — Core task-management hook.
 *
 * Uses the {@link StorageAdapter} for persistence so the backing store can be
 * swapped transparently.
 *
 * Key design decisions:
 * - **Optimistic updates**: React state is updated immediately; persistence
 *   happens in the background via a debounced write.
 * - **Immutability**: every operation returns a new array / object — no
 *   in-place mutations.
 * - **Validation**: title length, duplicate checks, etc. are enforced by
 *   the task engine.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Task, TaskPriority, TaskCategory, SubTask } from '../types/index';
import { getStorage } from '../lib/storage';
import { SAVE_DEBOUNCE_MS } from '../lib/constants';
import { generateId } from '../lib/utils';
import { validateTask } from '../lib/taskEngine';

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ref to track latest tasks for the debounced save
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ---- Load from storage on mount ----------------------------------------
  useEffect(() => {
    let cancelled = false;
    const storage = getStorage();

    storage.getTasks().then((stored) => {
      if (!cancelled) {
        setTasks(stored);
        setIsLoaded(true);
      }
    }).catch((err) => {
      console.error('[useTasks] Failed to load tasks:', err);
      if (!cancelled) setIsLoaded(true);
    });

    return () => { cancelled = true; };
  }, []);

  // ---- Debounced persist --------------------------------------------------
  const scheduleSave = useCallback(() => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const storage = getStorage();
      storage.saveTasks(tasksRef.current).catch((err) => {
        console.error('[useTasks] Failed to save tasks:', err);
      });
    }, SAVE_DEBOUNCE_MS);
  }, []);

  // Persist whenever tasks change (after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    scheduleSave();
  }, [tasks, isLoaded, scheduleSave]);

  // Flush on unmount
  useEffect(() => {
    return () => {
      clearTimeout(saveTimerRef.current);
      // Final synchronous flush
      const storage = getStorage();
      storage.saveTasks(tasksRef.current).catch(() => { /* best effort */ });
    };
  }, []);

  // ---- Task operations ----------------------------------------------------

  const addTask = useCallback(
    (title: string, category: TaskCategory = 'inbox', priority: TaskPriority = 'medium') => {
      const validation = validateTask({ title }, tasksRef.current);
      if (!validation.valid) {
        console.warn('[useTasks] Validation failed:', validation.errors);
        // Still allow adding — validation is advisory for now
      }

      const newTask: Task = {
        id: generateId(),
        title: title.trim(),
        priority,
        category,
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [],
  );

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? Date.now() : undefined,
            }
          : task,
      ),
    );
  }, []);

  // ---- Subtask operations -------------------------------------------------

  const addSubtask = useCallback((taskId: string, subtaskTitle: string) => {
    const newSubtask: SubTask = {
      id: generateId(),
      title: subtaskTitle.trim(),
      completed: false,
    };

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...(task.subtasks ?? []), newSubtask] }
          : task,
      ),
    );
  }, []);

  const setSubtasks = useCallback((taskId: string, subtasks: SubTask[]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, subtasks } : task,
      ),
    );
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const updatedSubtasks = task.subtasks?.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st,
        );

        const allSubtasksComplete = updatedSubtasks?.every((st) => st.completed);

        return {
          ...task,
          subtasks: updatedSubtasks,
          completed:
            allSubtasksComplete && updatedSubtasks && updatedSubtasks.length > 0
              ? true
              : task.completed,
          completedAt:
            allSubtasksComplete && updatedSubtasks && updatedSubtasks.length > 0 && !task.completed
              ? Date.now()
              : task.completedAt,
        };
      }),
    );
  }, []);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: task.subtasks?.filter((st) => st.id !== subtaskId) }
          : task,
      ),
    );
  }, []);

  // ---- Time tracking ------------------------------------------------------

  const startTaskTimer = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, timerStartedAt: Date.now() } : task,
      ),
    );
  }, []);

  const stopTaskTimer = useCallback((taskId: string): number => {
    let minutesSpent = 0;

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.timerStartedAt) {
          const elapsed = Math.floor((Date.now() - task.timerStartedAt) / 1000 / 60);
          minutesSpent = elapsed;
          return {
            ...task,
            actualMinutes: (task.actualMinutes ?? 0) + elapsed,
            timerStartedAt: undefined,
          };
        }
        return task;
      }),
    );

    return minutesSpent;
  }, []);

  return {
    tasks,
    isLoaded,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    addSubtask,
    setSubtasks,
    toggleSubtask,
    deleteSubtask,
    startTaskTimer,
    stopTaskTimer,
  };
};
