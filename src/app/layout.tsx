import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/language/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#F59E0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fulltimepass.in"),
  title: {
    default: "FullTimePass.in — India's Desi Timepass Hub 🔥 | 20 Viral Mini-Tools & Roast Cards",
    template: "%s | FullTimePass.in",
  },
  description:
    "Bore ho rahe ho? Kuch timepass karte hain! 20 funny mini-tools, savage friend roasts, red flag meters, treat roulette, and viral shareable WhatsApp cards.",
  keywords: [
    "timepass games",
    "desi timepass",
    "roast my friend",
    "red flag meter",
    "ex yaad meter",
    "group chat roles",
    "treat roulette",
    "udhaar recovery notice",
    "aukaat checker",
    "shaadi market value",
    "shaadi kalesh predictor",
    "fake family whatsapp chat",
    "personality test",
    "indian comedy quizzes",
    "whatsapp roast generator",
  ],
  authors: [{ name: "FullTimePass Team" }],
  creator: "FullTimePass.in",
  publisher: "FullTimePass.in",
  alternates: {
    canonical: "https://fulltimepass.in",
  },
  openGraph: {
    title: "FullTimePass.in — India's Desi Timepass Hub 🔥",
    description:
      "Bore ho rahe ho? Kuch timepass karte hain! 20 viral desi comedy mini-tools, savage roast cards, and shareable WhatsApp games.",
    url: "https://fulltimepass.in",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FullTimePass.in — India's Desi Timepass Hub 🔥",
    description:
      "Bore ho rahe ho? Kuch timepass karte hain! 20 viral desi comedy mini-tools, savage roast cards, and shareable WhatsApp games.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FullTimePass.in",
  alternateName: ["FullTimePass", "Full Time Pass"],
  url: "https://fulltimepass.in",
  description:
    "India's ultimate desi entertainment and timepass playground featuring 20 viral comedy tools, roast generators, and shareable WhatsApp cards.",
  inLanguage: ["en-IN", "hi-IN"],
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FullTimePass.in",
  url: "https://fulltimepass.in",
  logo: "https://fulltimepass.in/opengraph-image",
  description:
    "Homegrown digital playground for unadulterated timepass, friendly roasts, relationship satire, and shareable laughter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KD4DCNNCMH"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KD4DCNNCMH');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body
        className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-amber-400 selection:text-slate-950"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
