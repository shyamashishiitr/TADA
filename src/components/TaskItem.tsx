import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  darkMode?: boolean;
}

const priorityColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500',
};

export const TaskItem = ({ task, onToggle, onDelete, darkMode = false }: TaskItemProps) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-sm border-l-4 transition-all duration-300 hover:shadow-md ${
        priorityColors[task.priority]
      } ${
        task.completed 
          ? darkMode
            ? 'opacity-50 bg-gray-800' 
            : 'opacity-60 bg-white'
          : darkMode
            ? 'bg-gray-800'
            : 'bg-white'
      } ${
        task.completed ? 'animate-[fadeIn_0.3s_ease-in]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-transform hover:scale-110 ${
            task.completed ? 'animate-[checkBounce_0.3s_ease-in-out]' : ''
          }`}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium transition-all duration-300 ${
              task.completed 
                ? darkMode
                  ? 'line-through text-gray-500'
                  : 'line-through text-gray-500'
                : darkMode
                  ? 'text-gray-100'
                  : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {task.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className={`transition-all hover:scale-110 ${
            darkMode 
              ? 'text-gray-500 hover:text-red-400' 
              : 'text-gray-400 hover:text-red-600'
          }`}
          aria-label="Delete task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
