import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import type { TaskCategory, TaskPriority } from '../types';

interface AddTaskProps {
  onAdd: (title: string, category: TaskCategory, priority: TaskPriority) => void;
  darkMode?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const categories: { value: TaskCategory; label: string }[] = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'someday', label: 'Someday' },
];

const priorities: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'high', label: 'High', color: 'var(--color-danger)' },
  { value: 'medium', label: 'Medium', color: 'var(--color-warning)' },
  { value: 'low', label: 'Low', color: 'var(--color-success)' },
];

export const AddTask = forwardRef<{ focusInput: () => void }, AddTaskProps>(
  ({ onAdd, darkMode = false, onFocus, onBlur }, ref) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('inbox');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      setIsFocused(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, category, priority);
    setTitle('');
    setCategory('inbox');
    setPriority('medium');
    // Keep focused for rapid entry
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && title.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    // Delay to allow clicking pills
    setTimeout(() => {
      if (!document.activeElement?.closest('.add-task-container')) {
        setIsFocused(false);
        onBlur?.();
      }
    }, 150);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-task-container rounded-lg transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: `1px solid ${isFocused ? 'var(--color-border-hover)' : 'var(--color-border)'}`,
        boxShadow: isFocused ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      }}
    >
      <div className="flex items-center px-3 py-2.5">
        {/* Search/add icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 mr-2.5"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <line x1="8" y1="4" x2="8" y2="12" />
          <line x1="4" y1="8" x2="12" y2="8" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Add a task…"
          className="flex-1 bg-transparent text-sm font-medium placeholder-current focus:outline-none"
          style={{
            color: 'var(--color-text-primary)',
          }}
        />

        {/* Shortcut hint */}
        {!isFocused && (
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            ⌘K
          </kbd>
        )}
      </div>

      {/* Expanded options */}
      {isFocused && (
        <div
          className="px-3 pb-2.5 flex items-center gap-1.5 flex-wrap"
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '8px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          {/* Category pills */}
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className="px-2 py-1 rounded-md text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: category === cat.value
                  ? 'var(--color-accent-subtle)'
                  : 'transparent',
                color: category === cat.value
                  ? 'var(--color-accent)'
                  : 'var(--color-text-muted)',
                border: `1px solid ${
                  category === cat.value
                    ? 'var(--color-accent)'
                    : 'var(--color-border)'
                }`,
              }}
            >
              {cat.label}
            </button>
          ))}

          <span
            className="mx-1"
            style={{ color: 'var(--color-border)', fontSize: '12px' }}
          >
            |
          </span>

          {/* Priority pills */}
          {priorities.map((pri) => (
            <button
              key={pri.value}
              type="button"
              onClick={() => setPriority(pri.value)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: priority === pri.value
                  ? 'var(--color-surface-hover)'
                  : 'transparent',
                color: priority === pri.value
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-muted)',
                border: `1px solid ${
                  priority === pri.value
                    ? 'var(--color-border-hover)'
                    : 'var(--color-border)'
                }`,
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
      )}
    </form>
  );
});
