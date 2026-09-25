import Link from "next/link";
import { nav, site, coffeeChatMailto } from "@/lib/site";
import { WordmarkLink } from "@/components/WordmarkLink";

export function Nav() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <WordmarkLink>{site.name}</WordmarkLink>
        <ul className="flex items-center gap-7">
          {nav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] font-medium text-ink-soft transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          <li>
            <a
              href={coffeeChatMailto()}
              className="inline-flex items-center gap-1.5 rounded bg-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Book a chat <span aria-hidden>›</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
