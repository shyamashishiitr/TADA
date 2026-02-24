import { useState } from 'react';
import type { SubTask } from '../types';

interface SubtaskListProps {
  subtasks: SubTask[];
  onToggle: (subtaskId: string) => void;
  onAdd?: (title: string) => void;
  onDelete?: (subtaskId: string) => void;
  showOnlyNext?: boolean; // For ADHD mode - show one at a time
  darkMode?: boolean;
}

export const SubtaskList = ({
  subtasks,
  onToggle,
  onAdd,
  onDelete,
  showOnlyNext = false,
  darkMode = false,
}: SubtaskListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const completedCount = subtasks.filter((st) => st.completed).length;
  const totalCount = subtasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAdd = () => {
    if (newSubtaskTitle.trim() && onAdd) {
      onAdd(newSubtaskTitle.trim());
      setNewSubtaskTitle('');
      setIsAdding(false);
    }
  };

  const nextIncompleteIndex = subtasks.findIndex((st) => !st.completed);
  const displaySubtasks = showOnlyNext && nextIncompleteIndex >= 0
    ? [subtasks[nextIncompleteIndex]]
    : subtasks;

  if (subtasks.length === 0 && !isAdding) {
    return null;
  }

  return (
    <div className="space-y-2">
      {/* Progress bar */}
      {totalCount > 0 && !showOnlyNext && (
        <div className="flex items-center gap-2">
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-border)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: 'var(--color-accent)',
              }}
            />
          </div>
          <span
            className="text-[11px] font-medium tabular-nums"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {completedCount}/{totalCount}
          </span>
        </div>
      )}

      {/* Subtasks */}
      <div className="space-y-0.5">
        {displaySubtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-2.5 py-1.5 px-2 rounded-md group transition-all duration-150"
            style={{
              backgroundColor: 'transparent',
              opacity: subtask.completed ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => onToggle(subtask.id)}
              className="tada-checkbox"
              style={{ width: '16px', height: '16px' }}
            />
            <span
              className={`flex-1 text-xs ${subtask.completed ? 'line-through' : ''}`}
              style={{
                color: subtask.completed
                  ? 'var(--color-text-muted)'
                  : 'var(--color-text-secondary)',
              }}
            >
              {showOnlyNext && nextIncompleteIndex >= 0 && (
                <span
                  className="inline-block mr-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--color-accent-subtle)',
                    color: 'var(--color-accent)',
                  }}
                >
                  Step {nextIncompleteIndex + 1}/{totalCount}
                </span>
              )}
              {subtask.title}
            </span>
            {onDelete && !subtask.completed && (
              <button
                onClick={() => onDelete(subtask.id)}
                className="p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-danger)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
                aria-label="Delete subtask"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Show remaining count in ADHD mode */}
      {showOnlyNext && nextIncompleteIndex >= 0 && totalCount > nextIncompleteIndex + 1 && (
        <p
          className="text-xs text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {totalCount - nextIncompleteIndex - 1} more step{totalCount - nextIncompleteIndex - 1 !== 1 ? 's' : ''} after this
        </p>
      )}

      {/* Add subtask */}
      {onAdd && !showOnlyNext && (
        <div>
          {isAdding ? (
            <div className="flex gap-1.5">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                  if (e.key === 'Escape') {
                    setIsAdding(false);
                    setNewSubtaskTitle('');
                  }
                }}
                placeholder="New step…"
                className="flex-1 px-2 py-1.5 rounded-md text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-surface-hover)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
                autoFocus
              />
              <button
                onClick={handleAdd}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium text-white"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewSubtaskTitle('');
                }}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: 'var(--color-surface-hover)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="text-xs font-medium transition-colors duration-150"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
            >
              + Add step
            </button>
          )}
        </div>
      )}
    </div>
  );
};
