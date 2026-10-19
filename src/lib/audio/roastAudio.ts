// Roast Sound Engine for Roast My Friend 🔥
// Bridged with the Unified Shared Funny Voice & Sound Effects Engine

import { Language } from "../language/types";
import { funnyVoiceEngine, FUNNY_SOUND_EFFECTS, FUNNY_VOICE_CONFIGS } from "./funnyVoiceEngine";
import { FunnySoundId, FunnyVoiceId, SpeechState as UnifiedSpeechState } from "./funnyVoiceTypes";

export type ComedySoundId = FunnySoundId;
export type VoiceStyle = "desi" | "savage" | "chipmunk" | "fast" | FunnyVoiceId;

export interface ComedySoundDef {
  id: ComedySoundId;
  label: string;
  labelHi: string;
  emoji: string;
  src: string;
  description: string;
  descriptionHi: string;
}

export const COMEDY_SOUNDS: ComedySoundDef[] = FUNNY_SOUND_EFFECTS.map((s) => ({
  id: s.id,
  label: s.label,
  labelHi: s.labelHi,
  emoji: s.emoji,
  src: s.src,
  description: s.description,
  descriptionHi: s.descriptionHi,
}));

export interface RoastVoiceConfig {
  style: VoiceStyle;
  rate: number;
  pitch: number;
  label: string;
  emoji: string;
}

export const ROAST_VOICE_STYLES: Record<string, RoastVoiceConfig> = {
  desi: {
    style: "desi",
    rate: 1.05,
    pitch: 1.05,
    label: "Desi Bhai",
    emoji: "😎",
  },
  savage: {
    style: "savage",
    rate: 0.94,
    pitch: 0.88,
    label: "Savage Roaster",
    emoji: "🕶️",
  },
  chipmunk: {
    style: "chipmunk",
    rate: 1.18,
    pitch: 1.58,
    label: "Cartoon Clown",
    emoji: "🤡",
  },
  fast: {
    style: "fast",
    rate: 1.28,
    pitch: 1.12,
    label: "News Reporter",
    emoji: "🎙️",
  },
  "comedy-uncle": {
    style: "comedy-uncle",
    rate: 0.88,
    pitch: 0.78,
    label: "Comedy Uncle",
    emoji: "👴",
  },
  "bollywood-drama": {
    style: "bollywood-drama",
    rate: 0.86,
    pitch: 1.18,
    label: "Bollywood Drama",
    emoji: "🎭",
  },
  "robot-voice": {
    style: "robot-voice",
    rate: 1.02,
    pitch: 0.65,
    label: "Robot Voice",
    emoji: "🤖",
  },
};

export type SpeechState = UnifiedSpeechState;

class RoastSoundEngineBridge {
  public isEnabled(): boolean {
    return funnyVoiceEngine.isEnabled();
  }

  public setSoundEnabled(enabled: boolean): void {
    funnyVoiceEngine.setSoundEnabled(enabled);
  }

  public toggleSound(): boolean {
    return funnyVoiceEngine.toggleSound();
  }

  public setStingerSound(soundId: ComedySoundId | null): void {
    funnyVoiceEngine.setStingerSound(soundId);
  }

  public getStingerSound(): ComedySoundId | null {
    return funnyVoiceEngine.getStingerSound();
  }

  public unlockAudio(): void {
    funnyVoiceEngine.unlockAudio();
  }

  public stopAll(): void {
    funnyVoiceEngine.stopAll();
  }

  public subscribeState(listener: (state: SpeechState) => void): () => void {
    return funnyVoiceEngine.subscribeState(listener);
  }

  public getSpeechState(): SpeechState {
    return funnyVoiceEngine.getSpeechState();
  }

  public isSpeechSupported(): boolean {
    return funnyVoiceEngine.isSpeechSupported();
  }

  public getBestVoice(language: Language = "hi"): SpeechSynthesisVoice | null {
    return funnyVoiceEngine.getBestSystemVoice(language);
  }

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
    let mappedVoiceId: FunnyVoiceId = "desi-bhai";
    if (style === "savage") mappedVoiceId = "savage-roaster";
    else if (style === "chipmunk") mappedVoiceId = "cartoon-clown";
    else if (style === "fast") mappedVoiceId = "news-reporter";
    else if (style === "comedy-uncle") mappedVoiceId = "comedy-uncle";
    else if (style === "bollywood-drama") mappedVoiceId = "bollywood-drama";
    else if (style === "robot-voice") mappedVoiceId = "robot-voice";
    else if (style === "desi-bhai" || style === "desi") mappedVoiceId = "desi-bhai";

    const isEn = language === "en";
    const intro = isEn
      ? `Attention everyone! ... Here is the certified roast audit for ${friendName}!`
      : `Oye sunno sab log! ... ${friendName} ki official beizzati report hazir hai!`;

    funnyVoiceEngine.speak({
      text: description,
      intro,
      punchline,
      language,
      voiceStyle: mappedVoiceId,
      onEnd: onFinish,
    });
  }

  public pauseRoast(): void {
    funnyVoiceEngine.pause();
  }

  public resumeRoast(): void {
    funnyVoiceEngine.resume();
  }

  public stopRoast(): void {
    funnyVoiceEngine.stop();
  }

  public async playSound(soundId: ComedySoundId, volume: number = 0.85): Promise<void> {
    await funnyVoiceEngine.playSound(soundId, volume);
  }
}

export const roastAudio = new RoastSoundEngineBridge();
