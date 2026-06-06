"use client";

import { useInView } from "@/lib/useInView";

/**
 * Editorial hero diagram — the iteration loop.
 *
 * A 4-node circle (discover → prototype → eval → ship) that draws itself in
 * on first viewport entry, then a terracotta dot orbits the loop slowly.
 * Pure SVG + CSS; all animation classes live in app/globals.css and are
 * gated on `.animate` (set pre-paint when reduce-motion is off).
 *
 * Geometry: 340×340 viewBox. Circle at (170,170) with r=110. Nodes are
 * positioned at the four cardinal points around the circle.
 */

type Node = {
  label: string;
  /** Node circle center (within the 340×340 viewBox). */
  cx: number;
  cy: number;
  /** Label position relative to the node. */
  lx: number;
  ly: number;
  anchor: "middle" | "start" | "end";
  /** Fade-in delay (ms) — aligned to when the stroke reaches the node. */
  delay: number;
};

// Ordered clockwise from top. Delays match the draw-in stroke timing
// (1400ms total). Each node fades in just as the stroke arrives.
const NODES: Node[] = [
  { label: "DISCOVER",  cx: 170, cy:  60, lx: 170, ly: 38,  anchor: "middle", delay: 0 },
  { label: "PROTOTYPE", cx: 280, cy: 170, lx: 296, ly: 174, anchor: "start",  delay: 350 },
  { label: "EVAL",      cx: 170, cy: 280, lx: 170, ly: 306, anchor: "middle", delay: 700 },
  { label: "SHIP",      cx:  60, cy: 170, lx:  44, ly: 174, anchor: "end",    delay: 1050 },
];

// Clockwise circle path starting at top (170,60). Two arcs.
// Drawn with sweep=1 (clockwise) so stroke-dashoffset reveals it
// clockwise from the top — natural reading order around the loop.
const RING_PATH =
  "M 170 60 A 110 110 0 0 1 170 280 A 110 110 0 0 1 170 60";

export function IterationLoop() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="iteration-loop w-full max-w-[260px] sm:max-w-[340px] mx-auto"
      data-revealed={inView ? "true" : undefined}
    >
      <svg
        viewBox="0 0 340 340"
        className="w-full h-auto block"
        aria-hidden="true"
        role="img"
      >
        {/* The ring — stroke draws in clockwise from top */}
        <path
          d={RING_PATH}
          className="ring"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />

        {/* Nodes — fade in sequentially as the stroke reaches each one */}
        <g className="nodes">
          {NODES.map((n) => (
            <g
              key={n.label}
              className="node"
              style={{ animationDelay: `${n.delay}ms` }}
            >
              <circle
                cx={n.cx}
                cy={n.cy}
                r="7"
                fill="var(--color-paper)"
                stroke="var(--color-ink)"
                strokeWidth="1.5"
              />
              <text
                x={n.lx}
                y={n.ly}
                textAnchor={n.anchor}
                dominantBaseline="middle"
                className="node-label"
              >
                {n.label}
              </text>
            </g>
          ))}
        </g>

        {/* The orbiting terracotta dot — starts at the top (where stroke
            begins), rotated around the center of the loop. */}
        <g
          className="orbit"
          style={{ transformOrigin: "170px 170px" }}
        >
          <circle cx="170" cy="60" r="4.5" fill="var(--color-terracotta)" />
        </g>
      </svg>

      <figcaption className="mt-4 text-center text-sm italic font-display text-ink-muted">
        The loop. Where every personal AI project either earns its place or
        doesn&apos;t.
      </figcaption>
    </div>
  );
}
