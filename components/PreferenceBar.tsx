"use client";

import { useLearnPrefs } from "@/components/LearnPrefsProvider";
import { LEVELS, PERSONAS, type Level, type Persona } from "@/lib/learn";

/**
 * Sticky-ish preference bar shown above the trail content.
 * Two segmented controls: level (which stage) + persona (which modules).
 * Both default to "no selection" — the trail still works without them.
 */
export function PreferenceBar() {
  const { level, persona, setLevel, setPersona, hydrated } = useLearnPrefs();

  return (
    <section
      aria-label="Personalize the trail"
      className="border hairline bg-paper/40 px-5 py-5 sm:px-6 mb-12"
    >
      <p className="font-display italic text-ink-muted text-sm mb-4">
        Personalize the trail
        <span className="ml-2 text-xs not-italic font-sans">
          (saved locally, never sent anywhere)
        </span>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-muted mb-2">
            Your level
          </p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <Pill
                key={l.id}
                active={hydrated && level === l.id}
                onClick={() =>
                  setLevel(level === l.id ? undefined : (l.id as Level))
                }
                title={l.blurb}
              >
                {l.label}
              </Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-ink-muted mb-2">
            You are
          </p>
          <div className="flex flex-wrap gap-2">
            {PERSONAS.map((p) => (
              <Pill
                key={p.id}
                active={hydrated && persona === p.id}
                onClick={() =>
                  setPersona(persona === p.id ? undefined : (p.id as Persona))
                }
                title={p.blurb}
              >
                {p.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={
        "text-sm px-3 py-1.5 border transition-colors " +
        (active
          ? "bg-ink text-paper border-ink"
          : "border-rule text-ink-soft hover:border-terracotta hover:text-terracotta")
      }
    >
      {children}
    </button>
  );
}
