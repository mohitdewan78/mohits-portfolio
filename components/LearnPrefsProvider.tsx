"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Level, Persona } from "@/lib/learn";

const STORAGE_KEY = "learn:prefs:v1";

type Prefs = {
  level?: Level;
  persona?: Persona;
  completed: string[]; // module ids
  /** If true, list pages hide non-matching modules. Default off. */
  matchedOnly: boolean;
};

const defaultPrefs: Prefs = { completed: [], matchedOnly: false };

type Ctx = Prefs & {
  /** True once the client has hydrated from localStorage. Before that, all
   *  consumer components should render the "no prefs" state to avoid SSR
   *  hydration mismatches. */
  hydrated: boolean;
  setLevel: (l: Level | undefined) => void;
  setPersona: (p: Persona | undefined) => void;
  toggleComplete: (moduleId: string) => void;
  setMatchedOnly: (v: boolean) => void;
  reset: () => void;
};

const LearnPrefsContext = createContext<Ctx | null>(null);

function readFromStorage(): Prefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw);
    return {
      level: parsed.level,
      persona: parsed.persona,
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      matchedOnly: Boolean(parsed.matchedOnly),
    };
  } catch {
    return defaultPrefs;
  }
}

function writeToStorage(prefs: Prefs) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // private mode / quota — silently no-op
  }
}

export function LearnPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount.
  useEffect(() => {
    setPrefs(readFromStorage());
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (hydrated) writeToStorage(prefs);
  }, [prefs, hydrated]);

  // Cross-tab sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPrefs(readFromStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLevel = useCallback(
    (level: Level | undefined) => setPrefs((p) => ({ ...p, level })),
    [],
  );
  const setPersona = useCallback(
    (persona: Persona | undefined) => setPrefs((p) => ({ ...p, persona })),
    [],
  );
  const toggleComplete = useCallback((moduleId: string) => {
    setPrefs((p) => {
      const has = p.completed.includes(moduleId);
      return {
        ...p,
        completed: has
          ? p.completed.filter((id) => id !== moduleId)
          : [...p.completed, moduleId],
      };
    });
  }, []);
  const setMatchedOnly = useCallback(
    (matchedOnly: boolean) => setPrefs((p) => ({ ...p, matchedOnly })),
    [],
  );
  const reset = useCallback(() => setPrefs(defaultPrefs), []);

  return (
    <LearnPrefsContext.Provider
      value={{
        ...prefs,
        hydrated,
        setLevel,
        setPersona,
        toggleComplete,
        setMatchedOnly,
        reset,
      }}
    >
      {children}
    </LearnPrefsContext.Provider>
  );
}

export function useLearnPrefs(): Ctx {
  const ctx = useContext(LearnPrefsContext);
  if (!ctx) {
    throw new Error(
      "useLearnPrefs must be used inside <LearnPrefsProvider>. Wrap the /learn layout.",
    );
  }
  return ctx;
}
