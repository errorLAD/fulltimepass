import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aukaat Checker 💸 — Financial Lifestyle Roast",
  description: "Financial roast of your spending habits, Swiggy orders, and iPhone EMIs. Find if you're an EMI Wala Ambani or Budget Ka Badshah.",
  openGraph: {
    title: "Aukaat Checker 💸 | FullTimePass.in",
    description: "Starbucks ki coffee, account balance mein ₹37! Check your financial avatar.",
    url: "https://fulltimepass.in/aukaat-checker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
