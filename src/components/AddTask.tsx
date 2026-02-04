import { useState } from 'react';
import type { TaskCategory, TaskPriority } from '../types';

interface AddTaskProps {
  onAdd: (title: string, category: TaskCategory, priority: TaskPriority) => void;
  darkMode?: boolean;
}

export const AddTask = ({ onAdd, darkMode = false }: AddTaskProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('inbox');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isOpen, setIsOpen] = useState(false);

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
        className={`w-full p-4 rounded-lg shadow-sm border-2 border-dashed transition-all hover:scale-[1.01] ${
          darkMode
            ? 'bg-gray-800 border-gray-600 hover:border-blue-500 text-gray-400 hover:text-blue-400'
            : 'bg-white border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600'
        }`}
      >
        + Add New Task
      </button>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`p-4 rounded-lg shadow-sm animate-[slideDown_0.2s_ease-out] ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
        autoFocus
      />
      <div className="flex gap-2 mt-3 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          className={`flex-1 min-w-[120px] px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
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
          className={`flex-1 min-w-[120px] px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all hover:scale-105"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={`px-4 py-2 rounded-md transition-all hover:scale-105 ${
            darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
