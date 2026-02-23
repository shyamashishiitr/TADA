import type { TaskCategory } from '../types';

interface BottomNavProps {
  filter: TaskCategory | 'all';
  onFilterChange: (filter: TaskCategory | 'all') => void;
  isADHDMode: boolean;
  onToggleADHDMode: () => void;
  darkMode?: boolean;
}

export const BottomNav = ({
  filter,
  onFilterChange,
  isADHDMode,
  onToggleADHDMode,
  darkMode = false,
}: BottomNavProps) => {
  const navItems = [
    { id: 'inbox' as const, emoji: '📥', label: 'Inbox' },
    { id: 'today' as const, emoji: '🔥', label: 'Today' },
    { id: 'week' as const, emoji: '📅', label: 'Week' },
    { id: 'someday' as const, emoji: '💭', label: 'Someday' },
    { id: 'adhd' as const, emoji: '⚡', label: 'ADHD' },
  ];

  const handleClick = (id: typeof navItems[number]['id']) => {
    if (id === 'adhd') {
      onToggleADHDMode();
    } else {
      onFilterChange(id);
    }
  };

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-40 md:hidden
        border-t backdrop-blur-xl
        ${darkMode 
          ? 'bg-slate-900/95 border-slate-700/50' 
          : 'bg-white/95 border-gray-200'
        }
      `}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = item.id === 'adhd' 
            ? isADHDMode 
            : filter === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1 
                px-3 py-2 rounded-xl transition-all min-w-[44px] min-h-[44px]
                active:scale-95
                ${isActive
                  ? darkMode
                    ? 'bg-purple-900/50 text-purple-300'
                    : 'bg-purple-100 text-purple-700'
                  : darkMode
                  ? 'text-gray-400 active:bg-slate-800'
                  : 'text-gray-600 active:bg-gray-100'
                }
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className={`text-[10px] font-medium leading-none ${
                isActive ? 'font-semibold' : ''
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
