"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Visibility threshold (0-1). */
  threshold?: number;
  /** CSS rootMargin string. Negative bottom margin delays reveal until
   *  the element is well inside the viewport. */
  rootMargin?: string;
  /** Only fire once and then disconnect. Default true. */
  once?: boolean;
};

/**
 * Tiny IntersectionObserver hook. Returns a ref and a boolean.
 *
 * - Respects prefers-reduced-motion: returns `true` immediately and never
 *   sets up an observer.
 * - Safe on SSR: returns `false` until mount.
 */
export function useInView<T extends HTMLElement>(
  options: Options = {},
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduce-motion users skip the choreography — show immediately.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
