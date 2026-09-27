import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WESTERN_NAMES = [
  "Leo", "Emma", "Alex", "Oliver", "Sophia", "Jack", "Maya", "Lucas",
  "Ethan", "Chloe", "Noah", "Liam", "Harper", "Ava", "Mason", "Ella",
  "James", "Mia", "Logan", "Charlotte"
];

function pick(arr, i) {
  return arr[i % arr.length];
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function simplifyFraction(fav, total) {
  const g = gcd(fav, total) || 1;
  return { n: fav / g, d: total / g };
}

function fracStr(fav, total) {
  const { n, d } = simplifyFraction(fav, total);
  return `${n}/${d}`;
}

const PRACTICE_WORLDS = [
  { id: 0, name: "Coin Toss Carnival", icon: "🪙", range: "Q1–10", difficulty: 1 },
  { id: 1, name: "Dice Kingdom", icon: "🎲", range: "Q11–20", difficulty: 1 },
  { id: 2, name: "Spinner Circus", icon: "🎡", range: "Q21–30", difficulty: 2 },
  { id: 3, name: "Marble Bag Market", icon: "🔴", range: "Q31–40", difficulty: 2 },
  { id: 4, name: "Card Deck Casino", icon: "🃏", range: "Q41–50", difficulty: 3 },
  { id: 5, name: "Weather Station", icon: "🌦️", range: "Q51–60", difficulty: 3 },
  { id: 6, name: "Traffic Light City", icon: "🚦", range: "Q61–70", difficulty: 3 },
  { id: 7, name: "Raffle Ticket Fair", icon: "🎟️", range: "Q71–80", difficulty: 4 },
  { id: 8, name: "Sports Match Arena", icon: "⚽", range: "Q81–90", difficulty: 4 },
  { id: 9, name: "Game Show Grand Finale", icon: "🎬", range: "Q91–100", difficulty: 4 }
];

const allQuestions = {};

// Build 10 Questions per World (100 total)
for (let w = 0; w < 10; w++) {
  allQuestions[w] = [];
  const world = PRACTICE_WORLDS[w];

  for (let q = 0; q < 10; q++) {
    const qKey = `w${w}_q${q}`;
    const name = pick(WESTERN_NAMES, w * 10 + q);

    let prompt = "";
    let hint = "";
    let correctFrac = "";
    let options = [];
    let correctIndex = 0;
    let explanation = "";
    let diagramInfo = {};

    switch (w) {
      case 0: { // Coin Toss Carnival
        const totalFlips = (q % 3 === 0) ? 2 : (q % 3 === 1) ? 4 : 8;
        if (q % 2 === 0) {
          prompt = `${name} flips a fair coin ${totalFlips} times. What is the theoretical probability of landing on Heads on any single flip?`;
          hint = "A fair coin has 2 possible outcomes: Heads or Tails. 1 favorable outcome out of 2 total outcomes means P(Heads) is always 1 half, or 50 percent.";
          correctFrac = "1/2";
          options = ["1/2", "1/4", "3/4", "2/3"];
          correctIndex = 0;
          explanation = "Each coin flip is an independent event with P(Heads) = 1/2.";
          diagramInfo = { total: 2, fav: 1, favLabel: "Heads", mode: 'basic' };
        } else {
          prompt = `${name} flips a fair coin ${totalFlips} times. What is the probability of NOT getting Heads on a flip?`;
          hint = "Complement rule: P(Not Heads) = 1 minus P(Heads) = 1 minus 1 half = 1 half, or 50 percent.";
          correctFrac = "1/2";
          options = ["1/2", "1/3", "1/4", "3/4"];
          correctIndex = 0;
          explanation = "The complement of Heads is Tails, which also has a probability of 1/2.";
          diagramInfo = { total: 2, fav: 1, favLabel: "Tails", mode: 'complement' };
        }
        break;
      }

      case 1: { // Dice Kingdom
        const targetNumber = (q % 6) + 1;
        if (q % 3 === 0) {
          prompt = `${name} rolls a standard six-sided die. What is the probability of rolling an even number (2, 4, or 6)?`;
          hint = "There are 3 even numbers (2, 4, 6) out of 6 total faces. 3 divided by 6 simplifies to 1 half, or 50 percent.";
          correctFrac = "1/2";
          options = ["1/2", "1/3", "1/6", "2/3"];
          correctIndex = 0;
          explanation = "P(even) = 3/6 = 1/2.";
          diagramInfo = { total: 6, fav: 3, favLabel: "even number", mode: 'basic' };
        } else if (q % 3 === 1) {
          prompt = `${name} rolls a standard six-sided die. What is the probability of rolling exactly a ${targetNumber}?`;
          hint = "Each single face is 1 favorable outcome out of 6 total faces. P(face) = 1 over 6.";
          correctFrac = "1/6";
          options = ["1/6", "1/2", "1/3", "5/6"];
          correctIndex = 0;
          explanation = `P(${targetNumber}) = 1/6.`;
          diagramInfo = { total: 6, fav: 1, favLabel: `${targetNumber}`, mode: 'basic' };
        } else {
          prompt = `${name} rolls a standard six-sided die. What is the probability of rolling a number greater than 4 (5 or 6)?`;
          hint = "Numbers greater than 4 are 5 and 6, giving 2 favorable outcomes out of 6 total faces. 2 divided by 6 simplifies to 1 third.";
          correctFrac = "1/3";
          options = ["1/3", "1/6", "1/2", "2/3"];
          correctIndex = 0;
          explanation = "P(greater than 4) = 2/6 = 1/3.";
          diagramInfo = { total: 6, fav: 2, favLabel: "greater than 4", mode: 'basic' };
        }
        break;
      }

      case 2: { // Spinner Circus
        const totalSectors = [4, 5, 8, 10][q % 4];
        const favSectors = (q % 3) + 1;
        prompt = `${name} spins a wheel with ${totalSectors} equal sectors. Exactly ${favSectors} of them are Gold. What is the probability of landing on Gold?`;
        hint = `Divide favorable sectors by total sectors: ${favSectors} favorable sectors divided by ${totalSectors} total sectors equals ${fracStr(favSectors, totalSectors)}.`;
        correctFrac = fracStr(favSectors, totalSectors);
        options = [correctFrac, fracStr(Math.max(1, totalSectors - favSectors), totalSectors), fracStr(1, totalSectors), fracStr(Math.min(totalSectors - 1, favSectors + 1), totalSectors)];
        correctIndex = 0;
        explanation = `P(Gold) = ${favSectors}/${totalSectors} = ${correctFrac}.`;
        diagramInfo = { total: totalSectors, fav: favSectors, favLabel: "Gold", mode: 'basic' };
        break;
      }

      case 3: { // Marble Bag Market
        const totalM = [10, 12, 15, 20][q % 4];
        const redM = (q % 4) + 2;
        if (q % 2 === 0) {
          prompt = `${name} picks a marble from a bag with ${redM} red marbles and ${totalM - redM} blue marbles. What is the probability of picking a red marble?`;
          hint = `Add total marbles: ${redM} red plus ${totalM - redM} blue equals ${totalM} total marbles. Probability of red is ${redM} divided by ${totalM}, which simplifies to ${fracStr(redM, totalM)}.`;
          correctFrac = fracStr(redM, totalM);
          options = [correctFrac, fracStr(totalM - redM, totalM), fracStr(1, totalM), fracStr(Math.min(totalM - 1, redM + 1), totalM)];
          correctIndex = 0;
          explanation = `P(red) = ${redM}/${totalM} = ${correctFrac}.`;
          diagramInfo = { total: totalM, fav: redM, favLabel: "red marble", mode: 'basic' };
        } else {
          prompt = `${name} knows P(red marble) = ${fracStr(redM, totalM)} in a bag of ${totalM} marbles. What is the probability of NOT picking a red marble?`;
          hint = `Complement rule: P(not red) = 1 minus P(red) = 1 minus ${fracStr(redM, totalM)} = ${fracStr(totalM - redM, totalM)}.`;
          correctFrac = fracStr(totalM - redM, totalM);
          options = [correctFrac, fracStr(redM, totalM), fracStr(1, totalM), fracStr(Math.min(totalM - 1, totalM - redM + 1), totalM)];
          correctIndex = 0;
          explanation = `P(not red) = 1 - ${fracStr(redM, totalM)} = ${correctFrac}.`;
          diagramInfo = { total: totalM, fav: totalM - redM, favLabel: "not red marble", mode: 'complement' };
        }
        break;
      }

      case 4: { // Card Deck Casino
        if (q % 3 === 0) {
          prompt = `${name} draws a card from a standard deck of 52 playing cards. What is the probability of drawing a Heart suit card?`;
          hint = "A standard deck has 13 Hearts out of 52 cards. 13 divided by 52 simplifies to 1 fourth, or 25 percent.";
          correctFrac = "1/4";
          options = ["1/4", "1/2", "1/13", "3/4"];
          correctIndex = 0;
          explanation = "P(Heart) = 13/52 = 1/4.";
          diagramInfo = { total: 52, fav: 13, favLabel: "Heart card", mode: 'basic' };
        } else if (q % 3 === 1) {
          prompt = `${name} draws a card from a standard 52-card deck. What is the probability of drawing a Face card (Jack, Queen, or King)?`;
          hint = "There are 12 Face cards (4 Jacks, 4 Queens, 4 Kings) in a 52-card deck. 12 divided by 52 simplifies to 3 over 13.";
          correctFrac = "3/13";
          options = ["3/13", "1/4", "1/13", "1/2"];
          correctIndex = 0;
          explanation = "P(Face card) = 12/52 = 3/13.";
          diagramInfo = { total: 52, fav: 12, favLabel: "Face card", mode: 'basic' };
        } else {
          prompt = `${name} draws a card from a 52-card deck. What is the probability of drawing any Red card (Hearts or Diamonds)?`;
          hint = "Half of a standard deck is red (26 cards out of 52). 26 divided by 52 simplifies to 1 half, or 50 percent.";
          correctFrac = "1/2";
          options = ["1/2", "1/4", "3/4", "1/13"];
          correctIndex = 0;
          explanation = "P(Red card) = 26/52 = 1/2.";
          diagramInfo = { total: 52, fav: 26, favLabel: "Red card", mode: 'basic' };
        }
        break;
      }

      case 5: { // Weather Station
        const rainyDays = (q % 5) + 3;
        const totalDays = 20;
        prompt = `${name} tracks ${totalDays} forecast days and finds ${rainyDays} rainy days. What is the probability of a forecast day being rainy?`;
        hint = `Divide rainy days by total days: ${rainyDays} divided by ${totalDays} equals ${fracStr(rainyDays, totalDays)}.`;
        correctFrac = fracStr(rainyDays, totalDays);
        options = [correctFrac, fracStr(totalDays - rainyDays, totalDays), fracStr(1, totalDays), fracStr(Math.min(totalDays - 1, rainyDays + 2), totalDays)];
        correctIndex = 0;
        explanation = `P(rainy) = ${rainyDays}/${totalDays} = ${correctFrac}.`;
        diagramInfo = { total: totalDays, fav: rainyDays, favLabel: "rainy day", mode: 'basic' };
        break;
      }

      case 6: { // Traffic Light City
        const greenSec = [10, 12, 14, 15][q % 4];
        const totalSec = 20;
        prompt = `${name} notes a traffic light stays green for ${greenSec} seconds out of a ${totalSec}-second cycle. What is the probability the light is green when arriving?`;
        hint = `Divide green seconds by total cycle seconds: ${greenSec} divided by ${totalSec} equals ${fracStr(greenSec, totalSec)}.`;
        correctFrac = fracStr(greenSec, totalSec);
        options = [correctFrac, fracStr(totalSec - greenSec, totalSec), fracStr(1, totalSec), fracStr(Math.min(totalSec - 1, greenSec + 1), totalSec)];
        correctIndex = 0;
        explanation = `P(green) = ${greenSec}/${totalSec} = ${correctFrac}.`;
        diagramInfo = { total: totalSec, fav: greenSec, favLabel: "green second", mode: 'basic' };
        break;
      }

      case 7: { // Raffle Ticket Fair
        const tickets = [20, 25, 50, 100][q % 4];
        prompt = `${name} buys 1 raffle ticket out of ${tickets} tickets sold. What is the probability of winning the grand prize?`;
        hint = `There is 1 winning ticket out of ${tickets} total tickets sold. P(win) = 1 over ${tickets}.`;
        correctFrac = `1/${tickets}`;
        options = [`1/${tickets}`, `2/${tickets}`, `1/2`, `${tickets - 1}/${tickets}`];
        correctIndex = 0;
        explanation = `P(win) = 1/${tickets}.`;
        diagramInfo = { total: tickets, fav: 1, favLabel: "winning ticket", mode: 'basic' };
        break;
      }

      case 8: { // Sports Match Arena
        const wins = (q % 4) + 5;
        const totalMatches = 10;
        prompt = `${name}'s soccer team won ${wins} matches out of ${totalMatches} matches played. What is the probability of winning a match based on these results?`;
        hint = `Divide wins by total matches: ${wins} wins divided by ${totalMatches} total matches equals ${fracStr(wins, totalMatches)}.`;
        correctFrac = fracStr(wins, totalMatches);
        options = [correctFrac, fracStr(totalMatches - wins, totalMatches), fracStr(1, totalMatches), fracStr(Math.min(totalMatches - 1, wins + 1), totalMatches)];
        correctIndex = 0;
        explanation = `P(win) = ${wins}/${totalMatches} = ${correctFrac}.`;
        diagramInfo = { total: totalMatches, fav: wins, favLabel: "winning match", mode: 'basic' };
        break;
      }

      case 9: { // Game Show Grand Finale
        const totalDoors = (q % 3) + 3;
        prompt = `${name} plays a game show with ${totalDoors} closed doors and 1 winning door. What is the probability of picking the winning door on the first guess?`;
        hint = `There is 1 winning door out of ${totalDoors} total doors. P(win) = 1 over ${totalDoors}.`;
        correctFrac = `1/${totalDoors}`;
        options = [`1/${totalDoors}`, `2/${totalDoors}`, `1/2`, `${totalDoors - 1}/${totalDoors}`];
        correctIndex = 0;
        explanation = `P(win) = 1/${totalDoors}.`;
        diagramInfo = { total: totalDoors, fav: 1, favLabel: "winning door", mode: 'basic' };
        break;
      }
    }

    const rawOpts = [...options];
    const correctVal = rawOpts[0];
    const shuffled = [...rawOpts];
    const swapTarget = (w + q) % 4;
    [shuffled[0], shuffled[swapTarget]] = [shuffled[swapTarget], shuffled[0]];
    const newCorrectIdx = shuffled.indexOf(correctVal);

    allQuestions[w].push({
      key: qKey,
      prompt,
      hint,
      options: shuffled,
      correctIndex: newCorrectIdx,
      explanation,
      diagramInfo
    });
  }
}

// Generate src/probabilityData.js content
const probDataFile = `/* =========================================================================
   PROBABILITY DATA & 100 PRE-GENERATED QUESTION BANK (GRADE 7)
   Contains 10 worlds with 10 static questions each (100 total), paired
   1:1 with pre-generated ElevenLabs MP3 audio narrations & hints.
   ========================================================================= */

export const WESTERN_NAMES = ${JSON.stringify(WESTERN_NAMES, null, 2)};
export const PRACTICE_WORLDS = ${JSON.stringify(PRACTICE_WORLDS, null, 2)};

export const PRACTICE_QUESTIONS = ${JSON.stringify(allQuestions, null, 2)};

export function makeQuestion(worldIndex = 0, questionIndex = 0) {
  const worldQuestions = PRACTICE_QUESTIONS[worldIndex] || PRACTICE_QUESTIONS[0];
  const q = worldQuestions[questionIndex % worldQuestions.length];
  return {
    world: PRACTICE_WORLDS[worldIndex] || PRACTICE_WORLDS[0],
    key: q.key,
    prompt: q.prompt,
    hint: q.hint,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    diagramInfo: q.diagramInfo
  };
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'probabilityData.js'), probDataFile);
console.log('✅ Generated 100 questions in src/probabilityData.js');

// Now update scripts/generate_audio.js
const genAudioScript = `/* =========================================================================
   OFFLINE AUDIO GENERATION SCRIPT
   Generates static .mp3 narration files via the ElevenLabs API and writes
   src/audioMap.js so the frontend can play them with zero latency.

   Usage:
     1. Put your ElevenLabs API key in .env.local as VITE_ELEVENLABS_API_KEY
     2. npm install
     3. npm run generate-audio   (or: node scripts/generate_audio.js)
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
    questionPhrases.push({ key: \`\${item.key}_prompt\`, style: "question", text: item.prompt });
    questionPhrases.push({ key: \`\${item.key}_hint\`, style: "thinking", text: item.hint });
  }
}

const phrases = [...fixedPhrases, ...questionPhrases];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateOne(phrase) {
  const settings = STYLE_SETTINGS[phrase.style] || STYLE_SETTINGS.statement;
  const filename = \`\${phrase.key}.mp3\`;
  const outPath = path.join(OUT_DIR, filename);

  const res = await fetch(\`https://api.elevenlabs.io/v1/text-to-speech/\${VOICE_ID}\`, {
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
    throw new Error(\`ElevenLabs API error \${res.status} for "\${phrase.key}": \${errText}\`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  return \`/assets/audio/\${filename}\`;
}

async function main() {
  if (!API_KEY) {
    console.error('❌ Missing VITE_ELEVENLABS_API_KEY. Add it to .env.local before running this script.');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const mapEntries = {};
  console.log(\`🎙️  Generating \${phrases.length} narration clips with voice "Alice" (\${VOICE_ID})...\`);

  for (const phrase of phrases) {
    try {
      const filePath = await generateOne(phrase);
      mapEntries[phrase.key] = { text: phrase.text, style: phrase.style, file: filePath };
      console.log(\`  ✅ \${phrase.key} → \${filePath}\`);
    } catch (err) {
      console.error(\`  ⚠️  Failed "\${phrase.key}": \${err.message}\`);
      mapEntries[phrase.key] = { text: phrase.text, style: phrase.style, file: \`/assets/audio/\${phrase.key}.mp3\` };
    }
    await sleep(200); // 200ms rate limiting
  }

  const fileContents = \`/* =========================================================================
   AUDIO MAP — Mapping fixed text keys to audio files or speech text
   Auto-generated by scripts/generate_audio.js — do not edit by hand.
   ========================================================================= */
export const AUDIO_MAP = \${JSON.stringify(mapEntries, null, 2)};
\`;

  fs.writeFileSync(AUDIO_MAP_PATH, fileContents);
  console.log(\`\\n✨ Done! Wrote \${Object.keys(mapEntries).length} entries to src/audioMap.js\`);
}

main();
`;

fs.writeFileSync(path.join(__dirname, '..', 'scripts', 'generate_audio.js'), genAudioScript);
console.log('✅ Updated scripts/generate_audio.js with all 100 questions & hints');
