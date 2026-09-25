import Link from "next/link";

/**
 * Each project owns a distinct quadrant of the palette — violet, azure, teal,
 * lime — so the four cards read apart while staying one family. Assigned by
 * position so the set stays balanced as projects are reordered.
 */
const THUMBS = [
  "linear-gradient(118deg,#3B2FBF 0%,#5B54E8 42%,#8E9BFB 74%,#C9D4FE 100%)",
  "linear-gradient(118deg,#123E9E 0%,#1C7FD6 40%,#36B6E8 72%,#A8E8F7 100%)",
  "linear-gradient(118deg,#0B6B63 0%,#10998C 40%,#2FC9A5 72%,#A9EFD8 100%)",
  "linear-gradient(118deg,#3F6B12 0%,#69A518 40%,#A3CE35 72%,#DCEFA4 100%)",
];

type Props = {
  slug: string;
  title: string;
  hook: string;
  oneLine: string;
  tags: readonly string[];
  status?: "live" | "in-progress";
  index?: number;
};

export function ProjectCard({
  slug,
  title,
  hook,
  oneLine,
  tags,
  status,
  index = 0,
}: Props) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-xl bg-paper shadow-[0_2px_5px_-1px_rgba(50,50,93,0.12),0_1px_3px_-1px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-12px_rgba(50,50,93,0.22),0_6px_14px_-6px_rgba(0,0,0,0.10)]"
    >
      <div
        className="relative h-[120px]"
        style={{ background: THUMBS[index % THUMBS.length] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_130%_at_12%_8%,rgba(255,255,255,0.55)_0%,transparent_46%)]" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
            {title}
          </h3>
          {status === "in-progress" && (
            <span className="shrink-0 rounded-full bg-accent/[0.09] px-2.5 py-0.5 text-[11px] font-medium text-accent">
              In progress
            </span>
          )}
        </div>
        <p className="mt-2.5 text-[15px] leading-snug text-ink-soft">{hook}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{oneLine}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border hairline bg-surface px-2.5 py-0.5 text-[11px] font-medium text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
