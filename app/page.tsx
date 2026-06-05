import Link from "next/link";
import { site, selectedWork } from "@/lib/site";
import { Opinions } from "@/components/Opinions";
import { ProjectCard } from "@/components/ProjectCard";
import { CoffeeChatCard } from "@/components/CoffeeChatCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Block 1 — Hero */}
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-24">
        <p className="font-display italic text-terracotta mb-6 text-sm tracking-widest uppercase">
          {site.tagline}
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
            className="inline-flex items-center px-5 py-3 bg-ink text-paper text-sm tracking-wide hover:bg-terracotta transition-colors"
          >
            View work
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center px-5 py-3 border hairline text-sm tracking-wide hover:bg-ink hover:text-paper transition-colors"
          >
            Start the trail
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center px-5 py-3 text-sm tracking-wide text-ink-soft hover:text-terracotta transition-colors"
          >
            Email me
          </a>
        </div>
      </section>

      {/* Block 2 — Opinions */}
      <Opinions />

      {/* Block 3 — Selected work */}
      <section className="py-20 border-t hairline">
        <div className="flex items-baseline justify-between mb-12 gap-6">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
            Selected work
          </h2>
          <Link
            href="/work"
            className="text-sm text-ink-muted hover:text-terracotta underline underline-offset-2"
          >
            All case studies →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {selectedWork.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>
      </section>

      {/* Block 4 — Coffee chat */}
      <CoffeeChatCard />
    </div>
  );
}
