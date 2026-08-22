import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { WorkspaceContextType } from '@/layouts/TripWorkspaceLayout';
import { EmptyState } from '@/components/states/EmptyState';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AddActivityDialog } from '@/features/activities/AddActivityDialog';
import { Plus, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export function ActivitiesPage() {
  const { trip, stops, onAddActivity } = useOutletContext<WorkspaceContextType>();
  const [selectedStopId, setSelectedStopId] = useState<string | null>(
    stops[0]?.id ?? null
  );
  const [addActivityOpen, setAddActivityOpen] = useState(false);

  if (!trip) return null;

  if (stops.length === 0) {
    return (
      <EmptyState
        title="Add a city first."
        description="Activities will appear once you've added stops to your journey."
        icon={<MapPin size={22} />}
      />
    );
  }

  const effectiveStopId = selectedStopId && stops.some((s) => s.id === selectedStopId)
    ? selectedStopId
    : stops[0]?.id;

  const selectedStop = stops.find((s) => s.id === effectiveStopId) ?? stops[0];
  const activities = selectedStop?.activities ?? [];

  return (
    <>
      <div className="space-y-8 max-w-6xl">
        {/* Destination selector */}
        <div>
          <span className="text-label text-accent-600 block mb-3.5">Choose a destination</span>
          <div className="route-scroll flex items-stretch gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {stops.map((stop) => {
              const isActive = stop.id === selectedStop.id;
              const count = stop.activities?.length ?? 0;
              return (
                <button
                  key={stop.id}
                  onClick={() => setSelectedStopId(stop.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={[
                    'flex items-center gap-3 px-4 py-3 rounded-radius-md border shrink-0 cursor-pointer transition-all text-left focus-ring',
                    isActive
                      ? 'border-accent-600 bg-accent-50'
                      : 'border-border-default bg-surface hover:border-border-strong',
                  ].join(' ')}
                  style={{ transitionDuration: 'var(--duration-micro)' }}
                >
                  <MapPin size={17} className={isActive ? 'text-accent-600' : 'text-ink-muted'} />
                  <span>
                    <span className={`block text-body-sm font-semibold leading-tight ${isActive ? 'text-accent-600' : 'text-ink'}`}>
                      {stop.city.name}
                    </span>
                    <span className="block text-[11px] text-ink-muted mt-0.5 tabular-nums leading-tight">
                      {count} {count === 1 ? 'activity' : 'activities'}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* City header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border-default">
          <div>
            <span className="text-label text-accent-600 tabular-nums">
              Stop {String(selectedStop.sequence).padStart(2, '0')} · {selectedStop.city.country.toUpperCase()}
            </span>
            <h2 className="text-page-title text-ink mt-2">{selectedStop.city.name}</h2>
            <p className="text-body-sm text-ink-muted mt-1 tabular-nums">
              {activities.length} planned {activities.length === 1 ? 'experience' : 'experiences'}
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => setAddActivityOpen(true)}
            icon={<Plus size={15} />}
          >
            Add Activity
          </Button>
        </header>

        {/* Activities */}
        {activities.length === 0 ? (
          <div className="rise py-14 px-8 border border-dashed border-border-strong rounded-radius-lg text-center bg-surface/60">
            <MapPin size={26} className="text-ink-disabled mx-auto mb-4" />
            <h3 className="text-h3 font-display text-ink mb-1.5">
              Nothing planned for {selectedStop.city.name} yet.
            </h3>
            <p className="text-body-sm text-ink-secondary max-w-sm mx-auto mb-7 leading-relaxed">
              Discover sights, book dining, or add local experiences.
            </p>
            <Button icon={<Plus size={16} />} onClick={() => setAddActivityOpen(true)}>
              Add First Activity
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {activities.map((sa) => (
              <div
                key={sa.id}
                className="group flex flex-col justify-between py-6 border-b border-border-soft hover:border-border-strong transition-colors"
                style={{ transitionDuration: 'var(--duration-micro)' }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-h4 text-ink leading-snug">{sa.activity.title}</h3>
                    {sa.activity.estimatedCost !== undefined && sa.activity.estimatedCost > 0 && (
                      <span className="text-body-sm font-semibold tabular-nums text-ink shrink-0">
                        ¥{sa.activity.estimatedCost.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {sa.activity.description && (
                    <p className="text-body-sm text-ink-secondary leading-relaxed mb-4">
                      {sa.activity.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">
                  {sa.day && (
                    <span className="text-caption font-semibold text-ink-secondary tabular-nums">
                      Day {String(sa.day).padStart(2, '0')}
                    </span>
                  )}

                  {sa.startTime && (
                    <span className="text-caption text-ink-muted tabular-nums">
                      {sa.startTime}{sa.endTime ? ` – ${sa.endTime}` : ''}
                    </span>
                  )}

                  {sa.activity.category && (
                    <Badge variant="default" className="capitalize">
                      {sa.activity.category}
                    </Badge>
                  )}

                  {sa.activity.estimatedDuration && (
                    <span className="text-caption text-ink-muted inline-flex items-center gap-1 tabular-nums">
                      <Clock size={12} />
                      {sa.activity.estimatedDuration}m
                    </span>
                  )}

                  <ArrowUpRight
                    size={14}
                    className="ml-auto text-ink-disabled opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ transitionDuration: 'var(--duration-normal)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddActivityDialog
        isOpen={addActivityOpen}
        onClose={() => setAddActivityOpen(false)}
        stops={stops}
        defaultStopId={selectedStop.id}
        onAddActivity={onAddActivity}
      />
    </>
  );
}
