/**
 * Google Analytics 4 — set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
 * Format: G-XXXXXXXXXX (Admin → Data streams → Web stream)
 */

import { isAnalyticsEnvironment } from "@/lib/analytics/env";

const GA_ID_RE = /^G-[A-Z0-9]+$/;

export function getGaMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
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
