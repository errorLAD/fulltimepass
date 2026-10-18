import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chai Pe Startup Founder 🚀 — Satirical VC Pitch Deck Evaluation",
  description: "Pitch deck ready, product coming soon, customer abhi imaginary! Evaluate your revolutionary tapri chai unicorn startup.",
  openGraph: {
    title: "Chai Pe Startup Founder 🚀 | FullTimePass.in",
    description: "Pitch deck ready, customer abhi imaginary! Evaluate your desi startup idea now.",
    url: "https://fulltimepass.in/chai-startup-founder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
