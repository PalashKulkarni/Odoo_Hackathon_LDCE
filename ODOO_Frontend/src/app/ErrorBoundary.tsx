import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Root ErrorBoundary — a render crash should never show a blank page.
 * Branded recovery UI consistent with NotFoundPage.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[GlobeTrotter] Unhandled render error:', error, info.componentStack);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4 text-center rise">
        <div className="w-16 h-16 rounded-full border border-border-default bg-surface flex items-center justify-center mb-8">
          <span className="w-8 h-8 rounded-radius-md bg-accent-600 text-white flex items-center justify-center font-display">
            !
          </span>
        </div>

        <span className="text-label text-accent-600 tracking-[0.22em] mb-4">Unexpected detour</span>
        <h1 className="font-display text-ink leading-tight max-w-lg" style={{ fontSize: 'clamp(34px, 5vw, 54px)' }}>
          Something went off the map<span className="text-accent-600">.</span>
        </h1>
        <p className="text-body-lg text-ink-secondary mt-4 mb-10 max-w-md leading-relaxed">
          An unexpected error interrupted this view. Your saved journeys are safe.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="h-[52px] px-7 rounded-radius-md bg-accent-600 text-white font-semibold text-[15px] cursor-pointer border-none shadow-[0_1px_2px_rgba(28,27,25,0.14)] hover:bg-accent-500 transition-colors focus-ring"
          >
            Reload GlobeTrotter
          </button>
          <a
            href="/dashboard"
            className="inline-flex items-center h-[52px] px-5 rounded-radius-md bg-surface border border-border-default text-ink text-body-sm font-semibold no-underline hover:border-border-strong transition-colors focus-ring"
          >
            Back to dashboard
          </a>
        </div>
      </div>
    );
  }
}
