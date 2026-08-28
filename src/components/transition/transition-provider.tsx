"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Phase = "idle" | "covering" | "holding" | "revealing";

type TransitionApi = {
  phase: Phase;
  /** True while the boot overlay is active */
  busy: boolean;
};

const TransitionContext = createContext<TransitionApi | null>(null);
const BOOT_FLAG = "garv-transition-booted";

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return ctx;
}

export function usePageTransitionOptional() {
  return useContext(TransitionContext);
}

/** Boot-only intro — 3s mosaic cover → hold → bloom reveal */
const COVER_MS = 3000;
const BOOT_HOLD_MS = 1200;
const REVEAL_MS = 1600;
const REVEAL_SETTLE_MS = 350;

/**
 * Boot intro only — internal navigations use normal Next.js routing.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    if (started.current) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    let skip = false;
    try {
      skip = Boolean(sessionStorage.getItem(BOOT_FLAG));
    } catch {
      /* ignore */
    }
    if (skip) return;

    started.current = true;
    setPhase("covering");

    schedule(() => setPhase("holding"), COVER_MS);
    schedule(() => setPhase("revealing"), COVER_MS + BOOT_HOLD_MS);
    schedule(() => {
      setPhase("idle");
      try {
        sessionStorage.setItem(BOOT_FLAG, "1");
      } catch {
        /* ignore */
      }
    }, COVER_MS + BOOT_HOLD_MS + REVEAL_MS + REVEAL_SETTLE_MS);

    return clearTimers;
  }, []);

  useEffect(() => {
    if (phase === "idle") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const value = useMemo<TransitionApi>(
    () => ({
      phase,
      busy: phase !== "idle",
    }),
    [phase],
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export const transitionTiming = {
  coverMs: COVER_MS,
  revealMs: REVEAL_MS,
  revealSettleMs: REVEAL_SETTLE_MS,
  bootHoldMs: BOOT_HOLD_MS,
  totalMs: COVER_MS + BOOT_HOLD_MS + REVEAL_MS + REVEAL_SETTLE_MS,
} as const;
