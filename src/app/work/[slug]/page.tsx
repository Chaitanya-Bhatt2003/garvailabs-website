import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { caseStudies, getCaseStudy } from "@/lib/work";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <section className="page-top">
        <div className="shell">
          <Rise>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 text-base text-muted transition-colors hover:text-text"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              All work
            </Link>
          </Rise>

          <Rise delay={0.06}>
            <p className="eyebrow mt-6">{study.sector}</p>
          </Rise>
          <Rise delay={0.1}>
            <h1 className="mt-4 max-w-[22ch] text-5xl leading-[1.06]">
              {study.title}
            </h1>
          </Rise>
          <Rise delay={0.14}>
            <p className="mt-6 max-w-[58ch] text-md leading-[1.65] text-muted">{study.summary}</p>
          </Rise>

          {/* results up top — the reason to keep reading */}
          <Rise delay={0.18}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.label} className="bg-surface p-6 md:p-7">
                  <dt className="num text-4xl leading-none text-accent-text">
                    {r.value}
                  </dt>
                  <dd className="mt-3 text-base leading-snug text-muted">{r.label}</dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>
      </section>

      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Rise>
            <h2 className="text-3xl">The problem</h2>
            <ul className="mt-7 flex flex-col gap-4">
              {study.problem.map((p) => (
                <li key={p} className="flex gap-3.5 text-base leading-relaxed text-muted md:text-md">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={0.08}>
            <h2 className="text-3xl">What we built</h2>
            <ul className="mt-7 flex flex-col gap-4">
              {study.solution.map((s) => (
                <li key={s} className="flex gap-3.5 text-base leading-relaxed text-muted md:text-md">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <Check size={11} strokeWidth={3} className="text-accent-text" aria-hidden="true" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <Rise>
            <h2 className="text-3xl">Technology</h2>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {study.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-base text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <Rise>
            <h2 className="text-3xl">More work</h2>
          </Rise>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((c, i) => (
              <Rise key={c.slug} delay={i * 0.07} className="h-full">
                <Link
                  href={`/work/${c.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors hover:border-line-strong"
                >
                  <p className="eyebrow">{c.sector}</p>
                  <h3 className="mt-4 flex-1 text-xl leading-snug">{c.title}</h3>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-accent-text">
                    Read the case
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-dark">
        <div className="shell">
          <Rise className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl text-dark-text">Have a problem shaped like this?</h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-md leading-relaxed text-dark-muted">
              Tell us the workflow and the constraints it runs under. We will tell you whether it is
              worth building.
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-on-accent transition-colors hover:bg-accent-hover"
              >
                Book a call
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
