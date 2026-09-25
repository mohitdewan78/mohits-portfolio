import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-5xl px-6 py-9 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-ink-muted">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.aiByline}
        </p>
        <ul className="flex gap-5">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-accent transition-colors"
            >
              Email
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
