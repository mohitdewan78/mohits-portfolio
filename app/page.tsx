import Link from "next/link";
import { site } from "@/lib/site";
import { loadAllMetas } from "@/lib/work";
import { Opinions } from "@/components/Opinions";
import { CoffeeChatCard } from "@/components/CoffeeChatCard";
import { Reveal } from "@/components/Reveal";
import { HeroFan } from "@/components/HeroFan";
import { ProjectCard } from "@/components/ProjectCard";

const loop = [
  { label: "Discover", note: "Find a problem worth the tokens" },
  { label: "Prototype", note: "Smallest thing that runs" },
  { label: "Eval", note: "Boring golden set, run every change" },
  { label: "Ship", note: "One real user — usually me" },
];

export default async function Home() {
  const projects = await loadAllMetas();

  return (
    <>
      {/* Block 1 — Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        {/* Sized so the mask's radial fade completes inside the section —
            any taller and the clip leaves a hard edge at the boundary. */}
        <HeroFan className="top-[-12%] right-[-2%] h-[124%] w-[56%]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16">
          <p className="mb-4 text-sm font-medium text-accent">
            Field notes from building with AI
          </p>
          {/* Two-tone headline: lead clause in ink, continuation in muted. */}
          <h1 className="font-display max-w-3xl text-4xl leading-[1.1] font-light sm:text-6xl">
            {site.positioningLead}{" "}
            <span className="text-ink-muted">{site.positioningRest}</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
            {site.positioningSub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 rounded bg-accent px-5 py-3 font-medium text-white shadow-[0_4px_14px_-4px_rgba(67,56,202,0.45)] transition-colors hover:bg-accent-hover"
            >
              View work <span aria-hidden>›</span>
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded border hairline bg-paper px-5 py-3 font-medium text-accent shadow-[0_2px_5px_-1px_rgba(50,50,93,0.10)] transition-shadow hover:shadow-[0_4px_10px_-2px_rgba(50,50,93,0.16)]"
            >
              Start learning <span aria-hidden>›</span>
            </Link>
          </div>
        </div>

        {/* The loop — carries the meaning the old hero ribbon used to. */}
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <ol className="grid grid-cols-2 border-t hairline sm:grid-cols-4">
            {loop.map((step, i) => (
              <li key={step.label} className="py-6 pr-5">
                <span className="label-mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <b className="mt-1.5 block text-[15px] font-medium">{step.label}</b>
                <small className="mt-1 block text-[13px] text-ink-muted">
                  {step.note}
                </small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Block 2 — Selected work */}
      <section className="border-y hairline bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display max-w-2xl text-3xl leading-[1.15] font-light sm:text-4xl">
              Four side-builds.{" "}
              <span className="text-ink-muted">
                Written up so the next person can borrow the decisions.
              </span>
            </h2>
            <Link
              href="/work"
              className="font-medium whitespace-nowrap text-accent hover:underline"
            >
              View all work ›
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} className="flex">
                <ProjectCard
                  slug={p.slug}
                  title={p.title}
                  hook={p.hook}
                  oneLine={p.oneLine}
                  tags={p.tags}
                  status={p.status}
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3 — Opinions */}
      <div className="mx-auto max-w-5xl px-6">
        <Opinions />
      </div>

      {/* Block 4 — Coffee chat */}
      <CoffeeChatCard />
    </>
  );
}
