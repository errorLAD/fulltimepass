"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownUp, Check, RotateCw, Shuffle, Users, X } from "lucide-react";

type Teams = { teamA: string[]; teamB: string[]; substitutes: string[] };

function uniqueNames(value: string) {
  const seen = new Set<string>();
  return value.split(/\r?\n/).map((name) => name.trim()).filter((name) => {
    const key = name.toLocaleLowerCase();
    if (!name || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function secureRandomInt(max: number) {
  if (max <= 1) return 0;
  if (typeof crypto === "undefined" || !crypto.getRandomValues) return Math.floor(Math.random() * max);
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const sample = new Uint32Array(1);
  do { crypto.getRandomValues(sample); } while (sample[0] >= limit);
  return sample[0] % max;
}

function shuffled<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function CreateTeamPage() {
  const [playerText, setPlayerText] = useState("");
  const [teams, setTeams] = useState<Teams | null>(null);
  const [captainA, setCaptainA] = useState<string | null>(null);
  const [captainB, setCaptainB] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [generation, setGeneration] = useState(0);
  const previousTeams = useRef<{ players: string[]; splitAt: number } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const generate = (names = uniqueNames(playerText)) => {
    if (names.length < 4) {
      setError(`Add at least 4 unique player names. You have ${names.length}.`);
      return;
    }
    setError("");
    const cleanRoster = names;
    setPlayerText(cleanRoster.join("\n"));

    let order = shuffled(cleanRoster);
    const splitAt = Math.ceil(Math.min(cleanRoster.length, 18) / 2);
    const sameAsPrevious = (items: string[]) => previousTeams.current !== null && previousTeams.current.splitAt === splitAt && items.slice(0, 18).every((player, index) => player === previousTeams.current?.players[index]) && previousTeams.current.players.length === Math.min(cleanRoster.length, 18);
    let attempts = 0;
    while (sameAsPrevious(order) && attempts < 8) {
      order = shuffled(cleanRoster);
      attempts++;
    }
    if (sameAsPrevious(order)) {
      [order[0], order[1]] = [order[1], order[0]];
    }
    const selected = order.slice(0, 18);
    previousTeams.current = { players: selected, splitAt };
    setTeams({ teamA: selected.slice(0, splitAt), teamB: selected.slice(splitAt), substitutes: order.slice(18) });
    setCaptainA(null);
    setCaptainB(null);
    setGeneration((current) => current + 1);
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const startNew = () => {
    setPlayerText("");
    setTeams(null);
    setCaptainA(null);
    setCaptainB(null);
    setError("");
    setGeneration(0);
    previousTeams.current = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeCaptains = () => {
    setCaptainA(null);
    setCaptainB(null);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="team-generator min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-900 hover:text-emerald-700">← FullTimePass home</Link>
        <header className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[.2em] text-emerald-800"><Users className="h-4 w-4" /> Squad selector</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Random Cricket <span className="text-emerald-700">Team Generator</span> 🏏</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">Drop in 4 or more names, shuffle two balanced teams of up to nine, then choose both captains yourself.</p>
        </header>

        <section className="mx-auto mt-9 max-w-3xl rounded-3xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-emerald-700">Step 1</p><h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">Enter players, one per line</h2></div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">Minimum 4 unique names</span>
          </div>
          <textarea value={playerText} onChange={(event) => { setPlayerText(event.target.value); setError(""); }} placeholder={"Aarav Sharma\nAditi Rao\nArjun Mehta\n... add at least 18 players"} rows={10} aria-label="Enter player names, one per line" className="mt-5 min-h-64 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500"><span>Duplicate names are removed automatically (case-insensitive).</span><span className="font-bold text-slate-700">Unique names: {uniqueNames(playerText).length}</span></div>
          {error && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}
          <button onClick={() => generate()} className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-700 to-green-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-green-700 active:translate-y-0 sm:text-base"><Shuffle className="h-5 w-5" /> Generate Random Teams 🏏</button>
        </section>

        {teams && <section ref={resultsRef} className="scroll-mt-6 pb-12 pt-10" aria-live="polite">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-emerald-700">Step 2 · Pick your captains</p><h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Your teams are ready</h2><p className="mt-1 text-sm text-slate-600">Select one captain for each side. We won&apos;t pick for you.</p></div>
            <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold text-slate-600">Shuffle #{generation}</span>
          </div>
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <TeamCard name="TEAM A" players={teams.teamA} captain={captainA} onSelect={setCaptainA} side="a" generation={generation} />
            <div className="vs-mark my-2 flex items-center justify-center self-center lg:my-0"><span>VS</span></div>
            <TeamCard name="TEAM B" players={teams.teamB} captain={captainB} onSelect={setCaptainB} side="b" generation={generation} />
          </div>

          {teams.substitutes.length > 0 && <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/90 p-5 sm:p-6"><div className="flex items-center gap-2"><span className="text-xl" aria-hidden="true">🔁</span><h3 className="text-lg font-black text-amber-950">Substitutes <span className="text-sm font-bold text-amber-800">({teams.substitutes.length})</span></h3></div><p className="mt-1 text-xs text-amber-900/70">Extra players from your list, not assigned to either starting team.</p><div className="mt-3 flex flex-wrap gap-2">{teams.substitutes.map((player, index) => <span key={`${player}-${generation}`} className="sub-chip rounded-full border border-amber-200 bg-white px-3 py-1.5 text-sm font-bold text-amber-950" style={{ animationDelay: `${index * 45}ms` }}>{player}</span>)}</div></section>}

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={() => generate()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800"><RotateCw className="h-4 w-4" /> Generate Again</button><button onClick={changeCaptains} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-extrabold text-emerald-900 hover:bg-emerald-50"><ArrowDownUp className="h-4 w-4" /> Change Captain</button><button onClick={startNew} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50"><X className="h-4 w-4" /> Start New</button></div>
        </section>}

        <p className="mt-8 text-center text-xs font-medium text-slate-500">Your names and teams stay only in this page&apos;s temporary state. Refreshing clears everything.</p>
      </div>
    </main>
  );
}

function TeamCard({ name, players, captain, onSelect, side, generation }: { name: string; players: string[]; captain: string | null; onSelect: (name: string | null) => void; side: "a" | "b"; generation: number }) {
  const playerCountClass = side === "a" ? "text-emerald-700" : "text-sky-700";
  const selectedClass = side === "a" ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/15" : "border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-600/15";
  const badgeClass = side === "a" ? "bg-emerald-700" : "bg-sky-700";
  return <article key={`${name}-${generation}`} className={`team-card team-card-${side} rounded-3xl border bg-white p-5 shadow-lg sm:p-7`}>
    <div className="flex items-center justify-between gap-3"><div><p className={`text-[10px] font-black uppercase tracking-[.2em] ${playerCountClass}`}>{players.length} {players.length === 1 ? "player" : "players"}</p><h3 className="mt-1 text-2xl font-black text-slate-950">{name}</h3></div><span className={`grid h-11 w-11 place-items-center rounded-2xl ${side === "a" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"}`}><Users className="h-5 w-5" /></span></div>
    <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{captain ? <><span className="mr-1">👑</span> Captain: <strong className="text-slate-900">{captain}</strong></> : "Tap one player below to select captain"}</p>
    <div className="mt-4 grid gap-2">{players.map((player, index) => {
      const isCaptain = player === captain;
      return <button key={`${player}-${generation}`} onClick={() => onSelect(isCaptain ? null : player)} aria-pressed={isCaptain} className={`player-card flex min-h-11 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition hover:-translate-y-0.5 ${isCaptain ? selectedClass : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`} style={{ animationDelay: `${index * 45}ms` }}><span className="flex min-w-0 items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-black text-slate-500">{index + 1}</span><span className="truncate">{player}</span></span>{isCaptain ? <span className={`inline-flex items-center gap-1 rounded-full ${badgeClass} px-2 py-1 text-[10px] font-black uppercase text-white`}><Check className="h-3 w-3" /> C</span> : <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Set C</span>}</button>;
    })}</div>
  </article>;
}
