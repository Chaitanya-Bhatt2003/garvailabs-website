import type { LucideIcon } from "lucide-react";
import { Plug, PlayCircle, UserCheck, TrendingUp } from "lucide-react";

/** The four steps every engagement runs through, in order. */
export const steps: { n: string; icon: LucideIcon; title: string; body: string }[] = [
  {
    n: "01",
    icon: Plug,
    title: "Understand",
    body: "We look at the workflow as it actually runs — the systems, the field conditions, and the edge cases nobody mentions in the first meeting.",
  },
  {
    n: "02",
    icon: PlayCircle,
    title: "Scope in writing",
    body: "What gets built, what it may do on its own, where it must stop and ask a person. Agreed and signed before any code is written.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Build and pilot",
    body: "Working software in slices, then a real pilot at one site. Field conditions always surprise, so we would rather find out early.",
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Roll out and hand over",
    body: "Staged rollout with monitoring, documentation and training. You should not need us on retainer to keep it running.",
  },
];
