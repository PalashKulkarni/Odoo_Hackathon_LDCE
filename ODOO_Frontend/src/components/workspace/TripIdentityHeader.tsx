/**
 * TripIdentityHeader — answers "Which trip am I working on?"
 *
 * Per UI_UX_BLUEPRINT §7: trip name, route summary, dates/duration, share action.
 * Must remain visible at top of every workspace view.
 */

import type { Trip, TripStop } from '@/types';
import { Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TripIdentityHeaderProps {
  trip: Trip;
  stops: TripStop[];
  onShareClick?: () => void;
}

export function TripIdentityHeader({ trip, stops, onShareClick }: TripIdentityHeaderProps) {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pb-6">
      <div className="min-w-0">
        <span className="text-label text-accent-600">Trip workspace</span>
        <h1 className="text-trip-title text-ink leading-none mt-2.5 mb-3">
          {trip.name}
        </h1>

        {/* Route summary with styled arrows */}
        {stops.length > 0 ? (
          <p className="text-body text-ink-secondary flex flex-wrap items-center gap-x-2 gap-y-0.5">
            {stops.map((s, i) => (
              <span key={s.id} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-ink-disabled select-none">→</span>}
                <span>{s.city.name}</span>
              </span>
            ))}
          </p>
        ) : (
          <p className="text-body text-ink-muted italic">No cities yet — the route is waiting.</p>
        )}

        {/* Duration line */}
        {days > 0 && (
          <span className="text-label text-ink-muted tabular-nums mt-3 inline-flex items-center gap-2">
            <span className="w-3.5 h-px bg-border-strong" />
            {days} {days === 1 ? 'day' : 'days'} · {fmt(start)} – {fmt(end)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="secondary"
          size="sm"
          onClick={onShareClick}
          icon={<Share2 size={15} />}
        >
          Share
        </Button>
        <button
          onClick={onShareClick}
          aria-label="Trip options"
          className="w-9 h-9 flex items-center justify-center rounded-radius-md border border-transparent hover:border-border-default hover:bg-surface-muted transition-all text-ink-muted hover:text-ink cursor-pointer bg-transparent focus-ring"
          style={{ transitionDuration: 'var(--duration-micro)' }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
