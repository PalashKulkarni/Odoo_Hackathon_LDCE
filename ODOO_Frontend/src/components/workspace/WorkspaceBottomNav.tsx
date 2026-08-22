/**
 * WorkspaceBottomNav — mobile bottom navigation for trip workspace.
 *
 * Per UI_UX_BLUEPRINT §4:
 * - 64px height + safe-area inset
 * - Overview / Itinerary / Budget / Timeline
 * - icon + short label + active accent marker; AI and Share stay contextual
 */

import { NavLink, useParams } from 'react-router-dom';
import { Map, CalendarDays, Wallet, Clock } from 'lucide-react';

const mobileNavItems = [
  { label: 'Overview', icon: <Map size={19} />, path: '', end: true },
  { label: 'Itinerary', icon: <CalendarDays size={19} />, path: 'itinerary' },
  { label: 'Budget', icon: <Wallet size={19} />, path: 'budget' },
  { label: 'Timeline', icon: <Clock size={19} />, path: 'timeline' },
];

export function WorkspaceBottomNav() {
  const { tripId } = useParams<{ tripId: string }>();
  const basePath = `/trips/${tripId}`;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-soft lg:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        zIndex: 40,
        boxShadow: '0 -4px 18px rgba(28, 27, 25, 0.05)',
      }}
    >
      <div className="flex items-stretch justify-around h-16">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={`${basePath}/${item.path}`}
            end={item.end}
            className={({ isActive }) =>
              [
                'relative flex flex-col items-center justify-center gap-1 px-3 rounded-radius-sm no-underline transition-colors',
                isActive ? 'text-accent-600' : 'text-ink-muted hover:text-ink-secondary',
              ].join(' ')
            }
            style={{ transitionDuration: 'var(--duration-micro)' }}
          >
            {({ isActive }) => (
              <>
                {/* Active accent marker */}
                {isActive && (
                  <span className="absolute top-0 w-8 h-[2.5px] rounded-b-full bg-accent-600" />
                )}
                {item.icon}
                <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
