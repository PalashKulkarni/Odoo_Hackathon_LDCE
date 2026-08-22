import { useOutletContext } from 'react-router-dom';
import type { WorkspaceContextType } from '@/layouts/TripWorkspaceLayout';
import { EmptyState } from '@/components/states/EmptyState';
import { Clock, MoveRight } from 'lucide-react';

interface DayEntry {
  date: Date;
  dayNumber: number;
  cityName: string;
  isTransition: boolean;
  previousCity?: string;
  activities: { title: string; time?: string }[];
}

/**
 * CalendarPage — UI_UX_BLUEPRINT §6.9.
 * Travel chronology — a journal of days, not an office calendar.
 * City transitions are emphasized over ordinary separators.
 */
export function CalendarPage() {
  const { trip, stops } = useOutletContext<WorkspaceContextType>();

  if (!trip) return null;

  if (stops.length === 0) {
    return (
      <EmptyState
        title="Your dates exist, but the journey is still unwritten."
        description="Add cities and activities to see your journey's chronology."
        icon={<Clock size={22} />}
      />
    );
  }

  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const totalDays = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  const dayEntries: DayEntry[] = [];
  let previousCity = '';

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    const stop =
      stops.find((s) => {
        if (!s.arrivalDate || !s.departureDate) return false;
        return dateStr >= s.arrivalDate && dateStr <= s.departureDate;
      }) ||
      stops.find((s) => s.activities?.some((a) => a.day === i + 1)) ||
      stops[Math.min(i, stops.length - 1)];

    const cityName = stop?.city.name || 'Transit';
    const isTransition = cityName !== previousCity && previousCity !== '';

    const dayActivities =
      stops
        .flatMap((s) => s.activities || [])
        .filter((a) => a.day === i + 1)
        .map((a) => ({ title: a.activity.title, time: a.startTime })) ?? [];

    dayEntries.push({
      date,
      dayNumber: i + 1,
      cityName,
      isTransition,
      previousCity: isTransition ? previousCity : undefined,
      activities: dayActivities,
    });

    previousCity = cityName;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="pb-6 border-b border-border-default">
        <span className="text-label text-accent-600">Chronology</span>
        <h2 className="text-page-title text-ink mt-2">The journey, day by day</h2>
        <p className="text-body-sm text-ink-muted mt-1 tabular-nums">
          {totalDays} days across {stops.length} {stops.length === 1 ? 'destination' : 'destinations'}
        </p>
      </header>

      {/* Chronology spine */}
      <div className="relative">
        <div className="absolute left-[63px] sm:left-[71px] top-5 bottom-8 w-px bg-border-default" />

        {dayEntries.map((entry) => (
          <div key={entry.dayNumber} className="relative flex items-start gap-4 sm:gap-5 py-4 group">
            {/* Date column */}
            <div className="w-12 sm:w-14 shrink-0 text-right z-10">
              <span className="text-label text-ink-muted block tabular-nums" style={{ fontSize: '10px' }}>
                {entry.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
              </span>
              <span className="font-display text-h3 text-ink leading-tight tabular-nums">
                {entry.date.getDate()}
              </span>
              <span className="text-[11px] text-ink-disabled block">
                {entry.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
            </div>

            {/* Node */}
            <div className="relative shrink-0 mt-2.5 w-3 h-3">
              <div
                className={[
                  'w-3 h-3 rounded-full relative z-10',
                  entry.isTransition
                    ? 'bg-accent-600 ring-4 ring-accent-100'
                    : 'border-2 border-border-strong bg-surface group-hover:border-accent-600 transition-colors',
                ].join(' ')}
                style={{ transitionDuration: 'var(--duration-micro)' }}
              />
            </div>

            {/* Day content — exposed linework, not stacked cards */}
            <div className={`flex-1 min-w-0 pb-4 ${entry.dayNumber < totalDays ? 'border-b border-border-soft' : ''}`}>
              {entry.isTransition && (
                <span className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-radius-full bg-accent-50 text-accent-600 text-caption font-semibold">
                  <MoveRight size={13} />
                  Transit · {entry.previousCity} → {entry.cityName}
                </span>
              )}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-body font-semibold text-ink">{entry.cityName}</h3>
                <span className="text-caption text-ink-muted tabular-nums shrink-0">
                  Day {String(entry.dayNumber).padStart(2, '0')}
                </span>
              </div>

              {entry.activities.length > 0 ? (
                <div className="mt-2 pt-2 space-y-1.5">
                  {entry.activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-3 text-body-sm text-ink-secondary">
                      {act.time && (
                        <span className="text-caption text-ink-muted tabular-nums w-11 shrink-0">
                          {act.time}
                        </span>
                      )}
                      <span className={act.time ? '' : 'pl-[52px]'}>{act.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-caption italic text-ink-disabled mt-1">Unwritten — an open day.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
