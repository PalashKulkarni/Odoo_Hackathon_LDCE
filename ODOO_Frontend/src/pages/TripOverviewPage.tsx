import { useState } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import type { WorkspaceContextType } from '@/layouts/TripWorkspaceLayout';
import type { TripStop } from '@/types';
import { EmptyState } from '@/components/states/EmptyState';
import { Button } from '@/components/ui/Button';
import { AddStopDialog } from '@/features/trips/AddStopDialog';
import { Plus, CalendarDays, Wallet, Clock, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';

export function TripOverviewPage() {
  const { trip, stops, onAddStop, onOpenCopilot } = useOutletContext<WorkspaceContextType>();
  const [addStopOpen, setAddStopOpen] = useState(false);
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();

  if (!trip) return null;

  return (
    <>
      {stops.length === 0 ? (
        <EmptyState
          title="Your route is waiting."
          description="Start → Add your first city and build your journey from there."
          actionLabel="Add Stop"
          onAction={() => setAddStopOpen(true)}
          icon={<MapPin size={22} />}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
          {/* Main journey area — 8 columns */}
          <div>
            <div className="flex items-end justify-between mb-5">
              <div>
                <span className="text-label text-accent-600">The route</span>
                <h2 className="text-h2 text-ink mt-1.5">Stops</h2>
              </div>
              <Button
                size="sm"
                onClick={() => setAddStopOpen(true)}
                icon={<Plus size={15} />}
              >
                Add Stop
              </Button>
            </div>

            <div className="border-t border-border-default">
              {stops.map((stop) => (
                <StopCard
                  key={stop.id}
                  stop={stop}
                  onViewActivities={() => navigate(`/trips/${tripId}/activities`)}
                />
              ))}
            </div>
          </div>

          {/* Supporting area — 4 columns */}
          <aside className="rise flex flex-col gap-8 lg:pt-2" style={{ animationDelay: '120ms' }}>
            {trip.description && (
              <section className="border-t-2 border-ink pt-4">
                <h3 className="text-label text-ink-muted mb-2.5">About this journey</h3>
                <p className="text-body-sm text-ink-secondary leading-relaxed">
                  {trip.description}
                </p>
              </section>
            )}

            <section className="border-t border-border-default pt-4">
              <h3 className="text-label text-ink-muted mb-2">Planning lenses</h3>
              <div className="flex flex-col">
                {[
                  { label: 'Day-wise itinerary', hint: 'Moments and movement', icon: <CalendarDays size={17} />, path: 'itinerary' },
                  { label: 'Budget & costs', hint: 'What the journey adds up to', icon: <Wallet size={17} />, path: 'budget' },
                  { label: 'Timeline chronology', hint: 'The trip as a story', icon: <Clock size={17} />, path: 'timeline' },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => navigate(`/trips/${tripId}/${action.path}`)}
                    className="group flex items-center gap-3 py-3.5 border-b border-border-soft text-left w-full bg-transparent cursor-pointer transition-colors hover:bg-surface/70 focus-ring rounded-radius-sm px-1 -mx-1"
                    style={{ transitionDuration: 'var(--duration-micro)' }}
                  >
                    <span className="text-ink-muted group-hover:text-accent-600 transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>
                      {action.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-body-sm font-semibold text-ink">{action.label}</span>
                      <span className="block text-caption text-ink-muted mt-0.5">{action.hint}</span>
                    </span>
                    <ArrowUpRight size={16} className="text-ink-disabled opacity-0 group-hover:opacity-100 group-hover:text-accent-600 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }} />
                  </button>
                ))}
              </div>
            </section>

            {/* Copilot entry */}
            <section className="border-l-2 border-accent-600 pl-4 py-0.5">
              <span className="text-label text-accent-600 inline-flex items-center gap-1.5">
                <Sparkles size={13} />
                AI travel copilot
              </span>
              <p className="text-body-sm text-ink-secondary mt-2.5 mb-4 leading-relaxed">
                Rebalance busy days, surface activity ideas, and keep costs honest —
                all in the context of {trip.name}.
              </p>
              <Button size="sm" onClick={onOpenCopilot} icon={<Sparkles size={14} />}>
                Open Copilot
              </Button>
            </section>
          </aside>
        </div>
      )}

      <AddStopDialog
        isOpen={addStopOpen}
        onClose={() => setAddStopOpen(false)}
        tripId={trip.id}
        existingStopsCount={stops.length}
        onAddStop={onAddStop}
      />
    </>
  );
}

/* ---- StopCard ---- */

function StopCard({
  stop,
  onViewActivities,
}: {
  stop: TripStop;
  onViewActivities: () => void;
}) {
  const activityCount = stop.activities?.length ?? 0;

  return (
    <div className="group flex gap-4 sm:gap-5 py-6 border-b border-border-soft hover:bg-surface/80 transition-colors" style={{ transitionDuration: 'var(--duration-micro)' }}>
      {/* Sequence + node */}
      <div className="flex flex-col items-center shrink-0 pt-1 w-9">
        <span className="text-label text-ink-muted tabular-nums mb-1.5" style={{ fontSize: '10px' }}>
          {String(stop.sequence).padStart(2, '0')}
        </span>
        <div className="w-4 h-4 rounded-full border-2 border-border-strong bg-surface transition-colors group-hover:border-accent-600" style={{ transitionDuration: 'var(--duration-micro)' }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h3 className="text-h3 font-display text-ink leading-tight">{stop.city.name}</h3>
          <span className="text-caption text-ink-muted uppercase tracking-[0.12em]">{stop.city.country}</span>
        </div>

        {stop.arrivalDate && stop.departureDate && (
          <span className="text-caption text-ink-secondary tabular-nums block mt-1.5">
            {new Date(stop.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            {' – '}
            {new Date(stop.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}

        <div className="flex items-center gap-4 mt-3">
          <span className="text-caption text-ink-muted tabular-nums">
            {activityCount} {activityCount === 1 ? 'activity' : 'activities'} scheduled
          </span>
          <button
            onClick={onViewActivities}
            className="inline-flex items-center gap-1 text-caption font-semibold text-accent-600 hover:text-accent-500 bg-transparent border-none cursor-pointer p-0 focus-ring rounded-[2px]"
            style={{ transitionDuration: 'var(--duration-micro)' }}
          >
            Explore activities
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px" style={{ transitionDuration: 'var(--duration-micro)' }} />
          </button>
        </div>
      </div>

      {/* City identity image */}
      {stop.city.imageUrl && (
        <div className="w-28 h-20 sm:w-32 sm:h-[5.25rem] rounded-radius-md overflow-hidden shrink-0 hidden sm:block">
          <img
            src={stop.city.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
