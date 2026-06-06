import { homeOpinions } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Opinions() {
  return (
    <section className="py-20 border-t hairline">
      <div className="flex items-baseline justify-between mb-12 gap-6">
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
          How I think about AI
        </h2>
        <p className="text-ink-muted text-base italic font-display">
          Five stances, no hedging.
        </p>
      </div>
      <ol className="space-y-10">
        {homeOpinions.map((o, i) => (
          <Reveal
            key={o.title}
            as="li"
            delay={i * 80}
            className="grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-4 sm:gap-8 pt-8 border-t hairline first:pt-0 first:border-0"
          >
            <span className="font-display text-2xl sm:text-3xl text-terracotta tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl sm:text-2xl tracking-tight mb-2 text-ink">
                {o.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">{o.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
