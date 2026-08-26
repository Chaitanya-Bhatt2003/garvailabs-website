"use client";

import { useEffect, useState } from "react";

/** Thin brand progress line under the nav — reading progress cue. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top)] z-[60] h-[2.5px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}
