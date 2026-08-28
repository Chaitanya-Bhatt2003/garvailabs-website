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

/** Boot-only intro — ~3.2s (cover → hold → reveal → settle) */
const COVER_MS = 950;
const REVEAL_MS = 1150;
const REVEAL_SETTLE_MS = 200;
const BOOT_HOLD_MS = 1050;

/**
 * Boot intro only — internal navigations use normal Next.js routing.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const booted = useRef(false);
  const timers = useRef<number[]>([]);
  const reduceRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    reduceRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    if (reduceRef.current) return;

    try {
      if (sessionStorage.getItem("garv-transition-booted")) return;
      sessionStorage.setItem("garv-transition-booted", "1");
    } catch {
      /* ignore */
    }

    setPhase("covering");
    schedule(() => setPhase("holding"), COVER_MS);
    schedule(() => setPhase("revealing"), COVER_MS + BOOT_HOLD_MS);
    schedule(() => setPhase("idle"), COVER_MS + BOOT_HOLD_MS + REVEAL_MS + REVEAL_SETTLE_MS);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
} as const;
