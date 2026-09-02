/**
 * Microsoft Clarity — GARV AI LABS
 * Project ID: ybwtotopup
 * Override via NEXT_PUBLIC_CLARITY_PROJECT_ID in .env.local if needed.
 */

import { isAnalyticsEnvironment } from "@/lib/analytics/env";

const CLARITY_ID_RE = /^[a-z0-9]+$/i;

/** Public Clarity project ID (not secret — sent to every visitor's browser). */
export const CLARITY_PROJECT_ID = "ybwtotopup";

/** Returns the Clarity project ID when configured and allowed to run. */
export function getClarityProjectId(): string | null {
  const raw = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? CLARITY_PROJECT_ID).trim();
  if (!raw || !CLARITY_ID_RE.test(raw)) return null;
  if (!isAnalyticsEnvironment()) return null;
  return raw;
}

export function isClarityEnabled(): boolean {
  return getClarityProjectId() !== null;
}

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Optional custom event — call after Clarity script has loaded. */
export function clarityEvent(name: string): void {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("event", name);
}
