"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Pencil, Plus, Search, Trash2, Users, X } from "lucide-react";

type Team = { id: string; name: string; captain: string; players: string[] };
type Draft = { name: string; captain: string; players: string[] };

const STORAGE_KEY = "fulltimepass-cricket-teams-v1";
const PLAYERS = [
  "Aarav Sharma", "Aditi Rao", "Aditya Verma", "Akhil Menon", "Anaya Patel", "Arjun Mehta",
  "Dev Malhotra", "Diya Nair", "Farhan Khan", "Ishaan Kapoor", "Kabir Singh", "Kavya Iyer",
  "Kunal Joshi", "Meera Shah", "Mihir Das", "Neha Reddy", "Nikhil Gupta", "Pooja Kulkarni",
  "Rahul Desai", "Riya Chawla", "Rohan Bhat", "Sana Qureshi", "Vikram Yadav", "Zoya Fernandes",
  "Yash Thakur", "Tara Bose", "Manav Sethi", "Simran Gill", "Om Prakash", "Rehan Ali",
];

const emptyDraft = (): Draft => ({ name: "", captain: "", players: [] });

export default function CreateTeamPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setTeams(parsed as Team[]);
      }
    } catch {
      // Ignore an invalid local save and let the user start a fresh team list.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  }, [loaded, teams]);

  const filteredPlayers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return PLAYERS.filter((player) => player.toLocaleLowerCase().includes(query));
  }, [search]);

  const openNewTeam = () => {
    setDraft(emptyDraft());
    setEditingId(null);
    setError("");
    setFormOpen(true);
    document.getElementById("team-builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const togglePlayer = (player: string) => {
    setError("");
    if (!draft.players.includes(player) && draft.players.length >= 11) {
      setError("Your team already has 11 players. Remove one to make room.");
      return;
    }
    setDraft((current) => {
      if (current.players.includes(player)) {
        return { ...current, players: current.players.filter((name) => name !== player), captain: current.captain === player ? "" : current.captain };
      }
      return { ...current, players: [...current.players, player] };
    });
  };

  const saveTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.name.trim()) return setError("Add a team name before saving.");
    if (draft.players.length === 0) return setError("Pick at least one player for your team.");
    if (!draft.captain || !draft.players.includes(draft.captain)) return setError("Choose a captain from your selected players.");

    if (editingId) {
      setTeams((current) => current.map((team) => team.id === editingId ? { ...team, name: draft.name.trim(), captain: draft.captain, players: draft.players } : team));
    } else {
      setTeams((current) => [...current, { id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`, name: draft.name.trim(), captain: draft.captain, players: draft.players }]);
    }
    setFormOpen(false);
    setEditingId(null);
    setDraft(emptyDraft());
    setError("");
  };

  const editTeam = (team: Team) => {
    setDraft({ name: team.name, captain: team.captain, players: [...team.players] });
    setEditingId(team.id);
    setError("");
    setFormOpen(true);
    document.getElementById("team-builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEdit = () => {
    setFormOpen(false);
    setEditingId(null);
    setDraft(emptyDraft());
    setError("");
  };

  const deleteTeam = (id: string) => {
    setTeams((current) => current.filter((team) => team.id !== id));
    if (expandedId === id) setExpandedId(null);
    if (editingId === id) cancelEdit();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-bold text-emerald-800 hover:text-emerald-950">← FullTimePass home</Link>
        <header className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.22em] text-emerald-700">Your cricket dugout</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Create your team <span aria-hidden="true">🏏</span></h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">Pick up to 11 players, name your captain, and save your squad on this device.</p>
          </div>
          <button onClick={openNewTeam} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800"><Plus className="h-4 w-4" /> Create Team</button>
        </header>

        {formOpen && <form id="team-builder" onSubmit={saveTeam} className="mt-8 scroll-mt-6 rounded-3xl border border-emerald-100 bg-white p-5 shadow-lg sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">{editingId ? "Edit squad" : "New squad"}</p><h2 className="mt-1 text-2xl font-black text-slate-900">{editingId ? "Update your team" : "Build your team"}</h2></div>
            <button type="button" onClick={cancelEdit} aria-label="Close team form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"><X className="h-5 w-5" /></button>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Team name</span><input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} maxLength={40} placeholder="e.g. Sunday Strikers" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" /></label>
            <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Captain <span className="font-medium text-slate-400">(from selected players)</span></span><select value={draft.captain} onChange={(event) => setDraft((current) => ({ ...current, captain: event.target.value }))} disabled={!draft.players.length} className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:bg-white disabled:cursor-not-allowed disabled:text-slate-400"><option value="">{draft.players.length ? "Choose a captain" : "Select players first"}</option>{draft.players.map((player) => <option key={player} value={player}>{player}</option>)}</select></label>
          </div>

          <section className="mt-7" aria-labelledby="find-players-title">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div><h3 id="find-players-title" className="text-lg font-extrabold text-slate-900">Find players</h3><p className="mt-1 text-xs text-slate-500">Tap a player to add or remove them from your team.</p></div>
              <div className="relative w-full sm:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search player name" aria-label="Search players by name" className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:bg-white" /></div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900"><Users className="h-4 w-4" /><span>{draft.players.length}/11 selected</span><span className="text-emerald-800/55">·</span><span>{11 - draft.players.length} slots left</span>{draft.captain && <span className="ml-auto text-xs font-extrabold">👑 {draft.captain}</span>}</div>
            <div className="mt-3 grid max-h-72 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlayers.map((player) => {
                const selected = draft.players.includes(player);
                return <button type="button" key={player} aria-pressed={selected} onClick={() => togglePlayer(player)} className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition ${selected ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600/20" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50"}`}><span>{player}{player === draft.captain && <span className="ml-2 text-xs">👑 Captain</span>}</span><span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${selected ? "bg-emerald-700 text-white" : "border border-slate-300 text-transparent"}`}>{selected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3 w-3 text-slate-400" />}</span></button>;
              })}
              {!filteredPlayers.length && <p className="col-span-full rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No players found. Try another name.</p>}
            </div>
          </section>
          {error && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={cancelEdit} className="min-h-11 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" className="min-h-11 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-800">{editingId ? "Save Changes" : "Save Team"}</button></div>
        </form>}

        <section className="mt-10" aria-labelledby="saved-teams-title">
          <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-slate-500">Saved on this device</p><h2 id="saved-teams-title" className="mt-1 text-2xl font-black text-slate-900">Your teams <span className="text-emerald-700">({teams.length})</span></h2></div></div>
          {!teams.length ? <div className="mt-4 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-5 py-12 text-center"><div className="text-4xl" aria-hidden="true">🏏</div><p className="mt-3 font-extrabold text-slate-800">No teams saved yet</p><p className="mt-1 text-sm text-slate-500">Create a team and your squad will show up here.</p><button onClick={openNewTeam} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-800"><Plus className="h-4 w-4" /> Create Team</button></div> : <div className="mt-4 grid gap-4 md:grid-cols-2">{teams.map((team) => {
            const expanded = expandedId === team.id;
            return <article key={team.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-lg font-black text-slate-900">{team.name}</h3><p className="mt-1 text-sm text-slate-600"><span className="font-bold text-slate-800">Captain:</span> {team.captain}</p><p className="mt-1 text-xs font-semibold text-slate-500">{team.players.length} {team.players.length === 1 ? "player" : "players"}</p></div><span className="text-2xl" aria-hidden="true">🏏</span></div>
              {expanded && <div className="mt-4 border-t border-slate-100 pt-4"><p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">Squad list</p><div className="flex flex-wrap gap-2">{team.players.map((player) => <span key={player} className={`rounded-full px-3 py-1.5 text-xs font-bold ${player === team.captain ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"}`}>{player}{player === team.captain ? " · Captain" : ""}</span>)}</div></div>}
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4"><button onClick={() => setExpandedId(expanded ? null : team.id)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-200">{expanded ? "Hide players" : "View players"}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} /></button><button onClick={() => editTeam(team)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-800 hover:bg-emerald-100"><Pencil className="h-3.5 w-3.5" /> Edit</button><button onClick={() => deleteTeam(team.id)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs font-extrabold text-rose-700 hover:bg-rose-100"><Trash2 className="h-3.5 w-3.5" /> Delete</button></div>
            </article>;
          })}</div>}
        </section>
        <p className="mt-8 text-center text-xs text-slate-400">Your saved teams stay in this browser on this device.</p>
      </div>
    </main>
  );
}
