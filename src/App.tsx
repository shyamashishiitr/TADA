import { useState, useEffect, useRef } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';
import { ShortcutsModal } from './components/ShortcutsModal';
import type { TaskCategory } from './types';

function App() {
  const { tasks, addTask, deleteTask, toggleComplete, updateTask } = useTasks();
  const [filter, setFilter] = useState<TaskCategory | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [quickAddFocused, setQuickAddFocused] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const addTaskRef = useRef<{ focusInput: () => void }>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredTasks = tasks.filter((task) => {
    if (!showCompleted && task.completed) return false;
    if (filter === 'all') return true;
    return task.category === filter;
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K for quick add
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        addTaskRef.current?.focusInput();
        setQuickAddFocused(true);
      }
      
      // ? for shortcuts help
      if (e.key === '?' && !quickAddFocused) {
        e.preventDefault();
        setShowShortcuts(true);
      }
      
      // Escape to close modals or unfocus
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setQuickAddFocused(false);
      }

      // Arrow keys for navigation (when not in input)
      if (!quickAddFocused && !showShortcuts) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedTaskIndex((prev) => 
            Math.min(prev + 1, filteredTasks.length - 1)
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedTaskIndex((prev) => Math.max(prev - 1, 0));
        }
        
        // Enter to complete selected task
        if (e.key === 'Enter' && filteredTasks[selectedTaskIndex]) {
          e.preventDefault();
          toggleComplete(filteredTasks[selectedTaskIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickAddFocused, showShortcuts, selectedTaskIndex, filteredTasks, toggleComplete]);

  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className={`text-3xl sm:text-4xl font-bold transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              TADA ✨
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowShortcuts(true)}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Keyboard shortcuts"
                title="Keyboard shortcuts (?)"
              >
                ⌨️
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <p className={`transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Get Shit Done, Geshido Style
          </p>
          <div className="flex gap-4 mt-4 text-sm flex-wrap">
            <span className={`px-3 py-1 rounded-full transition-colors ${
              darkMode 
                ? 'bg-blue-900 text-blue-300' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {activeTasks} active
            </span>
            <span className={`px-3 py-1 rounded-full transition-colors ${
              darkMode 
                ? 'bg-green-900 text-green-300' 
                : 'bg-green-100 text-green-700'
            }`}>
              {completedTasks} completed
            </span>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
              filter === 'all'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-3 py-2 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
              filter === 'today'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔥 Today
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-3 py-2 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
              filter === 'week'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📅 Week
          </button>
          <button
            onClick={() => setFilter('inbox')}
            className={`px-3 py-2 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
              filter === 'inbox'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📥 Inbox
          </button>
          <button
            onClick={() => setFilter('someday')}
            className={`px-3 py-2 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
              filter === 'someday'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            💭 Someday
          </button>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`ml-auto px-3 py-2 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
              darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {showCompleted ? '👁️ Hide' : '👁️ Show'} Completed
          </button>
        </div>

        {/* Add Task */}
        <div className="mb-6">
          <AddTask 
            ref={addTaskRef}
            onAdd={addTask} 
            darkMode={darkMode}
            onFocus={() => setQuickAddFocused(true)}
            onBlur={() => setQuickAddFocused(false)}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className={`text-center py-12 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white/50 text-gray-500'
            }`}>
              <p className="text-lg">🎉 No tasks here!</p>
              <p className="text-sm mt-2">
                {filter === 'all'
                  ? 'Add your first task to get started.'
                  : `No tasks in ${filter}.`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleComplete}
                onDelete={deleteTask}
                onUpdate={updateTask}
                darkMode={darkMode}
                isSelected={index === selectedTaskIndex}
              />
            ))
          )}
        </div>

        {/* Shortcuts Modal */}
        {showShortcuts && (
          <ShortcutsModal 
            onClose={() => setShowShortcuts(false)} 
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;
