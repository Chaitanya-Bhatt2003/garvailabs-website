import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { BookCallCta } from "@/components/cal/book-call-button";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "GARV AI LABS builds AI-native systems for businesses in India and beyond — from Noida, Uttar Pradesh.",
};

const principles = [
  {
    title: "One workflow first",
    body: "We start with a single process, not a platform rollout. The first thing we build earns the trust and the rules that make the second thing fast.",
  },
  {
    title: "A human owns the irreversible",
    body: "Money moved, records changed, anything a customer cannot undo — the system prepares it and stops. A named person approves, with the evidence attached.",
  },
  {
    title: "It has to work in the field",
    body: "Our software runs at rural procurement centres and on ships. Offline operation, mid-range hardware and non-technical users are the normal case, not the edge case.",
  },
  {
    title: "We will say when it is not worth it",
    body: "Not every process should be automated. If a spreadsheet and a clear owner would fix it, we will tell you that instead of quoting for a build.",
  },
];

const sectors = [
  "Agriculture & FPOs",
  "Healthcare & HealthTech",
  "Government & public sector",
  "Maritime & logistics",
  "BFSI",
  "Retail & manufacturing",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-top">
        <div className="shell">
          <Rise from="soft">
            <p className="eyebrow">About</p>
          </Rise>
          <Rise delay={0.07} from="up">
            <h1 className="mt-5 max-w-[20ch] text-6xl">
              We build AI-native systems that do the work.
            </h1>
          </Rise>
          <Rise delay={0.14} from="soft">
            <p className="mt-6 max-w-[58ch] text-md leading-[1.65] text-muted">
              GARV AI LABS declutters operations, unites disconnected systems, and turns data into
              decisive action. We work from Noida, Uttar Pradesh, with clients across India and
              abroad — in agriculture, healthcare, government and maritime.
            </p>
          </Rise>
        </div>
      </section>

      {/* what we do */}
      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Rise from="left">
            <h2 className="text-4xl">What we actually do</h2>
            <div className="mt-7 flex flex-col gap-5 text-base leading-relaxed text-muted md:text-md">
              <p>
                Most of our projects start the same way: somebody is doing something by hand,
                repeatedly, and the cost of that is no longer invisible. A field officer grading
                seed by eye. A team matching ledger entries every morning. An applicant resubmitting
                the same drawings for the fourth time.
              </p>
              <p>
                We build the system that takes that job on — sometimes an AI agent, sometimes a
                mobile app that works without a signal, sometimes a vision model reading a live
                camera feed. What the technology is matters less than whether the work actually gets
                finished afterwards.
              </p>
              <p>
                From the first scope through go-live, you talk to the people building it — not a
                handoff chain between sales and delivery.
              </p>
            </div>
          </Rise>

          <Rise delay={0.1} from="right">
            <div className="rounded-lg border border-line bg-soft p-8 md:p-10">
              <h2 className="text-2xs font-semibold uppercase tracking-[0.18em] text-muted">
                Sectors we have shipped in
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {sectors.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-base md:text-md">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="rule my-8" />
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-accent-text hover:underline"
              >
                See the case studies
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </Rise>
        </div>
      </section>

      {/* principles */}
      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <Rise className="max-w-2xl">
            <h2 className="text-4xl">How we work</h2>
          </Rise>
          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
            {principles.map((p, i) => (
              <Rise
                key={p.title}
                delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.05}
                from={i % 2 === 0 ? "left" : "right"}
                className="h-full"
              >
                <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-7 shadow-[var(--shadow-sm)] md:p-8">
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{p.body}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* services + contact */}
      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Rise>
            <h2 className="text-3xl">What we offer</h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="press card-lift flex h-full items-start gap-3 rounded-xl border border-line bg-surface p-5 shadow-[var(--shadow-xs)] transition-colors hover:bg-soft"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
                      <s.icon size={15} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="text-base font-medium">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={0.08}>
            <h2 className="text-3xl">Where to find us</h2>
            <ul className="mt-7 flex flex-col gap-4 text-base md:text-md">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-11 items-center gap-3 transition-colors hover:text-accent-text"
                >
                  <Mail size={16} className="shrink-0 text-accent" aria-hidden="true" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex min-h-11 items-center gap-3 transition-colors hover:text-accent-text"
                >
                  <Phone size={16} className="shrink-0 text-accent" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <MapPin size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.country}
                </span>
              </li>
            </ul>
            <div className="mt-9">
              <BookCallCta arrow>
                Book a call
              </BookCallCta>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
