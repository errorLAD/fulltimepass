// Web Audio API & Web Speech API Sound Engine for Treat Roulette
// 100% lightweight, royalty-free synthesized audio with natural Indian comedic voice announcements!

import { Language } from "../language/types";
import { funnyVoiceEngine, FUNNY_VOICE_CONFIGS } from "./funnyVoiceEngine";

export interface AnnouncementResult {
  index: number;
  speechText: string;
  displayText: string;
}

export const ENGLISH_ANNOUNCEMENTS = [
  {
    intro: "Trapped! ... ... Tonight's official sponsor is ... {name}!",
    punchline: "Pull out your wallet, swallow your pride, and pay the bill!",
  },
  {
    intro: "By unanimous public demand, ... ... tonight's designated victim is ... {name}!",
    punchline: "Stop hiding your phone under the napkin, tap your card right now!",
  },
  {
    intro: "The jury has reached a verdict! ... Covering the entire tab tonight is ... {name}!",
    punchline: "No excuses accepted, running to the bathroom is strictly forbidden!",
  },
  {
    intro: "Breaking news! ... The official host for tonight's feast is ... {name}!",
    punchline: "Friendship is precious, but dinner isn't free! Scan the receipt!",
  },
  {
    intro: "Caught red-handed! ... Tonight's banquet is funded exclusively by ... {name}!",
    punchline: "Unlock your phone, open your payment app, and be generous!",
  },
  {
    intro: "Ladies and gentlemen, give it up! ... Tonight's treat is sponsored by ... {name}!",
    punchline: "Saying 'My payment app is glitching' will not save you!",
  },
  {
    intro: "Game over! ... ... Lady luck has trapped ... {name}!",
    punchline: "Put the card on the table and smile for the waiter!",
  },
  {
    intro: "The Wheel of Fortune has spoken! ... Tonight's lucky benefactor is ... {name}!",
    punchline: "Zero splitting allowed, this bill belongs 100% to you!",
  },
  {
    intro: "Attention restaurant staff! ... The VIP paying for our entire table is ... {name}!",
    punchline: "Settle the bill gracefully and save your dignity!",
  },
];

export const HINGLISH_ANNOUNCEMENTS = [
  {
    intro: "Fas gaya bhaiiii! ... ... Aaj ka gareeb hai ... {name}!",
    punchline: "UPI kholo, sharam chhodo, treat do!",
  },
  {
    intro: "Public demand par, ... ... aaj ka bakra hai ... {name}!",
    punchline: "Bhai phone mat chhupao, jaldi se bill payment karo!",
  },
  {
    intro: "Arey arey arey! ... Faisla ho gaya! ... Aaj ka poora bill bharega ... {name}!",
    punchline: "No bahana allowed, washroom bhaagna strictly mana hai!",
  },
  {
    intro: "Breaking news! ... Aaj ki treat ke shubh avsar par bali ka bakra bana hai ... {name}!",
    punchline: "Bhaichara apni jagah, par treat apni jagah! Scanner nikaalo bhai!",
  },
  {
    intro: "Pakda gaya kanjoos! ... ... Aaj ka official sponsor hai ... {name}!",
    punchline: "Bhai phone ka QR scanner on karo aur dil bada karo!",
  },
  {
    intro: "Dosto, taliyaan bajti rehni chahiye! ... ... Aaj treat dega apna pyara ... {name}!",
    punchline: "Koi 'Mera server down hai' ka jhooth nahi chalega!",
  },
  {
    intro: "Khatam, tata, bye-bye! ... ... Aaj kismat ne pakda hai ... {name} ko!",
    punchline: "Chupchap phone nikaalo aur Google Pay se scan karo!",
  },
  {
    intro: "Wheel of Fortune ne faisla suna diya! ... ... Aaj treat dene ka saubhagya mila hai ... {name} ko!",
    punchline: "Ek rupya bhi split nahi hoga, poora bill tera hai!",
  },
  {
    intro: "Fas gaya re bidu! ... ... Aaj ka hero aur bill ka zero hai ... {name}!",
    punchline: "Shanti se payment karo aur apni izzat bachao!",
  },
  {
    intro: "Alert! Alert! ... ... Aaj ki grand party official taur par chalegi ... {name} ke kharche par!",
    punchline: "Wallet kholo, sharam chhodo aur treat do!",
  },
];

class RouletteSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private activeTimeouts: (number | NodeJS.Timeout)[] = [];
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private lastPhraseIndex: number = -1;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("fulltimepass_roulette_sound");
      this.soundEnabled = stored !== "false";

      // Pre-warm speech synthesis voices if supported
      if ("speechSynthesis" in window) {
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
          };
        }
      }
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fulltimepass_roulette_sound", enabled ? "true" : "false");
    }
    if (!enabled) {
      this.stopAll();
    }
  }

  public toggleSound(): boolean {
    const next = !this.soundEnabled;
    this.setSoundEnabled(next);
    return next;
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Stop all playing oscillators, scheduled timers, and active speech
   */
  public stopAll(): void {
    this.activeTimeouts.forEach((t) => clearTimeout(t));
    this.activeTimeouts = [];

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Play a single mechanical peg tick / click
   */
  public playPegClick(frequency: number = 880, volume: number = 0.22): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(frequency * 1.4, now);
      filter.Q.setValueAtTime(3.5, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);

      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Start the complete spin sequence:
   * - 0s - 2.2s: Rapid decelerating clicks
   * - 2.2s - 3.8s: Suspense drumroll building up to the stop
   */
  public startSpinSequence(durationMs: number = 3800): void {
    this.stopAll();
    if (!this.soundEnabled) return;

    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    let currentDelay = 0;
    let stepMs = 45;
    const clickPhaseEnd = 2400;

    while (currentDelay < clickPhaseEnd) {
      const delay = currentDelay;
      const pitch = 700 + Math.random() * 350;
      const vol = 0.18 + Math.random() * 0.08;

      const timeout = setTimeout(() => {
        this.playPegClick(pitch, vol);
      }, delay);
      this.activeTimeouts.push(timeout);

      currentDelay += stepMs;
      if (currentDelay < 800) {
        stepMs = Math.min(stepMs + 3, 75);
      } else if (currentDelay < 1600) {
        stepMs = Math.min(stepMs + 10, 160);
      } else {
        stepMs = Math.min(stepMs + 22, 280);
      }
    }

    // Start Suspense Drumroll at 2.2s until 3.8s
    const drumrollTimeout = setTimeout(() => {
      this.playSuspenseDrumroll(1600);
    }, 2200);
    this.activeTimeouts.push(drumrollTimeout);
  }

  /**
   * Suspense snare / timpani drumroll building up to the wheel stop
   */
  public playSuspenseDrumroll(durationMs: number = 1600): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const durationSec = durationMs / 1000;

      const bufferSize = ctx.sampleRate * durationSec;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(800, now);
      noiseFilter.frequency.linearRampToValueAtTime(1400, now + durationSec);
      noiseFilter.Q.setValueAtTime(3.0, now);

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.04, now);
      mainGain.gain.linearRampToValueAtTime(0.24, now + durationSec - 0.08);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(mainGain);
      mainGain.connect(ctx.destination);

      const bassOsc = ctx.createOscillator();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(75, now);
      bassOsc.frequency.linearRampToValueAtTime(140, now + durationSec);

      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0.06, now);
      bassGain.gain.linearRampToValueAtTime(0.22, now + durationSec - 0.08);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + durationSec);
      bassOsc.start(now);
      bassOsc.stop(now + durationSec);

      this.activeNodes.push(whiteNoise, bassOsc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Dramatic Reveal Sting:
   * A short dramatic pause followed by a comedic punchy rimshot / brass chord
   */
  public playDramaticRevealSting(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Crash cymbal impact
      const bufferSize = ctx.sampleRate * 0.6;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const cymbal = ctx.createBufferSource();
      cymbal.buffer = noiseBuffer;

      const cymbalFilter = ctx.createBiquadFilter();
      cymbalFilter.type = "highpass";
      cymbalFilter.frequency.setValueAtTime(4000, now);

      const cymbalGain = ctx.createGain();
      cymbalGain.gain.setValueAtTime(0.26, now);
      cymbalGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      cymbal.connect(cymbalFilter);
      cymbalFilter.connect(cymbalGain);
      cymbalGain.connect(ctx.destination);

      cymbal.start(now);
      cymbal.stop(now + 0.6);

      // 2. Comedic fanfare chord
      const chords = [261.63, 329.63, 392.0, 523.25]; // C major
      chords.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
        this.activeNodes.push(osc);
      });

      // 3. Comedic cartoon spring boing
      const boingOsc = ctx.createOscillator();
      const boingGain = ctx.createGain();
      boingOsc.type = "sine";
      boingOsc.frequency.setValueAtTime(240, now + 0.25);
      boingOsc.frequency.exponentialRampToValueAtTime(640, now + 0.45);
      boingOsc.frequency.exponentialRampToValueAtTime(320, now + 0.65);

      boingGain.gain.setValueAtTime(0.18, now + 0.25);
      boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      boingOsc.connect(boingGain);
      boingGain.connect(ctx.destination);

      boingOsc.start(now + 0.25);
      boingOsc.stop(now + 0.68);
      this.activeNodes.push(boingOsc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Find the most natural Indian English or Hindi voice available in browser
   */
  /**
   * Find the most natural voice based on language
   */
  private getBestVoice(language: Language = "hi"): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (language === "en") {
      // 1. Natural English voices (US/GB/AU/CA)
      const naturalEn = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("en") &&
          !v.lang.toLowerCase().includes("in") &&
          (v.name.toLowerCase().includes("natural") ||
            v.name.toLowerCase().includes("online") ||
            v.name.toLowerCase().includes("google") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("daniel") ||
            v.name.toLowerCase().includes("karen"))
      );
      if (naturalEn) return naturalEn;

      // 2. Any general English voice
      const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
      if (anyEn) return anyEn;

      return voices.find((v) => v.default) || voices[0];
    }

    // Hinglish mode
    // 1. Natural / Online Hindi voice (e.g., Google हिन्दी, Microsoft Swara)
    const naturalHindi = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith("hi") &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("online") ||
          v.name.toLowerCase().includes("google"))
    );
    if (naturalHindi) return naturalHindi;

    // 2. Any Hindi voice
    const anyHindi = voices.find((v) => v.lang.toLowerCase().startsWith("hi"));
    if (anyHindi) return anyHindi;

    // 3. Natural / Online Indian English voice
    const naturalIndianEnglish = voices.find(
      (v) =>
        (v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en_in")) &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("online") ||
          v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("neerja") ||
          v.name.toLowerCase().includes("prabhat"))
    );
    if (naturalIndianEnglish) return naturalIndianEnglish;

    // 4. Any Indian English voice
    const anyIndianEnglish = voices.find(
      (v) =>
        v.lang.toLowerCase().includes("en-in") ||
        v.lang.toLowerCase().includes("en_in") ||
        v.name.toLowerCase().includes("india")
    );
    if (anyIndianEnglish) return anyIndianEnglish;

    // 5. Fallback to default
    return voices.find((v) => v.default) || voices[0];
  }

  /**
   * Strictly pick a NEW phrase index every single time so jokes NEVER repeat consecutively!
   */
  private getNextPhraseIndex(language: Language = "hi"): number {
    const list = language === "en" ? ENGLISH_ANNOUNCEMENTS : HINGLISH_ANNOUNCEMENTS;
    const total = list.length;
    if (this.lastPhraseIndex === -1) {
      this.lastPhraseIndex = Math.floor(Math.random() * total);
    } else {
      const step = 1 + Math.floor(Math.random() * (total - 1));
      this.lastPhraseIndex = (this.lastPhraseIndex + step) % total;
    }
    return this.lastPhraseIndex;
  }

  /**
   * Play the full reveal sequence:
   * 1. Dramatic Pause (~400ms)
   * 2. Comedic Sting / Rimshot (~500ms)
   * 3. Playful Comedy Voice Announcement in the selected language with exact winner name!
   * Returns the spoken text and clean display text to update UI state dynamically.
   */
  public playWinnerAnnouncement(winnerName: string, language: Language = "hi"): AnnouncementResult {
    // 1. Play dramatic sting right after the wheel stops
    if (this.soundEnabled) {
      this.playDramaticRevealSting();
    }

    // Pick guaranteed fresh announcement line every time
    const list = language === "en" ? ENGLISH_ANNOUNCEMENTS : HINGLISH_ANNOUNCEMENTS;
    const nextIdx = this.getNextPhraseIndex(language);
    const selected = list[nextIdx] || list[0];

    const speechText = `${selected.intro.replace(/{name}/g, winnerName)} ... ${selected.punchline}`;
    const cleanIntro = selected.intro.replace(/{name}/g, winnerName).replace(/\.\.\./g, "").trim();
    const displayText = `${cleanIntro} ${selected.punchline}`;

    if (this.soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText);
        const voice = this.getBestVoice(language);
        if (voice) {
          utterance.voice = voice;
        }

        const voiceId = funnyVoiceEngine.getSelectedVoiceStyle();
        const cfg = FUNNY_VOICE_CONFIGS[voiceId] || FUNNY_VOICE_CONFIGS["desi-bhai"];
        utterance.pitch = cfg.pitch;
        utterance.rate = cfg.rate;

        // Dramatic pause before speaking (550ms after wheel stop / sting start)
        const speechTimeout = setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 550);

        this.activeTimeouts.push(speechTimeout);
      } catch {
        // speech synthesis safely fails silently
      }
    }

    return {
      index: nextIdx,
      speechText,
      displayText,
    };
  }

  /**
   * Get the current active announcement for default/preview
   */
  public getInitialAnnouncement(winnerName: string, language: Language = "hi"): string {
    const list = language === "en" ? ENGLISH_ANNOUNCEMENTS : HINGLISH_ANNOUNCEMENTS;
    const idx = this.lastPhraseIndex >= 0 && this.lastPhraseIndex < list.length ? this.lastPhraseIndex : 0;
    const selected = list[idx] || list[0];
    const cleanIntro = selected.intro.replace(/{name}/g, winnerName).replace(/\.\.\./g, "").trim();
    return `${cleanIntro} ${selected.punchline}`;
  }
}

// Global singleton instance
export const rouletteAudio = new RouletteSoundEngine();
