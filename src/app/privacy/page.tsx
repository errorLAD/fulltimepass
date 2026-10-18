import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, FileText, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — No Data Harvesting, 100% Client-Side Privacy | FullTimePass.in",
  description:
    "Privacy Policy for FullTimePass.in — We do not require accounts, sell personal data, or store your jokes. Learn how our privacy-first timepass works.",
  alternates: {
    canonical: "https://fulltimepass.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | FullTimePass.in",
    description:
      "Privacy Policy for FullTimePass.in — Learn how our privacy-first entertainment tools operate without accounts or data harvesting.",
    url: "https://fulltimepass.in/privacy",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | FullTimePass.in",
    description:
      "Privacy Policy for FullTimePass.in — Zero accounts, zero tracking, 100% privacy.",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://fulltimepass.in",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Privacy Policy",
      "item": "https://fulltimepass.in/privacy",
    },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="p-5 sm:p-10 md:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Privacy Policy
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Effective Date: October 2026 • FullTimePass.in
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-sm sm:text-base leading-relaxed font-medium">
            🔒 <strong>Our Golden Rule:</strong> You do NOT need an account to use FullTimePass.in. We do not sell your personal data, track your identity, or store your friends&apos; names on our servers.
          </div>

          <div className="space-y-6 text-base text-slate-600 font-normal leading-relaxed">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                1. No Accounts, No Passwords, No Profiles
              </h3>
              <p>
                FullTimePass.in is an open entertainment platform. We do not demand sign-ups, phone numbers, email authentications, or social login permissions to play any of our 20 tools. You remain completely anonymous while using the website.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                2. Client-Side Processing of Personal Inputs
              </h3>
              <p>
                When you input a friend&apos;s nickname, select habits, or enter a fake udhaar amount, that data is processed <strong>strictly in your browser&apos;s active memory</strong>. It is used solely to generate the on-screen card and is not stored in our central databases or linked to any real-world profile.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                3. High-Resolution Card Downloads &amp; html-to-image
              </h3>
              <p>
                When you click &ldquo;Download Card Image&rdquo;, your browser renders the card into a PNG image using the HTML5 Canvas API (`html-to-image`). The image is saved directly onto your device. It is never uploaded or archived on our servers.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                4. Anonymous Event Analytics
              </h3>
              <p>
                To understand which tools visitors enjoy most, we record aggregated, anonymous counters (such as tool views, completions, image downloads, and WhatsApp share clicks). These aggregated counts never record names, IP addresses, or personal answers.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                5. Audio Mute Preferences &amp; Session Storage
              </h3>
              <p>
                We use your browser&apos;s standard `sessionStorage` strictly to remember whether you prefer comedy sound announcements muted or active during your visit. We do not use third-party behavioral advertising cookies.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                6. Third-Party Sharing (WhatsApp, Instagram, etc.)
              </h3>
              <p>
                When you share a result to WhatsApp, your device opens WhatsApp directly via universal links (`web.whatsapp.com` on desktop and native app intents on mobile). Your interaction on external apps is governed by those platforms&apos; respective privacy terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                7. Contacting Us Regarding Privacy
              </h3>
              <p>
                If you have questions about our privacy practices, you can contact our privacy squad via our{" "}
                <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline font-semibold">
                  Contact Page
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
