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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FF9933", "#FF1361", "#FFD600", "#00DF72", "#7928CA"],
      });
    } catch (e) {
      // ignore
    }
    // Track complete event
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
        backgroundColor: "#0F172A",
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
    (data.targetName ? `👤 Target: ${data.targetName}\n` : "") +
    (data.userName ? `👤 Name: ${data.userName}\n` : "") +
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
        // Fallback to copy
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
      {/* THE RESULT CARD CONTAINER (EXPORTABLE DOM NODE) */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-orange-500/40 shadow-2xl shadow-orange-500/10 text-white"
        style={{ minHeight: "380px" }}
      >
        {/* Desi Corner Ornaments */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 via-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/20 via-yellow-500/10 to-transparent rounded-tr-full pointer-events-none" />

        {/* Card Header Branding */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center p-0.5">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider text-orange-400 uppercase">
                FullTimePass.in
              </span>
              <p className="text-[10px] text-slate-400 font-medium -mt-0.5">
                India&apos;s Desi Timepass Hub
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            {data.toolTitle}
          </span>
        </div>

        {/* Target or User Name */}
        {(data.targetName || data.userName) && (
          <div className="mb-3 relative z-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
              {data.targetName ? "Roast Certified For:" : "Candidate:"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400 mt-0.5">
              {data.targetName || data.userName}
            </h2>
          </div>
        )}

        {/* Badge & Score Headline */}
        <div className="my-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              Official Assessment
            </span>
            <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>{data.badgeTitle}</span>
            </div>
            {data.subtitle && (
              <p className="text-xs text-slate-300 font-medium mt-1">
                {data.subtitle}
              </p>
            )}
          </div>

          {data.score !== undefined && (
            <div className="flex sm:flex-col items-center justify-center px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-center shrink-0">
              <span className="text-2xl sm:text-3xl font-black text-orange-400">
                {data.score}
              </span>
              <span className="text-[10px] font-bold text-slate-300 sm:mt-0.5 ml-2 sm:ml-0">
                {data.scoreLabel || "Score"}
              </span>
            </div>
          )}
        </div>

        {/* Main Punchy Description */}
        <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/20 mb-4 relative z-10">
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed italic">
            &ldquo;{data.description}&rdquo;
          </p>
          {data.punchline && (
            <p className="text-xs sm:text-sm font-bold text-amber-400 mt-3 pt-2 border-t border-orange-500/20 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{data.punchline}</span>
            </p>
          )}
        </div>

        {/* Dynamic Metrics if present */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 relative z-10">
            {data.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center"
              >
                <div className="text-xs text-slate-400 font-medium">{m.label}</div>
                <div className="text-sm font-bold text-orange-300 mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bullet Points if present */}
        {data.bulletPoints && data.bulletPoints.length > 0 && (
          <div className="mb-4 relative z-10 space-y-1.5">
            {data.bulletPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-orange-400 font-bold shrink-0">👉</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Card Footer: Satire tag & Watermark */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
          <span>{data.disclaimer || "100% Comedy & Desi Satire • Dil pe mat lo"}</span>
          <span className="font-bold text-orange-400">fulltimepass.in</span>
        </div>
      </div>

      {/* ACTION TOOLBAR: WhatsApp, Download, Copy, Share, Try Again */}
      <div className="space-y-3">
        {/* WhatsApp & Download Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-all shadow-desi-pop hover:shadow-desi-pop-hover active:translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-white text-green-600" />
            <span>Share on WhatsApp 💬</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 transition-all shadow-desi-pop hover:shadow-desi-pop-hover active:translate-y-0.5 disabled:opacity-75"
          >
            <Download className="w-5 h-5" />
            <span>{downloading ? "Generating Card..." : "Download Card Image 📸"}</span>
          </button>
        </div>

        {/* Secondary Actions: Copy text & Native Web Share */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Result Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>{shareSuccess ? "Shared!" : "Share / More Apps"}</span>
          </button>
        </div>

        {/* Navigation Actions: Try Again & Explore More */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-800"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again (Naya Result)</span>
          </button>

          <Link
            href="/#all-tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors py-2 px-3 rounded-lg hover:bg-slate-800"
          >
            <span>Explore More Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
