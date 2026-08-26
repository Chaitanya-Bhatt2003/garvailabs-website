"use client";

import { services } from "@/lib/services";
import { Rise } from "@/components/ui/rise";

/**
 * Continuous capability rail — uses real service names only (no fake logos).
 * Decorative; duplicated track is aria-hidden for a11y.
 */
export function CapabilityRail() {
  const labels = services.map((s) => s.name);
  const loop = [...labels, ...labels];

  return (
    <Rise from="soft">
      <section
        className="relative border-y border-line bg-surface py-4 overflow-x-clip"
        aria-label="Capabilities"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-20"
        />

        <div className="marquee-track flex w-max items-center gap-3 hover:[animation-play-state:paused] sm:gap-4">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-line bg-soft/60 px-4 py-2 text-sm font-medium text-muted sm:px-5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {name}
            </span>
          ))}
        </div>
      </section>
    </Rise>
  );
}
