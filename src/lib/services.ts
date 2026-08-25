import type { LucideIcon } from "lucide-react";
import { Bot, Code2, Smartphone, Globe, Search, Sparkles } from "lucide-react";

/**
 * The six services. 1–4 are grounded in work described on garvailabs.com
 * (AI agents, product engineering, enterprise integration, custom digital
 * products). 5 and 6 — SEO and GEO — are NOT on the live site today; this
 * copy was written fresh and should be reviewed before launch.
 */

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  headline: string;
  intro: string;
  offerings: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  stack: string[];
  relatedWork: string[];
  isNewCopy?: boolean;
};

export const services: Service[] = [
  {
    slug: "ai-automation-agents",
    name: "AI automation & agents",
    short: "Agents that work a case end to end, and stop where a human should decide.",
    icon: Bot,
    headline: "AI that finishes the work, not just the sentence.",
    intro:
      "We design, build and run AI agents that take a real job off your team — reading your systems, deciding what the case needs, acting inside limits you set in writing, and handing anything irreversible to a named person first.",
    offerings: [
      {
        title: "Task and workflow agents",
        body: "Agents scoped to one job: clearing a support queue, chasing a document, reconciling a ledger, triaging an inbound enquiry. Each one gets a written scope and a value ceiling.",
      },
      {
        title: "Retrieval and RAG systems",
        body: "Assistants grounded in your own documents and history rather than general web knowledge — the approach behind our dental EHR work, where recommendations follow standardised coding guidelines.",
      },
      {
        title: "Computer vision",
        body: "Image and video models that run where the work happens: on-device seed grading offline in rural centres, streaming CCTV analysis on ships, object recognition in construction drawings.",
      },
      {
        title: "Process automation",
        body: "The unglamorous middle of a process — matching, chasing, summarising, escalating — automated with an audit trail your compliance team can actually read.",
      },
    ],
    process: [
      { step: "01", title: "Read-only week", body: "We connect to your stack and watch. No agent acts until we can show you it understands your data." },
      { step: "02", title: "Written scope", body: "Which cases it takes, which tools it may call, what it may spend, who approves the rest. Signed before we build." },
      { step: "03", title: "Shadow run", body: "The agent drafts every action and executes none. Your team compares its decisions against theirs." },
      { step: "04", title: "Live, narrow", body: "It goes live on the smallest useful slice. Scope widens only once the numbers hold." },
    ],
    stack: ["Python", "LLM orchestration", "RAG pipelines", "Vector databases", "Computer vision", "Cloud deployment"],
    relatedWork: ["dental-ai-assistant", "seed-grading-ai", "maritime-cctv-insights"],
  },
  {
    slug: "software-development",
    name: "Software development",
    short: "Custom platforms, dashboards and integrations that hold up in production.",
    icon: Code2,
    headline: "Software built to be run, not just delivered.",
    intro:
      "Custom platforms, internal tools and the integration work that connects systems which were never designed to talk to each other. We build what does not exist off the shelf, and we build it so your team can operate it after we hand it over.",
    offerings: [
      {
        title: "Custom platforms",
        body: "Procurement systems, operational dashboards, internal tools — built around how your business actually runs rather than how a SaaS product assumes it does.",
      },
      {
        title: "Enterprise integration",
        body: "Connecting ERP, CRM, mailboxes, file drops and legacy databases into one workflow. Through APIs where they exist, and through exports and scheduled files where they do not.",
      },
      {
        title: "Data and analytics",
        body: "Pipelines that turn scattered operational data into dashboards leadership will read, with the definitions written down so two teams stop reporting different numbers.",
      },
      {
        title: "Cloud architecture",
        body: "Deployment, scaling and cost control on modern cloud infrastructure, sized for your actual load instead of a hypothetical one.",
      },
    ],
    process: [
      { step: "01", title: "Scope", body: "We map the workflow, the systems it touches, and the edge cases everyone forgets to mention." },
      { step: "02", title: "Architecture", body: "A written technical plan, including what we deliberately will not build." },
      { step: "03", title: "Build in slices", body: "Working software every two weeks, on your staging environment, not in a slide deck." },
      { step: "04", title: "Handover", body: "Documentation, access and a walkthrough. You should not need us to keep it running." },
    ],
    stack: ["TypeScript", "Python", "Node.js", "PostgreSQL", "REST & GraphQL APIs", "AWS / Azure / GCP"],
    relatedWork: ["permitting-object-recognition", "peanut-procurement"],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile app development",
    short: "Apps for people working in the field, often without a signal.",
    icon: Smartphone,
    headline: "Built for the field, not the boardroom demo.",
    intro:
      "Most of our mobile work runs where connectivity is unreliable and the person holding the phone is not a technical user. That shapes everything: offline-first data, guided flows instead of blank forms, and interfaces that survive a bright afternoon at a procurement centre.",
    offerings: [
      {
        title: "Offline-first applications",
        body: "Full functionality without a connection, syncing cleanly when signal returns. Our seed grading model runs entirely on-device for exactly this reason.",
      },
      {
        title: "On-device AI",
        body: "Vision and classification models compressed to run on mid-range Android hardware, so the intelligence travels with the worker.",
      },
      {
        title: "Field data capture",
        body: "Guided checks that produce consistent, comparable records from staff with varied training — plus a dashboard that makes those records useful centrally.",
      },
      {
        title: "Cross-platform delivery",
        body: "One codebase across Android and iOS where that fits, native where performance demands it. We will tell you which you need.",
      },
    ],
    process: [
      { step: "01", title: "Field study", body: "We look at where the app will actually be used — the signal, the hardware, the lighting, the training level." },
      { step: "02", title: "Flow design", body: "Guided screens designed for speed and consistency, not feature completeness." },
      { step: "03", title: "Build and pilot", body: "A real pilot at one location before rollout, because field conditions always surprise." },
      { step: "04", title: "Rollout", body: "Staged release with monitoring, and training material written for the people using it." },
    ],
    stack: ["React Native", "Kotlin", "Swift", "TensorFlow Lite", "SQLite / offline sync", "Firebase"],
    relatedWork: ["seed-grading-ai", "peanut-procurement"],
  },
  {
    slug: "website-development",
    name: "Website development",
    short: "Fast, accessible marketing sites and web platforms.",
    icon: Globe,
    headline: "Sites that load fast and say something.",
    intro:
      "Marketing sites, product sites and web platforms built on modern frameworks — statically rendered where possible, accessible by default, and structured so your team can update copy without a developer.",
    offerings: [
      {
        title: "Marketing sites",
        body: "Conversion-focused sites with a real content structure, built to load quickly on Indian mobile networks rather than on a designer's fibre connection.",
      },
      {
        title: "Web platforms",
        body: "Authenticated dashboards, portals and customer-facing tools, sharing a design system with the rest of your product.",
      },
      {
        title: "Performance and accessibility",
        body: "Core Web Vitals treated as a requirement, WCAG AA contrast and keyboard operation as a baseline, not an afterthought.",
      },
      {
        title: "Content management",
        body: "A CMS your marketing team can operate, or a structured content layer in the codebase when a CMS would be overkill.",
      },
    ],
    process: [
      { step: "01", title: "Structure", body: "Sitemap, page purposes and the single action each page is trying to produce." },
      { step: "02", title: "Design system", body: "Tokens, type scale and components defined once so the site stays consistent as it grows." },
      { step: "03", title: "Build", body: "Static rendering where possible, responsive from 375px up, tested on real devices." },
      { step: "04", title: "Launch", body: "Analytics, search console, sitemap and structured data configured before go-live." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Headless CMS"],
    relatedWork: [],
  },
  {
    slug: "seo",
    name: "SEO",
    short: "Technical and content SEO for businesses selling in India.",
    icon: Search,
    headline: "Found by the people already looking for you.",
    intro:
      "Search work that starts with the technical foundation — crawlability, structured data, page speed — before anything is written. We would rather fix why your pages are not being indexed than publish more of them.",
    offerings: [
      {
        title: "Technical SEO",
        body: "Crawl and index audits, site architecture, structured data, Core Web Vitals, and the sitemap and robots configuration most sites get subtly wrong.",
      },
      {
        title: "Content strategy",
        body: "Keyword and intent research grounded in what your buyers actually search, then a content plan tied to pages that can convert.",
      },
      {
        title: "Local SEO",
        body: "Google Business Profile, local citations and location pages for businesses whose customers search city by city.",
      },
      {
        title: "Reporting",
        body: "Rankings, traffic and conversions reported against the pages that matter, not a vanity dashboard.",
      },
    ],
    process: [
      { step: "01", title: "Audit", body: "Technical crawl, index coverage, and an honest assessment of what is actually holding the site back." },
      { step: "02", title: "Fix the foundation", body: "Technical issues first. Content on a broken foundation is wasted effort." },
      { step: "03", title: "Build content", body: "Pages mapped to real search intent, written to be useful rather than to hit a word count." },
      { step: "04", title: "Measure", body: "Monthly reporting against agreed targets, with the reasoning shown." },
    ],
    stack: ["Google Search Console", "Google Analytics 4", "Screaming Frog", "Ahrefs / Semrush", "Schema.org"],
    relatedWork: [],
    isNewCopy: true,
  },
  {
    slug: "geo",
    name: "GEO",
    short: "Generative Engine Optimization — being cited by AI answer engines.",
    icon: Sparkles,
    headline: "When the answer is generated, be in it.",
    intro:
      "More buyers now get their answer from ChatGPT, Gemini, Perplexity or an AI overview than from a list of ten blue links. Generative Engine Optimization is the work of making sure that when those systems answer a question in your category, your business is what they cite.",
    offerings: [
      {
        title: "Answer-engine visibility",
        body: "Tracking how ChatGPT, Perplexity, Gemini and AI Overviews currently answer the questions that matter in your category, and whether you appear at all.",
      },
      {
        title: "Content structured for retrieval",
        body: "Clear claims, direct answers, and the entity and schema markup that makes a page easy for a model to quote accurately.",
      },
      {
        title: "Citation building",
        body: "Presence in the sources these systems actually draw on — documentation, directories, comparison pages and credible third-party mentions.",
      },
      {
        title: "Monitoring",
        body: "Regular checks on how your brand is described by answer engines, including correcting what they get wrong.",
      },
    ],
    process: [
      { step: "01", title: "Baseline", body: "We ask the answer engines your buyers' real questions and record what they say today." },
      { step: "02", title: "Gap analysis", body: "Where competitors are cited and you are not — and, more usefully, why." },
      { step: "03", title: "Restructure", body: "Content and markup reworked so your pages are quotable, not just readable." },
      { step: "04", title: "Re-test", body: "The same questions, re-asked on a schedule, so movement is measured rather than assumed." },
    ],
    stack: ["Schema.org / JSON-LD", "Entity optimisation", "Answer-engine monitoring", "Content architecture"],
    relatedWork: [],
    isNewCopy: true,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
