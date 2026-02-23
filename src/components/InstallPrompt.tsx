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
    // Check if already dismissed
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (dismissed) return;

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Track visits
    const visits = parseInt(localStorage.getItem('visit-count') || '0', 10);
    localStorage.setItem('visit-count', (visits + 1).toString());

    // Show after 2+ visits or 30+ seconds
    const showAfterTime = setTimeout(() => {
      if (visits >= 1) {
        setShowPrompt(true);
      }
    }, 30000); // 30 seconds

    if (visits >= 2) {
      setShowPrompt(true);
    }

    // Capture the beforeinstallprompt event
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
      // For iOS/Safari - show instructions
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
      className={`
        fixed bottom-20 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:max-w-sm
        p-4 rounded-2xl shadow-2xl z-50
        animate-[slideDown_0.3s_ease-out]
        ${darkMode
          ? 'bg-gradient-to-br from-purple-900/95 to-slate-900/95 backdrop-blur-xl border border-purple-500/30'
          : 'bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-xl border border-purple-200'
        }
      `}
    >
      <button
        onClick={handleDismiss}
        className={`
          absolute top-2 right-2 p-1 rounded-lg transition-all hover:scale-110
          ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}
        `}
        aria-label="Dismiss"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">✨</span>
        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Add TADA to your home screen
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get instant access and work offline
          </p>
        </div>
      </div>

      <button
        onClick={handleInstallClick}
        className="
          w-full py-3 px-4 rounded-xl font-semibold text-white
          bg-gradient-to-r from-purple-600 to-blue-600
          hover:from-purple-700 hover:to-blue-700
          active:scale-95 transition-all shadow-md
        "
      >
        Install App
      </button>
    </div>
  );
};
