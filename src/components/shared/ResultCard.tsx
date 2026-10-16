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
} from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { ResultCardData } from "@/lib/types";
import { copyToClipboard } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";

interface ResultCardProps {
  data: ResultCardData;
  onReset: () => void;
  rawTextToCopy?: string;
}

export default function ResultCard({ data, onReset, rawTextToCopy }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 80,
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
        backgroundColor: "#0B0E1B",
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
      alert("Failed to download image. You can take a screenshot or share via WhatsApp!");
    } finally {
      setDownloading(false);
    }
  };

  // Build Share text
  const shareMessage = rawTextToCopy ||
    `🔥 *FullTimePass.in Result: ${data.toolTitle}*\n` +
    (data.targetName ? `👤 Target: *${data.targetName}*\n` : "") +
    (data.userName ? `👤 Name: *${data.userName}*\n` : "") +
    `🏆 Title: *${data.badgeTitle}*\n` +
    (data.score !== undefined ? `📊 Score: *${data.score}*\n` : "") +
    `💬 "${data.description}"\n\n` +
    (data.punchline ? `⚡ *Punchline:* ${data.punchline}\n\n` : "") +
    `👉 Apna timepass test karo: https://fulltimepass.in/${data.toolSlug}`;

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    trackToolEvent({
      toolSlug: data.toolSlug,
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank");
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

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* THE FUNKY COMIC CERTIFICATE CARD CONTAINER */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-slate-950 border-4 border-black shadow-[8px_8px_0px_#FFE600] text-white"
        style={{ minHeight: "400px" }}
      >
        {/* Funky Corner Tape Decors */}
        <div className="absolute -top-1 -left-2 z-20">
          <span className="funky-tape -rotate-6 text-[10px]">
            ⚡ BRO CODE CERTIFIED
          </span>
        </div>
        <div className="absolute -top-1 -right-2 z-20">
          <span className="funky-tape-pink rotate-3 text-[10px]">
            {data.category.toUpperCase()} LAB
          </span>
        </div>

        {/* Card Header Branding */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-slate-800 pb-4 pt-3 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-funky-yellow border-2 border-black flex items-center justify-center p-0.5 shadow-brutal">
              <Flame className="w-5 h-5 text-black fill-black" />
            </div>
            <div>
              <span className="text-xs font-black tracking-widest text-funky-yellow uppercase">
                FULLTIMEPASS.IN
              </span>
              <p className="text-[10px] text-slate-400 font-bold -mt-0.5 uppercase tracking-wider">
                Desi Timepass & Bro Code HQ 🇮🇳
              </p>
            </div>
          </div>
          <span className="text-[11px] font-black px-3 py-1 rounded-full bg-slate-900 text-funky-neonGreen border-2 border-black shadow-brutal">
            {data.toolTitle}
          </span>
        </div>

        {/* Target or User Name */}
        {(data.targetName || data.userName) && (
          <div className="mb-4 relative z-10">
            <span className="text-[10px] uppercase font-black tracking-widest text-funky-yellow px-2 py-0.5 bg-black border border-slate-800 rounded">
              {data.targetName ? "Roast Target:" : "Candidate:"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 uppercase tracking-tight">
              {data.targetName || data.userName}
            </h2>
          </div>
        )}

        {/* Badge & Score Headline */}
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border-3 border-black shadow-brutal relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-funky-yellow">
              Official Assessment
            </span>
            <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
              <span>{data.badgeTitle}</span>
            </div>
            {data.subtitle && (
              <p className="text-xs text-slate-300 font-bold mt-1">
                {data.subtitle}
              </p>
            )}
          </div>

          {data.score !== undefined && (
            <div className="flex sm:flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-funky-yellow border-2 border-black shadow-brutal text-center shrink-0">
              <span className="text-2xl sm:text-3xl font-black text-black">
                {data.score}
              </span>
              <span className="text-[10px] font-black text-black uppercase sm:mt-0.5 ml-2 sm:ml-0">
                {data.scoreLabel || "Score"}
              </span>
            </div>
          )}
        </div>

        {/* Main Punchy Description */}
        <div className="p-4 rounded-2xl bg-black border-2 border-slate-800 mb-4 relative z-10 shadow-inner">
          <p className="text-sm sm:text-base text-slate-100 font-bold leading-relaxed italic">
            &ldquo;{data.description}&rdquo;
          </p>
          {data.punchline && (
            <p className="text-xs sm:text-sm font-black text-funky-yellow mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-funky-yellow shrink-0 fill-funky-yellow" />
              <span>{data.punchline}</span>
            </p>
          )}
        </div>

        {/* Dynamic Metrics */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 relative z-10">
            {data.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900 border-2 border-black text-center shadow-brutal"
              >
                <div className="text-[10px] text-slate-400 font-black uppercase">{m.label}</div>
                <div className="text-xs sm:text-sm font-black text-funky-neonGreen mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bullet Points */}
        {data.bulletPoints && data.bulletPoints.length > 0 && (
          <div className="mb-4 relative z-10 space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            {data.bulletPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-semibold">
                <span className="text-funky-yellow font-black shrink-0">👉</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Card Footer Watermark */}
        <div className="pt-3 border-t-2 border-dashed border-slate-800 flex items-center justify-between text-[10px] text-slate-400 relative z-10 font-bold">
          <span>{data.disclaimer || "100% Comedy & Satire • Dil pe mat lo"}</span>
          <span className="font-black text-funky-yellow uppercase tracking-wider">FULLTIMEPASS.IN</span>
        </div>
      </div>

      {/* ACTION TOOLBAR */}
      <div className="space-y-3">
        {/* WhatsApp & Download */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black text-white bg-green-600 hover:bg-green-500 border-3 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 transition-all uppercase tracking-wider cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-green-600" />
            <span>Share on WhatsApp 💬</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black text-black bg-funky-yellow hover:bg-yellow-300 border-3 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-75 uppercase tracking-wider cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>{downloading ? "Exporting..." : "Download Card Image 📸"}</span>
          </button>
        </div>

        {/* Secondary: Copy & Share */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 border-2 border-black shadow-brutal transition-all uppercase cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-funky-neonGreen stroke-[3]" />
                <span className="text-funky-neonGreen">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 border-2 border-black shadow-brutal transition-all uppercase cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-funky-pink" />
            <span>{shareSuccess ? "Shared!" : "More Apps"}</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-slate-300 hover:text-white transition-colors py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again (Naya Result)</span>
          </button>

          <Link
            href="/#all-tools"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-funky-yellow hover:text-yellow-300 transition-colors py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700"
          >
            <span>Explore More Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
