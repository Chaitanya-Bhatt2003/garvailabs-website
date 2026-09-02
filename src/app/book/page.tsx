import type { Metadata } from "next";
import { Rise } from "@/components/ui/rise";
import { CalInlineEmbed } from "@/components/cal/cal-inline-embed";
import { CAL_URL } from "@/lib/cal";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Schedule a 15 or 30 minute call with GARV AI LABS. Pick a time that works for you.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="page-top band-b">
      <div className="shell max-w-3xl">
        <Rise from="soft">
          <p className="eyebrow">Book a call</p>
        </Rise>
        <Rise delay={0.07} from="up">
          <h1 className="mt-6 max-w-[18ch] text-5xl">Pick a time.</h1>
        </Rise>
        <Rise delay={0.12} from="soft">
          <p className="mt-6 max-w-[48ch] text-md leading-[1.65] text-muted">
            Choose a 15 or 30 minute slot. We will use the call to understand your workflow and
            whether we are the right fit.
          </p>
        </Rise>
        <Rise delay={0.16} from="up" className="mt-10">
          <CalInlineEmbed />
        </Rise>
        <Rise delay={0.2}>
          <p className="mt-8 text-center text-sm text-muted">
            Prefer email first?{" "}
            <a href="/contact#request" className="font-medium text-accent-text hover:underline">
              Write a request instead
            </a>
            {" · "}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-text hover:underline"
            >
              Open on Cal.com
            </a>
          </p>
        </Rise>
      </div>
    </section>
  );
}
