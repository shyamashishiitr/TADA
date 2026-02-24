import { memo } from 'react';
import type { CelebrationType } from '../types';

interface CelebrationOverlayProps {
  message: string;
  type?: CelebrationType;
  darkMode?: boolean;
}

const confettiColors = [
  'var(--color-accent)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-cat-today)',
  'var(--color-cat-week)',
  'var(--color-cat-someday)',
];

export const CelebrationOverlay = memo(({ message, type = 'task', darkMode = false }: CelebrationOverlayProps) => {
  const confettiCount = type === 'bigwin' ? 30 : type === 'subtask' ? 8 : 16;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Confetti particles — colored dots instead of emojis */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(confettiCount)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${-5 + Math.random() * 10}%`,
              backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              opacity: 0.8,
              animation: `confettiFall ${2 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards`,
            }}
          />
        ))}
      </div>

      {/* Message card */}
      <div
        className="px-6 py-4 rounded-lg pointer-events-auto"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'fadeInScale 0.3s ease-out',
        }}
      >
        <p
          className={`${type === 'bigwin' ? 'text-xl' : 'text-base'} font-semibold text-center`}
          style={{
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {type === 'bigwin' && '✓ '}
          {message}
        </p>
        {type === 'bigwin' && (
          <p
            className="text-xs text-center mt-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            All daily tasks complete
          </p>
        )}
      </div>
    </div>
  );
});

CelebrationOverlay.displayName = 'CelebrationOverlay';
