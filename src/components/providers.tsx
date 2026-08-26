"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honors prefers-reduced-motion across all Framer Motion trees. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
