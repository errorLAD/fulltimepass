import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shaadi Kalesh Predictor 🥁 — Indian Wedding Drama Probability",
  description: "Calculate the exact wedding drama quotient: from DJ fights and offended Fufaji to paneer shortages.",
  openGraph: {
    title: "Shaadi Kalesh Predictor 🥁 | FullTimePass.in",
    description: "Paneer khatam hote hi Fufaji ka mood off! Calculate wedding kalesh probability now.",
    url: "https://fulltimepass.in/shaadi-kalesh-predictor",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
