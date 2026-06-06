"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * The handwritten wordmark link. Animates a one-shot "writes-in" reveal
 * on first mount of the Nav (i.e. on the first page load of the session).
 * No reanimation on client-side navigation since the Nav lives in the
 * root layout and doesn't remount.
 */
export function WordmarkLink({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Defer to next frame so the animation class kicks in cleanly.
    requestAnimationFrame(() => setHasMounted(true));
  }, []);

  return (
    <Link
      href="/"
      aria-label="Home"
      className={
        "font-signature text-[26px] sm:text-[30px] leading-none font-semibold text-ink hover:text-terracotta transition-colors inline-block " +
        (hasMounted ? "wordmark-write-in" : "")
      }
    >
      {children}
    </Link>
  );
}
