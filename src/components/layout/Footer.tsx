"use client";

import React from "react";
import Link from "next/link";
import { Flame, ShieldAlert, Heart, Zap, Sparkles } from "lucide-react";
import { TOOLS } from "@/lib/data/tools";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-slate-950 text-slate-400 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-funky-yellow border-2 border-black flex items-center justify-center p-0.5 shadow-brutal">
                <Flame className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                FULLTIME<span className="text-funky-yellow">PASS</span>
                <span className="text-xs text-funky-pink ml-0.5 font-black">.IN</span>
              </span>
            </Link>
            <p className="text-xs text-slate-300 font-semibold leading-relaxed">
              India&apos;s ultimate desi entertainment and timepass playground. Built to kill boredom, roast your squad, generate hilarious cards, and share pure laughs on WhatsApp.
            </p>
            <div className="funky-tape text-[10px]">
              &ldquo;Bore ho rahe ho? Kuch timepass karte hain!&rdquo;
            </div>
          </div>

          {/* Quick Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-funky-yellow flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-funky-yellow" />
              <span>Top 5 Tools</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              {TOOLS.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="hover:text-funky-yellow transition-colors"
                  >
                    👉 {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-funky-pink flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-funky-pink" />
              <span>More Timepass</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              {TOOLS.slice(5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="hover:text-funky-pink transition-colors"
                  >
                    👉 {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Humor Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-funky-yellow" />
              <span>Satire & Bro Code</span>
            </h4>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              All tools, meters, recovery notices, chat simulations, scores and roasts on FullTimePass.in are purely satirical works of fictional entertainment. None of the content constitutes legal, financial, or relationship advice. Dil pe mat lo yaar, bas maze lo!
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs font-black uppercase">
              <Link href="/about" className="hover:text-funky-yellow transition-colors underline">
                About
              </Link>
              <Link href="/privacy" className="hover:text-funky-yellow transition-colors underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-funky-yellow transition-colors underline">
                Terms of Use
              </Link>
              <Link href="/disclaimer" className="hover:text-funky-yellow transition-colors underline">
                Disclaimer
              </Link>
              <Link href="/contact" className="hover:text-funky-yellow transition-colors underline">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-dashed border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 font-bold">
          <p>© {new Date().getFullYear()} FullTimePass.in. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-white">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>& High-Level Bakchodi in India 🇮🇳</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
