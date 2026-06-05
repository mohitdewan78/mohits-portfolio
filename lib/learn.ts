// Learning trail data.
//
// Stage 1 ships fully written. Stages 2 & 3 are gated as "in progress"
// on /learn until they're written; only Stage 1 has a detail page in MVP.

// Visitor self-identification used to personalize recommendations.
// Level maps to which *stage* is highlighted as primary.
// Persona maps to which *modules within a stage* are highlighted.
export type Level = "beginner" | "intermediate" | "advanced";
export type Persona = "engineer" | "ai-pm" | "curious";

export const LEVELS: ReadonlyArray<{ id: Level; label: string; blurb: string }> = [
  { id: "beginner", label: "Beginner", blurb: "New to AI products" },
  { id: "intermediate", label: "Intermediate", blurb: "Shipped a few things" },
  { id: "advanced", label: "Advanced", blurb: "Building agents at depth" },
];

export const PERSONAS: ReadonlyArray<{ id: Persona; label: string; blurb: string }> = [
  { id: "engineer", label: "Engineer", blurb: "I want to build it myself" },
  { id: "ai-pm", label: "AI PM", blurb: "I lead AI products / teams" },
  { id: "curious", label: "Curious learner", blurb: "Just exploring" },
];

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
  /** Which personas this module is most useful for. */
  personas: Persona[];
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
    personas: ["engineer", "ai-pm", "curious"],
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
    personas: ["ai-pm", "engineer"],
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
    personas: ["engineer", "curious"],
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
    personas: ["ai-pm", "engineer"],
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
    personas: ["ai-pm", "curious"],
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
    personas: ["engineer", "ai-pm"],
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

// Stage 2 — six modules, ordered. "Build your first thing" — taking an AI
// idea from a fuzzy thought to something running on your laptop. Written
// in v4 builder voice for someone who's read Stage 1 and is ready to ship.
export const stage2Modules: Module[] = [
  {
    id: "01-llm-product-lifecycle",
    title: "The LLM product lifecycle",
    personas: ["ai-pm", "engineer"],
    note: "Regular software has a release cycle. AI products have a *loop* — discovery, prototype, eval, ship, monitor, learn, repeat — and the loop tightens over time. The biggest mistake first-time builders make is treating ship as the end of the cycle instead of the start of the interesting part. The first version exists so you can measure how badly it's wrong. Everything you learn after launch is what makes version two earn its keep. Plan the post-launch loop before you plan the launch.",
    resources: [
      {
        label: "What We've Learned From a Year of Building with LLMs",
        url: "https://applied-llms.org/",
        format: "post",
        source: "Applied LLMs",
        time: "1 hr",
        blurb:
          "Six practitioners' joint writeup. The 'operational' section is what most lifecycle posts miss.",
      },
      {
        label: "Anthropic's prompt engineering tutorials",
        url: "https://github.com/anthropics/prompt-eng-interactive-tutorial",
        format: "repo",
        source: "Anthropic",
        time: "3 hrs",
        blurb:
          "Hands-on notebook walk-through of the discovery → prototype loop, end to end.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See the lifecycle in Job Radar",
    },
  },
  {
    id: "02-tool-use-and-rag",
    title: "Tool use, function calling, and RAG — when to use which",
    personas: ["engineer", "ai-pm"],
    note: "Three patterns get stacked together more often than they should. Tool use lets the model *take an action* — call your code, hit an API, edit a file. RAG lets the model *read* the right slice of your data before answering. Function calling is the protocol both run on. The right pattern is the simplest one that passes your eval. If your model needs more context, that's RAG. If it needs to *do something*, that's tool use. Stacking both is fine when the task genuinely requires it — and a smell when it doesn't.",
    resources: [
      {
        label: "Tool use with Claude",
        url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview",
        format: "docs",
        source: "Anthropic",
        time: "30 min",
        blurb:
          "The official tool-use guide. Read once, then come back when you're designing your own tool surface.",
      },
      {
        label: "Building effective agents",
        url: "https://www.anthropic.com/research/building-effective-agents",
        format: "post",
        source: "Anthropic",
        time: "20 min",
        blurb:
          "The taxonomy of when to reach for tool use vs RAG vs an agent loop — the most reused decision tree in this space.",
      },
    ],
    linkedProject: {
      slug: "mcp-server",
      label: "See tool-surface design in the MCP server case study",
    },
  },
  {
    id: "03-evals",
    title: "Evals — offline, online, and the LLM-as-judge",
    personas: ["engineer", "ai-pm"],
    note: "If Stage 1 sold you on having an eval, Stage 2 is how the eval grows up. Three flavors: offline (a golden set you run before ship), online (production signals — thumbs, abandonment, retries), and LLM-as-judge (using a model to score another model's outputs against a rubric). Each catches a different class of regression. Offline is your spec. Online is your truth. LLM-as-judge scales when manual review can't. Most production teams run all three; most weekend projects need only the first one, done well.",
    resources: [
      {
        label: "Your AI Product Needs Evals",
        url: "https://hamel.dev/blog/posts/evals/",
        format: "post",
        source: "Hamel Husain",
        time: "30 min",
        blurb:
          "The piece that names the discipline. If you only read one thing on evals, this is it.",
      },
      {
        label: "Patterns for Building LLM-based Systems & Products",
        url: "https://eugeneyan.com/writing/llm-patterns/",
        format: "post",
        source: "Eugene Yan",
        time: "1 hr",
        blurb:
          "The reference architecture overview, with evals threaded through. Save the diagrams.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See the LLM-as-judge framework in Job Radar",
    },
  },
  {
    id: "04-specs-for-non-deterministic",
    title: "Writing specs for non-deterministic systems",
    personas: ["ai-pm", "engineer"],
    note: "A PRD for an AI feature is the same shape as a PRD for any other feature — until it isn't. Acceptance criteria stop being pass/fail and become acceptable ranges. \"The system should respond accurately\" is not a spec; it's a wish. A real spec names the eval set, the threshold, the fallback when the threshold isn't met, the guardrail when the answer is dangerous, and the human-in-the-loop checkpoint when the stakes are high. The trick is to write down the *failure mode* before you write down the success mode. The spec for what happens when the model is wrong is often more useful than the spec for when it's right.",
    resources: [
      {
        label: "Behind the prompt: a thoughtful PM on building AI products",
        url: "https://www.lennysnewsletter.com/p/behind-the-prompt-aman-khan",
        format: "post",
        source: "Lenny's Newsletter",
        time: "25 min",
        blurb:
          "PM-flavored take on what changes in PRD-writing when the system is probabilistic.",
      },
      {
        label: "Anthropic's responsible scaling policy",
        url: "https://www.anthropic.com/news/anthropics-responsible-scaling-policy",
        format: "post",
        source: "Anthropic",
        time: "30 min",
        blurb:
          "Industrial-scale spec for failure modes and guardrails — overkill for your project, illuminating as a reference.",
      },
    ],
    linkedProject: {
      slug: "forge",
      label: "See 'failure as first-class state' in Forge",
    },
  },
  {
    id: "05-cost-latency-model-selection",
    title: "Cost, latency, and model selection",
    personas: ["engineer", "ai-pm"],
    note: "Every AI feature has a cost-per-task and a latency budget, whether you measured them or not. Once you do measure, the picking-a-model question collapses fast: small/cheap by default, big/slow only where the eval demands it. Prompt caching dramatically changes the math when you have a stable prefix (a rubric, a resume, a long system prompt). Tiered routing — cheap model decides if the expensive model is needed — is the next move when one model isn't enough. Watch your token usage like you'd watch DB query counts. They're the same problem.",
    resources: [
      {
        label: "Prompt caching with Claude",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
        format: "docs",
        source: "Anthropic",
        time: "20 min",
        blurb:
          "The lever that drops per-call cost an order of magnitude when you have a stable prefix.",
      },
      {
        label: "Artificial Analysis model comparison",
        url: "https://artificialanalysis.ai/models",
        format: "docs",
        source: "Artificial Analysis",
        time: "10 min",
        blurb:
          "Side-by-side cost / latency / capability across every major model. Bookmark and revisit quarterly.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See prompt caching + tiered routing in Job Radar",
    },
  },
  {
    id: "06-ai-ux-patterns",
    title: "AI UX patterns — trust, confidence, and failure",
    personas: ["ai-pm", "curious"],
    note: "AI features fail in public. The interface has to absorb that. Three patterns to internalize: *show your confidence* (don't dress a guess in the same skin as a fact), *design the recovery* (when the model is wrong, what does the user do?), and *make the human-in-the-loop seam visible* (people trust systems they can interrupt). The product surface for \"I don't know\" or \"I'm not sure\" is harder to design than the product surface for the right answer. Treat it as a feature, not a fallback.",
    resources: [
      {
        label: "AI UX research from Nielsen Norman Group",
        url: "https://www.nngroup.com/articles/ai-ux/",
        format: "post",
        source: "NN/g",
        time: "30 min",
        blurb:
          "The most rigorous study of AI UX patterns going. Cited everywhere for a reason.",
      },
      {
        label: "Generative UI",
        url: "https://sdk.vercel.ai/docs/ai-sdk-rsc/generative-ui",
        format: "docs",
        source: "Vercel AI SDK",
        time: "20 min",
        blurb:
          "Streaming, tool-result rendering, and human-in-the-loop affordances — in working code.",
      },
    ],
    linkedProject: {
      slug: "forge",
      label: "See 'recovery as a first-class UX state' in Forge",
    },
  },
];

// Stage 3 — six modules, ordered. "Go deeper" — agents, MCP, production
// pipelines, evals at scale, and a capstone. v4 builder voice with a more
// technical edge for readers ready to ship something agentic.
export const stage3Modules: Module[] = [
  {
    id: "01-agentic-architecture",
    title: "Agentic architecture and orchestration",
    personas: ["engineer", "ai-pm"],
    note: "An agent is just an LLM in a loop with tools and the ability to decide what to do next. The architecture decision is how much autonomy you hand it: a *chain* (you decide steps, model fills them), a *workflow* (you decide branches, model picks), or an *agent* (model decides everything). More autonomy means more failure modes — a chain breaks predictably; an agent goes off the rails creatively. Start with chains. Escalate to workflows when fixed branches stop covering your cases. Only reach for fully autonomous agents when you've proven your tool surface is bulletproof. Most products labeled \"agents\" in the market are actually workflows — and that's usually the right answer.",
    resources: [
      {
        label: "LLM Powered Autonomous Agents",
        url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
        format: "post",
        source: "Lilian Weng",
        time: "1 hr",
        blurb:
          "The reference taxonomy of agent components — planning, memory, tools. Read once, refer back forever.",
      },
      {
        label: "LangGraph documentation",
        url: "https://langchain-ai.github.io/langgraph/",
        format: "docs",
        source: "LangChain",
        time: "2 hrs",
        blurb:
          "The most common framework for orchestrating workflows and agents. Even if you don't adopt it, the patterns transfer.",
      },
    ],
    linkedProject: {
      slug: "mcp-server",
      label: "See agent-tool design in the MCP server case study",
    },
  },
  {
    id: "02-mcp-and-tool-ecosystems",
    title: "MCP and the tool ecosystem",
    personas: ["engineer"],
    note: "Model Context Protocol is the standard for letting a model talk to your tools — without you re-implementing a new tool calling convention for every model provider. A server exposes tools, the model (via a host like Claude or an IDE) calls them, results stream back. The interesting work is in *tool surface design* — what tools you expose, what their schemas say, what errors look like. The protocol is the easy part. The hard part is the same as designing any other API: clear names, tight inputs, recoverable failures. MCP just gives you a standard envelope for the conversation.",
    resources: [
      {
        label: "Model Context Protocol — official docs",
        url: "https://modelcontextprotocol.io/",
        format: "docs",
        source: "MCP",
        time: "1 hr",
        blurb:
          "Spec, SDKs, and a curated server registry. The right starting point.",
      },
      {
        label: "Introducing the Model Context Protocol",
        url: "https://www.anthropic.com/news/model-context-protocol",
        format: "post",
        source: "Anthropic",
        time: "10 min",
        blurb:
          "The announcement post — short, sharp, explains the *why* before the spec gets dense.",
      },
    ],
    linkedProject: {
      slug: "mcp-server",
      label: "See an end-to-end MCP server in practice",
    },
  },
  {
    id: "03-production-pipeline",
    title: "Building a real pipeline end-to-end",
    personas: ["engineer", "ai-pm"],
    note: "Production AI pipelines are mostly data pipelines with a model call somewhere in the middle. The AI part is the smallest source of bugs; the scrapers, schemas, retries, timeouts, and rate limits eat your time. Build for the failures you'll actually see: rate-limited APIs, malformed inputs, partial outputs, ambiguous classifications. Wrap every external call in retry + timeout. Make the output schema strict. Log enough that when a row goes weird, you can replay it. The model is the cheapest, most replaceable part of the system; everything around it isn't.",
    resources: [
      {
        label: "Patterns for Building LLM-based Systems & Products",
        url: "https://eugeneyan.com/writing/llm-patterns/",
        format: "post",
        source: "Eugene Yan",
        time: "1 hr",
        blurb:
          "The reference architecture overview, with each pattern grounded in what fails without it.",
      },
      {
        label: "A field guide to rapidly improving AI products",
        url: "https://hamel.dev/blog/posts/field-guide/",
        format: "post",
        source: "Hamel Husain",
        time: "45 min",
        blurb:
          "Practitioner playbook for the post-launch iteration loop. The other half of the lifecycle most teams skip.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See a real seven-stage pipeline in Job Radar",
    },
  },
  {
    id: "04-evals-at-scale",
    title: "Evals at scale and observability",
    personas: ["engineer", "ai-pm"],
    note: "When evals graduate from a spreadsheet, you need three things: *trace storage* (every request, response, and tool call kept for replay), *a way to view them* (dashboards, or just SQL over the traces), and *regression tests that run automatically* before each prompt change. The good news: the tooling now exists — LangSmith, Braintrust, Phoenix, Helicone. The bad news: vendor lock-in is real. Roll your own when you can; pay for a tool when you need the UI and the SLA. Either way, the discipline is the same: log everything, regress everything, look at the bad ones every week.",
    resources: [
      {
        label: "LangSmith — observability for LLM apps",
        url: "https://docs.smith.langchain.com/",
        format: "docs",
        source: "LangChain",
        time: "1 hr",
        blurb:
          "The most-used hosted option. Worth understanding even if you choose to roll your own.",
      },
      {
        label: "Arize Phoenix — open-source LLM observability",
        url: "https://docs.arize.com/phoenix",
        format: "docs",
        source: "Arize AI",
        time: "1 hr",
        blurb:
          "The open-source alternative. Tracing, evals, and replay — self-hostable.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See LLM-as-judge evals in Job Radar",
    },
  },
  {
    id: "05-prompt-rag-finetune",
    title: "Prompting vs RAG vs fine-tuning",
    personas: ["engineer", "ai-pm"],
    note: "A flowchart everyone working with LLMs should internalize. Need general knowledge the model already has? Prompt. Need facts that aren't in training? RAG. Need behavior or style the model can't be coaxed into with examples? Fine-tune. Stacking all three is a smell, but combining the right two is common: RAG for facts + fine-tune for tone, or RAG for facts + prompt for behavior. The economics: prompt is cheap, RAG is moderate, fine-tune is expensive in setup but cheaper at inference scale. The threshold for fine-tuning is higher than most teams think.",
    resources: [
      {
        label: "RAG vs Fine-tuning — pipelines, tradeoffs, and a hybrid",
        url: "https://arxiv.org/abs/2401.08406",
        format: "paper",
        source: "arXiv (Microsoft / others)",
        time: "45 min",
        blurb:
          "The reference comparison paper. Long but the conclusions table earns the read.",
      },
      {
        label: "When to fine-tune vs prompt — Anthropic guidance",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples",
        format: "docs",
        source: "Anthropic",
        time: "20 min",
        blurb:
          "Walk-through of when few-shot prompting closes the gap fine-tuning would otherwise need.",
      },
    ],
    linkedProject: {
      slug: "job-dashboard",
      label: "See the prompting + RAG-lite tradeoff in Job Radar",
    },
  },
  {
    id: "06-capstone",
    title: "Capstone — ship something agentic",
    personas: ["engineer", "ai-pm", "curious"],
    note: "The whole trail has been pointing here. Pick a problem you actually have — not a portfolio piece. Define the smallest version that would help you tomorrow. Write the eval (ten to thirty rows on a spreadsheet). Wire the smallest agent that ships. Use it daily for a week. Notice what's broken. Fix the broken thing. Use it for another week. That's the entire loop. Don't optimize before there's something to optimize, don't generalize before you've used the specific version, and don't show it to anyone until you've used it yourself. Every project on this site started exactly this way. You can borrow any of their structure as a template — that's why they're written up.",
    resources: [
      {
        label: "Job Radar — pipeline + LLM-as-judge template",
        url: "/work/job-dashboard",
        format: "post",
        source: "Mohit Dewan",
        time: "10 min",
        blurb:
          "If your capstone is a data-pipeline-with-judgment shape, start from this architecture.",
      },
      {
        label: "MCP Server — agent + tool surface template",
        url: "/work/mcp-server",
        format: "post",
        source: "Mohit Dewan",
        time: "10 min",
        blurb:
          "If your capstone is an agent that operates on your own data or system, start from this architecture.",
      },
      {
        label: "Forge — data-product-with-no-LLM template",
        url: "/work/forge",
        format: "post",
        source: "Mohit Dewan",
        time: "10 min",
        blurb:
          "If your capstone might not need a model at all, read this before you reach for one.",
      },
    ],
  },
];

export function getStage(stageId: string): Module[] | null {
  if (stageId === "stage-1") return stage1Modules;
  if (stageId === "stage-2") return stage2Modules;
  if (stageId === "stage-3") return stage3Modules;
  return null;
}
