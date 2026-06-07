import Link from "next/link";
import type { Metadata } from "next";
import { stage3Modules } from "@/lib/learn";
import { trailTiers } from "@/lib/site";
import { PreferenceBar } from "@/components/PreferenceBar";
import { StageProgress } from "@/components/StageProgress";
import { MatchedOnlyToggle } from "@/components/MatchedOnlyToggle";
import { ModuleList } from "@/components/ModuleList";
import { ResetProgress } from "@/components/ResetProgress";

const tier = trailTiers.find((t) => t.id === "stage-3")!;
const moduleIds = stage3Modules.map((m) => m.id);

export const metadata: Metadata = {
  title: `Stage 3 — ${tier.title}`,
  description: tier.blurb,
};

export default function Stage3Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-20 pb-24">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-20 lg:items-start">

        {/* Mobile: full header. Desktop: sticky sidebar. */}
        <header className="mb-12 pb-12 border-b hairline lg:sticky lg:top-20 lg:border-b-0 lg:pb-0 lg:mb-0">
          <p className="font-display italic text-ink-muted mb-4 text-sm">
            <Link href="/learn" className="hover:text-terracotta">
              ← Back to the playbook
            </Link>
          </p>
          <p className="font-display italic text-terracotta mb-3 text-sm tracking-widest uppercase">
            Stage 03 · {tier.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-2xl tracking-tight leading-[1.05] lg:leading-[1.15]">
            {tier.title}
          </h1>
          <p className="mt-6 lg:mt-3 text-lg lg:text-sm text-ink-soft leading-relaxed">
            {tier.blurb}
          </p>
        </header>

        <div>
          <PreferenceBar />

          <StageProgress moduleIds={moduleIds} variant="block" />

          <div className="mb-12">
            <MatchedOnlyToggle />
          </div>

          <ModuleList modules={stage3Modules} />

          <footer className="mt-24 pt-10 border-t hairline">
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <Link
                href="/learn"
                className="text-sm text-ink-muted hover:text-terracotta underline underline-offset-2"
              >
                ← Back to the playbook
              </Link>
              <ResetProgress />
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}
