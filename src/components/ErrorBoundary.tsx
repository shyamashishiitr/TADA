import { Component, type ReactNode, type ErrorInfo } from 'react';
import { resetAllData } from '../lib/migrations';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Top-level error boundary.
 *
 * Catches unhandled render errors so the whole app doesn't white-screen.
 * Offers a "Reload" button and an emergency "Reset all data" escape hatch
 * for corrupted localStorage.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Structured log — ready to be replaced with an error-reporting service
    // (e.g. Sentry, LogRocket) by adding a single call here.
    console.error('[TADA ErrorBoundary]', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleResetData = () => {
    if (
      window.confirm(
        'This will delete ALL your tasks and settings. This cannot be undone. Continue?',
      )
    ) {
      resetAllData();
      this.setState({ hasError: false, error: null });
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Oops, something broke!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Don't worry — your tasks are safely stored in your browser.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105 shadow-lg"
            >
              Reload TADA
            </button>
            <div className="mt-4">
              <button
                onClick={this.handleResetData}
                className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline transition-colors"
              >
                Reset all data (last resort)
              </button>
            </div>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer">
                  Technical details
                </summary>
                <pre className="mt-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg overflow-auto max-h-32">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
