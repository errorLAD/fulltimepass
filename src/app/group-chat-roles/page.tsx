"use client";

import React, { useState, useRef } from "react";
import { Users, Plus, Trash2, Sparkles, Download, MessageCircle, Copy, Check, RefreshCw, ArrowRight, Flame, Trophy, Zap } from "lucide-react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { getChatRolesPool } from "@/lib/data/toolDataHelper";
import { getRandomItems, copyToClipboard, openWhatsAppShare } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";
import RelatedTools from "@/components/shared/RelatedTools";
import GameAudioBar from "@/components/audio/GameAudioBar";
import Link from "next/link";
import { useLanguage } from "@/lib/language/LanguageContext";

interface AssignedRole {
  name: string;
  role: string;
  badge: string;
  description: string;
  color: string;
}

export default function GroupChatRolesPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [groupName, setGroupName] = useState("");
  const [names, setNames] = useState<string[]>(isEn ? ["Alex", "Sam", "Jordan", "Taylor"] : ["Rahul", "Priya", "Amit", "Sneha"]);
  const [assignedRoles, setAssignedRoles] = useState<AssignedRole[] | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const addFriend = () => {
    if (names.length < 8) {
      setNames([...names, ""]);
    }
  };

  const removeFriend = (index: number) => {
    if (names.length > 4) {
      setNames(names.filter((_, idx) => idx !== index));
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNames = names.map((n) => n.trim()).filter((n) => n.length > 0);
    if (cleanNames.length < 4) {
      alert(isEn ? "Please enter at least 4 friends' names!" : "Kam se kam 4 dosto ke naam likho!");
      return;
    }

    const rolesPool = getChatRolesPool(language);
    // Pick unique roles for each person
    const pickedRoles = getRandomItems(rolesPool, cleanNames.length);
    const assigned: AssignedRole[] = cleanNames.map((name, idx) => ({
      name,
      role: (pickedRoles[idx] as any).role || (pickedRoles[idx] as any).title,
      badge: pickedRoles[idx].badge,
      description: pickedRoles[idx].description,
      color: pickedRoles[idx].color,
    }));

    setAssignedRoles(assigned);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFE600", "#FF007A", "#00E5FF", "#00F59B"],
      });
    } catch (e) {}

    trackToolEvent({
      toolSlug: "group-chat-roles",
      eventType: "COMPLETE",
      meta: { friendCount: cleanNames.length },
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    try {
      setDownloading(true);
      trackToolEvent({
        toolSlug: "group-chat-roles",
        eventType: "DOWNLOAD",
      });
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FFFFFF",
      });
      const link = document.createElement("a");
      link.download = `squad-cabinet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert(isEn ? "Failed to download image. You can take a screenshot!" : "Download fail hua. Screenshot le lo!");
    } finally {
      setDownloading(false);
    }
  };

  const getShareText = () => {
    if (!assignedRoles) return "";
    const gTitle = groupName.trim() || (isEn ? "The Squad" : "Desi Bakchod Gang");
    let text = isEn
      ? `👑 *Official Cabinet of ${gTitle}* by FullTimePass.in\n\n`
      : `👑 *Official Cabinet of ${gTitle}* by FullTimePass.in\n\n`;

    assignedRoles.forEach((item) => {
      text += `👤 *${item.name}*: ${item.role} (${item.badge})\n👉 "${item.description}"\n\n`;
    });
    text += isEn
      ? `👉 Find out your squad roles: https://fulltimepass.in/group-chat-roles`
      : `👉 Apne group ke roles dekho: https://fulltimepass.in/group-chat-roles`;
    return text;
  };

  const handleWhatsApp = () => {
    trackToolEvent({
      toolSlug: "group-chat-roles",
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    openWhatsAppShare(getShareText());
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(getShareText());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setAssignedRoles(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3">
          <span>{isEn ? "👑 SQUAD DEMOCRACY DISRUPTOR" : "👑 SQUAD DEMOCRACY DISRUPTOR"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Group Chat Roles 😂" : "Group Chat Roles 😂"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Enter 4 to 8 friends' names and discover who is the Flake CEO, Seen-Zone Ghost, 3 AM Meme Dealer, or Drama Queen. Download & drop the bomb in your group chat!"
            : "Enter 4 to 8 friends' names and discover who is the Plan Cancel CEO, Seen-Zone Minister, Group ATM, or Gossip CID. Download & drop the bomb in your WhatsApp group!"}
        </p>
      </div>

      {assignedRoles ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Contextual Audio Reader */}
          <GameAudioBar
            toolSlug="group-chat-roles"
            toolTitle={isEn ? "Group Chat Role Generator" : "Group Chat Role Generator"}
            badgeTitle={groupName.trim() || (isEn ? "The Squad Gang" : "Desi Bakchod Gang")}
            customAudioTitle={isEn ? "Suno Squad Roles 👑" : "Suno Squad Roles 👑"}
            customAudioSubtitle={
              isEn
                ? "Listen to squad cabinet assignments in funny voice"
                : "Dosto ke official cabinet khitaab aawaz mein suniye"
            }
            description={assignedRoles
              .map((r, i) => `#${i + 1} ${r.name}: ${r.role}. ${r.description}`)
              .join(". ... ")}
            language={language}
          />

          {/* THE GROUP LEADERBOARD CARD */}
          <div
            ref={cardRef}
            className="p-4 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-2xl text-slate-900 relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-sm">
                  <Flame className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-cyan-800 uppercase tracking-wider">
                    FULLTIMEPASS.IN
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase">
                    {isEn ? "Official Squad Cabinet Leaderboard 🌐" : "Official Squad Cabinet Leaderboard 🇮🇳"}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                {groupName.trim() || (isEn ? "The Squad Gang" : "Desi Bakchod Gang")}
              </span>
            </div>

            {/* Members List */}
            <div className="space-y-3.5 mb-6">
              {assignedRoles.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-sm font-extrabold flex items-center justify-center text-slate-800 shrink-0 shadow-xs">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight break-words">
                        {item.name}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-0.5 break-words">
                        &ldquo;{item.description}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <span className="inline-block text-xs font-extrabold px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs uppercase tracking-wide">
                      {item.role}
                    </span>
                    <div className="text-[11px] font-bold text-emerald-700 mt-1 uppercase">
                      {item.badge}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{isEn ? "Satirical Squad Cabinet • Tag Your Friends" : "Satirical Squad Cabinet • Tag Your Gang"}</span>
              <span className="font-extrabold text-cyan-800 uppercase tracking-wider">FULLTIMEPASS.IN</span>
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
                <span>{isEn ? "Share Cabinet on WhatsApp 💬" : "Share Cabinet on WhatsApp 💬"}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3.5 px-5 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>{downloading ? (isEn ? "Exporting..." : "Exporting...") : (isEn ? "Download Squad Card 📸" : "Download Squad Card 📸")}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (isEn ? "Copied!" : "Copied!") : (isEn ? "Copy Roles Text" : "Copy Roles Text")}</span>
              </button>

              <button
                onClick={handleReset}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isEn ? "Re-Shuffle Roles 🔄" : "Re-Shuffle Roles 🔄"}</span>
              </button>
            </div>

            <div className="pt-2 text-right">
              <Link
                href="/#all-tools"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase text-cyan-800 hover:text-cyan-900 transition-colors py-2 px-3 rounded-xl bg-cyan-50 border border-cyan-200"
              >
                <span>{isEn ? "Explore More Tools" : "Explore More Tools"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "Group Chat Name (Optional) 💬" : "WhatsApp Group Name (Optional) 💬"}
              </label>
              <input
                type="text"
                placeholder={isEn ? "e.g. 3 Idiots, Weekend Trip 2026, Coffee Squad..." : "e.g. 3 Idiots, Goa 2026 Confirm, Chai Tapri Squad..."}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                maxLength={40}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-sm sm:text-base font-bold text-slate-900">
                  {isEn ? "Enter 4 to 8 Friends' Names 👥" : "Enter 4 to 8 Friends' Names 👥"}
                </label>
                <span className="text-xs font-semibold text-cyan-800 px-2.5 py-0.5 bg-cyan-50 border border-cyan-200 rounded-md">
                  {names.length}/8 {isEn ? "friends" : "friends"}
                </span>
              </div>

              <div className="space-y-3">
                {names.map((name, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      placeholder={isEn ? `Friend #${index + 1} name` : `Friend #${index + 1} name`}
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                      maxLength={30}
                      required
                    />
                    {names.length > 4 && (
                      <button
                        type="button"
                        onClick={() => removeFriend(index)}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {names.length < 8 && (
                <button
                  type="button"
                  onClick={addFriend}
                  className="mt-3.5 text-xs sm:text-sm font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{isEn ? "Add Another Friend (Max 8)" : "Add Another Friend (Max 8)"}</span>
                </button>
              )}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-white" />
              <span>{isEn ? "Assign Squad Roles & Generate Card 😂" : "Assign Squad Roles & Generate Card 😂"}</span>
            </button>
          </div>
        </form>
      )}

      <RelatedTools currentSlug="group-chat-roles" />
    </div>
  );
}
