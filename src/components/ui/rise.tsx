"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RiseProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Subtle scroll reveal. The transition itself is CSS (.rise in globals.css) so
 * the reduced-motion and no-JS overrides can win without any script running —
 * this component only flips `data-shown`.
 */
export function Rise({ children, delay = 0, className = "", as = "div" }: RiseProps) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
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
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -70px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`rise ${className}`}
      style={{ "--rise-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
