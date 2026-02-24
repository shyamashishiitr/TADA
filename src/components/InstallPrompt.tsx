import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptProps {
  darkMode?: boolean;
}

export const InstallPrompt = ({ darkMode = false }: InstallPromptProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (dismissed) return;

    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const visits = parseInt(localStorage.getItem('visit-count') || '0', 10);
    localStorage.setItem('visit-count', (visits + 1).toString());

    const showAfterTime = setTimeout(() => {
      if (visits >= 1) {
        setShowPrompt(true);
      }
    }, 30000);

    if (visits >= 2) {
      setShowPrompt(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearTimeout(showAfterTime);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install:\n\n1. Tap the Share button\n2. Tap "Add to Home Screen"\n3. Tap "Add"');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  if (!showPrompt && !deferredPrompt) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:max-w-xs z-50"
      style={{
        animation: 'slideUp 0.2s ease-out',
      }}
    >
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 p-1 rounded-md transition-all duration-150"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Dismiss"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-6 mb-3">
          <h3
            className="text-sm font-semibold mb-0.5"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Install TADA
          </h3>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Get instant access and work offline
          </p>
        </div>

        <button
          onClick={handleInstallClick}
          className="w-full py-2 px-3 rounded-md text-sm font-medium text-white active:scale-95 transition-all duration-150"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Install
        </button>
      </div>
    </div>
  );
};
