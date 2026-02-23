import { useState } from 'react';
import type { Task, TaskCategory, TaskPriority, SubTask } from '../types';
import { MakeItTiny } from './MakeItTiny';
import { SubtaskList } from './SubtaskList';
import { TimeEstimate } from './TimeEstimate';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onToggleSubtask?: (taskId: string, subtaskId: string) => void;
  onAddSubtask?: (taskId: string, title: string) => void;
  onDeleteSubtask?: (taskId: string, subtaskId: string) => void;
  onSetSubtasks?: (taskId: string, subtasks: SubTask[]) => void;
  darkMode?: boolean;
  isSelected?: boolean;
}

const priorityColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500',
};

const categoryEmojis: Record<TaskCategory, string> = {
  inbox: '📥',
  today: '🔥',
  week: '📅',
  someday: '💭',
};

const priorityLabels: Record<TaskPriority, { emoji: string; label: string }> = {
  high: { emoji: '🔴', label: 'High' },
  medium: { emoji: '🟡', label: 'Medium' },
  low: { emoji: '🟢', label: 'Low' },
};

export const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdate, 
  onToggleSubtask,
  onAddSubtask,
  onDeleteSubtask,
  onSetSubtasks,
  darkMode = false, 
  isSelected = false 
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, {
      title: editTitle.trim(),
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditTitle(task.title);
      setEditCategory(task.category);
      setEditPriority(task.priority);
      setEditDueDate(task.dueDate || '');
      setIsEditing(false);
    }
  };

  const handleGenerateSubtasks = (subtasks: SubTask[]) => {
    if (onSetSubtasks) {
      onSetSubtasks(task.id, subtasks);
    }
  };

  const handleSetEstimate = (minutes: number) => {
    onUpdate(task.id, { estimatedMinutes: minutes });
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString());
  const isDueToday = task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString();

  if (isEditing) {
    return (
      <div className={`p-5 sm:p-6 rounded-2xl border-l-4 shadow-lg transition-all ${priorityColors[editPriority]} ${
        darkMode ? 'bg-slate-800/80 backdrop-blur border-slate-700/50' : 'bg-white/90 backdrop-blur border-gray-100'
      }`}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full px-3 py-2 border-2 rounded-xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-3 ${
            darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
          autoFocus
        />
        <div className="flex gap-2 flex-wrap mb-3">
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as TaskCategory)}
            className={`px-3 py-2 border-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="inbox">📥 Inbox</option>
            <option value="today">🔥 Today</option>
            <option value="week">📅 Week</option>
            <option value="someday">💭 Someday</option>
          </select>
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
            className={`px-3 py-2 border-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className={`px-3 py-2 border-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium text-sm hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditTitle(task.title);
              setIsEditing(false);
            }}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all hover:scale-105 ${
              darkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

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
          }`}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base sm:text-lg transition-all duration-300 cursor-pointer ${
              task.completed 
                ? darkMode
                  ? 'line-through text-gray-500'
                  : 'line-through text-gray-400'
                : darkMode
                  ? 'text-gray-100'
                  : 'text-gray-900'
            }`}
            onDoubleClick={() => !task.completed && setIsEditing(true)}
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
          
          <div className="flex gap-2 mt-3 flex-wrap items-center">
            <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-slate-700/50 text-purple-300 border border-slate-600' 
                : 'bg-purple-50 text-purple-700 border border-purple-200'
            }`}>
              {categoryEmojis[task.category]} {task.category}
            </span>
            <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              task.priority === 'high' ? (darkMode ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-50 text-red-700 border border-red-200') :
              task.priority === 'medium' ? (darkMode ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' : 'bg-yellow-50 text-yellow-700 border border-yellow-200') :
              (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-700 border border-green-200')
            }`}>
              {priorityLabels[task.priority].emoji} {priorityLabels[task.priority].label}
            </span>
            {task.dueDate && (
              <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
                isOverdue
                  ? (darkMode ? 'bg-red-900/50 text-red-300 border border-red-600 animate-pulse' : 'bg-red-100 text-red-700 border border-red-300 animate-pulse')
                  : isDueToday
                  ? (darkMode ? 'bg-orange-900/30 text-orange-300 border border-orange-700' : 'bg-orange-50 text-orange-700 border border-orange-200')
                  : (darkMode ? 'bg-slate-700/50 text-gray-300 border border-slate-600' : 'bg-gray-50 text-gray-700 border border-gray-200')
              }`}>
                📆 {isOverdue ? 'Overdue: ' : isDueToday ? 'Today' : ''}{!isDueToday ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
              </span>
            )}
            {task.energyLevel && (
              <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
                task.energyLevel === 'high' ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-700 border border-green-200') :
                task.energyLevel === 'medium' ? (darkMode ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' : 'bg-yellow-50 text-yellow-700 border border-yellow-200') :
                (darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-50 text-blue-700 border border-blue-200')
              }`}>
                {task.energyLevel === 'high' && '🔋'}
                {task.energyLevel === 'medium' && '⚡'}
                {task.energyLevel === 'low' && '🪫'}
                {' '}{task.energyLevel}
              </span>
            )}
          </div>

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && onToggleSubtask && (
            <div className="mt-4">
              <SubtaskList
                subtasks={task.subtasks}
                onToggle={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
                onAdd={onAddSubtask ? (title) => onAddSubtask(task.id, title) : undefined}
                onDelete={onDeleteSubtask ? (subtaskId) => onDeleteSubtask(task.id, subtaskId) : undefined}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* Action buttons */}
          {!task.completed && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {!task.subtasks || task.subtasks.length === 0 ? (
                <MakeItTiny
                  taskTitle={task.title}
                  onGenerate={handleGenerateSubtasks}
                  darkMode={darkMode}
                />
              ) : null}
              
              <TimeEstimate
                estimatedMinutes={task.estimatedMinutes}
                actualMinutes={task.actualMinutes}
                onSetEstimate={handleSetEstimate}
                darkMode={darkMode}
                compact
              />
            </div>
          )}

          {!task.completed && (
            <p className={`text-xs mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Double-click title to edit
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
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
