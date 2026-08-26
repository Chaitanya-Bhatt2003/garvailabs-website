"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Soft brand glow that follows the cursor — desktop only. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setOn(true);
    };
    const leave = () => setOn(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[55] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      animate={{
        x: pos.x,
        y: pos.y,
        opacity: on ? 0.55 : 0,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 28, mass: 0.4 }}
      style={{
        background: "radial-gradient(circle, rgba(238,99,82,0.14) 0%, transparent 68%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
