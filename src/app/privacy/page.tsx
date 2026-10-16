import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | FullTimePass.in",
  description: "Privacy Policy for FullTimePass.in.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Effective Date: October 2026
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At <strong>FullTimePass.in</strong>, we take your privacy seriously. This Privacy Policy outlines what information we collect (and what we deliberately do NOT collect) when you use our website.
          </p>

          <h3 className="text-base font-bold text-white pt-2">1. No User Accounts or Profiles</h3>
          <p>
            You do not need to create an account, log in, or provide an email address, phone number, or password to use any of the 10 tools on FullTimePass.in.
          </p>

          <h3 className="text-base font-bold text-white pt-2">2. User-Entered Names & Inputs</h3>
          <p>
            When you enter a friend&apos;s nickname or select funny traits, this information is processed locally in your browser to render the comedic card or chat preview. We do not sell, harvest, or link user-entered nicknames to personal identities.
          </p>

          <h3 className="text-base font-bold text-white pt-2">3. Aggregated Analytics & Events</h3>
          <p>
            We collect anonymous, aggregated event counts (e.g., how many times a tool was opened, completed, downloaded, or shared) to understand which timepass experiences our visitors love most. These statistics never contain personally identifiable information.
          </p>

          <h3 className="text-base font-bold text-white pt-2">4. Image Downloads & Sharing</h3>
          <p>
            When you click &ldquo;Download Card Image&rdquo;, the image is generated client-side directly on your device via HTML Canvas (`html-to-image`). We do not store your generated images on our servers.
          </p>

          <h3 className="text-base font-bold text-white pt-2">5. Cookies & Local Storage</h3>
          <p>
            We do not use intrusive cross-site tracking cookies. We may use standard browser session storage to maintain quiz progress while you are actively taking a test.
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
