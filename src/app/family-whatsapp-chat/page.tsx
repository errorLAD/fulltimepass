"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, Download, MessageCircle, Copy, Check, RefreshCw, Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { getFamilyChatThemes } from "@/lib/data/toolDataHelper";
import { copyToClipboard, openWhatsAppShare } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";
import RelatedTools from "@/components/shared/RelatedTools";
import GameAudioBar from "@/components/audio/GameAudioBar";
import Link from "next/link";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function FamilyWhatsAppChatPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const themes = getFamilyChatThemes(language);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [userName, setUserName] = useState("Me");
  const [papaName, setPapaName] = useState(isEn ? "Dad" : "Papaji");
  const [mummyName, setMummyName] = useState(isEn ? "Mom" : "Mummyji");
  const [siblingName, setSiblingName] = useState(isEn ? "Kid Sibling" : "Chintu (Bhai)");
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedThemeIndex >= themes.length) {
      setSelectedThemeIndex(0);
    }
  }, [language, themes.length, selectedThemeIndex]);

  const activeTheme = themes[selectedThemeIndex] || themes[0];

  // Dynamic message mapper replacing placeholders
  const processedMessages = activeTheme.messages.map((m) => {
    let sender = m.sender;
    if (sender === "Me") sender = userName.trim() || "Me";
    if (sender === "Papaji" || sender === "Dad") sender = papaName.trim() || (isEn ? "Dad" : "Papaji");
    if (sender === "Mummyji" || sender === "Mom") sender = mummyName.trim() || (isEn ? "Mom" : "Mummyji");
    if (sender.includes("Chintu") || sender.includes("Sibling")) sender = siblingName.trim() || (isEn ? "Kid Sibling" : "Chintu");
    return { ...m, sender };
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    trackToolEvent({
      toolSlug: "family-whatsapp-chat",
      eventType: "COMPLETE",
      meta: { theme: activeTheme.id },
    });
  };

  const handleDownload = async () => {
    if (!chatRef.current || downloading) return;
    try {
      setDownloading(true);
      trackToolEvent({
        toolSlug: "family-whatsapp-chat",
        eventType: "DOWNLOAD",
      });
      const dataUrl = await toPng(chatRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#EFEAE2",
      });
      const link = document.createElement("a");
      link.download = `family-chat-${activeTheme.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert(isEn ? "Failed to export chat image. Take a screenshot or share via WhatsApp!" : "Download fail hua. Screenshot le lo!");
    } finally {
      setDownloading(false);
    }
  };

  const getChatText = () => {
    let text = isEn
      ? `📱 *Family Group Chat: ${activeTheme.title}*\nBy FullTimePass.in (Satirical Parody)\n\n`
      : `📱 *Desi Family Group Chat: ${activeTheme.title}*\nBy FullTimePass.in (Fictional Parody)\n\n`;

    processedMessages.forEach((msg) => {
      text += `*${msg.sender}* [${msg.time}]:\n"${msg.text}"\n\n`;
    });
    text += isEn
      ? `👉 Generate your own funny chat: https://fulltimepass.in/family-whatsapp-chat`
      : `👉 Apne group ka chat banao: https://fulltimepass.in/family-whatsapp-chat`;
    return text;
  };

  const handleWhatsApp = () => {
    trackToolEvent({
      toolSlug: "family-whatsapp-chat",
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    openWhatsAppShare(getChatText());
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getChatText());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>FullTimePass • {isEn ? "Family Chat Parody" : "Desi Chat Parody"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Fake Family WhatsApp Chat 🤣" : "Fake Family WhatsApp Chat 🤣"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Generate classic, chaotic family group chat drama: from 6 AM motivational forwards to marriage pressure and vacation cancellations!"
            : "Generate classic, chaotic Indian family group chat drama: from 6 AM WhatsApp University forwards to shaadi pressure and Goa trip rejections!"}
        </p>
      </div>

      {generated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-xl mx-auto space-y-6"
        >
          {/* Contextual Audio Reader */}
          <GameAudioBar
            toolSlug="family-whatsapp-chat"
            toolTitle={isEn ? "Fake Family WhatsApp Chat" : "Fake Family WhatsApp Chat"}
            badgeTitle={activeTheme.title}
            customAudioTitle={isEn ? "Suno Family Chat 📱" : "Suno Parivaar Kalesh 📱"}
            customAudioSubtitle={
              isEn
                ? "Listen to dramatic family chat audio in funny voice"
                : "Papaji aur Mummyji ki kalesh chat aawaz mein suniye"
            }
            description={processedMessages
              .map((m) => `${m.sender}: ${m.text}`)
              .join(". ... ")}
            language={language}
          />

          {/* THE ORIGINAL FICTIONAL CHAT INTERFACE - AUTHENTIC WHATSAPP LIGHT MODE */}
          <div
            ref={chatRef}
            className="rounded-3xl overflow-hidden border-2 border-slate-300 bg-[#EFEAE2] shadow-2xl text-slate-900 relative"
          >
            {/* Parody Chat Header */}
            <div className="px-5 py-4 bg-[#075E54] text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
                  👨‍👩‍👧‍👦
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    <span>{isEn ? "Family Circle 🌐" : "Khandaan Supreme 🇮🇳"}</span>
                  </h3>
                  <p className="text-xs text-emerald-100 font-medium">
                    {activeTheme.title}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-100 border border-emerald-600">
                {isEn ? "Parody Chat" : "Parody Chat"}
              </span>
            </div>

            {/* Satirical Chat Message Stream */}
            <div className="p-4 sm:p-6 space-y-3.5 bg-[#EFEAE2] min-h-[380px]">
              {processedMessages.map((msg, idx) => {
                const isMe = msg.sender === (userName.trim() || "Me");
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 shadow-sm relative ${
                        isMe
                          ? "bg-[#DCF8C6] text-slate-900 rounded-br-xs border border-emerald-200"
                          : "bg-white text-slate-900 rounded-bl-xs border border-slate-200"
                      }`}
                    >
                      {!isMe && (
                        <span className="block text-xs font-bold text-emerald-800 mb-1 break-words">
                          {msg.sender}
                        </span>
                      )}
                      <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-800 break-words">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1.5 mt-1.5">
                        <span className="text-[10px] text-slate-500 font-medium">
                          {msg.time}
                        </span>
                        {isMe && <span className="text-xs text-cyan-600 font-bold">✓✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Footer Watermark & Satire Notice */}
            <div className="px-5 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>{isEn ? "Original Satirical Parody • Not Real Messages" : "Original Satirical Parody • Not Real Messages"}</span>
              <span className="font-extrabold text-emerald-700">FullTimePass.in</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="py-3.5 px-5 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{isEn ? "Share Chat on WhatsApp 💬" : "Share Chat on WhatsApp 💬"}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3.5 px-5 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>{downloading ? (isEn ? "Exporting..." : "Exporting...") : (isEn ? "Download Chat Card 📸" : "Download Chat Card 📸")}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (isEn ? "Copied!" : "Copied!") : (isEn ? "Copy Chat Script" : "Copy Chat Script")}</span>
              </button>

              <button
                onClick={() => setGenerated(false)}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isEn ? "Change Theme / Names 🔄" : "Change Theme / Names 🔄"}</span>
              </button>
            </div>

            <div className="pt-2 text-right">
              <Link
                href="/#all-tools"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase text-emerald-800 hover:text-emerald-900 transition-colors py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200"
              >
                <span>{isEn ? "Explore More Tools" : "Explore More Tools"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Pick Theme */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <label className="block text-sm sm:text-base font-bold text-slate-900 mb-3.5">
              {isEn ? "1. Choose Family Drama Theme 🎭" : "1. Choose Family Drama Theme 🎭"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themes.map((th, idx) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setSelectedThemeIndex(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    selectedThemeIndex === idx
                      ? "bg-emerald-50 border-emerald-500 text-slate-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-base font-bold text-slate-900 mb-1">
                    {th.title}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {th.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Customize Characters */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "2. Customize Family Characters (Optional) 👨‍👩‍👧‍👦" : "2. Customize Family Characters (Optional) 👨‍👩‍👧‍👦"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">{isEn ? "Your Name:" : "Your Name:"}</span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">{isEn ? "Dad's Name:" : "Papaji Name:"}</span>
                <input
                  type="text"
                  value={papaName}
                  onChange={(e) => setPapaName(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">{isEn ? "Mom's Name:" : "Mummyji Name:"}</span>
                <input
                  type="text"
                  value={mummyName}
                  onChange={(e) => setMummyName(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">{isEn ? "Sibling's Name:" : "Sibling Name:"}</span>
                <input
                  type="text"
                  value={siblingName}
                  onChange={(e) => setSiblingName(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{isEn ? "Generate Hilarious Family Chat 🤣" : "Generate Hilarious Family Chat 🤣"}</span>
            </button>
          </div>
        </form>
      )}

      <RelatedTools currentSlug="family-whatsapp-chat" />
    </div>
  );
}
