"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransitionOptional, transitionTiming } from "@/components/transition/transition-provider";
import { easeIn, easeOut, easePremium } from "@/lib/motion";

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
  /** 0 at center → 1 at corners — drives cascade order */
  dist: number;
  /** Alternating transform origin for a more tactile mosaic */
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
 * Full-viewport mosaic transition — responsive tiles cascade in/out
 * around a centered dotted-g hold (not a curtain wipe).
 */
export function TransitionOverlay() {
  const ctx = usePageTransitionOptional();
  const reduce = useReducedMotion();
  const { cols, rows } = useTileGrid();
  const tiles = useMemo(() => buildTiles(cols, rows), [cols, rows]);

  if (!ctx || reduce) return null;

  const { phase } = ctx;
  const visible = phase === "covering" || phase === "holding" || phase === "revealing";
  const covering = phase === "covering" || phase === "holding";

  const coverDur = transitionTiming.coverMs / 1000;
  const revealDur = transitionTiming.revealMs / 1000;
  // Leave room inside the phase window for the longest tile stagger
  const staggerSpan = Math.min(0.28, coverDur * 0.55);
  const tileDur = covering ? coverDur - staggerSpan * 0.85 : revealDur - staggerSpan * 0.85;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="transition-root"
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          aria-hidden="true"
          role="presentation"
        >
          {/* Soft underlay — kills flash between staggered tiles */}
          <motion.div
            className="absolute inset-0 bg-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: covering ? 1 : 0 }}
            transition={{
              duration: covering ? 0.14 : revealDur * 0.55,
              ease: covering ? easeIn : easeOut,
              delay: covering ? 0 : revealDur * 0.35,
            }}
          />

          {/* Responsive mosaic */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {tiles.map((tile) => {
              // Cover: outside → in. Reveal: center → out (opens like a bloom).
              const coverDelay = tile.dist * staggerSpan;
              const revealDelay = (1 - tile.dist) * staggerSpan * 0.85;

              return (
                <motion.div
                  key={tile.id}
                  className="relative min-h-0 min-w-0 will-change-transform"
                  style={{ transformOrigin: tile.origin }}
                  initial={{ scale: 0, opacity: 0.92 }}
                  animate={
                    covering
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0.85 }
                  }
                  transition={{
                    duration: Math.max(0.22, tileDur),
                    ease: covering ? easeIn : easePremium,
                    delay: covering ? coverDelay : revealDelay,
                  }}
                >
                  <div className="absolute inset-[0.5px] bg-dark sm:inset-[1px]" />
                  {/* Hairline accent on a sparse subset — brand pulse without noise */}
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
              );
            })}
          </div>

          {/* Center — dotted-g mark while fully covered */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === "holding" ? 1 : 0,
              scale: phase === "holding" ? 1 : 0.94,
            }}
            transition={{ duration: 0.28, ease: easeOut }}
          >
            <TransitionLogo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
