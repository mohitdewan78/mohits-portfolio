export const site = {
  name: "Mohit Dewan",

  // Outcome-oriented working draft — Mohit to refine in his own voice.
  // Goal: name the output and the kind of result, not just the activity.
  positioningLine:
    "Mohit ships AI products that hold up after launch — sharp specs, honest evals, and a recovery plan for when the model is wrong.",

  // Short tagline used in metadata + chip copy.
  tagline: "PM building AI products",

  // TODO: replace placeholders before launch
  email: "mohitdewan.dce@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohitdewan/",
  github: "https://github.com/mohitdewan",
  resumeHref: "/resume.pdf",
  lookingFor: "Senior AI PM roles",
  url: "https://projectforge-beige.vercel.app",

  aiByline: "Built with Claude Code",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
] as const;

// Pre-structured coffee-chat mailto. Removes the blank-page barrier.
// Use on /about and (later) at the bottom of home.
export function coffeeChatMailto(): string {
  const subject = encodeURIComponent("Coffee chat");
  const body = encodeURIComponent(
    [
      `Hi ${site.name.split(" ")[0]},`,
      "",
      "I'd love to chat — quick context on me:",
      "• Who I am / what I do:",
      "• Why I'm reaching out:",
      "• A few times that work for me:",
      "",
      "Thanks!",
    ].join("\n"),
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

// Friendly tier names for the learning trail.
// Internal IDs stay stage-1/2/3 (URLs unchanged); these are display names.
export const trailTiers = [
  {
    id: "stage-1",
    eyebrow: "Start here",
    title: "The mental models",
    blurb:
      "If you're a PM looking at AI for the first time — the vocabulary, the limits, the use cases worth chasing.",
    status: "live",
  },
  {
    id: "stage-2",
    eyebrow: "Hit your stride",
    title: "Scoping & shipping AI features",
    blurb:
      "How to spec, evaluate, and ship something probabilistic without losing trust.",
    status: "in-progress",
  },
  {
    id: "stage-3",
    eyebrow: "Go deep",
    title: "Building it yourself",
    blurb:
      "Agentic patterns, MCP, evals at scale — and a capstone where you actually build.",
    status: "in-progress",
  },
] as const;
