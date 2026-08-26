"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Thumb-zone primary CTA on phones. Hidden on /contact, at the top of the
 * page, and when the final CTA band is already on screen.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hideRoute = pathname.startsWith("/contact");

  useEffect(() => {
    if (hideRoute) {
      setVisible(false);
      return;
    }

    const targets = [
      document.getElementById("final-cta"),
      document.getElementById("site-footer"),
    ].filter(Boolean) as HTMLElement[];

    let nearEnd = false;
    let scrolled = false;
    const intersecting = new Set<Element>();

    const sync = () => {
      setVisible(scrolled && !nearEnd);
    };

    const onScroll = () => {
      scrolled = window.scrollY > 360;
      sync();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | undefined;
    if (targets.length) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          nearEnd = intersecting.size > 0;
          sync();
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.02 },
      );
      targets.forEach((el) => io!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [hideRoute, pathname]);

  if (hideRoute) return null;

  return (
    <div
      data-mobile-cta={visible ? "visible" : "hidden"}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/80 shadow-[var(--shadow-md)] backdrop-blur-2xl transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <div className="shell flex items-center gap-3 py-3">
        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className="btn-primary press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 text-base font-semibold text-on-accent shadow-[var(--shadow-sm)]"
        >
          Book a call
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
