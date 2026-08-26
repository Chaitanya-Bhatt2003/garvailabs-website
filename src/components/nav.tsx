"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { nav } from "@/lib/site";
import { services } from "@/lib/services";

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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-[76px]" aria-label="Primary">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label="GARV AI LABS — home">
          <Wordmark />
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href, pathname) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-base transition-colors duration-200 ${
                isActive(l.href, pathname) ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-base font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
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
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-text md:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* mobile — full sheet, scrollable, services expanded inline */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden"
      >
        <div className="shell flex flex-col py-5">
          <Link
            href="/services"
            className="flex min-h-12 items-center rounded-xl px-2 text-lg font-medium hover:bg-soft"
          >
            Services
          </Link>
          <ul className="mb-2 ml-2 flex flex-col border-l border-line pl-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex min-h-11 items-center text-base text-muted hover:text-text"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>

          {nav
            .filter((l) => l.href !== "/services")
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-12 items-center rounded-xl px-2 text-lg font-medium hover:bg-soft"
              >
                {l.label}
              </Link>
            ))}

          <Link
            href="/contact"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-5 font-semibold text-on-accent"
          >
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
