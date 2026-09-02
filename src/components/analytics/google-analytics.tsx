import Script from "next/script";
import { getGaMeasurementId } from "@/lib/analytics/google-analytics";
import { GoogleAnalyticsPageView } from "@/components/analytics/google-analytics-pageview";

/**
 * Loads GA4 (gtag.js) after the page is interactive.
 * No-op until NEXT_PUBLIC_GA_MEASUREMENT_ID is set in .env.local
 */
export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <GoogleAnalyticsPageView />
    </>
  );
}
