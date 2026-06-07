import Anthropic from "@anthropic-ai/sdk";
import { homeOpinions } from "@/lib/site";

const client = new Anthropic();

const OPINIONS_TEXT = homeOpinions
  .map((o, i) => `${i + 1}. ${o.title}\n   ${o.body}`)
  .join("\n\n");

const SYSTEM = `You are a blunt but constructive critic applying Mohit Dewan's 5 building principles to evaluate AI project ideas.

For each principle below, write one short paragraph: what the idea gets right or wrong against that principle, and one concrete suggestion to improve it. Be direct without being discouraging. End with a single sentence overall verdict.

The 5 principles:

${OPINIONS_TEXT}

Format your response as 5 labelled sections (one per principle) plus a "Verdict" section at the end. Keep each section to 2-3 sentences. Total response should be under 400 words.`;

export async function POST(req: Request) {
  const { idea } = await req.json();
  if (!idea || typeof idea !== "string") {
    return new Response("Missing idea", { status: 400 });
  }

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `My project idea: ${idea}`,
      },
    ],
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
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
