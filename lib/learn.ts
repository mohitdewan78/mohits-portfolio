// Learning trail data.
//
// Stage 1 ships fully written. Stages 2 & 3 are gated as "in progress"
// on /learn until they're written; only Stage 1 has a detail page in MVP.

export type ResourceFormat =
  | "course"
  | "video"
  | "paper"
  | "newsletter"
  | "docs"
  | "repo"
  | "post";

export type Resource = {
  label: string;
  url: string;
  format: ResourceFormat;
  source: string;
  time: string; // e.g. "20 min", "2 hrs", "weekly"
  blurb: string; // one sentence on why this matters
};

export type Module = {
  id: string;
  title: string;
  note: string; // 1-2 paragraphs in Mohit's voice — authored take, not first-person learner
  resources: Resource[];
  linkedProject?: {
    slug: string;
    label: string;
  };
};

// Stage 1 — six modules, ordered. Mohit owns final wording — these are
// first drafts in v4 builder voice (authored, concrete, with concrete
// callbacks to the personal projects).
export const stage1Modules: Module[] = [
  {
    id: "01-mental-models",
    title: "Mental models for AI, ML, and LLMs",
    note: "Before you touch a prompt, get a working vocabulary. AI is the broad field. Machine learning is one approach inside it. LLMs are one kind of ML model — they predict the next token given previous tokens, and that's it. Everything else (RAG, agents, tool use, evals) is engineering scaffolding around that single primitive. The biggest mistake first-time builders make is treating the model like a person who can reason — it can't, but it can recognize patterns from its training data well enough to fake reasoning convincingly on the things it has seen before. The fastest way to develop intuition is to call the API yourself with deliberately weird inputs and watch what breaks.",
    resources: [
      {
        label: "Intro to Large Language Models",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        format: "video",
        source: "Andrej Karpathy",
        time: "1 hr",
        blurb:
          "The clearest one-hour primer that exists. Skip the math anxiety — he doesn't go there.",
      },
      {
        label: "Building effective agents",
        url: "https://www.anthropic.com/research/building-effective-agents",
        format: "post",
        source: "Anthropic",
        time: "20 min",
        blurb:
          "The taxonomy of patterns most teams reach for — and which ones are worth the complexity.",
      },
      {
        label: "Simon Willison's blog",
        url: "https://simonwillison.net/tags/llms/",
        format: "newsletter",
        source: "Simon Willison",
        time: "weekly",
        blurb:
          "Best practitioner running commentary on what's actually shipping in the AI space.",
      },
    ],
  },
  {
    id: "02-model-landscape",
    title: "The model landscape and build-vs-buy",
    note: "There are three useful axes when picking a model: capability (does it solve the task?), cost (per million tokens, in + out), and latency (p50, p95). Almost every personal project decision collapses to this triangle. For 90% of side-project tasks, a small/cheap model (Haiku, GPT-4o-mini, Llama via Groq) is the right answer — speed and cost matter more than the last 5% of capability. The exception is anything where the model has to reason across many pieces of context at once — that's where the frontier models earn their keep. Build-vs-buy for personal projects is mostly a non-question: buy the API, build the product around it. You're not training a foundation model on the weekend.",
    resources: [
      {
        label: "LLM provider price comparison",
        url: "https://artificialanalysis.ai/models",
        format: "docs",
        source: "Artificial Analysis",
        time: "5 min",
        blurb:
          "Side-by-side cost, latency, and capability across every major model. Bookmark it.",
      },
      {
        label: "Anthropic model comparison",
        url: "https://docs.anthropic.com/en/docs/about-claude/models/overview",
        format: "docs",
        source: "Anthropic",
        time: "10 min",
        blurb:
          "Haiku vs. Sonnet vs. Opus, with the price/capability tradeoff spelled out.",
      },
    ],
  },
  {
    id: "03-prompting-hands-on",
    title: "Prompting, hands-on",
    note: "Don't read about prompting — write one and run it. Open the Anthropic console or the OpenAI playground, paste in a task you actually care about, and iterate. Three things become obvious in the first hour that no blog post can teach: how much context the model needs to be useful, how brittle prompts are to phrasing, and how often the model will confidently produce nonsense if you don't give it an out. The mental shift you're after is from \"writing instructions for a person\" to \"writing instructions for a confident pattern-matcher that will not ask you to clarify.\" Once that lands, your prompts get specific fast.",
    resources: [
      {
        label: "Anthropic Console",
        url: "https://console.anthropic.com/",
        format: "docs",
        source: "Anthropic",
        time: "open & try",
        blurb:
          "Free credits to start. The Workbench is the fastest path from idea to running prompt.",
      },
      {
        label: "Prompt engineering guide",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        format: "docs",
        source: "Anthropic",
        time: "45 min",
        blurb:
          "The set of techniques worth knowing. Don't read it cover-to-cover — skim, then refer back.",
      },
      {
        label: "Prompt Engineering Guide",
        url: "https://www.promptingguide.ai/",
        format: "docs",
        source: "DAIR.AI",
        time: "open reference",
        blurb:
          "Provider-neutral cheat sheet — useful when you want to compare patterns across models.",
      },
    ],
    linkedProject: {
      slug: "mcp-server",
      label: "See this in the MCP server case study",
    },
  },
  {
    id: "04-why-ai-products-are-different",
    title: "Why AI products are different from regular software",
    note: "Regular software is deterministic — same input, same output, every time. AI products are probabilistic — same input, different output, sometimes wildly. That single fact reshapes every product decision around it. Specs become acceptance ranges, not pass/fail. Tests become statistical evals, not unit checks. Failure modes are confident hallucinations, not crashes. The bar for \"good enough to ship\" is no longer a passing CI run; it's a golden eval set the change beats. If you've only built deterministic software before, this is the mental flip that takes the longest — and the one that most senior engineers underestimate.",
    resources: [
      {
        label: "Your AI Product Needs Evals",
        url: "https://hamel.dev/blog/posts/evals/",
        format: "post",
        source: "Hamel Husain",
        time: "30 min",
        blurb:
          "The clearest practitioner case for why evals are the spec for probabilistic systems.",
      },
      {
        label: "What We've Learned From A Year of Building with LLMs",
        url: "https://applied-llms.org/",
        format: "post",
        source: "Applied LLMs",
        time: "1 hr",
        blurb:
          "Six builders' joint writeup. The 'product' section especially is gold.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See this in the Job Radar case study",
    },
  },
  {
    id: "05-spotting-good-use-cases",
    title: "Spotting use cases worth chasing",
    note: "Most ideas that sound like AI projects aren't. The honest test: is the task one where a confident-pattern-matcher (the model) plus a small amount of state-keeping (your code) would help me with something I actually do weekly? If yes, ship the smallest version. If no, you're chasing a demo, not a product. The places I've found AI genuinely useful in personal projects are: triage (filtering a firehose of inputs), structured extraction (turning messy text into clean rows), and the boring parts of a workflow (cataloging, labeling, summarizing). The places I've found it unhelpful are: anything requiring counted-out math, anything where correctness must be 100%, and anything where the user expects the same answer twice.",
    resources: [
      {
        label: "What is an AI Product?",
        url: "https://www.lennysnewsletter.com/p/what-is-an-ai-product",
        format: "post",
        source: "Lenny's Newsletter",
        time: "20 min",
        blurb:
          "Reasonable PM-flavored taxonomy of where AI actually changes the shape of a product.",
      },
      {
        label: "How to Identify Good Generative AI Use Cases",
        url: "https://blog.langchain.com/identifying-good-gen-ai-use-cases/",
        format: "post",
        source: "LangChain",
        time: "15 min",
        blurb:
          "Framework for ranking ideas by value × feasibility, with concrete examples.",
      },
    ],
    linkedProject: {
      slug: "astrophotography",
      label: "See this in the Astrophotography case study",
    },
  },
  {
    id: "06-data-literacy",
    title: "Data literacy for AI builders",
    note: "Every AI product is really a data product. The model is the cheap, replaceable part — your data and your evals are the moat. Before you ship anything, build a small golden set: 10-30 examples of inputs paired with the output you'd want. That set becomes your spec, your regression test, and your reference for every prompt change. Don't worry about format — a spreadsheet is fine. The discipline is in *opening it before* every change you make. Skip this step and you'll ship vibes; do it and you'll ship something you can actually trust.",
    resources: [
      {
        label: "Evals are all you need",
        url: "https://hamel.dev/blog/posts/evals/",
        format: "post",
        source: "Hamel Husain",
        time: "30 min",
        blurb:
          "Worth reading twice. The mental model of evals-as-spec lands harder the second time.",
      },
      {
        label: "OpenAI evals cookbook",
        url: "https://cookbook.openai.com/examples/evaluation/getting_started_with_openai_evals",
        format: "docs",
        source: "OpenAI",
        time: "1 hr",
        blurb:
          "When you outgrow the spreadsheet, this is the first place to look for structure.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See this in the Job Radar case study",
    },
  },
];

export function getStage(stageId: string): typeof stage1Modules | null {
  if (stageId === "stage-1") return stage1Modules;
  return null;
}
