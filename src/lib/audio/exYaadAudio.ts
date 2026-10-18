// Web Audio API & Web Speech API Sound Engine for Ex Yaad Aa Rahi Hai Meter 💔
// Overdramatic heartbreak-comedy Hinglish voice & funny sad-music / sad-trombone sound effects!

import { Language } from "../language/types";

export interface ExYaadAnnouncementResult {
  index: number;
  speechText: string;
  displayText: string;
  stage: "devdas" | "relapse" | "healed";
}

export const ENGLISH_EX_YAAD_ANNOUNCEMENTS = {
  devdas: [
    {
      intro: "Hey {name}... move on already, they moved on months ago! ... ...",
      punchline: "They are out enjoying dinner with someone new, and you are still screenshotting 2021 chats!",
    },
    {
      intro: "Did you just check your ex's profile from a burner account again? ... ...",
      punchline: "You're not a romantic lover, you're an undercover detective! Close the browser!",
    },
    {
      intro: "Extreme nostalgia attack detected! ... ...",
      punchline: "Even sad love songs can't handle this much grief! Put the phone away and go to sleep!",
    },
    {
      intro: "Pure tragedy! ... ...",
      punchline: "They blocked you on text, so you're sending $1 notes on payment apps with 'Hi'? Have some dignity!",
    },
  ],
  relapse: [
    {
      intro: "Moving on is a process, my friend... ...",
      punchline: "Just stop opening archived photos at 2:00 in the morning and you'll be fine!",
    },
    {
      intro: "Half your heart is healed, the other half wants to text 'Hey, you up?'! ... ...",
      punchline: "Self control, please! Go grab a warm cup of coffee and distract yourself!",
    },
    {
      intro: "Recovery mode is active! ... ...",
      punchline: "Just stop posting melancholic quotes on your stories, there are plenty of fish in the sea!",
    },
  ],
  healed: [
    {
      intro: "Game over! Good riddance! ... ...",
      punchline: "Heartbreak cleared permanently from the recycle bin! Total emotional freedom!",
    },
    {
      intro: "Look at you go, champion! ... ...",
      punchline: "You deserve an Olympic medal for moving on! Fully unbothered, zero drama!",
    },
    {
      intro: "Ex who? ... ... We don't even remember their last name! ... ...",
      punchline: "Certified Healed Legend! Now treat the squad to celebratory pizza!",
    },
  ],
};

export const EX_YAAD_ANNOUNCEMENTS = {
  devdas: [
    {
      intro: "Bhai {name}... move on kar le, usne toh kabka kar liya! ... ...",
      punchline: "Wo naye dost ke sath momo kha rahi hai, aur tu abhi bhi 2021 ki chats screenshot kar raha hai!",
    },
    {
      intro: "Ex ki profile phir se fake account se check ki? ... ...",
      punchline: "Bhai tu aashiq nahi, poora CID inspector Pradyuman nikla! Daya darwaza tod!",
    },
    {
      intro: "Arey Devdas ke chacha! ... ...",
      punchline: "Arjit Singh bhi tere dukh ko dekh ke retirement lene ki soch raha hai! Phone side mein rakh aur so jaa!",
    },
    {
      intro: "Dard! Peeda! Kashth! ... ...",
      punchline: "Usne WhatsApp pe block kiya, toh tu PayTM transaction note pe 'Hi' bhej raha hai? Thodi sharam kar le!",
    },
    {
      intro: "Extreme nostalgia attack! ... ...",
      punchline: "Bhai {name}, uski shaadi ke card pe paneer tikka khane jayega kya? Move on kar!",
    },
    {
      intro: "Breaking news! ... Ek tarfa aashiq detected! ... ...",
      punchline: "Swiggy se biryani mangwao aur background mein Arijit Singh ke sad gaane band karo!",
    },
  ],
  relapse: [
    {
      intro: "Move on ka process chal raha hai dost... ...",
      punchline: "Bas raat ke do baje purani photos kholna band kar do, sab theek ho jayega!",
    },
    {
      intro: "Aadha dil healed hai, aadha dil bolta hai 'Kash ek baar call kar lu'! ... ...",
      punchline: "Control Uday control! Tapri pe jao aur kadak chai piyo!",
    },
    {
      intro: "Recovery mode active hai bhai! ... ...",
      punchline: "Bas rainy season mein sad status daalna band karo, aage bohot options hain!",
    },
    {
      intro: "50-50 situation hai boss! ... ...",
      punchline: "Kabhi lagta hai azaad parinda hoon, toh kabhi sad reel dekh ke achanak aankh mein aansu!",
    },
  ],
  healed: [
    {
      intro: "Khatam! Tata! Bye-bye! ... ...",
      punchline: "Dil ka antim sanskaar successful! Ex ki memory permanently recycle bin se bhi delete!",
    },
    {
      intro: "Arey wah sher! ... ...",
      punchline: "Move on ka gold medal milna chahiye tujhe! Full single, full mast, zero kalesh!",
    },
    {
      intro: "Ex kaun? ... ... Humein toh naam bhi yaad nahi! ... ...",
      punchline: "Certified Healed Legend! Chal ab squad ko biryani ki treat de!",
    },
    {
      intro: "Aisi azaadi toh 1947 ke baad pehli baar dekhi hai! ... ...",
      punchline: "Bhai {name}, poora mohalla celebrate kar raha hai! Full swashbuckling hero mode!",
    },
  ],
};

class ExYaadSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private activeTimeouts: (number | NodeJS.Timeout)[] = [];
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private lastIndices: Record<string, number> = { devdas: -1, relapse: -1, healed: -1 };

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("fulltimepass_exyaad_sound");
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
      sessionStorage.setItem("fulltimepass_exyaad_sound", enabled ? "true" : "false");
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
   * Classic Comedic Sad Trombone ("Wah-wah-wah-waaaaaah"):
   * Descending slide notes: D3 -> C#3 -> C3 -> B2 (with comic vibrato)
   */
  public playSadTrombone(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [
        { freq: 155.56, time: 0.0, dur: 0.22 }, // D#3
        { freq: 146.83, time: 0.25, dur: 0.22 }, // D3
        { freq: 138.59, time: 0.5, dur: 0.22 }, // C#3
        { freq: 130.81, time: 0.75, dur: 0.65, slideDown: 110 }, // C3 sliding down with mournful vibrato
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, now + n.time);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        if (n.slideDown) {
          osc.frequency.exponentialRampToValueAtTime(n.slideDown, now + n.time + n.dur);
        }

        gain.gain.setValueAtTime(0.2, now + n.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur + 0.05);
        this.activeNodes.push(osc);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Overdramatic Heartbreak Minor Violin Sequence:
   * Melodramatic minor chord arpeggio with vibrato (D4 -> F4 -> A4 -> D5)
   */
  public playMelodramaticViolin(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const pitches = [293.66, 349.23, 440.0, 587.33]; // D4, F4, A4, D5 (D Minor)
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now + i * 0.12);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0.01, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.42);
        this.activeNodes.push(osc);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Comic Heartbreak "Crack" Sound
   */
  public playHeartbreakCrack(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Severe Heartbreak / Devdas Sting:
   * Melodramatic violin sweep + Heartbreak crack + Sad Trombone
   */
  public playDevdasSting(): void {
    if (!this.soundEnabled) return;
    this.playMelodramaticViolin();
    this.playHeartbreakCrack();

    const t = setTimeout(() => {
      this.playSadTrombone();
    }, 450);
    this.activeTimeouts.push(t);
  }

  /**
   * Relapse Zone Sting:
   * Soft sad minor tones + Comic cartoon boing
   */
  public playRelapseSting(): void {
    if (!this.soundEnabled) return;
    this.playMelodramaticViolin();

    const t = setTimeout(() => {
      const ctx = this.getContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.5);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.52);
        this.activeNodes.push(osc);
      } catch {}
    }, 400);
    this.activeTimeouts.push(t);
  }

  /**
   * Healed Champion Fanfare:
   * Upbeat celebratory fanfare (G4 -> C5 -> E5 -> G5 -> C6)
   */
  public playHealedFanfare(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [392.0, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.25, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.38);
        this.activeNodes.push(osc);
      });
    } catch {
      // safe fallback
    }
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
      (v) => v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en_in")
    );
    if (anyIndianEnglish) return anyIndianEnglish;

    // 5. Fallback: Any English voice
    return voices.find((v) => v.lang.toLowerCase().startsWith("en")) || voices[0] || null;
  }

  private getNextPhraseIndex(stage: "devdas" | "relapse" | "healed", language: Language = "hi"): number {
    const dataset = language === "en" ? ENGLISH_EX_YAAD_ANNOUNCEMENTS : EX_YAAD_ANNOUNCEMENTS;
    const list = dataset[stage];
    const total = list.length;
    let last = this.lastIndices[stage];
    if (last === -1) {
      last = Math.floor(Math.random() * total);
    } else {
      const step = 1 + Math.floor(Math.random() * (total - 1));
      last = (last + step) % total;
    }
    this.lastIndices[stage] = last;
    return last;
  }

  /**
   * Play the Ex Yaad Voiceover & Sound Effect sequence:
   * Matches the user's Moving-On score (devdas / relapse / healed)
   */
  public playExYaadAnnouncement(
    userName: string,
    movingOnScore: number,
    language: Language = "hi"
  ): ExYaadAnnouncementResult {
    this.stopAll();

    const name = userName.trim() || (language === "en" ? "Heartbreak Champion" : "Dil-Tuta Ashiq");
    let stage: "devdas" | "relapse" | "healed" = "relapse";
    if (movingOnScore >= 75) {
      stage = "healed";
    } else if (movingOnScore < 45) {
      stage = "devdas";
    }

    // Play appropriate sound effect sting
    if (this.soundEnabled) {
      if (stage === "healed") {
        this.playHealedFanfare();
      } else if (stage === "devdas") {
        this.playDevdasSting();
      } else {
        this.playRelapseSting();
      }
    }

    const dataset = language === "en" ? ENGLISH_EX_YAAD_ANNOUNCEMENTS : EX_YAAD_ANNOUNCEMENTS;
    const nextIdx = this.getNextPhraseIndex(stage, language);
    const selected = dataset[stage][nextIdx] || dataset[stage][0];

    const speechText = `${selected.intro.replace(/{name}/g, name)} ... ... ${selected.punchline.replace(/{name}/g, name)}`;
    const cleanIntro = selected.intro.replace(/{name}/g, name).replace(/\.\.\./g, "").trim();
    const cleanPunchline = selected.punchline.replace(/{name}/g, name).replace(/\.\.\./g, "").trim();
    const displayText = `${cleanIntro} ${cleanPunchline}`;

    if (this.soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText);
        const voice = this.getBestVoice(language);
        if (voice) {
          utterance.voice = voice;
        }

        // Overdramatic heartbreak-comedy voice modulation
        utterance.rate = language === "en" ? 1.0 : 1.04;
        utterance.pitch = language === "en" ? 1.05 : 1.14;
        utterance.volume = 1.0;

        // Give sad sting time to set the comic atmosphere
        const delay = stage === "devdas" ? 1100 : stage === "healed" ? 500 : 750;
        const speechTimer = setTimeout(() => {
          if (this.soundEnabled && "speechSynthesis" in window) {
            window.speechSynthesis.speak(utterance);
          }
        }, delay);

        this.activeTimeouts.push(speechTimer);
      } catch {
        // Fallback gracefully
      }
    }

    return {
      index: nextIdx,
      speechText,
      displayText,
      stage,
    };
  }
}

// Export singleton instance
export const exYaadSoundEngine = new ExYaadSoundEngine();
