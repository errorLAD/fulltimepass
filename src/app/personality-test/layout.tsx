import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asli Personality Test 🧠 — Discover Your Desi Alter-Ego",
  description: "Answer 10 hilarious Indian lifestyle questions to find if you are Overthinking Minister, Bare Minimum Genius, or Certified Bakchod.",
  openGraph: {
    title: "Asli Personality Test 🧠 | FullTimePass.in",
    description: "Are you Overthinking Minister or Certified Bakchod? Take the 10-question test now.",
    url: "https://fulltimepass.in/personality-test",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
