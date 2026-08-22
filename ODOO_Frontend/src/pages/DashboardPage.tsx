/**
 * DashboardPage — trip launch point. "Must Look Excellent"
 *
 * Per UI_UX_BLUEPRINT §6.3: "Your journeys" header + Create Trip CTA,
 * asymmetric trip cards (no uniform 4-column grid), empty/error states.
 */

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { mockGetTrips } from '@/lib/mock/services';
import type { Trip } from '@/types';
import { Plus, ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: trips, isLoading, error, refetch } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: mockGetTrips,
  });

  return (
    <div className="max-w-[1520px] mx-auto px-4 md:px-8 lg:px-10 py-10 md:py-16">
      {/* Header */}
      <div className="rise flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <span className="text-label text-accent-600">Your travel studio</span>
          <div className="flex items-baseline gap-3 mt-2">
            <h1 className="text-page-title text-ink">Your journeys</h1>
            {trips && trips.length > 0 && (
              <span className="text-metadata text-ink-muted tabular-nums">
                {trips.length} {trips.length === 1 ? 'journey' : 'journeys'}
              </span>
            )}
          </div>
          <p className="text-body text-ink-secondary mt-2 max-w-md">
            Plans with a point of view — from first stop to final return.
          </p>
        </div>
        <Button onClick={() => navigate('/trips/new')} icon={<Plus size={16} />}>
          Create Trip
        </Button>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          <div className="md:col-span-2 bg-surface border border-border-soft rounded-radius-xl overflow-hidden">
            <div className="skeleton h-[380px] rounded-none" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="bg-surface border border-border-soft rounded-radius-xl overflow-hidden">
              <div className="skeleton h-44 rounded-none" />
              <div className="p-6">
                <div className="skeleton h-6 w-36 mb-3" />
                <div className="skeleton h-4 w-52 mb-5" />
                <div className="skeleton h-3 w-28" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <ErrorState
          message="We couldn't load your trips."
          onRetry={() => refetch()}
        />
      )}

      {/* Empty state */}
      {!isLoading && !error && trips?.length === 0 && (
        <EmptyState
          title="No journeys yet."
          description="Start with a city. Build the rest from there."
          actionLabel="Create your first trip"
          onAction={() => navigate('/trips/new')}
          visual="route"
        />
      )}

      {/* Trip cards — asymmetric editorial grid */}
      {!isLoading && !error && trips && trips.length > 0 && (() => {
        const firstLive = trips.findIndex(isCurrentOrUpcoming);
        const featuredIndex = firstLive === -1 ? 0 : firstLive;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
            {trips.map((trip, index) => (
              <TripCard
                key={trip.id}
                trip={trip}
                featured={index === featuredIndex}
                onClick={() => navigate(`/trips/${trip.id}`)}
              />
            ))}
          </div>
        );
      })()}
    </div>
  );
}

/* ---- Helpers ---- */

/** Inclusive day count — "Jun 14 – Jun 25" reads as 12 days, not 11. */
function daysUntil(start: Date, end: Date) {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function journeyStatus(trip: Trip): 'current' | 'upcoming' | 'past' {
  const now = Date.now();
  const start = new Date(trip.startDate).getTime();
  const end = new Date(trip.endDate).getTime();
  if (now < start) return 'upcoming';
  if (now > end) return 'past';
  return 'current';
}

function statusLabel(status: ReturnType<typeof journeyStatus>) {
  switch (status) {
    case 'current': return 'Current journey';
    case 'upcoming': return 'Upcoming journey';
    case 'past': return 'Past journey';
  }
}

function isCurrentOrUpcoming(trip: Trip) {
  return journeyStatus(trip) !== 'past';
}

/* ---- TripCard ---- */

interface TripCardProps {
  trip: Trip;
  featured?: boolean;
  onClick: () => void;
}

function formatRange(start: Date, end: Date) {
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

function TripCard({ trip, featured, onClick }: TripCardProps) {
  const routeSummary = trip.stops?.map((s) => s.city.name).join(' → ') || '';
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const days = daysUntil(startDate, endDate);
  const status = journeyStatus(trip);

  if (featured) {
    return (
      <button
        onClick={onClick}
        className="group relative text-left w-full overflow-hidden rounded-radius-xl border border-border-soft focus-ring cursor-pointer transition-all hover:border-border-strong hover:-translate-y-0.5 hover:shadow-hover min-h-[380px] md:min-h-[420px]"
        style={{ transitionDuration: 'var(--duration-normal)' }}
      >
        {/* Imagery as the editorial field */}
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-surface-strong flex items-center justify-center">
            <MapPin size={32} className="text-ink-disabled" />
          </div>
        )}
        {/* Bottom wash for legibility only */}
        <div className="trip-image-wash-b absolute inset-0" />

        {/* Content anchored bottom-left */}
        <div className="relative z-10 flex min-h-[380px] md:min-h-[420px] flex-col justify-end p-7 md:p-10 max-w-2xl">
          <span className="rise text-label text-white/70 mb-4 inline-flex items-center gap-2">
            <span className={`w-1 h-1 rounded-full ${status === 'past' ? 'bg-white/50' : 'bg-accent-500'}`} />
            {statusLabel(status)}
          </span>
          <h2 className="text-display-xl text-white mb-3">{trip.name}</h2>
          {routeSummary && (
            <p className="text-body-lg text-white/85 mb-5">{routeSummary}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-white/70 tabular-nums">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} />
              {formatRange(startDate, endDate)}
            </span>
            {days > 0 && <span>{days} days</span>}
            {trip.stops && trip.stops.length > 0 && (
              <span>{trip.stops.length} {trip.stops.length === 1 ? 'stop' : 'stops'}</span>
            )}
          </div>
        </div>

        {/* Open affordance */}
        <div className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full border border-white/30 bg-ink/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }}>
          <ArrowUpRight size={18} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full overflow-hidden rounded-radius-xl border border-border-soft bg-surface focus-ring cursor-pointer transition-all hover:border-border-strong hover:-translate-y-0.5 hover:shadow-hover"
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      <div className="h-44 md:h-48 overflow-hidden">
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-surface-muted flex items-center justify-center">
            <MapPin size={26} className="text-ink-disabled" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* DM Serif Display only ships weight 400 — avoid faux-bold synthesis */}
            <h2 className="text-h3 font-display font-normal text-ink mb-1">{trip.name}</h2>
            {routeSummary && (
              <p className="text-body-sm text-ink-secondary truncate">{routeSummary}</p>
            )}
          </div>
          <ArrowRight size={17} className="shrink-0 mt-1.5 text-accent-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" style={{ transitionDuration: 'var(--duration-normal)' }} />
        </div>

        <div className="mt-4 pt-4 border-t border-border-soft flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-ink-muted tabular-nums">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} />
            {formatRange(startDate, endDate)}
          </span>
          {days > 0 && <span>{days} days</span>}
          {trip.stops && trip.stops.length > 0 && (
            <span>{trip.stops.length} {trip.stops.length === 1 ? 'stop' : 'stops'}</span>
          )}
        </div>
      </div>
    </button>
  );
}
