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

  const getStrokeColor = () => {
    const percentRemaining = (remainingSeconds / (duration * 60)) * 100;
    if (percentRemaining > 50) return 'var(--color-success)';
    if (percentRemaining > 25) return 'var(--color-warning)';
    return 'var(--color-cat-today)';
  };

  const quickDurations = [5, 10, 15, 25, 45];

  if (showDurationPicker && !isRunning) {
    return (
      <div
        className="p-5 rounded-md"
        style={{
          backgroundColor: 'var(--color-surface-hover)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3
          className="text-sm font-medium mb-3 text-center"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Focus duration
        </h3>
        <div className="flex gap-2 justify-center mb-3">
          {quickDurations.map((mins) => (
            <button
              key={mins}
              onClick={() => {
                onSetDuration(mins);
                setShowDurationPicker(false);
              }}
              className="px-3 py-2 rounded-md text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: duration === mins
                  ? 'var(--color-accent)'
                  : 'var(--color-surface)',
                color: duration === mins
                  ? '#fff'
                  : 'var(--color-text-secondary)',
                border: `1px solid ${duration === mins ? 'var(--color-accent)' : 'var(--color-border)'}`,
              }}
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
            className="flex-1 px-3 py-1.5 rounded-md text-xs focus:outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
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
            className="px-3 py-1.5 rounded-md text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-5 rounded-md"
      style={{
        backgroundColor: 'var(--color-surface-hover)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Circular Progress */}
      <div className="flex justify-center mb-5">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke="var(--color-border)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke={getStrokeColor()}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 72}`}
              strokeDashoffset={`${2 * Math.PI * 72 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-3xl font-semibold tabular-nums"
              style={{
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {formatTime(remainingSeconds)}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: isTimeUp ? 'var(--color-success)' : 'var(--color-text-muted)' }}
            >
              {isTimeUp ? "Time's up" : 'remaining'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-2">
        {isRunning ? (
          <>
            <button
              onClick={onPause}
              className="w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-warning)',
                color: '#000',
              }}
            >
              Pause
            </button>
            <button
              onClick={onStop}
              className="w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              Stop & Save
            </button>
          </>
        ) : remainingSeconds < duration * 60 ? (
          <>
            <button
              onClick={onResume}
              className="w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-success)',
                color: '#fff',
              }}
            >
              Resume
            </button>
            <button
              onClick={onStop}
              className="w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              Stop & Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowDurationPicker(true)}
            className="w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            Set Duration ({duration}m)
          </button>
        )}

        {isTimeUp && (
          <div className="flex gap-2">
            {[5, 10, 15].map((mins) => (
              <button
                key={mins}
                onClick={() => onExtend(mins)}
                className="flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150"
                style={{
                  backgroundColor: 'var(--color-accent-subtle)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
              >
                +{mins}m
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      <div
        className="mt-3 text-center text-xs"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {isRunning ? (
          <>Focusing for {Math.floor((duration * 60 - remainingSeconds) / 60)}m</>
        ) : remainingSeconds < duration * 60 ? (
          <>Paused at {Math.floor((duration * 60 - remainingSeconds) / 60)}m</>
        ) : (
          <>Ready to focus for {duration} minutes</>
        )}
      </div>
    </div>
  );
};
