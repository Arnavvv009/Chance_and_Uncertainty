import React, { useEffect } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { AUDIO_MAP } from '../audioMap.js';
import { narrate, stopNarration, unlockAudio } from '../audio.js';

export function WonderPhase({ muted, onNext }) {
  useEffect(() => {
    narrate(AUDIO_MAP.wonder_1, !muted);
    return () => stopNarration();
  }, [muted]);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none z-10">
      <BgSymbols />

      <div className="w-full max-w-2xl glass-card flex flex-col items-center text-center fade-in-up z-20 my-auto">
        {/* Glowing Phase Band */}
        <div className="phase-band phase-band--wonder" />

        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">🔍</span>
          <span className="text-purple-300 font-display font-800 text-xs sm:text-sm tracking-wider uppercase">
            Phase 1: Wonder & Curiosity
          </span>
        </div>

        <h2 className="text-main-heading text-purple-200 mb-3 max-w-xl">
          What Are the Odds It Rains on Sports Day?
        </h2>

        {/* Feature Stat Box */}
        <div className="w-full bg-[#1e143c]/90 border border-purple-400/30 rounded-2xl p-4 sm:p-6 mb-4 flex flex-col items-center shadow-xl">
          <div className="text-number text-amber-300 text-4xl sm:text-6xl mb-1">
            Only a 1 in 4 Chance!
          </div>
          <p className="text-body text-slate-200 max-w-lg">
            Maya checked the forecast app before Sports Day. It said there's a <span className="text-amber-300 font-bold">25% chance of rain</span> — meaning it's far more likely to stay dry than to rain!
          </p>
        </div>

        {/* Mascot Thinking Bubble with Replay Button */}
        <div className="flex items-center justify-between gap-3 bg-[#14082c]/90 border border-purple-500/40 rounded-2xl px-5 py-3 mb-5 w-full max-w-lg shadow-lg">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-purple-500/30 text-purple-200 flex items-center justify-center font-bold text-base shrink-0">
              🤖
            </div>
            <p className="text-slate-200 text-xs sm:text-sm font-extrabold leading-snug">
              How do forecasters, gamers, and scientists actually measure "how likely" something is?
            </p>
          </div>
          <button
            onClick={() => {
              unlockAudio();
              stopNarration();
              narrate(AUDIO_MAP.wonder_1, true);
            }}
            className="bg-purple-500/40 hover:bg-purple-500/60 border border-purple-300/40 text-purple-200 font-display font-900 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow shrink-0 cursor-pointer transition hover:scale-105"
            title="Listen to audio narration"
          >
            <span>🔊</span>
            <span>Listen</span>
          </button>
        </div>

        <button
          onClick={() => {
            unlockAudio();
            onNext();
          }}
          className="btn-gold flex items-center gap-2"
        >
          <span>Explore the Story</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
