import Link from "next/link";
import type { Metadata } from "next";
import { stage1Modules } from "@/lib/learn";
import { trailTiers } from "@/lib/site";
import { PreferenceBar } from "@/components/PreferenceBar";
import { StageProgress } from "@/components/StageProgress";
import { MatchedOnlyToggle } from "@/components/MatchedOnlyToggle";
import { Stage1ModuleList } from "@/components/Stage1ModuleList";
import { ResetProgress } from "@/components/ResetProgress";

const tier = trailTiers.find((t) => t.id === "stage-1")!;
const moduleIds = stage1Modules.map((m) => m.id);

export const metadata: Metadata = {
  title: `Stage 1 — ${tier.title}`,
  description: tier.blurb,
};

export default function Stage1Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-24">
      <header className="mb-12 pb-12 border-b hairline">
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

      <PreferenceBar />

      <StageProgress moduleIds={moduleIds} variant="block" />

      <div className="mb-12">
        <MatchedOnlyToggle />
      </div>

      <Stage1ModuleList />

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
  );
}
