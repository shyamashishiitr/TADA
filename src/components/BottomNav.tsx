import { memo } from 'react';
import type { ReactElement } from 'react';
import type { TaskCategory } from '../types';

interface BottomNavProps {
  filter: TaskCategory | 'all';
  onFilterChange: (filter: TaskCategory | 'all') => void;
  isADHDMode: boolean;
  onToggleADHDMode: () => void;
  darkMode?: boolean;
}

const navItems: {
  id: 'inbox' | 'today' | 'week' | 'someday' | 'adhd';
  label: string;
  icon: (active: boolean) => ReactElement;
}[] = [
  {
    id: 'inbox',
    label: 'Inbox',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={active ? "1.8" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10l2.5-5h7L14 10" />
        <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3H10.5l-1 1.5h-3L5.5 10H2z" />
      </svg>
    ),
  },
  {
    id: 'today',
    label: 'Today',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={active ? "1.8" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 4v4l2.5 1.5" />
      </svg>
    ),
  },
  {
    id: 'week',
    label: 'Week',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={active ? "1.8" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="12" height="11" rx="1.5" />
        <path d="M2 6.5h12M5 2v2M11 2v2" />
      </svg>
    ),
  },
  {
    id: 'someday',
    label: 'Someday',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={active ? "1.8" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13c0-3.5 2-5 5-5s5 1.5 5 5" />
        <circle cx="8" cy="5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'adhd',
    label: 'Focus',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={active ? "1.8" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <circle cx="8" cy="8" r="2" />
        <path d="M8 2v1M8 13v1M2 8h1M13 8h1" />
      </svg>
    ),
  },
];

export const BottomNav = memo(({
  filter,
  onFilterChange,
  isADHDMode,
  onToggleADHDMode,
  darkMode = false,
}: BottomNavProps) => {
  const handleClick = (id: typeof navItems[number]['id']) => {
    if (id === 'adhd') {
      onToggleADHDMode();
    } else {
      onFilterChange(id);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex justify-around items-center px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = item.id === 'adhd'
            ? isADHDMode
            : filter === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-md transition-all duration-150 min-w-[44px] min-h-[44px] active:scale-95"
              style={{
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'transparent',
              }}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon(isActive)}
              <span
                className="text-[10px] font-medium leading-none"
                style={{
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';
