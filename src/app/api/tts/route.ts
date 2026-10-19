import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory LRU cache for synthesized neural audio buffers (max 150 items)
const audioCache = new Map<string, { buffer: Buffer; contentType: string; timestamp: number }>();
const MAX_CACHE_SIZE = 150;

// Voice map with exact Microsoft Neural speech voice names and fine-tuned prosody
const NEURAL_VOICE_MAP: Record<
  string,
  {
    voiceHi: string;
    voiceEn: string;
    prosody: { pitch: string; rate: string };
  }
> = {
  "desi-male": {
    voiceHi: "hi-IN-MadhurNeural",
    voiceEn: "en-IN-PrabhatNeural",
    prosody: { pitch: "+0Hz", rate: "+5%" },
  },
  "funny-female": {
    voiceHi: "hi-IN-SwaraNeural",
    voiceEn: "en-IN-NeerjaNeural",
    prosody: { pitch: "+0Hz", rate: "+4%" },
  },
  "savage-friend": {
    voiceHi: "hi-IN-MadhurNeural",
    voiceEn: "en-IN-PrabhatNeural",
    prosody: { pitch: "-4Hz", rate: "-2%" },
  },
  "bollywood-drama": {
    voiceHi: "hi-IN-MadhurNeural",
    voiceEn: "en-IN-NeerjaNeural",
    prosody: { pitch: "+8Hz", rate: "-8%" },
  },
  "cartoon-character": {
    voiceHi: "hi-IN-SwaraNeural",
    voiceEn: "en-US-AnaNeural",
    prosody: { pitch: "+16Hz", rate: "+12%" },
  },
  "desi-uncle": {
    voiceHi: "hi-IN-MadhurNeural",
    voiceEn: "en-IN-PrabhatNeural",
    prosody: { pitch: "-14Hz", rate: "-10%" },
  },
  "news-reporter": {
    voiceHi: "hi-IN-MadhurNeural",
    voiceEn: "en-US-ChristopherNeural",
    prosody: { pitch: "+3Hz", rate: "+18%" },
  },
  robot: {
    voiceHi: "en-US-GuyNeural",
    voiceEn: "en-US-GuyNeural",
    prosody: { pitch: "-15Hz", rate: "+0%" },
  },
};

// Clean text for speech synthesis
function cleanText(raw: string): string {
  return raw
    .replace(/[🔥💀😂🤡🥁🐐💨😊🚑🩹📉⚡👉🏆👤📊💬💍👑💰🕵️‍♂️⏳🛋️🎬🍕📸💳🚀🎡🚩💔🧠⚖️💁‍♀️👴🎙️🤖🎭]/g, "")
    .replace(/https?:\/\/[^\s]+/g, "")
    .replace(/[*_#~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function synthesizeNeuralAudio(
  text: string,
  voiceId: string = "desi-male",
  language: string = "hi",
  speedModifier?: number,
  pitchModifier?: number
): Promise<Buffer> {
  const mapping = NEURAL_VOICE_MAP[voiceId] || NEURAL_VOICE_MAP["desi-male"];
  const voiceName = language === "en" ? mapping.voiceEn : mapping.voiceHi;

  // Calculate prosody rates
  let rate = mapping.prosody.rate;
  let pitch = mapping.prosody.pitch;

  if (speedModifier && speedModifier !== 1) {
    const pct = Math.round((speedModifier - 1) * 100);
    rate = `${pct >= 0 ? "+" : ""}${pct}%`;
  }
  if (pitchModifier && pitchModifier !== 1) {
    const hz = Math.round((pitchModifier - 1) * 20);
    pitch = `${hz >= 0 ? "+" : ""}${hz}Hz`;
  }

  // Pre-clean text to 600 chars max to prevent abuse
  const cleaned = cleanText(text).slice(0, 800);
  if (!cleaned) {
    throw new Error("Text is empty after sanitization");
  }

  const tts = new MsEdgeTTS();
  await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(cleaned, { pitch, rate });

  const chunks: Buffer[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
    audioStream.on("end", () => {
      tts.close();
      resolve(Buffer.concat(chunks));
    });
    audioStream.on("error", (err: Error) => {
      tts.close();
      reject(err);
    });
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  const voice = searchParams.get("voice") || "desi-male";
  const language = searchParams.get("lang") || "hi";
  const speed = parseFloat(searchParams.get("speed") || "1");
  const pitch = parseFloat(searchParams.get("pitch") || "1");

  if (!text) {
    return NextResponse.json({ error: "Missing 'text' query parameter" }, { status: 400 });
  }

  return handleSynthesis(text, voice, language, speed, pitch);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voice = "desi-male", language = "hi", speed = 1, pitch = 1 } = body;

    if (!text) {
      return NextResponse.json({ error: "Missing 'text' in body" }, { status: 400 });
    }

    return handleSynthesis(text, voice, language, speed, pitch);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Invalid JSON" }, { status: 400 });
  }
}

async function handleSynthesis(
  text: string,
  voice: string,
  language: string,
  speed: number,
  pitch: number
) {
  const cacheKey = crypto
    .createHash("md5")
    .update(`${voice}_${language}_${speed}_${pitch}_${text}`)
    .digest("hex");

  // 1. Check in-memory cache
  const cached = audioCache.get(cacheKey);
  if (cached) {
    return new NextResponse(cached.buffer as any, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-TTS-Source": "cache",
      },
    });
  }

  // 2. Synthesize with Neural TTS
  try {
    const buffer = await synthesizeNeuralAudio(text, voice, language, speed, pitch);

    // Save to cache
    if (audioCache.size >= MAX_CACHE_SIZE) {
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(cacheKey, { buffer, contentType: "audio/mpeg", timestamp: Date.now() });

    return new NextResponse(buffer as any, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-TTS-Source": "neural-live",
      },
    });
  } catch (err: any) {
    console.error("Neural TTS Synthesis Error:", err);
    return NextResponse.json(
      {
        error: "Neural TTS synthesis unavailable",
        message: err?.message || "Rate limit or network error",
        fallbackToBrowser: true,
      },
      { status: 503 }
    );
  }
}
