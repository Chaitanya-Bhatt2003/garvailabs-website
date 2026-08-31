import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Rise } from "@/components/ui/rise";
import { ContactForm } from "@/components/contact-form";
import { ContactRequestScroll } from "@/components/contact-scroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to GARV AI LABS about one real workflow. Noida, Uttar Pradesh, India. garvailabs@gmail.com · +91 97190 70711",
};

const agenda = [
  "Five minutes on the workflow and where it actually breaks",
  "Ten minutes on what we would build, and what we would not",
  "Five minutes on scope, timeline and what the first phase would cost",
];

export default function ContactPage() {
  return (
    <section className="page-top band-b">
      <ContactRequestScroll />
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <Rise from="soft">
            <p className="eyebrow">Contact</p>
          </Rise>
          <Rise delay={0.07} from="up">
            <h1 className="mt-6 max-w-[15ch] text-5xl">
              Tell us the workflow.
            </h1>
          </Rise>
          <Rise delay={0.14} from="soft">
            <p className="mt-6 max-w-[44ch] text-md leading-[1.65] text-muted">
              Bring one process your team keeps doing by hand. We will tell you what it would take
              to build, and say so plainly when it is not worth building.
            </p>
          </Rise>

          <Rise delay={0.2} from="up">
            <ol className="mt-10 space-y-4 border-t border-line pt-8">
              {agenda.map((a, i) => (
                <li key={a} className="flex gap-4 text-base leading-snug text-muted">
                  <span className="num shrink-0 text-sm text-muted">0{i + 1}</span>
                  {a}
                </li>
              ))}
            </ol>
          </Rise>

          <Rise delay={0.24}>
            <div className="mt-10 space-y-3.5 border-t border-line pt-8 text-base">
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-accent-text"
              >
                <Mail size={15} className="shrink-0 text-accent" aria-hidden="true" />
                <span className="break-all">{site.email}</span>
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-accent-text"
              >
                <Phone size={15} className="shrink-0 text-accent" aria-hidden="true" />
                {site.phone}
              </a>
              <p className="flex items-start gap-2.5 text-muted">
                <MapPin size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </p>
              <p className="flex items-start gap-2.5 text-muted">
                <Clock3 size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                {site.hours} · reply within one working day
              </p>
              <p className="flex items-start gap-2.5 text-muted">
                <ShieldCheck size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                Happy to sign your NDA before the call, not after
              </p>
            </div>
          </Rise>
        </div>

        <Rise delay={0.16} from="right" className="order-1 lg:order-2">
          <div id="request" className="scroll-mt-28">
            <p className="eyebrow lg:hidden">Contact</p>
            <h2 className="mt-4 text-3xl lg:hidden">Write your request</h2>
            <p className="mt-3 max-w-[44ch] text-base leading-[1.65] text-muted lg:hidden">
              Tell us the workflow — we will open your email app with the details filled in.
            </p>
            <div className="mt-6 lg:mt-0">
              <ContactForm />
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
