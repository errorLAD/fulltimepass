import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fulltimepass.in"),
  title: {
    default: "FullTimePass.in — India's Desi Timepass Hub 🔥",
    template: "%s | FullTimePass.in",
  },
  description:
    "Bore ho rahe ho? Kuch timepass karte hain! 10 funny mini-games, roast generators, red flag meters, and desi shareable quizzes for WhatsApp & Instagram.",
  keywords: [
    "timepass games",
    "roast my friend",
    "red flag meter",
    "ex yaad meter",
    "group chat roles",
    "shaadi market value",
    "aukaat checker",
    "fake family whatsapp chat",
    "personality test",
    "udhaar recovery notice",
    "shaadi kalesh predictor",
    "indian comedy quizzes",
    "desi timepass",
  ],
  authors: [{ name: "FullTimePass Team" }],
  openGraph: {
    title: "FullTimePass.in — India's Desi Timepass Hub 🔥",
    description: "Bore ho rahe ho? Kuch timepass karte hain! 10 viral desi games and quizzes.",
    url: "https://fulltimepass.in",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FullTimePass.in — India's Desi Timepass Hub 🔥",
    description: "Bore ho rahe ho? Kuch timepass karte hain! 10 viral desi games & shareable cards.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased desi-grid-pattern selection:bg-orange-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
