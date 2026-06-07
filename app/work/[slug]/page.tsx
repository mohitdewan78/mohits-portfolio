import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allSlugs, loadCaseStudy } from "@/lib/work";
import { Reveal } from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = await loadCaseStudy(slug);
  if (!mod) return {};
  return {
    title: mod.meta.title,
    description: mod.meta.hook,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = await loadCaseStudy(slug);
  if (!mod) notFound();

  const { default: Body, meta } = mod;

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 pt-20 pb-24">
      <header className="mb-12 pb-12 border-b hairline">
        <p className="font-display italic text-ink-muted mb-4 text-sm">
          <Link href="/work" className="hover:text-terracotta">
            ← Back to work
          </Link>
        </p>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-[1.05]">
          {meta.title}
        </h1>
        <p className="mt-6 font-display italic text-ink-soft text-xl sm:text-2xl leading-snug max-w-2xl">
          {meta.hook}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <span
              key={t}
              className="text-xs uppercase tracking-wider text-ink-muted border hairline px-2 py-0.5"
            >
              {t}
            </span>
          ))}
          {meta.status === "in-progress" && (
            <span className="text-xs uppercase tracking-wider text-terracotta border border-terracotta/40 px-2 py-0.5">
              In progress
            </span>
          )}
        </div>
        {meta.links && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {meta.links.live && (
              <a
                href={meta.links.live}
                target="_blank"
                rel="noreferrer"
                className="text-terracotta underline underline-offset-2 hover:no-underline"
              >
                Live ↗
              </a>
            )}
            {meta.links.github && (
              <a
                href={meta.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-terracotta underline underline-offset-2 hover:no-underline"
              >
                GitHub ↗
              </a>
            )}
            {meta.links.external && (
              <a
                href={meta.links.external}
                target="_blank"
                rel="noreferrer"
                className="text-terracotta underline underline-offset-2 hover:no-underline"
              >
                Project site ↗
              </a>
            )}
          </div>
        )}
      </header>

      <Reveal as="div" className="case-study-body">
        <Body />
      </Reveal>

      <footer className="mt-20 pt-10 border-t hairline">
        <Link
          href="/work"
          className="text-sm text-ink-muted hover:text-terracotta underline underline-offset-2"
        >
          ← All case studies
        </Link>
      </footer>
    </article>
  );
}
