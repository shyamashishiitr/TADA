import { useState, memo } from 'react';
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

const priorityDotColors: Record<TaskPriority, string> = {
  high: 'var(--color-danger)',
  medium: 'var(--color-warning)',
  low: 'var(--color-success)',
};

const categoryLabels: Record<TaskCategory, string> = {
  inbox: 'Inbox',
  today: 'Today',
  week: 'Week',
  someday: 'Someday',
};

const priorityLabels: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const TaskItem = memo(({ 
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
  const [isHovered, setIsHovered] = useState(false);

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
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border-hover)',
          animation: 'fadeInScale 0.2s ease-out',
        }}
      >
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 rounded-md text-sm font-medium focus:outline-none mb-3"
          style={{
            backgroundColor: 'var(--color-surface-hover)',
            border: '1px solid var(--color-border-hover)',
            color: 'var(--color-text-primary)',
          }}
          autoFocus
        />
        <div className="flex gap-2 flex-wrap mb-3">
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as TaskCategory)}
            className="px-3 py-1.5 rounded-md text-xs font-medium focus:outline-none"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <option value="inbox">Inbox</option>
            <option value="today">Today</option>
            <option value="week">Week</option>
            <option value="someday">Someday</option>
          </select>
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
            className="px-3 py-1.5 rounded-md text-xs font-medium focus:outline-none"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-3 py-1.5 rounded-md text-xs font-medium focus:outline-none"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditTitle(task.title);
              setIsEditing(false);
            }}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-150 cursor-default"
      style={{
        backgroundColor: isSelected
          ? 'var(--color-accent-subtle)'
          : isHovered
          ? 'var(--color-surface-hover)'
          : 'transparent',
        borderLeft: '2px solid',
        borderLeftColor: task.completed
          ? 'transparent'
          : priorityDotColors[task.priority],
        opacity: task.completed ? 0.5 : 1,
        animation: 'fadeIn 0.2s ease-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="tada-checkbox mt-0.5"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {/* Priority dot */}
          {!task.completed && (
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: priorityDotColors[task.priority] }}
            />
          )}
          {/* Title */}
          <span
            className={`text-sm font-medium transition-all duration-200 ${
              task.completed ? 'line-through' : ''
            }`}
            style={{
              color: task.completed
                ? 'var(--color-text-muted)'
                : 'var(--color-text-primary)',
              cursor: task.completed ? 'default' : 'text',
            }}
            onDoubleClick={() => !task.completed && setIsEditing(true)}
          >
            {task.title}
          </span>
        </div>

        {task.description && (
          <p
            className="text-xs mt-1 pl-3.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {task.description}
          </p>
        )}

        {/* Metadata line */}
        <div className="flex items-center gap-2 mt-1 pl-3.5 flex-wrap">
          <span
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {categoryLabels[task.category]}
          </span>
          <span
            className="text-xs"
            style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
          >
            ·
          </span>
          <span
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {priorityLabels[task.priority]}
          </span>
          {task.dueDate && (
            <>
              <span
                className="text-xs"
                style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
              >
                ·
              </span>
              <span
                className="text-xs"
                style={{
                  color: isOverdue
                    ? 'var(--color-danger)'
                    : isDueToday
                    ? 'var(--color-cat-today)'
                    : 'var(--color-text-muted)',
                }}
              >
                {isOverdue
                  ? 'Overdue'
                  : isDueToday
                  ? 'Due today'
                  : new Date(task.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
              </span>
            </>
          )}
          {task.energyLevel && (
            <>
              <span
                className="text-xs"
                style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
              >
                ·
              </span>
              <span
                className="text-xs capitalize"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {task.energyLevel} energy
              </span>
            </>
          )}
          {task.estimatedMinutes && (
            <>
              <span
                className="text-xs"
                style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
              >
                ·
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                ~{task.estimatedMinutes}m
              </span>
            </>
          )}
        </div>

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && onToggleSubtask && (
          <div className="mt-3 pl-3.5">
            <SubtaskList
              subtasks={task.subtasks}
              onToggle={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
              onAdd={onAddSubtask ? (title) => onAddSubtask(task.id, title) : undefined}
              onDelete={onDeleteSubtask ? (subtaskId) => onDeleteSubtask(task.id, subtaskId) : undefined}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Action buttons — visible on hover */}
        {!task.completed && (
          <div
            className="flex gap-1 mt-2 pl-3.5 transition-opacity duration-150"
            style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            {(!task.subtasks || task.subtasks.length === 0) && (
              <MakeItTiny
                taskTitle={task.title}
                onGenerate={handleGenerateSubtasks}
                darkMode={darkMode}
              />
            )}
            <TimeEstimate
              estimatedMinutes={task.estimatedMinutes}
              actualMinutes={task.actualMinutes}
              onSetEstimate={handleSetEstimate}
              darkMode={darkMode}
              compact
            />
          </div>
        )}
      </div>

      {/* Delete button — visible on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="p-1 rounded-md transition-all duration-150"
        style={{
          opacity: isHovered ? 1 : 0,
          color: 'var(--color-text-muted)',
          pointerEvents: isHovered ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-danger)';
          e.currentTarget.style.backgroundColor = 'var(--color-danger-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-text-muted)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label="Delete task"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4l-.7 8.5a1 1 0 01-1 .9H5.7a1 1 0 01-1-.9L4 4M6.5 7v4M9.5 7v4M2.5 4h11M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4" />
        </svg>
      </button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
