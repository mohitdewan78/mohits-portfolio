import Link from "next/link";
import type { Metadata } from "next";
import { trailTiers, trailIntro } from "@/lib/site";
import {
  stage1Modules,
  stage2Modules,
  stage3Modules,
  type Level,
} from "@/lib/learn";
import { PreferenceBar } from "@/components/PreferenceBar";
import { StageProgress } from "@/components/StageProgress";
import { StageRecommendedBadge } from "@/components/RecommendedBadge";
import { ResetProgress } from "@/components/ResetProgress";
import { TrailGuide } from "@/components/TrailGuide";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Learn",
  description: trailIntro,
};

// Stage 1 has full modules; Stages 2 & 3 are placeholders for now.
const stageModuleIds: Record<string, string[]> = {
  "stage-1": stage1Modules.map((m) => m.id),
  "stage-2": stage2Modules.map((m) => m.id),
  "stage-3": stage3Modules.map((m) => m.id),
};

export default function LearnHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-24 pb-20">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-20 lg:items-start">

        {/* Mobile: full header. Desktop: sticky sidebar. */}
        <header className="mb-12 lg:sticky lg:top-20 lg:mb-0">
          <p className="font-display italic text-ink-muted mb-4 text-sm">
            The playbook
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-3xl tracking-tight leading-[1.05] lg:leading-[1.15]">
            Field notes from building with AI.
          </h1>
          <p className="mt-6 lg:mt-4 text-lg lg:text-sm text-ink-soft leading-relaxed">
            {trailIntro}
          </p>
        </header>

        <div>
          <PreferenceBar />

          <TrailGuide />

          <ol className="space-y-10">
            {trailTiers.map((tier, i) => {
              const isLive = tier.status === "live";
              const stageNumber = String(i + 1).padStart(2, "0");
              const moduleIds = stageModuleIds[tier.id] ?? [];

              const inner = (
                <>
                  <div className="flex items-baseline gap-6 mb-3 flex-wrap">
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
                    <div className="flex items-center gap-2 shrink-0">
                      <StageRecommendedBadge
                        stageLevel={tier.recommendedLevel as Level}
                      />
                      {!isLive && (
                        <span className="text-xs uppercase tracking-wider text-ink-muted border hairline px-2 py-0.5">
                          In progress
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-ink-soft leading-relaxed ml-0 sm:ml-[3.5rem]">
                    {tier.blurb}
                  </p>
                  {moduleIds.length > 0 && (
                    <div className="ml-0 sm:ml-[3.5rem] mt-3">
                      <StageProgress moduleIds={moduleIds} variant="inline" />
                    </div>
                  )}
                </>
              );

              return (
                <Reveal
                  key={tier.id}
                  as="li"
                  delay={i * 100}
                  className="border-t hairline pt-8"
                >
                  {isLive ? (
                    <Link href={`/learn/${tier.id}`} className="group block">
                      {inner}
                    </Link>
                  ) : (
                    <div className="opacity-60">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </ol>

          <div className="mt-16 pt-8 border-t hairline">
            <ResetProgress />
          </div>
        </div>

      </div>
    </div>
  );
}
