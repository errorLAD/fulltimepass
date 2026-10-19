import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

async function test() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("hi-IN-MadhurNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  console.log("Synthesizing speech with hi-IN-MadhurNeural...");
  
  const { audioStream } = tts.toStream("Arre bhai bhai bhai! Sun na, kya bawaal roast banaya hai!");
  
  let chunks = [];
  audioStream.on("data", (chunk) => {
    chunks.push(chunk);
  });
  
  audioStream.on("end", () => {
    const totalBytes = chunks.reduce((acc, c) => acc + c.length, 0);
    console.log("Success! Generated neural MP3 audio bytes:", totalBytes);
    tts.close();
    process.exit(0);
  });
  
  audioStream.on("error", (err) => {
    console.error("TTS stream error:", err);
    tts.close();
    process.exit(1);
  });
}

test().catch((e) => {
  console.error(e);
  process.exit(1);
});
