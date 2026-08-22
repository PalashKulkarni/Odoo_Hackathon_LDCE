import { useOutletContext, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { WorkspaceContextType } from '@/layouts/TripWorkspaceLayout';
import type { BudgetSummary, BudgetCategory } from '@/types';
import { mockGetBudget } from '@/lib/mock/services';
import { ErrorState } from '@/components/states/ErrorState';

export function BudgetPage() {
  const { trip, stops } = useOutletContext<WorkspaceContextType>();
  const { tripId } = useParams();

  const { data: initialBudget, isLoading, error, refetch } = useQuery<BudgetSummary | null>({
    queryKey: ['budget', tripId],
    queryFn: () => mockGetBudget(tripId!),
    enabled: !!tripId,
  });

  if (!trip) return null;

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-6xl" aria-busy="true">
        <div>
          <div className="skeleton h-3 w-40 mb-4" />
          <div className="skeleton h-14 w-72 mb-3" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-16" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message="Couldn't load budget data." onRetry={() => refetch()} />;
  }

  // Live activities cost from current stops
  const calculatedActivitiesCost = stops.reduce((total, stop) => {
    return (
      total +
      (stop.activities?.reduce((actTotal, sa) => actTotal + (sa.activity.estimatedCost || 0), 0) || 0)
    );
  }, 0);

  let budget: BudgetSummary | null = null;
  if (initialBudget) {
    const accommodation = 18000;
    const travel = 14000;
    const food = 6800;
    const activitiesCost = calculatedActivitiesCost > 0 ? calculatedActivitiesCost : 9800;
    const total = accommodation + travel + food + activitiesCost;

    const categories: BudgetCategory[] = [
      { name: 'Accommodation', amount: accommodation, percentage: Math.round((accommodation / total) * 100) },
      { name: 'Travel & Transport', amount: travel, percentage: Math.round((travel / total) * 100) },
      { name: 'Activities & Experiences', amount: activitiesCost, percentage: Math.round((activitiesCost / total) * 100) },
      { name: 'Food & Dining', amount: food, percentage: Math.round((food / total) * 100) },
    ];

    budget = {
      tripId: trip.id,
      totalEstimated: total,
      currency: initialBudget.currency || '¥',
      categories,
    };
  } else if (calculatedActivitiesCost > 0) {
    budget = {
      tripId: trip.id,
      totalEstimated: calculatedActivitiesCost,
      currency: '¥',
      categories: [
        { name: 'Activities & Experiences', amount: calculatedActivitiesCost, percentage: 100 },
      ],
    };
  }

  if (!budget || budget.categories.length === 0) {
    return (
      <div className="rise py-20 px-8 text-center border border-dashed border-border-strong rounded-radius-lg bg-surface/60">
        <h3 className="text-h3 font-display text-ink mb-1.5">No cost information yet.</h3>
        <p className="text-body-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
          The budget takes shape automatically as activities with estimated costs are scheduled.
        </p>
      </div>
    );
  }

  const maxAmount = Math.max(...budget.categories.map((c) => c.amount));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-14 max-w-6xl">
      {/* Summary — left */}
      <div className="rise space-y-9">
        {/* Large editorial total */}
        <div className="pb-8 border-b border-border-default">
          <span className="text-label text-accent-600">Estimated trip cost</span>
          <h2 className="font-display text-ink mt-3 leading-none tabular-nums" style={{ fontSize: 'clamp(44px, 6vw, 68px)' }}>
            <span className="align-top mr-1" style={{ fontSize: '0.55em' }}>{budget.currency}</span>
            {budget.totalEstimated.toLocaleString()}
          </h2>
          <p className="text-body-sm text-ink-secondary mt-3">
            Calculated across planned accommodation, transit, and {stops.length}{' '}
            {stops.length === 1 ? 'destination' : 'destinations'}.
          </p>
        </div>

        {/* Category allocation */}
        <section>
          <h3 className="text-h4 text-ink mb-5">Where the money goes</h3>
          <div className="flex flex-col border-t border-border-default">
            {budget.categories.map((category, i) => (
              <div key={category.name} className="py-5 border-b border-border-soft rise" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="flex items-baseline justify-between gap-4 mb-2.5">
                  <span className="text-body-sm font-semibold text-ink">{category.name}</span>
                  <span className="text-body-sm font-semibold tabular-nums text-ink shrink-0">
                    {budget.currency}{category.amount.toLocaleString()}
                  </span>
                </div>
                <div className="h-[7px] bg-surface-strong rounded-radius-full overflow-hidden">
                  <div
                    className="h-full bg-accent-600 rounded-radius-full transition-all"
                    style={{
                      width: `${Math.max(4, (category.amount / maxAmount) * 100)}%`,
                      transitionDuration: 'var(--duration-panel)',
                    }}
                  />
                </div>
                <div className="mt-2 text-caption text-ink-muted tabular-nums">
                  {category.percentage}% of estimated total
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Ledger — right */}
      <aside className="lg:pt-2 rise" style={{ animationDelay: '150ms' }}>
        <div className="bg-surface border border-border-default rounded-radius-xl p-6 shadow-default sticky top-24">
          <h3 className="text-label text-accent-600 mb-5">Journey total</h3>
          <div>
            {budget.categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between py-3 border-b border-border-soft"
              >
                <span className="text-body-sm text-ink-secondary">{cat.name}</span>
                <span className="text-body-sm font-semibold tabular-nums text-ink">
                  {budget.currency}{cat.amount.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 mt-1 border-t-2 border-ink">
              <span className="text-body-sm font-semibold text-ink uppercase tracking-wide text-label">Total</span>
              <span className="font-display text-trip-title text-ink tabular-nums" style={{ fontSize: 26 }}>
                {budget.currency}{budget.totalEstimated.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-caption text-ink-muted mt-4 leading-relaxed">
            Estimates only — refine by adjusting activity costs.
          </p>
        </div>
      </aside>
    </div>
  );
}
