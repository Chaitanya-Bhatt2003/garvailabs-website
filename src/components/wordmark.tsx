import Image from "next/image";

/**
 * Official mark from garvaiLogo.png — dotted-g + GARV (coral) + AI LABS (ink).
 * Cropped to content bounds (1021×195). Dark tone swaps ink to cream so the
 * full lockup stays readable on the footer.
 */
export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <Image
      src={dark ? "/garvai-logo-dark.png" : "/garvai-logo.png"}
      alt="GARV AI LABS"
      width={1021}
      height={195}
      priority
      sizes="(max-width: 768px) 158px, 189px"
      className="block h-[30px] w-auto md:h-[36px]"
    />
  );
}
