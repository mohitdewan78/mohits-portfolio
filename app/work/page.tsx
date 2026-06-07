import Link from "next/link";
import type { Metadata } from "next";
import { loadAllMetas } from "@/lib/work";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies of personal AI projects — what I built, why, and what I learned.",
};

export default async function WorkIndex() {
  const items = await loadAllMetas();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-24 pb-20">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-20 lg:items-start">

        {/* Mobile: full header. Desktop: sticky sidebar. */}
        <header className="mb-12 lg:sticky lg:top-20 lg:mb-0">
          <p className="font-display italic text-ink-muted mb-4 text-sm">
            Field notes from building
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-3xl tracking-tight leading-[1.05] lg:leading-[1.15]">
            Personal AI projects.
          </h1>
          <p className="mt-6 lg:mt-4 text-lg lg:text-sm text-ink-soft leading-relaxed">
            Four side-builds, written up so the next person can borrow the
            decisions. Each one starts with the hook that pulled me in and ends
            with what I&apos;d build next.
          </p>
        </header>

        <ol className="space-y-12">
          {items.map((item, i) => (
            <Reveal
              key={item.slug}
              as="li"
              delay={i * 100}
              className="border-t hairline pt-8"
            >
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
            </Reveal>
          ))}
        </ol>

      </div>
    </div>
  );
}
