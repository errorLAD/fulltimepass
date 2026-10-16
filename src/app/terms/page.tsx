import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | FullTimePass.in",
  description: "Terms and conditions for using FullTimePass.in.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Terms of Use
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Rules of the Timepass Playground
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            By accessing or using <strong>FullTimePass.in</strong>, you agree to these Terms of Use. If you do not agree with any part, please do not use the website.
          </p>

          <h3 className="text-base font-bold text-white pt-2">1. Personal & Non-Commercial Use</h3>
          <p>
            FullTimePass.in is provided for personal, non-commercial entertainment purposes. You may freely share generated result cards, roasts, and parody notices with friends on social platforms and messaging apps.
          </p>

          <h3 className="text-base font-bold text-white pt-2">2. Prohibited Conduct</h3>
          <p>
            You agree not to use our tools to harass, defame, bully, or intimidate any real person. You agree not to enter sensitive private information, hate speech, or sexually explicit content into the input fields.
          </p>

          <h3 className="text-base font-bold text-white pt-2">3. Intellectual Property</h3>
          <p>
            All original graphics, software, code, quiz formats, and comedic templates are the property of FullTimePass.in. Third-party brand references (e.g. WhatsApp, Swiggy, Zomato, iPhone) are used strictly under nominative fair use for comedic and cultural satire.
          </p>

          <h3 className="text-base font-bold text-white pt-2">4. Limitation of Liability</h3>
          <p>
            FullTimePass.in is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. Under no circumstances shall FullTimePass.in be liable for any disputes or misunderstandings resulting from the use of parody result cards or playful roasts.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
