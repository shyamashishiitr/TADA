import { useState, useEffect } from 'react';
import type { Task, TaskPriority, TaskCategory, SubTask } from '../types';

const STORAGE_KEY = 'tada-tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, category: TaskCategory = 'inbox', priority: TaskPriority = 'medium') => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? Date.now() : undefined,
            }
          : task
      )
    );
  };

  // Subtask operations
  const addSubtask = (taskId: string, subtaskTitle: string) => {
    const newSubtask: SubTask = {
      id: crypto.randomUUID(),
      title: subtaskTitle,
      completed: false,
    };

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...(task.subtasks || []), newSubtask],
            }
          : task
      )
    );
  };

  const setSubtasks = (taskId: string, subtasks: SubTask[]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, subtasks }
          : task
      )
    );
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const updatedSubtasks = task.subtasks?.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );

        // Auto-complete parent task if all subtasks are done
        const allSubtasksComplete = updatedSubtasks?.every((st) => st.completed);
        
        return {
          ...task,
          subtasks: updatedSubtasks,
          completed: allSubtasksComplete && updatedSubtasks && updatedSubtasks.length > 0 ? true : task.completed,
          completedAt: allSubtasksComplete && updatedSubtasks && updatedSubtasks.length > 0 && !task.completed ? Date.now() : task.completedAt,
        };
      })
    );
  };

  const deleteSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks?.filter((st) => st.id !== subtaskId),
            }
          : task
      )
    );
  };

  // Time tracking
  const startTaskTimer = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, timerStartedAt: Date.now() }
          : task
      )
    );
  };

  const stopTaskTimer = (taskId: string): number => {
    let minutesSpent = 0;
    
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.timerStartedAt) {
          const elapsed = Math.floor((Date.now() - task.timerStartedAt) / 1000 / 60);
          minutesSpent = elapsed;
          return {
            ...task,
            actualMinutes: (task.actualMinutes || 0) + elapsed,
            timerStartedAt: undefined,
          };
        }
        return task;
      })
    );

    return minutesSpent;
  };

  return {
    tasks,
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
