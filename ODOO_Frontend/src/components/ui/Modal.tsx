import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthStyles = {
  sm: 'max-w-[440px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[640px]',
};

/**
 * Modal dialog per UI_UX_BLUEPRINT §5.
 * Width 440–640px · Max height 85vh · Radius 20px · Backdrop rgba(28,27,25,0.4)
 * Full dialog semantics: role="dialog", aria-modal, labelled/described by
 * header text, Tab-trapped focus, initial focus inside, Escape + backdrop
 * dismissal, body scroll lock with restore.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        [
          'a[href]',
          'button:not([disabled])',
          'textarea:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(',')
      );

      const focusable = Array.from(focusableElements);

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fade-in fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={[
          'rise flex w-full flex-col overflow-hidden rounded-radius-xl',
          'border border-border-default bg-surface shadow-modal outline-none',
          'max-h-[calc(100dvh-2rem)] sm:max-h-[85dvh]',
          maxWidthStyles[maxWidth],
        ].join(' ')}
      >
        {(title || description) && (
          <div className="flex shrink-0 items-start justify-between gap-5 border-b border-border-default px-6 pb-5 pt-6">
            <div className="min-w-0">
              {title && (
                <h2 id={titleId} className="text-h3 font-display leading-snug text-ink">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="mt-1.5 max-w-md text-body-sm text-ink-secondary">
                  {description}
                </p>
              )}
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-radius-md border border-transparent bg-transparent text-ink-muted transition-colors hover:border-border-soft hover:bg-surface-muted hover:text-ink focus-ring"
              style={{ transitionDuration: 'var(--duration-micro)' }}
            >
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
