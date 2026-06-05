import { coffeeChatMailto } from "@/lib/site";

export function CoffeeChatCard() {
  return (
    <section className="my-20">
      <div className="border hairline bg-paper/40 px-8 py-10 sm:px-12 sm:py-14 max-w-3xl mx-auto relative">
        <span className="absolute -top-3 left-8 bg-paper px-3 font-display italic text-sm text-terracotta">
          ☕ Coffee chat
        </span>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
          Want to talk shop?
        </h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          I&apos;m taking calls with founders, AI leads, and PMs working
          through their first production AI feature. Specs, evals, token
          economics, adoption — pick a topic.
        </p>
        <p className="mt-3 text-ink-muted text-sm">
          The button below opens a pre-filled email so you don&apos;t have to
          start from scratch.
        </p>
        <a
          href={coffeeChatMailto()}
          className="mt-6 inline-flex items-center px-5 py-3 bg-ink text-paper text-sm tracking-wide hover:bg-terracotta transition-colors"
        >
          Book a chat →
        </a>
      </div>
    </section>
  );
}
