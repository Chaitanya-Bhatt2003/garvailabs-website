"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ScrollDriftProps = {
  children: ReactNode;
  className?: string;
  /** Max translate amplitude in px across the element's scroll travel. */
  distance?: number;
  /** Optional gentle scale settle into place (e.g. 0.97 → 1). */
  scaleFrom?: number;
};

/**
 * Subtle scroll-linked drift — depth without layout shift.
 * Transform-only; no-ops under prefers-reduced-motion.
 */
export function ScrollDrift({
  children,
  className = "",
  distance = 24,
  scaleFrom = 1,
}: ScrollDriftProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance * 0.3, -distance * 0.55]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [scaleFrom, 1, 1]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, ...(scaleFrom !== 1 ? { scale } : null) }}
    >
      {children}
    </motion.div>
  );
}
