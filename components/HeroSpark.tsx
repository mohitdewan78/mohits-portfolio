"use client";

/**
 * Editorial hero animation — a constellation of glowing embers.
 *
 * Each dot has a soft radial-gradient halo (terracotta or teal) and a
 * tight core. Each pulses on its own timing so the constellation gently
 * twinkles — no synchronized motion, no one-shot draw-in. Continuous,
 * atmospheric, color-led.
 *
 * Pure SVG + CSS. All keyframes live in app/globals.css and are gated by
 * `.animate` (set pre-paint when reduce-motion is off).
 */

type Dot = {
  /** Position in viewBox 0..340 */
  cx: number;
  cy: number;
  /** Core radius */
  r: number;
  /** Glow halo radius */
  glow: number;
  color: "terracotta" | "teal";
  /** Independent breathing duration (sec) */
  duration: number;
  /** Negative delay so each dot is at a different phase */
  delay: number;
};

const DOTS: Dot[] = [
  // Primary ember — slightly off-center, largest, terracotta
  { cx: 190, cy: 178, r: 7,   glow: 72, color: "terracotta", duration: 5.0, delay: 0 },
  // Big teal companion upper-left
  { cx: 108, cy: 108, r: 5,   glow: 56, color: "teal",       duration: 6.2, delay: -1.5 },
  // Smaller terracotta stars scattered
  { cx: 242, cy:  82, r: 3,   glow: 30, color: "terracotta", duration: 4.0, delay: -0.8 },
  { cx: 278, cy: 218, r: 4,   glow: 40, color: "terracotta", duration: 4.6, delay: -2.4 },
  { cx: 152, cy: 274, r: 3.5, glow: 36, color: "terracotta", duration: 5.4, delay: -3.1 },
  // Smaller teal accents
  { cx:  84, cy: 240, r: 3.5, glow: 36, color: "teal",       duration: 5.8, delay: -0.4 },
  { cx:  62, cy: 168, r: 2.5, glow: 22, color: "teal",       duration: 4.4, delay: -2.0 },
  // Tiny far-corner sparks
  { cx: 296, cy: 142, r: 2,   glow: 20, color: "terracotta", duration: 3.8, delay: -1.2 },
  { cx: 200, cy:  44, r: 2,   glow: 20, color: "teal",       duration: 5.0, delay: -2.8 },
];

// Soft connector lines — drawn between selected dots to suggest a
// constellation without forcing a literal shape.
const LINES: Array<[number, number]> = [
  [0, 1], // primary ember → teal companion
  [0, 3], // primary → right-side terracotta
  [0, 4], // primary → bottom terracotta
  [1, 6], // teal companion → left teal accent
  [3, 7], // right-side terracotta → far-right corner spark
];

export function HeroSpark() {
  return (
    <div className="hero-spark w-full max-w-[280px] sm:max-w-[340px] mx-auto">
      <svg
        viewBox="0 0 340 340"
        className="w-full h-auto block"
        aria-hidden="true"
        role="img"
      >
        <defs>
          {/* Radial gradients for the soft halos */}
          <radialGradient id="halo-terracotta">
            <stop offset="0%"   stopColor="#b5482a" stopOpacity="0.85" />
            <stop offset="35%"  stopColor="#b5482a" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#b5482a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-teal">
            <stop offset="0%"   stopColor="#2d5d57" stopOpacity="0.75" />
            <stop offset="35%"  stopColor="#2d5d57" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2d5d57" stopOpacity="0" />
          </radialGradient>

          {/* Background warm wash — barely there, just adds warmth */}
          <radialGradient id="ambient-wash" cx="55%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="#b5482a" stopOpacity="0.08" />
            <stop offset="70%"  stopColor="#b5482a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient warm wash behind everything */}
        <rect width="340" height="340" fill="url(#ambient-wash)" />

        {/* Faint connector lines — drawn first so dots sit on top */}
        <g className="spark-lines">
          {LINES.map(([a, b], i) => {
            const A = DOTS[a];
            const B = DOTS[b];
            return (
              <line
                key={i}
                x1={A.cx}
                y1={A.cy}
                x2={B.cx}
                y2={B.cy}
                stroke="var(--color-terracotta)"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* The dots — halo + core, each on its own breathing timer */}
        <g className="spark-dots">
          {DOTS.map((d, i) => (
            <g
              key={i}
              className={`spark-dot spark-dot-${d.color}`}
              style={{
                animationDuration: `${d.duration}s`,
                animationDelay: `${d.delay}s`,
                transformOrigin: `${d.cx}px ${d.cy}px`,
              }}
            >
              {/* Halo */}
              <circle
                cx={d.cx}
                cy={d.cy}
                r={d.glow}
                fill={`url(#halo-${d.color})`}
              />
              {/* Core */}
              <circle
                cx={d.cx}
                cy={d.cy}
                r={d.r}
                fill={`var(--color-${d.color})`}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
