import { useState } from 'react';

interface FocusTimerProps {
  remainingSeconds: number;
  duration: number; // in minutes
  progress: number; // 0-100
  isRunning: boolean;
  isTimeUp: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onExtend: (minutes: number) => void;
  onSetDuration: (minutes: number) => void;
  darkMode?: boolean;
}

export const FocusTimer = ({
  remainingSeconds,
  duration,
  progress,
  isRunning,
  isTimeUp,
  onPause,
  onResume,
  onStop,
  onExtend,
  onSetDuration,
  darkMode = false,
}: FocusTimerProps) => {
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    const percentRemaining = (remainingSeconds / (duration * 60)) * 100;
    if (percentRemaining > 50) return 'stroke-green-500';
    if (percentRemaining > 25) return 'stroke-yellow-500';
    return 'stroke-amber-500';
  };

  const quickDurations = [5, 10, 15, 25, 45];

  if (showDurationPicker && !isRunning) {
    return (
      <div
        className={`p-6 rounded-2xl shadow-lg ${
          darkMode
            ? 'bg-slate-800/90 backdrop-blur border border-slate-700'
            : 'bg-white/90 backdrop-blur border border-gray-200'
        }`}
      >
        <h3
          className={`text-xl font-bold mb-4 text-center ${
            darkMode ? 'text-purple-300' : 'text-purple-700'
          }`}
        >
          How long do you want to focus?
        </h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {quickDurations.map((mins) => (
            <button
              key={mins}
              onClick={() => {
                onSetDuration(mins);
                setShowDurationPicker(false);
              }}
              className={`px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                duration === mins
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="180"
            placeholder="Custom"
            className={`flex-1 px-4 py-2 border-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.currentTarget.value);
                if (value > 0 && value <= 180) {
                  onSetDuration(value);
                  setShowDurationPicker(false);
                }
              }
            }}
          />
          <button
            onClick={() => setShowDurationPicker(false)}
            className={`px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
              darkMode
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode
          ? 'bg-slate-800/90 backdrop-blur border border-slate-700'
          : 'bg-white/90 backdrop-blur border border-gray-200'
      }`}
    >
      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              className={darkMode ? 'stroke-slate-700' : 'stroke-gray-200'}
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              className={`${getColorClass()} transition-all duration-1000`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={`text-4xl font-black ${
                darkMode ? 'text-white' : 'text-gray-900'
              } ${isTimeUp ? 'animate-pulse' : ''}`}
            >
              {formatTime(remainingSeconds)}
            </div>
            <div
              className={`text-sm font-medium mt-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {isTimeUp ? '✨ Time\'s up!' : 'remaining'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {isRunning ? (
          <>
            <button
              onClick={onPause}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-md"
            >
              ⏸ Pause
            </button>
            <button
              onClick={onStop}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                darkMode
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⏹ Stop & Save
            </button>
          </>
        ) : remainingSeconds < duration * 60 ? (
          <>
            <button
              onClick={onResume}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-md"
            >
              ▶ Resume
            </button>
            <button
              onClick={onStop}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                darkMode
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⏹ Stop & Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowDurationPicker(true)}
            className={`w-full px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
              darkMode
                ? 'bg-slate-700 text-purple-300 hover:bg-slate-600 border border-purple-500/30'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            ⏱ Set Duration ({duration}m)
          </button>
        )}

        {isTimeUp && (
          <div className="flex gap-2">
            <button
              onClick={() => onExtend(5)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-all text-sm"
            >
              +5 min
            </button>
            <button
              onClick={() => onExtend(10)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-all text-sm"
            >
              +10 min
            </button>
            <button
              onClick={() => onExtend(15)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-all text-sm"
            >
              +15 min
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div
        className={`mt-4 text-center text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {isRunning ? (
          <>You've been focusing for {Math.floor((duration * 60 - remainingSeconds) / 60)}m</>
        ) : remainingSeconds < duration * 60 ? (
          <>Paused at {Math.floor((duration * 60 - remainingSeconds) / 60)}m</>
        ) : (
          <>Ready to focus for {duration} minutes</>
        )}
      </div>
    </div>
  );
};
