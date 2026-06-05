"use client";

import { useLearnPrefs } from "@/components/LearnPrefsProvider";

export function ModuleCheckbox({ moduleId }: { moduleId: string }) {
  const { completed, toggleComplete, hydrated } = useLearnPrefs();
  const checked = hydrated && completed.includes(moduleId);

  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
      <span
        aria-hidden
        className={
          "inline-block h-5 w-5 border-2 transition-colors " +
          (checked
            ? "bg-terracotta border-terracotta"
            : "border-ink-muted group-hover:border-terracotta")
        }
      >
        {checked && (
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-full w-full text-paper"
          >
            <path
              d="M3 8.5l3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => toggleComplete(moduleId)}
        aria-label={`Mark module ${moduleId} as ${checked ? "incomplete" : "complete"}`}
      />
      <span className="text-sm text-ink-soft group-hover:text-ink">
        {checked ? "Done" : "Mark done"}
      </span>
    </label>
  );
}
