"use client";

import React, { useState, useRef, useEffect } from "react";
import { FileText, Sparkles, Download, MessageCircle, Copy, Check, RefreshCw, AlertTriangle, ShieldCheck, ArrowRight, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { copyToClipboard, getRandomItem, openWhatsAppShare } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";
import { getUdhaarPunchlines } from "@/lib/data/toolDataHelper";
import { udhaarSoundEngine } from "@/lib/audio/udhaarAudio";
import RelatedTools from "@/components/shared/RelatedTools";
import Link from "next/link";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function UdhaarRecoveryNoticePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const punchlines = getUdhaarPunchlines(language);
  const [friendName, setFriendName] = useState("");
  const [amount, setAmount] = useState("500");
  const [borrowDate, setBorrowDate] = useState(isEn ? "Last week" : "Pichhle hafte");
  const [reason, setReason] = useState(isEn ? "Coffee, takeout, and snacks" : "Tapri Chai, Samosa aur Petrol");
  const [punchline, setPunchline] = useState(punchlines[0]);
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSoundEnabled(udhaarSoundEngine.isEnabled());
    return () => {
      udhaarSoundEngine.stopAll();
    };
  }, []);

  useEffect(() => {
    setPunchline(punchlines[0]);
    if (!friendName) {
      setBorrowDate(isEn ? "Last week" : "Pichhle hafte");
      setReason(isEn ? "Coffee, takeout, and snacks" : "Tapri Chai, Samosa aur Petrol");
    }
  }, [language, punchlines, friendName, isEn]);

  const cleanFriendName = friendName.replace(/^[,.\s\-_]+|[,.\s\-_]+$/g, "").trim() || (isEn ? "Defaulting Friend" : "Defaulter Dost");
  const numAmount = parseFloat(amount) || 500;
  const interestTax = Math.round(numAmount * 4.2);
  const snackPenalty = 250;
  const excuseAuditFee = 150;
  const grandTotal = numAmount + interestTax + snackPenalty + excuseAuditFee;
  const currencySymbol = isEn ? "$" : "₹";

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedName = friendName.replace(/^[,.\s\-_]+|[,.\s\-_]+$/g, "").trim();
    if (!sanitizedName) {
      alert(isEn ? "Please enter a valid friend name or nickname!" : "Kripya apne dost ka naam likhein!");
      return;
    }
    const chosenPunchline = getRandomItem(punchlines);
    setPunchline(chosenPunchline);
    setGenerated(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    // Play comedy voice announcement with sound effects in active language
    const announcement = udhaarSoundEngine.playNoticeAnnouncement(cleanFriendName, amount, language);
    setCurrentAnnouncement(announcement.displayText);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 5000);

    trackToolEvent({
      toolSlug: "udhaar-recovery-notice",
      eventType: "COMPLETE",
      meta: { amount: numAmount },
    });
  };

  const handleReplayAnnouncement = () => {
    const announcement = udhaarSoundEngine.playNoticeAnnouncement(cleanFriendName, amount, language);
    setCurrentAnnouncement(announcement.displayText);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 5000);
  };

  const handleToggleSound = () => {
    const next = udhaarSoundEngine.toggleSound();
    setSoundEnabled(next);
    if (!next) {
      setIsPlayingAudio(false);
    }
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
        backgroundColor: "#FFFFFF",
      });
      const link = document.createElement("a");
      link.download = `debt-notice-${cleanFriendName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert(isEn ? "Failed to download image. You can take a screenshot!" : "Download fail hua. Screenshot le lo!");
    } finally {
      setDownloading(false);
    }
  };

  const getNoticeText = () => {
    const cleanDate = borrowDate.replace(/^[,.\s\-_]+|[,.\s\-_]+$/g, "").trim() || (isEn ? "Ancient History" : "Pichhle Janam Se");
    const cleanReason = reason.replace(/^[,.\s\-_]+|[,.\s\-_]+$/g, "").trim() || (isEn ? "Takeout, drinks, and snacks" : "Tapri Chai, Samosa aur Petrol");
    const audioLine = currentAnnouncement
      ? `📢 *${isEn ? "Loudspeaker Notice" : "Loudspeaker Announcement"}:*\n"${currentAnnouncement}"\n\n`
      : "";

    if (isEn) {
      return (
        `🚨 *OFFICIAL DEBT RECOVERY NOTICE* 🚨\n` +
        `🏦 *Reserve Bank of Friendship (RBF)*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Defaulter:* *${cleanFriendName}*\n` +
        `💰 *Principal Amount:* *${currencySymbol}${numAmount.toLocaleString()}*\n` +
        `📅 *Borrowed On:* ${cleanDate}\n` +
        `☕ *Reason Given:* ${cleanReason}\n\n` +
        audioLine +
        `📜 *Comedic Penalty Breakdown:*\n` +
        `• Original Debt: ${currencySymbol}${numAmount.toLocaleString()}\n` +
        `• Friendship Maintenance Tax (420%): ${currencySymbol}${interestTax.toLocaleString()}\n` +
        `• Coffee & Snack Penalty: ${currencySymbol}${snackPenalty}\n` +
        `• 'Will Pay Tomorrow' Lie Fine: ${currencySymbol}${excuseAuditFee}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 *TOTAL OUTSTANDING: ${currencySymbol}${grandTotal.toLocaleString()}*\n\n` +
        `⚠️ *Final Warning:*\n${punchline}\n\n` +
        `💸 *Settle up and save your reputation!* 😂\n` +
        `🔗 *Generate your notice:* https://fulltimepass.in/udhaar-recovery-notice`
      );
    }

    return (
      `🚨 *OFFICIAL UDHAAR RECOVERY NOTICE* 🚨\n` +
      `🏦 *Reserve Bank of Bhaichara (RBB)*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Defaulter:* *${cleanFriendName}*\n` +
      `💰 *Mool Rakam:* *₹${numAmount.toLocaleString("en-IN")}*\n` +
      `📅 *Borrowed On:* ${cleanDate}\n` +
      `☕ *Reason Given:* ${cleanReason}\n\n` +
      audioLine +
      `📜 *Bakchodi Penalty Breakdown:*\n` +
      `• Original Udhaar: ₹${numAmount.toLocaleString("en-IN")}\n` +
      `• Dosti Maintenance Tax (420%): ₹${interestTax.toLocaleString("en-IN")}\n` +
      `• Chai-Samosa Penalty: ₹${snackPenalty}\n` +
      `• 'Kal Deta Hoon' Jhooth Fine: ₹${excuseAuditFee}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👉 *TOTAL OUTSTANDING: ₹${grandTotal.toLocaleString("en-IN")}*\n\n` +
      `⚠️ *Final Ultimatum:*\n${punchline}\n\n` +
      `💸 *Chupchap UPI karo aur apni izzat bachao!* 😂\n` +
      `🔗 *Generate your notice:* https://fulltimepass.in/udhaar-recovery-notice`
    );
  };

  const handleWhatsApp = () => {
    trackToolEvent({
      toolSlug: "udhaar-recovery-notice",
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    openWhatsAppShare(getNoticeText());
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
          <FileText className="w-4 h-4 text-amber-600" />
          <span>FullTimePass • {isEn ? "Debt Cell" : "Udhaar Cell"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Debt Recovery Notice 💰" : "Udhaar Recovery Notice 💰"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Friend dodging your money? Generate an official-looking satirical warrant from the 'Reserve Bank of Friendship' with 420% companionship interest tax and snack penalties!"
            : "Friend not returning money? Generate an official-looking fictional warrant from the “Reserve Bank of Bhaichara” with 420% friendship interest tax and chai penalty!"}
        </p>
      </div>

      {generated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-xl mx-auto space-y-6"
        >
          {/* Hilarious Meme Audio Voiceover Banner */}
          {currentAnnouncement && (
            <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/95 border-2 border-amber-300 shadow-sm flex items-start gap-3.5 relative z-10 animate-fade-in">
              <div
                className={`w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${
                  isPlayingAudio ? "animate-bounce" : ""
                }`}
              >
                <Volume2 className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <span>🎙️</span>
                    <span>{isEn ? "Comedic Audio Announcement" : "Desi Comedy Audio Announcement"}</span>
                    {isPlayingAudio && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full animate-pulse">
                        Speaking 🔊
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="text-xs font-bold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs hover:bg-slate-50 transition-colors"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                    )}
                    <span>{soundEnabled ? (isEn ? "Mute" : "Mute") : (isEn ? "Unmute" : "Unmute")}</span>
                  </button>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  &ldquo;{currentAnnouncement}&rdquo;
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReplayAnnouncement}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 bg-white hover:bg-amber-100/60 border border-amber-300 transition-colors shadow-2xs cursor-pointer"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 text-amber-700 ${isPlayingAudio ? "animate-spin" : ""}`} />
                    <span>{isEn ? "Play Another Announcement 🎲" : "Play Another Announcement 🎲"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* THE OFFICIAL PARODY RECOVERY NOTICE CARD */}
          <div
            ref={noticeRef}
            className="p-4 sm:p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-2xl text-slate-900 relative overflow-hidden font-mono"
          >
            {/* Stamp Overlay */}
            <div className="absolute top-3 right-3 sm:top-12 sm:right-6 -rotate-12 border-2 sm:border-4 border-rose-600 text-rose-600 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-xl font-extrabold text-[10px] sm:text-sm tracking-widest uppercase pointer-events-none z-20 shadow-sm">
              🚨 {isEn ? "DEFAULTER DETECTED" : "DEFAULTER DETECTED"}
            </div>

            {/* Header */}
            <div className="border-b-2 border-dashed border-slate-300 pb-4 mb-4 text-center">
              <span className="text-xs tracking-widest uppercase text-amber-800 font-extrabold block mb-1">
                {isEn ? "PARODY NOTICE • FICTIONAL SATIRE ONLY" : "PARODY NOTICE • FICTIONAL SATIRE ONLY"}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                {isEn ? "Reserve Bank of Friendship" : "Reserve Bank of Bhaichara"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-sans">
                {isEn ? "Department of Unpaid Takeout, Drinks & Phantom Promises 🌐" : "Department of Unpaid Chai, Momos & Phantom Promises 🇮🇳"}
              </p>
              <div className="mt-2 text-xs text-slate-500 font-bold">
                {isEn ? "Case File:" : "Case File:"} #{isEn ? "RBF" : "RBB"}-{Date.now().toString().slice(-6)}
              </div>
            </div>

            {/* Notice Details */}
            <div className="space-y-3.5 text-xs sm:text-sm mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 uppercase block font-bold mb-1">
                  {isEn ? "Official Warning Issued To:" : "Official Warning Issued To:"}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-sans">
                  {cleanFriendName}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-medium">
                {isEn
                  ? "Subject has consistently avoided payment settling despite flaunting high-end cafe stories and ordering premium deliveries online."
                  : "Subject has consistently avoided UPI transactions despite flaunting Starbucks stories and ordering gourmet burgers on Swiggy."}
              </p>

              {/* Line Items Table */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-xs sm:text-sm font-sans">
                <div className="flex justify-between font-bold text-slate-500 border-b border-slate-200 pb-2 text-xs uppercase tracking-wider">
                  <span>{isEn ? "Item Description" : "Item Description"}</span>
                  <span>{isEn ? "Amount Due" : "Amount Due"}</span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>{isEn ? "Original Debt Balance" : "Mool Rakam (Original Udhaar)"}</span>
                  <span className="font-bold">{currencySymbol}{numAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>{isEn ? "Friendship Maintenance Fee @ 420%" : "Friendship Maintenance Cess @ 420%"}</span>
                  <span className="font-bold">{currencySymbol}{interestTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>{isEn ? "Coffee & Snack Compound Penalty" : "Tapri Chai & Samosa Compound Penalty"}</span>
                  <span className="font-bold">{currencySymbol}{snackPenalty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>{isEn ? "'Will pay tomorrow' Excuse Audit Fee" : "‘Bhai kal pakka deta hoon’ Excuse Fee"}</span>
                  <span className="font-bold">{currencySymbol}{excuseAuditFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-extrabold text-amber-900 border-t-2 border-slate-300 pt-2.5 text-base sm:text-lg">
                  <span>{isEn ? "TOTAL OUTSTANDING DUE:" : "TOTAL OUTSTANDING DUE:"}</span>
                  <span>{currencySymbol}{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Ultimatum */}
            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-950 text-xs sm:text-sm mb-5 font-sans font-bold leading-relaxed shadow-xs">
              ⚠️ <strong>{isEn ? "Final Warning:" : "Final Warning:"}</strong> {punchline}
            </div>

            {/* Notice Footer */}
            <div className="border-t-2 border-dashed border-slate-300 pt-3 flex items-center justify-between text-xs text-slate-500 font-medium font-sans">
              <span>Satirical Joke Notice • FullTimePass.in</span>
              <span className="font-extrabold text-amber-800">NO LEGAL VALUE</span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="space-y-3">
            {/* Replay Comedy Voiceover Button */}
            <button
              onClick={handleReplayAnnouncement}
              className="w-full py-3.5 px-5 rounded-2xl text-sm sm:text-base font-extrabold text-slate-900 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 border-2 border-amber-300 transition-all flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md cursor-pointer"
            >
              <RotateCcw className={`w-4 h-4 text-amber-800 ${isPlayingAudio ? "animate-spin" : ""}`} />
              <span>{isEn ? "Replay Comedy Announcement 🎙️" : "Replay Desi Comedy Announcement 🎙️"}</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="py-3.5 px-5 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{isEn ? "Send Warrant on WhatsApp 💬" : "Send Warrant on WhatsApp 💬"}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3.5 px-5 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 disabled:opacity-75 cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>{downloading ? (isEn ? "Exporting..." : "Exporting...") : (isEn ? "Download Notice Image 📸" : "Download Notice Image 📸")}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (isEn ? "Copied!" : "Copied!") : (isEn ? "Copy Notice Text" : "Copy Notice Text")}</span>
              </button>

              <button
                onClick={() => setGenerated(false)}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isEn ? "Edit Notice 🔄" : "Edit Notice 🔄"}</span>
              </button>
            </div>

            <div className="pt-2 text-right">
              <Link
                href="/#all-tools"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase text-amber-800 hover:text-amber-950 transition-colors py-2 px-3 rounded-xl bg-amber-50 border border-amber-200"
              >
                <span>{isEn ? "Explore More Tools" : "Explore More Tools"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            {/* Friend Nickname */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "Friend's Name or Nickname 👤" : "Defaulter Dost ka Nickname 👤"}
              </label>
              <input
                type="text"
                placeholder={isEn ? "e.g. Alex, Sam, Dave, Jordan..." : "e.g. Bunty, Sharma Ji, Rahul, Vicky..."}
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                maxLength={40}
                required
              />
            </div>

            {/* Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                  {isEn ? `Debt Amount (${currencySymbol}) 💸` : "Udhaar Amount (₹) 💸"}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  min={1}
                  max={1000000}
                  required
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                  {isEn ? "When Did They Borrow It? 🗓️" : "Kab Liya Tha? 🗓️"}
                </label>
                <input
                  type="text"
                  placeholder={isEn ? "e.g. Last Summer Vacation, 3 weeks ago..." : "e.g. 2023 Goa Trip, Pichhle Hafte..."}
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  maxLength={30}
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "What Was The Money For? ☕" : "Kis Cheez Ke Liye Udhaar Liya Tha? ☕"}
              </label>
              <input
                type="text"
                placeholder={isEn ? "e.g. Dinner check, concert ticket, takeout order..." : "e.g. Chai samosa, Zomato bill, movie ticket, emergency..."}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                maxLength={60}
              />
            </div>

            {/* Audio Voiceover Toggle Pill */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🎙️</span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {isEn ? "Comedic Audio Voiceover" : "Desi Comedy Voiceover (Reel Mode)"}
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {isEn ? "Plays hilarious satirical recovery announcement with sound effects" : "Plays ridiculous Indian comedy announcement with sound effects"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleSound}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  soundEnabled
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                    : "bg-white text-slate-600 border-slate-300"
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? (isEn ? "Audio On" : "Audio On") : (isEn ? "Muted" : "Muted")}</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{isEn ? "Issue Satirical Debt Warrant 💰 (With Voiceover 🎙️)" : "Issue Parody Recovery Warrant 💰 (With Voiceover 🎙️)"}</span>
            </button>
          </div>
        </form>
      )}

      <RelatedTools currentSlug="udhaar-recovery-notice" />
    </div>
  );
}
