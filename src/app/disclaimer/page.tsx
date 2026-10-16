import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Disclaimer & Satire Policy | FullTimePass.in",
  description: "Satire, parody, and entertainment disclaimer for FullTimePass.in.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Satire & Entertainment Disclaimer
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Please read carefully: Dil pe mat lena, sirf timepass hai!
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200">
            <strong>Key Principle:</strong> All content, tools, quizzes, scores, meters, roasts, certificates, simulated family WhatsApp chats, and recovery notices on FullTimePass.in are purely satirical works of fictional entertainment.
          </div>

          <h3 className="text-base font-bold text-white pt-2">1. Udhaar Recovery Notice</h3>
          <p>
            The &ldquo;Udhaar Recovery Notice&rdquo; is a parody document referencing the fictional &ldquo;Reserve Bank of Bhaichara&rdquo;. It is NOT a genuine legal, financial, or government summons. It carries zero legal validity and is intended solely as playful banter between friends.
          </p>

          <h3 className="text-base font-bold text-white pt-2">2. Relationship & Red Flag Meters</h3>
          <p>
            The &ldquo;GF/BF Red Flag Meter&rdquo; and &ldquo;Ex Yaad Aa Rahi Hai Meter&rdquo; calculate entertainment-only comedic scores using predefined humor templates. They are NOT professional psychological evaluations, relationship counseling, or genuine assessments of any person&apos;s character or moral standing.
          </p>

          <h3 className="text-base font-bold text-white pt-2">3. Shaadi Market Value & Aukaat Checker</h3>
          <p>
            These tools are satirical parodies poking fun at Indian wedding culture and daily spending habits (like Swiggy orders and tapri chai). They do NOT request sensitive financial information, bank credentials, or tax IDs, and strictly avoid demeaning individuals based on gender, appearance, caste, or income.
          </p>

          <h3 className="text-base font-bold text-white pt-2">4. Fake Family WhatsApp Chat</h3>
          <p>
            The chat simulator generates original fictional parody dialog. It is not affiliated with or endorsed by WhatsApp LLC or Meta Platforms Inc., and does not impersonate any real individual.
          </p>

          <h3 className="text-base font-bold text-white pt-2">5. Playful Roasting Conduct</h3>
          <p>
            Roasts are generated for friendly banter. We do not encourage harassment, hate speech, bullying, or discrimination. Use the tools responsibly and bring smiles to your friends.
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
