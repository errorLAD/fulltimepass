import { Language } from "../language/types";

export type FunnyVoiceId =
  | "desi-male"
  | "funny-female"
  | "savage-friend"
  | "bollywood-drama"
  | "cartoon-character"
  | "desi-uncle"
  | "news-reporter"
  | "robot"
  // Legacy aliases
  | "desi-bhai"
  | "comedy-uncle"
  | "cartoon-clown"
  | "savage-roaster"
  | "robot-voice";

export type FunnySoundId =
  | "drumroll"
  | "laugh"
  | "fail"
  | "cheer"
  | "whoosh"
  | "circus"
  | "goat";

export type SpeechState = "idle" | "loading" | "playing" | "paused";

export interface FunnyVoiceConfig {
  id: FunnyVoiceId;
  label: string;
  labelHi: string;
  tagline: string;
  taglineHi: string;
  emoji: string;
  color: string;
  gradient: string;
  rate: number;
  pitch: number;
  previewHi: string;
  previewEn: string;
  previewAudioHi: string;
  previewAudioEn: string;
  speechIntroHi: string;
  speechIntroEn: string;
  description: string;
  neuralVoiceNameHi: string;
  neuralVoiceNameEn: string;
}

export interface SoundEffectDef {
  id: FunnySoundId;
  label: string;
  labelHi: string;
  emoji: string;
  src: string;
  description: string;
  descriptionHi: string;
}

export interface VoiceDiagnostics {
  isSupported: boolean;
  isNeuralActive: boolean;
  voiceCount: number;
  activeVoiceName: string;
  activeVoiceLang: string;
  engineType: "neural" | "browser-fallback";
  engineSummary: string;
  engineSummaryHi: string;
  hasHindiVoice?: boolean;
  hasIndianEnVoice?: boolean;
}

export interface SpeakOptions {
  text: string;
  intro?: string;
  punchline?: string;
  language?: Language;
  voiceStyle?: FunnyVoiceId;
  speed?: number; // 0.8 to 1.3
  pitch?: number; // 0.8 to 1.3
  volume?: number; // 0.0 to 1.0
  soundStinger?: FunnySoundId | null;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}
