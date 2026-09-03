import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { CapabilityRail } from "@/components/capability-rail";
import { ServicesGrid } from "@/components/services-grid";
import { SelectedWork } from "@/components/selected-work";
import { HowItWorks } from "@/components/how-it-works";
import { FinalCta } from "@/components/final-cta";
import { Rise } from "@/components/ui/rise";
import { ScrollDrift } from "@/components/ui/scroll-drift";
import { SectionHeading } from "@/components/ui/section-heading";
import { Cta } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityRail />

      {/* services */}
      <section id="services" className="band scroll-mt-20">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Six ways we take work off your team."
              body="From AI agents that finish a case end to end, to the software, apps and search visibility around them."
            />
            <Rise delay={0.16} from="soft" className="shrink-0 lg:pb-1">
              <Cta href="/services" variant="outline" arrow>
                All services
              </Cta>
            </Rise>
          </div>

          <div className="mt-10 md:mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* work */}
      <section className="band border-t border-line bg-soft/40">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems running in the field."
            body="Offline seed grading in rural procurement centres, a RAG assistant inside a dental EHR, object recognition for US permitting departments."
          />

          <div className="mt-10 md:mt-12">
            <SelectedWork limit={3} />
          </div>

          <Rise delay={0.18} from="soft">
            <div className="mt-10">
              <Cta href="/work" variant="outline" arrow>
                All case studies
              </Cta>
            </div>
          </Rise>
        </div>
      </section>

      <HowItWorks />

      {/* about teaser */}
      <section className="band border-t border-line">
        <div className="shell">
          <ScrollDrift distance={18} className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <Rise from="left" className="h-full">
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-surface p-8 shadow-[var(--shadow-sm)] md:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <p className="eyebrow !text-accent-text">About</p>
                </div>
                <h2 className="mt-5 text-3xl sm:text-4xl">
                  From first scope to go-live, you work with the builders.
                </h2>
              </div>
              <Link
                href="/about"
                className="group mt-10 inline-flex min-h-11 w-fit items-center gap-1.5 text-base font-medium text-accent-text hover:underline"
              >
                More about us
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
              </Link>
            </div>
          </Rise>

          <Rise delay={0.1} from="right" className="h-full">
            <div className="flex h-full flex-col gap-5 rounded-xl border border-line bg-soft/80 p-8 md:p-10">
              <p className="text-base leading-relaxed text-muted md:text-md">
                Most of our projects start the same way: somebody is doing something by hand,
                repeatedly, and the cost of that is no longer invisible.
              </p>
              <p className="text-base leading-relaxed text-muted md:text-md">
                We build the system that takes that job on — and we will tell you when a process is
                not worth automating rather than quoting for a build.
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {["Noida HQ", "Mon–Sat IST", "Written scopes"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Rise>
          </ScrollDrift>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
