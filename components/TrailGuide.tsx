"use client";

import { useState, useRef } from "react";

export function TrailGuide() {
  const [goal, setGoal] = useState("");
  const [background, setBackground] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const responseRef = useRef<HTMLParagraphElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!goal.trim() || loading) return;

    setResponse("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/trail-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: goal.trim(), background: background.trim() }),
      });

      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setResponse(text);
      }
    } catch {
      setResponse("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-8 border hairline rounded-md overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-rule/20 transition-colors"
      >
        <span className="font-display italic text-ink-soft text-sm">
          Not sure where to start?
        </span>
        <span className="text-ink-muted text-sm ml-2">{open ? "↑" : "↓"}</span>
      </button>

      {open && (
        <div className="border-t hairline px-5 py-4">
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1.5">
                What are you trying to build or learn?
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Build a tool that helps me review PRs faster"
                disabled={loading}
                className="w-full px-3 py-2 text-sm bg-paper border hairline rounded text-ink placeholder:text-ink-muted focus:outline-none focus:border-terracotta transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1.5">
                Your background with AI
              </label>
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="e.g. Engineer, never shipped an AI feature"
                disabled={loading}
                className="w-full px-3 py-2 text-sm bg-paper border hairline rounded text-ink placeholder:text-ink-muted focus:outline-none focus:border-terracotta transition-colors disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!goal.trim() || loading}
              className="px-4 py-2 bg-terracotta text-paper text-sm rounded hover:bg-[#9e3d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Finding your path…" : "Recommend a path →"}
            </button>
          </form>

          {response && (
            <div className="mt-4 pt-4 border-t hairline">
              <p
                ref={responseRef}
                className="text-sm text-ink-soft font-display leading-relaxed whitespace-pre-wrap"
              >
                {response}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
