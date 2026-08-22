import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton component preserving layout structure per UI_UX_BLUEPRINT §5
 */
export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style = {},
  ...props
}: SkeletonProps) {
  const customStyles: React.CSSProperties = {
    ...style,
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  };

  const variantClass =
    variant === 'circular'
      ? 'rounded-radius-full'
      : variant === 'text'
      ? 'rounded-radius-sm h-4 my-1'
      : 'rounded-radius-md';

  return (
    <div
      className={['skeleton shrink-0', variantClass, className].filter(Boolean).join(' ')}
      style={customStyles}
      {...props}
    />
  );
}
