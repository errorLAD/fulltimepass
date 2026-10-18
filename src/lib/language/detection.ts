import { Language } from "./types";

export const STORAGE_KEY = "fulltimepass_lang";
export const COOKIE_NAME = "ftp_lang";

/**
 * Checks if the browser's timezone belongs to India.
 */
export function isIndianTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return false;
    const lower = tz.toLowerCase();
    if (lower === "asia/kolkata" || lower === "asia/calcutta") {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Checks if the browser's language preferences indicate India.
 */
export function isIndianLocale(): boolean {
  try {
    if (typeof navigator === "undefined") return false;
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      if (!lang) continue;
      const lower = lang.toLowerCase();
      if (
        lower.startsWith("hi") ||
        lower.endsWith("-in") ||
        lower.endsWith("_in") ||
        lower.includes("gu-") ||
        lower.includes("ta-") ||
        lower.includes("te-") ||
        lower.includes("mr-") ||
        lower.includes("bn-") ||
        lower.includes("pa-") ||
        lower.includes("kn-") ||
        lower.includes("ml-")
      ) {
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Checks if the browser's timezone clearly belongs outside India.
 */
export function isClearNonIndianTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return false;
    const lower = tz.toLowerCase();
    if (
      lower.startsWith("america/") ||
      lower.startsWith("europe/") ||
      lower.startsWith("australia/") ||
      lower.startsWith("pacific/") ||
      lower.startsWith("africa/") ||
      lower.startsWith("asia/tokyo") ||
      lower.startsWith("asia/seoul") ||
      lower.startsWith("asia/shanghai") ||
      lower.startsWith("asia/singapore") ||
      lower.startsWith("asia/dubai") ||
      lower.startsWith("asia/bangkok")
    ) {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Fast synchronous initial language detection without blocking or network calls.
 * Priority:
 * 1. Saved user preference in localStorage or Cookie
 * 2. Instant client-side signals (Timezone & Locale)
 * 3. Default to English (if outside India or indeterminate)
 */
export function getInitialLanguage(): { language: Language; hasManualPreference: boolean } {
  if (typeof window === "undefined") {
    return { language: "en", hasManualPreference: false };
  }

  try {
    // 1. Check localStorage for manual user choice
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "en") {
      return { language: saved as Language, hasManualPreference: true };
    }

    // Check cookie
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (match) {
      const cookieVal = decodeURIComponent(match[1]);
      if (cookieVal === "hi" || cookieVal === "en") {
        return { language: cookieVal as Language, hasManualPreference: true };
      }
    }

    // 2. Instant client signals
    if (isIndianTimezone() || isIndianLocale()) {
      return { language: "hi", hasManualPreference: false };
    }

    if (isClearNonIndianTimezone()) {
      return { language: "en", hasManualPreference: false };
    }
  } catch (err) {
    // Graceful fallback to English
  }

  // Graceful default: English
  return { language: "en", hasManualPreference: false };
}

/**
 * Fallback IP-based country check.
 * Used ONLY when no manual user preference is set and client signals need confirmation.
 * Runs non-blocking with an AbortController timeout.
 */
export async function detectCountryFallback(): Promise<{ country: string; isIndia: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch("/api/detect-country", {
      signal: controller.signal,
      headers: { "Accept": "application/json" },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        country: data.country || "UNKNOWN",
        isIndia: Boolean(data.isIndia),
      };
    }
  } catch {
    // Network error or timeout: graceful fallback
  }

  return { country: "UNKNOWN", isIndia: false };
}

/**
 * Persists the user's manual language choice in both localStorage and Cookie.
 */
export function persistLanguage(lang: Language): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
      // Persist cookie for 365 days
      document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  } catch {
    // ignore
  }
}
