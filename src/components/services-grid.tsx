import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SnapDots } from "@/components/ui/snap-dots";
import { services } from "@/lib/services";
import { staggerDelay } from "@/lib/motion";

function ServiceCard({
  s,
  className = "",
}: {
  s: (typeof services)[number];
  className?: string;
}) {
  return (
    <SpotlightCard className="h-full">
      <Link
        href={`/services/${s.slug}`}
        className={`press card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-7 shadow-[var(--shadow-sm)] transition-colors duration-200 md:p-8 ${className}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        />
        <span className="icon-chip flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
          <s.icon size={20} strokeWidth={1.9} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-xl leading-snug">{s.name}</h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{s.short}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-accent-text">
          Read more
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" className="arrow-nudge" />
        </span>
      </Link>
    </SpotlightCard>
  );
}

export function ServicesGrid() {
  return (
    <>
      <div className="md:hidden">
        <Rise from="soft">
          <div className="snap-rail flex" aria-label="Services">
            {services.map((s) => (
              <div key={s.slug} className="w-[min(82vw,300px)] shrink-0 snap-center">
                <ServiceCard s={s} />
              </div>
            ))}
          </div>
        </Rise>
        <SnapDots count={services.length} />
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {services.map((s, i) => (
          <Rise
            key={s.slug}
            delay={staggerDelay(i, 3, 0.075, 0.02)}
            from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
            className="h-full overflow-visible"
          >
            <ServiceCard s={s} />
          </Rise>
        ))}
      </div>
    </>
  );
}
