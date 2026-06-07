import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CoffeeChatCard } from "@/components/CoffeeChatCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Mohit Dewan — a PM who builds personal AI projects on the side, and the why behind each one.",
};

// Project reflections shown on /about. Each one is the "what this taught me"
// sentence — distinct from the case study, which is the architecture.
const projectReflections: ReadonlyArray<{
  slug: string;
  title: string;
  reflection: string;
}> = [
  {
    slug: "mcp-server",
    title: "MCP Document Tools Server",
    reflection:
      "Taught me that the interesting part of agent design isn't the prompt — it's the tool surface. The model is only as good as the contract you give it.",
  },
  {
    slug: "job-dashboard",
    title: "Job Radar",
    reflection:
      "Where I learned that retrieval beats generation almost every time, that prompt caching changes the cost equation, and that the eval set is the actual spec.",
  },
  {
    slug: "forge",
    title: "Forge",
    reflection:
      "Where I learned how much of AI product work happens upstream of the model — the data you collect, the state you keep, the questions you ask before generating anything.",
  },
  {
    slug: "astrophotography",
    title: "Astrophotography + Claude",
    reflection:
      "The reminder that the model is best at the parts you'd otherwise procrastinate — and worst at the parts you actually do this for. Don't automate the part you do this for.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-24 pb-20">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-20 lg:items-start">

        {/* Mobile: full header. Desktop: sticky sidebar. */}
        <header className="mb-12 lg:sticky lg:top-20 lg:mb-0">
          <p className="font-display italic text-ink-muted mb-4 text-sm">
            About
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-3xl tracking-tight leading-[1.05] lg:leading-[1.15]">
            A PM who builds on the side.
          </h1>
        </header>

        <div>
          <Reveal as="section" className="space-y-5 text-lg text-ink-soft leading-relaxed mb-16 pb-16 border-b hairline">
            <p>
              I&apos;m {site.name}, based in Pittsburgh. By day I&apos;m a product
              manager working on AI features inside real enterprise workflows.
              What this site is about is the *other* thing — the personal
              projects I build with AI on the weekend, and the playbook I&apos;ve
              assembled along the way.
            </p>
            <p>
              The pattern started simply. Every time I read about a new AI
              capability — agents, MCP, RAG, evals — I&apos;d notice I didn&apos;t
              really understand it until I&apos;d built something with it. Not a
              tutorial. Not a demo. Something I actually used. The four projects
              on this site each started as &quot;I want to understand X
              properly&quot; and ended up being things I depend on.
            </p>
            <p>
              The trail on{" "}
              <Link href="/learn" className="text-terracotta underline underline-offset-2 hover:no-underline">
                /learn
              </Link>{" "}
              is the order I wish someone had walked me through. It&apos;s for the
              version of me who knew there was something to AI products but
              couldn&apos;t tell which parts of the noise were signal. If
              that&apos;s where you are, start there.
            </p>
          </Reveal>

          <Reveal as="section" className="mb-16 pb-16 border-b hairline">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-3">
              What each project taught me
            </h2>
            <p className="text-ink-muted text-sm mb-10">
              The case studies have the architecture. These are the lessons that
              stuck.
            </p>
            <ol className="space-y-10">
              {projectReflections.map((p, i) => (
                <li key={p.slug} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-4 sm:gap-8">
                  <span className="font-display text-2xl text-terracotta tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink mb-2">
                      <Link
                        href={`/work/${p.slug}`}
                        className="hover:text-terracotta transition-colors"
                      >
                        {p.title} →
                      </Link>
                    </h3>
                    <p className="text-ink-soft leading-relaxed">{p.reflection}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="section" className="mb-16 pb-16 border-b hairline">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4">
              Elsewhere
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6 max-w-2xl">
              This site is the building. For the work side — what I do
              professionally, where I&apos;ve been, what I&apos;m looking for next —
              LinkedIn carries that load:
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta underline underline-offset-2 hover:no-underline"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta underline underline-offset-2 hover:no-underline"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-terracotta underline underline-offset-2 hover:no-underline"
                >
                  Email ↗
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <CoffeeChatCard />
          </Reveal>
        </div>

      </div>
    </div>
  );
}
