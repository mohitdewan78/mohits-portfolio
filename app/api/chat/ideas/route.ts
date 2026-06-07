import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM = `You generate realistic weekend AI project ideas for builders. Given someone's job or role, propose exactly 3 project ideas they could realistically build solo in a weekend.

For each idea, provide:
- A short name (3-5 words)
- One sentence: the boring version to ship first — the smallest thing that actually runs
- One sentence: what becomes genuinely interesting once it runs (what you discover, not what you planned)

Keep ideas grounded in real problems from that role. Prefer local data and real workflows over impressive demos. Avoid ideas that require enterprise access, large datasets, or more than one weekend of work.

Format as a numbered list (1., 2., 3.) with the name bolded. Keep the whole response under 300 words.`;

export async function POST(req: Request) {
  const { role } = await req.json();
  if (!role || typeof role !== "string") {
    return new Response("Missing role", { status: 400 });
  }

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 768,
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `My job / role: ${role}`,
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
