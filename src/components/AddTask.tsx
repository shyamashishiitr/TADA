import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import type { TaskCategory, TaskPriority } from '../types';

interface AddTaskProps {
  onAdd: (title: string, category: TaskCategory, priority: TaskPriority) => void;
  darkMode?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const AddTask = forwardRef<{ focusInput: () => void }, AddTaskProps>(
  ({ onAdd, darkMode = false, onFocus, onBlur }, ref) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('inbox');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      setIsOpen(true);
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
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-dashed transition-all hover:scale-[1.02] group ${
          darkMode
            ? 'bg-slate-800/80 backdrop-blur border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-purple-200'
            : 'bg-white/90 backdrop-blur border-purple-200 hover:border-purple-400 text-purple-600 hover:text-purple-700'
        }`}
      >
        <span className="text-lg sm:text-xl font-semibold flex items-center justify-center gap-2">
          <span className="text-2xl group-hover:scale-110 transition-transform">+</span>
          Add New Task
        </span>
        <span className={`text-xs sm:text-sm mt-2 block ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
          Press Cmd+K for quick add
        </span>
      </button>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`p-5 sm:p-6 rounded-2xl shadow-lg animate-[slideDown_0.2s_ease-out] ${
        darkMode ? 'bg-slate-800/80 backdrop-blur border border-slate-700' : 'bg-white/90 backdrop-blur border border-gray-200'
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="What needs to be done?"
        className={`w-full px-4 py-3 sm:py-4 border-2 rounded-xl text-base sm:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
          darkMode
            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
        }`}
        autoFocus
      />
      <div className="flex gap-3 mt-4 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          className={`flex-1 min-w-[140px] px-4 py-3 border-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium ${
            darkMode
              ? 'bg-slate-700 border-slate-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="inbox">📥 Inbox</option>
          <option value="today">🔥 Today</option>
          <option value="week">📅 Week</option>
          <option value="someday">💭 Someday</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className={`flex-1 min-w-[140px] px-4 py-3 border-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium ${
            darkMode
              ? 'bg-slate-700 border-slate-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105 shadow-lg"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
            darkMode
              ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
});
