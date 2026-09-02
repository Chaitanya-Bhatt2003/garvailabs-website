import Script from "next/script";
import { getClarityProjectId } from "@/lib/analytics/clarity";

/**
 * Loads Microsoft Clarity after the page is interactive.
 * No-op until NEXT_PUBLIC_CLARITY_PROJECT_ID is set in .env.local
 */
export function MicrosoftClarity() {
  const projectId = getClarityProjectId();
  if (!projectId) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");`,
      }}
    />
  );
}
