"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransitionOptional, transitionTiming } from "@/components/transition/transition-provider";
import { easeIn, easeOut } from "@/lib/motion";

function TransitionLogo() {
  return (
    <Image
      src="/garvai-mark.png"
      alt="GARV"
      width={195}
      height={195}
      priority
      className="h-12 w-12 sm:h-14 sm:w-14"
      sizes="56px"
    />
  );
}

/**
 * Full-viewport cinematic overlay — black panels + dotted-g mark hold.
 */
export function TransitionOverlay() {
  const ctx = usePageTransitionOptional();
  const reduce = useReducedMotion();

  if (!ctx || reduce) return null;

  const { phase } = ctx;
  const visible = phase === "covering" || phase === "holding" || phase === "revealing";
  const covering = phase === "covering" || phase === "holding";

  const coverDur = transitionTiming.coverMs / 1000;
  const revealDur = transitionTiming.revealMs / 1000;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="transition-root"
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          aria-hidden="true"
          role="presentation"
        >
          {/* Top panel — brand dark */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 origin-top bg-dark will-change-transform"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: covering ? 1 : 0 }}
            transition={{
              duration: covering ? coverDur : revealDur,
              ease: covering ? easeIn : easeOut,
            }}
          />

          {/* Bottom panel — brand dark */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-dark will-change-transform"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: covering ? 1 : 0 }}
            transition={{
              duration: covering ? coverDur : revealDur,
              ease: covering ? easeIn : easeOut,
            }}
          />

          {/* Center — dotted-g mark while fully covered */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: phase === "holding" ? 1 : 0,
              scale: phase === "holding" ? 1 : 0.97,
            }}
            transition={{ duration: 0.22, ease: easeOut }}
          >
            <TransitionLogo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
