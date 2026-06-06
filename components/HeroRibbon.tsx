"use client";

/**
 * Editorial hero animation — flowing ribbon loop.
 *
 * An organic, asymmetric closed curve (not a perfect circle) with four
 * glowing milestone embers along its path. A single bright current flows
 * clockwise around the ribbon — matching the actual loop you follow when
 * shipping AI features (discover → prototype → eval → ship → repeat).
 *
 * Each milestone has its own distinct earthy color (terracotta, ochre,
 * teal, plum) so the four stages feel like different beats. Labels are
 * bold italic Fraunces.
 *
 * Visual character: organic, glowing, warm-colored, continuous motion.
 * Pure SVG + CSS; all keyframes live in app/globals.css, gated by
 * `.animate` (only set pre-paint when reduce-motion is off).
 */

// Asymmetric closed bezier loop, centered around (200, 170).
// Shifted slightly to the right of viewBox center to make room for the
// "Ship" label on the left. Path length is approximately 770 — used to
// size the dash gap for the flowing current.
const RIBBON_PATH =
  "M 200 60 " +
  "C 280 55 326 116 316 180 " +
  "C 312 236 260 290 192 274 " +
  "C 126 290 74 226 86 164 " +
  "C 92 104 136 56 200 60 Z";

type Milestone = {
  label: string;
  /** Node position */
  cx: number;
  cy: number;
  /** Label position */
  lx: number;
  ly: number;
  anchor: "middle" | "start" | "end";
  /** Hex color for the core + halo gradient */
  color: string;
  /** ID for this milestone's radial-gradient halo */
  haloId: string;
  /** Breathing cycle (sec) — staggered so dots don't sync */
  duration: number;
  delay: number;
};

const MILESTONES: Milestone[] = [
  {
    label: "Discover",
    cx: 200, cy: 60,
    lx: 200, ly: 28, anchor: "middle",
    color: "#b5482a", // terracotta
    haloId: "halo-discover",
    duration: 4.6, delay: 0,
  },
  {
    label: "Prototype",
    cx: 316, cy: 180,
    lx: 334, ly: 184, anchor: "start",
    color: "#c08a3e", // ochre / mustard
    haloId: "halo-prototype",
    duration: 5.2, delay: -1.4,
  },
  {
    label: "Eval",
    cx: 192, cy: 274,
    lx: 192, ly: 304, anchor: "middle",
    color: "#2d5d57", // teal
    haloId: "halo-eval",
    duration: 4.0, delay: -2.6,
  },
  {
    label: "Ship",
    cx: 86, cy: 164,
    lx: 68, ly: 168, anchor: "end",
    color: "#7a3e5a", // plum / burgundy
    haloId: "halo-ship",
    duration: 5.4, delay: -0.7,
  },
];

export function HeroRibbon() {
  return (
    <div className="hero-ribbon w-full max-w-[300px] sm:max-w-[380px] mx-auto">
      <svg
        viewBox="0 0 420 340"
        className="w-full h-auto block overflow-visible"
        aria-hidden="true"
        role="img"
      >
        <defs>
          {/* Per-milestone halo gradients */}
          {MILESTONES.map((m) => (
            <radialGradient key={m.haloId} id={m.haloId}>
              <stop offset="0%"   stopColor={m.color} stopOpacity="0.85" />
              <stop offset="40%"  stopColor={m.color} stopOpacity="0.32" />
              <stop offset="100%" stopColor={m.color} stopOpacity="0" />
            </radialGradient>
          ))}

          {/* Ambient warm wash behind everything */}
          <radialGradient id="ribbon-ambient" cx="48%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="#b5482a" stopOpacity="0.08" />
            <stop offset="70%"  stopColor="#b5482a" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#b5482a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient wash */}
        <rect width="420" height="340" fill="url(#ribbon-ambient)" />

        {/* Base ribbon — soft visible track, thicker now */}
        <path
          d={RIBBON_PATH}
          className="ribbon-base"
          fill="none"
          stroke="#b5482a"
          strokeOpacity="0.25"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* The single clockwise current — bright terracotta, thicker */}
        <path
          d={RIBBON_PATH}
          className="ribbon-current"
          fill="none"
          stroke="#b5482a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="70 700"
        />

        {/* Milestone embers — each with its own distinct color */}
        <g className="ribbon-milestones">
          {MILESTONES.map((m, i) => (
            <g
              key={m.label}
              className="ribbon-milestone"
              style={{
                animationDuration: `${m.duration}s`,
                animationDelay: `${m.delay}s`,
                transformOrigin: `${m.cx}px ${m.cy}px`,
              }}
            >
              {/* Halo */}
              <circle
                cx={m.cx}
                cy={m.cy}
                r={i === 0 ? 46 : 38}
                fill={`url(#${m.haloId})`}
              />
              {/* Core */}
              <circle
                cx={m.cx}
                cy={m.cy}
                r={i === 0 ? 7 : 6}
                fill={m.color}
              />
              {/* Label — bold italic Fraunces */}
              <text
                x={m.lx}
                y={m.ly}
                textAnchor={m.anchor}
                dominantBaseline="middle"
                className="ribbon-label"
              >
                {m.label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <figcaption className="mt-4 text-center text-sm italic font-display text-ink-muted">
        The loop. Where every personal AI project either earns its place or
        doesn&apos;t.
      </figcaption>
    </div>
  );
}
