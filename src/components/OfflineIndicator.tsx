import { useState, useEffect } from 'react';

interface OfflineIndicatorProps {
  darkMode?: boolean;
}

export const OfflineIndicator = ({ darkMode = false }: OfflineIndicatorProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        py-2 px-4 text-center text-sm font-medium
        animate-[slideDown_0.3s_ease-out]
        ${darkMode
          ? 'bg-orange-900/90 text-orange-200 border-b border-orange-700'
          : 'bg-orange-100 text-orange-800 border-b border-orange-300'
        }
      `}
      style={{
        paddingTop: 'calc(0.5rem + env(safe-area-inset-top))',
      }}
    >
      <span className="mr-2">📴</span>
      You're offline. Changes will sync when you're back online.
    </div>
  );
};
