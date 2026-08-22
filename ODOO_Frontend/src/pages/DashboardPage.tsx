/**
 * DashboardPage — Minimalist, Photo-First Travel Atelier
 *
 * Emphasizes stunning destination photography, uncluttered typography,
 * smooth glassmorphic overlays, and clean visual cards.
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { mockGetTrips } from '@/lib/mock/services';
import type { Trip } from '@/types';
import {
  Plus,
  ArrowUpRight,
  MapPin,
  Search,
  Calendar,
  Wallet,
  Sparkles,
} from 'lucide-react';

/* =========================================================
   Simplified Clean Metadata
   ========================================================= */

interface TripMeta {
  durationText: string;
  routeSummary: string;
  themeTag: string;
  budget: string;
}

const TRIP_METADATA: Record<string, TripMeta> = {
  'trip-rajasthan': {
    durationText: '10 Days · Nov 10',
    routeSummary: 'Jaipur · Jodhpur · Udaipur',
    themeTag: 'Palaces & Forts',
    budget: '₹38,500',
  },
  'trip-kerala': {
    durationText: '8 Days · Dec 04',
    routeSummary: 'Munnar · Alleppey · Kochi',
    themeTag: 'Backwaters & Tea Hills',
    budget: '₹29,000',
  },
  'trip-japan': {
    durationText: '12 Days · Jun 14',
    routeSummary: 'Tokyo · Hakone · Kyoto · Osaka',
    themeTag: 'Zen Shrines & Shinkansen',
    budget: '₹48,600',
  },
  'trip-tokyo': {
    durationText: '4 Days · Oct 10',
    routeSummary: 'Shibuya · Harajuku · Shinjuku',
    themeTag: 'Metropolis & Arts',
    budget: '₹24,500',
  },
  'trip-ladakh': {
    durationText: '9 Days · Jul 15',
    routeSummary: 'Leh · Khardung La · Pangong',
    themeTag: 'Himalayan Passes',
    budget: '₹42,000',
  },
  'trip-italy': {
    durationText: '10 Days · Sep 02',
    routeSummary: 'Naples · Positano · Capri',
    themeTag: 'Coastline & Ferries',
    budget: '₹62,000',
  },
};

/* =========================================================
   Component
   ========================================================= */

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'india' | 'japan' | 'europe'>('all');

  const { data: trips, isLoading, error, refetch } = useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: mockGetTrips,
  });

  // Filter logic
  const filteredTrips = useMemo(() => {
    if (!trips) return [];
    return trips.filter((trip) => {
      const matchesSearch =
        trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.stops?.some((s) => s.city.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeFilter === 'india') {
        return trip.id === 'trip-rajasthan' || trip.id === 'trip-kerala' || trip.id === 'trip-ladakh';
      }
      if (activeFilter === 'japan') {
        return trip.id === 'trip-japan' || trip.id === 'trip-tokyo';
      }
      if (activeFilter === 'europe') {
        return trip.id === 'trip-italy' || trip.id === 'trip-swiss';
      }
      return true;
    });
  }, [trips, searchQuery, activeFilter]);

  // Featured flagship trip
  const featuredTrip = useMemo(() => {
    if (!filteredTrips.length) return null;
    return filteredTrips.find((t) => t.id === 'trip-rajasthan') || filteredTrips[0];
  }, [filteredTrips]);

  // Secondary trips
  const gridTrips = useMemo(() => {
    if (!featuredTrip) return filteredTrips;
    return filteredTrips.filter((t) => t.id !== featuredTrip.id);
  }, [filteredTrips, featuredTrip]);

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
      {/* =====================================================
          MINIMALIST HEADER
          ===================================================== */}
      <div className="rise flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 pb-6 border-b border-border-soft">
        <div>
          <h1 className="text-[32px] sm:text-[38px] font-display text-ink font-bold tracking-tight">
            Your journeys
          </h1>
          <p className="text-[14px] text-ink-secondary mt-1 max-w-lg">
            Curated travel plans — from first stop to final return.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            onClick={() => navigate('/trips/new')}
            icon={<Plus size={16} />}
            className="shadow-subtle hover:shadow-default"
          >
            Create Trip
          </Button>
        </div>
      </div>

      {/* =====================================================
          FILTER & SEARCH BAR
          ===================================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Simple Text Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded-full border border-border-soft w-fit shadow-subtle">
          {[
            { id: 'all', label: 'All Destinations' },
            { id: 'india', label: 'India' },
            { id: 'japan', label: 'Japan' },
            { id: 'europe', label: 'Europe' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-ink text-white shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ink hover:bg-canvas'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination or city..."
            className="w-full h-9 pl-9 pr-4 text-[13px] bg-surface text-ink border border-border-default hover:border-border-strong focus:border-accent-600 focus-ring rounded-full outline-none transition-all placeholder:text-ink-disabled shadow-subtle"
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-surface border border-border-soft rounded-radius-xl skeleton" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <ErrorState message="We couldn't load your journeys." onRetry={() => refetch()} />
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredTrips.length === 0 && (
        <EmptyState
          title="No journeys found"
          description="Try clearing your search query or create a new trip."
          actionLabel="View All Trips"
          onAction={() => {
            setSearchQuery('');
            setActiveFilter('all');
          }}
          visual="route"
        />
      )}

      {/* =====================================================
          PHOTO-FIRST VISUAL MAGAZINE GRID
          ===================================================== */}
      {!isLoading && !error && filteredTrips.length > 0 && (
        <div className="space-y-6">
          {/* Top Featured Panorama Card */}
          {featuredTrip && (
            <PhotoFirstHeroCard
              trip={featuredTrip}
              meta={TRIP_METADATA[featuredTrip.id] || TRIP_METADATA['trip-rajasthan']}
              onClick={() => navigate(`/trips/${featuredTrip.id}`)}
            />
          )}

          {/* Secondary Photo Cards Grid */}
          {gridTrips.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridTrips.map((trip) => (
                <PhotoFirstGridCard
                  key={trip.id}
                  trip={trip}
                  meta={TRIP_METADATA[trip.id] || TRIP_METADATA['trip-kerala']}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PHOTO-FIRST HERO PANORAMA CARD
   ========================================================= */

interface CardProps {
  trip: Trip;
  meta: TripMeta;
  onClick: () => void;
}

function PhotoFirstHeroCard({ trip, meta, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative w-full h-[380px] sm:h-[450px] rounded-radius-xl overflow-hidden cursor-pointer border border-border-soft shadow-default hover:shadow-hover transition-all duration-300 select-none"
    >
      {/* Full-Bleed Destination Photography */}
      <img
        src={trip.coverImage || 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=80'}
        alt={trip.name}
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Gentle Cinema Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,17,16,0.3) 0%, rgba(18,17,16,0.05) 45%, rgba(18,17,16,0.88) 100%)',
        }}
      />

      {/* Top Floating Glass Badges */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="bg-white/90 backdrop-blur-md text-ink text-[12px] font-semibold px-3.5 py-1 rounded-full shadow-subtle border border-white/40">
            {meta.durationText}
          </span>
          <span className="hidden sm:inline-block bg-ink/75 backdrop-blur-md text-white/90 text-[12px] font-medium px-3 py-1 rounded-full border border-white/15">
            {meta.themeTag}
          </span>
        </div>

        {/* Hover Action Circle */}
        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-ink flex items-center justify-center shadow-subtle opacity-90 group-hover:opacity-100 group-hover:bg-accent-600 group-hover:text-white transition-all duration-200">
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Bottom Content Canvas */}
      <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-accent-300 text-[13px] font-medium tracking-wide mb-1">
            <MapPin size={14} />
            <span>{meta.routeSummary}</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] font-display font-bold text-white tracking-tight leading-tight drop-shadow-sm group-hover:text-accent-100 transition-colors">
            {trip.name}
          </h2>
        </div>

        {/* Clean Budget Chip */}
        <div className="shrink-0 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-radius-md text-right">
          <span className="text-[11px] text-white/70 block uppercase font-medium">Estimated</span>
          <span className="text-[18px] font-bold text-white font-display leading-tight">{meta.budget}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PHOTO-FIRST GRID CARD (Secondary Journeys)
   ========================================================= */

function PhotoFirstGridCard({ trip, meta, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative w-full h-[340px] sm:h-[370px] rounded-radius-xl overflow-hidden cursor-pointer border border-border-soft shadow-subtle hover:shadow-hover transition-all duration-300 select-none flex flex-col justify-between"
    >
      {/* Full-Bleed Destination Photography */}
      <img
        src={trip.coverImage || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000&q=80'}
        alt={trip.name}
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Ambient Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,17,16,0.3) 0%, rgba(18,17,16,0.1) 40%, rgba(18,17,16,0.85) 100%)',
        }}
      />

      {/* Top Strip */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        <span className="bg-white/90 backdrop-blur-md text-ink text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-subtle border border-white/40">
          {meta.durationText}
        </span>

        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-ink flex items-center justify-center shadow-subtle group-hover:bg-accent-600 group-hover:text-white transition-all duration-200">
          <ArrowUpRight size={15} />
        </div>
      </div>

      {/* Bottom Title & Route */}
      <div className="relative z-10 p-5 text-white">
        <div className="flex items-center gap-1 text-accent-300 text-[12px] font-medium tracking-wide mb-1 truncate">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{meta.routeSummary}</span>
        </div>

        <h3 className="text-[20px] sm:text-[22px] font-display font-bold text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-accent-100 transition-colors">
          {trip.name}
        </h3>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/15 text-[12px] text-white/80">
          <span>{meta.themeTag}</span>
          <span className="font-semibold text-white">{meta.budget}</span>
        </div>
      </div>
    </div>
  );
}
