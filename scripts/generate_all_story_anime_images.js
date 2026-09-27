import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');
fs.mkdirSync(OUT_DIR, { recursive: true });

const slides = [
  { num: 1, filename: "story_slide_1.jpg", prompt: "Vibrant high quality anime style illustration of a friendly student hero standing in a colorful game carnival with glowing magical dice floating in the air, a spinning prize wheel with rainbow sectors, playing cards, and a shiny coin mid-air. Studio anime art style, Makoto Shinkai aesthetic, glowing magical effects, 4k digital art", seed: 101 },
  { num: 2, filename: "story_slide_2.jpg", prompt: "Vibrant high quality anime style illustration showing a glowing magical probability line scale from 0 to 1 floating in mid-air. An energetic anime student character points enthusiastically at the middle marked 1/2 with a coin flipping in the air. Clear numbers 0, 0.5, and 1 glowing with neon light, modern anime visual style", seed: 102 },
  { num: 3, filename: "story_slide_3.jpg", prompt: "Vibrant high quality anime style illustration of an anime student hero inspecting a glowing futuristic holographic display showing 6 faces of a die (1 to 6) and coin outcomes (Heads and Tails) orbiting in a sample space circle. High-tech lab backdrop, clean anime aesthetic, glowing particle effects, Makoto Shinkai style", seed: 103 },
  { num: 4, filename: "story_slide_4.jpg", prompt: "Vibrant high quality anime style illustration of an anime student standing in front of a glowing digital blackboard where the master math formula P(Event) = Favorable / Total shines bright gold. Blue and red glowing marbles floating around in a glass flask, studio anime art style, rich colors", seed: 104 },
  { num: 5, filename: "story_slide_5.jpg", prompt: "Vibrant high quality anime style illustration showing three glowing holographic cards floating side-by-side displaying 3/4, 0.75, and 75%. An anime student with excited expression holding a glowing stylus pointing at the cards, futuristic high-tech academy classroom backdrop", seed: 105 },
  { num: 6, filename: "story_slide_6.jpg", prompt: "Vibrant high quality anime style illustration split concept showing a glowing golden sun on one side (75% Sun) and a soft blue rain cloud on the other side (25% Rain) adding up to a glowing 1.0 circle. Anime weather researchers looking at a weather control console, Makoto Shinkai aesthetic", seed: 206 },
  { num: 7, filename: "story_slide_7.jpg", prompt: "Vibrant high quality anime style illustration of a futuristic city with weather forecast holographic screens, a soccer player taking a penalty kick with probability trajectories, and a game show stage with prize doors. Colorful anime art, dynamic composition", seed: 207 },
  { num: 8, filename: "story_slide_8.jpg", prompt: "Vibrant high quality anime style illustration of a high-tech chance laboratory filled with glowing spin wheels, futuristic dice simulators, interactive probability terminals, and friendly anime mascot robot welcoming the student hero into the lab, bright epic anime art style", seed: 208 }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOne(s) {
  const outPath = path.join(OUT_DIR, s.filename);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 15000) {
    console.log(`  ✅ Slide ${s.num}: ${s.filename} already exists (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
    return true;
  }

  const encodedPrompt = encodeURIComponent(s.prompt);
  const urls = [
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&nologo=true&seed=${s.seed}`,
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=${s.seed + 10}`
  ];

  for (const url of urls) {
    try {
      console.log(`  ⏳ Fetching Slide ${s.num} image...`);
      const res = await fetch(url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 5000) {
          fs.writeFileSync(outPath, buffer);
          console.log(`  ✅ Slide ${s.num} saved to ${s.filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
          return true;
        }
      }
    } catch (e) {}
    await sleep(800);
  }
  return false;
}

async function main() {
  console.log(`🎨 Verifying & generating high quality anime JPEG images for all 8 slides...`);
  for (const s of slides) {
    await fetchOne(s);
  }
  console.log('\n✨ Done verifying all 8 anime JPEG story slide images!');
}

main();
