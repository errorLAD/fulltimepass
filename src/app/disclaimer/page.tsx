import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldAlert, ArrowLeft, AlertTriangle, Sparkles, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Satire Policy — 100% Satirical Entertainment | FullTimePass.in",
  description:
    "Satire, parody, and entertainment disclaimer for FullTimePass.in — Learn why all notices, meters, and roasts carry zero legal, financial, or medical weight.",
  alternates: {
    canonical: "https://fulltimepass.in/disclaimer",
  },
  openGraph: {
    title: "Disclaimer & Satire Policy | FullTimePass.in",
    description:
      "All content, tools, recovery notices, and meters on FullTimePass.in are purely satirical works of fictional entertainment. Dil pe mat lo!",
    url: "https://fulltimepass.in/disclaimer",
    siteName: "FullTimePass.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer & Satire Policy | FullTimePass.in",
    description: "Satire and entertainment disclaimer for FullTimePass.in.",
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
      "name": "Disclaimer & Satire Policy",
      "item": "https://fulltimepass.in/disclaimer",
    },
  ],
};

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="p-5 sm:p-10 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 border border-amber-300 shadow-2xs">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Satire &amp; Entertainment Disclaimer
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-1">
                Please read carefully: Dil pe mat lena, sirf timepass hai!
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-base leading-relaxed font-semibold">
            🚨 <strong>Golden Principle:</strong> All content, tools, questionnaires, scores, meters, certificates, simulated family WhatsApp chats, and recovery notices on FullTimePass.in are purely satirical works of fictional entertainment.
          </div>

          <div className="space-y-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                1. Udhaar Recovery Notice (Reserve Bank of Bhaichara)
              </h3>
              <p className="text-sm sm:text-base">
                The &ldquo;Udhaar Recovery Notice&rdquo; is a parody document referencing the fictional &ldquo;Reserve Bank of Bhaichara (RBB)&rdquo;. It is NOT a genuine legal summons, debt collection warrant, or court order. It carries zero legal or financial validity and is intended solely as playful banter between friends.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                2. GF/BF Red Flag Meter &amp; Ex Yaad Meter
              </h3>
              <p className="text-sm sm:text-base">
                The &ldquo;GF/BF Red Flag Meter&rdquo; and &ldquo;Ex Yaad Aa Rahi Hai Meter&rdquo; calculate comedic scores using humorous randomized templates. They are NOT professional psychiatric assessments, clinical psychological evaluations, or genuine judgments of any individual&apos;s moral character.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                3. Shaadi Market Value &amp; Aukaat Checker
              </h3>
              <p className="text-sm sm:text-base">
                These tools are humorous parodies poking fun at Indian wedding culture and daily spending quirks (like midnight Swiggy cravings and tapri cutting chai). They do NOT request real bank details, tax records, or passwords, and strictly avoid demeaning individuals based on caste, gender, appearance, or economic status.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                4. Fake Family WhatsApp Chat Simulator
              </h3>
              <p className="text-sm sm:text-base">
                The chat simulator generates original fictional parody dialog. It is not affiliated with, endorsed by, or sponsored by WhatsApp LLC or Meta Platforms Inc., and does not impersonate any real living person.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                5. Responsible Sharing &amp; Anti-Bullying Etiquette
              </h3>
              <p className="text-sm sm:text-base">
                Roasts and parody notices are created for good-natured laughs between consenting friends. We strictly condemn harassment, hate speech, cyber-bullying, and intimidation. If someone asks you not to share a parody card about them, please respect their feelings.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
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
