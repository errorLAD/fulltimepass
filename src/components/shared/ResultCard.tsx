"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  Share2,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Flame,
  MessageCircle,
  Zap,
  Award,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { ResultCardData } from "@/lib/types";
import { copyToClipboard, openWhatsAppShare } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/language/LanguageContext";

import RealMeter from "@/components/shared/RealMeter";

interface ResultCardProps {
  data: ResultCardData;
  onReset: () => void;
  rawTextToCopy?: string;
  audioBanner?: React.ReactNode;
  audioAction?: React.ReactNode;
}

export default function ResultCard({
  data,
  onReset,
  rawTextToCopy,
  audioBanner,
  audioAction,
}: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const { language, t } = useLanguage();

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FFE600", "#FF007A", "#00E5FF", "#00F59B", "#FF5C00"],
      });
    } catch (e) {}
    trackToolEvent({
      toolSlug: data.toolSlug,
      eventType: "COMPLETE",
      meta: { title: data.badgeTitle, score: data.score },
    });
  }, [data.toolSlug, data.badgeTitle, data.score]);

  // Handle Download Image via html-to-image
  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    try {
      setDownloading(true);
      trackToolEvent({
        toolSlug: data.toolSlug,
        eventType: "DOWNLOAD",
      });

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FFFFFF",
      });

      const link = document.createElement("a");
      const cleanName = (data.targetName || data.userName || "fulltimepass")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      link.download = `${data.toolSlug}-${cleanName}-result.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Image generation failed:", err);
      alert(language === "en" ? "Failed to download image. You can take a screenshot or share via WhatsApp!" : "Image download nahi ho saki. Aap screenshot le sakte hain ya WhatsApp pe share kar sakte hain!");
    } finally {
      setDownloading(false);
    }
  };

  // Build Share text matching language
  const inviteLabel = language === "en" ? "👉 Test your score here:" : "👉 Apna timepass test karo:";
  const shareMessage =
    rawTextToCopy ||
    `🔥 *FullTimePass.in Result: ${data.toolTitle}*\n` +
      (data.targetName ? `👤 Target: *${data.targetName}*\n` : "") +
      (data.userName ? `👤 Name: *${data.userName}*\n` : "") +
      `🏆 Title: *${data.badgeTitle}*\n` +
      (data.score !== undefined ? `📊 Score: *${data.score}*\n` : "") +
      `💬 "${data.description}"\n\n` +
      (data.punchline ? `⚡ *Punchline:* ${data.punchline}\n\n` : "") +
      `${inviteLabel} https://fulltimepass.in/${data.toolSlug}`;

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    trackToolEvent({
      toolSlug: data.toolSlug,
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    openWhatsAppShare(shareMessage);
  };

  // Handle Native Share
  const handleNativeShare = async () => {
    trackToolEvent({
      toolSlug: data.toolSlug,
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "native_share" },
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: `FullTimePass.in - ${data.toolTitle}`,
          text: shareMessage,
          url: `https://fulltimepass.in/${data.toolSlug}`,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        await handleCopy();
      }
    } else {
      await handleCopy();
    }
  };

  // Handle Copy text
  const handleCopy = async () => {
    const ok = await copyToClipboard(shareMessage);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const certificateLabel =
    language === "en"
      ? "Official Satirical Comedy Certificate"
      : "Official Satirical Joke Certificate";

  const defaultDisclaimer =
    language === "en"
      ? "100% Satirical Comedy • All rights reserved"
      : "100% Comedy & Satire • Dil pe mat lo";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto space-y-6"
    >
      {/* Audio Announcement / Speaker Banner (if provided) */}
      {audioBanner}

      {/* THE VIRAL RESULT CARD (CAPTURE TARGET) */}
      <div
        ref={cardRef}
        id="result-card-capture"
        className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-2xl overflow-hidden text-slate-900"
      >
        {/* Subtle Decorative Background Seal */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

        {/* Card Header Stamp */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-4 mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-xs">
              <Flame className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 block leading-tight">
                FULLTIME<span className="text-amber-500">PASS</span>
                <span className="text-slate-400">.IN</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 block">
                {certificateLabel}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{data.category}</span>
          </div>
        </div>

        {/* Target or User Name Banner */}
        {(data.targetName || data.userName) && (
          <div className="text-center mb-5 relative z-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
              {data.targetName
                ? language === "en"
                  ? "Subject of Audit"
                  : "Certified Target"
                : language === "en"
                ? "Certificate Issued To"
                : "Namaankan / Certificate To"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {data.targetName || data.userName}
            </h3>
          </div>
        )}

        {/* Bespoke Interactive Real Meter */}
        <div className="my-6 relative z-10">
          <RealMeter
            toolSlug={data.toolSlug}
            score={data.score}
            scoreLabel={data.scoreLabel}
            metrics={data.metrics}
            targetName={data.targetName || data.userName}
          />
        </div>

        {/* Badge Title Headline */}
        <div className="text-center mb-5 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-base sm:text-lg shadow-sm border border-amber-500/40">
            {data.badgeTitle}
          </div>
          {data.subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-2 italic">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Roast / Satirical Description Box */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-5 relative z-10">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium whitespace-pre-line">
            {data.description}
          </p>
        </div>

        {/* Killer Punchline Callout */}
        {data.punchline && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-2.5 mb-5 relative z-10">
            <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 fill-amber-500" />
            <p className="text-xs sm:text-sm font-extrabold text-amber-950 leading-snug">
              {data.punchline}
            </p>
          </div>
        )}

        {/* Secondary Metrics / Bullet Points */}
        {data.bulletPoints && data.bulletPoints.length > 0 && (
          <div className="space-y-1.5 mb-6 text-xs text-slate-600 font-medium relative z-10">
            {data.bulletPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        )}

        {/* Card Footer Watermark & Satire Notice */}
        <div className="pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500 relative z-10 font-medium">
          <span>{data.disclaimer || defaultDisclaimer}</span>
          <span className="font-extrabold text-amber-700 uppercase tracking-wider">
            FULLTIMEPASS.IN
          </span>
        </div>
      </div>

      {/* PROMINENT ACTION TOOLBAR */}
      <div className="space-y-3">
        {/* Dedicated Audio Action / Speaker Replay Button (if provided) */}
        {audioAction}

        {/* Priority 1: WhatsApp Share & Download PNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full min-h-[50px] flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>{language === "en" ? "Share on WhatsApp 💬" : "WhatsApp pe Bhejo 💬"}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full min-h-[50px] flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-75 cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>
              {downloading
                ? language === "en"
                  ? "Exporting PNG..."
                  : "PNG Ban Raha Hai..."
                : language === "en"
                ? "Download Card Image 📸"
                : "Download Card Image 📸"}
            </span>
          </button>
        </div>

        {/* Priority 2: Copy Text & Native Share */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-600 font-extrabold">
                  {language === "en" ? "Copied!" : "Copy Ho Gaya! 🎉"}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{language === "en" ? "Copy Result Text" : "Copy Result 📋"}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNativeShare}
            className="min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-pink-600" />
            <span>
              {shareSuccess
                ? language === "en"
                  ? "Shared!"
                  : "Shared!"
                : language === "en"
                ? "Share with Friends"
                : "Dosto ko Bhejo 🚀"}
            </span>
          </button>
        </div>

        {/* Priority 3: Try Again & Explore Navigation */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{language === "en" ? "Try Again" : "Doosra Try Karo 🔄"}</span>
          </button>

          <Link
            href="/#all-tools"
            className="min-h-[44px] inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold uppercase text-amber-800 hover:text-amber-900 transition-colors py-2.5 px-4 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 shadow-xs"
          >
            <span>{language === "en" ? "Explore 20 Tools" : "Explore All Tools"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
