import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";
import { services, getService } from "@/lib/services";
import { caseStudies } from "@/lib/work";
import { contactBookHref } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = caseStudies.filter((c) => service.relatedWork.includes(c.slug));
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* hero */}
      <section className="page-top">
        <div className="shell">
          <Rise>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-base text-muted transition-colors hover:text-text"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              All services
            </Link>
          </Rise>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Rise delay={0.06}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                  <service.icon size={20} strokeWidth={1.9} aria-hidden="true" />
                </span>
              </Rise>
              <Rise delay={0.1}>
                <p className="eyebrow mt-6">{service.name}</p>
              </Rise>
              <Rise delay={0.14}>
                <h1 className="mt-4 max-w-[18ch] text-5xl">
                  {service.headline}
                </h1>
              </Rise>
              <Rise delay={0.18}>
                <p className="mt-6 max-w-[54ch] text-md leading-[1.65] text-muted">{service.intro}</p>
              </Rise>
              <Rise delay={0.22}>
                <div className="mt-9">
                  <Cta href="/contact" arrow>
                    Discuss this
                  </Cta>
                </div>
              </Rise>
            </div>

            <Rise delay={0.16} className="lg:pt-24">
              <div className="rounded-lg border border-line bg-soft p-7 md:p-8">
                <h2 className="text-2xs font-semibold uppercase tracking-[0.18em] text-muted">
                  What we work with
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* what's included */}
      <section className="band">
        <div className="shell">
          <Rise className="max-w-2xl">
            <h2 className="text-4xl">What this includes</h2>
          </Rise>
          <div className="mt-10 grid gap-4 md:mt-12 sm:grid-cols-2">
            {service.offerings.map((o, i) => (
              <Rise key={o.title} delay={(i % 2) * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-7 md:p-8">
                  <h3 className="text-xl">{o.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{o.body}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* process — numbered because it is a real sequence */}
      <section className="band border-t border-line bg-soft">
        <div className="shell">
          <Rise className="max-w-2xl">
            <h2 className="text-4xl">How we run it</h2>
          </Rise>
          <ol className="mt-10 grid gap-8 md:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {service.process.map((p, i) => (
              <Rise as="li" key={p.step} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col">
                  <span className="num text-sm text-accent-text">{p.step}</span>
                  <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2.5 text-base leading-relaxed text-muted">{p.body}</p>
                </div>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      {/* related work */}
      {related.length > 0 && (
        <section className="band">
          <div className="shell">
            <Rise className="max-w-2xl">
              <h2 className="text-4xl">Where we have done this</h2>
            </Rise>
            <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Rise key={c.slug} delay={i * 0.07} className="h-full">
                  <Link
                    href={`/work/${c.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors hover:border-line-strong"
                  >
                    <p className="eyebrow">{c.sector}</p>
                    <h3 className="mt-4 flex-1 text-xl leading-snug">{c.title}</h3>
                    <p className="num mt-5 text-3xl text-accent-text">{c.headline.value}</p>
                    <p className="mt-1.5 text-sm text-muted">{c.headline.label}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-base font-medium">
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
      )}

      {/* other services */}
      <section className="band border-t border-line">
        <div className="shell">
          <Rise>
            <h2 className="text-3xl">Other services</h2>
          </Rise>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Rise key={s.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-3.5 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                    <s.icon size={16} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{s.name}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted">{s.short}</span>
                  </span>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="band bg-dark">
        <div className="shell">
          <Rise className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl text-dark-text">
              Tell us the workflow. We will tell you what it needs.
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-md leading-relaxed text-dark-muted">
              A short call, one real process, and an honest answer — including when the answer is
              that you do not need us.
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href={contactBookHref}
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
