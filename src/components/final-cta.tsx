"use client";

import { Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Rise } from "@/components/ui/rise";
import { site } from "@/lib/site";
import { BookCallCta } from "@/components/cal/book-call-button";
import { easeOut } from "@/lib/motion";

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section id="final-cta" className="band relative overflow-x-clip bg-dark">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={reduce ? false : { opacity: 0.6, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: easeOut }}
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(238,99,82,0.22), transparent 60%)",
        }}
      />
      <div className="shell relative">
        <Rise from="scale" className="mx-auto max-w-2xl text-center">
          <div className="mx-auto max-w-xl rounded-xl border border-dark-line bg-dark-soft/50 px-6 py-10 shadow-[var(--shadow-lg)] backdrop-blur-md sm:px-10 sm:py-12">
            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-dark-muted">
              Start here
            </p>
            <h2 className="mt-6 text-4xl text-dark-text sm:text-5xl">
              Bring the process you keep doing by hand.
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-md leading-relaxed text-dark-muted">
              One workflow, a short call, and an honest answer on what it would take to automate it —
              including when it is not worth automating.
            </p>

            <div className="cta-stack mx-auto mt-10 max-w-md justify-center sm:max-w-none">
              <BookCallCta className="max-[480px]:w-full">
                Book a call
              </BookCallCta>
              <a
                href={site.gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-dark-line px-7 text-base font-medium text-dark-text transition-colors duration-200 hover:bg-dark-soft max-[480px]:w-full"
              >
                <Mail size={15} aria-hidden="true" />
                Email us
              </a>
            </div>

            <p className="mt-8 flex flex-col items-center gap-1 text-sm text-dark-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 sm:gap-y-1">
              <span className="inline-flex items-center gap-2">
                <Phone size={14} aria-hidden="true" />
                {site.phone}
              </span>
              <span className="hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span>{site.hours}</span>
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
