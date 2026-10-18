import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Character Syndrome 🎬 — Bollywood Delusion Meter",
  description: "Do you look out of auto windows pretending you're in an Arijit Singh music video? Calculate your Main Character Syndrome score.",
  openGraph: {
    title: "Main Character Syndrome 🎬 | FullTimePass.in",
    description: "Hero entry 100%, audience mein sirf mummy aur ek confused kutta! Test your melodrama level.",
    url: "https://fulltimepass.in/main-character-syndrome",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
