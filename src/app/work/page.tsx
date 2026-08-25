import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from GARV AI LABS across agriculture, healthtech, government and maritime — the problem, what we built, and the measured result.",
};

export default function WorkIndex() {
  return (
    <>
      <section className="page-top">
        <div className="shell">
          <Rise>
            <p className="eyebrow">Work</p>
          </Rise>
          <Rise delay={0.06}>
            <h1 className="mt-5 max-w-[18ch] text-6xl leading-[1.05]">
              Systems running in the field.
            </h1>
          </Rise>
          <Rise delay={0.12}>
            <p className="mt-6 max-w-[56ch] text-md leading-[1.65] text-muted">
              Five projects across agriculture, healthtech, government and maritime. Each one names
              the problem it started from, what we built, and what changed afterwards.
            </p>
          </Rise>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="flex flex-col gap-4">
            {caseStudies.map((c, i) => (
              <Rise as="article" key={c.slug} delay={(i % 2) * 0.06}>
                <Link
                  href={`/work/${c.slug}`}
                  className="group grid gap-7 rounded-lg border border-line bg-surface p-7 transition-colors duration-200 hover:border-line-strong md:p-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:gap-12"
                >
                  <div>
                    <p className="eyebrow">{c.sector}</p>
                    <h2 className="mt-4 max-w-[24ch] text-3xl leading-[1.15]">
                      {c.title}
                    </h2>
                    <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted md:text-md">
                      {c.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-accent-text">
                      Read the case study
                      <ArrowRight
                        size={15}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div className="rounded-card border border-line bg-soft p-6 lg:p-7">
                    <p className="num text-5xl leading-none text-accent-text">
                      {c.headline.value}
                    </p>
                    <p className="mt-3 text-base leading-snug text-muted">{c.headline.label}</p>
                  </div>
                </Link>
              </Rise>
            ))}
          </div>

          <Rise delay={0.16}>
            <div className="mt-12 flex flex-col items-start gap-5 rounded-lg border border-line bg-soft p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <p className="max-w-[46ch] text-md leading-relaxed">
                Every one of these started as a single workflow somebody was doing by hand.
              </p>
              <Cta href="/contact" arrow className="shrink-0">
                Start with yours
              </Cta>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
