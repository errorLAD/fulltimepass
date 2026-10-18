import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText, ArrowLeft, ShieldAlert, CheckCircle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — Terms of Use & Playground Rules | FullTimePass.in",
  description:
    "Terms and Conditions for FullTimePass.in — Rules of our desi timepass playground, permitted non-commercial use, and satire guidelines.",
  alternates: {
    canonical: "https://fulltimepass.in/terms",
  },
  openGraph: {
    title: "Terms & Conditions | FullTimePass.in",
    description:
      "Terms of Use for FullTimePass.in — Rules of the timepass playground, permitted sharing, and satirical humor guidelines.",
    url: "https://fulltimepass.in/terms",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | FullTimePass.in",
    description: "Terms and conditions for using FullTimePass.in.",
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
      "name": "Terms & Conditions",
      "item": "https://fulltimepass.in/terms",
    },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="p-5 sm:p-10 md:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Terms &amp; Conditions
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Rules of the Timepass Playground • Effective Date: October 2026
              </p>
            </div>
          </div>

          <div className="space-y-6 text-base text-slate-600 font-normal leading-relaxed">
            <p>
              By accessing, browsing, or using <strong className="text-slate-900 font-semibold">FullTimePass.in</strong>, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree with these terms, please do not use the website.
            </p>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                1. Purely Fictional &amp; Satirical Nature
              </h3>
              <p>
                All tools, recovery notices, meters, questionnaires, certificates, and roasts on FullTimePass.in are <strong>fictional works of satire</strong> created strictly for friendly humor and personal timepass. None of the content constitutes genuine legal documents, court warrants, government orders, financial audits, or psychological counseling.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                2. Permitted Personal &amp; Non-Commercial Use
              </h3>
              <p>
                You are granted a personal, revocable, non-exclusive license to use FullTimePass.in for non-commercial entertainment. You may freely download generated cards and share them with your friends, family, and squad on WhatsApp, Instagram, Telegram, and other social channels.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                3. Prohibited Conduct &amp; Harassment Prevention
              </h3>
              <p>
                You agree not to use our tools to defame, harass, stalk, threaten, blackmail, or bully any real individual. You must not enter illegal content, hate speech, sensitive financial credentials, or defamatory falsehoods into any tool inputs.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                4. Intellectual Property &amp; Nominative Fair Use
              </h3>
              <p>
                All original software code, user interface designs, custom graphics, quiz templates, and comedic scripts are the intellectual property of FullTimePass.in. Third-party brand references (e.g. WhatsApp, Swiggy, Zomato, Starbucks, Apple) are used strictly under nominative fair use for comedic and cultural satire.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                5. Disclaimer of Warranties &amp; Limitation of Liability
              </h3>
              <p>
                FullTimePass.in is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind. Under no circumstances shall FullTimePass.in or its creators be held liable for any disputes, lost friendships, emotional misunderstandings, or social grievances arising from the use or sharing of our parody content.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                6. Changes to Terms
              </h3>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of FullTimePass.in following any updates signifies your acceptance of the revised Terms.
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
