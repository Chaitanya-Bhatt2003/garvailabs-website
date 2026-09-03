import type { Metadata } from "next";
import Link from "next/link";
import { Rise } from "@/components/ui/rise";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GARV AI LABS collects, uses and protects information when you visit our website, book a call, or send an enquiry.",
};

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This policy applies to the website operated by <strong className="font-medium text-text">{site.name}</strong>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;), based in {site.address.line1}, {site.address.line2},{" "}
          {site.address.country}.
        </p>
        <p>
          Contact:{" "}
          <a
            href={site.gmailHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text underline underline-offset-4"
          >
            {site.email}
          </a>{" "}
          · {site.phone}.
        </p>
      </>
    ),
  },
  {
    id: "what-this-covers",
    title: "What this policy covers",
    body: (
      <>
        <p>It covers information related to this marketing website, including when you:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>browse pages on this site</li>
          <li>use the contact form or email links</li>
          <li>book a call through Cal.com</li>
          <li>interact with analytics tools we run on the site</li>
        </ul>
        <p className="mt-4">
          Client project work (software, apps, AI agents we build for customers) is governed by the
          contracts and NDAs for those engagements — not only this page.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3 className="text-lg font-semibold text-text">Information you send us</h3>
        <p className="mt-3">
          If you use the contact form or email us, you may share your name, work email, company,
          project focus, and a description of the workflow. That content is written into an email
          draft addressed to us. This site does not run a server-side form backend that stores those
          submissions in our own database.
        </p>
        <h3 className="mt-6 text-lg font-semibold text-text">Booking information</h3>
        <p className="mt-3">
          If you book a call, scheduling is handled by Cal.com. Details you enter there (name,
          email, time preference, notes) are processed by Cal.com under their terms and privacy
          policy, and shared with us so we can prepare for the call.
        </p>
        <h3 className="mt-6 text-lg font-semibold text-text">Automatic technical data</h3>
        <p className="mt-3">
          Like most websites, our hosting and analytics providers may receive standard technical
          data such as approximate location derived from IP, browser type, device type, pages
          viewed, referral source, and interaction events (clicks, scrolls, session recordings where
          enabled).
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use information",
    body: (
      <>
        <p>We use website-related information to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>respond to enquiries and schedule calls</li>
          <li>understand which pages and journeys are useful</li>
          <li>improve content, performance and accessibility</li>
          <li>protect the site against abuse or technical issues</li>
          <li>comply with legal obligations when required</li>
        </ul>
        <p className="mt-4">
          We do not sell personal information. We do not use contact-form content for unrelated
          advertising lists.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics and session tools",
    body: (
      <>
        <p>On production traffic we may use:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-text">Google Analytics 4</strong> — to measure
            visits, page views and high-level engagement.
          </li>
          <li>
            <strong className="font-medium text-text">Microsoft Clarity</strong> — to understand
            usability through aggregated analytics and session insights (for example heatmaps and
            recordings).
          </li>
        </ul>
        <p className="mt-4">
          These tools set or read cookies / similar identifiers as described in their own
          documentation. You can limit tracking through your browser settings, privacy extensions,
          or platform controls offered by Google and Microsoft.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <>
        <p>
          Cookies or local storage may be used for essential site behaviour, analytics, and
          third-party embeds (such as the Cal.com booking experience). Blocking non-essential
          cookies may reduce analytics quality but should not stop you from reading the site or
          emailing us.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share information with",
    body: (
      <>
        <p>We share website-related information only as needed with:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>hosting and delivery providers that run this site</li>
          <li>Google (Analytics)</li>
          <li>Microsoft (Clarity)</li>
          <li>Cal.com (call booking)</li>
          <li>email providers when you choose to send us a message</li>
          <li>professional advisers or authorities when legally required</li>
        </ul>
        <p className="mt-4">
          Processors act on our instructions or their published terms for the service you use (for
          example booking on Cal.com).
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    body: (
      <>
        <p>
          Enquiry emails and booking records are kept as long as needed to respond, run the
          business relationship, and meet record-keeping or legal requirements. Analytics data is
          retained according to the retention settings of each analytics provider.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <p>
          We use reputable hosting and HTTPS for this site. No method of transmission or storage is
          perfectly secure. If you need to share sensitive commercial information, ask us about an
          NDA and a secure channel before sending it.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: (
      <>
        <p>You can:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>email us to ask what contact information we hold from your enquiry</li>
          <li>ask us to update or delete enquiry records we control, where practical</li>
          <li>stop analytics via browser controls where available</li>
          <li>
            manage Cal.com-related data through Cal.com&apos;s tools or by contacting us about a
            booking
          </li>
        </ul>
        <p className="mt-4">
          If you are in a region with specific privacy rights (for example access, correction,
          erasure, or objection), contact us and we will handle the request as the law requires.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <>
        <p>
          This website is intended for business users. We do not knowingly collect personal
          information from children.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <>
        <p>
          We may update this page when our practices or tools change. The &ldquo;Last
          updated&rdquo; date at the top will change when we do. Continued use of the site after an
          update means the revised policy applies to new visits.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>
          Questions about privacy:{" "}
          <a
            href={site.gmailHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text underline underline-offset-4"
          >
            {site.email}
          </a>
          , or use the{" "}
          <Link href="/contact" className="text-accent-text underline underline-offset-4">
            contact page
          </Link>
          .
        </p>
        <p>
          {site.address.line1}, {site.address.line2}, {site.address.country}.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="page-top band-b">
      <div className="shell">
        <Rise from="soft">
          <p className="eyebrow">Legal</p>
        </Rise>
        <Rise delay={0.07} from="up">
          <h1 className="mt-5 max-w-[16ch] text-5xl sm:text-6xl">Privacy Policy</h1>
        </Rise>
        <Rise delay={0.12} from="soft">
          <p className="mt-5 max-w-[54ch] text-md leading-[1.65] text-muted">
            Plain language on what this website collects, what we do with it, and how to reach us.
            Last updated: 3 September 2026.
          </p>
        </Rise>

        <div className="mt-12 max-w-3xl space-y-12 md:mt-16 md:space-y-14">
          {sections.map((s, i) => (
            <Rise key={s.id} delay={Math.min(0.06 * i, 0.24)} from="soft">
              <section id={s.id} className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl">{s.title}</h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-muted md:text-md">
                  {s.body}
                </div>
              </section>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
