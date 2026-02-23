import { useState, useEffect, useRef } from 'react';
import { useTasks } from './hooks/useTasks';
import { useADHDMode } from './hooks/useADHDMode';
import { useFocusTimer } from './hooks/useFocusTimer';
import { useDailyStats } from './hooks/useDailyStats';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ADHDMode } from './components/ADHDMode';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import type { TaskCategory, EnergyLevel } from './types';

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
    return saved === 'true';
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

  const filteredTasks = tasks.filter((task) => {
    if (!showCompleted && task.completed) return false;
    if (filter === 'all') return true;
    return task.category === filter;
  });

  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

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
  const handleToggleComplete = (id: string) => {
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
  };

  // Handle subtask toggle with celebration
  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    const subtask = task?.subtasks?.find((st) => st.id === subtaskId);
    
    if (subtask && !subtask.completed) {
      recordSubtaskCompletion();
      if (isADHDMode) {
        celebrate(subtask.title, 'subtask');
      }
    }
    
    toggleSubtask(taskId, subtaskId);
  };

  // Timer handlers
  const handleStartTimer = (taskId: string, duration: number) => {
    startTaskTimer(taskId);
    startTimer(taskId, duration);
  };

  const handleStopTimer = () => {
    if (timer.taskId) {
      const minutesSpent = stopTaskTimer(timer.taskId);
      addFocusedTime(minutesSpent);
    }
    stopTimer();
  };

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
  const handleJustStart = (energyLevel?: EnergyLevel) => {
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
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-4xl sm:text-6xl font-black mb-2 transition-colors bg-gradient-to-r ${
                darkMode 
                  ? 'from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text' 
                  : 'from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text'
              }`}>
                TADA
              </h1>
              <p className={`text-sm sm:text-base font-medium transition-colors ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>
                Get Things Done, Beautifully ✨
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={toggleADHDMode}
                className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg text-sm sm:text-base ${
                  isADHDMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50'
                    : darkMode
                    ? 'bg-slate-800/80 backdrop-blur text-purple-300 hover:bg-slate-700/80 border border-purple-500/20'
                    : 'bg-white/90 backdrop-blur text-purple-700 hover:bg-white border border-purple-200'
                }`}
                aria-label="Toggle ADHD Mode"
                title="ADHD Mode - Focus on one task at a time"
              >
                <span className="mr-2">🧠</span>
                ADHD Mode
              </button>
              <button
                onClick={() => setShowShortcuts(true)}
                className={`p-2.5 sm:p-3 rounded-xl transition-all hover:scale-105 shadow-md ${
                  darkMode 
                    ? 'bg-slate-800/80 backdrop-blur text-purple-300 hover:bg-slate-700/80 border border-purple-500/20' 
                    : 'bg-white/90 backdrop-blur text-purple-600 hover:bg-white border border-purple-200'
                }`}
                aria-label="Keyboard shortcuts"
                title="Keyboard shortcuts (?)"
              >
                <span className="text-lg">⌨️</span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 sm:p-3 rounded-xl transition-all hover:scale-105 shadow-md ${
                  darkMode 
                    ? 'bg-slate-800/80 backdrop-blur text-yellow-300 hover:bg-slate-700/80 border border-yellow-500/20' 
                    : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
          
          {/* Stats Cards - Hidden in ADHD Mode */}
          {!isADHDMode && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            <div className={`p-4 sm:p-5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur border border-blue-500/20' 
                : 'bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200'
            }`}>
              <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                darkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                {activeTasks}
              </div>
              <div className={`text-xs sm:text-sm font-medium ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Active Tasks
              </div>
            </div>
            <div className={`p-4 sm:p-5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur border border-green-500/20' 
                : 'bg-gradient-to-br from-green-100 to-green-50 border border-green-200'
            }`}>
              <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                darkMode ? 'text-green-300' : 'text-green-700'
              }`}>
                {completedTasks}
              </div>
              <div className={`text-xs sm:text-sm font-medium ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                Completed
              </div>
            </div>
          </div>
          )}
        </header>

        {/* Filters - Hidden in ADHD Mode */}
        {!isADHDMode && (
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base shadow-md hover:scale-105 ${
              filter === 'all'
                ? darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-500/50'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-500/30'
                : darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base shadow-md hover:scale-105 ${
              filter === 'today'
                ? darkMode
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-orange-500/50'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/30'
                : darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            🔥 Today
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base shadow-md hover:scale-105 ${
              filter === 'week'
                ? darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/30'
                : darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            📅 Week
          </button>
          <button
            onClick={() => setFilter('inbox')}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base shadow-md hover:scale-105 ${
              filter === 'inbox'
                ? darkMode
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-gray-500/50'
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-500/30'
                : darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            📥 Inbox
          </button>
          <button
            onClick={() => setFilter('someday')}
            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base shadow-md hover:scale-105 ${
              filter === 'someday'
                ? darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/30'
                : darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            💭 Someday
          </button>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`ml-auto px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base shadow-md hover:scale-105 ${
              darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            {showCompleted ? '👁️ Hide' : '👁️ Show'}
          </button>
        </div>
        )}

        {/* Add Task - Hidden in ADHD Mode */}
        {!isADHDMode && (
        <div className="mb-6">
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
        ) : (
        /* Normal Task List */
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className={`text-center py-16 sm:py-20 rounded-2xl transition-colors shadow-lg ${
              darkMode ? 'bg-slate-800/50 backdrop-blur border border-slate-700' : 'bg-white/70 backdrop-blur border border-gray-200'
            }`}>
              <div className="text-6xl sm:text-7xl mb-4">🎉</div>
              <p className={`text-xl sm:text-2xl font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                All Clear!
              </p>
              <p className={`text-sm sm:text-base ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {filter === 'all'
                  ? 'Add your first task to get started'
                  : `No tasks in ${filter}`}
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
          <ShortcutsModal 
            onClose={() => setShowShortcuts(false)} 
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;
