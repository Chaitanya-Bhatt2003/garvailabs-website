import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { Cta } from "@/components/ui/button";
import { ProductMock } from "@/components/product-mock";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-40">
      <div className="shell grid items-center gap-14 pb-20 md:pb-28 lg:grid-cols-[1fr_1.02fr] lg:gap-20 lg:pb-36">
        <div>
          <Rise>
            <h1 className="text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
              Intelligence that <span className="text-accent-text">finishes the work.</span>
            </h1>
          </Rise>

          <Rise delay={0.08}>
            <p className="mt-7 max-w-[50ch] text-md leading-[1.65] text-muted">
              GARV AI LABS builds AI-native systems that declutter operations, unite disconnected
              systems, and turn data into decisive action — from agents and automation to the apps
              and platforms around them.
            </p>
          </Rise>

          <Rise delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href="/contact">Book a call</Cta>
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center gap-1.5 text-base text-muted underline-offset-[6px] transition-colors hover:text-text hover:underline"
              >
                See our work
                <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </Rise>
        </div>

        <Rise delay={0.16} className="lg:pl-4">
          <ProductMock />
        </Rise>
      </div>
    </section>
  );
}
