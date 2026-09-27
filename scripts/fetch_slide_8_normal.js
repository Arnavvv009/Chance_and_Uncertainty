import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../public/assets/images');

async function fetchSlide8() {
  const prompt = encodeURIComponent("Modern high tech science laboratory workspace with interactive touch screens displaying coin flip and dice roll probability simulations, clear lighting, high resolution photography");
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=768&nologo=true&seed=999`;
  const destPath = path.join(outputDir, 'story_slide_8.jpg');
  
  console.log("Fetching Slide 8 normal image...");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
  const stats = fs.statSync(destPath);
  console.log(`SUCCESS: story_slide_8.jpg (${stats.size} bytes)`);
}

fetchSlide8().catch(err => console.error(err));
