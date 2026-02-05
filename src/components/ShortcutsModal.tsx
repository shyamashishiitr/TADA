interface ShortcutsModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

export const ShortcutsModal = ({ onClose, darkMode = false }: ShortcutsModalProps) => {
  const shortcuts = [
    { keys: ['Cmd/Ctrl', 'K'], description: 'Quick add task' },
    { keys: ['↑', '↓'], description: 'Navigate tasks' },
    { keys: ['Enter'], description: 'Complete selected task' },
    { keys: ['Esc'], description: 'Close modals / Unfocus' },
    { keys: ['?'], description: 'Show this help' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div 
        className={`max-w-md w-full rounded-lg shadow-xl p-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            ⌨️ Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-all hover:scale-110 ${
              darkMode 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <span className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd 
                    key={keyIndex}
                    className={`px-2 py-1 text-xs font-mono rounded border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-6 pt-4 border-t text-center text-sm ${
          darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
        }`}>
          Press <kbd className={`px-2 py-0.5 mx-1 text-xs font-mono rounded border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200' 
              : 'bg-gray-100 border-gray-300 text-gray-700'
          }`}>Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};
