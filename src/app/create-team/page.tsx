"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownUp, Check, RotateCw, Search, Shuffle, Users, X } from "lucide-react";
import { CRICKET_COUNTRIES, CRICKET_PLAYERS, CricketPlayer } from "@/lib/data/cricketPlayers";

type Player = { name: string; country: string; source: "directory" | "manual" };
type Teams = { teamA: Player[]; teamB: Player[]; substitutes: Player[] };
type GroupFilter = "All players" | "Indian players" | "International players";

const RESULT_LINES = [
  "Legends assemble! 🏏",
  "Dhoni vs Kohli? Captaincy battle! 😂",
  "Your dream team is ready!",
  "Ab dekhte hain asli champion kaun hai!",
];

function uniqueNames(value: string) {
  const seen = new Set<string>();
  return value.split(/\r?\n/).map((name) => name.trim()).filter((name) => {
    const key = name.toLocaleLowerCase();
    if (!name || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function combinedRoster(directory: CricketPlayer[], manualText: string): Player[] {
  const seen = new Set<string>();
  const result: Player[] = [];
  for (const player of directory) {
    const key = player.name.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ name: player.name, country: player.country, source: "directory" });
  }
  for (const name of uniqueNames(manualText)) {
    const key = name.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ name, country: "Manual entry", source: "manual" });
  }
  return result;
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
  const [manualText, setManualText] = useState("");
  const [selectedDirectory, setSelectedDirectory] = useState<CricketPlayer[]>([]);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("All players");
  const [countryFilter, setCountryFilter] = useState("All countries");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [genderFilter, setGenderFilter] = useState("All genders");
  const [teams, setTeams] = useState<Teams | null>(null);
  const [captainA, setCaptainA] = useState<string | null>(null);
  const [captainB, setCaptainB] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState(RESULT_LINES[0]);
  const [error, setError] = useState("");
  const [generation, setGeneration] = useState(0);
  const previousOrder = useRef<string[]>([]);
  const previousMessage = useRef<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const roster = useMemo(() => combinedRoster(selectedDirectory, manualText), [selectedDirectory, manualText]);
  const filteredPlayers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return CRICKET_PLAYERS.filter((player) => {
      const matchesName = !query || player.name.toLocaleLowerCase().includes(query);
      const matchesGroup = groupFilter === "All players" || (groupFilter === "Indian players" ? player.group === "Indian" : player.group === "International");
      const matchesCountry = countryFilter === "All countries" || player.country === countryFilter;
      const matchesStatus = statusFilter === "All statuses" || player.status === statusFilter;
      const matchesGender = genderFilter === "All genders" || player.gender === genderFilter;
      return matchesName && matchesGroup && matchesCountry && matchesStatus && matchesGender;
    });
  }, [search, groupFilter, countryFilter, statusFilter, genderFilter]);
  const hasDirectoryQuery = search.trim().length > 0 || groupFilter !== "All players" || countryFilter !== "All countries" || statusFilter !== "All statuses" || genderFilter !== "All genders";

  const invalidateTeams = () => {
    setTeams(null);
    setCaptainA(null);
    setCaptainB(null);
    setShowResult(false);
    setError("");
    previousOrder.current = [];
  };

  const addDirectoryPlayer = (player: CricketPlayer) => {
    if (roster.some((item) => item.name.toLocaleLowerCase() === player.name.toLocaleLowerCase())) return;
    invalidateTeams();
    setSelectedDirectory((current) => [...current, player]);
  };

  const removePlayer = (name: string) => {
    invalidateTeams();
    const key = name.toLocaleLowerCase();
    setSelectedDirectory((current) => current.filter((player) => player.name.toLocaleLowerCase() !== key));
    setManualText((current) => current.split(/\r?\n/).filter((line) => line.trim().toLocaleLowerCase() !== key).join("\n"));
  };

  const freshResultLine = () => {
    const options = RESULT_LINES.filter((line) => line !== previousMessage.current);
    const line = options[secureRandomInt(options.length)];
    previousMessage.current = line;
    return line;
  };

  const generate = () => {
    if (roster.length < 4) {
      setError(`Choose or enter at least 4 unique players. You currently have ${roster.length}.`);
      return;
    }
    setError("");
    const selectedKeys = new Set(selectedDirectory.map((player) => player.name.toLocaleLowerCase()));
    setManualText(uniqueNames(manualText).filter((name) => !selectedKeys.has(name.toLocaleLowerCase())).join("\n"));

    let order = shuffled(roster);
    let attempts = 0;
    while (order.slice(0, 18).map((player) => player.name).join("\u0000") === previousOrder.current.join("\u0000") && attempts < 8) {
      order = shuffled(roster);
      attempts++;
    }
    if (order.slice(0, 18).map((player) => player.name).join("\u0000") === previousOrder.current.join("\u0000")) {
      [order[0], order[1]] = [order[1], order[0]];
    }
    const selectedPlayers = order.slice(0, 18);
    const splitAt = Math.ceil(selectedPlayers.length / 2);
    previousOrder.current = selectedPlayers.map((player) => player.name);
    setTeams({ teamA: selectedPlayers.slice(0, splitAt), teamB: selectedPlayers.slice(splitAt), substitutes: order.slice(18) });
    setCaptainA(null);
    setCaptainB(null);
    setShowResult(false);
    setGeneration((current) => current + 1);
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const chooseCaptain = (side: "a" | "b", name: string) => {
    const nextA = side === "a" ? name : captainA;
    const nextB = side === "b" ? name : captainB;
    setCaptainA(nextA);
    setCaptainB(nextB);
    if (nextA && nextB) {
      setResultMessage(freshResultLine());
      setShowResult(true);
    }
  };

  const changeCaptains = () => {
    setCaptainA(null);
    setCaptainB(null);
    setShowResult(false);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startNew = () => {
    setManualText("");
    setSelectedDirectory([]);
    setSearch("");
    setGroupFilter("All players");
    setCountryFilter("All countries");
    setStatusFilter("All statuses");
    setGenderFilter("All genders");
    setTeams(null);
    setCaptainA(null);
    setCaptainB(null);
    setShowResult(false);
    setError("");
    setGeneration(0);
    previousOrder.current = [];
    previousMessage.current = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="team-generator min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-900 hover:text-emerald-700">← FullTimePass home</Link>
        <header className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[.2em] text-emerald-800"><Users className="h-4 w-4" /> Squad selector</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Random Cricket <span className="text-emerald-700">Team Generator</span> 🏏</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">Find legends in the directory or add your own players, then deal out two balanced teams of up to nine.</p>
        </header>

        <section className="mx-auto mt-9 max-w-5xl rounded-3xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-emerald-700">Step 1</p><h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">Find & select cricket players</h2></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">Search directory or enter your own</span></div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]">
            <label className="relative block"><span className="sr-only">Search cricket players</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search cricket players..." aria-label="Search cricket players" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 focus:bg-white" /></label>
            <select aria-label="Filter player group" value={groupFilter} onChange={(event) => setGroupFilter(event.target.value as GroupFilter)} className="min-h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"><option>All players</option><option>Indian players</option><option>International players</option></select>
            <select aria-label="Filter country" value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} className="min-h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"><option>All countries</option>{CRICKET_COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select>
            <select aria-label="Filter player status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"><option>All statuses</option><option>Active</option><option>Retired</option></select>
            <select aria-label="Filter player gender" value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)} className="min-h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"><option>All genders</option><option>Male</option><option>Female</option></select>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-extrabold text-slate-800">Player directory</h3><p className="text-xs font-medium text-slate-500">Suggestions are added only when you click <strong>Add Player</strong>.</p></div>
          <div className="mt-2 grid max-h-80 gap-2 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/70 p-2 sm:grid-cols-2 lg:grid-cols-3">
            {!hasDirectoryQuery && <p className="col-span-full px-3 py-8 text-center text-sm font-medium text-slate-500">Search a cricketer&apos;s name or choose a filter to browse directory suggestions. These names are not selected automatically.</p>}
            {hasDirectoryQuery && filteredPlayers.map((player) => {
              const isInRoster = roster.some((picked) => picked.name.toLocaleLowerCase() === player.name.toLocaleLowerCase());
              return <div key={player.name} className={`flex min-h-[68px] items-center justify-between gap-2 rounded-xl border p-3 transition ${isInRoster ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                <span className="min-w-0"><span className="block truncate text-sm font-extrabold text-slate-900">{player.name}</span><span className="mt-0.5 block truncate text-[11px] font-semibold text-slate-500">{player.country} · {player.status} · {player.gender}</span></span>
                <button type="button" disabled={isInRoster} onClick={() => addDirectoryPlayer(player)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-extrabold ${isInRoster ? "cursor-default bg-emerald-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-900"}`}>{isInRoster ? <span className="inline-flex items-center gap-1"><Check className="h-3 w-3" /> Added</span> : "Add Player"}</button>
              </div>;
            })}
            {hasDirectoryQuery && !filteredPlayers.length && <p className="col-span-full px-3 py-8 text-center text-sm font-medium text-slate-500">No matching directory players. You can still enter {search.trim() ? `“${search.trim()}”` : "a name"} manually below.</p>}
          </div>

          {roster.length > 0 && <section className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/65 p-4" aria-label="Selected players"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-extrabold text-emerald-950">Selected players <span className="ml-1 rounded-full bg-white px-2 py-0.5 text-xs">{roster.length}</span></h3><span className="text-xs font-semibold text-emerald-800">Remove any player with ×</span></div><div className="mt-3 flex flex-wrap gap-2">{roster.map((player) => <span key={`${player.source}-${player.name}`} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-200 bg-white py-1 pl-3 pr-1 text-xs font-bold text-slate-800"><span className="truncate">{player.name}</span><span className="text-[10px] font-semibold text-slate-400">{player.country}</span><button type="button" onClick={() => removePlayer(player.name)} aria-label={`Remove ${player.name}`} className="ml-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-rose-100 hover:text-rose-700"><X className="h-3.5 w-3.5" /></button></span>)}</div></section>}

          <section className="mt-6 border-t border-slate-100 pt-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><h3 className="text-base font-extrabold text-slate-900">Enter players manually</h3><p className="mt-1 text-xs text-slate-500">Type names like Mohan, one per line. Only these names are used unless you separately press Add Player above.</p></div><span className="text-xs font-bold text-slate-600">Roster total: {roster.length}</span></div><textarea value={manualText} onChange={(event) => { setManualText(event.target.value); invalidateTeams(); }} placeholder={"Mohan\nOne player per line"} rows={5} aria-label="Enter player names manually, one per line" className="mt-3 min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium leading-6 text-slate-900 outline-none focus:border-emerald-600 focus:bg-white" /></section>

          {error && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className={`text-sm font-extrabold ${roster.length >= 4 ? "text-emerald-800" : "text-slate-600"}`}>{roster.length}/4 players minimum {roster.length >= 4 ? "· Ready to generate" : `· ${4 - roster.length} more needed`}<span className="mt-1 block text-xs font-medium text-slate-500">Balanced teams · up to 9 players per side</span></p><button onClick={generate} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-700 to-green-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-green-700 active:translate-y-0 sm:w-auto sm:text-base"><Shuffle className="h-5 w-5" /> Generate Random Teams 🏏</button></div>
          <p className="mt-3 text-[11px] text-slate-400">Starter directory only; active/retired tags are editable labels, not a live roster. No account or saving—refreshing clears your picks.</p>
        </section>

        {teams && <section ref={resultsRef} className="scroll-mt-6 pb-12 pt-10" aria-live="polite">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row"><div className="text-center sm:text-left"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-emerald-700">Step 2 · Pick both captains</p><h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Legends assemble! 🏏</h2><p className="mt-1 text-sm text-slate-600">Tap one player from each side. Captains are never assigned automatically.</p></div><span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold text-slate-600">Shuffle #{generation}</span></div>
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]"><TeamCard name="TEAM A" players={teams.teamA} captain={captainA} onSelect={(name) => chooseCaptain("a", name)} side="a" generation={generation} /><div className="vs-mark my-2 flex items-center justify-center self-center lg:my-0"><span>VS</span></div><TeamCard name="TEAM B" players={teams.teamB} captain={captainB} onSelect={(name) => chooseCaptain("b", name)} side="b" generation={generation} /></div>
          {teams.substitutes.length > 0 && <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/90 p-5 sm:p-6"><div className="flex items-center gap-2"><span className="text-xl" aria-hidden="true">🔁</span><h3 className="text-lg font-black text-amber-950">Substitutes <span className="text-sm font-bold text-amber-800">({teams.substitutes.length})</span></h3></div><p className="mt-1 text-xs text-amber-900/70">Extra players, not assigned to either starting team.</p><div className="mt-3 flex flex-wrap gap-2">{teams.substitutes.map((player, index) => <span key={`${player.name}-${generation}`} className="sub-chip rounded-full border border-amber-200 bg-white px-3 py-1.5 text-sm font-bold text-amber-950" style={{ animationDelay: `${index * 45}ms` }}>{player.name}</span>)}</div></section>}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={generate} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800"><RotateCw className="h-4 w-4" /> Generate Again</button><button onClick={changeCaptains} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-extrabold text-emerald-900 hover:bg-emerald-50"><ArrowDownUp className="h-4 w-4" /> Change Captain</button><button onClick={startNew} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50"><X className="h-4 w-4" /> Start New</button></div>
          {(!captainA || !captainB) && <p className="mt-4 text-center text-sm font-bold text-amber-800">Select both captains to reveal the completed result.</p>}
        </section>}
      </div>

      {showResult && teams && captainA && captainB && <div className="team-result-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-3 py-5 sm:px-6" onClick={() => setShowResult(false)}><section role="dialog" aria-modal="true" aria-labelledby="team-result-title" onClick={(event) => event.stopPropagation()} className="team-result-popup relative my-auto w-full max-w-5xl animate-[team-result-pop_.55s_cubic-bezier(.16,1.2,.35,1)] rounded-[2rem] border-2 border-emerald-200 bg-white p-5 shadow-2xl sm:p-8"><button onClick={() => setShowResult(false)} aria-label="Close team result" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"><X className="h-5 w-5" /></button><p className="text-center text-xs font-black uppercase tracking-[.25em] text-emerald-700">Final team reveal · Shuffle #{generation}</p><h2 id="team-result-title" className="mt-2 pr-8 text-center text-2xl font-black text-slate-950 sm:px-12 sm:text-4xl">{resultMessage}</h2><div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr]"><ResultTeam name="TEAM A" players={teams.teamA} captain={captainA} side="a" /><div className="team-result-vs flex items-center justify-center"><span>VS</span></div><ResultTeam name="TEAM B" players={teams.teamB} captain={captainB} side="b" /></div>{teams.substitutes.length > 0 && <p className="mt-4 text-center text-xs font-bold text-amber-800">Substitutes: {teams.substitutes.map((player) => player.name).join(", ")}</p>}<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={() => setShowResult(false)} className="min-h-12 rounded-xl bg-emerald-700 px-7 py-3 text-sm font-black uppercase text-white hover:bg-emerald-800">Looks good · Close</button><button onClick={() => { setShowResult(false); changeCaptains(); }} className="min-h-12 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-extrabold text-emerald-900 hover:bg-emerald-100">Change Captains</button></div></section></div>}
    </main>
  );
}

function TeamCard({ name, players, captain, onSelect, side, generation }: { name: string; players: Player[]; captain: string | null; onSelect: (name: string) => void; side: "a" | "b"; generation: number }) {
  const countClass = side === "a" ? "text-emerald-700" : "text-sky-700";
  const selectedClass = side === "a" ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/15" : "border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-600/15";
  const badgeClass = side === "a" ? "bg-emerald-700" : "bg-sky-700";
  return <article className={`team-card team-card-${side} rounded-3xl border bg-white p-5 shadow-lg sm:p-7`}>
    <div className="flex items-center justify-between gap-3"><div><p className={`text-[10px] font-black uppercase tracking-[.2em] ${countClass}`}>{players.length} {players.length === 1 ? "player" : "players"}</p><h3 className="mt-1 text-2xl font-black text-slate-950">{name}</h3></div><span className={`grid h-11 w-11 place-items-center rounded-2xl ${side === "a" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"}`}><Users className="h-5 w-5" /></span></div>
    <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{captain ? <><span className="mr-1">👑</span> Captain: <strong className="text-slate-900">{captain}</strong></> : "Tap one player below to select captain"}</p>
    <div className="mt-4 grid gap-2">{players.map((player, index) => { const isCaptain = player.name === captain; return <button key={`${player.name}-${generation}`} onClick={() => onSelect(player.name)} aria-pressed={isCaptain} className={`player-card flex min-h-11 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition hover:-translate-y-0.5 ${isCaptain ? selectedClass : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`} style={{ animationDelay: `${index * 45}ms` }}><span className="flex min-w-0 items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-black text-slate-500">{index + 1}</span><span className="min-w-0 truncate">{player.name}<small className="ml-2 font-medium text-slate-400">{player.country}</small></span></span>{isCaptain ? <span className={`inline-flex items-center gap-1 rounded-full ${badgeClass} px-2 py-1 text-[10px] font-black uppercase text-white`}><Check className="h-3 w-3" /> C</span> : <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Set C</span>}</button>; })}</div>
  </article>;
}

function ResultTeam({ name, players, captain, side }: { name: string; players: Player[]; captain: string; side: "a" | "b" }) {
  return <article className={`rounded-2xl border p-4 ${side === "a" ? "border-emerald-200 bg-emerald-50/70" : "border-sky-200 bg-sky-50/70"}`}><h3 className="text-center text-xl font-black text-slate-950">{name}</h3><p className="mt-2 text-center text-xs font-extrabold text-slate-700">👑 Captain: {captain}</p><ol className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">{players.map((player, index) => <li key={player.name} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-bold ${player.name === captain ? "bg-white text-slate-950 shadow-sm" : "text-slate-700"}`}><span className="w-4 text-slate-400">{index + 1}.</span><span className="min-w-0 flex-1 truncate">{player.name}</span>{player.name === captain && <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black text-white ${side === "a" ? "bg-emerald-700" : "bg-sky-700"}`}>C</span>}</li>)}</ol></article>;
}
