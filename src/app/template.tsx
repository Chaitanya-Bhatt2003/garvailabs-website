"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "@/lib/motion";

/**
 * Soft content settle after the full-screen overlay reveals.
 * Cover/uncover lives in TransitionOverlay (layout).
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut, delay: 0.15 }}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
