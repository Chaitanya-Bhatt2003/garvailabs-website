import { Rise } from "@/components/ui/rise";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  delay?: number;
}) {
  const center = align === "center";

  return (
    <Rise delay={delay} className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        <p className="eyebrow !text-accent-text">{eyebrow}</p>
      </div>
      <h2 className="mt-5 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.2]">{title}</h2>
      {body ? (
        <p className={`mt-5 max-w-[52ch] text-md text-muted ${center ? "mx-auto" : ""}`}>{body}</p>
      ) : null}
    </Rise>
  );
}
