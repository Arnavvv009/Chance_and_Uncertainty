import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');
fs.mkdirSync(OUT_DIR, { recursive: true });

const slides = [
  {
    num: 3,
    title: "WHAT IS AN OUTCOME? SAMPLE SPACE",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0728"/>
      <stop offset="50%" stop-color="#180a3a"/>
      <stop offset="100%" stop-color="#09031a"/>
    </linearGradient>
    <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#38bdf8" flood-opacity="0.4"/>
    </filter>
  </defs>
  
  <rect width="800" height="600" fill="url(#bg3)"/>
  <circle cx="400" cy="300" r="260" fill="url(#glow3)"/>

  <!-- Anime Holographic Grid Ring -->
  <circle cx="400" cy="300" r="220" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="12 8" opacity="0.6"/>
  <circle cx="400" cy="300" r="180" fill="none" stroke="#c084fc" stroke-width="2" opacity="0.4"/>

  <!-- Anime Student Character Silhouette Avatar -->
  <g transform="translate(400, 240)">
    <circle cx="0" cy="0" r="45" fill="#1e1b4b" stroke="#facc15" stroke-width="4" filter="url(#shadow3)"/>
    <text x="0" y="16" text-anchor="middle" font-size="48">🧑‍🎓</text>
  </g>

  <!-- 6 Glowing Holographic Die Faces in Orbit -->
  <!-- Face 1 -->
  <g transform="translate(180, 140)">
    <rect x="-40" y="-40" width="80" height="80" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#shadow3)"/>
    <circle cx="0" cy="0" r="8" fill="#facc15"/>
    <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="sans-serif">OUTCOME 1</text>
  </g>
  <!-- Face 2 -->
  <g transform="translate(400, 90)">
    <rect x="-40" y="-40" width="80" height="80" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#shadow3)"/>
    <circle cx="-16" cy="-16" r="7" fill="#facc15"/>
    <circle cx="16" cy="16" r="7" fill="#facc15"/>
    <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="sans-serif">OUTCOME 2</text>
  </g>
  <!-- Face 3 -->
  <g transform="translate(620, 140)">
    <rect x="-40" y="-40" width="80" height="80" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#shadow3)"/>
    <circle cx="-18" cy="-18" r="7" fill="#facc15"/>
    <circle cx="0" cy="0" r="7" fill="#facc15"/>
    <circle cx="18" cy="18" r="7" fill="#facc15"/>
    <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="sans-serif">OUTCOME 3</text>
  </g>
  <!-- Face 4 -->
  <g transform="translate(180, 420)">
    <rect x="-40" y="-40" width="80" height="80" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#shadow3)"/>
    <circle cx="-18" cy="-18" r="7" fill="#facc15"/>
    <circle cx="18" cy="-18" r="7" fill="#facc15"/>
    <circle cx="-18" cy="18" r="7" fill="#facc15"/>
    <circle cx="18" cy="18" r="7" fill="#facc15"/>
    <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="sans-serif">OUTCOME 4</text>
  </g>
  <!-- Face 5 -->
  <g transform="translate(400, 470)">
    <rect x="-40" y="-40" width="80" height="80" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#shadow3)"/>
    <circle cx="-18" cy="-18" r="7" fill="#facc15"/>
    <circle cx="18" cy="-18" r="7" fill="#facc15"/>
    <circle cx="0" cy="0" r="7" fill="#facc15"/>
    <circle cx="-18" cy="18" r="7" fill="#facc15"/>
    <circle cx="18" cy="18" r="7" fill="#facc15"/>
    <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="sans-serif">OUTCOME 5</text>
  </g>
  <!-- Face 6 -->
  <g transform="translate(620, 420)">
    <rect x="-40" y="-40" width="80" height="80" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#shadow3)"/>
    <circle cx="-18" cy="-20" r="6.5" fill="#facc15"/>
    <circle cx="18" cy="-20" r="6.5" fill="#facc15"/>
    <circle cx="-18" cy="0" r="6.5" fill="#facc15"/>
    <circle cx="18" cy="0" r="6.5" fill="#facc15"/>
    <circle cx="-18" cy="20" r="6.5" fill="#facc15"/>
    <circle cx="18" cy="20" r="6.5" fill="#facc15"/>
    <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="900" font-family="sans-serif">OUTCOME 6</text>
  </g>

  <!-- Title Pill Banner -->
  <rect x="200" y="25" width="400" height="46" rx="23" fill="#0c0520" stroke="#facc15" stroke-width="3"/>
  <text x="400" y="54" text-anchor="middle" fill="#facc15" font-size="18" font-weight="900" font-family="sans-serif" letter-spacing="1">
    ✦ SAMPLE SPACE S = {1, 2, 3, 4, 5, 6} ✦
  </text>
</svg>`
  },
  {
    num: 4,
    title: "PROBABILITY MASTER FORMULA",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c0b3b"/>
      <stop offset="50%" stop-color="#12062b"/>
      <stop offset="100%" stop-color="#080216"/>
    </linearGradient>
    <filter id="shadow4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#facc15" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg4)"/>

  <!-- Glass Marble Jar -->
  <path d="M120 120 Q80 360 260 480 Q440 520 450 300 Q455 140 260 100 Z" fill="#1e1342" stroke="#a78bfa" stroke-width="6" opacity="0.95"/>
  
  <!-- Marbles in Flask -->
  <g>
    <circle cx="180" cy="180" r="28" fill="#f43f5e" stroke="#000" stroke-width="4"/>
    <circle cx="168" cy="168" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="260" cy="160" r="28" fill="#f43f5e" stroke="#000" stroke-width="4"/>
    <circle cx="248" cy="148" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="340" cy="190" r="28" fill="#facc15" stroke="#000" stroke-width="4"/>
    <circle cx="328" cy="178" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="190" cy="280" r="28" fill="#38bdf8" stroke="#000" stroke-width="4"/>
    <circle cx="178" cy="268" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="280" cy="270" r="28" fill="#38bdf8" stroke="#000" stroke-width="4"/>
    <circle cx="268" cy="258" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="370" cy="290" r="28" fill="#38bdf8" stroke="#000" stroke-width="4"/>
    <circle cx="358" cy="278" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="220" cy="380" r="28" fill="#4ade80" stroke="#000" stroke-width="4"/>
    <circle cx="208" cy="368" r="8" fill="#fff" opacity="0.5"/>

    <circle cx="320" cy="390" r="28" fill="#c084fc" stroke="#000" stroke-width="4"/>
    <circle cx="308" cy="378" r="8" fill="#fff" opacity="0.5"/>
  </g>
  <text x="260" y="80" text-anchor="middle" fill="#f8fafc" font-size="22" font-weight="900" font-family="sans-serif">8 Total Marbles in Bag</text>

  <!-- Anime Blackboard Formula Card -->
  <g transform="translate(480, 140)">
    <rect x="0" y="0" width="280" height="320" rx="24" fill="#0b1329" stroke="#facc15" stroke-width="6" filter="url(#shadow4)"/>
    <text x="140" y="55" text-anchor="middle" fill="#facc15" font-size="22" font-weight="900" font-family="sans-serif">P(Blue Marble)</text>

    <text x="140" y="125" text-anchor="middle" fill="#38bdf8" font-size="48" font-weight="900" font-family="sans-serif">3</text>
    <line x1="50" y1="150" x2="230" y2="150" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
    <text x="140" y="215" text-anchor="middle" fill="#f8fafc" font-size="48" font-weight="900" font-family="sans-serif">8</text>

    <rect x="40" y="245" width="200" height="42" rx="21" fill="#1e293b"/>
    <text x="140" y="272" text-anchor="middle" fill="#4ade80" font-size="20" font-weight="900" font-family="sans-serif">= 37.5% Chance</text>
  </g>

  <!-- Bottom Banner -->
  <rect x="150" y="530" width="500" height="46" rx="23" fill="#0c0520" stroke="#38bdf8" stroke-width="3"/>
  <text x="400" y="559" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="900" font-family="sans-serif">
    P(Event) = Favourable Outcomes ÷ Total Outcomes
  </text>
</svg>`
  },
  {
    num: 5,
    title: "PROBABILITY SCALE & FORMATS",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14082c"/>
      <stop offset="50%" stop-color="#0f0624"/>
      <stop offset="100%" stop-color="#070214"/>
    </linearGradient>
    <linearGradient id="scaleGrad" x1="0" x2="1">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#4ade80"/>
    </linearGradient>
    <filter id="shadow5" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#38bdf8" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg5)"/>

  <!-- Anime Holographic Gauge Arc -->
  <path d="M100 420 A300 300 0 0 1 700 420" fill="none" stroke="#1e1b4b" stroke-width="32" stroke-linecap="round"/>
  <path d="M100 420 A300 300 0 0 1 700 420" fill="none" stroke="url(#scaleGrad)" stroke-width="32" stroke-dasharray="520 800" stroke-linecap="round"/>

  <!-- Gauge Needle at 3/4 (75%) -->
  <g transform="rotate(45, 400, 420)">
    <line x1="400" y1="420" x2="400" y2="170" stroke="#facc15" stroke-width="10" stroke-linecap="round"/>
  </g>
  <circle cx="400" cy="420" r="22" fill="#facc15" stroke="#78350f" stroke-width="5"/>

  <!-- 3 Equal Value Holographic Cards -->
  <g transform="translate(260, 100)">
    <rect x="0" y="0" width="280" height="190" rx="24" fill="#0b1329" stroke="#38bdf8" stroke-width="5" filter="url(#shadow5)"/>
    <text x="140" y="55" text-anchor="middle" fill="#f8fafc" font-size="34" font-weight="900" font-family="sans-serif">3 / 4  (Fraction)</text>
    <text x="140" y="110" text-anchor="middle" fill="#facc15" font-size="34" font-weight="900" font-family="sans-serif">0.75  (Decimal)</text>
    <text x="140" y="165" text-anchor="middle" fill="#4ade80" font-size="34" font-weight="900" font-family="sans-serif">75%  (Percent)</text>
  </g>

  <!-- Scale Tick Markers -->
  <text x="100" y="475" text-anchor="middle" fill="#f43f5e" font-size="22" font-weight="900" font-family="sans-serif">0 (0%)</text>
  <text x="400" y="515" text-anchor="middle" fill="#facc15" font-size="22" font-weight="900" font-family="sans-serif">0.5 (50%)</text>
  <text x="700" y="475" text-anchor="middle" fill="#4ade80" font-size="22" font-weight="900" font-family="sans-serif">1.0 (100%)</text>

  <!-- Banner -->
  <rect x="200" y="30" width="400" height="44" rx="22" fill="#0c0520" stroke="#facc15" stroke-width="3"/>
  <text x="400" y="59" text-anchor="middle" fill="#facc15" font-size="18" font-weight="900" font-family="sans-serif">
    ✦ THREE WAYS TO WRITE ONE CHANCE ✦
  </text>
</svg>`
  },
  {
    num: 6,
    title: "COMPLEMENTARY EVENTS",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg6" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#180b38"/>
      <stop offset="50%" stop-color="#10062a"/>
      <stop offset="100%" stop-color="#070216"/>
    </linearGradient>
    <filter id="shadow6" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#fde047" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg6)"/>

  <!-- Split Complement Circle -->
  <g transform="translate(400, 270)">
    <circle cx="0" cy="0" r="190" fill="#0d0726" stroke="#fde047" stroke-width="6" filter="url(#shadow6)"/>
    <path d="M0 0 L0 -190 A190 190 0 0 1 164 95 Z" fill="#fde047" opacity="0.9"/>
    <path d="M0 0 L164 95 A190 190 0 1 1 0 -190 Z" fill="#38bdf8" opacity="0.85"/>

    <text x="90" y="-70" font-size="64">☀️</text>
    <text x="-90" y="80" font-size="64">🌧️</text>

    <text x="90" y="10" fill="#78350f" font-size="22" font-weight="900" font-family="sans-serif">P(Sun) = 0.75</text>
    <text x="-110" y="-10" fill="#ffffff" font-size="22" font-weight="900" font-family="sans-serif">P(Not Sun) = 0.25</text>
  </g>

  <!-- Formula Banner at Bottom -->
  <rect x="120" y="505" width="560" height="56" rx="28" fill="#0c0520" stroke="#a78bfa" stroke-width="4"/>
  <text x="400" y="540" text-anchor="middle" fill="#fde68a" font-size="22" font-weight="900" font-family="sans-serif">
    P(Event) + P(Complement) = 1  ➜  0.75 + 0.25 = 1.0
  </text>
</svg>`
  },
  {
    num: 7,
    title: "REAL WORLD PROBABILITY MAGIC",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg7" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#160936"/>
      <stop offset="50%" stop-color="#0f0528"/>
      <stop offset="100%" stop-color="#070214"/>
    </linearGradient>
    <filter id="shadow7" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#38bdf8" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg7)"/>

  <!-- Weather App Card -->
  <g transform="translate(80, 120)">
    <rect x="0" y="0" width="300" height="200" rx="24" fill="#0c0520" stroke="#38bdf8" stroke-width="5" filter="url(#shadow7)"/>
    <text x="150" y="45" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="900" font-family="sans-serif">🌤️ WEATHER FORECAST</text>
    <text x="150" y="115" text-anchor="middle" font-size="56">🌤️</text>
    <text x="150" y="165" text-anchor="middle" fill="#facc15" font-size="22" font-weight="900" font-family="sans-serif">P(rain) = 30%</text>
  </g>

  <!-- Game Show Card -->
  <g transform="translate(420, 120)">
    <rect x="0" y="0" width="300" height="200" rx="24" fill="#0c0520" stroke="#f43f5e" stroke-width="5" filter="url(#shadow7)"/>
    <text x="150" y="45" text-anchor="middle" fill="#f43f5e" font-size="18" font-weight="900" font-family="sans-serif">🎬 GAME SHOW VAULT</text>
    <g transform="translate(70, 75)">
      <rect x="0" y="0" width="46" height="70" rx="8" fill="#f43f5e"/>
      <rect x="58" y="0" width="46" height="70" rx="8" fill="#4ade80"/>
      <rect x="116" y="0" width="46" height="70" rx="8" fill="#facc15"/>
    </g>
    <text x="150" y="175" text-anchor="middle" fill="#facc15" font-size="20" font-weight="900" font-family="sans-serif">1 in 3 Winning Door</text>
  </g>

  <!-- Sports Penalty Kick Card -->
  <g transform="translate(250, 360)">
    <rect x="0" y="0" width="300" height="190" rx="24" fill="#0c0520" stroke="#4ade80" stroke-width="5" filter="url(#shadow7)"/>
    <text x="150" y="42" text-anchor="middle" fill="#4ade80" font-size="18" font-weight="900" font-family="sans-serif">⚽ SPORTS STRATEGY</text>
    <text x="150" y="110" text-anchor="middle" font-size="54">⚽</text>
    <text x="150" y="160" text-anchor="middle" fill="#facc15" font-size="22" font-weight="900" font-family="sans-serif">80% Penalty Goal Rate</text>
  </g>

  <rect x="200" y="30" width="400" height="44" rx="22" fill="#0c0520" stroke="#facc15" stroke-width="3"/>
  <text x="400" y="59" text-anchor="middle" fill="#facc15" font-size="18" font-weight="900" font-family="sans-serif">
    ✦ CHANCE QUIETLY SHAPES DECISIONS ✦
  </text>
</svg>`
  },
  {
    num: 8,
    title: "STEP INTO THE CHANCE LAB",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg8" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c0b3f"/>
      <stop offset="50%" stop-color="#12062d"/>
      <stop offset="100%" stop-color="#080218"/>
    </linearGradient>
    <filter id="shadow8" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#facc15" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg8)"/>

  <!-- Lab Table -->
  <rect x="50" y="440" width="700" height="30" rx="15" fill="#312e81"/>

  <!-- Lab Flask -->
  <path d="M160 180 L160 300 L110 440 L290 440 L240 300 L240 180 Z" fill="#0c0520" stroke="#38bdf8" stroke-width="7"/>
  <path d="M125 350 L275 350 L290 440 L110 440 Z" fill="#38bdf8" opacity="0.6"/>
  <rect x="145" y="150" width="110" height="30" rx="10" fill="#38bdf8"/>

  <!-- Glowing 3D Die -->
  <g transform="translate(400, 260) rotate(-10)">
    <rect width="130" height="130" rx="26" fill="#0f172a" stroke="#facc15" stroke-width="7" filter="url(#shadow8)"/>
    <circle cx="35" cy="35" r="11" fill="#facc15"/>
    <circle cx="95" cy="35" r="11" fill="#facc15"/>
    <circle cx="35" cy="95" r="11" fill="#facc15"/>
    <circle cx="95" cy="95" r="11" fill="#facc15"/>
    <circle cx="65" cy="65" r="11" fill="#facc15"/>
  </g>

  <!-- Prize Wheel -->
  <g transform="translate(630, 310)">
    <circle r="110" fill="#0c0520" stroke="#c084fc" stroke-width="7" filter="url(#shadow8)"/>
    <path d="M0 0 L0 -110 A110 110 0 0 1 95 -55 Z" fill="#f43f5e"/>
    <path d="M0 0 L95 -55 A110 110 0 0 1 0 110 Z" fill="#facc15"/>
    <path d="M0 0 L0 110 A110 110 0 0 1 -95 -55 Z" fill="#4ade80"/>
    <circle r="18" fill="#fff"/>
  </g>

  <!-- Big Interactive Lab Banner -->
  <rect x="150" y="40" width="500" height="70" rx="35" fill="#0c0520" stroke="#facc15" stroke-width="5" filter="url(#shadow8)"/>
  <text x="400" y="85" text-anchor="middle" fill="#facc15" font-size="28" font-weight="900" font-family="sans-serif">
    🧪 THE CHANCE LAB AWAITS! 🧪
  </text>
</svg>`
  }
];

for (const s of slides) {
  const filePath = path.join(OUT_DIR, `story_slide_${s.num}.svg`);
  fs.writeFileSync(filePath, s.svg);
  console.log(`✅ Generated ${filePath}`);
}

console.log('✨ Done generating all story slide anime SVG visuals!');
