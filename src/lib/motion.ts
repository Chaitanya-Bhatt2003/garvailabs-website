/**
 * Premium motion language — springy, short, GPU-only (transform/opacity).
 */

export const easeOut = [0.22, 0.61, 0.36, 1] as const;
export const easeUi = [0.2, 0, 0, 1] as const;

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.36,
  enter: 0.52,
  slow: 0.7,
} as const;

/** Soft spring — expensive UI feel without bounce noise */
export const springSoft = { type: "spring" as const, stiffness: 280, damping: 28, mass: 0.8 };
export const springSnappy = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.65 };

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.enter, ease: easeOut },
  },
};

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: duration.base, ease: easeOut },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const wordReveal = {
  hidden: { opacity: 0, y: "0.55em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const pageEnter = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOut },
  },
};
