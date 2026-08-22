import { forwardRef, type InputHTMLAttributes } from 'react';

/**
 * Input — UI_UX_BLUEPRINT §5.
 * Height: 48px · Surface bg · Border Default · Radius 12px · Focus: accent ring.
 */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-[14px] font-semibold text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'h-12 px-3.5 text-[15px] text-ink',
            'bg-surface border rounded-radius-md',
            'shadow-[inset_0_1px_2px_rgba(28,27,25,0.04)]',
            'outline-none transition-all placeholder:text-ink-disabled',
            error
              ? 'border-error focus-ring-error'
              : 'border-border-default hover:border-border-strong focus:border-accent-600 focus-ring',
            props.disabled ? 'opacity-45 cursor-not-allowed' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ transitionDuration: 'var(--duration-micro)' }}
          {...props}
        />
        {error && <p className="text-[13px] text-error">{error}</p>}
        {!error && helperText && <p className="text-[13px] text-ink-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
