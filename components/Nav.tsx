import Link from "next/link";
import { nav, site } from "@/lib/site";
import { WordmarkLink } from "@/components/WordmarkLink";

export function Nav() {
  return (
    <header className="border-b hairline">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <WordmarkLink>{site.name}</WordmarkLink>
        <ul className="flex items-center gap-6 text-sm">
          {nav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft hover:text-terracotta transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
}
