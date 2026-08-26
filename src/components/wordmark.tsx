import Image from "next/image";

/**
 * The real GARV AI LABS mark from garvailabs.com, trimmed to its content
 * bounds (1021×195). The source file carried transparent padding — 26/22px
 * left/right and an asymmetric 23/28px top/bottom — which both shrank the
 * mark inside its box and pushed it visually off-centre. Do not re-import
 * the untrimmed original.
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
      width={1021}
      height={195}
      priority
      sizes="(max-width: 768px) 158px, 189px"
      className="block h-[30px] w-auto md:h-[36px]"
    />
  );
}
