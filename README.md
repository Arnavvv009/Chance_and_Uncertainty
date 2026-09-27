# Chance & Uncertainty · Grade 7 Probability Module

An interactive 5-phase learning module (Wonder → Story → Simulate → Practice → Reflect)
built with the exact same UI/UX architecture, layout, viewport behaviour, colour system,
and audio narration pipeline as the original Circumference module — retargeted to the
**Chance & Uncertainty (Probability)** topic for Grade 7.

## What changed vs. the original module
- **Content only.** Every phase, component pattern, CSS design-token system, phase-band
  colours, glass-card styling, quiz/lives/streak mechanics, world-unlock logic, and the
  ElevenLabs audio pipeline are structurally identical to the source module.
- **Topic content is new:** outcomes & sample space, the probability formula
  `P(E) = favourable ÷ total`, the 0–1 probability scale, complementary events
  (`P(A) + P(A′) = 1`), and 10 themed probability practice worlds.
- **Story panel art** is now original hand-built SVG illustrations
  (`src/components/StoryArt.jsx`) instead of static photos — since the story is new,
  the artwork is new too, and avoids any third-party/copyrighted imagery.
- **Simulation stations** were redesigned to be more interactive than the original:
  - **Station 1 · Flip & Roll Lab** — run adjustable-trial coin flips, dice rolls, and
    spinner spins, and watch experimental probability converge on the theoretical value.
  - **Station 2 · Formula Lab** — build a marble bag, pick a card-deck subset, or size a
    raffle, and compute `P(E)` live as a fraction/decimal/percent.
  - **Station 3 · Inverse Solver** — work backwards from a given probability to find a
    complement or a missing count (weather, traffic lights, game-show doors).

## Getting started
```bash
npm install
npm run dev
```

## Audio narration (ElevenLabs pipeline)
This module ships with the same offline pre-generation + fallback architecture described
in `audio_generation_pipeline.md`:

1. Your ElevenLabs API key is already set in `.env.local` as `VITE_ELEVENLABS_API_KEY`.
   This key is only ever read by the **Node.js** generation script — it is never bundled
   into the browser app, so it can't leak to end users.
2. Generate the static `.mp3` narration files:
   ```bash
   npm run generate-audio
   ```
   This calls the ElevenLabs API (voice **Alice**, `eleven_multilingual_v2`, per-style
   `stability`/`similarity_boost`/`style`/`speaker_boost` settings) for every phrase in
   `scripts/generate_audio.js`, saves the `.mp3` files into `public/assets/audio/`, and
   rewrites `src/audioMap.js` to point at them.
3. Optional cleanup of orphaned audio files after you edit narration:
   ```bash
   npm run clean-audio
   ```

**Until you run `npm run generate-audio`,** the app still works out of the box — the
audio engine (`src/audio.js`) automatically falls back to the browser's built-in speech
synthesis voice whenever a static `.mp3` file isn't found or fails to load, so narration
is never silent even before you've generated real ElevenLabs audio.

### Updating or adding a narration line
Follow the same steps as the pipeline doc:
1. Add the exact paragraph/question text + style to the `phrases` array in
   `scripts/generate_audio.js` (never add titles/headings — only paragraphs & questions).
2. Run `npm run generate-audio`.
3. Make sure the matching phase component in `src/stages/*.jsx` uses the identical
   string via `AUDIO_MAP.<key>` and `narrate()`, so on-screen text and spoken text stay
   in perfect 1:1 sync.

## Build
```bash
npm run build
npm run preview
```
