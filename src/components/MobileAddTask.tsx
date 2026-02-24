import { useState, useRef } from 'react';
import type { TaskCategory, TaskPriority } from '../types';

interface MobileAddTaskProps {
  onAdd: (title: string, category: TaskCategory, priority: TaskPriority) => void;
  darkMode?: boolean;
}

export const MobileAddTask = ({ onAdd, darkMode = false }: MobileAddTaskProps) => {
  const [title, setTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState<TaskCategory>('inbox');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, category, priority);
    setTitle('');
    setCategory('inbox');
    setPriority('medium');
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setTitle('');
    setIsExpanded(false);
  };

  const categories: { value: TaskCategory; label: string }[] = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Week' },
    { value: 'someday', label: 'Someday' },
  ];

  const priorities: { value: TaskPriority; label: string; color: string }[] = [
    { value: 'high', label: 'High', color: 'var(--color-danger)' },
    { value: 'medium', label: 'Med', color: 'var(--color-warning)' },
    { value: 'low', label: 'Low', color: 'var(--color-success)' },
  ];

  return (
    <div
      className="fixed left-0 right-0 z-30 md:hidden"
      style={{
        bottom: isExpanded ? '0' : '64px',
        paddingBottom: isExpanded ? 'env(safe-area-inset-bottom)' : '0',
        transition: 'bottom 0.2s ease',
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <form onSubmit={handleSubmit} className="p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
            placeholder="Add a task…"
            className="flex-1 px-3 py-2.5 rounded-md text-sm font-medium focus:outline-none min-h-[44px]"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          />
          {title.trim() && (
            <button
              type="submit"
              className="px-3 py-2.5 rounded-md font-medium text-white min-w-[44px] min-h-[44px] active:scale-95 transition-all duration-150"
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-label="Add task"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 3L6 10l-3-3" />
              </svg>
            </button>
          )}
        </div>

        {/* Expanded options */}
        {isExpanded && (
          <div
            className="mt-2 space-y-2"
            style={{ animation: 'slideUp 0.15s ease-out' }}
          >
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 min-h-[44px]"
                  style={{
                    backgroundColor: category === cat.value ? 'var(--color-accent-subtle)' : 'var(--color-surface-hover)',
                    color: category === cat.value ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    border: `1px solid ${category === cat.value ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }}
                >
                  {cat.label}
                </button>
              ))}

              <span className="self-center text-xs" style={{ color: 'var(--color-border-hover)' }}>|</span>

              {priorities.map((pri) => (
                <button
                  key={pri.value}
                  type="button"
                  onClick={() => setPriority(pri.value)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 min-h-[44px]"
                  style={{
                    backgroundColor: priority === pri.value ? 'var(--color-surface-active)' : 'var(--color-surface-hover)',
                    color: priority === pri.value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    border: `1px solid ${priority === pri.value ? 'var(--color-border-hover)' : 'var(--color-border)'}`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: pri.color }}
                  />
                  {pri.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 rounded-md text-xs font-medium transition-all active:scale-95 min-h-[44px]"
              style={{
                backgroundColor: 'var(--color-surface-hover)',
                color: 'var(--color-text-muted)',
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
