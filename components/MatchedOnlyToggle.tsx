"use client";

import { useLearnPrefs } from "@/components/LearnPrefsProvider";

export function MatchedOnlyToggle() {
  const { matchedOnly, setMatchedOnly, persona, hydrated } = useLearnPrefs();
  const disabled = !hydrated || !persona;

  return (
    <label
      className={
        "inline-flex items-center gap-2 text-sm cursor-pointer select-none " +
        (disabled ? "opacity-50 cursor-not-allowed" : "")
      }
      title={disabled ? "Pick a persona above to enable this filter" : undefined}
    >
      <input
        type="checkbox"
        className="h-4 w-4 accent-terracotta"
        checked={matchedOnly}
        disabled={disabled}
        onChange={(e) => setMatchedOnly(e.target.checked)}
      />
      <span className="text-ink-soft">Show only modules recommended for me</span>
    </label>
  );
}
