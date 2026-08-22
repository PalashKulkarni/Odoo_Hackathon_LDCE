import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/* =========================================================
   Toast — lightweight global feedback per UI_UX_BLUEPRINT §5.
   Bottom-right on desktop · top-center on mobile (clear of nav).
   ========================================================= */

type ToastVariant = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  variant: ToastVariant;
  message: string;
  description?: string;
  leaving?: boolean;
}

interface ToastApi {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const AUTO_DISMISS_MS = 4200;
const EXIT_MS = 220;

const variantIcon: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle2 size={18} className="text-success shrink-0" />,
  error: <AlertCircle size={18} className="text-error shrink-0" />,
  info: <Info size={18} className="text-accent-600 shrink-0" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const remove = useCallback((id: number) => {
    // Trigger exit animation, then unmount
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      timers.current.delete(id);
    }, EXIT_MS);
    timers.current.set(id, timer);
  }, []);

  const push = useCallback(
    (variant: ToastVariant, message: string, description?: string) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev.slice(-3), { id, variant, message, description }]);
      const timer = setTimeout(() => remove(id), AUTO_DISMISS_MS);
      timers.current.set(id, timer);
    },
    [remove]
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (m, d) => push('success', m, d),
      error: (m, d) => push('error', m, d),
      info: (m, d) => push('info', m, d),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Viewport */}
      <div
        aria-live="polite"
        className={[
          'fixed z-[80] pointer-events-none flex flex-col gap-2 items-center',
          'top-4 inset-x-4',            // mobile — clear of bottom nav
          'sm:items-end sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-6',
        ].join(' ')}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.variant === 'error' ? 'alert' : 'status'}
            className={[
              'pointer-events-auto w-full sm:w-[360px]',
              'bg-surface border border-border-default rounded-radius-md shadow-hover',
              'flex items-start gap-3 px-4 py-3.5',
              t.leaving ? 'toast-exit' : 'toast-enter',
            ].join(' ')}
          >
            {variantIcon[t.variant]}
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-semibold text-ink leading-snug">{t.message}</p>
              {t.description && (
                <p className="text-[13px] text-ink-secondary mt-0.5 leading-snug">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => remove(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 -mr-1 -mt-0.5 w-7 h-7 rounded-radius-sm flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-muted transition-colors cursor-pointer border-none bg-transparent focus-ring"
              style={{ transitionDuration: 'var(--duration-micro)' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
