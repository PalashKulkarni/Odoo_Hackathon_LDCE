import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  message?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "We couldn’t load this part of your journey.",
  description = "Your trip is still safe. Try again in a moment.",
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      className="
        fade-in
        flex min-h-[20rem] flex-col items-center justify-center
        border-y border-border-soft
        bg-surface
        px-6 py-16
        text-center
        sm:px-8
      "
      role="alert"
      aria-live="polite"
    >
      <div
        className="
          mb-6
          flex h-14 w-14 items-center justify-center
          rounded-full
          bg-error-bg
          text-error
        "
        aria-hidden="true"
      >
        <AlertTriangle size={22} strokeWidth={1.8} />
      </div>

      <p className="mb-3 text-label text-error">
        Unable to continue
      </p>

      <h2 className="max-w-lg text-h3 text-ink">
        {message}
      </h2>

      <p className="mt-2 max-w-md text-body-sm text-ink-secondary">
        {description}
      </p>

      {onRetry && (
        <div className="mt-7">
          <Button variant="secondary" onClick={onRetry}>
            <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
            Try again
          </Button>
        </div>
      )}
    </section>
  );
}