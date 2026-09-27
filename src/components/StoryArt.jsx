import React from 'react';

// Image paths for generated 3D cartoon style story images
const IMG_SLIDE_1 = '/@fs/C:/Users/Arnav/.gemini/antigravity-ide/brain/5948bcf7-5a87-4327-b1bc-b2d3728b3e8a/story_slide_one_1790531676467.jpg';
const IMG_SLIDE_2 = '/@fs/C:/Users/Arnav/.gemini/antigravity-ide/brain/5948bcf7-5a87-4327-b1bc-b2d3728b3e8a/story_slide_two_1790531694712.jpg';
const IMG_SLIDE_3 = '/@fs/C:/Users/Arnav/.gemini/antigravity-ide/brain/5948bcf7-5a87-4327-b1bc-b2d3728b3e8a/story_slide_three_1790531721380.jpg';
const IMG_SLIDE_4 = '/@fs/C:/Users/Arnav/.gemini/antigravity-ide/brain/5948bcf7-5a87-4327-b1bc-b2d3728b3e8a/story_slide_four_1790531740671.jpg';
const IMG_SLIDE_5 = '/@fs/C:/Users/Arnav/.gemini/antigravity-ide/brain/5948bcf7-5a87-4327-b1bc-b2d3728b3e8a/story_slide_five_1790531779054.jpg';
const IMG_SLIDE_6 = '/@fs/C:/Users/Arnav/.gemini/antigravity-ide/brain/5948bcf7-5a87-4327-b1bc-b2d3728b3e8a/story_slide_six_1790531801631.jpg';

export function AnimeSlideImage({ src, fallbackSrc, alt, caption, badge = "20:8 Story Art" }) {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl group shadow-2xl bg-[#09031a] flex items-center justify-center border border-amber-400/30">
      <img
        src={imgSrc}
        alt={alt}
        onError={() => {
          if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        style={{ aspectRatio: '20 / 8' }}
      />
      
      {/* Subtle cinematic vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0422]/75 via-transparent to-black/20 pointer-events-none" />

      {/* Top-Right 20:8 Ratio Badge */}
      <div className="absolute top-2.5 right-3 bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 font-display font-900 text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 pointer-events-none">
        <span>🎬</span>
        <span>{badge}</span>
      </div>

      {/* Bottom Floating Caption Pill */}
      {caption && (
        <div className="absolute bottom-2.5 left-3 right-3 sm:left-4 sm:right-4 bg-[#14082c]/90 border border-amber-400/50 rounded-xl px-3.5 py-1.5 text-center text-amber-200 font-display font-900 text-xs sm:text-sm shadow-xl backdrop-blur-md flex items-center justify-center gap-2">
          <span className="text-amber-400">✦</span>
          <span>{caption}</span>
          <span className="text-amber-400">✦</span>
        </div>
      )}
    </div>
  );
}

/* Slide 1: Chance Is All Around Us */
export function SceneEveryyday() {
  return (
    <AnimeSlideImage
      src={IMG_SLIDE_1}
      fallbackSrc="/assets/images/story_slide_1.jpg"
      alt="Magical Chance Carnival 3D Cartoon Art"
      caption="Welcome to the Chance Carnival: Where Every Roll, Flip, and Spin Tells a Story!"
    />
  );
}

/* Slide 2: The Language of Chance */
export function SceneWordScale() {
  return (
    <AnimeSlideImage
      src={IMG_SLIDE_2}
      fallbackSrc="/assets/images/story_slide_2.jpg"
      alt="Probability Scale 0 to 1 Cartoon Illustration"
      caption="The Scale of Probability: From 0% (Impossible) to 50% (Even Chance) to 100% (Certain)"
    />
  );
}

/* Slide 3: What Is an Outcome? */
export function SceneOutcomes() {
  return (
    <AnimeSlideImage
      src={IMG_SLIDE_3}
      fallbackSrc="/assets/images/story_slide_3.jpg"
      alt="Outcomes and Sample Space Cartoon Illustration"
      caption="Sample Space: Complete list of all possible outcomes {1, 2, 3, 4, 5, 6}"
    />
  );
}

/* Slide 4: The Probability Formula */
export function SceneFormula() {
  return (
    <AnimeSlideImage
      src={IMG_SLIDE_4}
      fallbackSrc="/assets/images/story_slide_4.jpg"
      alt="Probability Formula Lab Cartoon Illustration"
      caption="Master Formula: P(Event) = Favourable Outcomes ÷ Total Outcomes (3 Blue / 8 Total)"
    />
  );
}

/* Slide 5: Reading the Scale */
export function SceneGauge() {
  return (
    <AnimeSlideImage
      src={IMG_SLIDE_5}
      fallbackSrc="/assets/images/story_slide_5.jpg"
      alt="Three Formats of Probability Gauge Cartoon Illustration"
      caption="Three Representations: Fraction (¾) = Decimal (0.75) = Percent (75%)"
    />
  );
}

/* Slide 6: Complementary Events */
export function SceneComplement() {
  return (
    <AnimeSlideImage
      src={IMG_SLIDE_6}
      fallbackSrc="/assets/images/story_slide_6.jpg"
      alt="Complementary Events Cartoon Illustration"
      caption="Complementary Rule: P(Sun 75%) + P(Rain 25%) = 1.00 (100% Certainty)"
    />
  );
}

/* Slide 7: Real World Magic: Games & Weather (Custom 20:8 Animated Cartoon Vector Scene) */
export function SceneRealWorld() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl group shadow-2xl bg-[#0b0420] flex items-center justify-center border border-sky-400/40">
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ aspectRatio: '20 / 8' }}
      >
        <defs>
          <linearGradient id="bg7g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12062f" />
            <stop offset="50%" stopColor="#1e0b48" />
            <stop offset="100%" stopColor="#080216" />
          </linearGradient>
          <linearGradient id="goldGrad7" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="skyGrad7" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <filter id="glow7" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.6" />
          </filter>
          <filter id="goldGlow7" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#facc15" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Dynamic Cartoon Background Grid */}
        <rect width="1000" height="400" fill="url(#bg7g)" />

        {/* Sparkling ambient stars */}
        {[
          [80, 50], [220, 30], [380, 60], [550, 40], [720, 55], [890, 35],
          [140, 340], [480, 360], [640, 330], [920, 350]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 2.5 : 1.8} fill="#fef08a" opacity="0.8" />
        ))}

        {/* Section 1 (Left): Weather Station Forecast */}
        <g transform="translate(45, 40)">
          <rect x="0" y="0" width="270" height="300" rx="20" fill="#140738" stroke="#38bdf8" strokeWidth="3.5" filter="url(#glow7)" />
          <rect x="15" y="15" width="240" height="42" rx="12" fill="#0284c7" />
          <text x="135" y="42" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">🌤️ WEATHER RADAR</text>
          
          {/* Animated cute cartoon sun & rain cloud */}
          <circle cx="100" cy="120" r="32" fill="#facc15" stroke="#fef08a" strokeWidth="3" />
          <g transform="translate(130, 110)">
            <ellipse cx="25" cy="20" rx="36" ry="24" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="10" cy="15" r="18" fill="#e0f2fe" />
            <circle cx="40" cy="15" r="16" fill="#e0f2fe" />
            {/* Raindrops */}
            <line x1="15" y1="50" x2="10" y2="68" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="50" x2="25" y2="68" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <line x1="45" y1="50" x2="40" y2="68" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Probability Stat Pill */}
          <rect x="25" y="210" width="220" height="48" rx="14" fill="#0c0320" stroke="#facc15" strokeWidth="2" />
          <text x="135" y="240" textAnchor="middle" fill="#facc15" fontSize="18" fontWeight="900" fontFamily="sans-serif">P(Rain Today) = 30%</text>
          <text x="135" y="280" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="800" fontFamily="sans-serif">Meteorology Satellite Feed</text>
        </g>

        {/* Section 2 (Center): Game Show Prize Wheel & Doors */}
        <g transform="translate(365, 40)">
          <rect x="0" y="0" width="270" height="300" rx="20" fill="#140738" stroke="#f43f5e" strokeWidth="3.5" filter="url(#goldGlow7)" />
          <rect x="15" y="15" width="240" height="42" rx="12" fill="#e11d48" />
          <text x="135" y="42" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">🎡 GAME SHOW VAULT</text>

          {/* 3 Cartoon Mystery Doors */}
          <g transform="translate(25, 75)">
            {/* Door 1 */}
            <rect x="0" y="0" width="65" height="110" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="50" cy="55" r="4" fill="#facc15" />
            <text x="32" y="60" textAnchor="middle" fill="#f43f5e" fontSize="22" fontWeight="900">1</text>
            <text x="32" y="95" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="800">GOAT</text>

            {/* Door 2 (Winning Gold) */}
            <rect x="78" y="0" width="65" height="110" rx="8" fill="#854d0e" stroke="#facc15" strokeWidth="3" filter="url(#goldGlow7)" />
            <circle cx="128" cy="55" r="4" fill="#ffffff" />
            <text x="110" y="60" textAnchor="middle" fill="#facc15" fontSize="22" fontWeight="900">2</text>
            <text x="110" y="95" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900">★ CAR ★</text>

            {/* Door 3 */}
            <rect x="156" y="0" width="65" height="110" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="206" cy="55" r="4" fill="#facc15" />
            <text x="188" y="60" textAnchor="middle" fill="#f43f5e" fontSize="22" fontWeight="900">3</text>
            <text x="188" y="95" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="800">GOAT</text>
          </g>

          {/* Probability Stat Pill */}
          <rect x="25" y="210" width="220" height="48" rx="14" fill="#0c0320" stroke="#facc15" strokeWidth="2" />
          <text x="135" y="240" textAnchor="middle" fill="#facc15" fontSize="18" fontWeight="900" fontFamily="sans-serif">P(Grand Prize) = ⅓</text>
          <text x="135" y="280" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="800" fontFamily="sans-serif">1 Winning Door out of 3</text>
        </g>

        {/* Section 3 (Right): Sports Penalty Shootout */}
        <g transform="translate(685, 40)">
          <rect x="0" y="0" width="270" height="300" rx="20" fill="#140738" stroke="#4ade80" strokeWidth="3.5" filter="url(#glow7)" />
          <rect x="15" y="15" width="240" height="42" rx="12" fill="#16a34a" />
          <text x="135" y="42" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">⚽ SPORTS STRATEGY</text>

          {/* Cartoon Goal Post & Ball Target Arc */}
          <g transform="translate(35, 75)">
            {/* Goal Frame */}
            <rect x="20" y="15" width="160" height="90" fill="none" stroke="#ffffff" strokeWidth="4" rx="4" />
            <line x1="20" y1="45" x2="180" y2="45" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="20" y1="75" x2="180" y2="75" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            {/* Target Crosshair */}
            <circle cx="150" cy="40" r="16" fill="none" stroke="#facc15" strokeWidth="3" />
            <text x="150" y="45" textAnchor="middle" fill="#facc15" fontSize="13" fontWeight="900">GOAL</text>
            {/* Soccer ball with trajectory arc */}
            <path d="M 30 110 Q 90 30 145 40" fill="none" stroke="#4ade80" strokeWidth="3" strokeDasharray="5 5" />
            <circle cx="30" cy="110" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <circle cx="30" cy="110" r="5" fill="#1e293b" />
          </g>

          {/* Probability Stat Pill */}
          <rect x="25" y="210" width="220" height="48" rx="14" fill="#0c0320" stroke="#facc15" strokeWidth="2" />
          <text x="135" y="240" textAnchor="middle" fill="#facc15" fontSize="18" fontWeight="900" fontFamily="sans-serif">P(Goal Score) = 80%</text>
          <text x="135" y="280" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="800" fontFamily="sans-serif">Historical Penalty Conversions</text>
        </g>
      </svg>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0422]/75 via-transparent to-black/20 pointer-events-none" />

      {/* Top-Right 20:8 Ratio Badge */}
      <div className="absolute top-2.5 right-3 bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 font-display font-900 text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 pointer-events-none">
        <span>🎬</span>
        <span>20:8 Story Art</span>
      </div>

      {/* Bottom Floating Caption Pill */}
      <div className="absolute bottom-2.5 left-3 right-3 sm:left-4 sm:right-4 bg-[#14082c]/90 border border-amber-400/50 rounded-xl px-3.5 py-1.5 text-center text-amber-200 font-display font-900 text-xs sm:text-sm shadow-xl backdrop-blur-md flex items-center justify-center gap-2">
        <span className="text-amber-400">✦</span>
        <span>Real World Decisions: Weather Predictions, TV Game Shows, and Penalty Kick Analytics!</span>
        <span className="text-amber-400">✦</span>
      </div>
    </div>
  );
}

/* Slide 8: Step Into the Chance Lab (Custom 20:8 Animated Cartoon Vector Scene) */
export function SceneLab() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl group shadow-2xl bg-[#09031d] flex items-center justify-center border border-purple-400/50">
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ aspectRatio: '20 / 8' }}
      >
        <defs>
          <linearGradient id="bg8g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e0b4b" />
            <stop offset="50%" stopColor="#2e1065" />
            <stop offset="100%" stopColor="#0f0529" />
          </linearGradient>
          <linearGradient id="portalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <filter id="portalGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#c084fc" floodOpacity="0.8" />
          </filter>
          <filter id="sparkGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#facc15" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Dynamic Cartoon Background */}
        <rect width="1000" height="400" fill="url(#bg8g)" />

        {/* Laboratory Circuit Floor & Arch */}
        <path d="M 0 340 L 350 280 L 650 280 L 1000 340 L 1000 400 L 0 400 Z" fill="#12062b" />
        <line x1="350" y1="280" x2="650" y2="280" stroke="#a855f7" strokeWidth="4" />
        <line x1="150" y1="360" x2="380" y2="280" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
        <line x1="850" y1="360" x2="620" y2="280" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

        {/* Central High-Tech Portal Gate */}
        <g transform="translate(500, 180)">
          {/* Outer Portal Rings */}
          <ellipse cx="0" cy="0" rx="190" ry="120" fill="none" stroke="url(#portalGrad)" strokeWidth="8" filter="url(#portalGlow)" />
          <ellipse cx="0" cy="0" rx="160" ry="98" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="12 8" opacity="0.7" />
          <ellipse cx="0" cy="0" rx="140" ry="80" fill="#2e1065" opacity="0.85" />

          {/* Portal Center Energy Core */}
          <ellipse cx="0" cy="0" rx="90" ry="50" fill="#facc15" opacity="0.4" filter="url(#portalGlow)" />
          <text x="0" y="-15" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="900" fontFamily="sans-serif">🧪 CHANCE LAB 🎲</text>
          <text x="0" y="20" textAnchor="middle" fill="#facc15" fontSize="16" fontWeight="900" fontFamily="sans-serif">ENTER EXPERIMENTAL ZONE</text>
        </g>

        {/* Left Floating Station: 3D Crystal Dice */}
        <g transform="translate(180, 150)" filter="url(#sparkGlow)">
          <rect x="-40" y="-40" width="80" height="80" rx="18" fill="#38bdf8" stroke="#ffffff" strokeWidth="4" transform="rotate(-15)" />
          {/* Die Pips */}
          <circle cx="-15" cy="-15" r="6" fill="#ffffff" />
          <circle cx="15" cy="15" r="6" fill="#ffffff" />
          <circle cx="0" cy="0" r="6" fill="#ffffff" />
          <text x="0" y="70" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="900" fontFamily="sans-serif">Dice Lab</text>
        </g>

        {/* Right Floating Station: Golden Coin & Spinner */}
        <g transform="translate(820, 150)" filter="url(#sparkGlow)">
          <circle cx="0" cy="0" r="42" fill="#facc15" stroke="#ffffff" strokeWidth="4" />
          <circle cx="0" cy="0" r="32" fill="#eab308" />
          <text x="0" y="8" textAnchor="middle" fill="#713f12" fontSize="26" fontWeight="900" fontFamily="sans-serif">½</text>
          <text x="0" y="70" textAnchor="middle" fill="#facc15" fontSize="16" fontWeight="900" fontFamily="sans-serif">Coin Lab</text>
        </g>

        {/* Mascot Robot Assistant on Left */}
        <g transform="translate(310, 240)">
          <rect x="-25" y="-30" width="50" height="40" rx="12" fill="#c084fc" stroke="#ffffff" strokeWidth="3" />
          <circle cx="-10" cy="-12" r="5" fill="#1e1b4b" />
          <circle cx="10" cy="-12" r="5" fill="#1e1b4b" />
          <path d="M -8 -2 Q 0 4 8 -2" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="-30" x2="0" y2="-45" stroke="#ffffff" strokeWidth="3" />
          <circle cx="0" cy="-47" r="4" fill="#facc15" />
        </g>

        {/* Mascot Robot Assistant on Right */}
        <g transform="translate(690, 240)">
          <rect x="-25" y="-30" width="50" height="40" rx="12" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
          <circle cx="-10" cy="-12" r="5" fill="#082f49" />
          <circle cx="10" cy="-12" r="5" fill="#082f49" />
          <path d="M -8 -2 Q 0 4 8 -2" fill="none" stroke="#082f49" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="-30" x2="0" y2="-45" stroke="#ffffff" strokeWidth="3" />
          <circle cx="0" cy="-47" r="4" fill="#4ade80" />
        </g>

        {/* Floating Confetti and Sparkles */}
        {[
          [100, 70, '#facc15'], [250, 40, '#38bdf8'], [400, 30, '#c084fc'],
          [600, 40, '#4ade80'], [750, 30, '#f43f5e'], [900, 70, '#facc15'],
          [480, 320, '#facc15'], [520, 320, '#38bdf8']
        ].map(([cx, cy, col], i) => (
          <polygon
            key={i}
            points={`${cx},${cy-8} ${cx+3},${cy-3} ${cx+8},${cy} ${cx+3},${cy+3} ${cx},${cy+8} ${cx-3},${cy+3} ${cx-8},${cy} ${cx-3},${cy-3}`}
            fill={col}
            opacity="0.9"
          />
        ))}
      </svg>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0422]/75 via-transparent to-black/20 pointer-events-none" />

      {/* Top-Right 20:8 Ratio Badge */}
      <div className="absolute top-2.5 right-3 bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 font-display font-900 text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 pointer-events-none">
        <span>🎬</span>
        <span>20:8 Story Art</span>
      </div>

      {/* Bottom Floating Caption Pill */}
      <div className="absolute bottom-2.5 left-3 right-3 sm:left-4 sm:right-4 bg-[#14082c]/90 border border-amber-400/50 rounded-xl px-3.5 py-1.5 text-center text-amber-200 font-display font-900 text-xs sm:text-sm shadow-xl backdrop-blur-md flex items-center justify-center gap-2">
        <span className="text-amber-400">✦</span>
        <span>The Interactive Chance Lab Awaits — Roll Dice, Flip Coins, and Master Probability!</span>
        <span className="text-amber-400">✦</span>
      </div>
    </div>
  );
}
