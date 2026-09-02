import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { services } from "@/lib/services";
import { BookCallCta } from "@/components/cal/book-call-button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation and agents, software development, mobile apps, websites, SEO and GEO — built and run by GARV AI LABS.",
};

export default function ServicesIndex() {
  return (
    <>
      <section className="page-top">
        <div className="shell">
          <Rise from="soft">
            <p className="eyebrow">Services</p>
          </Rise>
          <Rise delay={0.07} from="up">
            <h1 className="mt-5 max-w-[18ch] text-6xl">
              Six ways we take work off your team.
            </h1>
          </Rise>
          <Rise delay={0.14} from="soft">
            <p className="mt-6 max-w-[56ch] text-md leading-[1.65] text-muted">
              From AI agents that finish a case end to end, to the software, apps and search
              visibility that surround them. Every engagement starts with one workflow and a written
              scope.
            </p>
          </Rise>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {services.map((s, i) => (
              <Rise
                key={s.slug}
                delay={(i % 3) * 0.075 + Math.floor(i / 3) * 0.04}
                from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
                className="h-full"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="press card-lift group flex h-full flex-col rounded-xl border border-line bg-surface p-7 shadow-[var(--shadow-sm)] transition-colors duration-200 md:p-9"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-text transition-transform duration-300 group-hover:scale-105">
                    <s.icon size={20} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 text-xl">{s.name}</h2>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-accent-text">
                    Read more
                    <ArrowRight
                      size={15}
                      strokeWidth={2.2}
                      aria-hidden="true"
                      className="arrow-nudge"
                    />
                  </span>
                </Link>
              </Rise>
            ))}
          </div>

          <Rise delay={0.22} from="soft">
            <div className="mt-12 flex flex-col items-start gap-5 rounded-xl border border-line bg-soft p-8 shadow-[var(--shadow-sm)] md:flex-row md:items-center md:justify-between md:p-10">
              <p className="max-w-[46ch] text-md leading-relaxed">
                Not sure which of these your problem needs? Describe the workflow and we will tell
                you — including if the answer is none of them.
              </p>
              <BookCallCta arrow className="w-full shrink-0 sm:w-auto">
                Book a call
              </BookCallCta>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
