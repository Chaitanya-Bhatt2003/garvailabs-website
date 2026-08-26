"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { nav } from "@/lib/site";
import { services } from "@/lib/services";
import { duration, easeOut } from "@/lib/motion";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const opener = toggleRef.current;
    const items = () => Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);

    items()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [open]);

  return (
    <header
      data-nav-open={open ? "true" : "false"}
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/75 shadow-[var(--shadow-sm)] backdrop-blur-2xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-[76px]" aria-label="Primary">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label="GARV AI LABS — home">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href, pathname) ? "page" : undefined}
              className={`nav-link inline-flex min-h-11 items-center rounded-full px-4 text-base transition-[color,background-color] duration-200 ${
                isActive(l.href, pathname)
                  ? "bg-soft/80 text-text"
                  : "text-muted hover:bg-soft/60 hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary press ml-3 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-base font-semibold text-on-accent shadow-[var(--shadow-sm)] transition-[background-color,box-shadow] duration-200 hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="press -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-text md:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            key="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: duration.base, ease: easeOut }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <div className="shell flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-5">
              <Link
                href="/services"
                className="flex min-h-12 items-center rounded-xl px-2 text-lg font-medium transition-colors hover:bg-soft"
              >
                Services
              </Link>
              <ul className="mb-2 ml-2 flex flex-col border-l border-line pl-4">
                {services.map((s, i) => (
                  <motion.li
                    key={s.slug}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 + i * 0.028, duration: duration.fast, ease: easeOut }}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex min-h-11 items-center text-base text-muted transition-colors hover:text-text"
                    >
                      {s.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {nav
                .filter((l) => l.href !== "/services")
                .map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.035, duration: duration.fast, ease: easeOut }}
                  >
                    <Link
                      href={l.href}
                      className="flex min-h-12 items-center rounded-xl px-2 text-lg font-medium transition-colors hover:bg-soft"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: duration.base, ease: easeOut }}
              >
                <Link
                  href="/contact"
                  className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 font-semibold text-on-accent"
                >
                  Book a call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
