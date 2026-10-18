const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 22050; // High quality and small file size (mono)

function createWavBuffer(samples, sampleRate = SAMPLE_RATE) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF identifier
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // SubChunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // write 16-bit PCM samples
  for (let i = 0; i < samples.length; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.floor(val), 44 + i * 2);
  }

  return buffer;
}

// 1. Drumroll Sound (~2.7s)
function generateDrumroll() {
  const duration = 2.7;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // Snare roll: 0 to 2.2s with accelerating and intensifying hits
  const rollDuration = 2.2;
  const rollSamples = Math.floor(rollDuration * SAMPLE_RATE);

  for (let i = 0; i < rollSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / rollDuration;
    const hitRate = 22 + progress * 16; // 22 to 38 hits/sec
    const hitPhase = (t * hitRate) % 1;
    
    // Snare hit envelope
    const hitEnv = Math.exp(-hitPhase * 18);
    // Noise component
    const noise = (Math.random() * 2 - 1) * hitEnv;
    // Shell resonance (around 180Hz)
    const shell = Math.sin(2 * Math.PI * 180 * t) * hitEnv * 0.5;

    // Master volume swell
    const swell = 0.15 + 0.65 * Math.pow(progress, 1.8);
    samples[i] = (noise * 0.7 + shell * 0.3) * swell;
  }

  // Crash Cymbal + Bass Kick at 2.2s
  const crashStart = Math.floor(2.2 * SAMPLE_RATE);
  for (let i = crashStart; i < totalSamples; i++) {
    const t = (i - crashStart) / SAMPLE_RATE;
    // Kick drum
    const kickFreq = 120 * Math.exp(-t * 25) + 40;
    const kickEnv = Math.exp(-t * 8);
    const kick = Math.sin(2 * Math.PI * kickFreq * t) * kickEnv * 0.7;

    // Crash cymbal (decaying highpass noise)
    const cymbalEnv = Math.exp(-t * 3.5);
    const cymbalNoise = (Math.random() * 2 - 1) * cymbalEnv * 0.5;
    const ring = Math.sin(2 * Math.PI * 520 * t) * Math.exp(-t * 4) * 0.15;

    samples[i] += (kick + cymbalNoise + ring) * 0.9;
  }

  return samples;
}

// 2. Cartoon Laughing (~2.2s)
function generateLaugh() {
  const duration = 2.2;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // 6 laugh bursts: "Ha - Ha - Ha - Ha - Heee - Hoo"
  const bursts = [
    { start: 0.05, dur: 0.22, freq: 280, endFreq: 240, type: 'ha' },
    { start: 0.35, dur: 0.22, freq: 310, endFreq: 260, type: 'ha' },
    { start: 0.65, dur: 0.22, freq: 330, endFreq: 270, type: 'ha' },
    { start: 0.95, dur: 0.24, freq: 360, endFreq: 290, type: 'ha' },
    { start: 1.28, dur: 0.35, freq: 410, endFreq: 340, type: 'hee' },
    { start: 1.70, dur: 0.40, freq: 320, endFreq: 210, type: 'hoo' },
  ];

  bursts.forEach(b => {
    const startSample = Math.floor(b.start * SAMPLE_RATE);
    const count = Math.floor(b.dur * SAMPLE_RATE);

    for (let j = 0; j < count && (startSample + j) < totalSamples; j++) {
      const t = j / SAMPLE_RATE;
      const progress = j / count;
      const freq = b.freq + (b.endFreq - b.freq) * progress;

      // Vocal formant envelope
      const env = Math.sin(progress * Math.PI);
      const wobble = 1 + 0.08 * Math.sin(2 * Math.PI * 14 * t);

      // Fundamental + Formants (rich comedic vocal tone)
      const f1 = Math.sin(2 * Math.PI * freq * wobble * t);
      const f2 = Math.sin(2 * Math.PI * freq * 2.2 * wobble * t) * 0.4;
      const f3 = Math.sin(2 * Math.PI * freq * 3.5 * wobble * t) * 0.2;
      const breath = (Math.random() * 2 - 1) * 0.12;

      samples[startSample + j] += (f1 + f2 + f3 + breath) * env * 0.65;
    }
  });

  return samples;
}

// 3. Funny Fail Sound (Sad Trombone ~2.4s)
function generateFail() {
  const duration = 2.4;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // Sad Trombone: 4 notes descending
  // Eb4 (311.1), D4 (293.7), Db4 (277.2), C4 sliding down with heavy vibrato (261.6 -> 220)
  const notes = [
    { start: 0.05, dur: 0.38, freq: 311.1, slide: 308 },
    { start: 0.48, dur: 0.38, freq: 293.7, slide: 290 },
    { start: 0.92, dur: 0.38, freq: 277.2, slide: 272 },
    { start: 1.36, dur: 0.95, freq: 261.6, slide: 215, vibrato: true },
  ];

  notes.forEach(n => {
    const startSample = Math.floor(n.start * SAMPLE_RATE);
    const count = Math.floor(n.dur * SAMPLE_RATE);

    for (let j = 0; j < count && (startSample + j) < totalSamples; j++) {
      const t = j / SAMPLE_RATE;
      const progress = j / count;
      let freq = n.freq + (n.slide - n.freq) * progress;

      if (n.vibrato) {
        // comical wah-wah vibrato
        const vib = Math.sin(2 * Math.PI * 7.5 * t) * 12;
        freq += vib;
      }

      // Attack and release envelope
      let env = 1;
      if (progress < 0.1) env = progress / 0.1;
      else env = Math.pow(1 - (progress - 0.1) / 0.9, 0.6);

      // Brass-like sawtooth harmonics
      let brass = 0;
      for (let h = 1; h <= 6; h++) {
        brass += (Math.sin(2 * Math.PI * freq * h * t) / h) * (h % 2 === 0 ? 0.6 : 1);
      }

      // Wah-wah mute effect
      const wah = n.vibrato ? (0.7 + 0.3 * Math.sin(2 * Math.PI * 7.5 * t)) : 1;

      samples[startSample + j] += brass * env * wah * 0.45;
    }
  });

  return samples;
}

// 4. Circus Comedy Sound (~2.0s)
function generateCircus() {
  const duration = 2.0;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // Clown Horn: 2 squeaks (0.05s and 0.28s)
  [0.05, 0.28].forEach(start => {
    const startSample = Math.floor(start * SAMPLE_RATE);
    const count = Math.floor(0.18 * SAMPLE_RATE);
    for (let j = 0; j < count && (startSample + j) < totalSamples; j++) {
      const t = j / SAMPLE_RATE;
      const env = Math.sin((j / count) * Math.PI);
      const tone1 = Math.sin(2 * Math.PI * 680 * t);
      const tone2 = Math.sin(2 * Math.PI * 890 * t) * 0.7;
      samples[startSample + j] += (tone1 + tone2) * env * 0.5;
    }
  });

  // Spring Boing at 0.55s
  const boingStart = Math.floor(0.55 * SAMPLE_RATE);
  const boingCount = Math.floor(0.45 * SAMPLE_RATE);
  for (let j = 0; j < boingCount && (boingStart + j) < totalSamples; j++) {
    const t = j / SAMPLE_RATE;
    const progress = j / boingCount;
    // frequency sweeps up then oscillates
    const freq = 220 + Math.pow(progress, 0.5) * 600 + Math.sin(2 * Math.PI * 25 * t) * 80;
    const env = Math.exp(-progress * 4.5);
    const osc = Math.sin(2 * Math.PI * freq * t);
    samples[boingStart + j] += osc * env * 0.45;
  }

  // Mini circus brass fanfare chord at 1.1s (G, B, D, G)
  const fanfareStart = Math.floor(1.05 * SAMPLE_RATE);
  const fanfareCount = Math.floor(0.85 * SAMPLE_RATE);
  const freqs = [392.0, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
  for (let j = 0; j < fanfareCount && (fanfareStart + j) < totalSamples; j++) {
    const t = j / SAMPLE_RATE;
    const progress = j / fanfareCount;
    const env = Math.exp(-progress * 3.5);
    let chord = 0;
    freqs.forEach(f => {
      chord += Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 2 * t);
    });
    samples[fanfareStart + j] += chord * env * 0.16;
  }

  return samples;
}

// 5. Crowd Cheering (~2.5s)
function generateCheer() {
  const duration = 2.5;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // Layer 1: Clapping bursts
  const numClaps = 350;
  for (let c = 0; c < numClaps; c++) {
    const clapTime = 0.1 + Math.random() * 2.3;
    const clapStart = Math.floor(clapTime * SAMPLE_RATE);
    const clapDur = Math.floor(0.025 * SAMPLE_RATE);
    const vol = (0.2 + Math.random() * 0.4) * Math.sin((clapTime / duration) * Math.PI);

    for (let j = 0; j < clapDur && (clapStart + j) < totalSamples; j++) {
      const env = Math.exp(-(j / clapDur) * 12);
      const clapNoise = (Math.random() * 2 - 1) * env * vol;
      samples[clapStart + j] += clapNoise * 0.4;
    }
  }

  // Layer 2: Crowd vocal cheering swell ("Woooo-Yaaay!")
  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;
    const swell = Math.sin(progress * Math.PI);
    
    // Vocal harmonic wash
    const voice1 = Math.sin(2 * Math.PI * (440 + 60 * Math.sin(t * 3)) * t);
    const voice2 = Math.sin(2 * Math.PI * (554 + 50 * Math.cos(t * 2.5)) * t);
    const voice3 = Math.sin(2 * Math.PI * (659 + 40 * Math.sin(t * 4)) * t);
    const ambientNoise = (Math.random() * 2 - 1) * 0.3;

    samples[i] += ((voice1 + voice2 + voice3) * 0.12 + ambientNoise * 0.25) * swell * 0.7;
  }

  // Layer 3: High whistle glissando at 0.5s to 1.3s
  const whistleStart = Math.floor(0.5 * SAMPLE_RATE);
  const whistleDur = Math.floor(0.8 * SAMPLE_RATE);
  for (let j = 0; j < whistleDur && (whistleStart + j) < totalSamples; j++) {
    const t = j / SAMPLE_RATE;
    const progress = j / whistleDur;
    const freq = 1400 + Math.sin(progress * Math.PI) * 1100;
    const env = Math.sin(progress * Math.PI) * 0.25;
    samples[whistleStart + j] += Math.sin(2 * Math.PI * freq * t) * env;
  }

  return samples;
}

// 6. Funny Goat Bleat (~1.8s)
function generateGoat() {
  const duration = 1.8;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // The hilarious meme goat: "MEEEE-E-E-E-E-E-E-E-H!"
  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;

    // Volume envelope
    let env = 1;
    if (progress < 0.1) env = progress / 0.1;
    else if (progress > 0.8) env = (1 - progress) / 0.2;
    else env = 1;

    // Fast 19Hz goat vibrato / tremolo
    const vibratoFreq = 19.5;
    const vibrato = Math.sin(2 * Math.PI * vibratoFreq * t);
    const tremolo = 0.5 + 0.5 * Math.sin(2 * Math.PI * vibratoFreq * t);

    // Fundamental frequency slides up then droops
    let baseFreq = 260;
    if (progress < 0.4) baseFreq = 260 + (progress / 0.4) * 80;
    else baseFreq = 340 - ((progress - 0.4) / 0.6) * 90;

    const pitchMod = baseFreq + vibrato * 35;

    // Nasal goat vocal harmonics (odd + even harmonics with high resonance)
    let vocal = 0;
    for (let h = 1; h <= 8; h++) {
      vocal += (Math.sin(2 * Math.PI * pitchMod * h * t) / Math.sqrt(h));
    }

    // Comedic raspy throat noise
    const rasp = (Math.random() * 2 - 1) * 0.18;

    samples[i] = (vocal * 0.4 + rasp) * env * tremolo * 0.75;
  }

  return samples;
}

// 7. Cartoon Whoosh (~0.7s)
function generateWhoosh() {
  const duration = 0.7;
  const totalSamples = Math.floor(duration * SAMPLE_RATE);
  const samples = new Float32Array(totalSamples);

  // Fast cartoon swoosh: bandpassed noise sweeping up and down
  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / duration;

    // Volume envelope peaking around 0.4
    const env = Math.pow(Math.sin(progress * Math.PI), 2.2);

    // Filter frequency sweep: 250Hz -> 2800Hz -> 300Hz
    const centerFreq = 250 + Math.sin(progress * Math.PI) * 2550;
    
    // Approximate resonant noise through modulation
    const noise = (Math.random() * 2 - 1);
    const carrier = Math.sin(2 * Math.PI * centerFreq * t);
    const carrier2 = Math.sin(2 * Math.PI * centerFreq * 1.5 * t) * 0.5;

    samples[i] = (noise * 0.4 + (noise * carrier * 0.6) + carrier2 * 0.15) * env * 0.85;
  }

  return samples;
}

// Generate all sound effects
const soundsDir = path.join(__dirname, '..', 'public', 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

const list = [
  { name: 'drumroll.wav', fn: generateDrumroll },
  { name: 'laugh.wav', fn: generateLaugh },
  { name: 'fail.wav', fn: generateFail },
  { name: 'circus.wav', fn: generateCircus },
  { name: 'cheer.wav', fn: generateCheer },
  { name: 'goat.wav', fn: generateGoat },
  { name: 'whoosh.wav', fn: generateWhoosh },
];

console.log('Generating comedy sound effects into public/sounds/...');
list.forEach(item => {
  const samples = item.fn();
  const buffer = createWavBuffer(samples, SAMPLE_RATE);
  const outPath = path.join(soundsDir, item.name);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated ${item.name} (${(buffer.length / 1024).toFixed(1)} KB)`);
});
console.log('All 7 sound effects created successfully!');
