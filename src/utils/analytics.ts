type EventPayload = Record<string, string | number | boolean | undefined>;

/**
 * Push an event to Google Analytics 4 via gtag (if present on the page)
 * and also push to dataLayer for GTM compatibility.
 * Falls back silently in dev / when GA is not loaded.
 */
export function trackEvent(name: string, payload: EventPayload = {}) {
  // GA4 via gtag
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  // GTM dataLayer
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...payload });
}

export function trackCall(type: "business" | "emergency") {
  trackEvent("phone_call_click", { call_type: type });
}

// ── Type augments so TS doesn't complain ─────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}
