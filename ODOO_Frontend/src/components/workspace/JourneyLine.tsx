/**
 * JourneyLine — GlobeTrotter's signature visual component.
 *
 * Displays the trip route as an abstract horizontal sequence:
 *   01 TOKYO ───── 02 KYOTO ───── 03 OSAKA
 *
 * Per UI_UX_BLUEPRINT §7: abstract sequence, NOT geographic map.
 * Default nodes are outlined neutral; active node is filled terracotta.
 */

import type { TripStop } from '@/types';

interface JourneyLineProps {
  stops: TripStop[];
  activeStopId?: string;
  compact?: boolean;
}

export function JourneyLine({ stops, activeStopId, compact = false }: JourneyLineProps) {
  if (stops.length === 0) {
    return (
      <div className="flex items-center gap-3 py-2" aria-label="Trip route">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-label text-ink-muted tabular-nums" style={{ fontSize: '10px' }}>00</span>
          <div className="w-4 h-4 rounded-full border-2 border-dashed border-border-strong bg-canvas" />
          <span className="text-caption text-ink-muted">Start</span>
        </div>
        <div className="h-px w-16 md:w-28 bg-border-default mx-1.5" />
        <span className="text-label tracking-[0.14em] text-ink-disabled pb-5">
          Add your first city
        </span>
      </div>
    );
  }

  return (
    <div className="route-scroll flex items-start overflow-x-auto py-1" aria-label="Trip route">
      {stops.map((stop, index) => {
        const isActive = stop.id === activeStopId;
        const isLast = index === stops.length - 1;

        return (
          <div key={stop.id} className="flex items-start shrink-0">
            {/* Node + label column */}
            <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
              {!compact && (
                <span className="text-label text-ink-muted tabular-nums" style={{ fontSize: '10px' }}>
                  {String(stop.sequence).padStart(2, '0')}
                </span>
              )}

              <div
                className={[
                  'rounded-full transition-all shrink-0',
                  compact ? 'w-2.5 h-2.5' : 'w-4 h-4',
                  isActive
                    ? 'bg-accent-600 ring-4 ring-accent-100'
                    : 'border-2 border-border-strong bg-surface',
                ].join(' ')}
                style={{ transitionDuration: 'var(--duration-normal)' }}
              />

              <span
                className={[
                  'text-center whitespace-nowrap transition-colors',
                  compact ? 'text-caption' : 'text-label tracking-[0.14em]',
                  isActive ? 'text-accent-600 font-bold' : 'text-ink-secondary',
                ].join(' ')}
                style={{ transitionDuration: 'var(--duration-micro)' }}
              >
                {stop.city.name}
              </span>

              {!compact && stop.arrivalDate && (
                <span className="text-[11px] text-ink-muted tabular-nums whitespace-nowrap leading-none">
                  {new Date(stop.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>

            {/* Connecting line — neutral linework only */}
            {!isLast && (
              <div
                className={[
                  'bg-border-default mx-1.5',
                  compact ? 'w-8 h-px mt-[8px]' : 'w-10 h-px md:w-28 mt-[29px]',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
