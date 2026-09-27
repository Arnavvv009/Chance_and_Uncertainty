/* =========================================================================
   AUDIO CLEANUP SCRIPT
   Deletes any .mp3 files in public/assets/audio/ that are no longer
   referenced by src/audioMap.js — keeps the repo tidy after edits.

   Usage: npm run clean-audio  (or: node scripts/clean_audio.js)
   ========================================================================= */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');
const AUDIO_MAP_PATH = path.join(__dirname, '..', 'src', 'audioMap.js');

async function main() {
  if (!fs.existsSync(AUDIO_DIR)) {
    console.log('No audio directory found — nothing to clean.');
    return;
  }

  const { AUDIO_MAP } = await import(`file://${AUDIO_MAP_PATH}`);
  const validFiles = new Set(
    Object.values(AUDIO_MAP)
      .map(entry => entry.file && path.basename(entry.file))
      .filter(Boolean)
  );

  const existingFiles = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
  let removed = 0;

  for (const file of existingFiles) {
    if (!validFiles.has(file)) {
      fs.unlinkSync(path.join(AUDIO_DIR, file));
      console.log(`  🗑️  Removed orphaned file: ${file}`);
      removed++;
    }
  }

  console.log(`\n✨ Cleanup complete. Removed ${removed} orphaned file(s). Kept ${validFiles.size} active file(s).`);
}

main();
