import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padded?: boolean;
  children: ReactNode;
}

/**
 * Standard Card per UI_UX_BLUEPRINT §5
 * Background: Surface, Border: 1px solid Border Soft, Radius: 16px, Padding: 20-24px
 */
export function Card({
  hoverable = false,
  padded = true,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'bg-surface border border-border-soft rounded-radius-lg transition-all',
        padded ? 'p-5 md:p-6' : '',
        hoverable
          ? 'cursor-pointer hover:border-border-strong hover:-translate-y-0.5 hover:shadow-hover'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        transitionDuration: 'var(--duration-normal)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
