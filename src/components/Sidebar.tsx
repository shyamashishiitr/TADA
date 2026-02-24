import type { ReactElement } from 'react';
import type { TaskCategory, Task } from '../types';

interface SidebarProps {
  filter: TaskCategory | 'all';
  onFilterChange: (filter: TaskCategory | 'all') => void;
  showCompleted: boolean;
  onToggleShowCompleted: () => void;
  isADHDMode: boolean;
  onToggleADHDMode: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onShowShortcuts: () => void;
  tasks: Task[];
}

const navItems: { id: TaskCategory | 'all'; label: string; icon: ReactElement }[] = [
  {
    id: 'all',
    label: 'All Tasks',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="12" height="12" rx="2" />
        <path d="M2 6h12M6 6v8" />
      </svg>
    ),
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10l2.5-5h7L14 10" />
        <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3H10.5l-1 1.5h-3L5.5 10H2z" />
      </svg>
    ),
  },
  {
    id: 'today',
    label: 'Today',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 4v4l2.5 1.5" />
      </svg>
    ),
  },
  {
    id: 'week',
    label: 'This Week',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="12" height="11" rx="1.5" />
        <path d="M2 6.5h12M5 2v2M11 2v2" />
      </svg>
    ),
  },
  {
    id: 'someday',
    label: 'Someday',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13c0-3.5 2-5 5-5s5 1.5 5 5" />
        <circle cx="8" cy="5" r="2.5" />
      </svg>
    ),
  },
];

const categoryColors: Record<string, string> = {
  all: 'var(--color-accent)',
  inbox: 'var(--color-cat-inbox)',
  today: 'var(--color-cat-today)',
  week: 'var(--color-cat-week)',
  someday: 'var(--color-cat-someday)',
};

export const Sidebar = ({
  filter,
  onFilterChange,
  showCompleted,
  onToggleShowCompleted,
  isADHDMode,
  onToggleADHDMode,
  darkMode,
  onToggleDarkMode,
  onShowShortcuts,
  tasks,
}: SidebarProps) => {
  const getCount = (category: TaskCategory | 'all') => {
    if (category === 'all') return tasks.filter((t) => !t.completed).length;
    return tasks.filter((t) => t.category === category && !t.completed).length;
  };

  return (
    <aside
      className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-30"
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          TADA
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = filter === item.id && !isADHDMode;
          const count = getCount(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-150 group"
              style={{
                backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                color: isActive ? categoryColors[item.id] : 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span
                className="flex-shrink-0 transition-colors duration-150"
                style={{ color: isActive ? categoryColors[item.id] : 'var(--color-text-muted)' }}
              >
                {item.icon}
              </span>
              <span
                className="flex-1 text-sm font-medium"
                style={{ color: isActive ? 'var(--color-text-primary)' : undefined }}
              >
                {item.label}
              </span>
              {count > 0 && (
                <span
                  className="text-xs font-medium tabular-nums"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="my-3" style={{ borderTop: '1px solid var(--color-border)' }} />

        {/* Show/Hide Completed */}
        <button
          onClick={onToggleShowCompleted}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-150"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span style={{ color: 'var(--color-text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {showCompleted ? (
                <>
                  <path d="M2 8c1.5-3 3.5-5 6-5s4.5 2 6 5c-1.5 3-3.5 5-6 5s-4.5-2-6-5z" />
                  <circle cx="8" cy="8" r="2" />
                </>
              ) : (
                <>
                  <path d="M2 2l12 12" />
                  <path d="M6.5 6.5a2 2 0 002.8 2.8" />
                  <path d="M3.5 5.5C2.5 6.5 2 8 2 8c1.5 3 3.5 5 6 5 1 0 2-.3 2.8-.8" />
                  <path d="M10.7 5C11.5 5.5 12.2 6.4 14 8c-1.5 3-3.5 5-6 5" />
                </>
              )}
            </svg>
          </span>
          <span className="text-sm font-medium">
            {showCompleted ? 'Hide Completed' : 'Show Completed'}
          </span>
        </button>

        {/* ADHD Mode */}
        <button
          onClick={onToggleADHDMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-150"
          style={{
            backgroundColor: isADHDMode ? 'var(--color-accent-subtle)' : 'transparent',
            color: isADHDMode ? 'var(--color-accent)' : 'var(--color-text-secondary)',
          }}
          onMouseEnter={(e) => {
            if (!isADHDMode) {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isADHDMode) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ color: isADHDMode ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6" />
              <circle cx="8" cy="8" r="2" />
              <path d="M8 2v1M8 13v1M2 8h1M13 8h1" />
            </svg>
          </span>
          <span className="text-sm font-medium">Focus Mode</span>
        </button>
      </nav>

      {/* Bottom actions */}
      <div
        className="px-3 py-3 flex items-center gap-1"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-md transition-all duration-150"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1M8 13.5v1M2.75 2.75l.7.7M12.55 12.55l.7.7M1.5 8h1M13.5 8h1M2.75 13.25l.7-.7M12.55 3.45l.7-.7" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 8.5a5.5 5.5 0 01-6-6 5.5 5.5 0 106 6z" />
            </svg>
          )}
        </button>
        <button
          onClick={onShowShortcuts}
          className="p-2 rounded-md transition-all duration-150"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
          aria-label="Keyboard shortcuts"
          title="Keyboard shortcuts (?)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1.5" y="4" width="13" height="8" rx="1.5" />
            <path d="M4.5 7h1M7.5 7h1M10.5 7h1M5.5 9.5h5" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
