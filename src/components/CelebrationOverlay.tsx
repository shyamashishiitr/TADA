import type { CelebrationType } from '../types';

interface CelebrationOverlayProps {
  message: string;
  type?: CelebrationType;
  darkMode?: boolean;
}

export const CelebrationOverlay = ({ message, type = 'task', darkMode = false }: CelebrationOverlayProps) => {
  const confettiCount = type === 'bigwin' ? 40 : type === 'subtask' ? 10 : 20;
  const emojis = type === 'bigwin' 
    ? ['🎊', '🏆', '👑', '⭐', '💫', '🌟', '✨', '🎉']
    : type === 'streak'
    ? ['🔥', '⚡', '💪', '🚀', '⭐', '💫']
    : type === 'subtask'
    ? ['✅', '✨', '💫']
    : ['🎉', '✨', '🌟', '⭐', '💫', '🎊', '🎈'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Confetti emojis */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(confettiCount)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${type === 'bigwin' ? 'text-5xl' : 'text-4xl'} animate-[fadeIn_0.5s_ease-out]`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fadeIn 0.5s ease-out ${Math.random() * 0.3}s, slideDown ${type === 'bigwin' ? 3 : 2}s ease-in ${Math.random() * 0.3}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </div>
        ))}
      </div>

      {/* Message */}
      <div
        className={`
          px-8 py-6 rounded-3xl shadow-2xl pointer-events-auto
          transform transition-all duration-500 animate-[checkBounce_0.5s_ease-out]
          ${type === 'bigwin' ? 'scale-110' : ''}
          ${
            darkMode
              ? 'bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl border-2 border-purple-500/50'
              : 'bg-gradient-to-br from-purple-50/95 to-pink-50/95 backdrop-blur-xl border-2 border-purple-300'
          }
        `}
      >
        <p
          className={`${type === 'bigwin' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-bold text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};
