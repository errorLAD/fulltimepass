import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake Richness Certificate 💳 — Instagram Ambani Satire Meter",
  description: "Starbucks cups, mall sunglasses & fake accents. Calculate your fake luxury pretension score and get certified.",
  openGraph: {
    title: "Fake Richness Certificate 💳 | FullTimePass.in",
    description: "Instagram net worth ₹8 crore, dost ke ₹350 abhi baaki! Check your fake rich score.",
    url: "https://fulltimepass.in/fake-richness",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
