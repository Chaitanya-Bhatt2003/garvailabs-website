"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { TransitionProvider } from "@/components/transition/transition-provider";
import { TransitionOverlay } from "@/components/transition/transition-overlay";

/** Motion + cinematic page overlays. Honors prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <TransitionOverlay />
        {children}
      </TransitionProvider>
    </MotionConfig>
  );
}
