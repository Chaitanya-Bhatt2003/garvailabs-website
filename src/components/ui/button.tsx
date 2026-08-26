"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { springSnappy } from "@/lib/motion";

type Variant = "primary" | "outline" | "dark" | "onDark";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
  outline: "border border-line-strong bg-surface/60 text-text hover:bg-soft hover:border-line-strong",
  dark: "bg-dark text-dark-text font-medium hover:bg-dark-soft",
  onDark:
    "btn-primary bg-accent text-on-accent font-semibold shadow-[var(--shadow-sm)] hover:bg-accent-hover",
};

/**
 * Magnetic CTA — pulls slightly toward the cursor on desktop (luxury SaaS pattern).
 */
export function Cta({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
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
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={reduce ? undefined : { x: sx, y: sy }} className="inline-flex max-[480px]:w-full">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`group press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out ${variants[variant]} ${className}`}
      >
        {children}
        {arrow && (
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        )}
      </Link>
    </motion.div>
  );
}
