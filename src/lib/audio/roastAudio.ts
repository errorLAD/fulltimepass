// Roast Sound Engine for Roast My Friend 🔥
// Supports:
// 1. Browser SpeechSynthesis (Web Speech API) with humorous expressive styles (Hinglish & English)
// 2. Original comedy sound effects (drumroll, laugh, fail, circus, cheer, goat, whoosh)
// 3. Complete playback controls: Play, Pause, Resume, Replay, Stop, Mute
// 4. Fallback Web Audio API synthesis for zero-dependency offline playback
// 5. Mobile-safe audio unlocking & cleanup

import { Language } from "../language/types";

export type ComedySoundId =
  | "laugh"
  | "drumroll"
  | "fail"
  | "circus"
  | "cheer"
  | "goat"
  | "whoosh";

export type VoiceStyle = "desi" | "savage" | "chipmunk" | "fast";

export interface ComedySoundDef {
  id: ComedySoundId;
  label: string;
  labelHi: string;
  emoji: string;
  src: string;
  description: string;
  descriptionHi: string;
}

export const COMEDY_SOUNDS: ComedySoundDef[] = [
  {
    id: "laugh",
    label: "Cartoon Laugh",
    labelHi: "Cartoon Hansi",
    emoji: "😂",
    src: "/sounds/laugh.wav",
    description: "Comedic squad chuckles & giggles",
    descriptionHi: "Zordaar thahaake aur hasi",
  },
  {
    id: "drumroll",
    label: "Dramatic Drumroll",
    labelHi: "Dramatic Drumroll",
    emoji: "🥁",
    src: "/sounds/drumroll.wav",
    description: "Suspenseful roll with crash",
    descriptionHi: "Suspense bhara drumroll",
  },
  {
    id: "fail",
    label: "Funny Fail",
    labelHi: "Funny Fail",
    emoji: "💀",
    src: "/sounds/fail.wav",
    description: "Sad trombone wah-wah-wah",
    descriptionHi: "Moye moye sad trombone",
  },
  {
    id: "circus",
    label: "Circus Comedy",
    labelHi: "Circus Joke",
    emoji: "🤡",
    src: "/sounds/circus.wav",
    description: "Clown horn & spring boing",
    descriptionHi: "Clown horn aur spring boing",
  },
  {
    id: "cheer",
    label: "Crowd Cheering",
    labelHi: "Crowd Cheering",
    emoji: "🔥",
    src: "/sounds/cheer.wav",
    description: "Applause, whistle & cheers",
    descriptionHi: "Public taliyan aur shor",
  },
  {
    id: "goat",
    label: "Funny Goat Bleat",
    labelHi: "Funny Bakri Bleat",
    emoji: "🐐",
    src: "/sounds/goat.wav",
    description: "Screaming goat meme bleat",
    descriptionHi: "Funny bakri ki aawaz",
  },
  {
    id: "whoosh",
    label: "Cartoon Whoosh",
    labelHi: "Cartoon Whoosh",
    emoji: "💨",
    src: "/sounds/whoosh.wav",
    description: "Speedy comic swoosh",
    descriptionHi: "Tez comic whoosh hawa",
  },
];

export interface RoastVoiceConfig {
  style: VoiceStyle;
  rate: number;
  pitch: number;
  label: string;
  emoji: string;
}

export const ROAST_VOICE_STYLES: Record<VoiceStyle, RoastVoiceConfig> = {
  desi: {
    style: "desi",
    rate: 0.96,
    pitch: 1.1,
    label: "Desi Roastmaster",
    emoji: "🎤",
  },
  savage: {
    style: "savage",
    rate: 0.9,
    pitch: 0.85,
    label: "Savage Godfather",
    emoji: "🕶️",
  },
  chipmunk: {
    style: "chipmunk",
    rate: 1.16,
    pitch: 1.48,
    label: "Helium Chipmunk",
    emoji: "🐿️",
  },
  fast: {
    style: "fast",
    rate: 1.32,
    pitch: 1.05,
    label: "Bullet Express",
    emoji: "⚡",
  },
};

export type SpeechState = "idle" | "playing" | "paused";

class RoastSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private activeAudioElements: HTMLAudioElement[] = [];
  private activeTimeouts: (number | NodeJS.Timeout)[] = [];
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private speechState: SpeechState = "idle";
  private stateChangeListeners: ((state: SpeechState) => void)[] = [];
  private currentSpokenText: string = "";
  private currentStingerSound: ComedySoundId | null = "laugh";

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("fulltimepass_roast_sound");
      this.soundEnabled = stored !== "false";

      // Warm up voices
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

  // --- Mute / Unmute Controls ---
  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fulltimepass_roast_sound", enabled ? "true" : "false");
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

  public setStingerSound(soundId: ComedySoundId | null) {
    this.currentStingerSound = soundId;
  }

  public getStingerSound(): ComedySoundId | null {
    return this.currentStingerSound;
  }

  // --- AudioContext Management ---
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
   * Safe user gesture unlock for mobile browsers
   */
  public unlockAudio(): void {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  // --- Stop All ---
  public stopAll(): void {
    // Clear timeouts
    this.activeTimeouts.forEach((t) => clearTimeout(t));
    this.activeTimeouts = [];

    // Stop active audio elements
    this.activeAudioElements.forEach((audio) => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {}
    });
    this.activeAudioElements = [];

    // Stop active synth nodes
    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    });
    this.activeNodes = [];

    // Stop speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    this.currentUtterance = null;
    this.setSpeechState("idle");
  }

  // --- Speech State Listener ---
  public subscribeState(listener: (state: SpeechState) => void): () => void {
    this.stateChangeListeners.push(listener);
    listener(this.speechState);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter((l) => l !== listener);
    };
  }

  private setSpeechState(state: SpeechState): void {
    this.speechState = state;
    this.stateChangeListeners.forEach((l) => l(state));
  }

  public getSpeechState(): SpeechState {
    return this.speechState;
  }

  public isSpeechSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  // --- Voice Selection ---
  public getBestVoice(language: Language = "hi"): SpeechSynthesisVoice | null {
    if (!this.isSpeechSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (language === "en") {
      // Natural English voices
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

      const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
      if (anyEn) return anyEn;

      return voices.find((v) => v.default) || voices[0];
    }

    // Hinglish / Hindi Mode
    // 1. Natural / Online Hindi voice
    const naturalHindi = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith("hi") &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("online") ||
          v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("swara"))
    );
    if (naturalHindi) return naturalHindi;

    // 2. Any Hindi voice
    const anyHindi = voices.find((v) => v.lang.toLowerCase().startsWith("hi"));
    if (anyHindi) return anyHindi;

    // 3. Indian English voice (great for Hinglish slang!)
    const indianEn = voices.find(
      (v) =>
        (v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en_in")) &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("online") ||
          v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("neerja") ||
          v.name.toLowerCase().includes("prabhat"))
    );
    if (indianEn) return indianEn;

    const anyIndian = voices.find(
      (v) =>
        v.lang.toLowerCase().includes("en-in") ||
        v.lang.toLowerCase().includes("en_in") ||
        v.name.toLowerCase().includes("india")
    );
    if (anyIndian) return anyIndian;

    // 4. Default fallback
    return voices.find((v) => v.default) || voices[0];
  }

  // --- Voice Controls ---
  /**
   * Speak roast aloud with comic pauses and voice styling
   */
  public speakRoast({
    friendName,
    description,
    punchline,
    language = "hi",
    style = "desi",
    onFinish,
  }: {
    friendName: string;
    description: string;
    punchline?: string;
    language: Language;
    style?: VoiceStyle;
    onFinish?: () => void;
  }): void {
    this.stopAll();

    if (!this.soundEnabled) return;
    if (!this.isSpeechSupported()) {
      alert(
        language === "en"
          ? "Text-to-speech is not supported by your browser."
          : "Aapke browser mein text-to-speech support nahi hai."
      );
      return;
    }

    // Clean up markdown / emoji symbols for smooth speech
    const cleanDesc = description
      .replace(/[🔥💀😂🤡🥁🐐💨😊🚑🩹📉⚡👉🏆👤📊💬]/g, "")
      .replace(/[*_#]/g, "")
      .replace(/\n+/g, " ... ")
      .trim();

    const cleanPunchline = punchline
      ? punchline
          .replace(/[🔥💀😂🤡🥁🐐💨😊🚑🩹📉⚡👉🏆👤📊💬]/g, "")
          .replace(/[*_#]/g, "")
          .trim()
      : "";

    // Build comedic intro & delivery
    let speechScript = "";
    if (language === "en") {
      speechScript = `Attention everyone! ... Here is the certified roast audit for ${friendName}! ... ... ${cleanDesc}`;
      if (cleanPunchline) {
        speechScript += ` ... ... Final verdict: ... ${cleanPunchline}!`;
      }
    } else {
      speechScript = `Oye sunno sab log! ... ${friendName} ki official beizzati report hazir hai! ... ... ${cleanDesc}`;
      if (cleanPunchline) {
        speechScript += ` ... ... Asli punchline suniye: ... ${cleanPunchline}!`;
      }
    }

    this.currentSpokenText = speechScript;

    try {
      const utterance = new SpeechSynthesisUtterance(speechScript);
      const voice = this.getBestVoice(language);
      if (voice) {
        utterance.voice = voice;
      }

      const cfg = ROAST_VOICE_STYLES[style] || ROAST_VOICE_STYLES.desi;
      utterance.pitch = cfg.pitch;
      utterance.rate = cfg.rate;

      utterance.onstart = () => {
        this.setSpeechState("playing");
      };

      utterance.onpause = () => {
        this.setSpeechState("paused");
      };

      utterance.onresume = () => {
        this.setSpeechState("playing");
      };

      utterance.onend = () => {
        this.setSpeechState("idle");
        this.currentUtterance = null;
        // Optional Stinger sound at end of roast
        if (this.currentStingerSound && this.soundEnabled) {
          this.playSound(this.currentStingerSound);
        }
        if (onFinish) onFinish();
      };

      utterance.onerror = (e) => {
        if (e.error !== "canceled" && e.error !== "interrupted") {
          console.warn("SpeechSynthesis error:", e.error);
        }
        this.setSpeechState("idle");
        this.currentUtterance = null;
      };

      this.currentUtterance = utterance;

      // Small delay for clean initial audio buffer
      const t = setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
      this.activeTimeouts.push(t);
    } catch (err) {
      console.warn("Speech playback error:", err);
      this.setSpeechState("idle");
    }
  }

  public pauseRoast(): void {
    if (!this.isSpeechSupported()) return;
    try {
      if (this.speechState === "playing") {
        window.speechSynthesis.pause();
        this.setSpeechState("paused");
      }
    } catch {}
  }

  public resumeRoast(): void {
    if (!this.isSpeechSupported()) return;
    try {
      if (this.speechState === "paused") {
        window.speechSynthesis.resume();
        this.setSpeechState("playing");
      }
    } catch {}
  }

  public stopRoast(): void {
    this.stopAll();
  }

  // --- Sound Effects Playback ---
  /**
   * Play any of the 7 comedy sound effects
   * Uses locally hosted WAV files in /sounds/ with Web Audio fallback
   */
  public async playSound(soundId: ComedySoundId, volume: number = 0.85): Promise<void> {
    if (!this.soundEnabled) return;

    this.unlockAudio();

    const def = COMEDY_SOUNDS.find((s) => s.id === soundId);
    if (!def) return;

    try {
      const audio = new Audio(def.src);
      audio.volume = Math.max(0, Math.min(1, volume));

      this.activeAudioElements.push(audio);

      audio.onended = () => {
        this.activeAudioElements = this.activeAudioElements.filter((a) => a !== audio);
      };

      await audio.play();
    } catch {
      // Fallback to Web Audio synthesis if local file playback is blocked
      this.playSynthesizedFallback(soundId);
    }
  }

  /**
   * High-accuracy Web Audio API synthesizer fallback
   */
  private playSynthesizedFallback(soundId: ComedySoundId): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (soundId === "drumroll") {
        // Synthesize drumroll
        const durationSec = 2.4;
        const bufferSize = Math.floor(ctx.sampleRate * durationSec);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const out = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          out[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(1400, now + durationSec);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.4, now + durationSec - 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + durationSec);
        this.activeNodes.push(noise);
      } else if (soundId === "fail") {
        // Sad trombone notes
        const freqs = [311.1, 293.7, 277.2, 246.9];
        freqs.forEach((freq, idx) => {
          const startTime = now + idx * 0.35;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, startTime);
          if (idx === 3) {
            osc.frequency.linearRampToValueAtTime(215, startTime + 0.8);
          }

          gain.gain.setValueAtTime(0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx === 3 ? 0.9 : 0.32));

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + (idx === 3 ? 0.95 : 0.35));
          this.activeNodes.push(osc);
        });
      } else if (soundId === "whoosh") {
        // Cartoon whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.5);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
        this.activeNodes.push(osc);
      } else {
        // Cheerful/comic chord
        const notes = [440, 554.37, 659.25];
        notes.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.45);
          this.activeNodes.push(osc);
        });
      }
    } catch {}
  }
}

// Global Singleton
export const roastAudio = new RoastSoundEngine();
