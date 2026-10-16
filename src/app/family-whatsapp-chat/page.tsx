"use client";

import React, { useState, useRef } from "react";
import { MessageSquare, Sparkles, Download, MessageCircle, Copy, Check, RefreshCw, Flame } from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { FAMILY_CHAT_THEMES } from "@/lib/data/toolData";
import { copyToClipboard } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";

export default function FamilyWhatsAppChatPage() {
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [userName, setUserName] = useState("Me");
  const [papaName, setPapaName] = useState("Papaji");
  const [mummyName, setMummyName] = useState("Mummyji");
  const [siblingName, setSiblingName] = useState("Chintu (Bhai)");
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const activeTheme = FAMILY_CHAT_THEMES[selectedThemeIndex];

  // Dynamic message mapper replacing placeholders
  const processedMessages = activeTheme.messages.map((m) => {
    let sender = m.sender;
    if (sender === "Me") sender = userName.trim() || "Me";
    if (sender === "Papaji") sender = papaName.trim() || "Papaji";
    if (sender === "Mummyji") sender = mummyName.trim() || "Mummyji";
    if (sender.includes("Chintu")) sender = siblingName.trim() || "Chintu";
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
        backgroundColor: "#0C101D",
      });
      const link = document.createElement("a");
      link.download = `desi-family-chat-${activeTheme.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to export chat image. Take a screenshot or share via WhatsApp!");
    } finally {
      setDownloading(false);
    }
  };

  const getChatText = () => {
    let text = `📱 *Desi Family Group Chat: ${activeTheme.title}*\nBy FullTimePass.in (Fictional Parody)\n\n`;
    processedMessages.forEach((msg) => {
      text += `*${msg.sender}* [${msg.time}]:\n"${msg.text}"\n\n`;
    });
    text += `👉 Generate your own funny chat: https://fulltimepass.in/family-whatsapp-chat`;
    return text;
  };

  const handleWhatsApp = () => {
    trackToolEvent({
      toolSlug: "family-whatsapp-chat",
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getChatText())}`;
    window.open(url, "_blank");
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold mb-3">
          <MessageSquare className="w-4 h-4 text-green-400" />
          <span>FullTimePass • Desi Chat Parody</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Fake Family WhatsApp Chat 🤣
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Generate classic, chaotic Indian family group chat drama: from 6 AM WhatsApp University forwards to shaadi pressure and Goa trip rejections!
        </p>
      </div>

      {generated ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* THE ORIGINAL FICTIONAL CHAT INTERFACE */}
          <div
            ref={chatRef}
            className="rounded-3xl overflow-hidden border-2 border-emerald-500/30 bg-slate-950 shadow-2xl text-white relative"
          >
            {/* Parody Chat Header */}
            <div className="px-5 py-4 bg-emerald-950/70 border-b border-emerald-800/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-base shadow-sm">
                  👨‍👩‍👧‍👦
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Khandaan Supreme 🇮🇳</span>
                  </h3>
                  <p className="text-[10px] text-emerald-300">
                    {activeTheme.title}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Parody Chat
              </span>
            </div>

            {/* Satirical Chat Message Stream */}
            <div className="p-4 sm:p-6 space-y-3.5 bg-slate-900/60 min-h-[380px]">
              {processedMessages.map((msg, idx) => {
                const isMe = msg.sender === (userName.trim() || "Me");
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 shadow-md relative ${
                        isMe
                          ? "bg-emerald-700/80 text-white rounded-br-xs border border-emerald-500/30"
                          : "bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/60"
                      }`}
                    >
                      {!isMe && (
                        <span className="block text-[11px] font-bold text-amber-300 mb-1">
                          {msg.sender}
                        </span>
                      )}
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[9px] text-slate-400">
                          {msg.time}
                        </span>
                        {isMe && <span className="text-[10px] text-cyan-300">✓✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Footer Watermark & Satire Notice */}
            <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
              <span>Original Satirical Parody • Not Real Messages</span>
              <span className="font-bold text-emerald-400">FullTimePass.in</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-500 transition-all shadow-desi-pop flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Share Chat on WhatsApp 💬</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-desi-pop flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{downloading ? "Exporting..." : "Download Chat Card 📸"}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handleCopy}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Chat Script"}</span>
              </button>

              <button
                onClick={() => setGenerated(false)}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Change Theme / Names 🔄</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Pick Theme */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md">
            <label className="block text-sm font-bold text-white mb-3">
              1. Choose Family Drama Theme 🎭
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FAMILY_CHAT_THEMES.map((th, idx) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setSelectedThemeIndex(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedThemeIndex === idx
                      ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-[1.01]"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">
                    {th.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    {th.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Customize Characters */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-4">
            <label className="block text-sm font-bold text-white">
              2. Customize Family Characters (Optional) 👨‍👩‍👧‍👦
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-400 font-medium">Your Name:</span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Papaji Name:</span>
                <input
                  type="text"
                  value={papaName}
                  onChange={(e) => setPapaName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Mummyji Name:</span>
                <input
                  type="text"
                  value={mummyName}
                  onChange={(e) => setMummyName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Sibling Name:</span>
                <input
                  type="text"
                  value={siblingName}
                  onChange={(e) => setSiblingName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Generate Hilarious Family Chat 🤣</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
