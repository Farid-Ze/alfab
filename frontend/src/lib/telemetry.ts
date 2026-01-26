/**
 * Telemetry utilities.
 * Client-side only - uses browser APIs.
 */

import { sendGAEvent } from "@next/third-parties/google";

const INITIAL_URL_KEY = "alfab_page_url_initial";

/** Check if we're in a browser environment */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof navigator !== "undefined";
}

export function getInitialPageUrl(): string {
  if (!isBrowser()) return "";

  try {
    const existing = sessionStorage.getItem(INITIAL_URL_KEY);
    if (existing) return existing;
    const now = window.location.href;
    sessionStorage.setItem(INITIAL_URL_KEY, now);
    return now;
  } catch {
    return window.location.href;
  }
}

export function getCurrentPageUrl(): string {
  if (!isBrowser()) return "";
  return window.location.href;
}

// Re-export analytics event types for convenience
export type AnalyticsEventName =
  | "cta_whatsapp_click"
  | "cta_whatsapp_blocked" // Distinct from click: config missing, not a real click-out
  | "cta_email_click"
  | "lead_submit_success"
  | "lead_submit_error";

/**
 * Track an analytics event.
 * Simplified to use GA4 directly (Phase 15 Optimization).
 */
export function trackEvent(name: AnalyticsEventName, data?: Record<string, unknown>): void {
  // Send to Google Analytics 4 via @next/third-parties
  sendGAEvent("event", name, data ?? {});
}
