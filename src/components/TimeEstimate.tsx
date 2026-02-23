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
      return `Nailed it! Right on target 🎯`;
    }
    if (ratio < 0.9) {
      return `You estimated ${estimatedMinutes}m, took ${actualMinutes}m — even faster! ⚡`;
    }
    if (ratio > 1.1 && ratio < 1.5) {
      return `Took ${Math.abs(diff)}m longer than expected, but that's okay 👍`;
    }
    return `This one took more time. Next time try ${Math.ceil(actualMinutes * 1.1)}m 💡`;
  };

  if (showPicker) {
    return (
      <div
        className={`p-4 rounded-xl space-y-3 ${
          darkMode
            ? 'bg-slate-900/60 border border-slate-700'
            : 'bg-white border border-gray-200'
        }`}
      >
        <p
          className={`text-sm font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          How long will this take?
        </p>
        <div className="grid grid-cols-5 gap-2">
          {quickOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSetEstimate(option.value);
                setShowPicker(false);
              }}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 ${
                estimatedMinutes === option.value
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : darkMode
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="480"
            placeholder="Custom (minutes)"
            className={`flex-1 px-3 py-2 border-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
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
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
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

  const accuracyMessage = getAccuracyMessage();

  if (compact) {
    return (
      <button
        onClick={() => setShowPicker(true)}
        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
          estimatedMinutes
            ? darkMode
              ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
            : darkMode
            ? 'bg-slate-700 text-gray-400 border border-slate-600'
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}
        title={estimatedMinutes ? `Estimated: ${formatTime(estimatedMinutes)}` : 'Set time estimate'}
      >
        ⏱ {estimatedMinutes ? formatTime(estimatedMinutes) : 'Add time'}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      {estimatedMinutes ? (
        <div
          className={`flex items-center justify-between p-3 rounded-xl ${
            darkMode
              ? 'bg-slate-900/60 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱</span>
            <div>
              <div
                className={`font-semibold text-sm ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                Estimated: {formatTime(estimatedMinutes)}
              </div>
              {actualMinutes && (
                <div
                  className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Actual: {formatTime(actualMinutes)}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowPicker(true)}
            className={`text-sm font-medium transition-colors ${
              darkMode
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            Edit
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowPicker(true)}
          className={`w-full px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 border-2 border-dashed ${
            darkMode
              ? 'bg-slate-900/40 text-purple-300 border-purple-700 hover:bg-slate-900/60'
              : 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100'
          }`}
        >
          <span className="mr-2">⏱</span>
          How long will this take?
        </button>
      )}

      {accuracyMessage && (
        <div
          className={`p-3 rounded-xl text-sm ${
            darkMode
              ? 'bg-green-900/30 text-green-300 border border-green-700'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          {accuracyMessage}
        </div>
      )}
    </div>
  );
};
