import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { services } from "@/lib/services";

export function ServicesGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Rise key={s.slug} delay={(i % 3) * 0.06} className="h-full">
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col bg-bg p-7 transition-colors duration-200 hover:bg-surface md:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent-text">
              <s.icon size={18} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl">{s.name}</h3>
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
  );
}
