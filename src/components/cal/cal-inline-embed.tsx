import { CAL_EMBED_URL, CAL_URL } from "@/lib/cal";

/**
 * Iframe embed — reliable in Brave/Chrome when embed.js is blocked.
 * JS embed often fails silently and leaves a blank page.
 */
export function CalInlineEmbed() {
  return (
    <div className="relative w-full">
      <iframe
        src={CAL_EMBED_URL}
        title="Book a call with GARV AI LABS — choose 15 or 30 minutes"
        className="min-h-[min(80vh,780px)] w-full rounded-xl border border-line bg-surface shadow-[var(--shadow-sm)]"
        loading="lazy"
        allow="clipboard-read; clipboard-write"
      />
      <p className="mt-4 text-center text-sm text-muted">
        Calendar not loading?{" "}
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-text underline underline-offset-4"
        >
          Open Cal.com directly
        </a>
      </p>
    </div>
  );
}
