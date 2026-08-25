import Image from "next/image";

/**
 * The real GARV AI LABS mark from garvailabs.com (1069×246).
 *
 * On dark grounds the PNG cannot be reused: its "AI LABS" lettering is black,
 * and inverting it would flatten the dotted-g out of the orange tile. So the
 * dark variant is set in type instead, following the same colour split.
 */
export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  if (tone === "dark") {
    return (
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-display text-lg font-bold text-on-accent"
        >
          g
        </span>
        <span className="font-display text-lg font-bold tracking-[-0.01em] text-dark-text">
          <span className="text-accent">GARV</span> AI LABS
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/garvai-logo.png"
      alt="GARV AI LABS"
      width={1069}
      height={246}
      priority
      sizes="(max-width: 768px) 140px, 164px"
      className="h-[30px] w-auto md:h-[34px]"
    />
  );
}
