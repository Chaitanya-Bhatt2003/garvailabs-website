import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { SelectedWork } from "@/components/selected-work";
import { HowItWorks } from "@/components/how-it-works";
import { FinalCta } from "@/components/final-cta";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";

/** Figures below are drawn from the case studies, so they stay verifiable. */
const proof = [
  { value: "60%", label: "less time spent grading seed at procurement centres" },
  { value: "80%", label: "fewer repeat submissions in government permitting" },
  { value: "20%", label: "revenue lift from the dental assistant we built" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* proof — real numbers, each one links to the case it came from */}
      <section className="border-y border-line bg-soft">
        <div className="shell py-12 md:py-16">
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {proof.map((p, i) => (
              <Rise key={p.value} delay={i * 0.06}>
                <p className="num text-4xl leading-none text-accent-text md:text-5xl">{p.value}</p>
                <p className="mt-3 max-w-[26ch] text-base leading-snug text-muted">{p.label}</p>
              </Rise>
            ))}
          </div>
          <Rise delay={0.2}>
            <p className="mt-10 text-sm text-muted">
              Measured on delivered projects.{" "}
              <Link href="/work" className="text-accent-text underline underline-offset-4">
                See the case studies
              </Link>
              .
            </p>
          </Rise>
        </div>
      </section>

      {/* services */}
      <section id="services" className="band scroll-mt-20">
        <div className="shell">
          <Rise className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="mt-5 text-3xl md:text-4xl">Six ways we take work off your team.</h2>
            <p className="mt-5 max-w-[52ch] text-md text-muted">
              From AI agents that finish a case end to end, to the software, apps and search
              visibility around them.
            </p>
          </Rise>

          <div className="mt-10 md:mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* work */}
      <section className="band border-t border-line">
        <div className="shell">
          <Rise className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-5 text-3xl md:text-4xl">Systems running in the field.</h2>
            <p className="mt-5 max-w-[52ch] text-md text-muted">
              Offline seed grading in rural procurement centres, a RAG assistant inside a dental
              EHR, object recognition for US permitting departments.
            </p>
          </Rise>

          <div className="mt-10 md:mt-12">
            <SelectedWork limit={3} />
          </div>

          <Rise delay={0.16}>
            <div className="mt-10">
              <Cta href="/work" variant="outline" arrow>
                All case studies
              </Cta>
            </div>
          </Rise>
        </div>
      </section>

      {/* how we work */}
      <HowItWorks />

      {/* about teaser */}
      <section className="band border-t border-line">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Rise>
            <p className="eyebrow">About</p>
            <h2 className="mt-5 text-3xl md:text-4xl">A small team in Kashipur, Uttarakhand.</h2>
          </Rise>
          <Rise delay={0.08}>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-muted md:text-md">
              <p>
                Most of our projects start the same way: somebody is doing something by hand,
                repeatedly, and the cost of that is no longer invisible.
              </p>
              <p>
                We build the system that takes that job on — and we will tell you when a process is
                not worth automating rather than quoting for a build.
              </p>
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-accent-text hover:underline"
              >
                More about us
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </Rise>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
