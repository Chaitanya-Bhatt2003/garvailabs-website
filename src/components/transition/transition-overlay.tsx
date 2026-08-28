"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransitionOptional, transitionTiming } from "@/components/transition/transition-provider";
import { easeIn, easeOut, easePremium } from "@/lib/motion";

/** Nominal-style bloom deceleration */
const easeBloom = [0.33, 1, 0.68, 1] as const;
const easeCover = [0.45, 0, 0.15, 1] as const;

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
 * Boot-only intro — 3s mosaic cover, logo hold, Nominal-style radial bloom out.
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

  const coverDur = transitionTiming.coverMs / 1000;
  const revealDur = transitionTiming.revealMs / 1000;
  // Spread tile cascade across the full 3s cover window
  const coverStagger = coverDur * 0.52;
  const coverTileDur = Math.max(0.55, coverDur - coverStagger * 0.88);
  const bloomStagger = revealDur * 0.52;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="transition-root"
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: easeOut } }}
          aria-hidden="true"
          role="presentation"
        >
          {/* Cover + hold — mosaic tiles cascade inward over 3s */}
          {mosaicVisible && (
            <motion.div
              className="absolute inset-0 grid bg-dark"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: revealing ? 0 : 1 }}
              transition={{ duration: 0.15 }}
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

          {/* Reveal — radial bloom: tiles expand, iris opens, dual halo */}
          {revealing && (
            <>
              <div
                className="absolute inset-0 grid bg-dark"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                }}
              >
                {tiles.map((tile) => (
                  <motion.div
                    key={`bloom-${tile.id}`}
                    className="relative min-h-0 min-w-0 will-change-transform"
                    style={{ transformOrigin: "center center" }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.38, opacity: 0 }}
                    transition={{
                      duration: revealDur * 0.72,
                      ease: easeBloom,
                      delay: (1 - tile.dist) * bloomStagger,
                    }}
                  >
                    <div className="absolute inset-[0.5px] bg-dark sm:inset-[1px]" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute inset-0 z-10 bg-dark will-change-[clip-path]"
                initial={{ clipPath: "circle(150% at 50% 50%)" }}
                animate={{ clipPath: "circle(0% at 50% 50%)" }}
                transition={{ duration: revealDur, ease: easeBloom }}
              />

              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[12] h-[min(92vw,560px)] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(238,99,82,0.28) 0%, rgba(238,99,82,0.08) 42%, transparent 70%)",
                }}
                initial={{ scale: 0.08, opacity: 0.85 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: revealDur, ease: easePremium }}
              />

              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[11] h-[min(60vw,380px)] w-[min(60vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/25"
                initial={{ scale: 0.2, opacity: 0.5 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: revealDur * 0.88, ease: easeBloom, delay: 0.08 }}
              />
            </>
          )}

          {/* Logo — fades in during hold, dissolves into bloom */}
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{
              opacity: holding ? 1 : 0,
              scale: holding ? 1 : revealing ? 1.12 : 0.9,
              filter: revealing ? "blur(12px)" : "blur(0px)",
            }}
            transition={{
              duration: holding ? 0.65 : revealing ? 0.55 : 0.35,
              ease: easeOut,
            }}
          >
            <motion.div
              animate={holding ? { scale: [1, 1.045, 1] } : { scale: 1 }}
              transition={
                holding
                  ? { duration: 1.8, ease: easeOut, repeat: Infinity, repeatType: "mirror" }
                  : { duration: 0.3 }
              }
            >
              <TransitionLogo />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
