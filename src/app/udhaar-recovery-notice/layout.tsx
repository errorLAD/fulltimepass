import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Udhaar Recovery Notice 💰 — Reserve Bank of Bhaichara Warrant",
  description: "Generate a hilarious legal-style recovery notice with 420% friendship interest tax and chai-samosa penalty for your friend who owes money.",
  openGraph: {
    title: "Udhaar Recovery Notice 💰 | FullTimePass.in",
    description: "Official warrant from Reserve Bank of Bhaichara! Send recovery notice to your friend.",
    url: "https://fulltimepass.in/udhaar-recovery-notice",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
