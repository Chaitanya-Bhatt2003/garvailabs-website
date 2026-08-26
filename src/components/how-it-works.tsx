import { Rise } from "@/components/ui/rise";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how" className="band scroll-mt-20 border-t border-line bg-soft/50">
      <div className="shell">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps, in this order, every time."
          body="We have not found a shortcut past any of them. Skipping the scoping step is how projects quietly go wrong in month two."
        />

        <ol className="relative mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {/* Desktop connector line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12%] right-[12%] top-[2.35rem] hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
          />

          {steps.map((s, i) => (
            <Rise as="li" key={s.n} delay={0.05 + i * 0.09} from="up" className="h-full">
              <div className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[var(--shadow-md)] md:p-7">
                <div className="relative z-[1] flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-text transition-transform duration-300 group-hover:scale-105">
                    <s.icon size={18} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="num text-sm text-muted">{s.n}</span>
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{s.body}</p>
              </div>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
