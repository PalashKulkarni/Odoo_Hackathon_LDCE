import { useLocation } from 'react-router-dom';
import type { Trip, TripStop, AIRecommendation } from '@/types';
import { TripIdentityHeader } from './TripIdentityHeader';
import { JourneyLine } from './JourneyLine';
import { WorkspaceRail } from './WorkspaceRail';
import { WorkspaceBottomNav } from './WorkspaceBottomNav';
import { ErrorState } from '@/components/states/ErrorState';
import { AICopilotPanel } from '@/features/ai/AICopilotPanel';
import { ShareTripDialog } from '@/features/sharing/ShareTripDialog';
import { Sparkles } from 'lucide-react';

interface TripWorkspaceShellProps {
  trip?: Trip;
  stops: TripStop[];
  isLoading: boolean;
  error?: string;
  copilotOpen?: boolean;
  onOpenCopilot?: () => void;
  onCloseCopilot?: () => void;
  shareOpen?: boolean;
  onOpenShare?: () => void;
  onCloseShare?: () => void;
  onApplyRecommendation?: (rec: AIRecommendation) => void;
  children: React.ReactNode;
}

/**
 * TripWorkspaceShell — the persistent trip workspace environment.
 *
 * Per UI_UX_BLUEPRINT §7-8: header, trip context, navigation, route,
 * content outlet, copilot, share dialog. The shell remains stable
 * while content changes.
 */
export function TripWorkspaceShell({
  trip,
  stops,
  isLoading,
  error,
  copilotOpen = false,
  onOpenCopilot,
  onCloseCopilot,
  shareOpen = false,
  onOpenShare,
  onCloseShare,
  onApplyRecommendation,
  children,
}: TripWorkspaceShellProps) {
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col" aria-busy="true">
        {/* Identity skeleton */}
        <div className="px-4 md:px-8 lg:px-10 pt-7 border-b border-border-default bg-surface">
          <div className="pb-6">
            <div className="skeleton h-3 w-28 mb-4" />
            <div className="skeleton h-11 w-56 mb-4" />
            <div className="skeleton h-4 w-72 mb-3" />
            <div className="skeleton h-3 w-36" />
          </div>
          {/* Journey line skeleton */}
          <div className="pb-6 flex items-start gap-3 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="skeleton w-8 h-2.5" />
                <div className={`skeleton rounded-full ${i === 1 ? 'w-4 h-4' : 'w-4 h-4'}`} />
                <div className="skeleton h-3 w-14" />
              </div>
            ))}
          </div>
        </div>

        {/* Rail + content skeleton */}
        <div className="flex-1 flex min-h-0">
          <div className="w-60 border-r border-border-soft hidden lg:block px-3 py-6">
            <div className="skeleton h-2.5 w-20 mb-5 mx-2" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-9 mb-1.5 rounded-radius-sm" />
            ))}
          </div>
          <div className="flex-1 px-4 md:px-8 lg:px-10 py-9 max-w-[1520px]">
            <div className="skeleton h-3 w-32 mb-4" />
            <div className="skeleton h-9 w-64 mb-8" />
            <div className="skeleton h-24 mb-3" />
            <div className="skeleton h-24 mb-3" />
            <div className="skeleton h-24 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <ErrorState
          message={error || "We couldn't find this trip."}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Trip identity + signature route */}
      <div className="px-4 md:px-8 lg:px-10 pt-7 border-b border-border-default bg-surface">
        <TripIdentityHeader trip={trip} stops={stops} onShareClick={onOpenShare} />
        <div className="pb-5">
          <JourneyLine stops={stops} />
        </div>
      </div>

      {/* Body: rail + content */}
      <div className="flex-1 flex min-h-0 relative">
        <WorkspaceRail onCopilotOpen={onOpenCopilot} onShareOpen={onOpenShare} />

        <main
          key={location.pathname}
          className="flex-1 overflow-y-auto pb-28 lg:pb-10"
          style={{ animation: 'rise-in 220ms var(--ease-out-expo) both' }}
        >
          <div className="px-4 md:px-8 lg:px-10 py-8 md:py-10 max-w-[1520px]">
            {children}
          </div>
        </main>

        {/* Floating copilot action — tablet/mobile */}
        {onOpenCopilot && (
          <button
            onClick={onOpenCopilot}
            className="fixed right-4 bottom-[88px] lg:hidden z-30 h-12 pl-4 pr-5 rounded-radius-full bg-accent-600 text-white shadow-hover flex items-center gap-2 font-semibold text-body-sm hover:bg-accent-500 active:scale-95 transition-all cursor-pointer border-none focus-ring"
            aria-label="Open AI Copilot"
          >
            <Sparkles size={17} />
            <span>Copilot</span>
          </button>
        )}
      </div>

      <WorkspaceBottomNav />

      {onCloseCopilot && (
        <AICopilotPanel
          trip={trip}
          isOpen={copilotOpen}
          onClose={onCloseCopilot}
          onApplyRecommendation={onApplyRecommendation}
        />
      )}

      {onCloseShare && (
        <ShareTripDialog trip={trip} isOpen={shareOpen} onClose={onCloseShare} />
      )}
    </div>
  );
}
