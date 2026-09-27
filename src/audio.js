/* =========================================================================
   AUDIO ENGINE — Local MP3 Playback + Web Speech API + Web Audio SFX
   100% Offline / Local: Zero external API keys needed.
   Plays pre-generated local MP3 files from /assets/audio/
   Falls back cleanly to browser SpeechSynthesis if an MP3 is absent.
   ========================================================================= */

export const VOICE_ID = "Xb7hH8MSUJpSbSDYk0k2";

export let audioMuted = false;
let currentAudioElement = null;
let currentUtterance = null;
let resolveCurrentSegment = null;
let currentQueue = 0;
let audioUnlocked = false;
let audioCtx = null;
let pendingNarration = null;

// Helper to get or resume Web Audio Context
export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Global browser gesture unlocker
export function unlockAudio() {
  audioUnlocked = true;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  // Play a tiny silent buffer to unlock HTMLAudioElement across all modern browsers
  try {
    const silent = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
    silent.volume = 0.01;
    silent.play().then(() => silent.pause()).catch(() => {});
  } catch (e) {}

  // If there was a pending narration queued before user gesture, play it now!
  if (pendingNarration && !audioMuted) {
    const { segList, myQueue } = pendingNarration;
    pendingNarration = null;
    if (myQueue === currentQueue) {
      narrate(segList, true);
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
}

export function setMuted(m) {
  audioMuted = Boolean(m);
  if (audioMuted) {
    stopNarration();
  }
}

export function stopNarration() {
  currentQueue++;
  pendingNarration = null;

  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
      currentAudioElement.src = '';
    } catch (e) {}
    currentAudioElement = null;
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  currentUtterance = null;

  if (resolveCurrentSegment) {
    const resolve = resolveCurrentSegment;
    resolveCurrentSegment = null;
    resolve();
  }
}

// SpeechSynthesis fallback speaker (100% offline, zero API keys)
function speakTextFallback(text, myQueue, resolve) {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text) {
    return resolve();
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Female'))) ||
      voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    currentUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
      if (myQueue === currentQueue) resolve();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      currentUtterance = null;
      if (myQueue === currentQueue) resolve();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("SpeechSynthesis exception:", err);
    resolve();
  }
}

export function speakSegment(seg) {
  return new Promise((resolve) => {
    if (audioMuted || !seg) return resolve();

    // Determine local MP3 file path & text
    let filePath = null;
    let textToSpeak = '';

    if (typeof seg === 'string') {
      if (seg.endsWith('.mp3')) {
        filePath = seg;
      } else if (seg.startsWith('http') || seg.startsWith('/')) {
        filePath = seg;
      } else {
        filePath = `/assets/audio/${seg}.mp3`;
      }
      textToSpeak = seg;
    } else if (seg && typeof seg === 'object') {
      if (seg.file) {
        filePath = seg.file;
      }
      textToSpeak = seg.text || '';
    }

    // Normalizing relative path if necessary
    if (filePath && !filePath.startsWith('http') && !filePath.startsWith('data:')) {
      const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
      filePath = `${cleanBase}${cleanPath}`;
    }

    // Stop previous audio playback element without invalidating queue
    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
      } catch (e) {}
      currentAudioElement = null;
    }

    const myQueue = currentQueue;

    resolveCurrentSegment = () => {
      if (currentAudioElement) {
        try {
          currentAudioElement.pause();
          currentAudioElement.currentTime = 0;
        } catch (e) {}
        currentAudioElement = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      resolve();
    };

    // If no audio file path, use Web Speech API fallback
    if (!filePath) {
      return speakTextFallback(textToSpeak, myQueue, resolve);
    }

    try {
      const audio = new Audio(filePath);
      audio.volume = 1.0;
      audio.crossOrigin = "anonymous";
      currentAudioElement = audio;

      audio.onended = () => {
        if (currentAudioElement === audio) currentAudioElement = null;
        if (myQueue === currentQueue) resolve();
      };

      audio.onerror = (err) => {
        console.warn("Local audio file failed, using SpeechSynthesis fallback:", filePath, err);
        if (currentAudioElement === audio) currentAudioElement = null;
        if (myQueue === currentQueue) {
          speakTextFallback(textToSpeak, myQueue, resolve);
        } else {
          resolve();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play error (will retry or fallback):", filePath, err);
          if (myQueue === currentQueue) {
            // If autoplay was blocked, fallback or queue
            if (!audioUnlocked) {
              pendingNarration = { segList: [seg], myQueue };
            } else {
              speakTextFallback(textToSpeak, myQueue, resolve);
              return;
            }
          }
          resolve();
        });
      }
    } catch (e) {
      console.warn("Audio creation error, using SpeechSynthesis fallback:", e);
      speakTextFallback(textToSpeak, myQueue, resolve);
    }
  });
}

export async function narrate(segments, autoplay = true) {
  if (!autoplay || audioMuted || !segments) return;
  stopNarration();
  const myQueue = currentQueue;
  const segList = Array.isArray(segments) ? segments.filter(Boolean) : [segments];
  if (segList.length === 0) return;

  for (const seg of segList) {
    if (myQueue !== currentQueue || audioMuted) return;
    await speakSegment(seg);
  }
}

// Built-in Synthesizer for rich interactive Sound Effects (zero external dependencies)
export function playSfx(type) {
  if (audioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'correct' || type === 'success') {
      // Cheerful rising major triad chime
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.36);
      });
    } else if (type === 'incorrect' || type === 'error') {
      // Gentle descending boop
      [349.23, 293.66].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.15, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.26);
      });
    } else if (type === 'coin' || type === 'spin') {
      // Metallic ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.41);
    } else if (type === 'dice') {
      // Wooden dice roll clack
      [180, 240, 210, 280].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        gain.gain.setValueAtTime(0.08, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.07);
      });
    } else if (type === 'click') {
      // Clean micro UI click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch (e) {}
}

export const say = text => ({ text, style: 'statement' });
export const ask = text => ({ text, style: 'question' });
export const cheer = text => ({ text, style: 'celebration' });
export const emphasize = text => ({ text, style: 'emphasis' });
export const think = text => ({ text, style: 'thinking' });
export const celebrate = text => ({ text, style: 'celebration' });
export const instruct = text => ({ text, style: 'encouragement' });

