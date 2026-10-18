import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function formatDesiCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Crore`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error("Clipboard copy failed: ", err);
    return false;
  }
}

/**
 * Universal cross-platform WhatsApp sharing helper.
 * - On desktop: routes to web.whatsapp.com/send which opens WhatsApp Web or prompts the desktop app directly,
 *   bypassing the api.whatsapp.com intermediate landing page bug that breaks UTF-8 emojis into replacement characters ().
 * - On mobile: routes to api.whatsapp.com/send which directly triggers the native mobile WhatsApp app via OS intent.
 */
export function openWhatsAppShare(text: string): void {
  if (typeof window === "undefined") return;

  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || ""
  );

  const encodedText = encodeURIComponent(text);
  const targetUrl = isMobile
    ? `https://api.whatsapp.com/send?text=${encodedText}`
    : `https://web.whatsapp.com/send?text=${encodedText}`;

  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

