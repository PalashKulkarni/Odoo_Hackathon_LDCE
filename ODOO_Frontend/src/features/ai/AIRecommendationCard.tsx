import type { AIRecommendation } from '@/types';
import { Button } from '@/components/ui/Button';
import { Sparkles, Check, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onApply: (rec: AIRecommendation) => void;
  onDismiss: (rec: AIRecommendation) => void;
}

/**
 * AIRecommendationCard — UI_UX_BLUEPRINT §6.10 & §8.
 * Visually separates AI suggestions from committed trip data:
 * accent-washed header, before/after impact preview, explicit review gate.
 */
export function AIRecommendationCard({
  recommendation,
  onApply,
  onDismiss,
}: AIRecommendationCardProps) {
  const [reviewing, setReviewing] = useState(false);
  const [applied, setApplied] = useState(recommendation.status === 'accepted');

  const handleApply = () => {
    setApplied(true);
    onApply(recommendation);
  };

  return (
    <div className="rise bg-surface border border-accent-500/25 rounded-radius-md overflow-hidden my-3 text-left shadow-default">
      {/* Accent-washed header strip */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-accent-50 border-b border-accent-500/15">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-accent-600 uppercase">
          <Sparkles size={12} />
          AI Suggestion
        </span>
        <span className="text-caption text-ink-muted capitalize">{recommendation.type}</span>
      </div>

      <div className="p-4">
        <h4 className="text-h4 text-ink mb-1 leading-snug">{recommendation.title}</h4>
        <p className="text-body-sm text-ink-secondary mb-3.5 leading-relaxed">
          {recommendation.description}
        </p>

        {/* Before / After impact preview */}
        {recommendation.impact && (
          <div className="mb-4 border border-border-soft rounded-radius-sm overflow-hidden">
            <div className="flex items-start gap-2 px-3 py-2 bg-surface-muted text-caption text-ink-muted">
              <span className="font-semibold uppercase tracking-wide w-12 shrink-0 pt-px">Before</span>
              <span>{recommendation.impact.before}</span>
            </div>
            <div className="flex items-start gap-2 px-3 py-2 bg-surface text-accent-600 font-medium text-caption border-t border-border-soft">
              <ArrowRight size={13} className="shrink-0 mt-px" />
              <span className="font-semibold uppercase tracking-wide w-9 shrink-0">After</span>
              <span className="text-body-sm">{recommendation.impact.after}</span>
            </div>
          </div>
        )}

        {/* Actions — explicit review gate */}
        {applied ? (
          <div className="inline-flex items-center gap-1.5 h-8 px-3 rounded-radius-full bg-success-bg text-success text-body-sm font-medium">
            <Check size={15} /> Applied to trip
          </div>
        ) : reviewing ? (
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleApply} icon={<Check size={15} />}>
              Apply changes
            </Button>
            <Button size="sm" variant="tertiary" onClick={() => setReviewing(false)}>
              Back
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setReviewing(true)}>
              Review
            </Button>
            <Button size="sm" variant="tertiary" onClick={() => onDismiss(recommendation)} icon={<X size={14} />}>
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
