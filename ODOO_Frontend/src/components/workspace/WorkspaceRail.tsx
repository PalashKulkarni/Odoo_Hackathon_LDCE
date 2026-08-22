/**
 * WorkspaceRail — desktop sidebar navigation for the trip workspace.
 *
 * Per UI_UX_BLUEPRINT §7:
 * - 240px width · Overview / Itinerary / Activities / Budget / Timeline
 * - separator · Ask Copilot / Share pinned to the bottom
 * - active state: 3px left accent marker + accent-50 background
 */

import { NavLink, useParams } from 'react-router-dom';
import {
  Map,
  CalendarDays,
  Activity,
  Wallet,
  Clock,
  Sparkles,
  Share2,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  end?: boolean;
}

const mainNavItems: NavItem[] = [
  { label: 'Overview', icon: <Map size={17} />, path: '', end: true },
  { label: 'Itinerary', icon: <CalendarDays size={17} />, path: 'itinerary' },
  { label: 'Activities', icon: <Activity size={17} />, path: 'activities' },
  { label: 'Budget', icon: <Wallet size={17} />, path: 'budget' },
  { label: 'Timeline', icon: <Clock size={17} />, path: 'timeline' },
];

interface WorkspaceRailProps {
  onCopilotOpen?: () => void;
  onShareOpen?: () => void;
}

export function WorkspaceRail({ onCopilotOpen, onShareOpen }: WorkspaceRailProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const basePath = `/trips/${tripId}`;

  return (
    <nav className="w-60 border-r border-border-soft bg-surface/80 shrink-0 hidden lg:flex flex-col pt-6 pb-5 sticky top-16 self-start max-h-[calc(100vh-64px)] overflow-y-auto route-scroll">
      {/* Section label */}
      <div className="px-5 mb-4">
        <span className="text-label text-ink-muted">Current trip</span>
      </div>

      {/* Main navigation */}
      <div className="flex flex-col gap-0.5 px-3">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={`${basePath}/${item.path}`}
            end={item.end}
            className={({ isActive }) =>
              [
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-radius-sm text-body-sm no-underline transition-all',
                isActive
                  ? 'bg-accent-50 font-semibold text-accent-600'
                  : 'text-ink-secondary hover:bg-surface-muted hover:text-ink',
              ].join(' ')
            }
            style={{ transitionDuration: 'var(--duration-micro)' }}
          >
            {({ isActive }) => (
              <>
                {/* 3px left accent marker */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-accent-600" />
                )}
                <span className={`shrink-0 ${isActive ? 'text-accent-600' : 'text-ink-muted group-hover:text-ink-secondary'} transition-colors`} style={{ transitionDuration: 'var(--duration-micro)' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Utilities pinned toward the bottom */}
      <div className="mt-auto">
        <div className="h-px bg-border-soft mx-5 my-4" />
        <div className="flex flex-col gap-0.5 px-3">
          <button
            onClick={onCopilotOpen}
            className="flex items-center gap-3 px-3 py-2.5 rounded-radius-sm text-body-sm text-ink-secondary hover:bg-surface-muted hover:text-accent-600 transition-all cursor-pointer bg-transparent border-none w-full text-left focus-ring"
            style={{ transitionDuration: 'var(--duration-micro)' }}
          >
            <span className="shrink-0 text-accent-600"><Sparkles size={17} /></span>
            <span>Ask Copilot</span>
          </button>

          <button
            onClick={onShareOpen}
            className="flex items-center gap-3 px-3 py-2.5 rounded-radius-sm text-body-sm text-ink-secondary hover:bg-surface-muted hover:text-ink transition-all cursor-pointer bg-transparent border-none w-full text-left focus-ring"
            style={{ transitionDuration: 'var(--duration-micro)' }}
          >
            <span className="shrink-0 text-ink-muted"><Share2 size={17} /></span>
            <span>Share Trip</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
