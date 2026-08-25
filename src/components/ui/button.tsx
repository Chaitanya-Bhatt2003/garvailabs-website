import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "dark" | "onDark";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent font-semibold hover:bg-accent-hover",
  outline: "border border-line-strong text-text hover:bg-soft",
  dark: "bg-dark text-dark-text font-medium hover:bg-dark-soft",
  onDark: "bg-accent text-on-accent font-semibold hover:bg-accent-hover",
};

export function Cta({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />}
    </Link>
  );
}
