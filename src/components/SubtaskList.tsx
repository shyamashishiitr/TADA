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
    <div className="space-y-3">
      {/* Progress bar */}
      {totalCount > 0 && !showOnlyNext && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span
            className={`text-sm font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {completedCount}/{totalCount}
          </span>
        </div>
      )}

      {/* Subtasks */}
      <div className="space-y-2">
        {displaySubtasks.map((subtask) => (
          <div
            key={subtask.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              subtask.completed
                ? darkMode
                  ? 'bg-slate-900/40 opacity-60'
                  : 'bg-gray-50 opacity-60'
                : darkMode
                ? 'bg-slate-900/60 border border-slate-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => onToggle(subtask.id)}
              className={`w-5 h-5 rounded border-2 cursor-pointer transition-all hover:scale-110 ${
                darkMode
                  ? 'border-purple-500 text-purple-600 focus:ring-purple-500'
                  : 'border-purple-400 text-purple-600 focus:ring-purple-500'
              }`}
            />
            <span
              className={`flex-1 text-sm ${
                subtask.completed
                  ? darkMode
                    ? 'line-through text-gray-500'
                    : 'line-through text-gray-400'
                  : darkMode
                  ? 'text-gray-200'
                  : 'text-gray-900'
              }`}
            >
              {showOnlyNext && nextIncompleteIndex >= 0 && (
                <span className="inline-block mr-2 text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 rounded">
                  Step {nextIncompleteIndex + 1}/{totalCount}
                </span>
              )}
              {subtask.title}
            </span>
            {onDelete && !subtask.completed && (
              <button
                onClick={() => onDelete(subtask.id)}
                className={`p-1 rounded transition-all hover:scale-110 ${
                  darkMode
                    ? 'text-gray-600 hover:text-red-400'
                    : 'text-gray-400 hover:text-red-600'
                }`}
                aria-label="Delete subtask"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Show remaining count in ADHD mode */}
      {showOnlyNext && nextIncompleteIndex >= 0 && totalCount > nextIncompleteIndex + 1 && (
        <p
          className={`text-sm text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {totalCount - nextIncompleteIndex - 1} more micro-step{totalCount - nextIncompleteIndex - 1 !== 1 ? 's' : ''} after this
        </p>
      )}

      {/* Add subtask */}
      {onAdd && !showOnlyNext && (
        <div>
          {isAdding ? (
            <div className="flex gap-2">
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
                placeholder="New step..."
                className={`flex-1 px-3 py-2 border-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  darkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                autoFocus
              />
              <button
                onClick={handleAdd}
                className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-sm hover:scale-105 transition-all"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewSubtaskTitle('');
                }}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className={`text-sm font-medium transition-colors ${
                darkMode
                  ? 'text-purple-400 hover:text-purple-300'
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              + Add step
            </button>
          )}
        </div>
      )}
    </div>
  );
};
