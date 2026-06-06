"use client";

import { useInView } from "@/lib/useInView";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms. Use for sibling reveals. */
  delay?: number;
  /** Element to render as. Default 'div'. */
  as?: ElementType;
  /** Pass through className. */
  className?: string;
};

/**
 * Drop-in wrapper that fades + rises its children when they enter the viewport.
 *
 * Server-renders fully visible (`reveal` class is no-op without the `.animate`
 * class on <html>, which is added pre-paint only when reduce-motion is off).
 *
 * Hydration sequence:
 *   1. <html> gets `.animate` class via inline script in <head>.
 *   2. CSS applies the pre-reveal state (opacity 0, translateY 12px).
 *   3. Observer toggles `data-revealed="true"` when the element enters view.
 *   4. CSS transitions to the visible state.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-revealed={inView ? "true" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
