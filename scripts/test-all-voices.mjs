import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const ALL_8_VOICES = [
  { id: "desi-male", voice: "hi-IN-MadhurNeural", prosody: { pitch: "+0Hz", rate: "+5%" }, text: "Arre bhai bhai bhai! Sun na, ek number comedy roast banaya hai tere liye!" },
  { id: "funny-female", voice: "hi-IN-SwaraNeural", prosody: { pitch: "+0Hz", rate: "+4%" }, text: "Haan ji! Zara dhyan se suniye, aapka secret expose hone wala hai!" },
  { id: "savage-friend", voice: "en-IN-PrabhatNeural", prosody: { pitch: "-2Hz", rate: "+2%" }, text: "Sach sunke mirchi lagegi boss, par tera asli roop yahi hai!" },
  { id: "bollywood-drama", voice: "hi-IN-MadhurNeural", prosody: { pitch: "+8Hz", rate: "-8%" }, text: "Hai tauba! Yeh anarth kaise ho gaya! Bhagwan utha le re baba!" },
  { id: "cartoon-character", voice: "en-US-AnaNeural", prosody: { pitch: "+12Hz", rate: "+10%" }, text: "Hehe haha! Boing boing! Dekho kitna mast funny joke hai!" },
  { id: "desi-uncle", voice: "hi-IN-MadhurNeural", prosody: { pitch: "-12Hz", rate: "-10%" }, text: "Beta hamare zamaane mein na, aisi bewakoofi koi soch bhi nahi sakta tha!" },
  { id: "news-reporter", voice: "en-US-ChristopherNeural", prosody: { pitch: "+2Hz", rate: "+15%" }, text: "Breaking News! Sensational headlines reporting live right now!" },
  { id: "robot", voice: "en-US-GuyNeural", prosody: { pitch: "-15Hz", rate: "+0%" }, text: "Beep boop. Calculating logic index. Comedy quotient 100 percent." }
];

async function run() {
  console.log("Testing with single reused MsEdgeTTS instance...");
  const tts = new MsEdgeTTS();
  
  for (const item of ALL_8_VOICES) {
    try {
      await tts.setMetadata(item.voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(item.text, item.prosody);
      
      await new Promise((resolve, reject) => {
        let total = 0;
        audioStream.on("data", c => { total += c.length; });
        audioStream.on("end", () => {
          console.log(`[PASS] ${item.id.padEnd(18)} (${item.voice}) -> ${total} bytes MP3`);
          resolve();
        });
        audioStream.on("error", err => {
          reject(err);
        });
      });
      // Small pause between requests
      await new Promise(r => setTimeout(r, 600));
    } catch (e) {
      console.error(`[FAIL] ${item.id}:`, e.message);
    }
  }
  tts.close();
  process.exit(0);
}

run().catch(e => {
  console.error("Test failed:", e);
  process.exit(1);
});
