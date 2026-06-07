import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM = `You are writing a concise 1-page spec for a personal AI project, based on 4 answers from the builder.

Produce the spec in this exact Markdown format — no intro, no commentary, just the spec:

# [derive a short project name from the answers]

**Problem:** [1-2 sentences using the builder's own words]

**User:** [who has this problem — be specific]

**Eval:** [the concrete check that proves it works — one sentence]

**v1 scope:** [the smallest shippable version — one sentence]

**Out of scope:** [what's explicitly excluded from v1 — 2-3 items as a short list]

**First build step:** [the single first thing to actually build — one sentence]

Be concrete and specific. Avoid filler phrases. Use the person's own words where possible.`;

export async function POST(req: Request) {
  const { answers } = await req.json();
  if (!Array.isArray(answers) || answers.length !== 4) {
    return new Response("Expected exactly 4 answers", { status: 400 });
  }

  const userContent = [
    "Q1: What problem does this solve, and who specifically has it?",
    `A1: ${answers[0]}`,
    "",
    "Q2: How would you know if it worked? Your eval — the check you'd run before and after each prompt change.",
    `A2: ${answers[1]}`,
    "",
    "Q3: What's the smallest version that actually proves the idea?",
    `A3: ${answers[2]}`,
    "",
    "Q4: What are you explicitly NOT building in v1?",
    `A4: ${answers[3]}`,
  ].join("\n");

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
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
