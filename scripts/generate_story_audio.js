/* =========================================================================
   STORY AUDIO GENERATOR SCRIPT (ELEVENLABS "ALICE" VOICE: Xb7hH8MSUJpSbSDYk0k2)
   Generates crystal-clear local .mp3 narration files for all 8 story slides
   using ElevenLabs Voice ID Xb7hH8MSUJpSbSDYk0k2.
   Saves directly to public/assets/audio/story_1.mp3 ... story_8.mp3
   ========================================================================= */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const API_KEY = (process.env.VITE_ELEVENLABS_API_KEY || '').trim();
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice — Clear, Engaging Educator
const MODEL_ID = 'eleven_multilingual_v2';
const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

// Per-style ElevenLabs voice settings for warm, engaging educator delivery
const STYLE_SETTINGS = {
  celebration:   { stability: 0.20, similarity_boost: 0.70, style: 0.60, use_speaker_boost: true },
  encouragement: { stability: 0.25, similarity_boost: 0.75, style: 0.55, use_speaker_boost: true },
  statement:     { stability: 0.30, similarity_boost: 0.75, style: 0.50, use_speaker_boost: true },
  emphasis:      { stability: 0.25, similarity_boost: 0.75, style: 0.60, use_speaker_boost: true }
};

const STORY_AUDIO_DATA = [
  {
    key: "story_1",
    filename: "story_1.mp3",
    style: "statement",
    text: "Chance Is All Around Us. Weather forecasts, dice games, card draws, and spinner wheels — chance shows up everywhere. Some things are certain, some are impossible, and most sit somewhere in between! Probability is the mathematics of 'how likely'."
  },
  {
    key: "story_2",
    filename: "story_2.mp3",
    style: "emphasis",
    text: "The Language of Chance. Every event can be described using words like impossible, unlikely, even chance, likely, or certain. These words match numbers on a scale from 0 to 1, or 0 percent to 100 percent. Probability always lives between 0, impossible, and 1, certain."
  },
  {
    key: "story_3",
    filename: "story_3.mp3",
    style: "statement",
    text: "What Is an Outcome? An outcome is one possible result of an experiment, like rolling a 4 on a die or flipping heads on a coin. The full list of every possible outcome is called the sample space. A die has 6 outcomes, and a coin has 2 outcomes."
  },
  {
    key: "story_4",
    filename: "story_4.mp3",
    style: "emphasis",
    text: "The Probability Formula. To find the probability of an event, divide the number of favorable outcomes by the total number of possible outcomes. This gives us one master formula for every chance question: P of Event equals Favorable Outcomes divided by Total Outcomes."
  },
  {
    key: "story_5",
    filename: "story_5.mp3",
    style: "statement",
    text: "Reading the Probability Scale. Probability can be written as a fraction, a decimal, or a percent — they all mean the same thing! Three quarters is the same chance as 0.75, which is the same as 75 percent. Fraction, Decimal, Percent — three ways to say one chance."
  },
  {
    key: "story_6",
    filename: "story_6.mp3",
    style: "emphasis",
    text: "Complementary Events. The complement of an event is everything that isn't that event. If the probability of sun is 0.75, then the probability of not sun must be 0.25, because every possibility together always adds up to exactly 1."
  },
  {
    key: "story_7",
    filename: "story_7.mp3",
    style: "statement",
    text: "Real World Magic: Games and Weather. Meteorologists use probability to forecast rain, game shows use it to design fair prizes, and athletes study it to plan strategy. Chance quietly shapes decisions everywhere! Understanding probability helps you make smarter predictions."
  },
  {
    key: "story_8",
    filename: "story_8.mp3",
    style: "celebration",
    text: "Step Into the Chance Lab! Awesome job! You've learned about outcomes, the probability formula, the scale, and complements. Now step into the lab to flip coins, roll dice, and crack chance puzzles!"
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithElevenLabs(item) {
  if (!API_KEY) {
    throw new Error("Missing VITE_ELEVENLABS_API_KEY in .env.local");
  }

  const settings = STYLE_SETTINGS[item.style] || STYLE_SETTINGS.statement;
  const outPath = path.join(OUT_DIR, item.filename);

  console.log(`🎙️  Calling ElevenLabs API for "${item.key}" (Voice: Alice ${VOICE_ID})...`);

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text: item.text,
      model_id: MODEL_ID,
      voice_settings: settings
    })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`ElevenLabs API HTTP ${res.status}: ${errText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  console.log(`  ✅ Successfully saved ${item.filename} with voice "Alice" (${buffer.length} bytes)`);
}

async function main() {
  if (!API_KEY) {
    console.error('❌ Missing VITE_ELEVENLABS_API_KEY in .env.local.');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`🎙️  Generating 8 Story Audio MP3s with ElevenLabs voice "Alice" (${VOICE_ID})...\n`);

  let successCount = 0;
  for (const item of STORY_AUDIO_DATA) {
    try {
      await generateWithElevenLabs(item);
      successCount++;
      await sleep(350); // Rate limiting pause
    } catch (err) {
      console.error(`  ❌ Failed to generate ${item.filename}:`, err.message);
    }
  }

  console.log(`\n✨ Finished! Successfully generated ${successCount}/8 story audio clips with voice ID ${VOICE_ID}!`);
}

main();
