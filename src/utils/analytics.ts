type EventPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, payload: EventPayload = {}) {
  window.dispatchEvent(new CustomEvent("merlin:event", { detail: { name, payload } }));
}

export function trackCall(type: "business" | "emergency") {
  trackEvent("phone_call_click", { type });
}
