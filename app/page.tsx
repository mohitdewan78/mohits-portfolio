import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-28 border-b hairline">
        <p className="font-display italic text-ink-muted mb-6 text-sm tracking-wide uppercase">
          Portfolio + AI learning hub
        </p>
        <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          {site.tagline}.
          <br />
          <span className="text-ink-soft italic">
            Here are the artifacts and the trail.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
          I&apos;m {site.name} — a PM moving deeper into AI. This site holds
          case studies of my personal AI projects and a focused PM → AI PM
          learning trail with my own notes.
        </p>
        <p className="mt-3 text-sm text-ink-muted">
          Currently looking for {site.lookingFor.toLowerCase()}.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="inline-flex items-center px-5 py-3 bg-ink text-paper text-sm tracking-wide hover:bg-terracotta transition-colors"
          >
            View work
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center px-5 py-3 border hairline text-sm tracking-wide hover:bg-ink hover:text-paper transition-colors"
          >
            Email me
          </a>
        </div>
      </section>

      <section className="py-20">
        <h2 className="font-display text-3xl mb-2">Featured work</h2>
        <p className="text-ink-muted text-sm mb-10">
          Case studies coming online — see the full list at{" "}
          <Link href="/work" className="underline hover:text-terracotta">
            /work
          </Link>
          .
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: "MCP Document Tools Server", note: "Python MCP server, end-to-end" },
            { title: "AI Job-Search Dashboard", note: "ATS scraping + resume scoring" },
            { title: "Forge", note: "Recovery-aware workout planner" },
          ].map((p) => (
            <div key={p.title} className="border-t hairline pt-4">
              <p className="font-display text-xl">{p.title}</p>
              <p className="text-ink-muted text-sm mt-1">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t hairline">
        <h2 className="font-display text-3xl mb-3">The learning trail</h2>
        <p className="text-ink-soft max-w-2xl leading-relaxed">
          A focused PM → AI PM curriculum in three stages: foundations, scoping
          &amp; shipping AI features, and technical depth. My notes are the
          point — the resources are the breadcrumbs.
        </p>
        <Link
          href="/learn"
          className="inline-block mt-6 text-sm underline hover:text-terracotta"
        >
          Start the trail →
        </Link>
      </section>
    </div>
  );
}
