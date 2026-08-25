import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { caseStudies } from "@/lib/work";

export function SelectedWork({ limit = 3 }: { limit?: number }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {caseStudies.slice(0, limit).map((c, i) => (
        <Rise as="article" key={c.slug} delay={i * 0.07} className="h-full">
          <Link
            href={`/work/${c.slug}`}
            className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors duration-200 hover:border-line-strong md:p-8"
          >
            <p className="eyebrow">{c.sector}</p>
            <h3 className="mt-4 text-xl leading-snug">{c.title}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{c.summary}</p>

            <div className="mt-7 border-t border-line pt-5">
              <p className="num text-3xl leading-none text-accent-text">{c.headline.value}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{c.headline.label}</p>
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-base font-medium">
              Read the case study
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
  );
}
