import { useState } from 'react';
import type { Task, EnergyLevel, DailyStats as DailyStatsType, StreakData } from '../types';
import { EnergyFilter } from './EnergyFilter';
import { FocusTimer } from './FocusTimer';
import { SubtaskList } from './SubtaskList';
import { DailyStats } from './DailyStats';

interface ADHDModeProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onJustStart: (energyLevel?: EnergyLevel) => void;
  onExitADHDMode: () => void;
  energyFilter: EnergyLevel | null;
  onEnergyFilterChange: (level: EnergyLevel) => void;
  onClearEnergyFilter: () => void;
  darkMode?: boolean;
  // Timer props
  timerState: {
    isRunning: boolean;
    taskId: string | null;
    remainingSeconds: number;
    duration: number;
    progress: number;
    isTimeUp: boolean;
  };
  onStartTimer: (taskId: string, duration: number) => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  onStopTimer: () => void;
  onExtendTimer: (minutes: number) => void;
  onSetDuration: (minutes: number) => void;
  // Stats props
  dailyStats: DailyStatsType;
  streak: StreakData;
  averageAccuracy: number;
}

export const ADHDMode = ({
  tasks,
  onToggle,
  onToggleSubtask,
  onJustStart,
  onExitADHDMode,
  energyFilter,
  onEnergyFilterChange,
  onClearEnergyFilter,
  darkMode = false,
  timerState,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onStopTimer,
  onExtendTimer,
  onSetDuration,
  dailyStats,
  streak,
  averageAccuracy,
}: ADHDModeProps) => {
  const [showEnergyPicker, setShowEnergyPicker] = useState(false);

  // Filter incomplete tasks
  let incompleteTasks = tasks.filter((t) => !t.completed);

  // Apply energy filter if set
  if (energyFilter) {
    incompleteTasks = incompleteTasks.filter((t) => t.energyLevel === energyFilter);
  }

  // Sort by priority and due date
  const sortedTasks = [...incompleteTasks].sort((a, b) => {
    // Priority weight
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Due date (sooner first)
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    // Creation date (newer first for no due date)
    return b.createdAt - a.createdAt;
  });

  const currentTask = sortedTasks[0];
  const remainingCount = sortedTasks.length - 1;

  const handleJustStart = () => {
    if (incompleteTasks.length === 0) return;
    setShowEnergyPicker(true);
  };

  const handleEnergySelection = (level: EnergyLevel) => {
    setShowEnergyPicker(false);
    onJustStart(level);
  };

  const handleSkipEnergySelection = () => {
    setShowEnergyPicker(false);
    onJustStart();
  };

  const handleStartFocus = () => {
    if (currentTask) {
      const duration = currentTask.estimatedMinutes || 25;
      onStartTimer(currentTask.id, duration);
    }
  };

  if (showEnergyPicker) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div
          className={`
            max-w-2xl w-full p-8 rounded-3xl shadow-2xl text-center
            ${
              darkMode
                ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700'
                : 'bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-xl border border-purple-200'
            }
          `}
        >
          <h2
            className={`text-3xl sm:text-4xl font-black mb-6 ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}
          >
            How's your energy? ⚡
          </h2>
          <p
            className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            I'll pick a task that matches your current energy level
          </p>
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleEnergySelection('high')}
              className="w-full px-8 py-6 rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl"
            >
              🔋 High Energy
              <p className="text-sm font-normal mt-1 opacity-90">
                Ready to tackle challenging tasks
              </p>
            </button>
            <button
              onClick={() => handleEnergySelection('medium')}
              className="w-full px-8 py-6 rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl"
            >
              ⚡ Medium Energy
              <p className="text-sm font-normal mt-1 opacity-90">
                Can handle moderate tasks
              </p>
            </button>
            <button
              onClick={() => handleEnergySelection('low')}
              className="w-full px-8 py-6 rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl"
            >
              🪫 Low Energy
              <p className="text-sm font-normal mt-1 opacity-90">
                Just need something small and easy
              </p>
            </button>
          </div>
          <button
            onClick={handleSkipEnergySelection}
            className={`text-sm underline transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Skip - surprise me with anything
          </button>
        </div>
      </div>
    );
  }

  if (incompleteTasks.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div
          className={`
            max-w-2xl w-full p-12 rounded-3xl shadow-2xl text-center
            ${
              darkMode
                ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700'
                : 'bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-xl border border-purple-200'
            }
          `}
        >
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2
            className={`text-4xl font-black mb-4 ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}
          >
            All Clear!
          </h2>
          <p
            className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {energyFilter
              ? `No ${energyFilter} energy tasks right now. Try clearing the filter or adding new tasks.`
              : "You've completed everything! Time to celebrate or add new tasks."}
          </p>
          {energyFilter && (
            <button
              onClick={onClearEnergyFilter}
              className="mb-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 transition-all shadow-md"
            >
              Clear Energy Filter
            </button>
          )}
          <button
            onClick={onExitADHDMode}
            className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 shadow-md ${
              darkMode
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Back to Normal View
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Daily Stats */}
      <DailyStats
        stats={dailyStats}
        streak={streak}
        averageAccuracy={averageAccuracy}
        darkMode={darkMode}
      />

      {/* Energy Filter */}
      <div className="flex justify-center">
        <EnergyFilter
          energyFilter={energyFilter}
          onSelect={onEnergyFilterChange}
          onClear={onClearEnergyFilter}
          darkMode={darkMode}
        />
      </div>

      {/* Focus View - Single Task */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <div
          className={`
            max-w-3xl w-full p-10 sm:p-12 rounded-3xl shadow-2xl
            ${
              darkMode
                ? 'bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-xl border-2 border-purple-500/30'
                : 'bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-xl border-2 border-purple-300'
            }
          `}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <p
              className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}
            >
              🎯 Your next thing:
            </p>
          </div>

          {/* Task Card */}
          <div
            className={`
              p-8 rounded-2xl mb-8 border-l-4
              ${
                currentTask.priority === 'high'
                  ? 'border-l-red-500'
                  : currentTask.priority === 'medium'
                  ? 'border-l-yellow-500'
                  : 'border-l-green-500'
              }
              ${
                darkMode
                  ? 'bg-slate-900/60 backdrop-blur'
                  : 'bg-white/80 backdrop-blur border border-gray-100'
              }
            `}
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              {currentTask.title}
            </h2>
            {currentTask.description && (
              <p
                className={`text-lg mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {currentTask.description}
              </p>
            )}
            <div className="flex gap-3 flex-wrap mb-4">
              {currentTask.estimatedMinutes && (
                <span
                  className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode
                      ? 'bg-purple-900/50 text-purple-300 border border-purple-700'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  ⏱ ~{currentTask.estimatedMinutes} min
                </span>
              )}
              {currentTask.energyLevel && (
                <span
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentTask.energyLevel === 'high'
                      ? darkMode
                        ? 'bg-green-900/50 text-green-300 border border-green-700'
                        : 'bg-green-50 text-green-700 border border-green-200'
                      : currentTask.energyLevel === 'medium'
                      ? darkMode
                        ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      : darkMode
                      ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {currentTask.energyLevel === 'high' && '🔋'}
                  {currentTask.energyLevel === 'medium' && '⚡'}
                  {currentTask.energyLevel === 'low' && '🪫'}
                  {' '}
                  {currentTask.energyLevel} energy
                </span>
              )}
            </div>

            {/* Subtasks in focus mode - one at a time */}
            {currentTask.subtasks && currentTask.subtasks.length > 0 && (
              <div className="mt-6">
                <SubtaskList
                  subtasks={currentTask.subtasks}
                  onToggle={(subtaskId) => onToggleSubtask(currentTask.id, subtaskId)}
                  showOnlyNext={true}
                  darkMode={darkMode}
                />
              </div>
            )}
          </div>

          {/* Focus Timer */}
          {timerState.taskId === currentTask.id && (timerState.isRunning || timerState.remainingSeconds < timerState.duration * 60) ? (
            <div className="mb-8">
              <FocusTimer
                remainingSeconds={timerState.remainingSeconds}
                duration={timerState.duration}
                progress={timerState.progress}
                isRunning={timerState.isRunning}
                isTimeUp={timerState.isTimeUp}
                onPause={onPauseTimer}
                onResume={onResumeTimer}
                onStop={onStopTimer}
                onExtend={onExtendTimer}
                onSetDuration={onSetDuration}
                darkMode={darkMode}
              />
            </div>
          ) : (
            /* Large Checkbox / Start Button */
            <div className="flex justify-center mb-8">
              {currentTask.estimatedMinutes ? (
                <button
                  onClick={handleStartFocus}
                  className="px-12 py-6 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-2xl hover:scale-110 transition-all shadow-2xl"
                >
                  ▶ Start Focus Timer
                </button>
              ) : (
                <button
                  onClick={() => onToggle(currentTask.id)}
                  className={`
                    w-32 h-32 rounded-3xl border-4 transition-all hover:scale-110 shadow-2xl
                    flex items-center justify-center
                    ${
                      darkMode
                        ? 'border-purple-500 bg-slate-800/50 hover:bg-purple-900/50 hover:border-purple-400'
                        : 'border-purple-400 bg-white hover:bg-purple-50 hover:border-purple-500'
                    }
                  `}
                  aria-label="Mark as complete"
                >
                  <span className="text-6xl">✓</span>
                </button>
              )}
            </div>
          )}

          {/* Task Counter */}
          <p
            className={`text-center text-lg mb-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {remainingCount > 0 ? (
              <>
                {remainingCount} more task{remainingCount !== 1 ? 's' : ''} after
                this
              </>
            ) : (
              <>This is your last task! 🎉</>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleJustStart}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              🎲 Just Start (Random)
            </button>
            <button
              onClick={onExitADHDMode}
              className={`px-8 py-4 rounded-2xl font-medium text-lg transition-all hover:scale-105 shadow-md ${
                darkMode
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📋 See All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
