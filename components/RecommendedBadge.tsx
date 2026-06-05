"use client";

import { useLearnPrefs } from "@/components/LearnPrefsProvider";
import type { Level, Persona } from "@/lib/learn";

/** Shows when the user's chosen level matches the stage's recommendedLevel. */
export function StageRecommendedBadge({ stageLevel }: { stageLevel: Level }) {
  const { level, hydrated } = useLearnPrefs();
  if (!hydrated || level !== stageLevel) return null;
  return (
    <span className="text-xs uppercase tracking-wider text-terracotta border border-terracotta/40 px-2 py-0.5">
      Recommended for you
    </span>
  );
}

/** Shows when the user's persona is in the module's persona list. */
export function ModuleMatchedBadge({ personas }: { personas: Persona[] }) {
  const { persona, hydrated } = useLearnPrefs();
  if (!hydrated || !persona || !personas.includes(persona)) return null;
  return (
    <span className="text-xs uppercase tracking-wider text-terracotta border border-terracotta/40 px-2 py-0.5">
      ★ For you
    </span>
  );
}
