import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation and agents, software development, mobile apps, websites, SEO and GEO — built and run by GARV AI LABS.",
};

export default function ServicesIndex() {
  return (
    <>
      <section className="pt-28 md:pt-40">
        <div className="shell">
          <Rise>
            <p className="eyebrow">Services</p>
          </Rise>
          <Rise delay={0.06}>
            <h1 className="mt-5 max-w-[18ch] text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              Six ways we take work off your team.
            </h1>
          </Rise>
          <Rise delay={0.12}>
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
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Rise key={s.slug} delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col bg-bg p-7 transition-colors duration-200 hover:bg-surface md:p-9"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                    <s.icon size={18} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 text-xl">{s.name}</h2>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-accent-text">
                    Read more
                    <ArrowRight
                      size={15}
                      strokeWidth={2.2}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Rise>
            ))}
          </div>

          <Rise delay={0.2}>
            <div className="mt-12 flex flex-col items-start gap-5 rounded-lg border border-line bg-soft p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <p className="max-w-[46ch] text-md leading-relaxed">
                Not sure which of these your problem needs? Describe the workflow and we will tell
                you — including if the answer is none of them.
              </p>
              <Cta href="/contact" arrow className="shrink-0">
                Book a call
              </Cta>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
