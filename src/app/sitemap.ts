import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/work";

/**
 * Generated from the same arrays the pages render, so a new service or case
 * study cannot be added without appearing here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE, changeFrequency: "monthly" as const, priority: 1 },
    { url: `${SITE}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/work`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE}/about`, changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${SITE}/contact`, changeFrequency: "yearly" as const, priority: 0.9 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${SITE}/book`, changeFrequency: "monthly" as const, priority: 0.85 },
    ...services.map((s) => ({
      url: `${SITE}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: `${SITE}/work/${c.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ].map((e) => ({ ...e, lastModified }));
}
