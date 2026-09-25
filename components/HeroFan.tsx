/**
 * Flowing fibre gradient — the hero's signature artwork.
 *
 * A fan of thin filaments radiating from a convergence point just off the
 * bottom-right. Colour is a function of absolute angle and cycles every
 * FAN_PERIOD degrees; per-filament opacity jitter supplies the hairline
 * striations that read as fibre rather than a flat wash.
 *
 * Two layers counter-rotate (see .fan-a / .fan-b in globals.css). Because the
 * colour cycle AND the jitter both repeat every FAN_PERIOD degrees, and each
 * layer is built FAN_PERIOD degrees wider than the visible window, rotating by
 * exactly one period lands on an identical frame — so the flow loops with no
 * seam and never reverses.
 *
 * The geometry is fully deterministic (seeded PRNG, no Math.random), so this
 * renders on the server and ships zero client JS. Keep FAN_PERIOD in sync with
 * the rotation amount in the @keyframes.
 */

const W = 1000;
const H = 1400;
const FX = 1020; // convergence point x
const FY = 1470; // convergence point y
const FAN_PERIOD = 60; // degrees per colour cycle — matches the @keyframes
const PER_CYCLE = 44; // filaments per cycle; integer keeps the loop seamless
const WINDOW_START = -182; // visible angular window
const WINDOW_END = -78;
const BOW = 13; // constant edge bow -> the combed sweep

/** Cyclic spectrum: the last entry must blend back into the first. */
const CYCLE = [
  "#4338CA", "#4F46E5", "#2563EB", "#0EA5E9", "#06B6D4",
  "#14B8A6", "#10B981", "#84CC16", "#F4FFE4", "#7C6CF0",
];

const toRgb = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

/** t wraps, so ramp(0) === ramp(1). */
function ramp(t: number): string {
  const n = CYCLE.length;
  const x = ((((t % 1) + 1) % 1) * n);
  const i = Math.floor(x);
  const f = x - i;
  const a = toRgb(CYCLE[i % n]);
  const b = toRgb(CYCLE[(i + 1) % n]);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
}

function makeRandom(seed: number) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

const rad = (deg: number) => (deg * Math.PI) / 180;

/** One curved edge of a filament, from the convergence point out to radius r. */
function edge(degrees: number, r: number) {
  const a = rad(degrees);
  const c = rad(degrees + BOW);
  return {
    ex: FX + Math.cos(a) * r,
    ey: FY + Math.sin(a) * r,
    cx: FX + Math.cos(c) * r * 0.52,
    cy: FY + Math.sin(c) * r * 0.52,
  };
}

/**
 * `direction` is which way this layer will be rotated, so it's built with the
 * extra FAN_PERIOD degrees of headroom on the correct side — that headroom is
 * what keeps the visible window covered for a whole loop.
 */
function buildLayer(direction: 1 | -1, seed: number) {
  const rnd = makeRandom(seed);
  const step = FAN_PERIOD / PER_CYCLE;
  const a0 = direction > 0 ? WINDOW_START - FAN_PERIOD : WINDOW_START;
  const a1 = direction > 0 ? WINDOW_END : WINDOW_END + FAN_PERIOD;
  const count = Math.ceil((a1 - a0) / step);

  // Jitter repeats every PER_CYCLE filaments, or the loop would visibly jump
  // when the rotation wraps.
  const jitter = Array.from({ length: PER_CYCLE }, () => ({
    opacity: 0.78 + rnd() * 0.22,
    width: 0.72 + rnd() * 0.62,
    radius: 1980 + rnd() * 420,
  }));

  return Array.from({ length: count }, (_, i) => {
    const j = jitter[i % PER_CYCLE];
    const a = a0 + i * step;
    const w = step * j.width;
    // Overlap neighbours so no white hairline can show between filaments.
    const e1 = edge(a - w * 0.3, j.radius);
    const e2 = edge(a + w * 1.3, j.radius);
    const d =
      `M${FX} ${FY}` +
      `Q${e1.cx.toFixed(1)} ${e1.cy.toFixed(1)} ${e1.ex.toFixed(1)} ${e1.ey.toFixed(1)}` +
      `L${e2.ex.toFixed(1)} ${e2.ey.toFixed(1)}` +
      `Q${e2.cx.toFixed(1)} ${e2.cy.toFixed(1)} ${FX} ${FY}Z`;
    return { d, fill: ramp((a - a0) / FAN_PERIOD), opacity: j.opacity };
  });
}

// Computed once at module load, not per render.
const LAYER_A = buildLayer(1, 1337);
const LAYER_B = buildLayer(-1, 90210);

export function HeroFan({ className = "" }: { className?: string }) {
  return (
    <div className={"hero-fan pointer-events-none absolute z-0 overflow-hidden " + className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="block h-full w-full blur-[5px]"
      >
        <g className="fan-layer fan-a" style={{ transformOrigin: `${FX}px ${FY}px` }}>
          {LAYER_A.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill} opacity={p.opacity} />
          ))}
        </g>
        <g
          className="fan-layer fan-b"
          style={{ transformOrigin: `${FX}px ${FY}px`, opacity: 0.3 }}
        >
          {LAYER_B.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill} opacity={p.opacity} />
          ))}
        </g>
      </svg>
    </div>
  );
}
