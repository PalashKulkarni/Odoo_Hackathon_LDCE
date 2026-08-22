import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  visual?: "route";
}

function RoutePlaceholder() {
  return (
    <div
      className="mb-8 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-3.5 w-3.5 rounded-full border-2 border-border-strong bg-surface" />

      <div className="relative h-px w-14">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-border-strong" />
      </div>

      <div className="h-3.5 w-3.5 rounded-full border-2 border-border-strong bg-surface" />

      <div className="relative h-px w-14">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-border-strong" />
      </div>

      <div className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute h-4 w-4 rounded-full border border-accent-200" />
        <span className="h-2 w-2 rounded-full bg-accent-500" />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  visual,
}: EmptyStateProps) {
  const hasAction = Boolean(actionLabel && onAction);

  return (
    <section
      className="
        rise
        flex min-h-[22rem] flex-col items-center justify-center
        border-y border-border-soft
        bg-surface
        px-6 py-16
        text-center
        sm:px-8 sm:py-20
      "
      aria-labelledby="empty-state-title"
    >
      <div className="flex max-w-xl flex-col items-center">
        {visual === "route" ? (
          <RoutePlaceholder />
        ) : icon ? (
          <div
            className="
              mb-7
              flex h-14 w-14 items-center justify-center
              rounded-full
              border border-border-default
              bg-surface-muted
              text-accent-600
            "
            aria-hidden="true"
          >
            {icon}
          </div>
        ) : null}

        <p className="mb-3 text-label text-ink-muted">
          Nothing here yet
        </p>

        <h2 id="empty-state-title" className="text-page-title text-ink">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-md text-body-lg text-ink-secondary">
            {description}
          </p>
        )}

        {hasAction && (
          <div className="mt-8">
            <Button onClick={onAction}>{actionLabel}</Button>
          </div>
        )}
      </div>
    </section>
  );
}