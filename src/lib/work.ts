/**
 * Case studies taken from the live garvailabs.com/case-studies page.
 * Problems, solutions and every quoted metric are GarvAILabs' own — they are
 * not illustrative. Keep them accurate when editing.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  headline: { value: string; label: string };
  problem: string[];
  solution: string[];
  tech: string[];
  results: { value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "seed-grading-ai",
    title: "AI-powered seed segmentation and classification",
    sector: "Agriculture · FPO procurement centres",
    summary:
      "A mobile grading model that works offline in rural procurement centres, replacing manual seed inspection with consistent image-based classification.",
    headline: { value: "60%", label: "reduction in grading time" },
    problem: [
      "Manual seed inspection was slow and prone to human error, producing inconsistent classifications between centres.",
      "There was no digital record of grading decisions, so nothing could be audited afterwards.",
      "Staff at rural procurement centres had limited technical expertise, ruling out anything complicated.",
    ],
    solution: [
      "A lightweight AI model that runs on a mobile device, segmenting and classifying seeds from a photograph.",
      "Quality assessed on visible characteristics — size, shape and texture — against a consistent standard.",
      "Full offline operation, because connectivity at procurement centres cannot be assumed.",
      "A centralised dashboard giving managers visibility across every centre.",
    ],
    tech: ["On-device AI model", "Image segmentation", "Classification algorithms", "Offline-first", "Central dashboard"],
    results: [
      { value: "60%+", label: "less time spent grading" },
      { value: "Consistent", label: "classification across all centres" },
      { value: "Full", label: "digital audit trail for traceability" },
    ],
  },
  {
    slug: "peanut-procurement",
    title: "Smart peanut procurement with AI quality analysis",
    sector: "Agriculture · Farmer networks and FPOs",
    summary:
      "A procurement app that standardises quality checks in the field and puts live market rates in the hands of the officer doing the deal.",
    headline: { value: "Fewer", label: "quality disputes at the point of purchase" },
    problem: [
      "Quality assessment methods varied between officers, which turned into disputes at the point of purchase.",
      "Field officers had no access to real-time market rates while negotiating.",
      "FPO managers had little oversight of procurement happening across multiple locations at once.",
    ],
    solution: [
      "A mobile procurement app that captures quality through guided, standardised checks.",
      "Live wholesale market rate tracking integrated into the same screen as the purchase decision.",
      "A centralised dashboard tracking volumes, trends and pricing decisions across locations.",
    ],
    tech: ["Mobile app", "AI quality analysis", "Market data integration", "Real-time pricing", "Central dashboard"],
    results: [
      { value: "Fewer", label: "quality-related disputes" },
      { value: "Faster", label: "procurement cycles" },
      { value: "Higher", label: "profitability for FPOs and farmers" },
    ],
  },
  {
    slug: "dental-ai-assistant",
    title: "Intelligent assistance for dentists",
    sector: "HealthTech · Dental EHR platform",
    summary:
      "A RAG-based assistant built into an existing dental EHR, trained on each practitioner's own history plus collective platform insight.",
    headline: { value: "20%", label: "revenue increase from upselling the capability" },
    problem: [
      "Dental practitioners needed diagnostic support without leaving the EHR platform they already worked in.",
      "Any recommendation had to respect standardised medical coding guidelines to be usable in practice.",
    ],
    solution: [
      "A custom algorithm trained on each dentist's historical data alongside collective platform insight.",
      "A Retrieval-Augmented Generation system with GenAI capabilities that anticipates patient questions.",
      "Recommendations generated against standardised medical coding guidelines rather than free-form.",
    ],
    tech: ["Retrieval-Augmented Generation", "Generative AI", "Diagnostic algorithms", "Medical coding integration"],
    results: [
      { value: "20%", label: "boost in revenues by upselling the capability to existing customers" },
      { value: "In-platform", label: "no change to the practitioner's existing workflow" },
    ],
  },
  {
    slug: "permitting-object-recognition",
    title: "Object recognition for government permitting workflows",
    sector: "Government · US state permitting departments",
    summary:
      "Neural networks and knowledge graphs that read construction drawings, apply 3D regulatory rules, and catch compliance issues before submission.",
    headline: { value: "80%", label: "fewer repetitive resubmissions" },
    problem: [
      "Identifying and validating objects inside construction drawings was slow and manual.",
      "Complex 3D regulatory rules had to be applied to flat PDF submissions.",
      "Applicants resubmitted repeatedly because compliance problems surfaced late.",
    ],
    solution: [
      "Neural networks and knowledge graphs that identify and categorise objects within drawings.",
      "A dynamic, evolving data dictionary used for pattern matching as rules change.",
      "Automated review with self-correcting markup, so issues are flagged before submission.",
    ],
    tech: ["Neural networks", "Knowledge graphs", "Dynamic data dictionaries", "Pattern matching", "Automated reporting"],
    results: [
      { value: "80%+", label: "reduction in repetitive submissions" },
      { value: "75%", label: "of code compliance issues identified upfront" },
      { value: "15%", label: "decrease in overall permitting cost" },
    ],
  },
  {
    slug: "maritime-cctv-insights",
    title: "Real-time CCTV insights for ship management",
    sector: "Maritime · ERP provider serving thousands of ships",
    summary:
      "A streaming vision model that turns onboard CCTV into live operational alerts and a compliance audit trail.",
    headline: { value: "Real-time", label: "anomaly alerts from live onboard CCTV" },
    problem: [
      "Ships had CCTV recording continuously but no way to extract meaningful insight from it.",
      "Management needed real-time alerts rather than footage reviewed after an incident.",
      "Compliance audits required evidence that was hard to assemble from raw recordings.",
    ],
    solution: [
      "A streaming vision model processing live CCTV continuously rather than in batches.",
      "Customisable parameterisation, because no two ships are configured the same way.",
      "Automated alerting plus predictive analytics for operational insight.",
    ],
    tech: ["Streaming vision models", "CCTV processing", "Real-time analysis", "Predictive analytics"],
    results: [
      { value: "Timely", label: "anomaly identification instead of after-the-fact review" },
      { value: "Audit-ready", label: "evidence for maritime compliance" },
      { value: "Lower", label: "maintenance cost and better resource allocation" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
