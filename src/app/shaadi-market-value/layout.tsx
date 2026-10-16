import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shaadi Market Value 💍 — Desi Matrimonial Satire Biodata",
  description: "Calculate your humorous marriage-market value based on cooking skills, salary jokes, and in-law tolerance.",
  openGraph: {
    title: "Shaadi Market Value 💍 | FullTimePass.in",
    description: "Expectations international, cooking skills Maggi tak! Get your funny rishta card.",
    url: "https://fulltimepass.in/shaadi-market-value",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
