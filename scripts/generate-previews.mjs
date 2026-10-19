import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const PREVIEW_DIR = path.resolve("public/audio/previews");
if (!fs.existsSync(PREVIEW_DIR)) {
  fs.mkdirSync(PREVIEW_DIR, { recursive: true });
}

const PREVIEWS = [
  // 1. Desi Male
  { id: "desi-male_hi", voice: "hi-IN-MadhurNeural", prosody: { pitch: "+0Hz", rate: "+5%" }, text: "Arre bhai bhai bhai! Sun na, ek number comedy roast banaya hai tere liye!" },
  { id: "desi-male_en", voice: "en-IN-PrabhatNeural", prosody: { pitch: "+0Hz", rate: "+5%" }, text: "Yo bro! Listen up, I have the freshest comedy roast ready for you!" },

  // 2. Funny Female
  { id: "funny-female_hi", voice: "hi-IN-SwaraNeural", prosody: { pitch: "+0Hz", rate: "+4%" }, text: "Haan ji! Zara dhyan se suniye, aapka secret expose hone wala hai!" },
  { id: "funny-female_en", voice: "en-IN-NeerjaNeural", prosody: { pitch: "+0Hz", rate: "+4%" }, text: "Oh honey, listen up! Your hilarious secrets are officially out!" },

  // 3. Savage Friend
  { id: "savage-friend_hi", voice: "hi-IN-MadhurNeural", prosody: { pitch: "-4Hz", rate: "-2%" }, text: "Sach sunke mirchi lagegi boss, par tera asli roop yahi hai!" },
  { id: "savage-friend_en", voice: "en-IN-PrabhatNeural", prosody: { pitch: "-2Hz", rate: "+2%" }, text: "Dude, the truth hurts, but someone had to call you out!" },

  // 4. Bollywood Drama
  { id: "bollywood-drama_hi", voice: "hi-IN-MadhurNeural", prosody: { pitch: "+8Hz", rate: "-8%" }, text: "Hai tauba! Yeh kya anarth dekhna pad raha hai! Bhagwan utha le re baba!" },
  { id: "bollywood-drama_en", voice: "en-IN-NeerjaNeural", prosody: { pitch: "+6Hz", rate: "-8%" }, text: "Good heavens! The sheer cinematic tragedy of this breathtaking moment!" },

  // 5. Cartoon Character
  { id: "cartoon-character_hi", voice: "hi-IN-SwaraNeural", prosody: { pitch: "+20Hz", rate: "+15%" }, text: "Hehe haha! Boing boing! Dekho kitna mast funny joke hai!" },
  { id: "cartoon-character_en", voice: "en-US-AnaNeural", prosody: { pitch: "+12Hz", rate: "+10%" }, text: "Hehe haha! Boing boing! Look at this hilarious madness!" },

  // 6. Desi Uncle
  { id: "desi-uncle_hi", voice: "hi-IN-MadhurNeural", prosody: { pitch: "-14Hz", rate: "-10%" }, text: "Beta hamare zamaane mein na, aisi bewakoofi koi soch bhi nahi sakta tha!" },
  { id: "desi-uncle_en", voice: "en-IN-PrabhatNeural", prosody: { pitch: "-12Hz", rate: "-10%" }, text: "Listen carefully youngsters! Back in my day, we had actual discipline!" },

  // 7. News Reporter
  { id: "news-reporter_hi", voice: "hi-IN-MadhurNeural", prosody: { pitch: "+4Hz", rate: "+18%" }, text: "Breaking News! Sansanikhez khulasa seedhe hamare studio se!" },
  { id: "news-reporter_en", voice: "en-US-ChristopherNeural", prosody: { pitch: "+2Hz", rate: "+15%" }, text: "Breaking News! Sensational headlines reporting live right now!" },

  // 8. Robot
  { id: "robot_hi", voice: "en-US-GuyNeural", prosody: { pitch: "-15Hz", rate: "+0%" }, text: "Beep boop. Calculating roast level. Ek sau percent complete." },
  { id: "robot_en", voice: "en-US-GuyNeural", prosody: { pitch: "-15Hz", rate: "+0%" }, text: "Beep boop. Calculating logic index. Comedy quotient 100 percent." },
];

async function generate() {
  for (const item of PREVIEWS) {
    const outFile = path.join(PREVIEW_DIR, `${item.id}.mp3`);
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 5000) {
      console.log(`[SKIP] Already exists: ${item.id}`);
      continue;
    }

    let success = false;
    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
      const tts = new MsEdgeTTS();
      try {
        console.log(`Generating ${item.id} (attempt ${attempt})...`);
        await tts.setMetadata(item.voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.toStream(item.text, item.prosody);

        const writeStream = fs.createWriteStream(outFile);
        await new Promise((resolve, reject) => {
          audioStream.pipe(writeStream);
          writeStream.on("finish", () => {
            console.log(`[SAVED] ${outFile} (${fs.statSync(outFile).size} bytes)`);
            success = true;
            resolve();
          });
          writeStream.on("error", reject);
          audioStream.on("error", reject);
        });
        tts.close();
      } catch (err) {
        tts.close();
        console.error(`[WARN] Attempt ${attempt} failed for ${item.id}: ${err.message}`);
        await new Promise(r => setTimeout(r, 4000));
      }
    }
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log("All previews verified!");
  process.exit(0);
}

generate().catch(console.error);
