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

// Perfect clockwise circle, centered at (220, 170), r=110.
// Two arc commands forming a closed circle. Drawn clockwise so the dash
// animation moves discover → prototype → eval → ship, the natural order
// of the shipping loop.
// Circumference: 2π × 110 ≈ 691.
const RIBBON_PATH =
  "M 220 60 " +
  "A 110 110 0 0 1 220 280 " +
  "A 110 110 0 0 1 220 60 Z";

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
    cx: 220, cy: 60,
    lx: 220, ly: 30, anchor: "middle",
    color: "#b5482a", // terracotta
    haloId: "halo-discover",
    duration: 4.6, delay: 0,
  },
  {
    label: "Prototype",
    cx: 330, cy: 170,
    lx: 348, ly: 174, anchor: "start",
    color: "#c08a3e", // ochre / mustard
    haloId: "halo-prototype",
    duration: 5.2, delay: -1.4,
  },
  {
    label: "Eval",
    cx: 220, cy: 280,
    lx: 220, ly: 308, anchor: "middle",
    color: "#2d5d57", // teal
    haloId: "halo-eval",
    duration: 4.0, delay: -2.6,
  },
  {
    label: "Ship",
    cx: 110, cy: 170,
    lx: 92, ly: 174, anchor: "end",
    color: "#7a3e5a", // plum / burgundy
    haloId: "halo-ship",
    duration: 5.4, delay: -0.7,
  },
];

export function HeroRibbon() {
  return (
    <div className="hero-ribbon w-full max-w-[300px] sm:max-w-[380px] mx-auto">
      <svg
        viewBox="0 0 440 340"
        className="w-full h-auto block overflow-visible"
        aria-hidden="true"
        role="img"
      >
        <defs>
          {/* Per-milestone halo gradients — softer than before */}
          {MILESTONES.map((m) => (
            <radialGradient key={m.haloId} id={m.haloId}>
              <stop offset="0%"   stopColor={m.color} stopOpacity="0.6" />
              <stop offset="45%"  stopColor={m.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={m.color} stopOpacity="0" />
            </radialGradient>
          ))}

          {/* Ambient warm wash behind everything */}
          <radialGradient id="ribbon-ambient" cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="#b5482a" stopOpacity="0.07" />
            <stop offset="70%"  stopColor="#b5482a" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#b5482a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient wash */}
        <rect width="440" height="340" fill="url(#ribbon-ambient)" />

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

        {/* The single clockwise current — bright terracotta, thicker.
            Path circumference is ≈691; dash 70 + gap 621 = 691, so exactly
            one dash is visible at a time and the animation loops cleanly. */}
        <path
          d={RIBBON_PATH}
          className="ribbon-current"
          fill="none"
          stroke="#b5482a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="70 621"
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
              {/* Halo — softer / smaller than before */}
              <circle
                cx={m.cx}
                cy={m.cy}
                r={26}
                fill={`url(#${m.haloId})`}
              />
              {/* Core */}
              <circle
                cx={m.cx}
                cy={m.cy}
                r={6}
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
