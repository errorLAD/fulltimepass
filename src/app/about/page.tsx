import React from "react";
import Link from "next/link";
import { Flame, Sparkles, Heart, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | FullTimePass.in",
  description: "Learn about FullTimePass.in — India's desi entertainment and timepass hub.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mb-3">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>FullTimePass Origin Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About FullTimePass.in
          </h1>
          <p className="text-sm font-semibold text-orange-400 mt-1">
            Tagline: &ldquo;Bore ho rahe ho? Kuch timepass karte hain!&rdquo;
          </p>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            Welcome to <strong>FullTimePass.in</strong>, India&apos;s homegrown digital playground for unadulterated timepass, friendly roasts, relationship satire, and shareable laughter.
          </p>
          <p>
            We built FullTimePass with a simple mission: In an internet filled with stressful news, toxic doom-scrolling, and corporate hustle porn, people simply need a place to laugh with their squad, roast their best friend, check their satirical red-flag score, and share memes on WhatsApp.
          </p>
          <p>
            Whether you&apos;re a college student killing time between lectures, a couple poking fun at each other&apos;s texting quirks, or a friend group assigning cabinet roles (like Plan Cancel CEO and Seen-Zone Minister), FullTimePass brings 10 handcrafted desi mini-products designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-2xl mb-1 block">🚀</span>
            <h3 className="font-bold text-white text-sm">100% Free</h3>
            <p className="text-xs text-slate-400 mt-1">No sign-up, no passwords, no hassle.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-2xl mb-1 block">📱</span>
            <h3 className="font-bold text-white text-sm">WhatsApp Ready</h3>
            <p className="text-xs text-slate-400 mt-1">Export cards designed for mobile sharing.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-2xl mb-1 block">❤️</span>
            <h3 className="font-bold text-white text-sm">Pure Desi Humour</h3>
            <p className="text-xs text-slate-400 mt-1">Hinglish comedy crafted for Indian culture.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <Link
            href="/#all-tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 shadow-desi-pop"
          >
            <span>Explore All 10 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
