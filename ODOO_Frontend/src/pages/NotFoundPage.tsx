/**
 * NotFoundPage — UI_UX_BLUEPRINT §6.13.
 * Brand-consistent 404: "This route doesn't exist."
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4 text-center rise">
      {/* Mark */}
      <div className="w-16 h-16 rounded-full border border-border-default bg-surface flex items-center justify-center mb-8">
        <Compass size={26} className="text-ink-disabled" />
      </div>

      <span className="text-label text-accent-600 tracking-[0.22em] mb-4">Error 404</span>
      <h1 className="font-display text-ink leading-tight max-w-lg" style={{ fontSize: 'clamp(34px, 5vw, 54px)' }}>
        This route doesn't exist<span className="text-accent-600">.</span>
      </h1>
      <p className="text-body-lg text-ink-secondary mt-4 mb-10 max-w-md leading-relaxed">
        The page you're looking for isn't on the map.
      </p>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button>Back to GlobeTrotter</Button>
        </Link>
        <Link to="/shared/japan">
          <Button variant="tertiary">View a shared trip</Button>
        </Link>
      </div>
    </div>
  );
}
