import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  hook: string;
  outcome: string;
  tags: readonly string[];
};

export function ProjectCard({ slug, title, hook, outcome, tags }: Props) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group block border-t hairline pt-6 pb-2 transition-colors hover:border-terracotta"
    >
      <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-ink group-hover:text-terracotta transition-colors">
        {title}
      </h3>
      <p className="mt-2 font-display italic text-ink-soft text-lg leading-snug">
        {hook}
      </p>
      <p className="mt-3 text-ink-soft leading-relaxed">{outcome}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-xs uppercase tracking-wider text-ink-muted border hairline px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
