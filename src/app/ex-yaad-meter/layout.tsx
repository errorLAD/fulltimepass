import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ex Yaad Aa Rahi Hai Meter 💔 — Real Moving-On Score",
  description: "Are you truly over your ex or one sad song away from texting 'Hey, you up?' Test your real moving-on status.",
  openGraph: {
    title: "Ex Yaad Aa Rahi Hai Meter 💔 | FullTimePass.in",
    description: "Moving on: 12%. Profile checking: daily attendance! Check your heartbreak status.",
    url: "https://fulltimepass.in/ex-yaad-meter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
