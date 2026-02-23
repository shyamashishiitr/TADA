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

  return (
    <div
      className={`
        fixed left-0 right-0 z-30 md:hidden
        border-t backdrop-blur-xl shadow-lg
        ${darkMode 
          ? 'bg-slate-900/95 border-slate-700/50' 
          : 'bg-white/95 border-gray-200'
        }
      `}
      style={{
        bottom: isExpanded ? '0' : '64px', // 64px is the bottom nav height
        paddingBottom: isExpanded ? 'env(safe-area-inset-bottom)' : '0',
        transition: 'bottom 0.3s ease',
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
            placeholder="Add a task..."
            className={`
              flex-1 px-4 py-3 rounded-xl text-base font-medium
              focus:outline-none focus:ring-2 focus:ring-purple-500
              min-h-[44px]
              ${darkMode
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }
            `}
          />
          {title.trim() && (
            <button
              type="submit"
              className="
                px-4 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-purple-600 to-blue-600
                hover:from-purple-700 hover:to-blue-700
                active:scale-95 transition-all shadow-md
                min-w-[44px] min-h-[44px]
              "
              aria-label="Add task"
            >
              ✓
            </button>
          )}
        </div>

        {/* Expanded options */}
        {isExpanded && (
          <div className="mt-3 space-y-2 animate-[slideDown_0.2s_ease-out]">
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  min-h-[44px]
                  ${darkMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                `}
              >
                <option value="inbox">📥 Inbox</option>
                <option value="today">🔥 Today</option>
                <option value="week">📅 Week</option>
                <option value="someday">💭 Someday</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  min-h-[44px]
                  ${darkMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                `}
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className={`
                w-full py-2 rounded-lg text-sm font-medium
                transition-all active:scale-95
                min-h-[44px]
                ${darkMode
                  ? 'bg-slate-800 text-gray-400 active:bg-slate-700'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
                }
              `}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
