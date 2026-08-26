import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SnapDots } from "@/components/ui/snap-dots";
import { caseStudies } from "@/lib/work";
import { staggerDelay } from "@/lib/motion";

function WorkCard({
  c,
  className = "",
}: {
  c: (typeof caseStudies)[number];
  className?: string;
}) {
  return (
    <SpotlightCard className="h-full">
      <Link
        href={`/work/${c.slug}`}
        className={`press card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-7 shadow-[var(--shadow-sm)] transition-[border-color,transform,opacity,box-shadow] duration-200 md:p-8 ${className}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        />
        <p className="eyebrow">{c.sector}</p>
        <h3 className="mt-4 text-xl leading-snug">{c.title}</h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{c.summary}</p>

        <div className="mt-7 rounded-card bg-soft/80 px-4 py-4 transition-colors duration-200 group-hover:bg-accent-soft/40">
          <p className="num text-3xl leading-tight text-accent-text">{c.headline.value}</p>
          <p className="mt-2 text-sm leading-snug text-muted">{c.headline.label}</p>
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium">
          Read the case study
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        </span>
      </Link>
    </SpotlightCard>
  );
}

export function SelectedWork({ limit = 3 }: { limit?: number }) {
  const items = caseStudies.slice(0, limit);

  return (
    <>
      <div className="md:hidden">
        <Rise from="soft">
          <div className="snap-rail flex" aria-label="Selected work">
            {items.map((c) => (
              <div key={c.slug} className="w-[min(85vw,320px)] shrink-0 snap-center">
                <WorkCard c={c} className="h-full" />
              </div>
            ))}
          </div>
        </Rise>
        <SnapDots count={items.length} />
      </div>

      <div className="hidden gap-5 md:grid lg:grid-cols-3">
        {items.map((c, i) => (
          <Rise
            as="article"
            key={c.slug}
            delay={staggerDelay(i, 3, 0.08, 0.03)}
            from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
            className="h-full"
          >
            <WorkCard c={c} />
          </Rise>
        ))}
      </div>
    </>
  );
}
