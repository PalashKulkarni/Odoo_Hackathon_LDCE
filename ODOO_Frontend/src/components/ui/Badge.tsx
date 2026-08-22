import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'muted';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-muted text-ink-secondary border border-border-default',
  accent: 'bg-accent-100 text-accent-600 border border-accent-500/20',
  success: 'bg-success-bg text-success border border-success/20',
  warning: 'bg-warning-bg text-warning border border-warning/20',
  error: 'bg-error-bg text-error border border-error/20',
  info: 'bg-info-bg text-info border border-info/20',
  muted: 'bg-surface-strong text-ink-muted',
};

/**
 * Badge component per UI_UX_BLUEPRINT §5
 * Height: 24px, Padding: 0 10px, Radius: full, Font: 11px / 600 uppercase
 */
export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center gap-1.5 h-[24px] px-2.5 rounded-radius-full text-[11px] font-semibold tracking-wide uppercase leading-none select-none shrink-0 whitespace-nowrap',
        variantStyles[variant],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
