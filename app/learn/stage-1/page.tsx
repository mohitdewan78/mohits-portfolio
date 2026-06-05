import Link from "next/link";
import type { Metadata } from "next";
import { stage1Modules, type Resource } from "@/lib/learn";
import { trailTiers } from "@/lib/site";

const tier = trailTiers.find((t) => t.id === "stage-1")!;

export const metadata: Metadata = {
  title: `Stage 1 — ${tier.title}`,
  description: tier.blurb,
};

// Tiny icon for each resource format.
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
          <p className="text-sm text-ink-soft mt-1 leading-relaxed">
            {r.blurb}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Stage1Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-24">
      <header className="mb-16 pb-12 border-b hairline">
        <p className="font-display italic text-ink-muted mb-4 text-sm">
          <Link href="/learn" className="hover:text-terracotta">
            ← Back to the playbook
          </Link>
        </p>
        <p className="font-display italic text-terracotta mb-3 text-sm tracking-widest uppercase">
          Stage 01 · {tier.eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-[1.05]">
          {tier.title}
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
          {tier.blurb}
        </p>
      </header>

      <ol className="space-y-20">
        {stage1Modules.map((m, i) => (
          <li key={m.id} id={m.id}>
            <div className="flex items-baseline gap-6 mb-6">
              <span className="font-display text-2xl sm:text-3xl text-terracotta tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink leading-tight">
                {m.title}
              </h2>
            </div>

            <div className="ml-0 sm:ml-[3.5rem]">
              <p className="text-ink-soft leading-relaxed text-lg">{m.note}</p>

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
            </div>
          </li>
        ))}
      </ol>

      <footer className="mt-24 pt-10 border-t hairline">
        <Link
          href="/learn"
          className="text-sm text-ink-muted hover:text-terracotta underline underline-offset-2"
        >
          ← Back to the playbook
        </Link>
      </footer>
    </div>
  );
}
