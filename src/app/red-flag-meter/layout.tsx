import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GF/BF Red Flag Meter 🚩 — Test Relationship Toxicity",
  description: "Calculate your partner or crush's entertainment-only Red Flag Score with funny Hinglish questions and official certificate.",
  openGraph: {
    title: "GF/BF Red Flag Meter 🚩 | FullTimePass.in",
    description: "Reply 8 ghante baad, online 24/7! Check your red flag percentage now.",
    url: "https://fulltimepass.in/red-flag-meter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
