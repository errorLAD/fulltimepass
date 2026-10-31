"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, RotateCcw, X } from "lucide-react";
import confetti from "canvas-confetti";

type Face = "HEADS" | "TAILS";

const winningLines = [
  "Bhai toss jeet gaya, ab match bhi jeet ke dikha! 😂",
  "Kismat chamak gayi! Ab batting kar ya bowling? 🏏",
  "Captain sahab, decision soch samajh ke lena! 😎",
  "Toss toh jeet liya, ab trophy bhi le aa! 🏆",
  "Wah bhai! Coin reading master! 🧠",
  "Future dekh raha hai kya? 🔮",
];
const losingLines = [
  "Oye hoye! Kismat ne dhoka de diya! 😂",
  "Toss gaya haath se, ab match mein comeback dikha! 🔥",
  "Coin bhi aaj opponent ki side hai! 💀",
  "Bhai prediction mein toh zero marks! 😂",
  "Coin ne teri planning fail kar di! 🤡",
];

function pickFreshCommentary(won: boolean, previous: string | null) {
  const options = won ? winningLines : losingLines;
  const fresh = options.filter((line) => line !== previous);
  return fresh[Math.floor(Math.random() * fresh.length)];
}

function randomFace(): Face {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return value[0] % 2 === 0 ? "HEADS" : "TAILS";
}

export default function CricketTossPage() {
  const [prediction, setPrediction] = useState<Face>("HEADS");
  const [result, setResult] = useState<Face | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [choice, setChoice] = useState<"BAT" | "BOWL" | null>(null);
  const [sound, setSound] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [comment, setComment] = useState("The captains are in the middle. Make your call, skipper.");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCommentary = useRef<string | null>(null);
  const won = result !== null && result === prediction;
  const winningTeam = won ? "Team A" : "Team B";

  const toss = () => {
    if (flipping) return;
    const face = randomFace();
    setFlipping(true);
    setResult(null);
    setChoice(null);
    setComment("Up she goes... the whole stadium is holding its breath!");
    setShowCelebration(false);
    // Match the physical final face even when the previous toss ended on TAILS.
    const currentIsTails = Math.abs(Math.round(rotation / 180) % 2) === 1;
    const needsHalfTurn = currentIsTails !== (face === "TAILS");
    setRotation((current) => current + 360 * 7 + (needsHalfTurn ? 180 : 0));
    if (sound) {
      const audio = new Audio("/sounds/drumroll.wav");
      audio.volume = 0.45;
      void audio.play().catch(() => {});
    }
    timer.current = setTimeout(() => {
      const userWon = face === prediction;
      const punchline = pickFreshCommentary(userWon, lastCommentary.current);
      lastCommentary.current = punchline;
      setResult(face);
      setFlipping(false);
      setShowCelebration(true);
      void confetti({ particleCount: 150, spread: 95, startVelocity: 42, origin: { y: 0.62 }, colors: ["#fbbf24", "#34d399", "#ffffff", "#fb7185"] });
      setTimeout(() => void confetti({ particleCount: 65, angle: 60, spread: 55, origin: { x: 0 } }), 180);
      setTimeout(() => void confetti({ particleCount: 65, angle: 120, spread: 55, origin: { x: 1 } }), 180);
      setComment(punchline);
      if (sound) {
        const impact = new Audio("/sounds/whoosh.wav");
        impact.volume = 0.45;
        void impact.play().catch(() => {});
        const reaction = new Audio(userWon ? "/sounds/cheer.wav" : "/sounds/fail.wav");
        reaction.volume = 0.55;
        void reaction.play().catch(() => {});
      }
    }, 2900);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setFlipping(false);
    setResult(null);
    setShowCelebration(false);
    setChoice(null);
    setComment("The captains are in the middle. Make your call, skipper.");
    setRotation(0);
  };

  return (
    <main className="toss-page min-h-screen px-4 py-10 sm:py-14">
      <div className="toss-lights" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-emerald-100/70 hover:text-white">← FullTimePass dugout</Link>
        <header className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-white/5 px-4 py-2 text-xs font-extrabold uppercase tracking-[.22em] text-amber-200"><span className="animate-pulse">●</span> LIVE FROM THE MIDDLE</div>
          <h1 className="mt-5 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">The Big <span className="text-amber-300">Toss</span></h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-emerald-50/70 sm:text-base">One coin. Two captains. A suspiciously important decision about who gets first use of the pitch.</p>
        </header>

        <section className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 text-center shadow-2xl backdrop-blur sm:p-9">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-emerald-100/65">Step 1 · Pick your call</p>
          <div className="mx-auto mt-3 flex max-w-sm gap-3">
            {(["HEADS", "TAILS"] as Face[]).map((face) => <button key={face} disabled={flipping || !!result} onClick={() => setPrediction(face)} aria-pressed={prediction === face} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-black tracking-wider transition ${prediction === face ? "border-amber-300 bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"}`}>{face} 🪙</button>)}
          </div>

          <div className="flex min-h-[250px] flex-col items-center justify-center">
            <div className="coin-stage" aria-label={result ? `Coin landed on ${result}` : "Cricket toss coin"}>
              <div className={`coin ${flipping ? "coin-flipping" : ""}`} style={{ transform: `rotateX(${rotation}deg)` }}>
                <div className="coin-face coin-front"><span className="coin-star">✦</span><strong>HEADS</strong><small>TEAM A • 01</small></div>
                <div className="coin-face coin-back"><span className="coin-star">🏏</span><strong>TAILS</strong><small>TEAM B • 02</small></div>
              </div>
            </div>
            <p className="mt-6 h-5 text-center text-[10px] font-bold uppercase tracking-[.25em] text-amber-100/60">{flipping ? "Coin in flight • eyes on the call" : result ? "The call is final" : "Make your call, captain"}</p>
          </div>

          <div>
            {!result && <><p className="mb-3 text-xs font-extrabold uppercase tracking-[.2em] text-emerald-100/65">Step 2 · Flip the coin</p><button onClick={toss} disabled={flipping} className="w-full rounded-2xl bg-gradient-to-r from-amber-300 to-orange-400 px-8 py-4 text-sm font-black uppercase tracking-[.1em] text-slate-950 shadow-xl shadow-amber-900/30 transition hover:scale-[1.02] hover:shadow-amber-500/20 disabled:cursor-wait disabled:opacity-80">{flipping ? "COIN IN THE AIR…" : "TOSS THE COIN 🏏"}</button><button onClick={() => setSound(!sound)} aria-pressed={sound} className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/45 hover:text-white/75">{sound ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}{sound ? "Stadium sounds on" : "Sound off · tap to enable"}</button></>}
            {result && <div className="animate-[pop-in_.45s_ease-out]">
              <p className="text-xs font-extrabold uppercase tracking-[.3em] text-amber-200">The umpire calls</p>
              <h2 className="mt-1 text-4xl font-black text-white sm:text-5xl">IT&apos;S {result}!</h2>
              <p className={`mt-2 text-sm font-extrabold ${won ? "text-emerald-300" : "text-rose-300"}`}>{won ? "You called it! Absolute toss wizardry. 🎉" : "Wrong call! The coin has no respect for confidence. 😅"}</p>
              <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-emerald-50/80">🎙️ {comment}</div>
              <div className="mt-5">
                <p className="mb-3 text-sm font-bold text-white">{winningTeam} won the toss! Choose BAT or BOWL.</p>
                <div className="flex justify-center gap-3">{(["BAT", "BOWL"] as const).map((action) => <button key={action} onClick={() => { setChoice(action); setComment(action === "BAT" ? `${winningTeam} will bat first! The openers are padding up.` : `${winningTeam} will bowl first! The quicks are warming up.`); }} className={`rounded-xl px-7 py-3 text-sm font-black ${choice === action ? "bg-emerald-300 text-slate-950" : "border border-emerald-200/30 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/20"}`}>{action} 🏏</button>)}</div>
                {choice && <p className="mt-3 text-sm font-extrabold text-amber-200">{winningTeam} chose to {choice} first!</p>}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-black text-white hover:bg-white/10"><RotateCcw className="h-4 w-4" /> TOSS AGAIN</button><button onClick={() => setSound(!sound)} aria-pressed={sound} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold text-white/70 hover:bg-white/10">{sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}{sound ? "SOUND ON" : "SOUND OFF"}</button></div>
            </div>}
          </div>
        </section>
        <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-amber-100/10 bg-emerald-950/60 px-5 py-4 text-center text-sm text-emerald-50/75"><span className="mr-2 text-amber-300">🎙️</span>{comment}</div>
      </div>
      {showCelebration && result && <div className="comic-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 py-5 backdrop-blur-sm" onClick={() => setShowCelebration(false)}>
        <section role="dialog" aria-modal="true" aria-labelledby="toss-winner-title" onClick={(event) => event.stopPropagation()} className="comic-popup relative w-full max-w-lg animate-[comic-pop_.72s_cubic-bezier(.16,1.3,.35,1)] rounded-[2rem] border-4 border-slate-950 p-6 text-center shadow-2xl sm:p-9">
          <button aria-label="Close result popup" onClick={() => setShowCelebration(false)} className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border-2 border-slate-950 bg-white text-slate-900 shadow-md transition hover:rotate-90"><X className="h-5 w-5" /></button>
          <span className="comic-float comic-float-one" aria-hidden="true">🏏</span><span className="comic-float comic-float-two" aria-hidden="true">⭐</span><span className="comic-float comic-float-three" aria-hidden="true">🏏</span>
          <div className="comic-burst" aria-hidden="true">💥</div>
          <p className="comic-boom relative z-10">BOOM!</p>
          <p className="relative z-10 mt-1 text-[11px] font-black uppercase tracking-[.25em] text-slate-800/70">The umpire has spoken</p>
          <h2 id="toss-winner-title" className="relative z-10 mt-1 text-3xl font-black uppercase leading-none text-slate-950 sm:text-5xl">IT&apos;S {result}!</h2>
          <div className="comic-speech relative z-10 mx-auto mt-5 max-w-sm rounded-2xl border-[3px] border-slate-950 bg-white px-4 py-3 text-sm font-extrabold leading-snug text-slate-900 shadow-[4px_5px_0_#0f172a] sm:text-base">{comment}<span className="comic-tail" aria-hidden="true" /></div>
          <p className={`relative z-10 mt-4 text-sm font-black uppercase tracking-wide ${won ? "text-emerald-950" : "text-rose-950"}`}>{winningTeam} won the toss! {won ? "🎉" : "😅"}</p>
          <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2">
            <button autoFocus onClick={() => setShowCelebration(false)} className="rounded-xl border-[3px] border-slate-950 bg-emerald-300 px-4 py-3.5 text-sm font-black uppercase tracking-wide text-slate-950 shadow-[4px_5px_0_#0f172a] transition hover:translate-y-[-2px] hover:shadow-[4px_7px_0_#0f172a]">Continue 🏏</button>
            <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-slate-950 bg-amber-300 px-4 py-3.5 text-sm font-black uppercase tracking-wide text-slate-950 shadow-[4px_5px_0_#0f172a] transition hover:translate-y-[-2px] hover:shadow-[4px_7px_0_#0f172a]"><RotateCcw className="h-4 w-4" /> Toss Again</button>
          </div>
          <p className="relative z-10 mt-4 text-[10px] font-black uppercase tracking-wider text-slate-800/60">{sound ? "🔊 Comic sounds on" : "🔇 Sounds off"} · tap outside to close</p>
        </section>
      </div>}
    </main>
  );
}
