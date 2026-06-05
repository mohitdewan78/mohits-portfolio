export const site = {
  name: "Mohit Dewan",

  // Builder framing — this site is a personal project showcase, not a job pitch.
  // Audience: other builders, PMs exploring AI, curious tinkerers.
  positioningLine:
    "Personal AI projects, and the playbook for building your own.",

  positioningSub:
    "Shipping AI is cheap. Shipping the right AI is the work — picking real problems, designing for the human first, and measuring whether the product earned its place.",

  // Short tagline for metadata + chip copy.
  tagline: "Personal AI projects · the playbook for building your own",

  // Contact placeholders — site is not a job pitch, but real humans still email.
  email: "mohitdewan.dce@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohitdewan/",
  github: "https://github.com/mohitdewan",
  resumeHref: "/resume.pdf",
  url: "https://build-ai-with-mohit.vercel.app",

  aiByline: "Built with Claude Code",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
] as const;

// Pre-structured coffee-chat mailto — warmer, builder-to-builder.
export function coffeeChatMailto(): string {
  const subject = encodeURIComponent("Comparing notes on AI projects");
  const body = encodeURIComponent(
    [
      `Hi ${site.name.split(" ")[0]},`,
      "",
      "Saw your site — would love to compare notes. Quick context on me:",
      "• What I'm building (or thinking of building):",
      "• Where I'm stuck or curious:",
      "• A few times that work for a 30-min call:",
      "",
      "Thanks!",
    ].join("\n"),
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

// Home opinions — builder lessons from personal projects, not operator credentials.
export const homeOpinions: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Start with the smallest agent that ships.",
    body: "Most personal AI projects die under feature creep before the first version works end-to-end. Build the boring path first; you'll discover what's actually interesting only after something runs.",
  },
  {
    title: "Pick the boring evaluation.",
    body: "Even a ten-row spreadsheet golden set beats vibes. You don't need MLflow for a side project — you need an eval you'll actually run before each prompt change.",
  },
  {
    title: "Token cost is part of the product.",
    body: "If your personal project costs five dollars per session, you won't use it. Design for cheap before you design for clever — caching, smaller models, and short context windows go further than fancier prompts.",
  },
  {
    title: "Build the tool surface first, the prompt second.",
    body: "Agents fail at tool design more often than at prompt design. If your tool signatures are messy, no amount of prompt engineering will save the trajectory.",
  },
  {
    title: "Ship to one user (you). That's how you find what's actually broken.",
    body: "Projects that ship to nobody stay perpetually almost-done. The fastest path to a real product is a real user — even if that user is just you, daily.",
  },
];

// Selected work — outcome lines emphasize the lesson, not metrics.
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
      "Learned that 80% of MCP work is tool surface design, not prompt design.",
    tags: ["MCP", "Agents", "Python"],
  },
  {
    slug: "job-dashboard",
    title: "AI Job-Search Dashboard",
    hook: "Most roles never hit the major boards — but the ATS APIs do.",
    outcome:
      "Found that the best ATS data comes from the platforms nobody scrapes. Scoring against my resume turned a firehose into a curated handful of high-fit roles.",
    tags: ["RAG", "Pipelines", "Evals"],
  },
  {
    slug: "forge",
    title: "Forge",
    hook: "A workout plan should change when your recovery does.",
    outcome:
      "Tried building one workout for a generic 'me' — learned the planner has to ingest yesterday before today makes sense.",
    tags: ["iOS", "Personalization", "Product"],
  },
];

// Friendly tier names for the learning trail — builder's trail, not curriculum.
export const trailTiers = [
  {
    id: "stage-1",
    eyebrow: "Get your bearings",
    title: "Mental models for building with AI",
    blurb:
      "The vocabulary, the limits, and the use cases worth chasing. What I wish someone had told me before I touched my first prompt.",
    status: "live",
  },
  {
    id: "stage-2",
    eyebrow: "Build your first thing",
    title: "Scope, ship, evaluate, iterate",
    blurb:
      "How to take an AI idea from a fuzzy thought to something running on your laptop — without the feature creep that kills most side projects.",
    status: "in-progress",
  },
  {
    id: "stage-3",
    eyebrow: "Go deeper",
    title: "Agents, MCP, and evals at scale",
    blurb:
      "The patterns and tradeoffs you'll bump into once your project gets ambitious — and a capstone where you actually build something agentic.",
    status: "in-progress",
  },
] as const;

export const trailIntro =
  "Field notes from building with AI on the side. What I tell people starting their first personal AI project.";
