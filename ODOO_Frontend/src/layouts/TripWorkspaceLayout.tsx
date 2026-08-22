import { useState, useCallback } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TripWorkspaceShell } from '@/components/workspace/TripWorkspaceShell';
import { mockGetTrip, mockGetTripStops } from '@/lib/mock/services';
import { useToast } from '@/components/ui/Toast';
import type { Trip, TripStop, StopActivity, AIRecommendation } from '@/types';

export interface WorkspaceContextType {
  trip: Trip | null;
  stops: TripStop[];
  onAddStop: (stop: TripStop) => void;
  onAddActivity: (stopId: string, activity: StopActivity) => void;
  onOpenCopilot: () => void;
  onOpenShare: () => void;
}

/**
 * TripWorkspaceLayout — wraps all trip workspace views in the persistent shell.
 * Loads trip data and provides reactive state handlers to child views.
 */
export function TripWorkspaceLayout() {
  const { tripId } = useParams<{ tripId: string }>();
  const toast = useToast();

  const { data: tripData, isLoading: tripLoading, error: tripError } = useQuery<Trip | null>({
    queryKey: ['trip', tripId],
    queryFn: () => mockGetTrip(tripId!),
    enabled: !!tripId,
  });

  const { data: stopsData } = useQuery<TripStop[]>({
    queryKey: ['tripStops', tripId],
    queryFn: () => mockGetTripStops(tripId!),
    enabled: !!tripId,
  });

  // Editable local state, synced from queries during render
  // (React's recommended pattern — no effects, no cascading renders).
  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);
  const [tripSnapshot, setTripSnapshot] = useState<Trip | null | undefined>(undefined);
  const [stopsSnapshot, setStopsSnapshot] = useState<TripStop[] | undefined>(undefined);

  if (tripData !== undefined && tripData !== tripSnapshot) {
    setTripSnapshot(tripData);
    setTrip(tripData);
  }
  if (stopsData !== undefined && stopsData !== stopsSnapshot) {
    setStopsSnapshot(stopsData);
    setStops(stopsData);
  }

  const [copilotOpen, setCopilotOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleAddStop = useCallback(
    (newStop: TripStop) => {
      setStops((prev) => [...prev, newStop]);
      toast.success(
        `${newStop.city.name} added`,
        `Stop ${newStop.sequence} of your journey is in place.`
      );
    },
    [toast]
  );

  const handleAddActivity = useCallback(
    (stopId: string, newActivity: StopActivity) => {
      setStops((prev) =>
        prev.map((stop) => {
          if (stop.id === stopId) {
            return {
              ...stop,
              activities: [...(stop.activities || []), newActivity],
            };
          }
          return stop;
        })
      );
      toast.success('Activity added', newActivity.activity.title);
    },
    [toast]
  );

  const handleApplyRecommendation = useCallback(
    (_rec: AIRecommendation) => {
      // If AI recommendation is schedule adjustment, update activities
      setStops((prev) =>
        prev.map((stop) => {
          if (stop.id === 'stop-2') {
            // Adjust Fushimi Inari to 07:00
            return {
              ...stop,
              activities: (stop.activities || []).map((sa) =>
                sa.activity.title.includes('Fushimi')
                  ? { ...sa, startTime: '07:00', endTime: '10:00' }
                  : sa
              ),
            };
          }
          return stop;
        })
      );
      toast.success('Suggestion applied', 'Your itinerary has been updated.');
    },
    [toast]
  );

  const openCopilot = useCallback(() => setCopilotOpen(true), []);
  const openShare = useCallback(() => setShareOpen(true), []);

  const contextValue: WorkspaceContextType = {
    trip,
    stops,
    onAddStop: handleAddStop,
    onAddActivity: handleAddActivity,
    onOpenCopilot: openCopilot,
    onOpenShare: openShare,
  };

  return (
    <TripWorkspaceShell
      trip={trip ?? undefined}
      stops={stops}
      isLoading={tripLoading && !trip}
      error={tripError ? 'Failed to load trip' : undefined}
      copilotOpen={copilotOpen}
      onCloseCopilot={() => setCopilotOpen(false)}
      onOpenCopilot={openCopilot}
      shareOpen={shareOpen}
      onCloseShare={() => setShareOpen(false)}
      onOpenShare={openShare}
      onApplyRecommendation={handleApplyRecommendation}
    >
      <Outlet context={contextValue} />
    </TripWorkspaceShell>
  );
}
