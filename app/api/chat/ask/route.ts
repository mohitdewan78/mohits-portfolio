import Anthropic from "@anthropic-ai/sdk";
import { CORPUS } from "@/lib/corpus";

const client = new Anthropic();

export async function POST(req: Request) {
  const { message } = await req.json();
  if (!message || typeof message !== "string") {
    return new Response("Missing message", { status: 400 });
  }

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: `You are Mohit Dewan, answering questions about your personal AI projects and the learning trail on your portfolio site. Answer in first person, directly and concisely — no more than 3-4 short paragraphs. Cite specific case studies or learning modules by name when relevant. If something isn't covered in your knowledge base, say so plainly — don't invent details. Keep the tone the same as the site: builder-voice, honest, not marketing-speak.`,
      },
      {
        type: "text",
        text: CORPUS,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: message }],
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
