import { homeOpinions } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Opinions() {
  return (
    <section className="py-20">
      <h2 className="font-display text-3xl font-light sm:text-4xl">
        How I think about AI
      </h2>
      <p className="mt-3 text-lg text-ink-muted">Five stances, no hedging.</p>

      <ol className="mt-12">
        {homeOpinions.map((o, i) => (
          <Reveal
            key={o.title}
            as="li"
            delay={i * 80}
            className="mt-10 grid grid-cols-[2rem_1fr] gap-4 border-t hairline pt-8 first:mt-0 first:border-0 first:pt-0 sm:grid-cols-[3rem_1fr] sm:gap-8"
          >
            <span className="label-mono pt-1.5 text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold sm:text-xl">
                {o.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{o.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
