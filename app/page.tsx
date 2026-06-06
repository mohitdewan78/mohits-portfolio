import Link from "next/link";
import { site } from "@/lib/site";
import { Opinions } from "@/components/Opinions";
import { CoffeeChatCard } from "@/components/CoffeeChatCard";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Block 1 — Hero */}
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-24">
        <p className="font-display italic text-ink-muted mb-6 text-base">
          Field notes from building with AI
        </p>
        <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-4xl">
          {site.positioningLine}
        </h1>
        <p className="mt-8 max-w-2xl text-lg sm:text-xl text-ink-soft leading-relaxed">
          {site.positioningSub}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="inline-flex items-center px-5 py-3 bg-ink text-paper text-sm tracking-wide hover:bg-terracotta transition-colors rounded-md"
          >
            View work
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center px-5 py-3 bg-ink text-paper text-sm tracking-wide hover:bg-terracotta transition-colors rounded-md"
          >
            Start learning
          </Link>
        </div>
      </section>

      {/* Block 2 — Opinions */}
      <Reveal>
        <Opinions />
      </Reveal>

      {/* Block 3 — Coffee chat */}
      <Reveal>
        <CoffeeChatCard />
      </Reveal>
    </div>
  );
}
