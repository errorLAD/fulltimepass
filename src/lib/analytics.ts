import { EventPayload } from "./types";

export function trackToolEvent(payload: EventPayload) {
  try {
    if (typeof window !== "undefined") {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((e) => {
        // silent catch
      });
    }
  } catch (e) {
    // ignore
  }
}
