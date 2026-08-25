import { Rise } from "@/components/ui/rise";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how" className="band scroll-mt-20 border-t border-line">
      <div className="shell">
        <Rise className="max-w-2xl">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-5 text-3xl md:text-4xl">Four steps, in this order, every time.</h2>
          <p className="mt-5 max-w-[52ch] text-md text-muted">
            We have not found a shortcut past any of them. Skipping the scoping step is how
            projects quietly go wrong in month two.
          </p>
        </Rise>

        {/* Numbered because this is a genuine sequence, not decoration. */}
        <ol className="mt-10 grid gap-10 md:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <Rise as="li" key={s.n} delay={i * 0.07} className="h-full">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-text">
                    <s.icon size={17} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="num text-sm text-muted">{s.n}</span>
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{s.body}</p>
              </div>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
