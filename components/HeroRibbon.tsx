"use client";

/**
 * Editorial hero animation — flowing ribbon loop.
 *
 * An organic, asymmetric closed curve (not a perfect circle) with four
 * glowing milestone embers along its path. A bright terracotta "current"
 * flows continuously around the ribbon; a slower teal current drifts the
 * opposite direction underneath. Each milestone breathes on its own timing.
 * Background carries a warm ambient wash.
 *
 * Visual character: organic, glowing, warm-colored, continuous motion —
 * the "loop" meaning (discover → prototype → eval → ship) preserved via
 * subtle milestone labels but the geometry is organic, not diagrammatic.
 *
 * Pure SVG + CSS; all keyframes live in app/globals.css, gated by `.animate`
 * (only set pre-paint when reduce-motion is off).
 */

// Organic loop path — four cubic beziers with slightly offset control
// points so the curve breathes asymmetrically. Drawn clockwise from top.
// Path length ~770 units (used for stroke-dasharray choices in CSS).
const RIBBON_PATH =
  "M 170 60 " +
  "C 250 55 296 116 286 180 " +
  "C 282 236 230 290 162 274 " +
  "C 96 290 44 226 56 164 " +
  "C 62 104 106 56 170 60 Z";

// Approximate quarter-points along the path. Used to place milestones
// and labels. Tweaked by eye to land on the visual curve, not strictly
// equal arc-length divisions.
type Milestone = {
  label: string;
  cx: number;
  cy: number;
  /** Where to place the small label text. */
  lx: number;
  ly: number;
  anchor: "middle" | "start" | "end";
  color: "terracotta" | "teal";
  /** Breathing cycle (sec). */
  duration: number;
  /** Negative animation-delay so dots don't sync. */
  delay: number;
};

const MILESTONES: Milestone[] = [
  { label: "Discover",  cx: 170, cy:  60, lx: 170, ly:  34, anchor: "middle", color: "terracotta", duration: 4.6, delay:  0    },
  { label: "Prototype", cx: 286, cy: 180, lx: 308, ly: 184, anchor: "start",  color: "teal",       duration: 5.6, delay: -1.4 },
  { label: "Eval",      cx: 162, cy: 274, lx: 162, ly: 302, anchor: "middle", color: "terracotta", duration: 4.2, delay: -2.6 },
  { label: "Ship",      cx:  56, cy: 164, lx:  34, ly: 168, anchor: "end",    color: "terracotta", duration: 5.0, delay: -0.7 },
];

export function HeroRibbon() {
  return (
    <div className="hero-ribbon w-full max-w-[280px] sm:max-w-[340px] mx-auto">
      <svg
        viewBox="0 0 340 340"
        className="w-full h-auto block overflow-visible"
        aria-hidden="true"
        role="img"
      >
        <defs>
          {/* Halos for the milestone embers */}
          <radialGradient id="ribbon-halo-terracotta">
            <stop offset="0%"   stopColor="#b5482a" stopOpacity="0.85" />
            <stop offset="40%"  stopColor="#b5482a" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#b5482a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ribbon-halo-teal">
            <stop offset="0%"   stopColor="#2d5d57" stopOpacity="0.75" />
            <stop offset="40%"  stopColor="#2d5d57" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2d5d57" stopOpacity="0" />
          </radialGradient>

          {/* Ambient warm wash behind everything */}
          <radialGradient id="ribbon-ambient" cx="50%" cy="50%" r="60%">
            <stop offset="0%"   stopColor="#b5482a" stopOpacity="0.08" />
            <stop offset="65%"  stopColor="#b5482a" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#b5482a" stopOpacity="0" />
          </radialGradient>

          {/* Gradient stroke for the bright current — terracotta with brighter middle */}
          <linearGradient id="ribbon-flow-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="340" y2="340">
            <stop offset="0%"  stopColor="#b5482a" stopOpacity="0" />
            <stop offset="40%" stopColor="#b5482a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#d9602f" stopOpacity="1" />
            <stop offset="80%" stopColor="#b5482a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b5482a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient wash */}
        <rect width="340" height="340" fill="url(#ribbon-ambient)" />

        {/* Base ribbon — the visible "guide track" — soft and steady */}
        <path
          d={RIBBON_PATH}
          className="ribbon-base"
          fill="none"
          stroke="#b5482a"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Secondary current — teal, going the opposite direction, slower */}
        <path
          d={RIBBON_PATH}
          className="ribbon-current-teal"
          fill="none"
          stroke="#2d5d57"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="40 730"
        />

        {/* Primary current — bright terracotta, brighter and faster */}
        <path
          d={RIBBON_PATH}
          className="ribbon-current-terracotta"
          fill="none"
          stroke="#b5482a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="60 710"
        />

        {/* Milestone embers — glow halo + tight core, each on its own breathing timer */}
        <g className="ribbon-milestones">
          {MILESTONES.map((m, i) => (
            <g
              key={m.label}
              className={`ribbon-milestone ribbon-milestone-${m.color}`}
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
                r={m.color === "terracotta" && i === 0 ? 46 : 36}
                fill={`url(#ribbon-halo-${m.color})`}
              />
              {/* Core */}
              <circle
                cx={m.cx}
                cy={m.cy}
                r={i === 0 ? 6 : 5}
                fill={`var(--color-${m.color})`}
              />
              {/* Label — subtle italic Fraunces in ink-muted */}
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
