"use client";

import { useLearnPrefs } from "@/components/LearnPrefsProvider";

export function ResetProgress() {
  const { reset, completed, level, persona, hydrated } = useLearnPrefs();
  const hasAnything =
    hydrated && (completed.length > 0 || !!level || !!persona);

  if (!hasAnything) return null;

  return (
    <button
      type="button"
      onClick={() => {
        if (
          window.confirm(
            "Reset your trail preferences and progress? This only affects this browser.",
          )
        ) {
          reset();
        }
      }}
      className="text-xs uppercase tracking-wider text-ink-muted hover:text-terracotta underline underline-offset-2"
    >
      Reset preferences & progress
    </button>
  );
}
