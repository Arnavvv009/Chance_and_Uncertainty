/* =========================================================================
   OFFLINE AUDIO GENERATION SCRIPT
   Generates static .mp3 narration files via ElevenLabs API (Voice: Alice)
   and falls back cleanly to default high-quality TTS MP3 for remaining clips
   if ElevenLabs quota is exceeded or unavailable.
   ========================================================================= */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { PRACTICE_QUESTIONS } from '../src/probabilityData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice — Clear, Engaging Educator
const MODEL_ID = 'eleven_multilingual_v2';
const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');
const AUDIO_MAP_PATH = path.join(__dirname, '..', 'src', 'audioMap.js');

// Per-style ElevenLabs voice settings
const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true }
};

const fixedPhrases = [
  // Wonder Phase
  { key: "wonder_1", style: "question", text: "There's only a 25 percent chance of rain today, meaning it's far more likely to stay dry than to rain. How do forecasters, gamers, and scientists actually measure how likely something is?" },

  // Story Phase (Slides 1 to 8)
  { key: "story_1", style: "statement", text: "Weather forecasts, dice games, card draws, and spinner wheels — chance shows up everywhere. Some things are certain, some are impossible, and most sit somewhere in between!" },
  { key: "story_2", style: "emphasis", text: "Every event can be described using words like impossible, unlikely, even chance, likely, or certain. These words match numbers on a scale from 0 to 1, or 0 percent to 100 percent." },
  { key: "story_3", style: "statement", text: "An outcome is one possible result of an experiment, like rolling a 4 on a die or flipping heads on a coin. The full list of every possible outcome is called the sample space." },
  { key: "story_4", style: "emphasis", text: "To find the probability of an event, divide the number of favorable outcomes by the total number of possible outcomes. This gives us one master formula for every chance question!" },
  { key: "story_5", style: "statement", text: "Probability can be written as a fraction, a decimal, or a percent — they all mean the same thing! Three quarters is the same chance as 0.75, which is the same as 75 percent." },
  { key: "story_6", style: "emphasis", text: "The complement of an event is everything that isn't that event. If the probability of sun is 0.75, then the probability of not sun must be 0.25, because every possibility together always adds up to exactly 1." },
  { key: "story_7", style: "statement", text: "Meteorologists use probability to forecast rain, game shows use it to design fair prizes, and athletes study it to plan strategy. Chance quietly shapes decisions everywhere!" },
  { key: "story_8", style: "celebration", text: "Awesome job! You've learned about outcomes, the probability formula, the scale, and complements. Now step into the lab to flip coins, roll dice, and crack chance puzzles!" },

  // Simulation Guidance
  { key: "sim_1", style: "instruction", text: "Welcome to Station 1: Trial Experiments! Set the number of trials and run virtual coin flips, die rolls, or wheel spins. Watch how experimental probability gets closer to theoretical probability as you run more trials!" },
  { key: "sim_2", style: "instruction", text: "Welcome to Station 2: Master Formula Lab! Choose marble counts, card groups, or raffle ticket totals to test the master formula: Probability equals favorable outcomes divided by total outcomes." },
  { key: "sim_3", style: "instruction", text: "Welcome to Station 3: Inverse Solvers! Given a probability, work backwards to find its complement or missing total counts. Use the hint button if you need guidance!" },
  { key: "sim_act_1_1", style: "instruction", text: "Station 1, Activity 1: Referee Coin Flip Shootout. Set your trial count and flip the coin to compare Heads and Tails frequencies to 50 percent!" },
  { key: "sim_act_1_2", style: "instruction", text: "Station 1, Activity 2: Board Game Dice Arena. Roll a six-sided die and watch each face approach its theoretical probability of 1 sixth!" },
  { key: "sim_act_1_3", style: "instruction", text: "Station 1, Activity 3: Carnival Prize Wheel Sprint. Spin the 4-color wheel where Gold takes up half the wheel!" },
  { key: "sim_act_2_1", style: "instruction", text: "Station 2, Activity 1: Sports Equipment Bag. Adjust total marbles and red marbles to calculate P(red) instantly." },
  { key: "sim_act_2_2", style: "instruction", text: "Station 2, Activity 2: Card Game Deck Inspector. Pick a card suit or group from a 52-card deck to see its probability." },
  { key: "sim_act_2_3", style: "instruction", text: "Station 2, Activity 3: School Festival Raffle Draw. Set total tickets sold and see your chance of holding the winning ticket." },
  { key: "sim_act_3_1", style: "instruction", text: "Station 3, Activity 1: Sports Day Weather Forecast Detective. If P(rain) is 0.30, find the complement P(no rain)." },
  { key: "sim_act_3_2", style: "instruction", text: "Station 3, Activity 2: City Traffic Light Signal Puzzle. With P(green) equal to 0.60 out of 20 seconds, calculate the green light duration." },
  { key: "sim_act_3_3", style: "instruction", text: "Station 3, Activity 3: TV Game Show Grand Finale Vault. If P(win) is 25 percent with 1 winning door, solve for the total number of doors." },

  // Practice Phase World Selection
  { key: "practice_select", style: "instruction", text: "Welcome to Probability Game Worlds! Explore 10 themed worlds to test your skills from coin tosses and dice rolls to raffle tickets and game show grand finales!" },

  // Reflect Phase & Celebration
  { key: "reflect_1", style: "question", text: "What did you learn about chance and probability? Explain it to Nova with an example!" },
  { key: "celebration_1", style: "celebration", text: "Congratulations! You have completed the Chance and Uncertainty Quest! You've mastered outcomes, the probability formula, the 0 to 1 scale, and complementary events!" }
];

// Append all 100 practice questions and 100 hints
const questionPhrases = [];
for (let w = 0; w < 10; w++) {
  const worldQs = PRACTICE_QUESTIONS[w];
  for (let q = 0; q < worldQs.length; q++) {
    const item = worldQs[q];
    questionPhrases.push({ key: `${item.key}_prompt`, style: "question", text: item.prompt });
    questionPhrases.push({ key: `${item.key}_hint`, style: "thinking", text: item.hint });
  }
}

const phrases = [...fixedPhrases, ...questionPhrases];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate MP3 using ElevenLabs
async function generateElevenLabs(phrase) {
  if (!API_KEY) throw new Error("No ElevenLabs API key");
  const settings = STYLE_SETTINGS[phrase.style] || STYLE_SETTINGS.statement;
  const filename = `${phrase.key}.mp3`;
  const outPath = path.join(OUT_DIR, filename);

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text: phrase.text,
      model_id: MODEL_ID,
      voice_settings: settings
    })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`ElevenLabs API error ${res.status}: ${errText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  return `/assets/audio/${filename}`;
}

// Generate default TTS MP3 audio (Fallback with zero API keys)
async function generateDefaultTTS(phrase) {
  const filename = `${phrase.key}.mp3`;
  const outPath = path.join(OUT_DIR, filename);

  // Split text into chunks for TTS endpoint
  const text = phrase.text.replace(/["\n\r]/g, ' ').trim();
  const chunks = [];
  const words = text.split(' ');
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).length > 180) {
      if (cur) chunks.push(cur.trim());
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  }
  if (cur) chunks.push(cur.trim());

  const buffers = [];
  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(chunk)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!res.ok) {
      throw new Error(`Default TTS failed with HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    buffers.push(buf);
    await sleep(80);
  }

  const finalBuffer = Buffer.concat(buffers);
  fs.writeFileSync(outPath, finalBuffer);
  return `/assets/audio/${filename}`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const mapEntries = {};
  console.log(`🎙️  Processing ${phrases.length} narration clips...`);

  let elevenCount = 0;
  let defaultCount = 0;
  let cachedCount = 0;

  for (const phrase of phrases) {
    const filename = `${phrase.key}.mp3`;
    const outPath = path.join(OUT_DIR, filename);
    const audioUrl = `/assets/audio/${filename}`;

    // 1. Check if valid MP3 already exists on disk
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 2000) {
      mapEntries[phrase.key] = { text: phrase.text, style: phrase.style, file: audioUrl };
      cachedCount++;
      continue;
    }

    // 2. If missing, try ElevenLabs first if API_KEY is provided
    let generated = false;
    if (API_KEY) {
      try {
        await generateElevenLabs(phrase);
        mapEntries[phrase.key] = { text: phrase.text, style: phrase.style, file: audioUrl };
        console.log(`  ✅ [ElevenLabs Alice] ${phrase.key} → ${audioUrl}`);
        elevenCount++;
        generated = true;
        await sleep(150);
      } catch (err) {
        console.warn(`  ⚠️  ElevenLabs unavailable for "${phrase.key}" (${err.message}). Falling back to Default TTS...`);
      }
    }

    // 3. Fallback to Default TTS MP3
    if (!generated) {
      try {
        await generateDefaultTTS(phrase);
        mapEntries[phrase.key] = { text: phrase.text, style: phrase.style, file: audioUrl };
        console.log(`  🔊 [Default Audio MP3] ${phrase.key} → ${audioUrl}`);
        defaultCount++;
      } catch (err) {
        console.error(`  ❌ Failed to generate audio for "${phrase.key}": ${err.message}`);
        mapEntries[phrase.key] = { text: phrase.text, style: phrase.style, file: audioUrl };
      }
    }
  }

  const fileContents = `/* =========================================================================
   AUDIO MAP — Mapping fixed text keys to audio files or speech text
   Auto-generated by scripts/generate_audio.js — do not edit by hand.
   ========================================================================= */
export const AUDIO_MAP = ${JSON.stringify(mapEntries, null, 2)};
`;

  fs.writeFileSync(AUDIO_MAP_PATH, fileContents);
  console.log(`\n✨ Audio Processing Complete!`);
  console.log(`   - Existing ElevenLabs audio kept: ${cachedCount}`);
  console.log(`   - Newly generated ElevenLabs audio: ${elevenCount}`);
  console.log(`   - Newly generated Default TTS audio: ${defaultCount}`);
  console.log(`   - Total mapped entries in src/audioMap.js: ${Object.keys(mapEntries).length}`);
}

main();
