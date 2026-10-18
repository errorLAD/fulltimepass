// Web Audio API & Web Speech API Sound Engine for Udhaar Recovery Notice
// Ridiculously funny, desi, meme-worthy sound effects and voice announcements!

import { Language } from "../language/types";

export interface UdhaarAnnouncementResult {
  index: number;
  speechText: string;
  displayText: string;
}

export const ENGLISH_UDHAAR_ANNOUNCEMENTS = [
  {
    intro: "Hey {name}! ... ... Your lender is still alive, but that ${amount} is still missing! ... ...",
    punchline: "Have some decency, open your payment app and settle up!",
  },
  {
    intro: "{name}, when are you paying me back? ... ... In the next lifetime? ... ...",
    punchline: "Or do I need to show up outside your window with a marching band?",
  },
  {
    intro: "Breaking news! ... ... A 10-year friendship is on the line over ${amount}! ... ...",
    punchline: "The Reserve Bank of Friendship has officially declared {name} in default!",
  },
  {
    intro: "Did you borrow ${amount} or did you legally adopt it? ... ...",
    punchline: "Stop keeping my money hostage and send it home!",
  },
  {
    intro: "Attention everyone! ... ... Defaulter {name} has officially been audited! ... ...",
    punchline: "Stop posting $15 brunch stories on Instagram and return the money first!",
  },
  {
    intro: "Money talks, but inside {name}'s wallet, cash goes straight to silent mode! ... ...",
    punchline: "Open your payment app quietly and clear your balance!",
  },
  {
    intro: "Emergency warrant issued! ... The fugitive evading a debt of ${amount} is ... {name}! ... ...",
    punchline: "Leaving text messages on read is considered a civil misdemeanor!",
  },
  {
    intro: "Game over! ... ... {name}'s excuse quota has officially expired! ... ...",
    punchline: "Payment QR code is active, transfer the funds immediately!",
  },
];

export const UDHAAR_ANNOUNCEMENTS = [
  {
    intro: "Oyeee {name}! ... ... Udhaaar dene wala abhi tak zinda hai, aur paise abhi tak gayab! ... ...",
    punchline: "Bhai sharam kar le thodi, UPI khol aur paise bhej!",
  },
  {
    intro: "Bhai {name}, paise kab dega? ... ... Agle janam mein UPI karega kya? ... ...",
    punchline: "Ya main subah dhol bajate hue tere ghar aa jaun?",
  },
  {
    intro: "Breaking news! ... ... ₹{amount} ke liye 10 saal purani dosti khatre mein! ... ...",
    punchline: "Reserve Bank of Bhaichara ne {name} ko defaulter ghoshit kar diya hai!",
  },
  {
    intro: "Arey arey arey! ... Udhar liya tha ya adoption kar liya tha bhai? ... ...",
    punchline: "Mere ₹{amount} ko anath mat banao, unhe ghar wapas bhej!",
  },
  {
    intro: "Saanp ko doodh pilaya tha bhai! ... ... {name} ne bola tha kal dunga! ... ...",
    punchline: "Aur ab us kal ko aaye hue poore 6 mahine beet chuke hain!",
  },
  {
    intro: "Attention colony walo! ... ... Defaulter {name} ki aukaat audit ho chuki hai! ... ...",
    punchline: "Starbucks ki aesthetic stories daalna band karo, aur pehle ₹{amount} wapas karo!",
  },
  {
    intro: "Paisa bolta hai dost! ... ... Par {name} ke wallet mein jaakar paisa silent mode pe chala jata hai! ... ...",
    punchline: "Chupchap scanner kholo aur settlement karo!",
  },
  {
    intro: "Alert! Alert! ... ... ₹{amount} leke phone uthana band karne wale defaulter ka naam hai ... {name}! ... ...",
    punchline: "Bhai WhatsApp seen karke reply na dena felony maana jayega!",
  },
  {
    intro: "Arey {name}! ... ... CID ke Daya ko bula ke tere kamre ka darwaza todna padega kya? ... ...",
    punchline: "Shanti se Google Pay karo aur apni izzat bachao!",
  },
  {
    intro: "Khatam! Tata! Bye-bye! ... ... {name} ke bahano ka quota official taur par expire ho gaya hai! ... ...",
    punchline: "Emergency QR code active hai, turant transfer karo!",
  },
];

class UdhaarSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private activeTimeouts: (number | NodeJS.Timeout)[] = [];
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private lastPhraseIndex: number = -1;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("fulltimepass_udhaar_sound");
      this.soundEnabled = stored !== "false";

      // Pre-warm speech synthesis voices
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
      sessionStorage.setItem("fulltimepass_udhaar_sound", enabled ? "true" : "false");
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
   * Cartoon Police / Raid Siren Sound Effect
   */
  public playMemeSiren(durationSec: number = 0.85): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      // Siren wail oscillation
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.linearRampToValueAtTime(1150, now + 0.2);
      osc.frequency.linearRampToValueAtTime(650, now + 0.4);
      osc.frequency.linearRampToValueAtTime(1150, now + 0.6);
      osc.frequency.linearRampToValueAtTime(600, now + durationSec);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + durationSec);
      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Cash Register "Ka-Ching!" Bell
   */
  public playKaChing(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [1975, 2637]; // High B6 and E7 bell chimes
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
        this.activeNodes.push(osc);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Dramatic Court Gavel / Impact Thud
   */
  public playGavelThud(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.28);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Cartoon Spring Boing
   */
  public playCartoonBoing(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.5);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.52);
      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Full Dramatic Notice Reveal Sting:
   * Siren wail + Cash register chimes + Dramatic Gavel Thud + Cartoon Boing!
   */
  public playNoticeSting(): void {
    if (!this.soundEnabled) return;
    this.playMemeSiren(0.75);
    this.playGavelThud();

    const t1 = setTimeout(() => {
      this.playKaChing();
    }, 280);

    const t2 = setTimeout(() => {
      this.playCartoonBoing();
    }, 550);

    this.activeTimeouts.push(t1, t2);
  }

  /**
   * Pick Best Indian English or Hindi Voice
   */
  /**
   * Pick Best Voice based on language
   */
  private getBestVoice(language: Language = "hi"): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (language === "en") {
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

    // 1. Natural / Online Hindi voice
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

    // 5. Fallback default
    return voices.find((v) => v.default) || voices[0];
  }

  /**
   * Pick a fresh non-repeating announcement phrase
   */
  private getNextPhraseIndex(language: Language = "hi"): number {
    const list = language === "en" ? ENGLISH_UDHAAR_ANNOUNCEMENTS : UDHAAR_ANNOUNCEMENTS;
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
   * Play the full comedy announcement sequence:
   * 1. Dramatic sound effect sting (Siren, Gavel, Cash register, Boing)
   * 2. Exaggerated, energetic comedy meme voice
   */
  public playNoticeAnnouncement(
    defaulterName: string,
    amount: string | number,
    language: Language = "hi"
  ): UdhaarAnnouncementResult {
    this.stopAll();

    const name = defaulterName.trim() || (language === "en" ? "Defaulting Friend" : "Defaulter Bhai");
    const amtStr = String(amount).trim() || "500";

    // Play funny sound effect sting first
    if (this.soundEnabled) {
      this.playNoticeSting();
    }

    const list = language === "en" ? ENGLISH_UDHAAR_ANNOUNCEMENTS : UDHAAR_ANNOUNCEMENTS;
    const nextIdx = this.getNextPhraseIndex(language);
    const selected = list[nextIdx] || list[0];

    const speechText = `${selected.intro.replace(/{name}/g, name).replace(/{amount}/g, amtStr)} ... ... ${selected.punchline.replace(/{name}/g, name).replace(/{amount}/g, amtStr)}`;
    const cleanIntro = selected.intro
      .replace(/{name}/g, name)
      .replace(/{amount}/g, amtStr)
      .replace(/\.\.\./g, "")
      .trim();
    const cleanPunchline = selected.punchline
      .replace(/{name}/g, name)
      .replace(/{amount}/g, amtStr)
      .replace(/\.\.\./g, "")
      .trim();
    const displayText = `${cleanIntro} ${cleanPunchline}`;

    if (this.soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText);
        const voice = this.getBestVoice(language);
        if (voice) {
          utterance.voice = voice;
        }

        // Comedy voice modulation
        utterance.rate = language === "en" ? 1.0 : 1.05;
        utterance.pitch = language === "en" ? 1.05 : 1.15;
        utterance.volume = 1.0;

        // Play after sting has had 650ms to build suspense
        const speechTimer = setTimeout(() => {
          if (this.soundEnabled && "speechSynthesis" in window) {
            window.speechSynthesis.speak(utterance);
          }
        }, 650);

        this.activeTimeouts.push(speechTimer);
      } catch {
        // Fallback gracefully
      }
    }

    return {
      index: nextIdx,
      speechText,
      displayText,
    };
  }
}

// Export singleton instance
export const udhaarSoundEngine = new UdhaarSoundEngine();
