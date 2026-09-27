import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'story_slide_6.jpg');

async function getSlide6() {
  const prompt = encodeURIComponent("Vibrant high quality anime style illustration split concept showing a glowing golden sun on one half (75% Sun) and a soft blue rain cloud on the other half (25% Rain) adding up to a glowing 1.0 circle, Makoto Shinkai anime aesthetic");
  const seeds = [301, 302, 303, 304];

  for (const s of seeds) {
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=768&nologo=true&seed=${s}`;
    try {
      console.log('Fetching slide 6 with seed', s);
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 5000) {
          fs.writeFileSync(outPath, buf);
          console.log('✅ Slide 6 saved successfully!', buf.length, 'bytes');
          return;
        }
      }
    } catch (e) {}
  }
}

getSlide6();
