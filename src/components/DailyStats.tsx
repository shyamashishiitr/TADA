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
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getStreakMessage = (): string => {
    if (streak.currentStreak === 0) return "Ready to start a new streak! 🌱";
    if (streak.currentStreak === 1) return "First day done! Keep it going 🎯";
    if (streak.currentStreak === 3) return "3 days in a row! You're building momentum 🔥";
    if (streak.currentStreak === 7) return "One week streak! That's incredible 🌟";
    if (streak.currentStreak === 30) return "30 days! You're a productivity legend 👑";
    if (streak.currentStreak >= 100) return `${streak.currentStreak} days! Unstoppable! 🚀`;
    return `${streak.currentStreak} day${streak.currentStreak !== 1 ? 's' : ''} strong! 💪`;
  };

  const getAccuracyMessage = (): string => {
    if (averageAccuracy === 0) return "Track time to see your accuracy";
    if (averageAccuracy >= 90 && averageAccuracy <= 110) return "Your estimates are spot-on! 🎯";
    if (averageAccuracy < 90) return "You tend to finish faster than expected ⚡";
    if (averageAccuracy > 110 && averageAccuracy < 150) return "Tasks are taking a bit longer 🤔";
    return "Try adding buffer time to estimates 💡";
  };

  const getMotivationalMessage = (): string => {
    const messages = [
      "You're doing great! 🌟",
      "Every task completed is progress 💪",
      "Look at you making things happen! ✨",
      "Your brain is doing amazing work 🧠",
      "Small steps, big wins 🎯",
      "You should be proud 🌈",
      "Crushing it today! 🔥",
      "Keep up the awesome work 💫",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`w-full p-4 rounded-2xl transition-all hover:scale-[1.02] shadow-md ${
          darkMode
            ? 'bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur border border-purple-500/30 text-purple-300'
            : 'bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur border border-purple-200 text-purple-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div className="text-left">
              <div className="font-bold text-sm">Today's Stats</div>
              <div className="text-xs opacity-80">
                {stats.tasksCompleted} task{stats.tasksCompleted !== 1 ? 's' : ''} · {formatTime(stats.focusedMinutes)}
              </div>
            </div>
          </div>
          <div className="text-xl">▼</div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode
          ? 'bg-gradient-to-br from-slate-800/90 to-purple-900/70 backdrop-blur border border-purple-500/30'
          : 'bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur border border-purple-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <h3
            className={`text-xl font-black ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}
          >
            Today's Progress
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className={`p-2 rounded-lg transition-all hover:scale-110 ${
            darkMode
              ? 'text-gray-400 hover:text-gray-300'
              : 'text-gray-600 hover:text-gray-700'
          }`}
        >
          ▲
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Tasks Completed */}
        <div
          className={`p-4 rounded-xl ${
            darkMode
              ? 'bg-slate-900/60 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text">
            {stats.tasksCompleted}
          </div>
          <div
            className={`text-sm font-medium mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Tasks completed
          </div>
        </div>

        {/* Focus Time */}
        <div
          className={`p-4 rounded-xl ${
            darkMode
              ? 'bg-slate-900/60 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="text-3xl font-black bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            {formatTime(stats.focusedMinutes)}
          </div>
          <div
            className={`text-sm font-medium mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Focused time
          </div>
        </div>

        {/* Streak */}
        <div
          className={`p-4 rounded-xl ${
            darkMode
              ? 'bg-slate-900/60 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text">
            {streak.currentStreak}
          </div>
          <div
            className={`text-sm font-medium mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Day streak 🔥
          </div>
        </div>

        {/* Subtasks */}
        <div
          className={`p-4 rounded-xl ${
            darkMode
              ? 'bg-slate-900/60 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            {stats.subtasksCompleted}
          </div>
          <div
            className={`text-sm font-medium mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Micro-steps done
          </div>
        </div>
      </div>

      {/* Streak Message */}
      {streak.currentStreak > 0 && (
        <div
          className={`p-4 rounded-xl mb-4 ${
            darkMode
              ? 'bg-orange-900/30 text-orange-300 border border-orange-700'
              : 'bg-orange-50 text-orange-700 border border-orange-200'
          }`}
        >
          <div className="font-semibold text-sm">{getStreakMessage()}</div>
          {streak.longestStreak > streak.currentStreak && (
            <div className="text-xs mt-1 opacity-80">
              Your best: {streak.longestStreak} days
            </div>
          )}
        </div>
      )}

      {/* Estimate Accuracy */}
      {stats.estimateAccuracy.length > 0 && (
        <div
          className={`p-4 rounded-xl mb-4 ${
            darkMode
              ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          <div className="font-semibold text-sm mb-1">Time Estimation</div>
          <div className="text-xs opacity-90">{getAccuracyMessage()}</div>
          {averageAccuracy > 0 && (
            <div className="text-xs mt-1 opacity-70">
              Average: {Math.round(averageAccuracy)}% of estimate
            </div>
          )}
        </div>
      )}

      {/* Motivational Message */}
      <div
        className={`p-4 rounded-xl text-center ${
          darkMode
            ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30'
            : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
        }`}
      >
        <div
          className={`font-bold text-sm ${
            darkMode ? 'text-purple-200' : 'text-purple-700'
          }`}
        >
          {getMotivationalMessage()}
        </div>
      </div>
    </div>
  );
};
