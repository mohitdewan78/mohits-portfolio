"use client";

import { useLearnPrefs } from "@/components/LearnPrefsProvider";

/** Tiny progress bar + count for a given stage's module IDs. */
export function StageProgress({
  moduleIds,
  variant = "inline",
}: {
  moduleIds: string[];
  variant?: "inline" | "block";
}) {
  const { completed, hydrated } = useLearnPrefs();
  const done = hydrated
    ? moduleIds.filter((id) => completed.includes(id)).length
    : 0;
  const total = moduleIds.length;
  const pct = total === 0 ? 0 : (done / total) * 100;

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
        <span className="w-16 h-1 bg-rule/60 relative overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 bg-terracotta transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </span>
        <span className="tabular-nums">
          {done}/{total}
        </span>
      </span>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs uppercase tracking-wider text-ink-muted">
          Your progress
        </p>
        <p className="text-sm font-display italic text-ink-soft tabular-nums">
          {done} of {total} modules done
        </p>
      </div>
      <div className="w-full h-1.5 bg-rule/60 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-terracotta transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
