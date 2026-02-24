import { useState } from 'react';
import type { SubTask } from '../types';

interface MakeItTinyProps {
  taskTitle: string;
  onGenerate: (subtasks: SubTask[]) => void;
  darkMode?: boolean;
}

// Smart heuristic task breakdown - simulates AI
const generateSubtasks = (title: string): SubTask[] => {
  const lower = title.toLowerCase();
  
  if (lower.includes('write') || lower.includes('blog') || lower.includes('article') || lower.includes('essay')) {
    return [
      { id: crypto.randomUUID(), title: 'Choose topic and angle', completed: false },
      { id: crypto.randomUUID(), title: 'Research and gather sources', completed: false },
      { id: crypto.randomUUID(), title: 'Create outline with main points', completed: false },
      { id: crypto.randomUUID(), title: 'Write first draft', completed: false },
      { id: crypto.randomUUID(), title: 'Edit and revise', completed: false },
    ];
  }
  
  if (lower.includes('clean') || lower.includes('tidy')) {
    const room = lower.includes('kitchen') ? 'kitchen' :
                 lower.includes('bathroom') ? 'bathroom' :
                 lower.includes('bedroom') ? 'bedroom' :
                 lower.includes('living') ? 'living room' :
                 'room';
    
    return [
      { id: crypto.randomUUID(), title: `Pick up items from ${room} floor`, completed: false },
      { id: crypto.randomUUID(), title: 'Put things back where they belong', completed: false },
      { id: crypto.randomUUID(), title: 'Wipe down surfaces', completed: false },
      { id: crypto.randomUUID(), title: 'Vacuum or sweep floor', completed: false },
      { id: crypto.randomUUID(), title: 'Take out any trash', completed: false },
    ];
  }
  
  if (lower.includes('laundry') || lower.includes('clothes') || lower.includes('wash')) {
    return [
      { id: crypto.randomUUID(), title: 'Gather dirty laundry', completed: false },
      { id: crypto.randomUUID(), title: 'Sort into loads (colors, whites)', completed: false },
      { id: crypto.randomUUID(), title: 'Start first load in washer', completed: false },
      { id: crypto.randomUUID(), title: 'Transfer to dryer or hang', completed: false },
      { id: crypto.randomUUID(), title: 'Fold and put away', completed: false },
    ];
  }
  
  if (lower.includes('email') || lower.includes('respond') || lower.includes('reply')) {
    return [
      { id: crypto.randomUUID(), title: 'Read the full email carefully', completed: false },
      { id: crypto.randomUUID(), title: 'Identify key questions to answer', completed: false },
      { id: crypto.randomUUID(), title: 'Draft response in your own words', completed: false },
      { id: crypto.randomUUID(), title: 'Proofread for clarity and tone', completed: false },
      { id: crypto.randomUUID(), title: 'Send the email', completed: false },
    ];
  }
  
  if (lower.includes('meeting') || lower.includes('call') || lower.includes('interview')) {
    return [
      { id: crypto.randomUUID(), title: 'Review agenda or talking points', completed: false },
      { id: crypto.randomUUID(), title: 'Prepare any materials needed', completed: false },
      { id: crypto.randomUUID(), title: 'Test tech (camera, mic, connection)', completed: false },
      { id: crypto.randomUUID(), title: 'Join 2 minutes early', completed: false },
    ];
  }
  
  if (lower.includes('grocery') || lower.includes('shopping') || lower.includes('groceries')) {
    return [
      { id: crypto.randomUUID(), title: 'Check what you have at home', completed: false },
      { id: crypto.randomUUID(), title: 'Make a shopping list', completed: false },
      { id: crypto.randomUUID(), title: 'Go to the store', completed: false },
      { id: crypto.randomUUID(), title: 'Get items on your list', completed: false },
      { id: crypto.randomUUID(), title: 'Check out and bring home', completed: false },
    ];
  }
  
  if (lower.includes('exercise') || lower.includes('workout') || lower.includes('gym')) {
    return [
      { id: crypto.randomUUID(), title: 'Change into workout clothes', completed: false },
      { id: crypto.randomUUID(), title: 'Do 5-minute warm-up', completed: false },
      { id: crypto.randomUUID(), title: 'Complete main workout', completed: false },
      { id: crypto.randomUUID(), title: 'Cool down and stretch', completed: false },
    ];
  }
  
  if (lower.includes('cook') || lower.includes('meal') || lower.includes('dinner')) {
    return [
      { id: crypto.randomUUID(), title: 'Choose recipe or meal idea', completed: false },
      { id: crypto.randomUUID(), title: 'Gather all ingredients', completed: false },
      { id: crypto.randomUUID(), title: 'Prep ingredients (chop, measure)', completed: false },
      { id: crypto.randomUUID(), title: 'Cook following recipe steps', completed: false },
      { id: crypto.randomUUID(), title: 'Plate and enjoy', completed: false },
    ];
  }
  
  if (lower.includes('study') || lower.includes('learn') || lower.includes('review')) {
    return [
      { id: crypto.randomUUID(), title: 'Gather all study materials', completed: false },
      { id: crypto.randomUUID(), title: 'Review notes or chapter summary', completed: false },
      { id: crypto.randomUUID(), title: 'Test yourself on key concepts', completed: false },
      { id: crypto.randomUUID(), title: 'Make flashcards or study guide', completed: false },
    ];
  }
  
  if (lower.includes('project') || lower.includes('plan') || lower.includes('organize')) {
    return [
      { id: crypto.randomUUID(), title: 'Define the goal or outcome', completed: false },
      { id: crypto.randomUUID(), title: 'List all tasks needed', completed: false },
      { id: crypto.randomUUID(), title: 'Order tasks by priority', completed: false },
      { id: crypto.randomUUID(), title: 'Schedule when to do each', completed: false },
    ];
  }
  
  // Generic fallback
  const words = title.split(' ');
  if (words.length <= 3) {
    return [
      { id: crypto.randomUUID(), title: `Start ${title.toLowerCase()}`, completed: false },
      { id: crypto.randomUUID(), title: `Continue ${title.toLowerCase()}`, completed: false },
      { id: crypto.randomUUID(), title: `Finish ${title.toLowerCase()}`, completed: false },
    ];
  }
  
  return [
    { id: crypto.randomUUID(), title: 'Gather everything you need', completed: false },
    { id: crypto.randomUUID(), title: `Do the first part of ${title.toLowerCase()}`, completed: false },
    { id: crypto.randomUUID(), title: `Complete the middle steps`, completed: false },
    { id: crypto.randomUUID(), title: `Finish and wrap up`, completed: false },
  ];
};

export const MakeItTiny = ({ taskTitle, onGenerate, darkMode = false }: MakeItTinyProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const subtasks = generateSubtasks(taskTitle);
      onGenerate(subtasks);
      setIsGenerating(false);
    }, 1200);
  };

  if (isGenerating) {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium"
        style={{
          backgroundColor: 'var(--color-accent-subtle)',
          color: 'var(--color-accent)',
          animation: 'pulse-subtle 1.5s ease-in-out infinite',
        }}
      >
        <div
          className="w-3 h-3 border-[1.5px] border-current rounded-full"
          style={{
            borderTopColor: 'transparent',
            animation: 'spin 0.6s linear infinite',
          }}
        />
        <span>Breaking it down…</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleGenerate}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
      style={{
        backgroundColor: 'var(--color-surface-hover)',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
        e.currentTarget.style.color = 'var(--color-accent)';
        e.currentTarget.style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
        e.currentTarget.style.color = 'var(--color-text-muted)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
      title="Break this task into smaller steps"
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h12M2 8h8M2 12h5" />
      </svg>
      Make it Tiny
    </button>
  );
};
