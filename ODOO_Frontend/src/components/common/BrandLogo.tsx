interface BrandLogoProps {
  size?: number;
  className?: string;
  variant?: 'dark' | 'light' | 'white';
}

/**
 * BrandLogo — Official GlobeTrotter brand emblem
 * Features the geometric mountain peak with the soaring orange paper plane.
 */
export function BrandLogo({ size = 28, className = '', variant = 'dark' }: BrandLogoProps) {
  const mountainColor = variant === 'light' || variant === 'white' ? '#FFFFFF' : '#1C1B19';
  const trailColor = variant === 'light' || variant === 'white' ? '#FFFFFF' : '#1C1B19';
  const arrowColor = '#F15A24';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Flight trail */}
      <path
        d="M 20 52 C 30 38 43 28 56 25"
        stroke={trailColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Orange flight arrow */}
      <polygon
        points="69,18 52,22 58,25 58,30"
        fill={arrowColor}
      />

      {/* Mountain peak */}
      <path
        d="M 16 78 L 47 39 L 63 59 L 68 54 L 85 78 L 68 64 L 63 67 L 47 55 Z"
        fill={mountainColor}
      />
    </svg>
  );
}

export default BrandLogo;
