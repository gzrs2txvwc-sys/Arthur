"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ── Pink noise: Paul Kellet's algorithm ────────────
function makePinkNoise(ctx: AudioContext, seconds = 6): AudioBuffer {
  const n = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
    b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
    b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
    d[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;
    b6 = w*0.115926;
  }
  return buf;
}

function makeWhiteNoise(ctx: AudioContext, seconds = 5): AudioBuffer {
  const n = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

// ── Konbini entry chime (G5 → E5 → G5) ────────────
function playChime(ctx: AudioContext, dest: AudioNode, when = 0) {
  [783.99, 659.25, 783.99].forEach((freq, i) => {
    const t = when + i * 0.22;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.065, t + 0.04);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
    osc.connect(env);
    env.connect(dest);
    osc.start(t);
    osc.stop(t + 0.52);
  });
}

export function AmbientSoundscape() {
  const [active, setActive] = useState(false);
  const ctxRef   = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const chimeRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleChime = useCallback((ctx: AudioContext, dest: AudioNode) => {
    const delay = 32000 + Math.random() * 72000; // 32–104 s
    chimeRef.current = setTimeout(() => {
      if (ctxRef.current === ctx) {
        playChime(ctx, dest, ctx.currentTime);
        scheduleChime(ctx, dest);
      }
    }, delay);
  }, []);

  const start = useCallback(async () => {
    try {
      const CtxClass =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new CtxClass();
      await ctx.resume();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0.85;
      master.connect(ctx.destination);
      masterRef.current = master;

      const now = ctx.currentTime;

      // ── Rain: white noise → highpass → lowpass ──
      const rainSrc = ctx.createBufferSource();
      rainSrc.buffer = makeWhiteNoise(ctx);
      rainSrc.loop = true;
      const rhpf = ctx.createBiquadFilter(); rhpf.type = "highpass"; rhpf.frequency.value = 1800;
      const rlpf = ctx.createBiquadFilter(); rlpf.type = "lowpass";  rlpf.frequency.value = 7500;
      const rGain = ctx.createGain();
      rGain.gain.setValueAtTime(0, now);
      rGain.gain.linearRampToValueAtTime(0.32, now + 4.5);
      rainSrc.connect(rhpf); rhpf.connect(rlpf); rlpf.connect(rGain); rGain.connect(master);
      rainSrc.start();

      // ── City ambient: pink noise → lowpass ──────
      const citySrc = ctx.createBufferSource();
      citySrc.buffer = makePinkNoise(ctx);
      citySrc.loop = true;
      const clpf = ctx.createBiquadFilter(); clpf.type = "lowpass"; clpf.frequency.value = 620;
      const cGain = ctx.createGain();
      cGain.gain.setValueAtTime(0, now);
      cGain.gain.linearRampToValueAtTime(0.26, now + 3);
      citySrc.connect(clpf); clpf.connect(cGain); cGain.connect(master);
      citySrc.start();

      // ── Train hum: triangle osc + LFO + lowpass ─
      const trainOsc = ctx.createOscillator();
      trainOsc.type = "triangle";
      trainOsc.frequency.value = 58;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 4.8;
      const lfoG = ctx.createGain(); lfoG.gain.value = 9;
      lfo.connect(lfoG); lfoG.connect(trainOsc.frequency);
      const tlpf = ctx.createBiquadFilter(); tlpf.type = "lowpass"; tlpf.frequency.value = 155;
      const tGain = ctx.createGain();
      tGain.gain.setValueAtTime(0, now);
      tGain.gain.linearRampToValueAtTime(0.042, now + 6);
      trainOsc.connect(tlpf); tlpf.connect(tGain); tGain.connect(master);
      trainOsc.start(); lfo.start();

      // ── First chime after a short pause ─────────
      setTimeout(() => {
        if (ctxRef.current === ctx) {
          playChime(ctx, master, ctx.currentTime);
          scheduleChime(ctx, master);
        }
      }, 8000);

      setActive(true);
    } catch {
      // Web Audio not available
    }
  }, [scheduleChime]);

  const stop = useCallback(() => {
    if (chimeRef.current) { clearTimeout(chimeRef.current); chimeRef.current = null; }
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 1.8);
      setTimeout(() => ctx.close(), 2200);
      ctxRef.current = null;
      masterRef.current = null;
    }
    setActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => { stop(); }, [stop]);

  return (
    <button
      onClick={active ? stop : start}
      title={active ? "Mute ambient" : "Play ambient sound"}
      className="flex items-center gap-2 text-caption
        text-[var(--color-muted)] hover:text-[var(--color-sand)]
        transition-colors duration-300"
      style={{
        padding: "7px 12px",
        background: "rgba(10,10,10,0.82)",
        border: "1px solid rgba(200,184,154,0.1)",
        backdropFilter: "blur(14px)",
        borderRadius: "2px",
      }}
    >
      {/* Visual indicator */}
      <span className="flex items-end gap-[3px]" style={{ height: 12 }}>
        {active ? (
          [1, 1.5, 0.7, 1.3].map((d, i) => (
            <span
              key={i}
              className="block w-[2px] rounded-sm bg-[var(--color-sand)]"
              style={{
                height: "10px",
                transformOrigin: "bottom",
                animation: `audio-bar 0.65s ease-in-out ${(d * 0.12).toFixed(2)}s infinite alternate`,
              }}
            />
          ))
        ) : (
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" style={{ opacity: 0.5 }}>
            <path d="M0 4h2.5L6 1v9L2.5 7H0z" fill="currentColor" />
            <path d="M9 3L12 8M12 3L9 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        )}
      </span>

      <span style={{ fontSize: "9px", letterSpacing: "0.14em" }}>
        {active ? "ambient on" : "ambient"}
      </span>
    </button>
  );
}
