"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Mode = "ask" | "critic" | "ideas";

const MODES: { id: Mode; label: string; placeholder: string; field: string }[] =
  [
    {
      id: "ask",
      label: "Ask Mohit",
      placeholder: "Why didn't Forge use an LLM?",
      field: "message",
    },
    {
      id: "critic",
      label: "Critic",
      placeholder: "An AI that summarizes my Slack threads",
      field: "idea",
    },
    {
      id: "ideas",
      label: "Ideas",
      placeholder: "Product manager at a SaaS company",
      field: "role",
    },
  ];

const ENDPOINTS: Record<Mode, string> = {
  ask: "/api/chat/ask",
  critic: "/api/chat/critic",
  ideas: "/api/chat/ideas",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("ask");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const currentMode = MODES.find((m) => m.id === mode)!;

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  // Scroll response to bottom as it streams
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const switchMode = useCallback(
    (next: Mode) => {
      if (loading) {
        abortRef.current?.abort();
        setLoading(false);
      }
      setMode(next);
      setInput("");
      setResponse("");
    },
    [loading],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setResponse("");
    setLoading(true);

    try {
      const body = JSON.stringify({ [currentMode.field]: input.trim() });
      const res = await fetch(ENDPOINTS[mode], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`${res.status}`);
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setResponse(text);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setResponse("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-terracotta text-paper flex items-center justify-center shadow-lg hover:bg-[#9e3d24] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <span aria-hidden="true" className="text-base font-display font-bold italic">✦</span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI assistant"
          aria-modal="false"
          className="fixed bottom-[4.5rem] right-6 z-50 w-[340px] flex flex-col bg-paper border hairline shadow-xl rounded-md overflow-hidden"
          style={{ maxHeight: "min(500px, calc(100dvh - 6rem))" }}
        >
          {/* Mode tabs */}
          <div className="flex border-b hairline shrink-0">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => switchMode(m.id)}
                className={`flex-1 py-2.5 text-xs font-sans tracking-wide transition-colors ${
                  mode === m.id
                    ? "text-terracotta border-b-2 border-terracotta"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Context label */}
          <div className="px-4 pt-3 pb-1 shrink-0">
            <p className="text-xs text-ink-muted font-sans">
              {mode === "ask" && "Ask anything about the projects or the learning trail."}
              {mode === "critic" && "Describe your AI project idea — get it run through 5 hard filters."}
              {mode === "ideas" && "Describe your job or role — get 3 weekend project ideas."}
            </p>
          </div>

          {/* Response area */}
          {(response || loading) && (
            <div
              ref={responseRef}
              className="mx-4 my-2 px-3 py-3 bg-rule/20 rounded text-sm text-ink-soft font-display leading-relaxed overflow-y-auto shrink min-h-0"
              style={{ maxHeight: "260px" }}
            >
              {response || (
                <span className="text-ink-muted animate-pulse">Thinking…</span>
              )}
            </div>
          )}

          {/* Input */}
          <form onSubmit={submit} className="flex gap-2 p-3 pt-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentMode.placeholder}
              disabled={loading}
              className="flex-1 min-w-0 px-3 py-2 text-sm bg-paper border hairline rounded text-ink placeholder:text-ink-muted focus:outline-none focus:border-terracotta transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-3 py-2 bg-terracotta text-paper text-sm rounded hover:bg-[#9e3d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
