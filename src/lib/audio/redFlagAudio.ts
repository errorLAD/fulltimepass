// Web Audio API & Web Speech API Sound Engine for GF/BF Red Flag Meter 🚩
// Hilarious, dramatic, meme-style Hinglish voice announcements & playful alarm effects!

import { Language } from "../language/types";
import { funnyVoiceEngine, FUNNY_VOICE_CONFIGS } from "./funnyVoiceEngine";

export interface RedFlagAnnouncementResult {
  index: number;
  speechText: string;
  displayText: string;
  category: "danger" | "moderate" | "safe";
}

export const ENGLISH_RED_FLAG_ANNOUNCEMENTS = {
  danger: [
    {
      intro: "Look out, {name}... that's not a red flag, it's an entire crimson parade! ... ...",
      punchline: "Sprint away like you're in the Olympic trials! Less love, more surveillance!",
    },
    {
      intro: "Red flag alert! ... Danger level off the charts! ... ...",
      punchline: "{name} has opened a full surveillance bureau! Demanding an audit every 5 minutes!",
    },
    {
      intro: "Warning! Toxic hurricane detected! ... ...",
      punchline: "Too much interrogation, zero trust! Asking for your phone passcode in under 3 dates!",
    },
    {
      intro: "Proceed with extreme caution! ... This is more dangerous than the Bermuda Triangle! ... ...",
      punchline: "Saying 'K' will trigger a 4-hour high-stakes tribunal!",
    },
  ],
  moderate: [
    {
      intro: "Mild drama detected ahead! ... ...",
      punchline: "A little bit of romance, and a little bit of 'I'm fine' silent treatment for 3 days!",
    },
    {
      intro: "50-50 forecast! ... ...",
      punchline: "One day you're dynamic soulmates, the next day you're in a diplomatic ceasefire!",
    },
    {
      intro: "Yellow card on the verge of a red card! ... ...",
      punchline: "Buy {name} some dessert and offer a polite apology without arguing!",
    },
  ],
  safe: [
    {
      intro: "Jackpot! ... ... This partner is 24-carat pure green forest! ... ...",
      punchline: "Cherish {name}! Call the matchmakers and celebrate your good fortune!",
    },
    {
      intro: "Zero red flags detected! ... ...",
      punchline: "Where did you find such a wholesome partner? Certified green flag champion!",
    },
    {
      intro: "Certified Green Flag Champion! ... ...",
      punchline: "Zero drama, 100% loyalty, and shares food without hesitation!",
    },
  ],
};

export const RED_FLAG_ANNOUNCEMENTS = {
  danger: [
    {
      intro: "Bhai {name}... red flag nahi, poora Lal Qila hai! ... ...",
      punchline: "Bhago yahan se, Olympic sprint maaro! Pyaar kam, investigation zyada chal rahi hai!",
    },
    {
      intro: "Red flag alert! ... Danger level 999%! ... ...",
      punchline: "{name} ke dimaag mein CBI ki branch khuli hui hai! Har 5 minute mein 'Kahan the?' ka audit!",
    },
    {
      intro: "Arey arey arey! ... Itna red flag toh communist rally mein bhi nahi hota bhai! ... ...",
      punchline: "Bhai {name}, rishta chalana hai ya nuclear missile plant sambhalna hai?",
    },
    {
      intro: "Warning! Toxic Tsunami detected! ... ...",
      punchline: "Pyaar kam, interrogation zyada hai! Phone ka password maangte hi third-degree shuru!",
    },
    {
      intro: "Oyeee! ... ... Ek taraf tumhara masoom dil, doosri taraf Supreme Court ka summons! ... ...",
      punchline: "{name} red flag nahi, poora historical monument hai bhai!",
    },
    {
      intro: "Bhai sambhal jao! ... ... Isse bada khatra toh Bermuda Triangle mein bhi nahi mila! ... ...",
      punchline: "Tumhara 'K' bolna inke liye 4 ghante ke kalesh ka reason ban jayega!",
    },
  ],
  moderate: [
    {
      intro: "Halka sa kalesh detected bhai! ... ...",
      punchline: "Thoda pyaar hai, aur thoda 'Main theek hoon' bol ke 3 din silent treatment!",
    },
    {
      intro: "50-50 situation hai boss! ... ...",
      punchline: "Kabhi Sholay ka Jai-Veeru, toh kabhi border ka ceasefire violation!",
    },
    {
      intro: "Yellow card se seedha red card ban sakta hai! ... ...",
      punchline: "Chai pilao {name} ko aur bina kisi behas ke turant 'Sorry' bol do!",
    },
    {
      intro: "Rishta theek chal raha hai dost... ...",
      punchline: "Bas galti se bhi Instagram archive folder check mat kar lena!",
    },
    {
      intro: "Pyaar aur tamashe ka balance 50 percent hai! ... ...",
      punchline: "Thodi acting, thodi diplomacy, aur rishta 6 mahine aur khich jayega!",
    },
  ],
  safe: [
    {
      intro: "Arey bhai bhai bhai! ... ... Yeh toh 24-carat pure green forest nikla! ... ...",
      punchline: "Nazar utaaro {name} ki! Pandit ji ko bulao aur rishta pakka karo!",
    },
    {
      intro: "Zero red flag alert! ... ...",
      punchline: "Itna shareef partner kahan se dhoondha? Pollution control board ne green certificate de diya hai!",
    },
    {
      intro: "Doodh ka dhula partner alert! ... ...",
      punchline: "Agar tumne {name} ko chhoda, toh Garud Puran mein alag se saza likhi jayegi!",
    },
    {
      intro: "Certified Green Flag Champion! ... ...",
      punchline: "Kalesh zero, loyalty 100%, aur snacks share karne mein koi hesitation nahi!",
    },
  ],
};

class RedFlagSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private activeTimeouts: (number | NodeJS.Timeout)[] = [];
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private lastIndices: Record<string, number> = { danger: -1, moderate: -1, safe: -1 };

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("fulltimepass_redflag_sound");
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
      sessionStorage.setItem("fulltimepass_redflag_sound", enabled ? "true" : "false");
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
   * Playful European / Cartoon Police Siren Alarm:
   * Rapidly alternating dual-tone siren (880Hz <-> 1240Hz)
   */
  public playAlarmSiren(durationSec: number = 0.85): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, now);

      osc.type = "sawtooth";

      // Modulate frequency like a siren
      const cycles = 4;
      const stepTime = durationSec / (cycles * 2);
      for (let i = 0; i < cycles * 2; i++) {
        const freq = i % 2 === 0 ? 880 : 1240;
        osc.frequency.setValueAtTime(freq, now + i * stepTime);
      }

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.setValueAtTime(0.25, now + durationSec - 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + durationSec + 0.02);
      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * Comic Gong / Dramatic Slam
   */
  public playDramaticGong(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.5);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.58);
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
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.45);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);
      this.activeNodes.push(osc);
    } catch {
      // safe fallback
    }
  }

  /**
   * High Red Flag Danger Sting:
   * Siren Alarm + Heavy Gong Slam + Cartoon Boing!
   */
  public playDangerSting(): void {
    if (!this.soundEnabled) return;
    this.playAlarmSiren(0.75);
    this.playDramaticGong();

    const t = setTimeout(() => {
      this.playCartoonBoing();
    }, 450);
    this.activeTimeouts.push(t);
  }

  /**
   * Moderate Warning Beeps:
   * Double warning beep (beep-boop!)
   */
  public playModerateWarning(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [0, 0.16].forEach((delay, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(idx === 0 ? 620 : 480, now + delay);

        gain.gain.setValueAtTime(0.25, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.14);
        this.activeNodes.push(osc);
      });
    } catch {
      // safe fallback
    }
  }

  /**
   * Green Flag Angelic / Triumphant Chime:
   * Ascending sweet chord arpeggio (C5 -> E5 -> G5 -> C6)
   */
  public playGreenFlagChime(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.38);
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

  private getNextPhraseIndex(category: "danger" | "moderate" | "safe", language: Language = "hi"): number {
    const dataset = language === "en" ? ENGLISH_RED_FLAG_ANNOUNCEMENTS : RED_FLAG_ANNOUNCEMENTS;
    const list = dataset[category];
    const total = list.length;
    let last = this.lastIndices[category];
    if (last === -1) {
      last = Math.floor(Math.random() * total);
    } else {
      const step = 1 + Math.floor(Math.random() * (total - 1));
      last = (last + step) % total;
    }
    this.lastIndices[category] = last;
    return last;
  }

  /**
   * Play the Red Flag Voiceover & Sound Effect sequence:
   * Matches the user's score (danger / moderate / safe)
   */
  public playRedFlagAnnouncement(
    partnerName: string,
    percentage: number,
    language: Language = "hi"
  ): RedFlagAnnouncementResult {
    this.stopAll();

    const name = partnerName.trim() || (language === "en" ? "Your Partner" : "Aapka Partner");
    let category: "danger" | "moderate" | "safe" = "moderate";
    if (percentage > 65) {
      category = "danger";
    } else if (percentage <= 30) {
      category = "safe";
    }

    // Play appropriate sound effect sting
    if (this.soundEnabled) {
      if (category === "danger") {
        this.playDangerSting();
      } else if (category === "safe") {
        this.playGreenFlagChime();
      } else {
        this.playModerateWarning();
      }
    }

    const dataset = language === "en" ? ENGLISH_RED_FLAG_ANNOUNCEMENTS : RED_FLAG_ANNOUNCEMENTS;
    const nextIdx = this.getNextPhraseIndex(category, language);
    const selected = dataset[category][nextIdx] || dataset[category][0];

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

        // Selected voice style modulation
        const voiceId = funnyVoiceEngine.getSelectedVoiceStyle();
        const cfg = FUNNY_VOICE_CONFIGS[voiceId] || FUNNY_VOICE_CONFIGS["desi-bhai"];
        utterance.rate = cfg.rate;
        utterance.pitch = cfg.pitch;
        utterance.volume = 1.0;

        const delay = category === "danger" ? 600 : 350;
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
      category,
    };
  }
}

// Export singleton instance
export const redFlagSoundEngine = new RedFlagSoundEngine();
