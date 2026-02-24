interface ShortcutsModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

export const ShortcutsModal = ({ onClose, darkMode = false }: ShortcutsModalProps) => {
  const shortcuts = [
    { keys: ['⌘', 'K'], description: 'Quick add task' },
    { keys: ['↑', '↓'], description: 'Navigate tasks' },
    { keys: ['Enter'], description: 'Complete selected task' },
    { keys: ['Esc'], description: 'Close modals / Unfocus' },
    { keys: ['?'], description: 'Show this help' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={onClose}
    >
      <div 
        className="max-w-sm w-full rounded-lg p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'fadeInScale 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-base font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md transition-all duration-150"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-1">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 px-2 rounded-md"
              style={{
                backgroundColor: index % 2 === 0 ? 'var(--color-surface-hover)' : 'transparent',
              }}
            >
              <span
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd 
                    key={keyIndex}
                    className="px-1.5 py-0.5 text-[11px] font-mono rounded"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                      boxShadow: 'var(--shadow-xs)',
                    }}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-4 pt-3 text-center text-xs"
          style={{
            borderTop: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
        >
          Press <kbd
            className="px-1.5 py-0.5 mx-0.5 text-[10px] font-mono rounded"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
            }}
          >Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};
