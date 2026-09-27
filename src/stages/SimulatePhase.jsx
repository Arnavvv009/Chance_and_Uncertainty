import React, { useState, useEffect } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { AUDIO_MAP } from '../audioMap.js';
import { narrate, cheer, stopNarration, playSfx, unlockAudio } from '../audio.js';

/* =========================================================================
   STORY-ALIGNED REAL-WORLD SIMULATION STATIONS (GRADE 7 PROBABILITY)
   Every activity is directly connected to a real-world scenario from the Story Phase:
   - Station 1: Coin flip shootouts, board game dice, carnival prize wheel
   - Station 2: Sports equipment marble bags, card games, school festival raffle
   - Station 3: Sports Day weather forecasts, city traffic lights, game show doors
   ========================================================================= */

const STATION_ACTIVITIES = {
  1: [
    {
      id: 1,
      storyRef: "Story Slide 1 & 2: Coin Flips & 50/50 Scale",
      title: "Activity 1: Referee Coin Flip Shootout",
      realWorldDesc: "Before a soccer penalty shootout, the referee flips a coin to decide who kicks first. Flip the coin up to 200 times and watch how experimental probability approaches the theoretical 50%!",
      type: "coin",
      outcomes: ["Heads 🪙", "Tails 🪙"],
      theoretical: [0.5, 0.5],
      icon: "⚽",
      hint: "Law of Large Numbers: As trial count increases, experimental probability gets closer to theoretical 50%!"
    },
    {
      id: 2,
      storyRef: "Story Slide 3: Sample Space & Die Faces",
      title: "Activity 2: Board Game Dice Arena",
      storyDesc: "In board games like Monopoly, movement depends on rolling a 6-sided die. Track the sample space {1, 2, 3, 4, 5, 6} and test if each face has an equal 1/6 probability.",
      type: "dice",
      outcomes: ["Face 1", "Face 2", "Face 3", "Face 4", "Face 5", "Face 6"],
      theoretical: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6],
      icon: "🎲",
      hint: "Theoretical probability is P(each face) = 1/6 ≈ 16.7%. Every face has an equal chance!"
    },
    {
      id: 3,
      storyRef: "Story Slide 1 & 5: Unequal Sectors & Wheel of Fortune",
      title: "Activity 3: Carnival Prize Wheel Sprint",
      storyDesc: "At the school carnival, a prize wheel has 4 color slices. Gold covers half the wheel (50%), Sky Blue 25%, Coral 15%, and Mint 10%. Spin the wheel to test the winning odds!",
      type: "spinner",
      outcomes: ["Gold (50%)", "Sky (25%)", "Coral (15%)", "Mint (10%)"],
      theoretical: [0.5, 0.25, 0.15, 0.10],
      icon: "🎡",
      hint: "Gold covers half the wheel (180°), so P(Gold) = 0.5 — bigger slices win more often!"
    }
  ],
  2: [
    {
      id: 1,
      storyRef: "Story Slide 4: Favourable ÷ Total Formula",
      title: "Activity 1: Sports Equipment Bag (Marbles)",
      storyDesc: "A coach picks practice bibs or marbles out of an equipment bag without looking. Set total marbles and red marbles to calculate P(red) in fraction, decimal, and percent formats.",
      type: "marbles",
      icon: "🔴",
      hint: "Master Formula: P(red) = Red Marbles ÷ Total Marbles."
    },
    {
      id: 2,
      storyRef: "Story Slide 4 & 5: Standard 52-Card Deck Probability",
      title: "Activity 2: Card Game Deck Inspector",
      storyDesc: "In card games like Hearts or Solitaire, a standard deck has 52 cards across 4 suits (13 cards each). Select a target suit or group to inspect its exact probability.",
      type: "cards",
      icon: "🃏",
      hint: "A 52-card deck has 13 Hearts (P=13/52=1/4), 12 Face cards (12/52=3/13), and 26 Red cards (26/52=1/2)."
    },
    {
      id: 3,
      storyRef: "Story Slide 5: School Festival Raffle Ticket Draw",
      title: "Activity 3: School Festival Raffle Draw",
      storyDesc: "Your class sells raffle tickets for a grand prize bike. Change the total number of tickets sold to calculate your exact chance of holding the single winning ticket!",
      type: "raffle",
      icon: "🎟️",
      hint: "Formula: P(Win) = 1 ÷ Total Tickets Sold."
    }
  ],
  3: [
    {
      id: 1,
      storyRef: "Story Slide 6 & 7: Weather Forecast Complements",
      title: "Activity 1: Sports Day Weather Forecast Detective",
      storyDesc: "Maya's weather app forecasts P(rain) = 0.30 (30%) for Sports Day. Work backwards using the complement rule to find the probability that it does NOT rain!",
      type: "weather",
      given: 0.30,
      givenLabel: "P(rain) = 0.30 (30%)",
      target: 0.70,
      ask: "P(no rain)",
      hint: "Complement Rule: P(not rain) = 1 − P(rain) = 1 − 0.30 = 0.70 (70%)."
    },
    {
      id: 2,
      storyRef: "Story Slide 7: City Traffic Light Signal Timing",
      title: "Activity 2: City Traffic Light Signal Puzzle",
      storyDesc: "A city traffic light runs a 20-second total cycle. If P(green) = 0.60 (60%), how many seconds of the cycle stay green?",
      type: "traffic",
      given: 0.60,
      givenLabel: "P(green) = 0.60, Total Cycle = 20 seconds",
      target: 12,
      ask: "green seconds",
      hint: "Favourable Seconds = P(green) × Total Cycle = 0.60 × 20 = 12 seconds."
    },
    {
      id: 3,
      storyRef: "Story Slide 7: TV Game Show Vault Door Mystery",
      title: "Activity 3: TV Game Show Grand Finale Vault",
      storyDesc: "On a TV game show finale, P(win car) = 25% (0.25). If there is exactly 1 winning door, how many total closed doors are on the game show stage?",
      type: "gameshow",
      given: 0.25,
      givenLabel: "P(win) = 25% (1/4), 1 winning door",
      target: 4,
      ask: "total doors",
      hint: "Total Doors = Favourable Doors ÷ P(win) = 1 ÷ 0.25 = 4 doors."
    }
  ]
};

function randOutcomeIndex(weights) {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (r <= acc) return i;
  }
  return weights.length - 1;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function fmtFrac(num, den) {
  const g = gcd(num, den) || 1;
  return `${num / g}/${den / g}`;
}

export function SimulatePhase({ muted, onNext }) {
  const [station, setStation] = useState(1);
  const [actIdx, setActIdx] = useState(0);

  // Station 1 State
  const [trials, setTrials] = useState(50);
  const [tally, setTally] = useState(null);
  const [ranOnce, setRanOnce] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastOutcome, setLastOutcome] = useState(null);

  // Station 2 State
  const [totalMarbles, setTotalMarbles] = useState(10);
  const [favMarbles, setFavMarbles] = useState(4);
  const [cardGroup, setCardGroup] = useState('hearts');
  const [ticketCount, setTicketCount] = useState(20);
  const [showFormat, setShowFormat] = useState('fraction'); // 'fraction', 'decimal', 'percent'

  // Station 3 State
  const [reverseAnswer, setReverseAnswer] = useState('');
  const [reverseFeedback, setReverseFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const currentActivity = STATION_ACTIVITIES[station][actIdx];

  useEffect(() => {
    stopNarration();
    setTally(null);
    setRanOnce(false);
    setIsSimulating(false);
    setLastOutcome(null);
    setReverseAnswer('');
    setReverseFeedback(null);
    setShowHint(false);
    const actKey = `sim_act_${station}_${actIdx + 1}`;
    const stationKey = `sim_${station}`;
    const audioData = AUDIO_MAP[actKey] || AUDIO_MAP[stationKey];
    if (audioData) narrate(audioData, !muted);
    return () => stopNarration();
  }, [station, actIdx, muted]);

  const runTrials = () => {
    unlockAudio();
    setIsSimulating(true);
    if (currentActivity.type === 'coin') playSfx('coin');
    else if (currentActivity.type === 'die' || currentActivity.type === 'dice') playSfx('dice');
    else playSfx('spin');

    setTimeout(() => {
      const weights = currentActivity.theoretical;
      const counts = new Array(weights.length).fill(0);
      let lastIdx = 0;
      for (let i = 0; i < trials; i++) {
        const idx = randOutcomeIndex(weights);
        counts[idx]++;
        lastIdx = idx;
      }
      setTally(counts);
      setLastOutcome(currentActivity.outcomes[lastIdx]);
      setRanOnce(true);
      setIsSimulating(false);
      cheer("Awesome! Experimental trials completed!");
    }, 800);
  };

  const handleReverseCheck = () => {
    unlockAudio();
    const num = parseFloat(reverseAnswer);
    const ok = Math.abs(num - currentActivity.target) < 0.011;
    if (ok) {
      playSfx('correct');
      setReverseFeedback({
        success: true,
        text: `🎉 Correct! ${currentActivity.ask} = ${currentActivity.target}!`
      });
      cheer("Spot-on mathematical deduction!");
    } else {
      playSfx('incorrect');
      setReverseFeedback({
        success: false,
        text: `Not quite! Hint: ${currentActivity.hint}`
      });
    }
  };

  const nextActivity = () => {
    unlockAudio();
    if (actIdx < 2) {
      setActIdx(i => i + 1);
    } else if (station < 3) {
      setStation(s => s + 1);
      setActIdx(0);
    } else {
      onNext();
    }
  };

  const prevActivity = () => {
    if (actIdx > 0) {
      setActIdx(i => i - 1);
    } else if (station > 1) {
      setStation(s => s - 1);
      setActIdx(2);
    }
  };

  // Station 2 Calculations
  const pFav = totalMarbles > 0 ? favMarbles / totalMarbles : 0;
  const CARD_GROUPS = {
    hearts: { label: "Hearts Suit (13 cards)", fav: 13, icon: "♥", color: "text-red-400" },
    face: { label: "Face Cards J, Q, K (12 cards)", fav: 12, icon: "👑", color: "text-amber-300" },
    aces: { label: "Aces (4 cards)", fav: 4, icon: "🅰️", color: "text-cyan-300" },
    red: { label: "Red Cards (26 cards)", fav: 26, icon: "♦", color: "text-rose-400" }
  };
  const cardFav = CARD_GROUPS[cardGroup].fav;
  const cardP = cardFav / 52;
  const ticketP = 1 / ticketCount;

  const renderP = (fav, total, pVal) => {
    if (showFormat === 'decimal') return pVal.toFixed(3);
    if (showFormat === 'percent') return `${(pVal * 100).toFixed(1)}%`;
    return `${fmtFrac(fav, total)} (${fav}/${total})`;
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <BgSymbols />

      <div className="w-full max-w-6xl max-h-[94vh] bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden">
        
        {/* Top Header Pill */}
        <div className="w-full flex items-center justify-between mb-3 shrink-0 border-b border-white/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">🧪</span>
            <div className="text-left">
              <h2 className="font-display font-900 text-xl sm:text-2xl text-white">
                Real-World Simulation Lab
              </h2>
              <span className="text-xs sm:text-sm font-extrabold text-cyan-300">
                Grade 7 Probability · Inspired by Story Phase Concepts
              </span>
            </div>
          </div>

          <div className="bg-[#14082c] border border-purple-400/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-display font-900 text-amber-300 shadow-md">
            Station {station} of 3 · Activity {actIdx + 1} of 3
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 w-full items-stretch flex-1 min-h-0 overflow-hidden">
          
          {/* Left Column: Station Sidebar Tabs */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3 shrink-0">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setStation(1); setActIdx(0); }}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                  station === 1
                    ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_22px_rgba(56,189,248,0.4)] scale-[1.02]'
                    : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                    station === 1 ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                  }`}>🪙</div>
                  <div>
                    <p className="font-display font-900 text-sm sm:text-base leading-tight">Station 1: Trial Experiments</p>
                    <p className="text-[11px] font-extrabold text-slate-300 mt-0.5">Coins, Dice &amp; Prize Wheels</p>
                  </div>
                </div>
                <span className="text-sm">🔓</span>
              </button>

              <button
                onClick={() => { setStation(2); setActIdx(0); }}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                  station === 2
                    ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_22px_rgba(56,189,248,0.4)] scale-[1.02]'
                    : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                    station === 2 ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                  }`}>📐</div>
                  <div>
                    <p className="font-display font-900 text-sm sm:text-base leading-tight">Station 2: Master Formula</p>
                    <p className="text-[11px] font-extrabold text-slate-300 mt-0.5">Marbles, Cards &amp; Raffle Tickets</p>
                  </div>
                </div>
                <span className="text-sm">🔓</span>
              </button>

              <button
                onClick={() => { setStation(3); setActIdx(0); }}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                  station === 3
                    ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_22px_rgba(56,189,248,0.4)] scale-[1.02]'
                    : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                    station === 3 ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                  }`}>🧩</div>
                  <div>
                    <p className="font-display font-900 text-sm sm:text-base leading-tight">Station 3: Inverse Solvers</p>
                    <p className="text-[11px] font-extrabold text-slate-300 mt-0.5">Weather, Traffic Lights &amp; Doors</p>
                  </div>
                </div>
                <span className="text-sm">🔓</span>
              </button>
            </div>

            {/* Story Alignment Pill */}
            <div className="bg-[#100624] border border-amber-400/40 rounded-2xl p-3 text-left">
              <span className="text-[10px] font-900 text-amber-300 uppercase tracking-wider block mb-1">
                ✦ STORY PHASE ALIGNMENT
              </span>
              <p className="text-xs font-bold text-slate-200 leading-snug">
                {currentActivity.storyRef || currentActivity.title}
              </p>
            </div>

            <button
              onClick={onNext}
              className="btn-gold font-display font-900 text-base sm:text-lg py-3.5 px-6 shadow-[0_0_25px_rgba(250,204,21,0.65)] hover:scale-105 transition mt-1 w-full flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Go to Practice Phase!</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Column: Interactive Activity Window */}
          <div className="md:col-span-8 bg-[#13092e]/95 border-2 border-purple-400/35 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-inner flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 justify-between">
              
              {/* Activity Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-2 shrink-0">
                <h3 className="font-display font-900 text-lg sm:text-xl text-cyan-300 flex items-center gap-2.5">
                  <span className="text-2xl sm:text-3xl">{currentActivity.icon}</span>
                  <span>{currentActivity.title}</span>
                </h3>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map(idx => (
                    <button
                      key={idx}
                      onClick={() => setActIdx(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition cursor-pointer ${
                        actIdx === idx ? 'bg-amber-400 text-slate-950 scale-110 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-extrabold mb-2 shrink-0">
                {currentActivity.storyDesc || currentActivity.realWorldDesc}
              </p>

              {/* STATION 1: TRIAL EXPERIMENTS */}
              {station === 1 && (
                <div className="flex flex-col gap-2.5 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0 overflow-hidden justify-between">
                  {/* Trial Count Selector */}
                  <div className="flex items-center gap-2 bg-[#14082c] px-3 py-1.5 rounded-xl border border-cyan-400/30 w-full justify-center shrink-0 flex-wrap">
                    <span className="text-xs font-extrabold text-slate-200">Trial Count (n):</span>
                    {[20, 50, 100, 200].map(v => (
                      <button
                        key={v}
                        onClick={() => { setTrials(v); setRanOnce(false); setTally(null); setLastOutcome(null); }}
                        className={`px-3 py-0.5 rounded-lg text-xs font-black transition cursor-pointer ${
                          trials === v ? 'bg-amber-400 text-slate-950 scale-105 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {v} Trials
                      </button>
                    ))}
                  </div>

                  {/* 2-Column Grid: Visual Apparatus + Horizontal Bar Graph */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full items-stretch flex-1 min-h-0">
                    
                    {/* Left Column: Visual Apparatus & Run Button */}
                    <div className="md:col-span-4 bg-[#14082c]/90 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-between shadow-inner shrink-0">
                      
                      {/* Coin Apparatus */}
                      {currentActivity.type === 'coin' && (
                        <div className="flex flex-col items-center justify-center my-auto py-1" style={{ perspective: '900px' }}>
                          <div className={`relative transition-all duration-300 ${isSimulating ? 'coin-toss-anim' : ''}`}>
                            <svg width="95" height="95" viewBox="0 0 140 140" className="drop-shadow-[0_0_18px_rgba(250,204,21,0.65)]">
                              <defs>
                                <radialGradient id="coinGoldGrad" cx="35%" cy="35%" r="65%">
                                  <stop offset="0%" stopColor="#fef08a" />
                                  <stop offset="35%" stopColor="#facc15" />
                                  <stop offset="75%" stopColor="#eab308" />
                                  <stop offset="100%" stopColor="#a16207" />
                                </radialGradient>
                                <linearGradient id="coinRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#fde047" />
                                  <stop offset="50%" stopColor="#b45309" />
                                  <stop offset="100%" stopColor="#78350f" />
                                </linearGradient>
                              </defs>
                              
                              {/* Outer Coin Edge with 3D Depth */}
                              <circle cx="70" cy="70" r="62" fill="url(#coinRimGrad)" />
                              <circle cx="70" cy="70" r="56" fill="url(#coinGoldGrad)" stroke="#92400e" strokeWidth="3" />
                              
                              {/* Milled / Ridged Border */}
                              <circle cx="70" cy="70" r="48" fill="none" stroke="#78350f" strokeWidth="2.5" strokeDasharray="5 3.5" />
                              
                              {/* Coin Face Display */}
                              {lastOutcome && lastOutcome.includes("Tails") ? (
                                <>
                                  <circle cx="70" cy="70" r="36" fill="#ca8a04" fillOpacity="0.25" />
                                  <text x="70" y="78" textAnchor="middle" fontSize="36" fontWeight="900" fill="#78350f" fontFamily="sans-serif">¢</text>
                                  <text x="70" y="98" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400e" letterSpacing="2">TAILS</text>
                                </>
                              ) : (
                                <>
                                  <text x="70" y="78" textAnchor="middle" fontSize="36" fontWeight="900">⚽</text>
                                  <text x="70" y="98" textAnchor="middle" fontSize="10" fontWeight="900" fill="#78350f" letterSpacing="2">HEADS</text>
                                </>
                              )}
                            </svg>
                          </div>

                          {/* Dynamic Floor Shadow */}
                          <div
                            className={`w-16 h-3 bg-black/60 rounded-full mt-2 blur-[2px] transition-all duration-300 ${
                              isSimulating ? 'coin-shadow-anim' : ''
                            }`}
                          />
                          
                          <span className="text-xs font-black text-amber-300 mt-1.5 flex items-center gap-1.5">
                            <span>Soccer Referee Coin</span>
                            {lastOutcome && !isSimulating && (
                              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                                {lastOutcome}
                              </span>
                            )}
                          </span>
                        </div>
                      )}

                      {/* Dice Apparatus */}
                      {currentActivity.type === 'dice' && (
                        <div className="flex flex-col items-center justify-center my-auto py-1">
                          <div className={`transition-transform duration-300 ${isSimulating ? 'animate-bounce' : ''}`}>
                            <svg width="90" height="90" viewBox="0 0 140 140" className="drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                              <rect x="20" y="20" width="100" height="100" rx="22" fill="#f8fafc" stroke="#38bdf8" strokeWidth="6" />
                              {[[45,45],[95,45],[45,95],[95,95],[70,70]].map((p,i)=>(
                                <circle key={i} cx={p[0]} cy={p[1]} r="8" fill="#1e1342" />
                              ))}
                            </svg>
                          </div>
                          <div className="w-14 h-2.5 bg-black/50 rounded-full mt-1.5 blur-[2px]" />
                          <span className="text-xs font-black text-cyan-300 mt-1.5">Board Game 6-Sided Die</span>
                        </div>
                      )}

                      {/* Spinner Apparatus */}
                      {currentActivity.type === 'spinner' && (
                        <div className="flex flex-col items-center justify-center my-auto py-1">
                          <svg width="95" height="95" viewBox="0 0 140 140" className={`drop-shadow-[0_0_20px_rgba(192,132,252,0.6)] ${isSimulating ? 'animate-spin' : ''}`}>
                            <circle cx="70" cy="70" r="58" fill="#0d0726" stroke="#c084fc" strokeWidth="4" />
                            <path d="M70 70 L70 12 A58 58 0 0 1 128 70 Z" fill="#facc15" />
                            <path d="M70 70 L128 70 A58 58 0 0 1 70 128 Z" fill="#38bdf8" />
                            <path d="M70 70 L70 128 A58 58 0 0 1 12 70 Z" fill="#f43f5e" />
                            <path d="M70 70 L12 70 A58 58 0 0 1 70 12 Z" fill="#4ade80" />
                            <circle cx="70" cy="70" r="7" fill="#fff" />
                            <polygon points="70,4 62,18 78,18" fill="#ffffff" />
                          </svg>
                          <div className="w-14 h-2.5 bg-black/50 rounded-full mt-1.5 blur-[2px]" />
                          <span className="text-xs font-black text-purple-300 mt-1.5">Carnival Prize Wheel</span>
                        </div>
                      )}

                      {/* Action Button */}
                      <button
                        disabled={isSimulating}
                        onClick={runTrials}
                        className="btn-gold text-xs sm:text-sm font-900 px-3 py-2 shadow-lg hover:scale-105 transition cursor-pointer w-full flex items-center justify-center gap-1.5 mt-1.5 disabled:opacity-50"
                      >
                        {isSimulating ? (
                          <span>{currentActivity.type === 'coin' ? '🪙 Tossing in Air...' : '🎲 Simulating...'}</span>
                        ) : ranOnce ? (
                          <span>🔄 Re-run {trials} Trials</span>
                        ) : (
                          <span>🎲 Run {trials} Trials</span>
                        )}
                      </button>
                    </div>

                    {/* Right Column: HORIZONTAL FREQUENCY GRAPH */}
                    <div className="md:col-span-8 bg-[#120729]/90 border-2 border-cyan-400/40 rounded-2xl p-3 flex flex-col justify-between gap-2 shadow-inner flex-1 min-h-0 overflow-hidden">
                      
                      {/* Graph Header with Legend */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 shrink-0 flex-wrap gap-1">
                        <span className="text-xs font-900 text-cyan-300 tracking-wide uppercase flex items-center gap-1.5">
                          <span>📊</span>
                          <span>Theoretical vs Experimental Frequency</span>
                        </span>
                        <div className="flex items-center gap-2.5 text-[10px] font-extrabold">
                          <span className="flex items-center gap-1 text-cyan-300">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_5px_rgba(56,189,248,0.8)]" />
                            Theory
                          </span>
                          <span className="flex items-center gap-1 text-amber-300">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                            Actual
                          </span>
                        </div>
                      </div>

                      {/* Horizontal Frequency Bars for Each Outcome */}
                      <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pr-1 min-h-0">
                        {currentActivity.outcomes.map((o, i) => {
                          const thPctNum = (currentActivity.theoretical[i] * 100);
                          const thPct = thPctNum.toFixed(1);
                          const gotCnt = tally ? tally[i] : 0;
                          const gotPctNum = tally ? ((gotCnt / trials) * 100) : 0;
                          const gotPct = gotPctNum.toFixed(1);
                          
                          return (
                            <div key={o} className="bg-[#180b36] border border-white/10 rounded-xl p-2 flex flex-col gap-1 shadow-sm shrink-0">
                              <div className="flex justify-between items-center text-xs font-black">
                                <span className="text-white flex items-center gap-1.5">{o}</span>
                                <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px]">
                                  <span className="text-cyan-300 font-bold">Theory: {thPct}%</span>
                                  {tally && (
                                    <span className="text-amber-300 font-bold">Got {gotCnt}/{trials} ({gotPct}%)</span>
                                  )}
                                </div>
                              </div>

                              {/* Horizontal Bar: Theoretical Target */}
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] sm:text-[10px] font-bold text-cyan-400/90 w-10 shrink-0">Theory</span>
                                <div className="flex-1 bg-slate-900/90 h-2.5 rounded-full overflow-hidden border border-cyan-400/30">
                                  <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                                    style={{ width: `${Math.min(100, thPctNum)}%` }}
                                  />
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 w-11 text-right shrink-0">{thPct}%</span>
                              </div>

                              {/* Horizontal Bar: Experimental Result */}
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] sm:text-[10px] font-bold w-10 shrink-0 ${tally ? 'text-amber-400' : 'text-slate-500'}`}>Actual</span>
                                <div className="flex-1 bg-slate-900/90 h-2.5 rounded-full overflow-hidden border border-amber-400/20">
                                  <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                                    style={{ width: tally ? `${Math.min(100, gotPctNum)}%` : '0%' }}
                                  />
                                </div>
                                <span className={`text-[9px] sm:text-[10px] font-mono font-bold w-11 text-right shrink-0 ${tally ? 'text-amber-300' : 'text-slate-500'}`}>
                                  {tally ? `${gotPct}%` : '—'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Educational Tip */}
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 text-center bg-[#14082c] py-1 px-2.5 rounded-lg border border-white/5 shrink-0">
                        {tally ? (
                          <span className="text-amber-300 font-extrabold">
                            ✨ Law of Large Numbers: At {trials} trials, experimental frequencies {trials >= 100 ? 'closely match' : 'approach'} theoretical probability!
                          </span>
                        ) : (
                          <span className="text-slate-300">
                            💡 Click <strong className="text-amber-300">"Run {trials} Trials"</strong> to see horizontal experimental frequency compare to the theoretical target!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STATION 2: MASTER FORMULA */}
              {station === 2 && (
                <div className="flex flex-col items-center gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-4 sm:p-5 shadow-xl flex-1 min-h-0 overflow-y-auto w-full justify-between">
                  
                  {/* Format Toggle Bar */}
                  <div className="flex items-center gap-2 shrink-0 bg-[#14082c] px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="text-xs font-extrabold text-slate-200">Format:</span>
                    {['fraction', 'decimal', 'percent'].map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setShowFormat(fmt)}
                        className={`px-3 py-1 rounded-lg text-xs font-900 capitalize transition cursor-pointer ${
                          showFormat === fmt ? 'bg-cyan-400 text-slate-950 shadow-md scale-105' : 'bg-white/10 text-white'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>

                  {currentActivity.type === 'marbles' && (
                    <>
                      <div className="flex flex-wrap items-center gap-3 bg-[#14082c] px-4 py-2 rounded-xl border border-cyan-400/30 w-full justify-center shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-200">Total Marbles:</span>
                        {[6, 8, 10, 12, 20].map(v => (
                          <button key={v} onClick={() => { setTotalMarbles(v); if (favMarbles > v) setFavMarbles(1); }}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${totalMarbles===v ? 'bg-amber-400 text-slate-950 scale-105 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 bg-[#14082c] px-4 py-2 rounded-xl border border-rose-400/30 w-full justify-center shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-200">Red Marbles:</span>
                        <input type="range" min="1" max={totalMarbles} value={favMarbles}
                          onChange={e => setFavMarbles(Number(e.target.value))}
                          className="w-40 accent-rose-400 cursor-pointer" />
                        <span className="text-xs font-black text-rose-300 bg-rose-400/10 px-3 py-0.5 rounded-lg border border-rose-400/30">{favMarbles}</span>
                      </div>

                      {/* Glass Jar SVG Diagram with Guaranteed In-Frame Centered Marbles */}
                      <svg width="180" height="135" viewBox="0 0 180 135" className="shrink-0 drop-shadow-lg my-1">
                        <path d="M 25 22 Q 15 110 90 128 Q 165 110 155 22 Z" fill="#241146" stroke="#a78bfa" strokeWidth="3.5" />
                        <ellipse cx="90" cy="22" rx="65" ry="9" fill="#3b1d75" stroke="#a78bfa" strokeWidth="3" />
                        {Array.from({ length: totalMarbles }).map((_, i) => {
                          const cols = totalMarbles <= 10 ? 5 : 6;
                          const r = totalMarbles <= 10 ? 8.5 : 7;
                          const row = Math.floor(i / cols);
                          const col = i % cols;
                          const rowGap = totalMarbles <= 10 ? 22 : 18;
                          const colGap = totalMarbles <= 10 ? 22 : 18;
                          const itemsInRow = Math.min(cols, totalMarbles - row * cols);
                          const startX = 90 - ((itemsInRow - 1) * colGap) / 2;
                          const x = startX + col * colGap;
                          const y = 42 + row * rowGap;
                          const color = i < favMarbles ? '#f43f5e' : '#38bdf8';
                          return (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r={r}
                              fill={color}
                              stroke="#0d0726"
                              strokeWidth="1.5"
                            />
                          );
                        })}
                      </svg>

                      <div className="w-full bg-[#14082c]/90 border-2 border-amber-400/40 p-3.5 rounded-2xl text-center shadow-inner shrink-0">
                        <span className="text-xs text-slate-300 font-extrabold block mb-1">EQUATION RESULT:</span>
                        <div className="text-amber-300 font-display font-900 text-lg sm:text-xl">
                          P(red) = Favourable / Total = {renderP(favMarbles, totalMarbles, pFav)}
                        </div>
                      </div>
                    </>
                  )}

                  {currentActivity.type === 'cards' && (
                    <>
                      <div className="flex flex-wrap items-center gap-2.5 bg-[#14082c] px-3 py-2 rounded-xl border border-cyan-400/30 w-full justify-center shrink-0">
                        {Object.entries(CARD_GROUPS).map(([key, g]) => (
                          <button key={key} onClick={() => setCardGroup(key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${cardGroup===key ? 'bg-amber-400 text-slate-950 scale-105 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                            <span>{g.icon}</span>
                            <span>{g.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-3 shrink-0 my-1">
                        {['♠','♥','♦','♣'].map((s) => (
                          <div key={s} className="w-14 h-20 rounded-xl bg-white border-2 border-slate-400 flex items-center justify-center text-3xl font-black shadow-lg"
                            style={{ color: (s==='♥'||s==='♦') ? '#dc2626' : '#0f172a' }}>
                            {s}
                          </div>
                        ))}
                      </div>

                      <div className="w-full bg-[#14082c]/90 border-2 border-amber-400/40 p-3.5 rounded-2xl text-center shadow-inner shrink-0">
                        <span className="text-xs text-slate-300 font-extrabold block mb-1">EQUATION RESULT:</span>
                        <div className="text-amber-300 font-display font-900 text-lg sm:text-xl">
                          P({CARD_GROUPS[cardGroup].label}) = {renderP(cardFav, 52, cardP)}
                        </div>
                      </div>
                    </>
                  )}

                  {currentActivity.type === 'raffle' && (
                    <>
                      <div className="flex flex-wrap items-center gap-3 bg-[#14082c] px-4 py-2 rounded-xl border border-cyan-400/30 w-full justify-center shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-200">Total Tickets Sold:</span>
                        {[10, 20, 25, 50, 100].map(v => (
                          <button key={v} onClick={() => setTicketCount(v)}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${ticketCount===v ? 'bg-amber-400 text-slate-950 scale-105 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                            {v} Tickets
                          </button>
                        ))}
                      </div>

                      <svg width="150" height="90" viewBox="0 0 150 90" className="shrink-0 drop-shadow-md">
                        <rect x="20" y="20" width="110" height="50" rx="10" fill="#78350f" stroke="#facc15" strokeWidth="3" />
                        <circle cx="75" cy="45" r="18" fill="#fde047" />
                        <text x="75" y="52" textAnchor="middle" fontSize="16" fontWeight="900" fill="#78350f">🎟️</text>
                      </svg>

                      <div className="w-full bg-[#14082c]/90 border-2 border-amber-400/40 p-3.5 rounded-2xl text-center shadow-inner shrink-0">
                        <span className="text-xs text-slate-300 font-extrabold block mb-1">EQUATION RESULT:</span>
                        <div className="text-amber-300 font-display font-900 text-lg sm:text-xl">
                          P(winning ticket) = 1 / {ticketCount} = {renderP(1, ticketCount, ticketP)}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STATION 3: INVERSE SOLVERS */}
              {station === 3 && (
                <div className="flex flex-col items-center gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-4 sm:p-5 shadow-xl flex-1 min-h-0 justify-between">
                  
                  <div className="flex items-center justify-center gap-6 w-full flex-1 min-h-0 flex-wrap">
                    {currentActivity.type === 'weather' && (
                      <svg width="140" height="120" viewBox="0 0 150 130" className="shrink-0 drop-shadow-md">
                        <circle cx="75" cy="60" r="50" fill="#0d0726" stroke="#38bdf8" strokeWidth="3" />
                        <path d="M75 60 L75 10 A50 50 0 0 1 118 78 Z" fill="#fde047" />
                        <path d="M75 60 L118 78 A50 50 0 1 1 75 10 Z" fill="#38bdf8" opacity="0.85" />
                        <text x="92" y="45" fontSize="22">☀️</text>
                        <text x="48" y="90" fontSize="22">🌧️</text>
                      </svg>
                    )}
                    {currentActivity.type === 'traffic' && (
                      <svg width="80" height="130" viewBox="0 0 90 150" className="shrink-0 drop-shadow-md">
                        <rect x="15" y="10" width="60" height="130" rx="16" fill="#1e293b" stroke="#facc15" strokeWidth="3" />
                        <circle cx="45" cy="45" r="18" fill="#f43f5e" opacity="0.35" />
                        <circle cx="45" cy="80" r="18" fill="#facc15" opacity="0.35" />
                        <circle cx="45" cy="115" r="18" fill="#4ade80" />
                      </svg>
                    )}
                    {currentActivity.type === 'gameshow' && (
                      <svg width="170" height="100" viewBox="0 0 180 110" className="shrink-0 drop-shadow-md">
                        {[0,1,2,3].map(i => (
                          <rect key={i} x={10 + i*42} y="20" width="32" height="70" rx="5" fill={i===1 ? '#facc15' : '#7c3aed'} stroke="#fff" strokeWidth="2" />
                        ))}
                      </svg>
                    )}

                    <div className="text-left text-xs sm:text-sm font-extrabold text-slate-100 flex flex-col gap-2 shrink-0 bg-[#14082c] p-3.5 rounded-xl border border-white/10 min-w-[230px]">
                      <p>• Given: <span className="text-amber-300 font-900">{currentActivity.givenLabel}</span></p>
                      <p>• Solve for: <span className="text-cyan-300 font-900">{currentActivity.ask}</span></p>
                    </div>
                  </div>

                  {/* Input & Verification Row */}
                  <div className="flex items-center gap-3 w-full justify-center shrink-0 flex-wrap">
                    <input
                      type="number"
                      placeholder={`Enter ${currentActivity.ask}`}
                      value={reverseAnswer}
                      onChange={e => setReverseAnswer(e.target.value)}
                      className="bg-[#14082c] border-2 border-cyan-400/70 rounded-xl px-4 py-2.5 text-white font-display font-900 text-base text-center outline-none focus:border-amber-400 w-52 shadow-inner"
                    />
                    <button
                      onClick={handleReverseCheck}
                      className="btn-gold text-xs sm:text-sm font-900 px-6 py-2.5 shadow-lg hover:scale-105 transition cursor-pointer"
                    >
                      Check Answer ✨
                    </button>
                    <button
                      onClick={() => setShowHint(h => !h)}
                      className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 font-display font-900 text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      💡 Hint
                    </button>
                  </div>

                  {showHint && (
                    <div className="p-3 bg-amber-950/90 border border-amber-400/50 text-amber-200 rounded-xl text-xs font-bold w-full text-center fade-in-up shrink-0">
                      💡 {currentActivity.hint}
                    </div>
                  )}

                  {reverseFeedback && (
                    <div className={`p-3 rounded-xl text-xs sm:text-sm font-900 w-full text-center shadow-xl shrink-0 ${
                      reverseFeedback.success ? 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-400/60' : 'bg-rose-950/90 text-rose-300 border-2 border-rose-400/60'
                    }`}>
                      {reverseFeedback.text}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Nav Row */}
            <div className="flex items-center justify-between border-t border-white/15 pt-3 mt-3 shrink-0">
              <button
                onClick={prevActivity}
                disabled={station === 1 && actIdx === 0}
                className="bg-[#1c0d3a]/90 hover:bg-[#2c1859] border-2 border-white/25 text-white font-display font-900 text-xs sm:text-sm px-5 py-2 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
              >
                ← Previous
              </button>

              <button
                onClick={nextActivity}
                className="btn-gold text-xs sm:text-sm font-900 px-7 py-2 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <span>{station === 3 && actIdx === 2 ? 'Go to Practice Phase' : 'Next Activity'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
