import { Language } from "../language/types";
import {
  FunnyVoiceId,
  FunnySoundId,
  FunnyVoiceConfig,
  SoundEffectDef,
  SpeechState,
  VoiceDiagnostics,
  SpeakOptions,
} from "./funnyVoiceTypes";

// Canonical Voice ID Normalizer
export function normalizeVoiceId(id: string): FunnyVoiceId {
  if (id === "desi-bhai") return "desi-male";
  if (id === "comedy-uncle") return "desi-uncle";
  if (id === "cartoon-clown") return "cartoon-character";
  if (id === "savage-roaster") return "savage-friend";
  if (id === "robot-voice") return "robot";
  if (FUNNY_VOICE_CONFIGS[id as FunnyVoiceId]) return id as FunnyVoiceId;
  return "desi-male";
}

// 1. ALL 8 NATURAL HUMAN COMEDY VOICE STYLES
export const FUNNY_VOICE_CONFIGS: Record<FunnyVoiceId, FunnyVoiceConfig> = {
  "desi-male": {
    id: "desi-male",
    label: "Desi Male Comedy",
    labelHi: "Desi Male Comedy",
    tagline: "Natural Hinglish Stand-up Comic",
    taglineHi: "Natural Hinglish Stand-up Cadence",
    emoji: "😎",
    color: "#F59E0B",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    pitch: 1.0,
    rate: 1.05,
    previewHi: "Arre bhai bhai bhai! Sun na, ek number comedy roast banaya hai tere liye!",
    previewEn: "Yo bro! Listen up, I have the freshest comedy roast ready for you!",
    previewAudioHi: "/audio/previews/desi-male_hi.mp3",
    previewAudioEn: "/audio/previews/desi-male_en.mp3",
    speechIntroHi: "Arre bhai suno sab log! ... ",
    speechIntroEn: "Yo bro, listen up everyone! ... ",
    description: "Authentic, energetic Indian male comic delivery with natural Hinglish slang & pauses.",
    neuralVoiceNameHi: "hi-IN-MadhurNeural (Microsoft Neural)",
    neuralVoiceNameEn: "en-IN-PrabhatNeural (Microsoft Neural)",
  },
  "funny-female": {
    id: "funny-female",
    label: "Funny Female Voice",
    labelHi: "Funny Female Voice",
    tagline: "Expressive Comedic Delivery",
    taglineHi: "Zordaar Comedic Drama",
    emoji: "💁‍♀️",
    color: "#EC4899",
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    pitch: 1.0,
    rate: 1.04,
    previewHi: "Haan ji! Zara dhyan se suniye, aapka secret expose hone wala hai!",
    previewEn: "Oh honey, listen up! Your hilarious secrets are officially out!",
    previewAudioHi: "/audio/previews/funny-female_hi.mp3",
    previewAudioEn: "/audio/previews/funny-female_en.mp3",
    speechIntroHi: "Haan ji! Zara dhyan se suniye! ... ",
    speechIntroEn: "Oh honey, listen up! ... ",
    description: "Warm, witty, and lively comedic female delivery with genuine expressive modulation.",
    neuralVoiceNameHi: "hi-IN-SwaraNeural (Microsoft Neural)",
    neuralVoiceNameEn: "en-IN-NeerjaNeural (Microsoft Neural)",
  },
  "savage-friend": {
    id: "savage-friend",
    label: "Savage Friend",
    labelHi: "Savage Friend",
    tagline: "Sarcastic & Confident Buddy",
    taglineHi: "Brutal Reality Check Roast",
    emoji: "🕶️",
    color: "#EF4444",
    gradient: "from-red-500 via-rose-600 to-amber-600",
    pitch: 0.95,
    rate: 1.02,
    previewHi: "Sach sunke mirchi lagegi boss, par tera asli roop yahi hai!",
    previewEn: "Dude, the truth hurts, but someone had to call you out!",
    previewAudioHi: "/audio/previews/savage-friend_hi.mp3",
    previewAudioEn: "/audio/previews/savage-friend_en.mp3",
    speechIntroHi: "Dil thaam ke baitho! Asli sach sunne ka time aa gaya hai! ... ",
    speechIntroEn: "Brace yourselves! The brutal, honest truth has arrived! ... ",
    description: "Sharp, sarcastic, ultra-confident roast delivery with deadpan comic timing.",
    neuralVoiceNameHi: "hi-IN-MadhurNeural (Sarcastic Prosody)",
    neuralVoiceNameEn: "en-IN-PrabhatNeural (Microsoft Neural)",
  },
  "bollywood-drama": {
    id: "bollywood-drama",
    label: "Bollywood Drama",
    labelHi: "Bollywood Drama",
    tagline: "Over-the-Top Melodrama Actor",
    taglineHi: "Filmi Melodrama & Emotion",
    emoji: "🎭",
    color: "#D946EF",
    gradient: "from-fuchsia-500 via-purple-600 to-pink-500",
    pitch: 1.15,
    rate: 0.92,
    previewHi: "Hai tauba! Yeh kya anarth dekhna pad raha hai! Bhagwan utha le re baba!",
    previewEn: "Good heavens! The sheer cinematic tragedy of this breathtaking moment!",
    previewAudioHi: "/audio/previews/bollywood-drama_hi.mp3",
    previewAudioEn: "/audio/previews/bollywood-drama_en.mp3",
    speechIntroHi: "Oye hoye! Itna bada bawaal! Suniye sabhi log! ... ",
    speechIntroEn: "Dramatic silence please! Listen to this theatrical revelation! ... ",
    description: "Grand theatrical pauses, exaggerated emotional gasps, and filmi dialogue cadence.",
    neuralVoiceNameHi: "hi-IN-MadhurNeural (Theatrical Prosody)",
    neuralVoiceNameEn: "en-IN-NeerjaNeural (Melodramatic Prosody)",
  },
  "cartoon-character": {
    id: "cartoon-character",
    label: "Cartoon Character",
    labelHi: "Cartoon Character",
    tagline: "Playful, Bouncy & Energetic",
    taglineHi: "Playful & Energetic Masti",
    emoji: "🤡",
    color: "#F59E0B",
    gradient: "from-amber-400 via-yellow-500 to-pink-500",
    pitch: 1.25,
    rate: 1.12,
    previewHi: "Hehe haha! Boing boing! Dekho kitna mast funny joke hai!",
    previewEn: "Hehe haha! Boing boing! Look at this hilarious madness!",
    previewAudioHi: "/audio/previews/cartoon-character_hi.mp3",
    previewAudioEn: "/audio/previews/cartoon-character_en.mp3",
    speechIntroHi: "Hehe haha! Boing! Ab suno mast funny report! ... ",
    speechIntroEn: "Hehe haha! Boing! Time for some hilarious comedy! ... ",
    description: "Playful, animated cartoon character delivery full of bouncing energy and laughs.",
    neuralVoiceNameHi: "hi-IN-SwaraNeural (High Pitch Prosody)",
    neuralVoiceNameEn: "en-US-AnaNeural (Cartoon Kid Neural)",
  },
  "desi-uncle": {
    id: "desi-uncle",
    label: "Desi Uncle",
    labelHi: "Desi Uncle",
    tagline: "Humorous Conversational Lecture",
    taglineHi: "Gyaan & Taunt Specialist",
    emoji: "👴",
    color: "#8B5CF6",
    gradient: "from-purple-500 via-indigo-500 to-pink-500",
    pitch: 0.88,
    rate: 0.9,
    previewHi: "Beta hamare zamaane mein na, aisi bewakoofi koi soch bhi nahi sakta tha!",
    previewEn: "Listen carefully youngsters! Back in my day, we had actual discipline!",
    previewAudioHi: "/audio/previews/desi-uncle_hi.mp3",
    previewAudioEn: "/audio/previews/desi-uncle_en.mp3",
    speechIntroHi: "Arre suniye janab! Hamare zamane mein aisi baatein nahi hoti thi! ... ",
    speechIntroEn: "Listen here youngsters! Pay close attention to this lecture! ... ",
    description: "Deep, authoritative uncle voice loaded with old-school taunts and hilarious moral lectures.",
    neuralVoiceNameHi: "hi-IN-MadhurNeural (Deep Lecture Prosody)",
    neuralVoiceNameEn: "en-IN-PrabhatNeural (Deep Cadence)",
  },
  "news-reporter": {
    id: "news-reporter",
    label: "News Reporter",
    labelHi: "News Reporter",
    tagline: "Serious Delivery of Ridiculous Jokes",
    taglineHi: "Breaking News Anchor",
    emoji: "🎙️",
    color: "#3B82F6",
    gradient: "from-blue-500 via-indigo-600 to-cyan-500",
    pitch: 1.05,
    rate: 1.18,
    previewHi: "Breaking News! Sansanikhez khulasa seedhe hamare studio se!",
    previewEn: "Breaking News! Sensational headlines reporting live right now!",
    previewAudioHi: "/audio/previews/news-reporter_hi.mp3",
    previewAudioEn: "/audio/previews/news-reporter_en.mp3",
    speechIntroHi: "Breaking News! Sansanikhez report seedhe hamare studio se! ... ",
    speechIntroEn: "Breaking News! Sensational headlines reporting live to you right now! ... ",
    description: "Deadpan, high-urgency breaking news anchor cadence delivering completely unhinged jokes.",
    neuralVoiceNameHi: "hi-IN-MadhurNeural (Urgent Anchor Prosody)",
    neuralVoiceNameEn: "en-US-ChristopherNeural (News Anchor Neural)",
  },
  robot: {
    id: "robot",
    label: "Robot Voice",
    labelHi: "Robot Voice",
    tagline: "Intentionally Robotic Tech Monotone",
    taglineHi: "AI Techno Monotone",
    emoji: "🤖",
    color: "#06B6D4",
    gradient: "from-cyan-500 via-sky-500 to-indigo-600",
    pitch: 0.75,
    rate: 1.0,
    previewHi: "Beep boop. Calculating roast level. Ek sau percent complete.",
    previewEn: "Beep boop. Calculating logic index. Comedy quotient 100 percent.",
    previewAudioHi: "/audio/previews/robot_hi.mp3",
    previewAudioEn: "/audio/previews/robot_en.mp3",
    speechIntroHi: "Beep boop. Attention human. Processing diagnostic report. ... ",
    speechIntroEn: "Beep boop. Attention human. System diagnostic report initialized. ... ",
    description: "Classic monotone mechanical cyber-calculation cadence for intentionally robotic comedy.",
    neuralVoiceNameHi: "en-US-GuyNeural (Mechanical Prosody)",
    neuralVoiceNameEn: "en-US-GuyNeural (Mechanical Prosody)",
  },

  // Backward-compatible alias entries
  "desi-bhai": null as any,
  "comedy-uncle": null as any,
  "cartoon-clown": null as any,
  "savage-roaster": null as any,
  "robot-voice": null as any,
};

// Fill in alias pointers
FUNNY_VOICE_CONFIGS["desi-bhai"] = FUNNY_VOICE_CONFIGS["desi-male"];
FUNNY_VOICE_CONFIGS["comedy-uncle"] = FUNNY_VOICE_CONFIGS["desi-uncle"];
FUNNY_VOICE_CONFIGS["cartoon-clown"] = FUNNY_VOICE_CONFIGS["cartoon-character"];
FUNNY_VOICE_CONFIGS["savage-roaster"] = FUNNY_VOICE_CONFIGS["savage-friend"];
FUNNY_VOICE_CONFIGS["robot-voice"] = FUNNY_VOICE_CONFIGS["robot"];

export const FUNNY_VOICES_LIST: FunnyVoiceConfig[] = [
  FUNNY_VOICE_CONFIGS["desi-male"],
  FUNNY_VOICE_CONFIGS["funny-female"],
  FUNNY_VOICE_CONFIGS["savage-friend"],
  FUNNY_VOICE_CONFIGS["bollywood-drama"],
  FUNNY_VOICE_CONFIGS["cartoon-character"],
  FUNNY_VOICE_CONFIGS["desi-uncle"],
  FUNNY_VOICE_CONFIGS["news-reporter"],
  FUNNY_VOICE_CONFIGS["robot"],
];

// 2. SHARED COMEDY SOUND EFFECTS
export const FUNNY_SOUND_EFFECTS: SoundEffectDef[] = [
  {
    id: "drumroll",
    label: "Dramatic Drumroll",
    labelHi: "Dramatic Drumroll",
    emoji: "🥁",
    src: "/sounds/drumroll.wav",
    description: "Suspenseful snare roll with dramatic crash cymbal",
    descriptionHi: "Suspense bhara drumroll aur dhamaaka",
  },
  {
    id: "laugh",
    label: "Cartoon Laugh",
    labelHi: "Cartoon Hansi",
    emoji: "😂",
    src: "/sounds/laugh.wav",
    description: "Goofy squad chuckles, giggles and boisterous laughs",
    descriptionHi: "Zordaar thahaake aur hasi",
  },
  {
    id: "fail",
    label: "Comedy Fail",
    labelHi: "Comedy Fail",
    emoji: "💀",
    src: "/sounds/fail.wav",
    description: "Sad trombone wah-wah-wah sound effect",
    descriptionHi: "Moye moye sad trombone fail tone",
  },
  {
    id: "cheer",
    label: "Crowd Cheer",
    labelHi: "Crowd Cheering",
    emoji: "🔥",
    src: "/sounds/cheer.wav",
    description: "Stadium applause, whistling, and hype cheers",
    descriptionHi: "Public taliyan, seeti aur shor",
  },
  {
    id: "whoosh",
    label: "Cartoon Whoosh",
    labelHi: "Cartoon Whoosh",
    emoji: "💨",
    src: "/sounds/whoosh.wav",
    description: "Speedy comic swoosh passing by",
    descriptionHi: "Tez comic hawa ka whoosh",
  },
  {
    id: "circus",
    label: "Circus Horn",
    labelHi: "Circus Horn",
    emoji: "🎪",
    src: "/sounds/circus.wav",
    description: "Clown squeak horn and spring boing",
    descriptionHi: "Clown horn aur spring boing",
  },
  {
    id: "goat",
    label: "Screaming Goat",
    labelHi: "Bakri Meme",
    emoji: "🐐",
    src: "/sounds/goat.wav",
    description: "Funny viral screaming goat bleat",
    descriptionHi: "Viral cheekhti hui bakri",
  },
];

// Contextual Audio Labels for every game
export function getContextualAudioLabel(
  toolSlug: string,
  language: Language = "hi"
): { title: string; subtitle: string; icon: string } {
  const isEn = language === "en";

  switch (toolSlug) {
    case "roast-my-friend":
      return {
        title: isEn ? "Suno Roast 🔥" : "Suno Roast 🔥",
        subtitle: isEn ? "Listen to Savage Roast Aloud" : "Apne Dost Ki Beizzati Suno",
        icon: "🔥",
      };
    case "red-flag-meter":
      return {
        title: isEn ? "Suno Red Flag Alert 🚩" : "Suno Red Flag Alert 🚩",
        subtitle: isEn ? "Listen to Partner Toxicity Audit" : "Khatre Ka Lal Jhanda Suno",
        icon: "🚩",
      };
    case "ex-yaad-meter":
      return {
        title: isEn ? "Suno Devdas Report 💔" : "Suno Devdas Report 💔",
        subtitle: isEn ? "Listen to Heartbreak Analysis" : "Moving On Ka Asli Sach Suno",
        icon: "💔",
      };
    case "group-chat-roles":
      return {
        title: isEn ? "Suno Squad Roles 👑" : "Suno Squad Roles 👑",
        subtitle: isEn ? "Listen to Cabinet Assignment" : "Dosto Ke Official Khitaab Suno",
        icon: "👑",
      };
    case "shaadi-market-value":
      return {
        title: isEn ? "Suno Rishta Value 💍" : "Suno Rishta Prediction 💍",
        subtitle: isEn ? "Listen to Matrimonial Valuation" : "Shaadi Market Ki Boli Suno",
        icon: "💍",
      };
    case "aukaat-checker":
      return {
        title: isEn ? "Suno Financial Roast 💸" : "Suno Aukaat Check 💸",
        subtitle: isEn ? "Listen to Bank Balance Audit" : "Apni Jeb Ka Asli Haal Suno",
        icon: "💸",
      };
    case "family-whatsapp-chat":
      return {
        title: isEn ? "Suno Family Chat 📱" : "Suno Parivaar Kalesh 📱",
        subtitle: isEn ? "Listen to Dramatic WhatsApp Audio" : "Papaji Aur Mummyji Ki Chat Suno",
        icon: "📱",
      };
    case "personality-test":
      return {
        title: isEn ? "Suno Asli Avataar 🧠" : "Suno Personality Verdict 🧠",
        subtitle: isEn ? "Listen to True Archetype Reveal" : "Apna Asli Roop Aur Avatar Suno",
        icon: "🧠",
      };
    case "udhaar-recovery-notice":
      return {
        title: isEn ? "Suno Recovery Warrant 💰" : "Suno Udhaar Notice 💰",
        subtitle: isEn ? "Listen to Friendship Legal Notice" : "Reserve Bank of Bhaichara Warrant",
        icon: "💰",
      };
    case "shaadi-kalesh-predictor":
      return {
        title: isEn ? "Suno Kalesh Forecast 🥁" : "Suno Kalesh Forecast 🥁",
        subtitle: isEn ? "Listen to Wedding Drama Prediction" : "Fufaji Aur DJ Kalesh Prediction",
        icon: "🥁",
      };
    case "trip-cancellation-cbi":
      return {
        title: isEn ? "Suno CBI Report 🕵️‍♂️" : "Suno CBI Inquiry 🕵️‍♂️",
        subtitle: isEn ? "Listen to Saboteur Investigation" : "Goa Trip Cancel Karnewale Saanp Ka Khulasa",
        icon: "🕵️‍♂️",
      };
    case "reply-ka-bhikhari":
      return {
        title: isEn ? "Suno Seen-Zone Audit 👁️" : "Suno Reply Bhikhari Meter ⏳",
        subtitle: isEn ? "Listen to Text Desperation Score" : "Waiting Mode Ka Sach Suno",
        icon: "⏳",
      };
    case "salary-gayab":
      return {
        title: isEn ? "Suno Salary RIP Report 💸" : "Suno Salary RIP Report 💸",
        subtitle: isEn ? "Listen to Paycheck Demise" : "9 Baje Aayi, 9:07 Par Gayab!",
        icon: "💸",
      };
    case "kal-se-pakka":
      return {
        title: isEn ? "Suno Bahana Certificate 🛋️" : "Suno Bahana Certificate 🛋️",
        subtitle: isEn ? "Listen to Procrastination Verdict" : "Kal Se Pakka Ka Official Bahana",
        icon: "🛋️",
      };
    case "main-character-syndrome":
      return {
        title: isEn ? "Suno Bollywood Diagnosis 🎬" : "Suno Melodrama Score 🎬",
        subtitle: isEn ? "Listen to Cinematic Melodrama" : "Hero Entry Ka Asli Score Suno",
        icon: "🎬",
      };
    case "food-delivery-detective":
      return {
        title: isEn ? "Suno Delivery Investigation 🍕" : "Suno Delivery Investigation 🍕",
        subtitle: isEn ? "Listen to Delivery Roadblocks" : "Rider Ke 4 Galat Turns Ka Haal Suno",
        icon: "🍕",
      };
    case "photo-delete-meter":
      return {
        title: isEn ? "Suno Selfie Audit 📸" : "Suno Selfie Audit 📸",
        subtitle: isEn ? "Listen to 237 Snaps & 0 Uploads" : "Storage Barbadi Ki Report Suno",
        icon: "📸",
      };
    case "fake-richness":
      return {
        title: isEn ? "Suno Rich-Kid Roast 🏰" : "Suno Kothi Bangle Report 💳",
        subtitle: isEn ? "Listen to Fake Lifestyle Audit" : "Starbucks Cup Aur Empty Pocket Suno",
        icon: "💳",
      };
    case "chai-startup-founder":
      return {
        title: isEn ? "Suno Pitch Evaluation 🚀" : "Suno VC Pitch Roast 🚀",
        subtitle: isEn ? "Listen to Samosa Tech Pitch" : "Unicorn In Making Ki Asliyat Suno",
        icon: "🚀",
      };
    case "treat-roulette":
      return {
        title: isEn ? "Suno Faisla 🎡" : "Suno Roulette Faisla 🎡",
        subtitle: isEn ? "Listen to Who Pays The Bill" : "Wheel Ne Kise Bakra Banaya Suno",
        icon: "🎡",
      };
    default:
      return {
        title: isEn ? "Suno Result 😂" : "Suno Result 😂",
        subtitle: isEn ? "Listen to Audio Verdict" : "Aawaz Mein Suno Asli Result",
        icon: "😂",
      };
  }
}

// 3. MASTER FUNNY VOICE SOUND ENGINE
class FunnyVoiceSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private selectedVoiceId: FunnyVoiceId = "desi-male";
  private selectedStinger: FunnySoundId | null = "laugh";
  private speedModifier: number = 1.0;
  private pitchModifier: number = 1.0;
  private volumeLevel: number = 1.0;

  // Audio Playback
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private activeAudioElements: HTMLAudioElement[] = [];
  private activeTimeouts: (number | NodeJS.Timeout)[] = [];
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = [];
  private speechState: SpeechState = "idle";
  private stateListeners: ((state: SpeechState) => void)[] = [];
  private voiceChangeListeners: ((voiceId: FunnyVoiceId) => void)[] = [];
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private isNeuralAvailable: boolean = true;
  private lastSpeakOptions: SpeakOptions | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const storedMute =
          sessionStorage.getItem("fulltimepass_sound_enabled") ??
          localStorage.getItem("fulltimepass_sound_enabled");
        if (storedMute !== null) {
          this.soundEnabled = storedMute !== "false";
        }

        const storedVoice = (sessionStorage.getItem("fulltimepass_voice_style") ??
          localStorage.getItem("fulltimepass_voice_style")) as string;
        if (storedVoice) {
          this.selectedVoiceId = normalizeVoiceId(storedVoice);
        }

        const storedStinger = (sessionStorage.getItem("fulltimepass_stinger") ??
          localStorage.getItem("fulltimepass_stinger")) as FunnySoundId;
        if (storedStinger && ["laugh", "drumroll", "cheer", "fail", "whoosh"].includes(storedStinger)) {
          this.selectedStinger = storedStinger;
        }

        const storedSpeed = parseFloat(sessionStorage.getItem("fulltimepass_voice_speed") || "1");
        if (!isNaN(storedSpeed) && storedSpeed >= 0.7 && storedSpeed <= 1.4) {
          this.speedModifier = storedSpeed;
        }
      } catch {}

      this.initVoices();
    }
  }

  private initVoices(): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => {
      try {
        this.cachedVoices = window.speechSynthesis.getVoices() || [];
      } catch {
        this.cachedVoices = [];
      }
    };
    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => load();
    }
  }

  public isSpeechSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.isSpeechSupported()) return [];
    if (!this.cachedVoices || this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    }
    return this.cachedVoices;
  }

  // --- Voice Diagnostics ---
  public getVoiceDiagnostics(language: Language = "hi"): VoiceDiagnostics {
    const cfg = FUNNY_VOICE_CONFIGS[this.selectedVoiceId] || FUNNY_VOICE_CONFIGS["desi-male"];
    const neuralName = language === "en" ? cfg.neuralVoiceNameEn : cfg.neuralVoiceNameHi;

    if (this.isNeuralAvailable) {
      return {
        isSupported: true,
        isNeuralActive: true,
        voiceCount: 8,
        activeVoiceName: neuralName,
        activeVoiceLang: language === "en" ? "en-IN / en-US" : "hi-IN",
        engineType: "neural",
        engineSummary: `High-Fidelity Neural Speech (${neuralName})`,
        engineSummaryHi: `Real Neural Voice (${neuralName}) active hai`,
      };
    }

    // Fallback status
    const voices = this.getAvailableVoices();
    const fallbackVoice = this.getBestSystemVoice(language);
    const activeName = fallbackVoice ? fallbackVoice.name : "Device Default";

    return {
      isSupported: this.isSpeechSupported(),
      isNeuralActive: false,
      voiceCount: voices.length,
      activeVoiceName: activeName,
      activeVoiceLang: fallbackVoice ? fallbackVoice.lang : "default",
      engineType: "browser-fallback",
      engineSummary: `Browser Fallback Mode (${activeName})`,
      engineSummaryHi: `Browser Speech Fallback (${activeName})`,
    };
  }

  public getBestSystemVoice(language: Language = "hi"): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (!voices || voices.length === 0) return null;

    if (language === "en") {
      const naturalEn = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("en") &&
          (v.name.toLowerCase().includes("natural") ||
            v.name.toLowerCase().includes("online") ||
            v.name.toLowerCase().includes("google") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("daniel"))
      );
      if (naturalEn) return naturalEn;
      return voices.find((v) => v.lang.toLowerCase().startsWith("en")) || voices[0];
    }

    const naturalHindi = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith("hi") &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("online") ||
          v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("swara"))
    );
    if (naturalHindi) return naturalHindi;

    const anyHindi = voices.find((v) => v.lang.toLowerCase().startsWith("hi"));
    if (anyHindi) return anyHindi;

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

    return voices.find((v) => v.default) || voices[0];
  }

  // --- Voice Style Selection & Controls ---
  public getSelectedVoiceStyle(): FunnyVoiceId {
    return this.selectedVoiceId;
  }

  public setSelectedVoiceStyle(voiceId: FunnyVoiceId): void {
    const canonical = normalizeVoiceId(voiceId);
    if (!FUNNY_VOICE_CONFIGS[canonical]) return;
    this.selectedVoiceId = canonical;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("fulltimepass_voice_style", canonical);
        localStorage.setItem("fulltimepass_voice_style", canonical);
      } catch {}
    }
    this.voiceChangeListeners.forEach((l) => l(canonical));
  }

  public subscribeVoiceStyle(listener: (voiceId: FunnyVoiceId) => void): () => void {
    this.voiceChangeListeners.push(listener);
    listener(this.selectedVoiceId);
    return () => {
      this.voiceChangeListeners = this.voiceChangeListeners.filter((l) => l !== listener);
    };
  }

  public getSpeed(): number {
    return this.speedModifier;
  }

  public setSpeed(speed: number): void {
    const clamped = Math.max(0.7, Math.min(1.4, speed));
    this.speedModifier = clamped;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("fulltimepass_voice_speed", clamped.toString());
      } catch {}
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public setVolume(volume: number): void {
    this.volumeLevel = Math.max(0, Math.min(1, volume));
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.volumeLevel;
    }
  }

  // --- Mute / Unmute Controls ---
  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("fulltimepass_sound_enabled", enabled ? "true" : "false");
        localStorage.setItem("fulltimepass_sound_enabled", enabled ? "true" : "false");
      } catch {}
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

  public getStingerSound(): FunnySoundId | null {
    return this.selectedStinger;
  }

  public setStingerSound(soundId: FunnySoundId | null): void {
    this.selectedStinger = soundId;
    if (typeof window !== "undefined") {
      try {
        if (soundId) {
          sessionStorage.setItem("fulltimepass_stinger", soundId);
          localStorage.setItem("fulltimepass_stinger", soundId);
        } else {
          sessionStorage.removeItem("fulltimepass_stinger");
          localStorage.removeItem("fulltimepass_stinger");
        }
      } catch {}
    }
  }

  // --- Speech State Listener ---
  public subscribeState(listener: (state: SpeechState) => void): () => void {
    this.stateListeners.push(listener);
    listener(this.speechState);
    return () => {
      this.stateListeners = this.stateListeners.filter((l) => l !== listener);
    };
  }

  private setSpeechState(state: SpeechState): void {
    this.speechState = state;
    this.stateListeners.forEach((l) => l(state));
  }

  public getSpeechState(): SpeechState {
    return this.speechState;
  }

  // --- Mobile Audio Unlock ---
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

  public unlockAudio(): void {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  // --- Stop All Playback ---
  public stopAll(): void {
    this.activeTimeouts.forEach((t) => clearTimeout(t));
    this.activeTimeouts = [];

    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
        this.currentAudioElement.src = "";
      } catch {}
      this.currentAudioElement = null;
    }

    this.activeAudioElements.forEach((audio) => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {}
    });
    this.activeAudioElements = [];

    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {}
    });
    this.activeNodes = [];

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    this.currentUtterance = null;
    this.setSpeechState("idle");
  }

  public cleanTextForSpeech(text: string): string {
    if (!text) return "";
    return text
      .replace(/[🔥💀😂🤡🥁🐐💨😊🚑🩹📉⚡👉🏆👤📊💬💍👑💰🕵️‍♂️⏳🛋️🎬🍕📸💳🚀🎡🚩💔🧠⚖️💁‍♀️👴🎙️🤖🎭]/g, "")
      .replace(/https?:\/\/[^\s]+/g, "")
      .replace(/[*_#~`]/g, "")
      .replace(/([.!?])\s+/g, "$1 ... ")
      .replace(/\n+/g, " ... ")
      .trim();
  }

  // --- 1. INSTANT STATIC NEURAL PREVIEW PLAYBACK ---
  /**
   * Plays the pre-generated static neural audio preview for immediate, broadcast-grade preview
   * Zero server wait, zero 429 rate limit risk!
   */
  public async previewVoice(voiceId: FunnyVoiceId, language: Language = "hi"): Promise<void> {
    const canonical = normalizeVoiceId(voiceId);
    this.setSelectedVoiceStyle(canonical);

    if (!this.soundEnabled) return;
    this.stopAll();
    this.unlockAudio();

    const cfg = FUNNY_VOICE_CONFIGS[canonical];
    const previewSrc = language === "en" ? cfg.previewAudioEn : cfg.previewAudioHi;

    try {
      this.setSpeechState("loading");
      const audio = new Audio(previewSrc);
      audio.volume = this.volumeLevel;
      this.currentAudioElement = audio;

      audio.onplay = () => this.setSpeechState("playing");
      audio.onended = () => {
        this.setSpeechState("idle");
        this.currentAudioElement = null;
      };
      audio.onerror = () => {
        // Fallback to live speak if file fails
        this.speakBrowserFallback({
          text: language === "en" ? cfg.previewEn : cfg.previewHi,
          language,
          voiceStyle: canonical,
        });
      };

      await audio.play();
    } catch {
      // Browser fallback
      this.speakBrowserFallback({
        text: language === "en" ? cfg.previewEn : cfg.previewHi,
        language,
        voiceStyle: canonical,
      });
    }
  }

  // --- 2. MASTER HIGH-FIDELITY NEURAL SPEECH SYNTHESIS ---
  /**
   * Master speak method:
   * First calls the high-quality Neural TTS API `/api/tts`.
   * If server/network is unavailable, seamlessly falls back to browser SpeechSynthesis.
   * Never autoplays; solely initiated by user gesture.
   */
  public async speak(options: SpeakOptions): Promise<void> {
    this.lastSpeakOptions = options;
    this.stopAll();

    if (!this.soundEnabled) return;
    this.unlockAudio();

    const {
      text,
      intro,
      punchline,
      language = "hi",
      voiceStyle = this.selectedVoiceId,
      speed = this.speedModifier,
      pitch = this.pitchModifier,
      soundStinger = this.selectedStinger,
      onStart,
      onEnd,
      onError,
    } = options;

    const canonical = normalizeVoiceId(voiceStyle);
    const cfg = FUNNY_VOICE_CONFIGS[canonical] || FUNNY_VOICE_CONFIGS["desi-male"];

    // Clean body text
    const cleanBody = this.cleanTextForSpeech(text);
    const cleanPunchline = punchline ? this.cleanTextForSpeech(punchline) : "";
    const personaIntro = intro || (language === "en" ? cfg.speechIntroEn : cfg.speechIntroHi);

    let finalScript = `${personaIntro} ... ${cleanBody}`;
    if (cleanPunchline) {
      finalScript += ` ... ... ${language === "en" ? "Final Punchline" : "Asli Punchline"}: ... ${cleanPunchline}!`;
    }

    this.setSpeechState("loading");

    // 1. Attempt High-Fidelity Server Neural TTS
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: finalScript,
          voice: canonical,
          language,
          speed,
          pitch,
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API returned ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.volume = this.volumeLevel;
      this.currentAudioElement = audio;

      audio.onplay = () => {
        this.setSpeechState("playing");
        this.isNeuralAvailable = true;
        if (onStart) onStart();
      };

      audio.onended = () => {
        this.setSpeechState("idle");
        this.currentAudioElement = null;
        URL.revokeObjectURL(audioUrl);

        if (soundStinger && this.soundEnabled) {
          this.playSound(soundStinger, 0.75);
        }
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        URL.revokeObjectURL(audioUrl);
        throw new Error("Neural audio decoding failed");
      };

      await audio.play();
    } catch (err: any) {
      console.warn("Neural TTS unavailable, switching to browser SpeechSynthesis fallback:", err.message);
      this.isNeuralAvailable = false;

      // 2. Graceful Fallback: Browser SpeechSynthesis
      this.speakBrowserFallback({
        text: finalScript,
        language,
        voiceStyle: canonical,
        soundStinger,
        onStart,
        onEnd,
        onError,
      });
    }
  }

  /**
   * Browser SpeechSynthesis Fallback implementation
   */
  private speakBrowserFallback(options: SpeakOptions): void {
    if (!this.isSpeechSupported()) {
      this.setSpeechState("idle");
      alert(
        options.language === "en"
          ? "Text-to-speech is not supported by your browser."
          : "Aapke browser mein text-to-speech support nahi hai."
      );
      if (options.onError) options.onError(new Error("SpeechSynthesis not supported"));
      return;
    }

    const { text, language = "hi", voiceStyle = this.selectedVoiceId, soundStinger, onStart, onEnd, onError } =
      options;
    const canonical = normalizeVoiceId(voiceStyle);
    const cfg = FUNNY_VOICE_CONFIGS[canonical] || FUNNY_VOICE_CONFIGS["desi-male"];

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getBestSystemVoice(language);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.pitch = cfg.pitch;
      utterance.rate = cfg.rate * this.speedModifier;

      utterance.onstart = () => {
        this.setSpeechState("playing");
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.setSpeechState("idle");
        this.currentUtterance = null;
        if (soundStinger && this.soundEnabled) {
          this.playSound(soundStinger, 0.7);
        }
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.setSpeechState("idle");
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      const t = setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
      this.activeTimeouts.push(t);
    } catch (err) {
      this.setSpeechState("idle");
      if (onError) onError(err);
    }
  }

  public pause(): void {
    if (this.currentAudioElement && this.speechState === "playing") {
      this.currentAudioElement.pause();
      this.setSpeechState("paused");
      return;
    }
    if (this.isSpeechSupported() && this.speechState === "playing") {
      try {
        window.speechSynthesis.pause();
        this.setSpeechState("paused");
      } catch {}
    }
  }

  public resume(): void {
    if (this.currentAudioElement && this.speechState === "paused") {
      this.currentAudioElement.play().catch(() => {});
      this.setSpeechState("playing");
      return;
    }
    if (this.isSpeechSupported() && this.speechState === "paused") {
      try {
        window.speechSynthesis.resume();
        this.setSpeechState("playing");
      } catch {}
    }
  }

  public stop(): void {
    this.stopAll();
  }

  public replay(): void {
    if (this.lastSpeakOptions) {
      this.speak(this.lastSpeakOptions);
    }
  }

  // --- Sound Effects Playback with Web Audio API Fallback ---
  public async playSound(soundId: FunnySoundId, volume: number = 0.85): Promise<void> {
    if (!this.soundEnabled) return;
    this.unlockAudio();

    const def = FUNNY_SOUND_EFFECTS.find((s) => s.id === soundId);
    if (!def) return;

    try {
      const audio = new Audio(def.src);
      audio.volume = Math.max(0, Math.min(1, volume * this.volumeLevel));
      this.activeAudioElements.push(audio);

      audio.onended = () => {
        this.activeAudioElements = this.activeAudioElements.filter((a) => a !== audio);
      };

      await audio.play();
    } catch {
      this.playSynthesizedFallback(soundId);
    }
  }

  private playSynthesizedFallback(soundId: FunnySoundId): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      if (soundId === "drumroll") {
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
      } else if (soundId === "cheer") {
        const notes = [261.63, 329.63, 392.0, 523.25];
        notes.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.25);
          this.activeNodes.push(osc);
        });
      } else {
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

// Global Singleton Export
export const funnyVoiceEngine = new FunnyVoiceSoundEngine();
