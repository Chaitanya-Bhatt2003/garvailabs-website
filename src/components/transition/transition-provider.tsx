"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "holding" | "revealing";

type TransitionApi = {
  phase: Phase;
  /** Begin a covered navigation to an internal href */
  navigate: (href: string) => void;
  /** True while overlay is interacting with the viewport */
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

/** Safe optional access when provider might not wrap a tree */
export function usePageTransitionOptional() {
  return useContext(TransitionContext);
}

const COVER_MS = 340;
const HOLD_MS = 90;
const REVEAL_MS = 420;
const BOOT_HOLD_MS = 280;

function isModifiedEvent(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

function isInternalHref(href: string) {
  if (!href.startsWith("/")) return false;
  if (href.startsWith("//")) return false;
  if (href.startsWith("/#")) return false;
  return true;
}

function samePath(a: string, b: string) {
  const norm = (p: string) => p.replace(/\/$/, "") || "/";
  return norm(a) === norm(b);
}

/**
 * Orchestrates cinematic full-screen overlays for boot + internal navigations.
 * Visuals live in TransitionOverlay; this provider owns timing and routing.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
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

  // First paint: cover → hold → reveal (once per tab session)
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
    schedule(() => setPhase("idle"), COVER_MS + BOOT_HOLD_MS + REVEAL_MS);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After router lands on the pending href, finish uncover
  useEffect(() => {
    if (!pendingHref.current) return;
    if (!samePath(pathname, pendingHref.current.split("?")[0].split("#")[0])) return;

    pendingHref.current = null;
    window.scrollTo(0, 0);
    setPhase("holding");
    schedule(() => setPhase("revealing"), HOLD_MS);
    schedule(() => setPhase("idle"), HOLD_MS + REVEAL_MS);
    return clearTimers;
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (reduceRef.current) {
        router.push(href);
        return;
      }

      const pathOnly = href.split("?")[0].split("#")[0];
      if (samePath(pathOnly, pathname)) return;

      clearTimers();
      pendingHref.current = href;
      setPhase("covering");

      schedule(() => {
        setPhase("holding");
        router.push(href);
      }, COVER_MS);
    },
    [pathname, router],
  );

  // Capture internal link clicks site-wide
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || isModifiedEvent(e) || e.button !== 0) return;
      if (phase !== "idle") {
        e.preventDefault();
        return;
      }

      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      const hrefAttr = a.getAttribute("href");
      if (!hrefAttr || !isInternalHref(hrefAttr)) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;

      // Allow hash-only on same page
      if (hrefAttr.startsWith("#")) return;

      const url = new URL(hrefAttr, window.location.origin);
      if (url.origin !== window.location.origin) return;

      const next = `${url.pathname}${url.search}${url.hash}`;
      if (samePath(url.pathname, pathname) && !url.search && url.hash) {
        // in-page anchor — let browser handle
        return;
      }
      if (samePath(url.pathname, pathname) && url.search === window.location.search) {
        return;
      }

      e.preventDefault();
      navigate(next);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate, pathname, phase]);

  // Prevent scroll jump / interaction while covering
  useEffect(() => {
    if (phase === "idle" || phase === "revealing") {
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
      navigate,
      busy: phase !== "idle",
    }),
    [phase, navigate],
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export const transitionTiming = {
  coverMs: COVER_MS,
  holdMs: HOLD_MS,
  revealMs: REVEAL_MS,
  bootHoldMs: BOOT_HOLD_MS,
} as const;
