"use client";

import { useState } from "react";

export function ModuleTldr({ moduleId }: { moduleId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function load() {
    if (loading || done) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat/module-tldr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId }),
      });

      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let out = "";
      while (true) {
        const { done: d, value } = await reader.read();
        if (d) break;
        out += decoder.decode(value, { stream: true });
        setText(out);
      }
      setDone(true);
    } catch {
      setText("Couldn't load suggestion. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!text && !loading) {
    return (
      <button
        onClick={load}
        className="text-xs italic font-display text-terracotta hover:underline underline-offset-2 mt-3 block"
      >
        → Where to start?
      </button>
    );
  }

  return (
    <p className="mt-3 text-sm text-ink-soft font-display italic leading-relaxed">
      {loading && !text ? (
        <span className="animate-pulse text-ink-muted">Finding the best first resource…</span>
      ) : (
        text
      )}
    </p>
  );
}
