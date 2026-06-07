import Anthropic from "@anthropic-ai/sdk";
import { stage1Modules, stage2Modules, stage3Modules } from "@/lib/learn";

const client = new Anthropic();

const allModules = [...stage1Modules, ...stage2Modules, ...stage3Modules];

export async function POST(req: Request) {
  const { moduleId } = await req.json();
  if (!moduleId || typeof moduleId !== "string") {
    return new Response("Missing moduleId", { status: 400 });
  }

  const mod = allModules.find((m) => m.id === moduleId);
  if (!mod) {
    return new Response("Module not found", { status: 404 });
  }

  const resourceList = mod.resources
    .map(
      (r, i) =>
        `${i + 1}. ${r.label} (${r.source}, ${r.time}) — ${r.blurb}`,
    )
    .join("\n");

  const system = `You are recommending the single best first resource from a learning module for someone new to the topic. Pick one resource and explain in exactly 2 sentences: name the resource clearly, then say specifically what it teaches that makes it the right starting point. Do not say "I recommend" — just say "Start with [resource name]."`;

  const userContent = `Module: ${mod.title}

${mod.note}

Resources:
${resourceList}`;

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 150,
    system,
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
