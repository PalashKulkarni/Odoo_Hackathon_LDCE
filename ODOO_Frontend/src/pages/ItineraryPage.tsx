import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { WorkspaceContextType } from '@/layouts/TripWorkspaceLayout';
import type { StopActivity } from '@/types';
import { EmptyState } from '@/components/states/EmptyState';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AddActivityDialog } from '@/features/activities/AddActivityDialog';
import { Plus, MapPin, Sparkles, Clock, MapPinned } from 'lucide-react';

export function ItineraryPage() {
  const { trip, stops, onAddActivity, onOpenCopilot } = useOutletContext<WorkspaceContextType>();
  const [selectedDay, setSelectedDay] = useState(1);
  const [addActivityOpen, setAddActivityOpen] = useState(false);

  if (!trip) return null;

  if (stops.length === 0) {
    return (
      <EmptyState
        title="Add a city first."
        description="Your itinerary will take shape once you've added stops to your journey."
        icon={<MapPin size={22} />}
      />
    );
  }

  // Flatten activities across stops
  const allActivities: (StopActivity & { cityName: string; stopId: string })[] = [];
  stops.forEach((stop) => {
    stop.activities?.forEach((sa) => {
      allActivities.push({ ...sa, cityName: stop.city.name, stopId: stop.id });
    });
  });

  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const totalDays = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  const daysList = Array.from({ length: totalDays }, (_, i) => i + 1);

  const cityForDay = (day: number) =>
    stops.find((s) => s.activities?.some((a) => a.day === day)) ||
    stops[Math.min(day - 1, stops.length - 1)];

  const dayActivities = allActivities
    .filter((a) => a.day === selectedDay)
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  const currentStop = cityForDay(selectedDay);

  return (
    <>
      <div className="space-y-8">
        {/* Day index */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-label text-accent-600">Journey timeline</span>
            <Button
              size="sm"
              variant="secondary"
              onClick={onOpenCopilot}
              icon={<Sparkles size={14} className="text-accent-600" />}
            >
              Ask AI to rebalance
            </Button>
          </div>

          <div
            className="route-scroll flex items-stretch gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {daysList.map((day) => {
              const isActive = day === selectedDay;
              const count = allActivities.filter((a) => a.day === day).length;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  aria-current={isActive ? 'date' : undefined}
                  className={[
                    'flex flex-col items-start min-w-[108px] px-3.5 py-3 rounded-radius-md border shrink-0 cursor-pointer transition-all text-left focus-ring',
                    isActive
                      ? 'border-accent-600 bg-accent-50'
                      : 'border-border-default bg-surface hover:border-border-strong',
                  ].join(' ')}
                  style={{ transitionDuration: 'var(--duration-micro)' }}
                >
                  <span className={['text-label tabular-nums', isActive ? 'text-accent-600' : 'text-ink-muted'].join(' ')}>
                    Day {String(day).padStart(2, '0')}
                  </span>
                  <span className="text-body-sm font-semibold text-ink mt-1 truncate w-full">
                    {cityForDay(day)?.city.name || 'Transit'}
                  </span>
                  <span className="text-caption text-ink-muted mt-0.5 tabular-nums">
                    {count} {count === 1 ? 'activity' : 'activities'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border-default">
          <div>
            <span className="text-label text-accent-600 tabular-nums">
              Day {String(selectedDay).padStart(2, '0')} · Itinerary
            </span>
            <h2 className="text-page-title text-ink mt-2">
              {currentStop ? currentStop.city.name : 'Open day'}
            </h2>
            <p className="text-body-sm text-ink-muted mt-1 tabular-nums">
              {dayActivities.length} {dayActivities.length === 1 ? 'activity' : 'activities'} scheduled
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

        {/* Timeline */}
        {dayActivities.length === 0 ? (
          <div className="rise py-14 px-8 border border-dashed border-border-strong rounded-radius-lg text-center bg-surface/60">
            <Clock size={26} className="text-ink-disabled mx-auto mb-4" />
            <h3 className="text-h3 font-display text-ink mb-1.5">This day is still open.</h3>
            <p className="text-body-sm text-ink-secondary max-w-sm mx-auto mb-7 leading-relaxed">
              Add places to visit, dining reservations, or experiences worth keeping.
            </p>
            <Button icon={<Plus size={16} />} onClick={() => setAddActivityOpen(true)}>
              Add Activity
            </Button>
          </div>
        ) : (
          <div className="relative max-w-3xl">
            {/* Spine */}
            <div className="absolute left-[63px] sm:left-[71px] top-5 bottom-5 w-px bg-border-default" />

            <div>
              {dayActivities.map((activity, i) => (
                <ActivityTimelineItem
                  key={activity.id}
                  activity={activity}
                  last={i === dayActivities.length - 1}
                  onAdd={() => setAddActivityOpen(true)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AddActivityDialog
        isOpen={addActivityOpen}
        onClose={() => setAddActivityOpen(false)}
        stops={stops}
        defaultStopId={currentStop?.id}
        defaultDay={selectedDay}
        onAddActivity={onAddActivity}
      />
    </>
  );
}

/* ---- ActivityTimelineItem ---- */

function ActivityTimelineItem({
  activity,
  last,
  onAdd,
}: {
  activity: StopActivity & { cityName: string };
  last: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="relative flex items-start gap-4 sm:gap-5 group">
      {/* Time column */}
      <div className="w-12 sm:w-14 shrink-0 text-right pt-0.5">
        <span className="text-metadata font-medium text-ink-secondary tabular-nums block">
          {activity.startTime || '--:--'}
        </span>
        {activity.endTime && (
          <span className="text-[11px] text-ink-disabled tabular-nums block">
            {activity.endTime}
          </span>
        )}
      </div>

      {/* Node */}
      <div className="relative shrink-0 mt-[7px] w-3 h-3">
        <div className="w-3 h-3 rounded-full bg-accent-600 ring-4 ring-canvas relative z-10 transition-colors group-hover:bg-accent-500" style={{ transitionDuration: 'var(--duration-micro)' }} />
      </div>

      {/* Content — airy so time and progression lead the view */}
      <div className={`flex-1 min-w-0 pb-6 ${last ? '' : 'border-b border-border-soft'} group-hover:border-border-strong transition-colors`} style={{ transitionDuration: 'var(--duration-micro)' }}>
        <div className="flex items-start justify-between gap-4 pt-1">
          <div className="min-w-0">
            <h3 className="text-h4 text-ink">{activity.activity.title}</h3>
            {activity.activity.description && (
              <p className="text-body-sm text-ink-secondary mt-1 leading-relaxed">
                {activity.activity.description}
              </p>
            )}
          </div>

          {activity.activity.estimatedCost !== undefined && activity.activity.estimatedCost > 0 && (
            <span className="text-body-sm font-semibold text-ink tabular-nums shrink-0 pt-0.5">
              ¥{activity.activity.estimatedCost.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 mb-1">
          {activity.activity.category && (
            <Badge variant="accent" className="capitalize">
              {activity.activity.category}
            </Badge>
          )}

          {activity.activity.estimatedDuration && (
            <span className="text-caption text-ink-muted inline-flex items-center gap-1 tabular-nums">
              <Clock size={12} />
              {activity.activity.estimatedDuration} min
            </span>
          )}

          <span className="text-caption text-ink-muted inline-flex items-center gap-1">
            <MapPinned size={12} />
            {activity.cityName}
          </span>

          {last && (
            <button
              onClick={onAdd}
              className="ml-auto inline-flex items-center gap-1 text-caption font-semibold text-ink-muted hover:text-accent-600 bg-transparent border-none cursor-pointer p-0 transition-colors focus-ring rounded-[2px]"
              style={{ transitionDuration: 'var(--duration-micro)' }}
            >
              <Plus size={13} />
              Add another
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
