import Anthropic from "@anthropic-ai/sdk";
import { trailTiers } from "@/lib/site";
import { stage1Modules, stage2Modules, stage3Modules } from "@/lib/learn";

const client = new Anthropic();

function buildTrailContext(): string {
  const stages = trailTiers
    .map(
      (t, i) =>
        `Stage ${i + 1} — ${t.title} (${t.eyebrow})\n  ${t.blurb}`,
    )
    .join("\n\n");

  const formatModules = (
    modules: typeof stage1Modules,
    label: string,
  ) =>
    `${label}:\n` +
    modules
      .map((m) => `  - ${m.title}: ${m.note.split(".")[0]}.`)
      .join("\n");

  const modules = [
    formatModules(stage1Modules, "Stage 1 modules"),
    formatModules(stage2Modules, "Stage 2 modules"),
    formatModules(stage3Modules, "Stage 3 modules"),
  ].join("\n\n");

  const caseStudies = [
    "Job Radar — a cron-based pipeline that scrapes job boards, scores postings with LLM-as-judge, and stores results in Google Sheets. Best for: understanding RAG alternatives, cost control, and eval loops.",
    "MCP Document Tools Server — a Python MCP server giving an LLM read/edit access to local files. Best for: understanding tool design, agent architecture, and the MCP protocol.",
    "Forge — an iOS fitness app using Apple HealthKit data + deterministic rules to generate daily workouts. Best for: understanding when NOT to use an LLM, data products, and personalization.",
    "Astrophotography Vlog — a monthly vlog series using Claude Code to automate the production pipeline. Best for: understanding AI-assisted workflows, pipelines, and the build/eval loop.",
  ].join("\n");

  return `THE LEARNING TRAIL:\n\n${stages}\n\n${modules}\n\nCASE STUDIES:\n${caseStudies}`;
}

const TRAIL_CONTEXT = buildTrailContext();

const SYSTEM = `You are a learning guide for Mohit Dewan's AI learning trail. Given someone's goal and background, recommend a personalized starting path through the trail.

Respond in this exact format:
**Start:** Stage [N] — [stage title]
**First modules:** [2-3 module titles from that stage, comma-separated]
**Read first:** [one case study name] — [one sentence on why it's relevant to their goal]

[2-3 sentences of reasoning — why this path fits their goal and background. Be specific.]

Be direct. Match the recommendation to what they actually said — don't default to Stage 1 for everyone.

${TRAIL_CONTEXT}`;

export async function POST(req: Request) {
  const { goal, background } = await req.json();
  if (!goal || typeof goal !== "string") {
    return new Response("Missing goal", { status: 400 });
  }

  const userContent = `Goal: ${goal}\nBackground: ${background || "Not specified"}`;

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system: SYSTEM,
    messages: [{ role: "user", content: userContent }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
