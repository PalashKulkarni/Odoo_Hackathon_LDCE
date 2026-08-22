import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon — replaced by spinner while loading */
  icon?: ReactNode;
  /** Trailing icon */
  iconRight?: ReactNode;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent-600 text-white',
    'shadow-[0_1px_2px_rgba(28,27,25,0.14)]',
    'hover:bg-accent-500 hover:shadow-[0_4px_14px_rgba(194,101,58,0.28)]',
    'active:bg-accent-600 active:shadow-none',
  ].join(' '),
  secondary: [
    'bg-surface text-ink border border-border-default',
    'shadow-[0_1px_2px_rgba(28,27,25,0.06)]',
    'hover:border-border-strong hover:bg-surface-muted',
    'active:bg-surface-strong',
  ].join(' '),
  tertiary:
    'bg-transparent text-accent-600 hover:text-accent-500 hover:bg-accent-50 active:bg-accent-100/60',
  ghost: 'bg-transparent text-ink-secondary hover:text-ink hover:bg-surface-muted active:bg-surface-strong',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 gap-1.5 text-[13px]',
  md: 'h-11 px-5 gap-2 text-body-sm',
  lg: 'h-[52px] px-7 gap-2.5 text-[15px] tracking-[-0.006em]',
};

/**
 * Button — UI_UX_BLUEPRINT §5.
 * Primary / Secondary / Tertiary · 36–52px heights · Radius 12px
 * Micro-interaction: 150ms ease-out; focus-visible accent ring.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', icon, iconRight, loading = false, disabled, className = '', children, ...props },
    ref
  ) => {
    const iconSize = size === 'sm' ? 15 : size === 'lg' ? 18 : 16;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={[
          'relative inline-flex items-center justify-center whitespace-nowrap select-none',
          'font-semibold rounded-radius-md cursor-pointer border border-transparent',
          'transition-all focus-ring',
          'disabled:pointer-events-none disabled:opacity-45',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ transitionDuration: 'var(--duration-micro)', transitionTimingFunction: 'ease-out' }}
        {...props}
      >
        {loading ? (
          <Loader2 size={iconSize} className="animate-spin shrink-0" aria-hidden="true" />
        ) : (
          icon && <span className="inline-flex shrink-0 [&>svg]:shrink-0">{icon}</span>
        )}
        {children}
        {!loading && iconRight && (
          <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5 [&>svg]:shrink-0">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
