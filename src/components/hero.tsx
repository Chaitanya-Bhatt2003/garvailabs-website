"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cta } from "@/components/ui/button";
import { ProductMock } from "@/components/product-mock";
import { TextReveal } from "@/components/ui/text-reveal";
import { TiltFrame } from "@/components/ui/tilt-frame";
import { duration, easeOut, fadeUpSoft, stagger } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const enter = reduce ? undefined : fadeUpSoft;
  const group = reduce ? undefined : stagger;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const washY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const mockY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const mockScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <section ref={sectionRef} className="page-top relative overflow-x-clip">
      <motion.div
        aria-hidden="true"
        className="hero-wash pointer-events-none absolute inset-0 -z-10"
        style={reduce ? undefined : { y: washY }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, ease: easeOut }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 12% 0%, var(--accent-soft), transparent 55%), radial-gradient(ellipse 55% 40% at 88% 12%, rgba(238,99,82,0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 60% 80%, rgba(18,17,16,0.03), transparent 60%)",
          }}
        />
      </motion.div>
      <div aria-hidden="true" className="noise-overlay pointer-events-none absolute inset-0 -z-10" />

      <div className="band-b shell grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
        <motion.div
          className="min-w-0"
          variants={group}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.div variants={enter}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-sm text-muted shadow-[var(--shadow-xs)] backdrop-blur-sm">
              <Sparkles size={14} className="text-accent-text" aria-hidden="true" />
              AI agents · software · apps from Kashipur
            </span>
          </motion.div>

          <motion.div variants={enter} className="mt-6 overflow-visible md:mt-7">
            <h1 className="text-5xl !leading-[1.32] sm:text-6xl">
              <TextReveal
                as="span"
                className="inline"
                text="Intelligence that finishes the work."
                accentWords={["finishes", "work."]}
              />
            </h1>
          </motion.div>

          <motion.p
            variants={enter}
            className="mt-6 max-w-[50ch] text-md leading-[1.65] text-muted md:mt-7"
          >
            <span className="md:hidden">
              AI agents, software, and apps that take repeat work off your team — built from
              Kashipur.
            </span>
            <span className="hidden md:inline">
              GARV AI LABS builds AI-native systems that declutter operations, unite disconnected
              systems, and turn data into decisive action — from agents and automation to the apps
              and platforms around them.
            </span>
          </motion.p>

          <motion.div variants={enter} className="cta-stack mt-8 md:mt-10">
            <Cta href="/contact" className="max-[480px]:w-full">
              Book a call
            </Cta>
            <Link
              href="/work"
              className="group press inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full px-1 text-base text-muted underline-offset-[6px] transition-colors hover:text-text hover:underline max-[480px]:w-full max-[480px]:border max-[480px]:border-line max-[480px]:bg-surface/70 max-[480px]:px-5 max-[480px]:shadow-[var(--shadow-xs)]"
            >
              See our work
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="arrow-nudge" />
            </Link>
          </motion.div>

          <motion.ul
            variants={enter}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted md:mt-9"
          >
            {["Measured outcomes", "Written scopes", "Honest no when needed"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative min-w-0 max-w-full lg:pl-2"
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.975 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: easeOut, delay: reduce ? 0 : 0.2 }}
        >
          <motion.div className="relative" style={reduce ? undefined : { y: mockY, scale: mockScale }}>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-8 hidden h-28 w-28 rounded-full border border-accent/20 md:block"
              style={reduce ? undefined : { y: orbY }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-full bg-accent-soft blur-2xl md:block"
              style={reduce ? undefined : { y: washY }}
            />

            <div className="hidden min-w-0 max-w-full md:block">
              <TiltFrame>
                <div
                  className="rounded-xl p-[1px] shadow-[var(--shadow-lg)]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(238,99,82,0.32), rgba(18,17,16,0.06) 42%, rgba(18,17,16,0.04))",
                  }}
                >
                  <div className="overflow-hidden rounded-[calc(var(--radius-xl)-1px)] bg-surface">
                    <ProductMock framed />
                  </div>
                </div>
              </TiltFrame>
            </div>

            <details className="preview-sheet group glass rounded-xl open:bg-surface md:hidden">
              <summary className="press flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span>See product preview</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-soft text-sm text-muted transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="preview-body">
                <div className="min-w-0 max-w-full border-t border-line p-2.5 sm:p-3">
                  <ProductMock />
                </div>
              </div>
            </details>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
