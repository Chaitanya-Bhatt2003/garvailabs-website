"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAL_URL } from "@/lib/cal";
import { springSnappy } from "@/lib/motion";

type Variant = "primary" | "outline" | "dark" | "onDark" | "nav";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
  outline:
    "border border-line-strong bg-surface/60 text-text hover:bg-soft hover:border-line-strong",
  dark: "bg-dark text-dark-text font-medium hover:bg-dark-soft",
  onDark:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
  nav: "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
};

/**
 * Opens Cal.com in a new browser tab (Chrome, Edge, Safari, etc.).
 * Uses a real link so pop-up blockers never interfere.
 */
export function BookCallButton({
  children,
  variant = "primary",
  arrow = false,
  className = "",
  tabIndex,
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springSnappy);
  const sy = useSpring(y, springSnappy);

  const onMove = (e: MouseEvent) => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass = `group press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out ${variants[variant]} ${className}`;

  return (
    <motion.div
      style={reduce ? undefined : { x: sx, y: sy }}
      className={`inline-flex ${variant === "nav" ? "" : "max-[480px]:w-full"}`}
    >
      <a
        ref={ref}
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${baseClass} ${variant === "nav" ? "min-h-11 px-5" : "w-full"}`}
        aria-label="Book a call with GARV AI LABS — opens Cal.com in a new tab"
      >
        {children}
        {arrow && (
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        )}
      </a>
    </motion.div>
  );
}

export function BookCallCta({
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <BookCallButton variant={variant} arrow={arrow} className={className}>
      {children}
    </BookCallButton>
  );
}
