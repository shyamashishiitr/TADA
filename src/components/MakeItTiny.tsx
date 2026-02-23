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
  
  // Pattern matching for common task types
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
  
  // Generic fallback - break into smaller pieces
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
    
    // Simulate AI "thinking" time
    setTimeout(() => {
      const subtasks = generateSubtasks(taskTitle);
      onGenerate(subtasks);
      setIsGenerating(false);
    }, 1200); // 1.2 seconds for realism
  };

  if (isGenerating) {
    return (
      <div
        className={`px-4 py-3 rounded-xl font-medium transition-all ${
          darkMode
            ? 'bg-purple-900/30 text-purple-300 border border-purple-700 animate-pulse'
            : 'bg-purple-50 text-purple-700 border border-purple-300 animate-pulse'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Breaking it down...</span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleGenerate}
      className={`px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 shadow-sm ${
        darkMode
          ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 border border-purple-700'
          : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
      }`}
      title="Break this task into smaller steps"
    >
      <span className="mr-2">🪄</span>
      Make it Tiny
    </button>
  );
};
