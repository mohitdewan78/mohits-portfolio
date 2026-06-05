"use client";

import Link from "next/link";
import type { Module, Resource } from "@/lib/learn";
import { useLearnPrefs } from "@/components/LearnPrefsProvider";
import { ModuleCheckbox } from "@/components/ModuleCheckbox";
import { ModuleMatchedBadge } from "@/components/RecommendedBadge";

function formatIcon(format: Resource["format"]): string {
  switch (format) {
    case "course":
      return "🎓";
    case "video":
      return "🎬";
    case "paper":
      return "📄";
    case "newsletter":
      return "📬";
    case "docs":
      return "📘";
    case "repo":
      return "💾";
    case "post":
      return "✏️";
  }
}

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      className="group block border hairline px-5 py-4 hover:border-terracotta transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none mt-0.5" aria-hidden>
          {formatIcon(r.format)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-ink-muted mb-1">
            {r.source} · {r.time}
          </p>
          <p className="font-display text-lg text-ink group-hover:text-terracotta transition-colors leading-snug">
            {r.label} ↗
          </p>
          <p className="text-sm text-ink-soft mt-1 leading-relaxed">{r.blurb}</p>
        </div>
      </div>
    </a>
  );
}

/**
 * Generic learning-trail module list. Filters by persona + matchedOnly
 * pref; tracks per-module completion via LearnPrefsProvider context.
 */
export function ModuleList({ modules }: { modules: Module[] }) {
  const { persona, matchedOnly, completed, hydrated } = useLearnPrefs();

  const visible = modules.filter((m) => {
    if (!hydrated) return true;
    if (matchedOnly && persona && !m.personas.includes(persona)) return false;
    return true;
  });

  const hiddenCount = modules.length - visible.length;

  return (
    <>
      {hiddenCount > 0 && (
        <p className="mb-8 text-sm italic text-ink-muted">
          Showing {visible.length} module{visible.length === 1 ? "" : "s"}{" "}
          recommended for you. {hiddenCount} hidden.
        </p>
      )}

      <ol className="space-y-20">
        {visible.map((m) => {
          const i = modules.indexOf(m);
          const isDone = hydrated && completed.includes(m.id);
          return (
            <li key={m.id} id={m.id}>
              <div className="flex items-baseline gap-6 mb-6 flex-wrap">
                <span
                  className={
                    "font-display text-2xl sm:text-3xl tabular-nums shrink-0 transition-colors " +
                    (isDone ? "text-ink-muted" : "text-terracotta")
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className={
                    "font-display text-2xl sm:text-3xl tracking-tight leading-tight flex-1 min-w-0 " +
                    (isDone
                      ? "text-ink-muted line-through decoration-1"
                      : "text-ink")
                  }
                >
                  {m.title}
                </h2>
                <ModuleMatchedBadge personas={m.personas} />
              </div>

              <div className="ml-0 sm:ml-[3.5rem]">
                <p className="text-ink-soft leading-relaxed text-lg">
                  {m.note}
                </p>

                {m.linkedProject && (
                  <p className="mt-4">
                    <Link
                      href={`/work/${m.linkedProject.slug}`}
                      className="inline-block text-sm italic font-display text-terracotta hover:underline underline-offset-2"
                    >
                      → {m.linkedProject.label}
                    </Link>
                  </p>
                )}

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wider text-ink-muted mb-3">
                    Resources
                  </p>
                  <ul className="space-y-3">
                    {m.resources.map((r) => (
                      <li key={r.url}>
                        <ResourceCard r={r} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <ModuleCheckbox moduleId={m.id} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
