import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="band bg-dark">
      <div className="shell">
        <Rise className="mx-auto max-w-2xl text-center">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
            Start here
          </p>
          <h2 className="mt-6 text-5xl text-dark-text">
            Bring the process you keep doing by hand.
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-md leading-relaxed text-dark-muted">
            One workflow, a short call, and an honest answer on what it would take to automate it —
            including when it is not worth automating.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
            >
              Book a call
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-dark-line px-7 text-base font-medium text-dark-text transition-colors duration-200 hover:bg-dark-soft"
            >
              <Mail size={15} aria-hidden="true" />
              Email us
            </a>
          </div>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-dark-muted">
            <Phone size={14} aria-hidden="true" />
            {site.phone} · {site.hours}
          </p>
        </Rise>
      </div>
    </section>
  );
}
