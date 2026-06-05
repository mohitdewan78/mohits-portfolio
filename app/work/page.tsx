import Link from "next/link";
import type { Metadata } from "next";
import { loadAllMetas } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies of personal AI projects — what I built, why, and what I learned.",
};

export default async function WorkIndex() {
  const items = await loadAllMetas();

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-20">
      <header className="mb-16">
        <p className="font-display italic text-ink-muted mb-4 text-sm">
          Field notes from building
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-[1.05]">
          Personal AI projects.
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
          Four side-builds, written up so the next person can borrow the
          decisions. Each one starts with the hook that pulled me in and ends
          with what I&apos;d build next.
        </p>
      </header>

      <ol className="space-y-12">
        {items.map((item) => (
          <li key={item.slug} className="border-t hairline pt-8">
            <Link
              href={`/work/${item.slug}`}
              className="group block"
            >
              <div className="flex items-baseline justify-between gap-6 mb-3">
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink group-hover:text-terracotta transition-colors">
                  {item.title}
                </h2>
                {item.status === "in-progress" && (
                  <span className="text-xs uppercase tracking-wider text-ink-muted shrink-0">
                    In progress
                  </span>
                )}
              </div>
              <p className="font-display italic text-ink-soft text-lg leading-snug">
                {item.hook}
              </p>
              <p className="mt-3 text-ink-soft leading-relaxed">
                {item.oneLine}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs uppercase tracking-wider text-ink-muted border hairline px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
