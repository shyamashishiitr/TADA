import { useState } from 'react';
import { TaskCategory, TaskPriority } from '../types';

interface AddTaskProps {
  onAdd: (title: string, category: TaskCategory, priority: TaskPriority) => void;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
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
        className="w-full p-4 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 transition-colors"
      >
        + Add New Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <div className="flex gap-2 mt-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="inbox">📥 Inbox</option>
          <option value="today">🔥 Today</option>
          <option value="week">📅 This Week</option>
          <option value="someday">💭 Someday</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
