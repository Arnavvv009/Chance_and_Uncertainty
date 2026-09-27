import React, { useState, useEffect } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { AUDIO_MAP } from '../audioMap.js';
import { narrate, stopNarration, unlockAudio } from '../audio.js';
import {
  SceneEveryyday, SceneWordScale, SceneOutcomes, SceneFormula,
  SceneGauge, SceneComplement, SceneRealWorld, SceneLab
} from '../components/StoryArt.jsx';

const STORY_SLIDES = [
  {
    id: 1,
    title: "Chance Is All Around Us",
    audioKey: "story_1",
    Art: SceneEveryyday,
    body: "Weather forecasts, dice games, card draws, and spinner wheels — chance shows up everywhere. Some things are certain, some are impossible, and most sit somewhere in between!",
    quote: "Probability is the mathematics of 'how likely'.",
    bubble: "Let's uncover the hidden rules behind every roll, flip, and spin!"
  },
  {
    id: 2,
    title: "The Language of Chance",
    audioKey: "story_2",
    Art: SceneWordScale,
    body: "Every event can be described using words like impossible, unlikely, even chance, likely, or certain. These words match numbers on a scale from 0 to 1 — or 0% to 100%.",
    quote: "Probability always lives between 0 (impossible) and 1 (certain).",
    bubble: "An even chance — like a coin flip — sits right in the middle at ½!"
  },
  {
    id: 3,
    title: "What Is an Outcome?",
    audioKey: "story_3",
    Art: SceneOutcomes,
    body: "An outcome is one possible result of an experiment, like rolling a 4 on a die or flipping heads on a coin. The full list of every possible outcome is called the sample space.",
    quote: "A die has 6 outcomes. A coin has 2 outcomes.",
    bubble: "Before we find probability, we must list every possible outcome first!"
  },
  {
    id: 4,
    title: "The Probability Formula",
    audioKey: "story_4",
    Art: SceneFormula,
    body: "To find the probability of an event, divide the number of favorable outcomes by the total number of possible outcomes. This gives us one master formula for every chance question!",
    quote: "P(Event) = Favorable Outcomes ÷ Total Outcomes",
    bubble: "3 blue marbles out of 8 total means P(blue) = 3/8!"
  },
  {
    id: 5,
    title: "Reading the Probability Scale",
    audioKey: "story_5",
    Art: SceneGauge,
    body: "Probability can be written as a fraction, a decimal, or a percent — they all mean the same thing! 3/4 is the same chance as 0.75, which is the same as 75%.",
    quote: "Fraction, Decimal, Percent — three ways to say one chance.",
    bubble: "Practice switching between the three forms — it's a superpower!"
  },
  {
    id: 6,
    title: "Complementary Events",
    audioKey: "story_6",
    Art: SceneComplement,
    body: "The complement of an event is everything that ISN'T that event. If P(sun) = 0.75, then P(not sun) must be 0.25, because every possibility together always adds up to exactly 1.",
    quote: "P(A) + P(not A) = 1",
    bubble: "Know one probability, and you instantly know its complement too!"
  },
  {
    id: 7,
    title: "Real World Magic: Games & Weather",
    audioKey: "story_7",
    Art: SceneRealWorld,
    body: "Meteorologists use probability to forecast rain, game shows use it to design fair prizes, and athletes study it to plan strategy. Chance quietly shapes decisions everywhere!",
    quote: "Understanding probability helps you make smarter predictions.",
    bubble: "From weather apps to penalty kicks, probability is working behind the scenes!"
  },
  {
    id: 8,
    title: "Step Into the Chance Lab!",
    audioKey: "story_8",
    Art: SceneLab,
    body: "Awesome job! You've learned about outcomes, the probability formula, the scale, and complements. Now step into the lab to flip coins, roll dice, and crack chance puzzles!",
    quote: "Ready to test your hands-on probability skills?",
    bubble: "Click below to enter the interactive lab!"
  }
];

export function StoryPhase({ muted, onDone, onSlideChange }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const slide = STORY_SLIDES[slideIdx];
  const Art = slide.Art;

  // 1. Inform TopNav about slide progress (without triggering audio lifecycle resets)
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(slideIdx + 1, STORY_SLIDES.length);
    }
  }, [slideIdx, onSlideChange]);

  // 2. Play slide audio on slide change or unmute
  useEffect(() => {
    const audioData = AUDIO_MAP[slide.audioKey];
    if (audioData && !muted) {
      setIsPlayingAudio(true);
      narrate(audioData, true).finally(() => {
        setIsPlayingAudio(false);
      });
    } else {
      setIsPlayingAudio(false);
    }
    return () => {
      stopNarration();
      setIsPlayingAudio(false);
    };
  }, [slideIdx, muted]);

  const playSlideAudio = () => {
    unlockAudio();
    stopNarration();
    const audioData = AUDIO_MAP[slide.audioKey];
    if (audioData) {
      setIsPlayingAudio(true);
      narrate(audioData, true).finally(() => {
        setIsPlayingAudio(false);
      });
    }
  };

  const goNext = () => {
    unlockAudio();
    if (slideIdx < STORY_SLIDES.length - 1) {
      setSlideIdx(i => i + 1);
    } else {
      onDone();
    }
  };

  const goPrev = () => {
    unlockAudio();
    if (slideIdx > 0) setSlideIdx(i => i - 1);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <BgSymbols />

      {/* Main Story Card with 20:8 Ratio Animated Cartoon Artwork & Premium Typography */}
      <div className="w-full max-w-5xl max-h-[94vh] bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col gap-3.5 fade-in-up z-20 my-auto overflow-hidden">
        {/* Top: 20:8 Aspect Ratio Hero Cartoon Illustration */}
        <div className="w-full aspect-[20/8] max-h-[260px] sm:max-h-[320px] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-400/50 bg-black/50 shrink-0 flex items-center justify-center">
          <Art />

          {/* Quick Floating Audio Listen Button on Hero Banner */}
          <button
            onClick={playSlideAudio}
            className="absolute top-2.5 left-3 bg-black/70 hover:bg-black/90 backdrop-blur-md border border-amber-400/60 text-amber-300 font-display font-900 text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-all duration-200 hover:scale-105 cursor-pointer z-30"
            title="Listen to story audio narration"
          >
            <span>{isPlayingAudio ? "🔊" : "🔈"}</span>
            <span>{isPlayingAudio ? "Narrating..." : "Play Voice"}</span>
            {isPlayingAudio && (
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-amber-300 rounded-full animate-bounce" />
                <span className="w-1 h-2.5 bg-amber-400 rounded-full animate-pulse" />
              </span>
            )}
          </button>
        </div>

        {/* Bottom: Story Narrative, Formula Quote Pill, and Mascot Speech Bubble */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center flex-1 min-h-0">
          {/* Left / Main Narrative Column */}
          <div className="md:col-span-7 flex flex-col gap-1.5 sm:gap-2 justify-center text-left">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-display font-900 text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full shadow">
                Slide {slideIdx + 1} of {STORY_SLIDES.length}
              </span>
              <h2 className="font-display font-900 text-xl sm:text-2xl md:text-3xl text-amber-400 leading-tight drop-shadow-md">
                {slide.title}
              </h2>
            </div>

            <p className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed font-extrabold drop-shadow-sm">
              {slide.body}
            </p>
          </div>

          {/* Right / Interactive Callouts Column */}
          <div className="md:col-span-5 flex flex-col gap-2 sm:gap-2.5 justify-center">
            {/* Pull-Quote Sparkle Pill */}
            <div className="w-full bg-[#1e0e45] border-2 border-amber-400/60 rounded-xl px-3.5 py-2 text-center text-amber-300 font-display font-900 text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-lg">
              <span className="shrink-0 text-base sm:text-lg">✨</span>
              <span className="leading-snug">"{slide.quote}"</span>
              <span className="shrink-0 text-base sm:text-lg">✨</span>
            </div>

            {/* Mascot Speech Bubble Pill with Replay Audio Button */}
            <div className="flex items-center gap-2.5 w-full">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-400 flex items-center justify-center text-2xl shadow-lg shrink-0">
                🎲
              </div>
              <div className="bg-white text-[#0c031d] rounded-xl px-3.5 py-2 font-display font-900 text-xs sm:text-sm shadow-xl flex-1 text-left leading-snug flex items-center justify-between gap-2">
                <span>{slide.bubble}</span>
                <button
                  onClick={playSlideAudio}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-900 text-[10px] sm:text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer transition hover:scale-105"
                  title="Replay slide audio narration"
                >
                  <span>🔊</span>
                  <span>{isPlayingAudio ? "Playing" : "Listen"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Row: Back, Dots, Next */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-3 z-20 shrink-0">
        <button
          onClick={goPrev}
          disabled={slideIdx === 0}
          className="bg-[#1c0d3a]/90 hover:bg-[#2c1859] border-2 border-white/30 text-white font-display font-900 text-xl sm:text-2xl px-10 py-4 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-xl hover:scale-105"
        >
          ← Back
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-3.5">
          {STORY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                unlockAudio();
                setSlideIdx(i);
              }}
              className={`rounded-full transition-all cursor-pointer ${
                i === slideIdx
                  ? 'w-4.5 h-4.5 bg-amber-400 shadow-[0_0_18px_rgba(250,204,21,0.9)]'
                  : 'w-3.5 h-3.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="btn-gold text-xl sm:text-2xl px-11 py-4 font-900 flex items-center gap-2 shadow-[0_0_35px_rgba(250,204,21,0.85)] hover:scale-105"
        >
          <span>{slideIdx === STORY_SLIDES.length - 1 ? 'Enter Lab 🧪' : 'Next'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
