"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerFast, wordReveal } from "@/lib/motion";

/** Word-by-word headline reveal — keeps accessible text via sr-only. */
export function TextReveal({
  text,
  accentWords = [],
  className = "",
  as: Tag = "span",
}: {
  text: string;
  accentWords?: string[];
  className?: string;
  as?: "h1" | "h2" | "span";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((w, i) => {
          const accent = accentWords.some((a) => w === a);
          return (
            <span key={`${w}-${i}`} className={accent ? "text-accent-text" : undefined}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span className="inline" variants={staggerFast} initial="hidden" animate="show" aria-hidden="true">
        {words.map((w, i) => {
          const accent = accentWords.some((a) => w === a);
          return (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
              <motion.span
                variants={wordReveal}
                className={`inline-block ${accent ? "text-accent-text" : ""}`}
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          );
        })}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
