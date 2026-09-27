import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../public/assets/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const slides = [
  {
    num: 3,
    prompt: "High resolution educational photography of a six-sided die showing number 4 and a shiny gold coin showing heads resting on a clean oak wooden desk, clear lighting, realistic depth of field, educational mathematics textbook quality"
  },
  {
    num: 4,
    prompt: "Clean modern educational graphic design of probability master formula P(Event) equals Favorable Outcomes divided by Total Outcomes, with colorful blue and red glass marbles in a clear bowl on a sleek table, photorealistic 8k"
  },
  {
    num: 5,
    prompt: "Sleek modern infographic of a horizontal probability gauge scale from 0 to 1, showing matching equivalent values 3/4, 0.75, and 75 percent, clean studio lighting, realistic UI presentation, educational mathematics"
  },
  {
    num: 6,
    prompt: "Realistic split-screen photograph showing a bright sunny blue sky on the left side and a soft rainy cloud on the right side, demonstrating complementary weather events, high contrast, vibrant colors, 8k resolution"
  },
  {
    num: 7,
    prompt: "Real world application collage photograph of a modern smartphone weather app showing 70 percent rain chance, a soccer player preparing for a penalty kick, and a colorful carnival wheel, crisp sharp detail"
  },
  {
    num: 8,
    prompt: "Modern futuristic STEM science laboratory workspace with interactive touch screens displaying coin flip and dice roll simulations, clean lighting, high resolution photography, inspiring educational environment"
  }
];

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
}

async function run() {
  console.log("Generating normal realistic images for story slides 3 to 8...");
  for (const slide of slides) {
    const filename = `story_slide_${slide.num}.jpg`;
    const destPath = path.join(outputDir, filename);
    const encodedPrompt = encodeURIComponent(slide.prompt);
    // Pollinations AI URL with normal realistic rendering prompt, width 1024, height 768, seed for consistency
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&nologo=true&seed=${slide.num * 888}&model=flux`;
    
    console.log(`Downloading Slide ${slide.num} -> ${filename}...`);
    try {
      await downloadImage(imageUrl, destPath);
      const stats = fs.statSync(destPath);
      console.log(`SUCCESS: ${filename} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`FAILED Slide ${slide.num}:`, err.message);
    }
  }
  console.log("Done generating normal images!");
}

run();
