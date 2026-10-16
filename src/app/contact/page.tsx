"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, Send, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md max-w-2xl mx-auto space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mb-3">
            <Mail className="w-4 h-4 text-orange-500" />
            <span>We Love Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Contact FullTimePass Team 💬
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Have a new funny tool idea? Want to submit custom desi roasts or collaborate? Drop us a note!
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              Shukriya Dost! Message Received 🎉
            </h3>
            <p className="text-xs text-slate-300">
              Humara bakchodi squad aapka message padhega aur chai peete waqt reply karega!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Aapka Naam 👤
              </label>
              <input
                type="text"
                placeholder="e.g. Bunty Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Email Address 📧
              </label>
              <input
                type="email"
                placeholder="bunty@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Message / Timepass Idea / Feedback 💡
              </label>
              <textarea
                placeholder="Naya tool ka idea ya koi funny dialogue jo add hona chahiye..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 shadow-desi-pop hover:shadow-desi-pop-hover flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-800">
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
