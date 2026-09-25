import { coffeeChatMailto } from "@/lib/site";
import { HeroFan } from "@/components/HeroFan";

export function CoffeeChatCard() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <HeroFan className="top-[-50%] right-[-12%] h-[200%] w-[58%] opacity-75" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="max-w-2xl py-20">
          <p className="mb-4 text-sm font-medium text-[#7DE8C0]">☕ Coffee chat</p>
          <h2 className="font-display text-3xl font-light text-white sm:text-4xl">
            Want to compare notes?
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#C7D3E3]">
            Happy to chat with folks figuring out their first personal AI
            project, PMs exploring the transition, or builders comparing notes
            on agents, MCP, or evals. The button below opens a pre-filled email
            so you don&apos;t have to start cold.
          </p>
          <a
            href={coffeeChatMailto()}
            className="mt-8 inline-flex items-center gap-1.5 rounded bg-paper px-5 py-3 font-medium text-ink transition-colors hover:bg-[#F0F3F8]"
          >
            Book a chat <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
