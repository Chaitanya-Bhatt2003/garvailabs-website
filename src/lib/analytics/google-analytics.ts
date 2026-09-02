/**
 * Google Analytics 4 — GARV AI LABS
 * Stream ID: 15599721589 · Measurement ID: G-ZZ9B7HE6T7
 * Override via NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local if needed.
 */

import { isAnalyticsEnvironment } from "@/lib/analytics/env";

const GA_ID_RE = /^G-[A-Z0-9]+$/;

/** Public GA4 measurement ID (not secret — sent to every visitor's browser). */
export const GA_MEASUREMENT_ID = "G-ZZ9B7HE6T7";

/** GA4 data stream ID — for dashboard reference; not used by gtag. */
export const GA_STREAM_ID = "15599721589";

export function getGaMeasurementId(): string | null {
  const raw = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? GA_MEASUREMENT_ID).trim();
  if (!raw || !GA_ID_RE.test(raw)) return null;
  if (!isAnalyticsEnvironment()) return null;
  return raw;
}

export function isGoogleAnalyticsEnabled(): boolean {
  return getGaMeasurementId() !== null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Track a page view (App Router client navigations). */
export function gaPageView(path: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  const id = getGaMeasurementId();
  if (!id) return;
  window.gtag("config", id, { page_path: path });
}

/** Optional custom event — call after gtag has loaded. */
export function gaEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
