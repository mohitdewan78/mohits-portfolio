export const site = {
  name: "Mohit Dewan",

  // Director-of-AI positioning. Working draft — Mohit to refine in his own voice.
  positioningLine:
    "I lead AI initiatives end-to-end — from strategy to evals to the token bill.",

  // Secondary line on home, underneath the H1.
  positioningSub:
    "I think in adoption curves, eval suites, and ROI per token. This site has the artifacts and the playbook.",

  // Short tagline for metadata + chip copy.
  tagline: "AI PM · strategy, evals, token economics",

  // TODO: replace placeholders before launch
  email: "mohitdewan.dce@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohitdewan/",
  github: "https://github.com/mohitdewan",
  resumeHref: "/resume.pdf",
  lookingFor: "AI Lead / Director of AI roles",
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

// 'How I think about AI' — home page opinions block.
// Each opinion is one bold claim + one short paragraph of reasoning.
// Working drafts. Mohit owns final wording.
export const homeOpinions: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Evals beat vibes.",
    body: "Most teams ship AI features without a golden set and learn the hard way after launch. The eval suite is the spec — write it before the prompt, not after the regression.",
  },
  {
    title: "Token economics is a PM concern, not an FP&A one.",
    body: "Unit economics live inside the prompt. If you don't know your cost-per-task and your cost-per-retry, you're not pricing your feature — you're hoping.",
  },
  {
    title: "Human-in-the-loop is a product decision, not a safety net.",
    body: "Where humans intervene shapes trust, throughput, and what the model is allowed to do. Design the seams up front; don't bolt them on after a bad demo.",
  },
  {
    title: "Adoption is the metric. Demo wins are the trap.",
    body: "A flashy demo wins the room; weekly active use wins the budget. Roadmaps that don't have an adoption hypothesis are roadmaps that haven't shipped yet.",
  },
  {
    title: "Pick one of prompting, RAG, or fine-tuning per problem.",
    body: "Stacking all three is a smell. The right answer is usually the simplest one that passes the eval — and the eval should be specific enough to tell.",
  },
];

// Selected work shown on home. Real outcomes go in the case-study MDX;
// this is the home preview copy. Mohit refines hook + outcome wording.
export const selectedWork: ReadonlyArray<{
  slug: string;
  title: string;
  hook: string;
  outcome: string;
  tags: readonly string[];
}> = [
  {
    slug: "mcp-server",
    title: "MCP Document Tools Server",
    hook: "If a model can read and edit your docs, the tools have to be airtight.",
    outcome:
      "End-to-end Python MCP server with a tight tool surface and an Inspector-driven eval loop.",
    tags: ["MCP", "Agents", "Python"],
  },
  {
    slug: "job-dashboard",
    title: "AI Job-Search Dashboard",
    hook: "Most roles never hit the major boards — but the ATS APIs do.",
    outcome:
      "Scrapes Ashby/Greenhouse/Lever, scores listings against my resume, surfaces only high-fit roles.",
    tags: ["RAG", "Pipelines", "Evals"],
  },
  {
    slug: "forge",
    title: "Forge",
    hook: "A workout plan should change when your recovery does.",
    outcome:
      "Recovery-aware session generator composing each workout from signals, time, equipment, and progression.",
    tags: ["iOS", "Personalization", "Product"],
  },
];

// Friendly tier names for the learning trail, framed as practitioner playbook.
// URLs stay /learn/stage-1 etc.
export const trailTiers = [
  {
    id: "stage-1",
    eyebrow: "Mental models",
    title: "How to think about AI products",
    blurb:
      "The vocabulary, the limits, the use cases worth chasing. What I tell PMs before they touch a prompt.",
    status: "live",
  },
  {
    id: "stage-2",
    eyebrow: "Scoping & shipping",
    title: "Specs, evals, and the production loop",
    blurb:
      "How to spec, evaluate, and ship something probabilistic without losing trust or the budget.",
    status: "in-progress",
  },
  {
    id: "stage-3",
    eyebrow: "Going deep",
    title: "Agents, MCP, and evals at scale",
    blurb:
      "The technical depth a PM needs to lead — patterns, tradeoffs, and a capstone where you actually build.",
    status: "in-progress",
  },
] as const;

export const trailIntro =
  "The playbook I wish existed when I started shipping AI products. Field notes, not a curriculum.";
