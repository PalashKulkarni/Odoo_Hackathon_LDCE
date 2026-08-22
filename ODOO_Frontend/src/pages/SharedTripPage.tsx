/**
 * SharedTripPage — UI_UX_BLUEPRINT §6.11.
 * A public trip presented as an editorial travel story, with Copy Trip CTA
 * (sticky on mobile).
 */

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockGetTrip, mockGetTripStops } from '@/lib/mock/services';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/states/ErrorState';
import { Copy, ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { JourneyLine } from '@/components/workspace/JourneyLine';
import type { Trip, TripStop } from '@/types';

export function SharedTripPage() {
  const { slug } = useParams<{ slug: string }>();

  const tripId = slug === 'japan' ? 'trip-japan' : slug!;
  const { data: trip, isLoading: tripLoading } = useQuery<Trip | null>({
    queryKey: ['sharedTrip', slug],
    queryFn: () => mockGetTrip(tripId),
  });

  const { data: stops = [] } = useQuery<TripStop[]>({
    queryKey: ['sharedTripStops', slug],
    queryFn: () => mockGetTripStops(tripId),
    enabled: !!trip,
  });

  if (tripLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center" aria-busy="true">
        <div className="w-full max-w-xl px-6">
          <div className="skeleton h-4 w-40 mx-auto mb-6" />
          <div className="skeleton h-16 w-72 mx-auto mb-8" />
          <div className="skeleton h-5 w-full max-w-sm mx-auto" />
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-canvas">
        <header className="flex items-center px-4 md:px-8 h-20">
          <BrandLink />
        </header>
        <div className="max-w-lg mx-auto py-24">
          <ErrorState message="This trip isn't ready to explore." />
        </div>
      </div>
    );
  }

  const routeSummary = stops.map((s) => s.city.name).join(' → ');
  const totalActivities = stops.reduce(
    (n, s) => n + (s.activities?.filter((sa) => !!sa.activity.title).length ?? 0),
    0
  );
  let days = 0;
  if (trip.startDate && trip.endDate) {
    days = Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000);
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Header */}
      <header className="max-w-[1280px] w-full mx-auto flex items-center justify-between px-4 md:px-8 lg:px-10 h-20 shrink-0">
        <BrandLink />
        <Button size="sm" icon={<Copy size={15} />} className="hidden lg:inline-flex">
          Copy this trip
        </Button>
      </header>

      {/* Hero — editorial identity over destination imagery */}
      <section className="relative overflow-hidden border-b border-border-default">
        {trip.coverImage && (
          <>
            <img src={trip.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(28,27,25,0.45), rgba(28,27,25,0.78))' }}
            />
          </>
        )}
        <div className={`relative text-center px-4 py-20 md:py-28 ${trip.coverImage ? '' : 'bg-surface-muted'}`}>
          <span className={`rise text-label ${trip.coverImage ? 'text-accent-500' : 'text-accent-600'}`}>
            A shared journey
          </span>
          <h1 className={`rise text-hero mt-5 mb-5 ${trip.coverImage ? 'text-white' : 'text-ink'}`} style={{ animationDelay: '80ms' }}>
            {trip.name}
          </h1>
          {routeSummary && (
            <p className={`rise text-label tracking-[0.2em] mb-7 ${trip.coverImage ? 'text-white/75' : 'text-ink-muted'}`} style={{ animationDelay: '160ms' }}>
              {routeSummary.toUpperCase()}
            </p>
          )}

          {/* Context strip */}
          <div className={`rise inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-caption tabular-nums ${trip.coverImage ? 'text-white/65' : 'text-ink-secondary'}`} style={{ animationDelay: '240ms' }}>
            {days > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} />
                {days} days
              </span>
            )}
            {stops.length > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} />
                {stops.length} {stops.length === 1 ? 'city' : 'cities'}
              </span>
            )}
            {totalActivities > 0 && (
              <span>{totalActivities} experiences</span>
            )}
          </div>

          {trip.description && (
            <p className={`rise text-body-lg max-w-xl mx-auto mt-8 leading-relaxed ${trip.coverImage ? 'text-white/70' : 'text-ink-secondary'}`} style={{ animationDelay: '300ms' }}>
              {trip.description}
            </p>
          )}
        </div>
      </section>

      {/* Signature route */}
      {stops.length > 0 && (
        <section className="max-w-[1100px] w-full mx-auto px-4 md:px-8 lg:px-10 py-10 border-b border-border-default overflow-x-auto route-scroll">
          <JourneyLine stops={stops} />
        </section>
      )}

      {/* Day-by-day itinerary */}
      {stops.length > 0 && (
        <section className="max-w-[860px] w-full mx-auto px-4 md:px-8 py-16 md:py-20 flex-1">
          <h2 className="text-display-xl text-ink mb-12">The route, day by day</h2>
          <div>
            {stops.map((stop) => (
              <article key={stop.id} className="grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr] gap-x-5 py-9 border-t border-border-default first:border-t-0">
                <div className="pt-1.5">
                  <span className="text-label text-accent-600 tabular-nums block">
                    {String(stop.sequence).padStart(2, '0')}
                  </span>
                  {stop.arrivalDate && (
                    <span className="text-[11px] text-ink-muted tabular-nums block mt-1.5 leading-snug">
                      {new Date(stop.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h3 className="text-trip-title text-ink">{stop.city.name}</h3>
                    <span className="text-caption text-ink-muted uppercase tracking-[0.14em] hidden sm:block">
                      {stop.city.country}
                    </span>
                  </div>

                  {stop.activities && stop.activities.length > 0 ? (
                    <ul className="list-none p-0 m-0">
                      {stop.activities.map((sa) => (
                        <li key={sa.id} className="flex items-baseline gap-4 py-2.5 border-b border-border-soft last:border-none">
                          {sa.startTime && (
                            <span className="text-caption text-ink-muted tabular-nums w-11 shrink-0">
                              {sa.startTime}
                            </span>
                          )}
                          <span className="text-body text-ink min-w-0">{sa.activity.title}</span>
                          {sa.activity.estimatedCost !== undefined && sa.activity.estimatedCost > 0 && (
                            <span className="ml-auto text-caption text-ink-secondary tabular-nums shrink-0">
                              ¥{sa.activity.estimatedCost.toLocaleString()}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-body-sm italic text-ink-disabled">No activities listed yet.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-surface-muted border-t border-border-soft py-20 text-center px-4">
        <h2 className="text-display-xl text-ink mb-3">Love this journey?</h2>
        <p className="text-body-lg text-ink-secondary mb-9">Copy it and make it your own.</p>
        <Button size="lg" icon={<ArrowRight size={18} />}>
          Copy this trip
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-soft bg-canvas py-8 text-center pb-28 lg:pb-8">
        <p className="text-caption text-ink-muted">Shared via GlobeTrotter</p>
      </footer>

      {/* Mobile sticky Copy CTA — §6.11 */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-default p-3 lg:hidden"
        style={{
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          zIndex: 40,
          boxShadow: '0 -4px 18px rgba(28,27,25,0.06)',
        }}
      >
        <Button size="lg" icon={<Copy size={17} />} className="w-full">
          Copy this trip
        </Button>
      </div>
    </div>
  );
}

function BrandLink() {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline group">
      <span
        className="w-9 h-9 rounded-radius-md bg-surface border border-border-default flex items-center justify-center shadow-subtle transition-transform group-hover:-translate-y-0.5"
        style={{ transitionDuration: 'var(--duration-normal)' }}
      >
        <BrandLogo size={22} />
      </span>
      <span className="text-h4 text-ink tracking-tight font-display font-bold">GlobeTrotter</span>
    </Link>
  );
}
