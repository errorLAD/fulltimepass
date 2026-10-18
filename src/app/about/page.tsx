import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Flame, Sparkles, Heart, Users, ArrowRight, ShieldCheck, Zap, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — India's Homegrown Desi Timepass & Satire Hub | FullTimePass.in",
  description:
    "Learn about FullTimePass.in — our mission to kill internet boredom with pure desi humor, friendly roasts, relationship satire, and 100% privacy.",
  alternates: {
    canonical: "https://fulltimepass.in/about",
  },
  openGraph: {
    title: "About Us | FullTimePass.in",
    description:
      "Learn about FullTimePass.in — our mission to kill internet boredom with pure desi humor, friendly roasts, and shareable WhatsApp cards.",
    url: "https://fulltimepass.in/about",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | FullTimePass.in",
    description:
      "Learn about FullTimePass.in — our mission to kill internet boredom with pure desi humor.",
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
      "name": "About Us",
      "item": "https://fulltimepass.in/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="p-5 sm:p-10 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-2xs">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>FullTimePass Origin Story</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              About FullTimePass.in
            </h1>
            <p className="text-base sm:text-lg font-bold text-amber-600 mt-2">
              &ldquo;Bore ho rahe ho? Kuch timepass karte hain!&rdquo;
            </p>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            <p>
              Welcome to <strong className="text-slate-900 font-semibold">FullTimePass.in</strong>, India&apos;s homegrown digital playground for unadulterated timepass, friendly banter, relationship satire, and viral laughter.
            </p>
            <p>
              We built FullTimePass with a simple, honest purpose: In an internet filled with stressful news, toxic doom-scrolling, and corporate hustle porn, people simply need a place to laugh with their squad, roast their best friend, check their satirical red-flag score, and share memes on WhatsApp.
            </p>
            <p>
              Whether you&apos;re a college student killing time between lectures, a couple poking fun at each other&apos;s texting habits, or a friend squad assigning cabinet roles (like Plan Cancel CEO and Seen-Zone Minister), FullTimePass brings 20 handcrafted desi mini-tools designed specifically for Indian cultural humor.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-3xl mb-2.5 block">🚀</span>
              <h3 className="font-extrabold text-slate-900 text-base">100% Free &amp; Instant</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Zero sign-up, no passwords, no app download required. Open any tool, answer 3 quick questions, and get your funny result within seconds.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-3xl mb-2.5 block">🛡️</span>
              <h3 className="font-extrabold text-slate-900 text-base">Privacy-First Architecture</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Your nicknames, answers, and cards are processed strictly inside your browser. We never sell personal information or link jokes to real identities.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
              <span className="text-3xl mb-2.5 block">💬</span>
              <h3 className="font-extrabold text-slate-900 text-base">WhatsApp Ready</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Every result comes with a high-resolution downloadable image card and a 1-click clean WhatsApp sharing link formatted like a viral receipt.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-pink-50/60 border border-pink-200">
              <span className="text-3xl mb-2.5 block">🇮🇳</span>
              <h3 className="font-extrabold text-slate-900 text-base">Authentic Desi Satire</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                From tapri chai compound interest and Fufaji wedding drama to Arijit Singh heartbreak addictions — pure Hinglish comedy crafted for Indian culture.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Designed &amp; maintained with pride in India. Fictional comedy only.
            </p>
            <Link
              href="/#all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-md transition-all cursor-pointer"
            >
              <span>Explore All 20 Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
