"use client";

import React from "react";
import Link from "next/link";
import { Flame, ShieldAlert, Heart, Zap, Sparkles } from "lucide-react";
import { getLocalizedTools } from "@/lib/data/tools";
import { useLanguage } from "@/lib/language/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Footer() {
  const { language, t } = useLanguage();
  const tools = getLocalizedTools(language);
  const trendingTools = tools.filter((t) => t.featured).slice(0, 6);
  const otherTools = tools.filter((t) => !t.featured).slice(0, 6);

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Column 1: Brand & Origin */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center p-0.5 shadow-md">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                FULLTIME<span className="text-amber-500">PASS</span>
                <span className="text-xs text-slate-400 ml-1 font-semibold">.in</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="inline-block px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 shadow-2xs">
              {t("footer.quote")}
            </div>
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-2 font-medium">Select Language:</p>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Column 2: Trending Viral Tools */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-600" />
              <span>{t("footer.trending", "Trending Mini-Tools")}</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              {trendingTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="hover:text-amber-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 text-xs">👉</span>
                    <span>{tool.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Comedy & Satire */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-pink-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 fill-pink-500 text-pink-600" />
              <span>{t("footer.moreTools", "More Timepass Tools")}</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              {otherTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="hover:text-pink-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-pink-500 text-xs">👉</span>
                    <span>{tool.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Legal Pages */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{t("footer.company", "Company & Legal")}</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              <li>
                <Link href="/about" className="hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>Contact Us &amp; Feedback</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-amber-600 transition-colors inline-flex items-center gap-1.5">
                  <span>Disclaimer</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Satire & Disclaimer Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
          <p>
            <strong className="font-extrabold text-amber-950">Satirical Entertainment Disclaimer:</strong>{" "}
            {t("footer.disclaimer")}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FullTimePass.in. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium text-slate-600">
            <Link href="/about" className="hover:text-amber-600 transition-colors">
              About
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-amber-600 transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-amber-600 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-amber-600 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-amber-600 transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-amber-600 transition-colors">
              Sitemap
            </Link>
          </div>

          <p className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>&amp; pure comedy laughs 🔥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
