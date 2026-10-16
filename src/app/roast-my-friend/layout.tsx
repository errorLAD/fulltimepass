import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roast My Friend 🔥 — Savage Hinglish Roast Card Generator",
  description: "Enter your friend's name, pick their toxic habits, and generate a brutal Hinglish roast card to blast on WhatsApp.",
  openGraph: {
    title: "Roast My Friend 🔥 | FullTimePass.in",
    description: "Bhai ka attitude CEO wala, bank balance intern wala! Roast your friend now.",
    url: "https://fulltimepass.in/roast-my-friend",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
