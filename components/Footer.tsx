import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-ink-muted">
        <p className="font-display italic">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-5">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-terracotta transition-colors"
            >
              Email
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-terracotta transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-terracotta transition-colors"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.resumeHref}
              className="hover:text-terracotta transition-colors"
            >
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
