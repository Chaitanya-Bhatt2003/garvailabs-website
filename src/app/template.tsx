"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageEnter } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={pageEnter.initial}
      animate={pageEnter.animate}
      className="will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.div>
  );
}
