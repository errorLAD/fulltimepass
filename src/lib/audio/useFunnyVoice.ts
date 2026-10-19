"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  funnyVoiceEngine,
  FUNNY_VOICE_CONFIGS,
  FUNNY_VOICES_LIST,
  FUNNY_SOUND_EFFECTS,
} from "./funnyVoiceEngine";
import {
  FunnyVoiceId,
  FunnySoundId,
  FunnyVoiceConfig,
  SpeechState,
  VoiceDiagnostics,
  SpeakOptions,
} from "./funnyVoiceTypes";
import { Language } from "../language/types";

export function useFunnyVoice(language: Language = "hi") {
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedVoiceId, setSelectedVoiceId] = useState<FunnyVoiceId>("desi-male");
  const [speed, setSpeedState] = useState<number>(1.0);
  const [volume, setVolumeState] = useState<number>(1.0);
  const [activeSoundId, setActiveSoundId] = useState<FunnySoundId | null>(null);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<FunnyVoiceId | null>(null);
  const [stinger, setStinger] = useState<FunnySoundId | null>("laugh");
  const [diagnostics, setDiagnostics] = useState<VoiceDiagnostics>({
    isSupported: true,
    voiceCount: 8,
    activeVoiceName: "hi-IN-MadhurNeural",
    activeVoiceLang: "hi-IN",
    hasHindiVoice: true,
    hasIndianEnVoice: true,
    isNeuralActive: true,
    engineType: "neural",
    engineSummary: "Detecting neural speech engine...",
    engineSummaryHi: "Neural voice engine check ho raha hai...",
  });

  const lastSpeakOptionsRef = useRef<SpeakOptions | null>(null);

  useEffect(() => {
    // Initial sync
    setSoundEnabled(funnyVoiceEngine.isEnabled());
    setSelectedVoiceId(funnyVoiceEngine.getSelectedVoiceStyle());
    setSpeedState(funnyVoiceEngine.getSpeed());
    setVolumeState(funnyVoiceEngine.getVolume());
    setStinger(funnyVoiceEngine.getStingerSound());
    setDiagnostics(funnyVoiceEngine.getVoiceDiagnostics(language));

    // Listen to speech state changes
    const unsubState = funnyVoiceEngine.subscribeState((state) => {
      setSpeechState(state);
      if (state === "idle") {
        setPreviewingVoiceId(null);
      }
    });

    // Listen to voice style changes
    const unsubVoice = funnyVoiceEngine.subscribeVoiceStyle((vId) => {
      setSelectedVoiceId(vId);
      setDiagnostics(funnyVoiceEngine.getVoiceDiagnostics(language));
    });

    return () => {
      unsubState();
      unsubVoice();
      funnyVoiceEngine.stopAll();
    };
  }, [language]);

  const selectVoice = useCallback((vId: FunnyVoiceId) => {
    funnyVoiceEngine.setSelectedVoiceStyle(vId);
    setSelectedVoiceId(vId);
  }, []);

  const previewVoice = useCallback(
    (vId: FunnyVoiceId) => {
      setPreviewingVoiceId(vId);
      selectVoice(vId);
      funnyVoiceEngine.previewVoice(vId, language);
    },
    [language, selectVoice]
  );

  const toggleMute = useCallback(() => {
    const next = funnyVoiceEngine.toggleSound();
    setSoundEnabled(next);
  }, []);

  const playSound = useCallback(async (sId: FunnySoundId) => {
    setActiveSoundId(sId);
    await funnyVoiceEngine.playSound(sId);
    setTimeout(() => {
      setActiveSoundId((prev) => (prev === sId ? null : prev));
    }, 1200);
  }, []);

  const speak = useCallback(
    (options: SpeakOptions) => {
      lastSpeakOptionsRef.current = options;
      funnyVoiceEngine.speak({
        ...options,
        language: options.language || language,
        voiceStyle: options.voiceStyle || selectedVoiceId,
      });
    },
    [language, selectedVoiceId]
  );

  const pause = useCallback(() => {
    funnyVoiceEngine.pause();
  }, []);

  const resume = useCallback(() => {
    funnyVoiceEngine.resume();
  }, []);

  const stop = useCallback(() => {
    funnyVoiceEngine.stop();
  }, []);

  const replay = useCallback(() => {
    if (lastSpeakOptionsRef.current) {
      speak(lastSpeakOptionsRef.current);
    }
  }, [speak]);

  const setSpeed = useCallback((s: number) => {
    funnyVoiceEngine.setSpeed(s);
    setSpeedState(s);
  }, []);

  const setVolume = useCallback((v: number) => {
    funnyVoiceEngine.setVolume(v);
    setVolumeState(v);
  }, []);

  const updateStinger = useCallback((sId: FunnySoundId | null) => {
    setStinger(sId);
    funnyVoiceEngine.setStingerSound(sId);
  }, []);

  return {
    speechState,
    soundEnabled,
    selectedVoiceId,
    selectedVoiceConfig: FUNNY_VOICE_CONFIGS[selectedVoiceId] || FUNNY_VOICE_CONFIGS["desi-male"],
    availableVoiceConfigs: FUNNY_VOICES_LIST,
    soundEffects: FUNNY_SOUND_EFFECTS,
    speed,
    volume,
    activeSoundId,
    previewingVoiceId,
    stinger,
    diagnostics,
    selectVoice,
    previewVoice,
    toggleMute,
    setSpeed,
    setVolume,
    playSound,
    speak,
    pause,
    resume,
    stop,
    replay,
    updateStinger,
  };
}
