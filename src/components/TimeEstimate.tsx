import { useState } from 'react';

interface TimeEstimateProps {
  estimatedMinutes?: number;
  actualMinutes?: number;
  onSetEstimate: (minutes: number) => void;
  darkMode?: boolean;
  compact?: boolean;
}

export const TimeEstimate = ({
  estimatedMinutes,
  actualMinutes,
  onSetEstimate,
  darkMode = false,
  compact = false,
}: TimeEstimateProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const quickOptions = [
    { label: '5m', value: 5 },
    { label: '15m', value: 15 },
    { label: '30m', value: 30 },
    { label: '1h', value: 60 },
    { label: '2h+', value: 120 },
  ];

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getAccuracyMessage = (): string | null => {
    if (!estimatedMinutes || !actualMinutes) return null;
    
    const ratio = actualMinutes / estimatedMinutes;
    const diff = actualMinutes - estimatedMinutes;
    
    if (ratio >= 0.9 && ratio <= 1.1) {
      return `Right on target — ${estimatedMinutes}m estimated, ${actualMinutes}m actual`;
    }
    if (ratio < 0.9) {
      return `Faster than expected — ${estimatedMinutes}m estimated, ${actualMinutes}m actual`;
    }
    if (ratio > 1.1 && ratio < 1.5) {
      return `Took ${Math.abs(diff)}m longer than expected`;
    }
    return `Consider estimating ${Math.ceil(actualMinutes * 1.1)}m next time`;
  };

  if (showPicker) {
    return (
      <div
        className="p-3 rounded-md space-y-2"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <p
          className="text-xs font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          How long will this take?
        </p>
        <div className="flex gap-1.5">
          {quickOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSetEstimate(option.value);
                setShowPicker(false);
              }}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: estimatedMinutes === option.value
                  ? 'var(--color-accent)'
                  : 'var(--color-surface-hover)',
                color: estimatedMinutes === option.value
                  ? '#fff'
                  : 'var(--color-text-secondary)',
                border: `1px solid ${estimatedMinutes === option.value ? 'var(--color-accent)' : 'var(--color-border)'}`,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input
            type="number"
            min="1"
            max="480"
            placeholder="Custom min"
            className="flex-1 px-2 py-1.5 rounded-md text-xs focus:outline-none"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.currentTarget.value);
                if (value > 0 && value <= 480) {
                  onSetEstimate(value);
                  setShowPicker(false);
                }
              }
            }}
          />
          <button
            onClick={() => setShowPicker(false)}
            className="px-2.5 py-1.5 rounded-md text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              color: 'var(--color-text-muted)',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const accuracyMessage = getAccuracyMessage();

  if (compact) {
    return (
      <button
        onClick={() => setShowPicker(true)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
        style={{
          backgroundColor: 'var(--color-surface-hover)',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-active)';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
          e.currentTarget.style.color = 'var(--color-text-muted)';
        }}
        title={estimatedMinutes ? `Estimated: ${formatTime(estimatedMinutes)}` : 'Set time estimate'}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 4v4l2.5 1.5" />
        </svg>
        {estimatedMinutes ? formatTime(estimatedMinutes) : 'Time'}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      {estimatedMinutes ? (
        <div
          className="flex items-center justify-between p-3 rounded-md"
          style={{
            backgroundColor: 'var(--color-surface-hover)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
              <circle cx="8" cy="8" r="6" />
              <path d="M8 4v4l2.5 1.5" />
            </svg>
            <div>
              <div
                className="text-xs font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Estimated: {formatTime(estimatedMinutes)}
              </div>
              {actualMinutes && (
                <div
                  className="text-[11px]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Actual: {formatTime(actualMinutes)}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowPicker(true)}
            className="text-xs font-medium transition-colors duration-150"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Edit
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowPicker(true)}
          className="w-full px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-150"
          style={{
            backgroundColor: 'var(--color-surface-hover)',
            color: 'var(--color-text-muted)',
            border: '1px dashed var(--color-border)',
          }}
        >
          Set time estimate
        </button>
      )}

      {accuracyMessage && (
        <div
          className="p-2.5 rounded-md text-xs"
          style={{
            backgroundColor: 'var(--color-accent-subtle)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {accuracyMessage}
        </div>
      )}
    </div>
  );
};
