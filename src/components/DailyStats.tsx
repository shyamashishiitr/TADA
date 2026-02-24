import { useState } from 'react';
import type { DailyStats as DailyStatsType, StreakData } from '../types';

interface DailyStatsProps {
  stats: DailyStatsType;
  streak: StreakData;
  averageAccuracy: number;
  darkMode?: boolean;
}

export const DailyStats = ({ stats, streak, averageAccuracy, darkMode = false }: DailyStatsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getStreakMessage = (): string => {
    if (streak.currentStreak === 0) return "Ready to start a new streak";
    if (streak.currentStreak === 1) return "First day done — keep going";
    if (streak.currentStreak === 3) return "3 days in a row — building momentum";
    if (streak.currentStreak === 7) return "One week streak — incredible";
    if (streak.currentStreak === 30) return "30 days — you're a legend";
    if (streak.currentStreak >= 100) return `${streak.currentStreak} days — unstoppable`;
    return `${streak.currentStreak} day${streak.currentStreak !== 1 ? 's' : ''} strong`;
  };

  const getAccuracyMessage = (): string => {
    if (averageAccuracy === 0) return "Track time to see accuracy";
    if (averageAccuracy >= 90 && averageAccuracy <= 110) return "Estimates are spot-on";
    if (averageAccuracy < 90) return "Finishing faster than expected";
    if (averageAccuracy > 110 && averageAccuracy < 150) return "Tasks taking a bit longer";
    return "Try adding buffer time";
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-3 rounded-md transition-all duration-150 text-left"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
              <rect x="2" y="2" width="12" height="12" rx="2" />
              <path d="M5 10V8M8 10V6M11 10V4" />
            </svg>
            <div>
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Today's Progress
              </span>
              <span
                className="text-xs ml-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {stats.tasksCompleted} task{stats.tasksCompleted !== 1 ? 's' : ''} · {formatTime(stats.focusedMinutes)}
              </span>
            </div>
          </div>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <div
      className="rounded-md"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animation: 'fadeInScale 0.15s ease-out',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Today's Progress
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 rounded-md transition-all duration-150"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10l4-4 4 4" />
          </svg>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
        {[
          { label: 'Tasks', value: stats.tasksCompleted },
          { label: 'Focus', value: formatTime(stats.focusedMinutes) },
          { label: 'Streak', value: streak.currentStreak },
          { label: 'Steps', value: stats.subtasksCompleted },
        ].map((item, i) => (
          <div
            key={i}
            className="px-3 py-3 text-center"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div
              className="text-lg font-semibold tabular-nums"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {item.value}
            </div>
            <div
              className="text-[11px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="px-4 py-3 space-y-2">
        {streak.currentStreak > 0 && (
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'var(--color-cat-today)' }}
            />
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {getStreakMessage()}
              {streak.longestStreak > streak.currentStreak && (
                <span style={{ color: 'var(--color-text-muted)' }}> · Best: {streak.longestStreak}d</span>
              )}
            </span>
          </div>
        )}

        {stats.estimateAccuracy.length > 0 && (
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'var(--color-cat-week)' }}
            />
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {getAccuracyMessage()}
              {averageAccuracy > 0 && (
                <span style={{ color: 'var(--color-text-muted)' }}> · {Math.round(averageAccuracy)}% of estimate</span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
