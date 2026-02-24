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
      className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-center text-xs font-medium"
      style={{
        paddingTop: 'calc(0.5rem + env(safe-area-inset-top))',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-warning)',
        animation: 'slideDown 0.2s ease-out',
      }}
    >
      <span className="flex items-center justify-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--color-warning)' }}
        />
        Offline — changes will sync when you're back
      </span>
    </div>
  );
};
