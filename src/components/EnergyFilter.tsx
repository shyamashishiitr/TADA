import type { EnergyLevel } from '../types';

interface EnergyFilterProps {
  energyFilter: EnergyLevel | null;
  onSelect: (level: EnergyLevel) => void;
  onClear: () => void;
  darkMode?: boolean;
}

export const EnergyFilter = ({ energyFilter, onSelect, onClear, darkMode = false }: EnergyFilterProps) => {
  const energyLevels: { level: EnergyLevel; label: string; color: string }[] = [
    { level: 'high', label: 'High', color: 'var(--color-success)' },
    { level: 'medium', label: 'Medium', color: 'var(--color-warning)' },
    { level: 'low', label: 'Low', color: 'var(--color-cat-week)' },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span
        className="text-xs font-medium"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Energy:
      </span>
      {energyLevels.map(({ level, label, color }) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
          style={{
            backgroundColor: energyFilter === level
              ? 'var(--color-surface-active)'
              : 'var(--color-surface)',
            color: energyFilter === level
              ? 'var(--color-text-primary)'
              : 'var(--color-text-muted)',
            border: `1px solid ${energyFilter === level ? 'var(--color-border-hover)' : 'var(--color-border)'}`,
          }}
          onMouseEnter={(e) => {
            if (energyFilter !== level) {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (energyFilter !== level) {
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            }
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          {label}
        </button>
      ))}
      {energyFilter && (
        <button
          onClick={onClear}
          className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
          style={{
            color: 'var(--color-text-muted)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};
