"use client";

import React, { useState, useRef } from "react";
import { FileText, Sparkles, Download, MessageCircle, Copy, Check, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { copyToClipboard } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";

export default function UdhaarRecoveryNoticePage() {
  const [friendName, setFriendName] = useState("");
  const [amount, setAmount] = useState("500");
  const [borrowDate, setBorrowDate] = useState("Pichhle hafte");
  const [reason, setReason] = useState("Tapri Chai, Samosa aur Petrol");
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const noticeRef = useRef<HTMLDivElement>(null);

  const numAmount = parseFloat(amount) || 500;
  const interestTax = Math.round(numAmount * 4.2);
  const samosaPenalty = 250;
  const excuseAuditFee = 150;
  const grandTotal = numAmount + interestTax + samosaPenalty + excuseAuditFee;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) {
      alert("Please enter your friend's nickname!");
      return;
    }
    setGenerated(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    trackToolEvent({
      toolSlug: "udhaar-recovery-notice",
      eventType: "COMPLETE",
      meta: { amount: numAmount },
    });
  };

  const handleDownload = async () => {
    if (!noticeRef.current || downloading) return;
    try {
      setDownloading(true);
      trackToolEvent({
        toolSlug: "udhaar-recovery-notice",
        eventType: "DOWNLOAD",
      });
      const dataUrl = await toPng(noticeRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#111827",
      });
      const link = document.createElement("a");
      link.download = `udhaar-notice-${friendName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download image. You can take a screenshot!");
    } finally {
      setDownloading(false);
    }
  };

  const getNoticeText = () => {
    return (
      `🚨 *LEGAL-CUM-BAKCHODI NOTICE*\n` +
      `From: Reserve Bank of Bhaichara (RBB)\n` +
      `To Defaulter: *${friendName}*\n\n` +
      `Bhai, tune jo ₹${numAmount} liya tha (${reason}) on "${borrowDate}", uski deadline 500 saal pehle khatam ho chuki hai!\n\n` +
      `📜 *Line Items Breakdown:*\n` +
      `• Mool Rakam: ₹${numAmount}\n` +
      `• Friendship Interest (420%): ₹${interestTax}\n` +
      `• Chai-Samosa Cess: ₹${samosaPenalty}\n` +
      `• 'Kal deta hoon' Jhooth Fine: ₹${excuseAuditFee}\n\n` +
      `💰 *Grand Total Due: ₹${grandTotal}*\n\n` +
      `⚠️ Agar agle 10 minute mein Google Pay nahi kiya, toh group chat mein tumhari aisi photo daali jayegi jise dekh ke rishta cancel ho jayega!\n\n` +
      `👉 Parody notice via https://fulltimepass.in/udhaar-recovery-notice`
    );
  };

  const handleWhatsApp = () => {
    trackToolEvent({
      toolSlug: "udhaar-recovery-notice",
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getNoticeText())}`;
    window.open(url, "_blank");
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getNoticeText());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold mb-3">
          <FileText className="w-4 h-4 text-yellow-400" />
          <span>FullTimePass • Udhaar Cell</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Udhaar Recovery Notice 💰
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Friend not returning money? Generate an official-looking fictional warrant from the &ldquo;Reserve Bank of Bhaichara&rdquo; with 420% friendship interest tax and chai penalty!
        </p>
      </div>

      {generated ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* THE OFFICIAL PARODY RECOVERY NOTICE CARD */}
          <div
            ref={noticeRef}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-yellow-500/40 shadow-2xl text-slate-100 relative overflow-hidden font-mono"
          >
            {/* Stamp Overlay */}
            <div className="absolute top-12 right-6 -rotate-12 border-4 border-red-500/70 text-red-400 px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm tracking-widest uppercase pointer-events-none z-20">
              🚨 DEFAULTER DETECTED
            </div>

            {/* Header */}
            <div className="border-b-2 border-dashed border-slate-700 pb-4 mb-4 text-center">
              <span className="text-[10px] tracking-widest uppercase text-yellow-400 font-bold block mb-1">
                PARODY NOTICE • FICTIONAL SATIRE ONLY
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Reserve Bank of Bhaichara
              </h2>
              <p className="text-[11px] text-slate-400">
                Department of Unpaid Chai, Momos & Phantom Promises
              </p>
              <div className="mt-2 text-[10px] text-slate-500">
                Case File: #RBB-{Date.now().toString().slice(-6)}
              </div>
            </div>

            {/* Notice Details */}
            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">
                  Official Warning Issued To:
                </span>
                <span className="text-lg font-black text-yellow-400">
                  {friendName}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Subject has consistently avoided UPI transactions despite flaunting Starbucks stories and ordering gourmet burgers on Swiggy.
              </p>

              {/* Line Items Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex justify-between font-bold text-slate-400 border-b border-slate-800 pb-1 text-[11px]">
                  <span>Item Description</span>
                  <span>Amount Due</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Mool Rakam (Original Udhaar)</span>
                  <span>₹{numAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Friendship Maintenance Cess @ 420%</span>
                  <span>₹{interestTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tapri Chai & Samosa Compound Penalty</span>
                  <span>₹{samosaPenalty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>&lsquo;Bhai kal pakka deta hoon&rsquo; Excuse Fee</span>
                  <span>₹{excuseAuditFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-yellow-400 border-t border-slate-800 pt-1 text-sm">
                  <span>TOTAL OUTSTANDING DUE:</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Ultimatum */}
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-200 text-xs mb-5">
              ⚠️ <strong>Final Warning:</strong> Agle 10 minute mein Google Pay nahi kiya toh colony ke har WhatsApp group mein tumhari purani school wali photo share kardi jayegi!
            </div>

            {/* Notice Footer */}
            <div className="border-t-2 border-dashed border-slate-700 pt-3 flex items-center justify-between text-[10px] text-slate-500">
              <span>Satirical Joke Notice • FullTimePass.in</span>
              <span className="font-bold text-yellow-400">NO LEGAL VALUE</span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-all shadow-desi-pop flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Warrant on WhatsApp 💬</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all shadow-desi-pop flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{downloading ? "Exporting..." : "Download Notice Image 📸"}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handleCopy}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Notice Text"}</span>
              </button>

              <button
                onClick={() => setGenerated(false)}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Edit Notice 🔄</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-4">
            {/* Friend Nickname */}
            <div>
              <label className="block text-sm font-bold text-white mb-1.5">
                Defaulter Dost ka Nickname 👤
              </label>
              <input
                type="text"
                placeholder="e.g. Bunty, Sharma Ji, Rahul, Vicky..."
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-yellow-500"
                maxLength={40}
                required
              />
            </div>

            {/* Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-1.5">
                  Udhaar Amount (₹) 💸
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-yellow-500"
                  min={10}
                  max={1000000}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-1.5">
                  Kab Liya Tha? 🗓️
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2023 Goa Trip, Pichhle Hafte..."
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-yellow-500"
                  maxLength={30}
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-bold text-white mb-1.5">
                Kis Cheez Ke Liye Udhaar Liya Tha? ☕
              </label>
              <input
                type="text"
                placeholder="e.g. Chai samosa, Zomato bill, movie ticket, emergency..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-yellow-500"
                maxLength={60}
              />
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Issue Parody Recovery Warrant 💰</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
