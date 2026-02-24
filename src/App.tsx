import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { useTasks } from './hooks/useTasks';
import { useADHDMode } from './hooks/useADHDMode';
import { useFocusTimer } from './hooks/useFocusTimer';
import { useDailyStats } from './hooks/useDailyStats';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { BottomNav } from './components/BottomNav';
import { MobileAddTask } from './components/MobileAddTask';
import { InstallPrompt } from './components/InstallPrompt';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Sidebar } from './components/Sidebar';
import type { TaskCategory, EnergyLevel } from './types';

// Lazy-load heavy components that are conditionally rendered
const ShortcutsModal = lazy(() => import('./components/ShortcutsModal').then(m => ({ default: m.ShortcutsModal })));
const ADHDMode = lazy(() => import('./components/ADHDMode').then(m => ({ default: m.ADHDMode })));

function App() {
  const { 
    tasks, 
    addTask, 
    deleteTask, 
    toggleComplete, 
    updateTask,
    addSubtask,
    setSubtasks,
    toggleSubtask,
    deleteSubtask,
    startTaskTimer,
    stopTaskTimer,
  } = useTasks();
  
  const {
    isADHDMode,
    toggleADHDMode,
    energyFilter,
    setEnergyFilter,
    clearEnergyFilter,
    showCelebration,
    celebrationMessage,
    celebrationType,
    celebrate,
  } = useADHDMode();

  const {
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
  } = useFocusTimer();

  const {
    todayStats,
    streak,
    recordTaskCompletion,
    recordSubtaskCompletion,
    addFocusedTime,
    getAverageAccuracy,
  } = useDailyStats();

  const [filter, setFilter] = useState<TaskCategory | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    // Default to dark mode for new users
    return saved === null ? true : saved === 'true';
  });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [quickAddFocused, setQuickAddFocused] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const addTaskRef = useRef<{ focusInput: () => void }>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => {
      if (!showCompleted && task.completed) return false;
      if (filter === 'all') return true;
      return task.category === filter;
    }),
    [tasks, showCompleted, filter],
  );

  const activeTasks = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);

  // Check if all tasks are done for big celebration
  const checkForBigWin = () => {
    const todayTasks = tasks.filter((t) => 
      t.category === 'today' && !t.completed
    );
    if (todayTasks.length === 0 && tasks.filter((t) => t.category === 'today').length > 0) {
      celebrate('All daily tasks complete!', 'bigwin');
    }
  };

  // Check for streak milestones
  const checkStreakMilestone = () => {
    if (streak.currentStreak === 3 || streak.currentStreak === 7 || 
        streak.currentStreak === 30 || streak.currentStreak === 100) {
      celebrate(`${streak.currentStreak} day streak!`, 'streak');
    }
  };

  // Enhanced toggle complete with celebrations and stats
  const handleToggleComplete = useCallback((id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed) {
      // Stop timer if running for this task
      if (timer.taskId === id && timer.isRunning) {
        const minutesSpent = stopTaskTimer(id);
        stopTimer();
        addFocusedTime(minutesSpent);
      }

      // Record completion with stats
      recordTaskCompletion(task.estimatedMinutes, task.actualMinutes);

      // Celebrate
      if (isADHDMode) {
        celebrate(task.title, 'task');
        setTimeout(checkForBigWin, 100);
        setTimeout(checkStreakMilestone, 100);
      }
    }
    toggleComplete(id);
  }, [tasks, timer, isADHDMode, stopTaskTimer, stopTimer, addFocusedTime, recordTaskCompletion, celebrate, toggleComplete, streak]);

  // Handle subtask toggle with celebration
  const handleToggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    const subtask = task?.subtasks?.find((st) => st.id === subtaskId);
    
    if (subtask && !subtask.completed) {
      recordSubtaskCompletion();
      if (isADHDMode) {
        celebrate(subtask.title, 'subtask');
      }
    }
    
    toggleSubtask(taskId, subtaskId);
  }, [tasks, isADHDMode, recordSubtaskCompletion, celebrate, toggleSubtask]);

  // Timer handlers
  const handleStartTimer = useCallback((taskId: string, duration: number) => {
    startTaskTimer(taskId);
    startTimer(taskId, duration);
  }, [startTaskTimer, startTimer]);

  const handleStopTimer = useCallback(() => {
    if (timer.taskId) {
      const minutesSpent = stopTaskTimer(timer.taskId);
      addFocusedTime(minutesSpent);
    }
    stopTimer();
  }, [timer.taskId, stopTaskTimer, addFocusedTime, stopTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K for quick add
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        addTaskRef.current?.focusInput();
        setQuickAddFocused(true);
      }
      
      // ? for shortcuts help
      if (e.key === '?' && !quickAddFocused) {
        e.preventDefault();
        setShowShortcuts(true);
      }
      
      // Escape to close modals or unfocus
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setQuickAddFocused(false);
      }

      // Arrow keys for navigation (when not in input)
      if (!quickAddFocused && !showShortcuts) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedTaskIndex((prev) => 
            Math.min(prev + 1, filteredTasks.length - 1)
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedTaskIndex((prev) => Math.max(prev - 1, 0));
        }
        
        // Enter to complete selected task
        if (e.key === 'Enter' && filteredTasks[selectedTaskIndex]) {
          e.preventDefault();
          handleToggleComplete(filteredTasks[selectedTaskIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickAddFocused, showShortcuts, selectedTaskIndex, filteredTasks]);

  // Just Start - random task picker
  const handleJustStart = useCallback((energyLevel?: EnergyLevel) => {
    let availableTasks = tasks.filter((t) => !t.completed);

    // Filter by energy level if provided
    if (energyLevel) {
      const energyFiltered = availableTasks.filter((t) => t.energyLevel === energyLevel);
      // Use energy-filtered tasks if any exist, otherwise fall back to all
      if (energyFiltered.length > 0) {
        availableTasks = energyFiltered;
      }
    }

    if (availableTasks.length === 0) return;

    // Scroll to top to show the selected task
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tasks]);

  // Filter label for header
  const filterLabels: Record<string, string> = {
    all: 'All Tasks',
    inbox: 'Inbox',
    today: 'Today',
    week: 'This Week',
    someday: 'Someday',
  };

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Desktop Sidebar */}
      <Sidebar
        filter={filter}
        onFilterChange={setFilter}
        showCompleted={showCompleted}
        onToggleShowCompleted={() => setShowCompleted(!showCompleted)}
        isADHDMode={isADHDMode}
        onToggleADHDMode={toggleADHDMode}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onShowShortcuts={() => setShowShortcuts(true)}
        tasks={tasks}
      />

      {/* Main Content */}
      <main
        className="min-h-screen transition-all duration-200 md:pl-[var(--sidebar-width)]"
      >
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-8 sm:py-8">
          {/* Header */}
          <header className="mb-6">
            {/* Mobile header with brand */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h1
                className="text-lg font-bold"
                style={{
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                TADA
              </h1>
              <div className="flex gap-1">
                <button
                  onClick={toggleADHDMode}
                  className="p-2 rounded-md transition-all duration-150"
                  style={{
                    color: isADHDMode ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    backgroundColor: isADHDMode ? 'var(--color-accent-subtle)' : 'transparent',
                  }}
                  aria-label="Toggle Focus Mode"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6" />
                    <circle cx="8" cy="8" r="2" />
                    <path d="M8 2v1M8 13v1M2 8h1M13 8h1" />
                  </svg>
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-md transition-all duration-150"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="8" r="3" />
                      <path d="M8 1.5v1M8 13.5v1M2.75 2.75l.7.7M12.55 12.55l.7.7M1.5 8h1M13.5 8h1M2.75 13.25l.7-.7M12.55 3.45l.7-.7" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13.5 8.5a5.5 5.5 0 01-6-6 5.5 5.5 0 106 6z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Section title + progress bar */}
            {!isADHDMode && (
              <div>
                <h2
                  className="text-2xl font-semibold mb-1"
                  style={{
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {filterLabels[filter] || 'All Tasks'}
                </h2>

                {/* Progress indicator */}
                <div className="flex items-center gap-3 mt-3">
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${activeTasks + completedTasks > 0 ? (completedTasks / (activeTasks + completedTasks)) * 100 : 0}%`,
                        backgroundColor: 'var(--color-success)',
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-medium tabular-nums whitespace-nowrap"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {completedTasks} of {activeTasks + completedTasks} done
                  </span>
                </div>
              </div>
            )}
          </header>

          {/* Add Task (command bar) - Hidden in ADHD Mode */}
          {!isADHDMode && (
            <div className="mb-5">
              <AddTask 
                ref={addTaskRef}
                onAdd={addTask} 
                darkMode={darkMode}
                onFocus={() => setQuickAddFocused(true)}
                onBlur={() => setQuickAddFocused(false)}
              />
            </div>
          )}

          {/* ADHD Mode View */}
          {isADHDMode ? (
            <Suspense fallback={null}>
            <ADHDMode
              tasks={tasks}
              onToggle={handleToggleComplete}
              onToggleSubtask={handleToggleSubtask}
              onJustStart={handleJustStart}
              onExitADHDMode={toggleADHDMode}
              energyFilter={energyFilter}
              onEnergyFilterChange={setEnergyFilter}
              onClearEnergyFilter={clearEnergyFilter}
              darkMode={darkMode}
              timerState={{
                isRunning: timer.isRunning,
                taskId: timer.taskId,
                remainingSeconds,
                duration: timer.duration,
                progress,
                isTimeUp,
              }}
              onStartTimer={handleStartTimer}
              onPauseTimer={pauseTimer}
              onResumeTimer={resumeTimer}
              onStopTimer={handleStopTimer}
              onExtendTimer={extendTimer}
              onSetDuration={setDuration}
              dailyStats={todayStats}
              streak={streak}
              averageAccuracy={getAverageAccuracy()}
            />
            </Suspense>
          ) : (
            /* Normal Task List */
            <div className="space-y-1">
              {filteredTasks.length === 0 ? (
                <div
                  className="text-center py-20 rounded-lg"
                  style={{ animation: 'fadeIn 0.3s ease-out' }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--color-surface-hover)',
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <p
                    className="text-base font-medium mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {filter === 'all' ? 'No tasks yet' : `No tasks in ${filterLabels[filter]}`}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Press <kbd
                      className="px-1.5 py-0.5 text-xs font-mono rounded"
                      style={{
                        backgroundColor: 'var(--color-surface-hover)',
                        border: '1px solid var(--color-border)',
                      }}
                    >⌘K</kbd> to add your first task
                  </p>
                </div>
              ) : (
                filteredTasks.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleComplete}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                    onToggleSubtask={handleToggleSubtask}
                    onAddSubtask={addSubtask}
                    onDeleteSubtask={deleteSubtask}
                    onSetSubtasks={setSubtasks}
                    darkMode={darkMode}
                    isSelected={index === selectedTaskIndex}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Celebration Overlay */}
      {showCelebration && (
        <CelebrationOverlay 
          message={celebrationMessage} 
          type={celebrationType}
          darkMode={darkMode} 
        />
      )}

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <Suspense fallback={null}>
          <ShortcutsModal 
            onClose={() => setShowShortcuts(false)} 
            darkMode={darkMode}
          />
        </Suspense>
      )}

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <BottomNav
        filter={filter}
        onFilterChange={setFilter}
        isADHDMode={isADHDMode}
        onToggleADHDMode={toggleADHDMode}
        darkMode={darkMode}
      />

      {/* Mobile Add Task (hidden on desktop and in ADHD mode) */}
      {!isADHDMode && (
        <MobileAddTask
          onAdd={addTask}
          darkMode={darkMode}
        />
      )}

      {/* Install Prompt */}
      <InstallPrompt darkMode={darkMode} />

      {/* Offline Indicator */}
      <OfflineIndicator darkMode={darkMode} />
    </div>
  );
}

export default App;
