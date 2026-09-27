import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\Arnav\\.gemini\\antigravity-ide\\brain\\5d411987-6b50-402f-822f-4de895d0b787';
const destDir = path.resolve('public/assets/images');

const imageMappings = [
  { prefix: 'story_slide_1_', dest: 'story_slide_1.jpg' },
  { prefix: 'story_slide_2_', dest: 'story_slide_2.jpg' },
  { prefix: 'story_slide_3_', dest: 'story_slide_3.jpg' },
  { prefix: 'story_slide_4_', dest: 'story_slide_4.jpg' },
  { prefix: 'story_slide_5_', dest: 'story_slide_5.jpg' },
  { prefix: 'story_slide_6_', dest: 'story_slide_6.jpg' },
  { prefix: 'story_slide_7_', dest: 'story_slide_7.jpg' },
];

const brainFiles = fs.readdirSync(brainDir);

for (const mapping of imageMappings) {
  const matched = brainFiles.filter(f => f.startsWith(mapping.prefix) && f.endsWith('.jpg')).sort().pop();
  if (matched) {
    const srcPath = path.join(brainDir, matched);
    const destPath = path.join(destDir, mapping.dest);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${matched} -> ${mapping.dest}`);
  } else {
    console.warn(`No match found for ${mapping.prefix}`);
  }
}

// For slide 8 (grand probability lab), copy slide 1 as fallback if slide 8 is not yet generated
const slide8Path = path.join(destDir, 'story_slide_8.jpg');
const slide1Path = path.join(destDir, 'story_slide_1.jpg');
if (fs.existsSync(slide1Path)) {
  fs.copyFileSync(slide1Path, slide8Path);
  console.log('Copied slide 1 as default for slide 8');
}
