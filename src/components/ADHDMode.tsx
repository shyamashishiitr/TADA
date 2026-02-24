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
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
    if (priorityDiff !== 0) return priorityDiff;

    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

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

  const energyLevels: { level: EnergyLevel; label: string; desc: string; color: string }[] = [
    { level: 'high', label: 'High Energy', desc: 'Ready to tackle challenging tasks', color: 'var(--color-success)' },
    { level: 'medium', label: 'Medium Energy', desc: 'Can handle moderate tasks', color: 'var(--color-warning)' },
    { level: 'low', label: 'Low Energy', desc: 'Just need something small and easy', color: 'var(--color-cat-week)' },
  ];

  if (showEnergyPicker) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div
          className="max-w-lg w-full p-8 rounded-lg text-center"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeInScale 0.2s ease-out',
          }}
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            How's your energy?
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            We'll match a task to your current energy level
          </p>
          <div className="space-y-2 mb-4">
            {energyLevels.map(({ level, label, desc, color }) => (
              <button
                key={level}
                onClick={() => handleEnergySelection(level)}
                className="w-full px-5 py-4 rounded-md text-left transition-all duration-150 group"
                style={{
                  backgroundColor: 'var(--color-surface-hover)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-active)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleSkipEnergySelection}
            className="text-xs transition-colors duration-150"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Skip — surprise me
          </button>
        </div>
      </div>
    );
  }

  if (incompleteTasks.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div
          className="max-w-lg w-full p-10 rounded-lg text-center"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeInScale 0.2s ease-out',
          }}
        >
          <div
            className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-accent-subtle)' }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-accent)' }}
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            All Clear
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {energyFilter
              ? `No ${energyFilter} energy tasks right now. Try clearing the filter or adding new tasks.`
              : "You've completed everything. Time to celebrate or add new tasks."}
          </p>
          <div className="flex gap-2 justify-center">
            {energyFilter && (
              <button
                onClick={onClearEnergyFilter}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                }}
              >
                Clear Filter
              </button>
            )}
            <button
              onClick={onExitADHDMode}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-surface-hover)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              Back to All Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
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

      {/* Focus View — Single Task */}
      <div className="flex flex-col items-center justify-center py-8">
        <div
          className="max-w-2xl w-full p-8 rounded-lg"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeInScale 0.25s ease-out',
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Focus on this
            </p>
          </div>

          {/* Task Card */}
          <div
            className="p-6 rounded-md mb-6"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              borderLeft: '2px solid',
              borderLeftColor:
                currentTask.priority === 'high'
                  ? 'var(--color-danger)'
                  : currentTask.priority === 'medium'
                  ? 'var(--color-warning)'
                  : 'var(--color-success)',
            }}
          >
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-2"
              style={{
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {currentTask.title}
            </h2>
            {currentTask.description && (
              <p
                className="text-sm mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {currentTask.description}
              </p>
            )}
            <div className="flex gap-3 flex-wrap">
              {currentTask.estimatedMinutes && (
                <span
                  className="text-xs font-medium px-2 py-1 rounded-md"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  ~{currentTask.estimatedMinutes} min
                </span>
              )}
              {currentTask.energyLevel && (
                <span
                  className="text-xs font-medium px-2 py-1 rounded-md capitalize"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {currentTask.energyLevel} energy
                </span>
              )}
            </div>

            {/* Subtasks in focus mode */}
            {currentTask.subtasks && currentTask.subtasks.length > 0 && (
              <div className="mt-5">
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
            <div className="mb-6">
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
            /* Action buttons */
            <div className="flex justify-center gap-3 mb-6">
              {currentTask.estimatedMinutes ? (
                <button
                  onClick={handleStartFocus}
                  className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-150"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  }}
                >
                  Start Focus Timer
                </button>
              ) : (
                <button
                  onClick={() => onToggle(currentTask.id)}
                  className="px-6 py-3 rounded-md text-sm font-medium transition-all duration-150"
                  style={{
                    backgroundColor: 'var(--color-success)',
                    color: '#fff',
                  }}
                >
                  Mark Complete
                </button>
              )}
            </div>
          )}

          {/* Task Counter */}
          <p
            className="text-center text-xs mb-5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {remainingCount > 0 ? (
              <>
                {remainingCount} more task{remainingCount !== 1 ? 's' : ''} after this
              </>
            ) : (
              <>This is your last task</>
            )}
          </p>

          {/* Bottom action buttons */}
          <div
            className="flex gap-2 justify-center pt-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <button
              onClick={handleJustStart}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-surface-hover)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-active)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
            >
              Random Task
            </button>
            <button
              onClick={onExitADHDMode}
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-surface-hover)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-active)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
            >
              See All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
