import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/work";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-dark-line bg-dark">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12">
          <div>
            <Wordmark tone="dark" />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-dark-muted">
              We build AI-native systems that declutter operations, unite disconnected systems, and
              turn data into decisive action.
            </p>
          </div>

          <div>
            <h2 className="text-2xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex min-h-8 items-center text-base text-dark-text/80 transition-colors hover:text-dark-text"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
              Work
            </h2>
            <ul className="mt-5 space-y-2.5">
              {caseStudies.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/work/${c.slug}`}
                    className="inline-flex min-h-8 items-center text-base text-dark-text/80 transition-colors hover:text-dark-text"
                  >
                    {c.sector.split(" · ")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/work"
                  className="inline-flex min-h-8 items-center text-base text-accent hover:underline"
                >
                  All work
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
              Contact
            </h2>
            <ul className="mt-5 space-y-3.5 text-base">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-8 items-center gap-2.5 text-dark-text/80 transition-colors hover:text-dark-text"
                >
                  <Mail size={15} className="shrink-0 text-accent" aria-hidden="true" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex min-h-8 items-center gap-2.5 text-dark-text/80 transition-colors hover:text-dark-text"
                >
                  <Phone size={15} className="shrink-0 text-accent" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-dark-muted">
                <MapPin size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-dark-line pt-7 text-sm text-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GARV AI LABS</p>
          <p>Kashipur, Uttarakhand, India · IST (UTC+5:30)</p>
        </div>
      </div>
    </footer>
  );
}
