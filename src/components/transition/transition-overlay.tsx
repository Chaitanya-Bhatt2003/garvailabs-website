"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransitionOptional, transitionTiming } from "@/components/transition/transition-provider";
import { easeOut, easePremium } from "@/lib/motion";

/** Cinematic zoom — slow approach, decisive pass-through */
const easeZoom = [0.42, 0, 0.18, 1] as const;
const easeCover = [0.45, 0, 0.15, 1] as const;

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

function useTileGrid() {
  const [grid, setGrid] = useState({ cols: 6, rows: 4 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setGrid({ cols: 4, rows: 6 });
      else if (w < 1024) setGrid({ cols: 6, rows: 5 });
      else setGrid({ cols: 8, rows: 5 });
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return grid;
}

type TileMeta = {
  id: number;
  col: number;
  row: number;
  dist: number;
  origin: string;
};

function buildTiles(cols: number, rows: number): TileMeta[] {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.hypot(cx, cy) || 1;
  const tiles: TileMeta[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dist = Math.hypot(col - cx, row - cy) / maxDist;
      const origin =
        row < cy
          ? col < cx
            ? "top left"
            : "top right"
          : col < cx
            ? "bottom left"
            : "bottom right";
      tiles.push({ id: row * cols + col, col, row, dist, origin });
    }
  }
  return tiles;
}

/**
 * Boot-only intro — 3s mosaic cover, logo hold, cinematic zoom into logo → site.
 */
export function TransitionOverlay() {
  const ctx = usePageTransitionOptional();
  const reduce = useReducedMotion();
  const { cols, rows } = useTileGrid();
  const tiles = useMemo(() => buildTiles(cols, rows), [cols, rows]);

  if (!ctx || reduce) return null;

  const { phase } = ctx;
  const visible = phase !== "idle";
  const covering = phase === "covering";
  const holding = phase === "holding";
  const revealing = phase === "revealing";
  const mosaicVisible = covering || holding;
  const logoVisible = holding || revealing;

  const coverDur = transitionTiming.coverMs / 1000;
  const revealDur = transitionTiming.revealMs / 1000;
  const coverStagger = coverDur * 0.52;
  const coverTileDur = Math.max(0.55, coverDur - coverStagger * 0.88);

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
          {/* Cover + hold — mosaic tiles cascade inward */}
          {mosaicVisible && (
            <motion.div
              className="absolute inset-0 grid bg-dark"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: revealing ? 0 : 1 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              {tiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  className="relative min-h-0 min-w-0 will-change-transform"
                  style={{ transformOrigin: tile.origin }}
                  initial={{ scale: 0, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: coverTileDur,
                    ease: easeCover,
                    delay: tile.dist * coverStagger,
                  }}
                >
                  <div className="absolute inset-[0.5px] bg-dark sm:inset-[1px]" />
                  {(tile.col + tile.row) % 5 === 0 ? (
                    <div
                      className="absolute inset-[0.5px] opacity-[0.14] sm:inset-[1px]"
                      style={{
                        background:
                          "linear-gradient(145deg, var(--accent), transparent 55%)",
                      }}
                    />
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
          )}

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
