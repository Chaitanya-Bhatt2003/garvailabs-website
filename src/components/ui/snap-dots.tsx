"use client";

import { useEffect, useRef, useState } from "react";

/** Dot indicators for horizontal snap carousels on mobile. */
export function SnapDots({ count }: { count: number }) {
  const dotsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const dotsHost = dotsRef.current;
    if (!dotsHost || count < 2) return;

    // Structure is often: Rise → .snap-rail → cards, then SnapDots as sibling of Rise.
    const prev = dotsHost.previousElementSibling as HTMLElement | null;
    if (!prev) return;
    const rail = (prev.matches(".snap-rail") ? prev : prev.querySelector(".snap-rail")) as HTMLElement | null;
    if (!rail) return;

    const cards = Array.from(rail.children) as HTMLElement[];
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = cards.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { root: rail, threshold: 0.55 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [count]);

  if (count < 2) return null;

  return (
    <div
      ref={dotsRef}
      className="mt-4 flex items-center justify-center gap-2 md:hidden"
      role="tablist"
      aria-label="Carousel position"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
            i === active ? "w-5 bg-accent" : "w-1.5 bg-line-strong"
          }`}
          aria-current={i === active ? "true" : undefined}
        />
      ))}
    </div>
  );
}
