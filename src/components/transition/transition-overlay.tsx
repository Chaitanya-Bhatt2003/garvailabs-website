"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransitionOptional, transitionTiming } from "@/components/transition/transition-provider";
import { easeIn, easeOut, easePremium } from "@/lib/motion";

/** Nominal-style bloom deceleration — soft landing at the end of the iris */
const easeBloom = [0.33, 1, 0.68, 1] as const;

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
 * Boot-only intro — mosaic tiles close in, logo holds, then a Nominal-style
 * radial bloom opens from the center (iris + soft halo).
 */
export function TransitionOverlay() {
  const ctx = usePageTransitionOptional();
  const reduce = useReducedMotion();
  const { cols, rows } = useTileGrid();
  const tiles = useMemo(() => buildTiles(cols, rows), [cols, rows]);

  if (!ctx || reduce) return null;

  const { phase } = ctx;
  const visible = phase === "covering" || phase === "holding" || phase === "revealing";
  const covering = phase === "covering";
  const holding = phase === "holding";
  const revealing = phase === "revealing";
  const mosaicVisible = covering || holding;

  const coverDur = transitionTiming.coverMs / 1000;
  const revealDur = transitionTiming.revealMs / 1000;
  const coverStagger = coverDur * 0.48;
  const coverTileDur = Math.max(0.38, coverDur - coverStagger * 0.92);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="transition-root"
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: easeOut } }}
          aria-hidden="true"
          role="presentation"
        >
          <div className="absolute inset-0 bg-dark" />

          {/* Cover — mosaic tiles cascade inward */}
          {mosaicVisible && (
            <div
              className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              }}
            >
              {tiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  className="relative min-h-0 min-w-0 will-change-transform"
                  style={{ transformOrigin: tile.origin }}
                  initial={{ scale: 0, opacity: 0.94 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: coverTileDur,
                    ease: easeIn,
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
            </div>
          )}

          {/* Reveal — Nominal-style radial bloom from center */}
          {revealing && (
            <>
              {/* Tiles bloom outward (center → edges) before the iris clears */}
              <div
                className="absolute inset-0 z-[8] grid"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                }}
              >
                {tiles.map((tile) => {
                  const bloomDelay = (1 - tile.dist) * revealDur * 0.42;
                  return (
                    <motion.div
                      key={`bloom-${tile.id}`}
                      className="relative min-h-0 min-w-0 will-change-transform"
                      style={{ transformOrigin: "center center" }}
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.22, opacity: 0 }}
                      transition={{
                        duration: revealDur * 0.55,
                        ease: easeBloom,
                        delay: bloomDelay,
                      }}
                    >
                      <div className="absolute inset-[0.5px] bg-dark sm:inset-[1px]" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Iris — circular aperture opens from the logo focal point */}
              <motion.div
                className="absolute inset-0 z-10 bg-dark will-change-[clip-path]"
                initial={{ clipPath: "circle(150% at 50% 50%)" }}
                animate={{ clipPath: "circle(0% at 50% 50%)" }}
                transition={{ duration: revealDur, ease: easeBloom }}
              />

              {/* Soft bloom halo — accent pulse at the expanding edge */}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[12] h-[min(88vw,520px)] w-[min(88vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(238,99,82,0.22) 0%, rgba(238,99,82,0.06) 42%, transparent 72%)",
                }}
                initial={{ scale: 0.15, opacity: 0.75 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: revealDur * 0.92, ease: easePremium }}
              />
            </>
          )}

          {/* Logo — holds, then dissolves into the bloom */}
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: holding ? 1 : 0,
              scale: holding ? 1 : revealing ? 1.1 : 0.92,
              filter: revealing ? "blur(8px)" : "blur(0px)",
            }}
            transition={{
              duration: revealing ? 0.38 : 0.45,
              ease: easeOut,
            }}
          >
            <TransitionLogo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
