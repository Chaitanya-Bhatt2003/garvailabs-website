import type { Metadata, Viewport } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site, SITE } from "@/lib/site";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "GARV AI LABS — Intelligence that finishes the work",
    template: "%s · GARV AI LABS",
  },
  description:
    "GARV AI LABS builds AI-native systems that declutter operations, unite disconnected systems and turn data into decisive action. AI agents, software, mobile apps, websites, SEO and GEO.",
  keywords: [
    "AI agents India",
    "AI automation",
    "software development Kashipur",
    "mobile app development",
    "SEO",
    "generative engine optimization",
    "GARV AI LABS",
  ],
  openGraph: {
    title: "GARV AI LABS — Intelligence that finishes the work",
    description:
      "AI agents, software, mobile apps, websites, SEO and GEO — built and run from Kashipur, Uttarakhand.",
    url: SITE,
    siteName: "GARV AI LABS",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GARV AI LABS",
  url: SITE,
  logo: `${SITE}/garvai-logo.png`,
  description:
    "GARV AI LABS builds AI-native systems that declutter operations, unite disconnected systems and turn data into decisive action.",
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Kashipur",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#ee6352",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${syne.variable} ${outfit.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
