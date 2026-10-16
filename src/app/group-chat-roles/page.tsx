"use client";

import React, { useState, useRef } from "react";
import { Users, Plus, Trash2, Sparkles, Download, MessageCircle, Copy, Check, RefreshCw, ArrowRight, Flame } from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { CHAT_ROLES_POOL } from "@/lib/data/toolData";
import { getRandomItems, copyToClipboard } from "@/lib/utils";
import { trackToolEvent } from "@/lib/analytics";
import Link from "next/link";

interface AssignedRole {
  name: string;
  role: string;
  badge: string;
  description: string;
  color: string;
}

export default function GroupChatRolesPage() {
  const [groupName, setGroupName] = useState("");
  const [names, setNames] = useState<string[]>(["Rahul", "Priya", "Amit", "Sneha"]);
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
      alert("Please enter at least 4 friends' names!");
      return;
    }

    // Pick unique roles for each person
    const pickedRoles = getRandomItems(CHAT_ROLES_POOL, cleanNames.length);
    const assigned: AssignedRole[] = cleanNames.map((name, idx) => ({
      name,
      role: pickedRoles[idx].role,
      badge: pickedRoles[idx].badge,
      description: pickedRoles[idx].description,
      color: pickedRoles[idx].color,
    }));

    setAssignedRoles(assigned);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
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
        backgroundColor: "#0F172A",
      });
      const link = document.createElement("a");
      link.download = `group-chat-cabinet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download image. You can take a screenshot!");
    } finally {
      setDownloading(false);
    }
  };

  const getShareText = () => {
    if (!assignedRoles) return "";
    const gTitle = groupName.trim() || "The Squad";
    let text = `👑 *Official Cabinet of ${gTitle}* by FullTimePass.in\n\n`;
    assignedRoles.forEach((item) => {
      text += `👤 *${item.name}*: ${item.role}\n_${item.badge}_\n\n`;
    });
    text += `👉 Check your group roles: https://fulltimepass.in/group-chat-roles`;
    return text;
  };

  const handleWhatsApp = () => {
    trackToolEvent({
      toolSlug: "group-chat-roles",
      eventType: "SHARE_ATTEMPT",
      meta: { channel: "whatsapp" },
    });
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank");
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3">
          <Users className="w-4 h-4 text-blue-400" />
          <span>FullTimePass • Squad Cabinet</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Group Chat Role Generator 😂
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Enter 4 to 8 friends&apos; names and discover who is the Plan Cancel CEO, Seen-Zone Minister, Group ATM, or Gossip CID. Download & drop the bomb in your WhatsApp group!
        </p>
      </div>

      {assignedRoles ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* THE GROUP LEADERBOARD CARD */}
          <div
            ref={cardRef}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-blue-500/40 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider">
                    FullTimePass.in
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Official WhatsApp Group Cabinet 🇮🇳
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {groupName.trim() || "Desi Bakchod Gang"}
              </span>
            </div>

            {/* Members List */}
            <div className="space-y-3 mb-6">
              {assignedRoles.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-800 text-xs font-black flex items-center justify-center text-blue-400 shrink-0">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-base font-bold text-white">
                        {item.name}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <span className="inline-block text-xs font-black px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-sm">
                      {item.role}
                    </span>
                    <div className="text-[10px] font-bold text-amber-300 mt-0.5">
                      {item.badge}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Fictional Satire • Share & Tag Your Gang</span>
              <span className="font-bold text-blue-400">fulltimepass.in</span>
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
                <span>Share Cabinet on WhatsApp 💬</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 transition-all shadow-desi-pop flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{downloading ? "Exporting..." : "Download Group Card 📸"}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handleCopy}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Roles Text"}</span>
              </button>

              <button
                onClick={handleReset}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Shuffle Roles 🔄</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-4">
            <div>
              <label className="block text-sm font-bold text-white mb-1.5">
                WhatsApp Group Name (Optional) 💬
              </label>
              <input
                type="text"
                placeholder="e.g. 3 Idiots, Goa 2026 Confirm, Chai Tapri Squad..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                maxLength={40}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-white">
                  Enter 4 to 8 Friends&apos; Names 👥
                </label>
                <span className="text-xs text-slate-400">
                  {names.length}/8 friends
                </span>
              </div>

              <div className="space-y-2.5">
                {names.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-xs font-bold text-slate-400 flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      placeholder={`Friend #${index + 1} name`}
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      maxLength={30}
                      required
                    />
                    {names.length > 4 && (
                      <button
                        type="button"
                        onClick={() => removeFriend(index)}
                        className="p-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-slate-800"
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
                  className="mt-3 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Friend (Max 8)</span>
                </button>
              )}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Assign Group Roles & Generate Card 😂</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
