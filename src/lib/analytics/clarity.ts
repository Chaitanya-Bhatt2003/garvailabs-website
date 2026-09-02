/**
 * Microsoft Clarity — set NEXT_PUBLIC_CLARITY_PROJECT_ID in .env.local
 * Get the ID from Clarity → Settings → Overview → Project ID
 */

import { isAnalyticsEnvironment } from "@/lib/analytics/env";

const CLARITY_ID_RE = /^[a-z0-9]+$/i;

/** Returns the Clarity project ID when configured and allowed to run. */
export function getClarityProjectId(): string | null {
  const raw = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
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
