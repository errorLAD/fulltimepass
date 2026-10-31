import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cricket Toss Simulator 🏏 — Call the Toss",
  description: "Call heads or tails, flip the cricket coin, and choose to bat or bowl in FullTimePass's stadium-style cricket toss game.",
  openGraph: { title: "The Big Cricket Toss 🏏 | FullTimePass.in", description: "One coin. Two captains. Make your call and see who bats first.", url: "https://fulltimepass.in/cricket-toss" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
