"use client";

import React from "react";
import GameAudioBar from "@/components/audio/GameAudioBar";
import { Language } from "@/lib/language/types";

interface RoastAudioControlsProps {
  friendName: string;
  description: string;
  punchline?: string;
  language: Language;
}

export default function RoastAudioControls({
  friendName,
  description,
  punchline,
  language,
}: RoastAudioControlsProps) {
  const isEn = language === "en";

  return (
    <GameAudioBar
      toolSlug="roast-my-friend"
      customAudioTitle={isEn ? "Suno Roast 🔥" : "Suno Roast 🔥"}
      customAudioSubtitle={
        isEn
          ? `Listen to ${friendName}'s savage comedy roast aloud`
          : `${friendName} ki official beizzati aawaz mein suniye`
      }
      targetName={friendName}
      description={description}
      punchline={punchline}
      language={language}
      defaultExpanded={true}
    />
  );
}
