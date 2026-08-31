"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut, easePremium } from "@/lib/motion";
import { usePageTransitionOptional } from "@/components/transition/transition-provider";

/**
 * Soft content settle — stays hidden during boot cover/hold so the intro reads cleanly.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const transition = usePageTransitionOptional();
  const phase = transition?.phase ?? "idle";
  const booting = phase === "covering" || phase === "holding";
  const revealing = phase === "revealing";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={false}
      animate={{
        opacity: booting ? 0 : 1,
        scale: booting ? 0.984 : 1,
        y: booting ? 10 : 0,
      }}
      transition={{
        opacity: {
          duration: revealing ? 1.05 : 0.45,
          delay: revealing ? 0.52 : 0,
          ease: easePremium,
        },
        scale: {
          duration: revealing ? 1.1 : 0.5,
          delay: revealing ? 0.48 : 0,
          ease: easePremium,
        },
        y: {
          duration: revealing ? 0.95 : 0.45,
          delay: revealing ? 0.48 : 0,
          ease: easeOut,
        },
      }}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
