import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testFetch() {
  const prompt = encodeURIComponent("Vibrant high quality anime style illustration of an anime student inspecting a glowing futuristic holographic display showing 6 faces of a die (1 to 6) and coin outcomes (Heads and Tails) orbiting in a sample space circle, Makoto Shinkai style, studio anime art");
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=768&nologo=true&seed=42`;
  console.log('Fetching:', url);

  const res = await fetch(url);
  if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    const outPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'test_slide_3.jpg');
    fs.writeFileSync(outPath, buffer);
    console.log('✅ Successfully downloaded test anime image to', outPath, `(${buffer.length} bytes)`);
  } else {
    console.error('❌ Failed:', res.status, res.statusText);
  }
}

testFetch();
