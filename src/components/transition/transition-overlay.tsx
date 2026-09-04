"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransitionOptional, transitionTiming } from "@/components/transition/transition-provider";
import { easeOut, easePremium } from "@/lib/motion";

/** Cinematic zoom — slow approach, decisive pass-through */
const easeZoom = [0.42, 0, 0.18, 1] as const;

function TransitionLogo() {
  return (
    <Image
      src="/garvai-mark.png"
      alt="GARV"
      width={195}
      height={195}
      priority
      className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
      sizes="72px"
    />
  );
}

/**
 * Boot-only intro — starts when the logo appears, then cinematic zoom-through → site.
 * The earlier mosaic cover is intentionally omitted.
 */
export function TransitionOverlay() {
  const ctx = usePageTransitionOptional();
  const reduce = useReducedMotion();

  if (!ctx || reduce) return null;

  const { phase } = ctx;
  const visible = phase !== "idle";
  const holding = phase === "holding";
  const revealing = phase === "revealing";
  const logoVisible = holding || revealing;

  const revealDur = transitionTiming.revealMs / 1000;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="transition-root"
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: revealing ? [1, 1, 0] : 1 }}
          transition={{
            opacity: revealing
              ? { duration: revealDur, times: [0, 0.78, 1], ease: easeOut }
              : { duration: 0.2 },
          }}
          aria-hidden="true"
          role="presentation"
        >
          {/* Stage for the logo — same finished field the mosaic used to leave behind */}
          {holding && <div className="absolute inset-0 bg-dark" />}

          {/* Reveal — dark field dissolves as we pass through the logo */}
          {revealing && (
            <motion.div
              className="absolute inset-0 z-[5] bg-dark"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                delay: revealDur * 0.42,
                duration: revealDur * 0.58,
                ease: easePremium,
              }}
            />
          )}

          {/* Logo — hold, then cinematic zoom-through */}
          {logoVisible && (
            <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
              <motion.div
                className="relative flex items-center justify-center will-change-transform"
                style={{ transformOrigin: "center center" }}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={
                  holding
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: [1, 1, 0],
                        scale: [1, 1.04, 52],
                      }
                }
                transition={
                  holding
                    ? { duration: 0.65, ease: easeOut }
                    : {
                        opacity: {
                          duration: revealDur,
                          times: [0, 0.68, 1],
                          ease: easeOut,
                        },
                        scale: {
                          duration: revealDur,
                          times: [0, 0.08, 1],
                          ease: easeZoom,
                        },
                      }
                }
              >
                {/* Accent halo — breathes on hold, expands on zoom */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(72vw,320px)] w-[min(72vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(238,99,82,0.32) 0%, rgba(238,99,82,0.1) 38%, transparent 68%)",
                  }}
                  initial={{ scale: 0.85, opacity: 0.5 }}
                  animate={
                    holding
                      ? { scale: [0.85, 1.05, 0.85], opacity: [0.45, 0.7, 0.45] }
                      : { scale: [1, 2.8, 6], opacity: [0.55, 0.35, 0] }
                  }
                  transition={
                    holding
                      ? { duration: 1.8, ease: easeOut, repeat: Infinity, repeatType: "mirror" }
                      : { duration: revealDur, ease: easePremium }
                  }
                />

                {/* Fine ring — sells depth during the zoom */}
                {revealing && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-[5] rounded-full border border-accent/30"
                    style={{ transformOrigin: "center center" }}
                    initial={{ width: 72, height: 72, x: "-50%", y: "-50%", opacity: 0.55 }}
                    animate={{
                      width: "180vmax",
                      height: "180vmax",
                      opacity: 0,
                    }}
                    transition={{ duration: revealDur * 0.92, ease: easeZoom, delay: 0.04 }}
                  />
                )}

                <motion.div
                  animate={holding ? { scale: [1, 1.035, 1] } : { scale: 1 }}
                  transition={
                    holding
                      ? { duration: 1.8, ease: easeOut, repeat: Infinity, repeatType: "mirror" }
                      : { duration: 0.2 }
                  }
                >
                  <TransitionLogo />
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
