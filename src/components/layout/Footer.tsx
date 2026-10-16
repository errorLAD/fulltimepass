"use client";

import React from "react";
import Link from "next/link";
import { Flame, ShieldAlert, Heart, Share2, Sparkles } from "lucide-react";
import { TOOLS } from "@/lib/data/tools";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-pink-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <span className="text-lg font-black text-white">
                FullTime<span className="text-orange-400">Pass</span>
                <span className="text-xs text-orange-500 ml-0.5">.in</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s ultimate desi entertainment and timepass playground. Built to kill boredom, roast your squad, generate hilarious cards, and share pure laughs on WhatsApp.
            </p>
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold">
              &ldquo;Bore ho rahe ho? Kuch timepass karte hain!&rdquo;
            </div>
          </div>

          {/* Quick Tools Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              🔥 Top Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              ⚡ More Timepass
            </h4>
            <ul className="space-y-2 text-xs">
              {TOOLS.slice(5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Humor Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Satire & Disclaimer</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All tools, meters, recovery notices, chat simulations, scores and roasts on FullTimePass.in are purely satirical works of fictional entertainment. None of the content constitutes legal, financial, astrological or relationship advice. Dil pe mat lo yaar, bas maze lo!
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs">
              <Link href="/about" className="hover:text-white transition-colors underline">
                About
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors underline">
                Terms of Use
              </Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors underline">
                Disclaimer
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors underline">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FullTimePass.in. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>& High-Level Bakchodi in India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
