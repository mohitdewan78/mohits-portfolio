import Link from "next/link";
import type { Metadata } from "next";
import { trailTiers, trailIntro } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn",
  description: trailIntro,
};

export default function LearnHub() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-20">
      <header className="mb-16">
        <p className="font-display italic text-ink-muted mb-4 text-sm">
          The playbook
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-[1.05]">
          Field notes from building with AI.
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
          {trailIntro}
        </p>
      </header>

      <ol className="space-y-10">
        {trailTiers.map((tier, i) => {
          const isLive = tier.status === "live";
          const stageNumber = String(i + 1).padStart(2, "0");

          const inner = (
            <>
              <div className="flex items-baseline gap-6 mb-3">
                <span className="font-display text-2xl sm:text-3xl text-terracotta tabular-nums shrink-0">
                  {stageNumber}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display italic text-ink-muted text-sm tracking-wide uppercase mb-1">
                    {tier.eyebrow}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink group-hover:text-terracotta transition-colors">
                    {tier.title}
                  </h2>
                </div>
                {!isLive && (
                  <span className="text-xs uppercase tracking-wider text-ink-muted border hairline px-2 py-0.5 shrink-0">
                    In progress
                  </span>
                )}
              </div>
              <p className="text-ink-soft leading-relaxed ml-0 sm:ml-[3.5rem]">
                {tier.blurb}
              </p>
            </>
          );

          return (
            <li key={tier.id} className="border-t hairline pt-8">
              {isLive ? (
                <Link href={`/learn/${tier.id}`} className="group block">
                  {inner}
                </Link>
              ) : (
                <div className="opacity-60">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
