"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, Send, CheckCircle2, ArrowLeft, HelpCircle, Sparkles, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("idea");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 space-y-12">
      <div className="p-5 sm:p-10 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-2xs">
            <Mail className="w-4 h-4 text-amber-600" />
            <span>We Love Community Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
            Contact FullTimePass Team 💬
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-2 leading-relaxed">
            Have a new funny tool idea? Want to submit custom desi roast punchlines or report a bug? Drop us a note!
          </p>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">
              Shukriya Dost! Message Received 🎉
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Humara desi squad aapka note review karega aur tapri pe chai peete waqt reply karega!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
              className="mt-3 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Aapka Naam 👤
              </label>
              <input
                type="text"
                placeholder="e.g. Bunty Sharma, Anjali, Rahul..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Email Address 📧
              </label>
              <input
                type="email"
                placeholder="bunty@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Category 🏷️
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="idea">💡 Suggest a New Desi Mini-Tool</option>
                <option value="roast">🔥 Submit Custom Roasts / Punchlines</option>
                <option value="bug">🐛 Bug Report / Broken Link</option>
                <option value="general">💬 General Feedback &amp; Love</option>
              </select>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Message / Timepass Idea 💡
              </label>
              <textarea
                placeholder="Naya tool ka idea ya koi funny dialogue jo add hona chahiye..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Helpful FAQ Section */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Can I suggest a new desi timepass tool?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Haan bilkul! We love community ideas. If your tool suggestion has great Indian relatable comedy potential, our team will build it and feature it for everyone to play!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Are all 20 tools on FullTimePass.in really free?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Yes, 100% free! No subscriptions, no credit cards, no login hurdles. Pure unadulterated timepass anytime you want.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Do you store my friends&apos; names or phone numbers?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Never! We never ask for phone numbers, and all friend nicknames entered on quiz pages are rendered locally in your browser and discarded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
