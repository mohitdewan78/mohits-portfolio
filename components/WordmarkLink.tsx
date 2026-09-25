import Link from "next/link";

export function WordmarkLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="font-display text-[17px] font-semibold text-ink transition-colors hover:text-accent"
    >
      {children}
    </Link>
  );
}
