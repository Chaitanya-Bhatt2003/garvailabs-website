"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { springSoft } from "@/lib/motion";

/** Subtle 3D tilt on hover — desktop only, reduced-motion safe. */
export function TiltFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), springSoft);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), springSoft);

  const onMove = (e: MouseEvent) => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <motion.div
        ref={ref}
        className="relative will-change-transform"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
