import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  darkMode?: boolean;
  isSelected?: boolean;
}

const priorityColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500',
};

export const TaskItem = ({ task, onToggle, onDelete, darkMode = false, isSelected = false }: TaskItemProps) => {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border-l-4 transition-all duration-300 hover:scale-[1.01] shadow-lg ${
        priorityColors[task.priority]
      } ${
        task.completed 
          ? darkMode
            ? 'opacity-40 bg-slate-800/40 backdrop-blur' 
            : 'opacity-50 bg-white/60 backdrop-blur'
          : darkMode
            ? 'bg-slate-800/80 backdrop-blur border-slate-700/50'
            : 'bg-white/90 backdrop-blur border-gray-100'
      } ${
        task.completed ? 'animate-[fadeIn_0.3s_ease-in]' : ''
      } ${
        isSelected ? (darkMode ? 'ring-2 ring-purple-500 shadow-purple-500/50' : 'ring-2 ring-purple-600 shadow-purple-600/30') : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className={`mt-1.5 w-6 h-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-110 ${
            darkMode 
              ? 'border-purple-500 text-purple-600 focus:ring-purple-500' 
              : 'border-purple-400 text-purple-600 focus:ring-purple-500'
          } ${
            task.completed ? 'animate-[checkBounce_0.3s_ease-in-out]' : ''
          }`}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base sm:text-lg transition-all duration-300 ${
              task.completed 
                ? darkMode
                  ? 'line-through text-gray-500'
                  : 'line-through text-gray-400'
                : darkMode
                  ? 'text-gray-100'
                  : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm sm:text-base mt-2 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-slate-700/50 text-purple-300 border border-slate-600' 
                : 'bg-purple-50 text-purple-700 border border-purple-200'
            }`}>
              {task.category}
            </span>
            <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              task.priority === 'high' ? (darkMode ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-50 text-red-700 border border-red-200') :
              task.priority === 'medium' ? (darkMode ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' : 'bg-yellow-50 text-yellow-700 border border-yellow-200') :
              (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-700 border border-green-200')
            }`}>
              {task.priority === 'high' ? '🔴 High' : task.priority === 'medium' ? '🟡 Medium' : '🟢 Low'}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className={`p-2 rounded-lg transition-all hover:scale-110 ${
            darkMode 
              ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20' 
              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
          }`}
          aria-label="Delete task"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
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
