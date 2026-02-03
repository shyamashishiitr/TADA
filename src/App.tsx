import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';
import { TaskCategory } from './types';

function App() {
  const { tasks, addTask, deleteTask, toggleComplete, updateTask } = useTasks();
  const [filter, setFilter] = useState<TaskCategory | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredTasks = tasks.filter((task) => {
    if (!showCompleted && task.completed) return false;
    if (filter === 'all') return true;
    return task.category === filter;
  });

  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TADA ✨
          </h1>
          <p className="text-gray-600">Get Shit Done, Geshido Style</p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {activeTasks} active
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {completedTasks} completed
            </span>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔥 Today
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📅 This Week
          </button>
          <button
            onClick={() => setFilter('inbox')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'inbox'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📥 Inbox
          </button>
          <button
            onClick={() => setFilter('someday')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'someday'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            💭 Someday
          </button>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="ml-auto px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {showCompleted ? '👁️ Hide' : '👁️ Show'} Completed
          </button>
        </div>

        {/* Add Task */}
        <div className="mb-6">
          <AddTask onAdd={addTask} />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">🎉 No tasks here!</p>
              <p className="text-sm mt-2">
                {filter === 'all'
                  ? 'Add your first task to get started.'
                  : `No tasks in ${filter}.`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleComplete}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
