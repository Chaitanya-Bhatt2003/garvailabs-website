"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { RiseFrom } from "@/lib/motion";

type RiseProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
  /** Once visible, keep shown (default). */
  once?: boolean;
  /**
   * Entrance direction / emphasis.
   * CSS-driven; only transform + opacity.
   */
  from?: RiseFrom;
};

/**
 * Scroll reveal — CSS-driven (transform + opacity) for perf.
 * Toggles `data-shown` when the node enters view.
 */
export function Rise({
  children,
  delay = 0,
  className = "",
  as = "div",
  once = true,
  from = "up",
}: RiseProps) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && shown)) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          }
        }
      },
      {
        // Trigger slightly early so motion feels continuous while scrolling
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.06,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, shown]);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      data-rise={from}
      className={`rise ${className}`}
      style={{ "--rise-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
