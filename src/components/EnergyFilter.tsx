import type { EnergyLevel } from '../types';

interface EnergyFilterProps {
  energyFilter: EnergyLevel | null;
  onSelect: (level: EnergyLevel) => void;
  onClear: () => void;
  darkMode?: boolean;
}

export const EnergyFilter = ({ energyFilter, onSelect, onClear, darkMode = false }: EnergyFilterProps) => {
  const energyLevels: { level: EnergyLevel; emoji: string; label: string; color: string }[] = [
    { level: 'high', emoji: '🔋', label: 'High Energy', color: 'from-green-500 to-emerald-600' },
    { level: 'medium', emoji: '⚡', label: 'Medium', color: 'from-yellow-500 to-orange-500' },
    { level: 'low', emoji: '🪫', label: 'Low Energy', color: 'from-blue-500 to-purple-500' },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        My energy right now:
      </span>
      {energyLevels.map(({ level, emoji, label, color }) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`
            px-4 py-3 rounded-xl font-medium text-sm transition-all hover:scale-105 shadow-md
            ${
              energyFilter === level
                ? `bg-gradient-to-r ${color} text-white shadow-lg`
                : darkMode
                ? 'bg-slate-800/80 backdrop-blur text-gray-300 hover:bg-slate-700/80 border border-slate-700'
                : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border border-gray-200'
            }
          `}
        >
          <span className="mr-2">{emoji}</span>
          {label}
        </button>
      ))}
      {energyFilter && (
        <button
          onClick={onClear}
          className={`
            px-4 py-3 rounded-xl font-medium text-sm transition-all hover:scale-105 shadow-md
            ${
              darkMode
                ? 'bg-slate-700/80 text-gray-400 hover:bg-slate-600/80 border border-slate-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
            }
          `}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};
