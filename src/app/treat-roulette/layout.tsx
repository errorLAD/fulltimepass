import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treat Kaun Dega? Roulette 🎡 — Spin the Wheel & Pick the Bill Payer",
  description: "Spin the animated Russian roulette wheel with your friends' names to fairly and randomly select who pays for tonight's food and chai!",
  openGraph: {
    title: "Treat Kaun Dega? Roulette 🎡 | FullTimePass.in",
    description: "Ghooma wheel aur fasao us dost ko jo hamesha bill pe gayab hota hai! Spin now.",
    url: "https://fulltimepass.in/treat-roulette",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
