"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ── Data ───────────────────────────────────────────────────

const EMOTIONS = [
  { key: "Solitude",  ja: "孤独",   color: "#7a8fa0" },
  { key: "Wandering", ja: "漂流",   color: "#a08070" },
  { key: "Quiet",     ja: "静寂",   color: "#8a9e8a" },
  { key: "Tender",    ja: "柔らか", color: "#c4a0a0" },
  { key: "Restless",  ja: "焦燥",   color: "#b0a060" },
  { key: "Invisible", ja: "透明",   color: "#7090a8" },
  { key: "Homesick",  ja: "郷愁",   color: "#a070a0" },
  { key: "Adrift",    ja: "漂い",   color: "#6888a0" },
  { key: "Belonging", ja: "帰属",   color: "#7a9e80" },
  { key: "Anchored",  ja: "錨",     color: "#907060" },
] as const;

type EmotionKey = typeof EMOTIONS[number]["key"];

const STYLES = [
  { key: "dark",  label: "深夜", colors: ["#100c07", "#0c0906"] },
  { key: "rain",  label: "雨",   colors: ["#0d1015", "#0e1520"] },
  { key: "fog",   label: "霧",   colors: ["#141618", "#1c2024"] },
  { key: "amber", label: "夕暮", colors: ["#150e06", "#201408"] },
  { key: "blue",  label: "夜明", colors: ["#06080f", "#0a0e1a"] },
  { key: "frost", label: "冬",   colors: ["#0e1214", "#121a1e"] },
] as const;

type StyleKey = typeof STYLES[number]["key"];

const FORMATS = {
  square:  { W: 1080, H: 1080, label: "1080 × 1080 · Instagram Square" },
  story:   { W: 1080, H: 1920, label: "1080 × 1920 · Instagram Story" },
  twitter: { W: 1200, H: 675,  label: "1200 × 675 · X / Twitter" },
  minimal: { W: 1080, H: 1080, label: "1080 × 1080 · Minimal" },
} as const;

type FormatKey = keyof typeof FORMATS;

const PRESETS = [
  { emotion: "Solitude" as EmotionKey,  location: "新宿 · Shinjuku",        time: "午前3時",  text: "雨が降ると、東京は少し正直になる。" },
  { emotion: "Quiet" as EmotionKey,     location: "谷中 · Yanaka",           time: "",         text: "ここでは時間が、他の場所より少しゆっくり流れる。" },
  { emotion: "Wandering" as EmotionKey, location: "下北沢 · Shimokitazawa",  time: "終電後",   text: "Nobody had told me about this neighborhood. That might be why it was good." },
  { emotion: "Tender" as EmotionKey,    location: "清澄白河 · Kiyosumi",     time: "朝",       text: "川のそば、コーヒーの香りだけが今日を優しくした。" },
  { emotion: "Adrift" as EmotionKey,    location: "新宿 · Shinjuku",         time: "3am",      text: "There is a particular loneliness to standing under a convenience store awning at 3am while Tokyo dissolves in the rain around you." },
  { emotion: "Homesick" as EmotionKey,  location: "中目黒 · Nakameguro",     time: "桜の季節", text: "花が散るのを見ていると、どこか知らない場所が恋しくなる。" },
];

const AI_QUOTES_JA: Record<EmotionKey, string[]> = {
  Solitude:  ["孤独は、東京では特定の形をとる。混雑した車両の中での孤独だ。","午前3時のコンビニ。誰も何も聞かない。それが、ありがたかった。","東京に迷い込んで気づいた——孤独は街の大きさに比例しない。"],
  Wandering: ["地図を持たずに歩くと、街は別の顔を見せる。","どこへ行くかわからないまま歩き続けた。それが正解だった。","迷子になることを、東京は罰しない。"],
  Quiet:     ["静かな東京は存在する。ただ、知っている人だけが見つけられる。","雑音が消えた瞬間、街の本当の声が聞こえた。","谷中の路地で、時間が止まっているのに気づいた。"],
  Tender:    ["東京の優しさは、押しつけない。ただ、そこにある。","小さな親切が、長い一日を救うことがある。","見知らぬ人が傘を貸してくれた。名前も聞かなかった。"],
  Restless:  ["東京は眠らない。私も眠れなかった。それが合っていた。","何かが起きそうな夜。何も起きなかった。それでよかった。","終電を逃したのは、もう少しだけいたかったからだ。"],
  Invisible: ["誰も私を見ていない。それが、この街での自由だった。","人混みに消えることを、東京は許してくれる。","透明になれる場所が、どこかに必要だった。"],
  Homesick:  ["故郷が恋しいのか、それとも存在しない場所が恋しいのか。","桜を見ると、会ったことのない誰かを思い出す。","帰りたい場所が、まだわからない。"],
  Adrift:    ["流れに任せると、東京は連れて行ってくれる。どこかへ。","目的地のない電車に乗った。終点は知らなかった。","漂うことを選ぶ夜がある。"],
  Belonging: ["ここに属しているわけではない。でも、追い出されもしない。","常連になった日、店主が名前を聞いた。それだけで十分だった。","根を張るのではなく、馴染む。それが東京との付き合い方だ。"],
  Anchored:  ["変わり続ける街の中で、変わらないものを見つけた。","同じ場所に戻ること。それが、この街での儀式になった。","錨は重い。でも、嵐の中では必要だ。"],
};

const AI_QUOTES_EN: Record<EmotionKey, string[]> = {
  Solitude:  ["Tokyo does not ask why you are alone. It simply makes room for you.","3am in Shinjuku and the city keeps its own company. So do you.","There is a particular loneliness here that does not feel like loneliness."],
  Wandering: ["Walk without a map and Tokyo becomes a different city entirely.","I got lost on purpose. The city did not mind.","Every wrong turn was the right one."],
  Quiet:     ["The quiet parts of Tokyo exist. You just have to earn them.","Silence here is not absence. It is a different kind of presence.","Yanaka at dawn, before the city remembered it was Tokyo."],
  Tender:    ["Small kindnesses accumulate. Tokyo runs on them.","A stranger held the elevator door. That was enough.","The city is harder than it looks and gentler than you expect."],
  Restless:  ["Some cities calm you. Tokyo winds you up and sends you back out.","I could not sleep. The city could not either. We understood each other.","Restlessness here feels productive. Like something is about to happen."],
  Invisible: ["In a crowd of millions, nobody looks at you. That is the gift.","Invisibility is not loneliness. In Tokyo, it is freedom.","I disappeared into the city and found myself on the other side."],
  Homesick:  ["Homesick for a place that may not exist anywhere but here.","The cherry blossoms make you miss something you cannot name.","Distance is not always measured in kilometers."],
  Adrift:    ["Drift long enough and Tokyo starts to feel like home.","I boarded a train with no destination. That was the destination.","Adrift is not lost. It is a different way of being found."],
  Belonging: ["You do not belong here. But after a while, neither does anyone else.","Belonging here is not citizenship. It is repetition. Ritual. Return.","The ramen place remembered my order. That was the day I stayed."],
  Anchored:  ["In a city that never stops moving, stillness is an act of will.","I found my corner of Tokyo. Small and impermanent and entirely mine.","The city changes around you. You become the fixed point."],
};

// ── Canvas renderer ───────────────────────────────────────

function drawQuote(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  centerY: number,
  maxW: number,
  sizeJa: number,
  sizeEn: number,
  align: "left" | "center" = "left",
  alignX = 0
) {
  const isJa = /[぀-ヿ一-鿿＀-￯]/.test(text);
  const fontSize = isJa ? sizeJa : sizeEn;
  const italic = isJa ? "" : "italic ";
  const fontFace = isJa ? '"Noto Serif JP", serif' : '"Cormorant Garamond", "Noto Serif JP", serif';
  ctx.font = `${italic}400 ${fontSize}px ${fontFace}`;
  const lineH = fontSize * 1.65;

  const lines: string[] = [];
  if (isJa) {
    let cur = "";
    for (const ch of text) {
      const t = cur + ch;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = ch; }
      else cur = t;
    }
    if (cur) lines.push(cur);
  } else {
    let cur = "";
    for (const w of text.split(" ")) {
      const t = cur ? cur + " " + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; }
      else cur = t;
    }
    if (cur) lines.push(cur);
  }

  const totalH = lines.length * lineH;
  const startY = centerY - totalH / 2 + lineH * 0.5;

  // Opening quote mark ghost
  ctx.save();
  ctx.font = `${italic}400 ${fontSize * 1.8}px ${fontFace}`;
  ctx.fillStyle = "rgba(201,169,110,0.13)";
  if (align === "center") {
    ctx.font = `${italic}400 ${fontSize}px ${fontFace}`;
    const firstW = ctx.measureText(lines[0] ?? "").width;
    ctx.font = `${italic}400 ${fontSize * 1.8}px ${fontFace}`;
    ctx.textAlign = "left";
    ctx.fillText("“", alignX - firstW / 2 - fontSize * 0.6, startY - fontSize * 0.2);
  } else {
    ctx.fillText("“", x - fontSize * 0.4, startY - fontSize * 0.2);
  }
  ctx.restore();

  ctx.save();
  ctx.font = `${italic}400 ${fontSize}px ${fontFace}`;
  ctx.fillStyle = "#e8e2d9";
  ctx.textAlign = align === "center" ? "center" : "left";
  lines.forEach((l, i) => ctx.fillText(l, align === "center" ? alignX : x, startY + i * lineH));
  ctx.restore();
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  emotion: EmotionKey,
  text: string,
  location: string,
  time: string,
  styleName: StyleKey,
  format: FormatKey
) {
  const fmt = FORMATS[format];
  const W = fmt.W, H = fmt.H;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const emo = EMOTIONS.find(e => e.key === emotion) ?? EMOTIONS[0];

  const bgMap: Record<StyleKey, { c0: string; c1: string }> = {
    dark:  { c0: "#1a1510", c1: "#0c0906" },
    rain:  { c0: "#111820", c1: "#080c12" },
    fog:   { c0: "#1c2024", c1: "#0e1012" },
    amber: { c0: "#201408", c1: "#100a04" },
    blue:  { c0: "#0a0e1a", c1: "#050710" },
    frost: { c0: "#121a1e", c1: "#080e12" },
  };
  const bg = bgMap[styleName];

  const g = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.9);
  g.addColorStop(0, bg.c0); g.addColorStop(1, bg.c1);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // Grain
  for (let i = 0; i < 12000; i++) {
    const gx = Math.random() * W, gy = Math.random() * H;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.012})`;
    ctx.fillRect(gx, gy, 1, 1);
  }

  // Style overlays
  if (styleName === "rain") {
    ctx.save();
    ctx.strokeStyle = "rgba(140,170,210,0.045)";
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 100; i++) {
      const rx = Math.random() * W * 1.2 - W * 0.1;
      ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx - 30, H); ctx.stroke();
    }
    ctx.restore();
  }
  if (styleName === "fog") {
    const fg = ctx.createRadialGradient(W * 0.2, H * 0.4, 0, W * 0.2, H * 0.4, W * 0.7);
    fg.addColorStop(0, "rgba(190,205,215,0.05)"); fg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
    const fg2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, W * 0.5);
    fg2.addColorStop(0, "rgba(190,205,215,0.03)"); fg2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fg2; ctx.fillRect(0, 0, W, H);
  }
  if (styleName === "amber") {
    const ag = ctx.createRadialGradient(W * 0.15, H * 0.85, 0, W * 0.15, H * 0.85, W * 0.6);
    ag.addColorStop(0, "rgba(200,120,30,0.08)"); ag.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = ag; ctx.fillRect(0, 0, W, H);
  }
  if (styleName === "blue") {
    const bl = ctx.createRadialGradient(W * 0.7, H * 0.2, 0, W * 0.7, H * 0.2, W * 0.65);
    bl.addColorStop(0, "rgba(40,80,180,0.07)"); bl.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = bl; ctx.fillRect(0, 0, W, H);
  }

  const PAD = W * 0.075;
  const SITE_URL = "arthur-lac.vercel.app";

  if (format === "minimal") {
    const BIG = PAD * 2;
    ctx.save();
    ctx.fillStyle = emo.color; ctx.globalAlpha = 0.4;
    ctx.fillRect(BIG, H * 0.08, W - BIG * 2, 1);
    ctx.fillRect(BIG, H * 0.92, W - BIG * 2, 1);
    ctx.restore();
    drawQuote(ctx, text, BIG, H * 0.42, W - BIG * 2, W * 0.046, W * 0.04, "center", W / 2);
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = `400 ${W * 0.014}px "Cormorant Garamond", serif`;
    ctx.fillStyle = emo.color; ctx.globalAlpha = 0.5;
    ctx.fillText(emotion, W / 2, H * 0.78);
    ctx.globalAlpha = 1;
    ctx.font = `300 ${W * 0.012}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = "rgba(232,226,217,0.3)";
    ctx.fillText(location, W / 2, H * 0.815);
    ctx.fillStyle = "rgba(201,169,110,0.25)";
    ctx.fillText(`間 · ${SITE_URL}`, W / 2, H * 0.91);
    ctx.restore();
    return;
  }

  if (format === "story") {
    ctx.save();
    ctx.strokeStyle = emo.color; ctx.lineWidth = 1; ctx.globalAlpha = 0.3;
    ctx.beginPath(); ctx.moveTo(PAD, H * 0.06); ctx.lineTo(W - PAD, H * 0.06); ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.font = `300 ${W * 0.1}px "Cormorant Garamond", serif`;
    ctx.fillStyle = "#c9a96e"; ctx.globalAlpha = 0.85; ctx.textAlign = "center";
    ctx.fillText("間", W / 2, H * 0.12);
    ctx.font = `300 ${W * 0.028}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = "rgba(201,169,110,0.4)";
    ctx.fillText(`MA · ${SITE_URL}`, W / 2, H * 0.145);
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "rgba(201,169,110,0.12)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(PAD, H * 0.17); ctx.lineTo(W - PAD, H * 0.17); ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.font = `300 ${W * 0.04}px "Cormorant Garamond", serif`;
    ctx.fillStyle = emo.color; ctx.globalAlpha = 0.6; ctx.textAlign = "center";
    ctx.fillText(`${emotion} · ${emo.ja}`, W / 2, H * 0.21);
    ctx.restore();
    drawQuote(ctx, text, PAD, H * 0.36, W - PAD * 2, W * 0.055, W * 0.048, "center", W / 2);
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = `300 ${W * 0.032}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = "rgba(232,226,217,0.4)";
    ctx.fillText(location, W / 2, H * 0.72);
    if (time) {
      ctx.font = `300 ${W * 0.026}px "Noto Serif JP", sans-serif`;
      ctx.fillStyle = "rgba(232,226,217,0.2)";
      ctx.fillText(time, W / 2, H * 0.745);
    }
    ctx.strokeStyle = "rgba(201,169,110,0.12)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(PAD, H * 0.93); ctx.lineTo(W - PAD, H * 0.93); ctx.stroke();
    ctx.font = `300 ${W * 0.025}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = "rgba(201,169,110,0.3)";
    ctx.fillText(`間 · ${SITE_URL} · 記憶の地図`, W / 2, H * 0.96);
    ctx.restore();
    return;
  }

  if (format === "twitter") {
    ctx.save();
    ctx.fillStyle = emo.color; ctx.globalAlpha = 0.45;
    ctx.fillRect(0, H * 0.15, 3, H * 0.7);
    ctx.restore();
    ctx.save();
    ctx.font = `300 ${H * 0.07}px "Cormorant Garamond", serif`;
    ctx.fillStyle = "#c9a96e"; ctx.globalAlpha = 0.9;
    ctx.fillText("間", PAD, H * 0.2);
    ctx.font = `300 ${H * 0.038}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = "rgba(201,169,110,0.4)";
    ctx.fillText("MA", PAD, H * 0.29);
    ctx.textAlign = "right";
    ctx.font = `300 ${H * 0.05}px "Cormorant Garamond", serif`;
    ctx.fillStyle = emo.color; ctx.globalAlpha = 0.5;
    ctx.fillText(emotion, W - PAD, H * 0.23);
    ctx.font = `300 ${H * 0.038}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = emo.color; ctx.globalAlpha = 0.35;
    ctx.fillText(emo.ja, W - PAD, H * 0.32);
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "rgba(201,169,110,0.1)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(PAD, H * 0.37); ctx.lineTo(W - PAD, H * 0.37); ctx.stroke();
    ctx.restore();
    drawQuote(ctx, text, PAD, H * 0.48, W - PAD * 2, H * 0.1, H * 0.085);
    ctx.save();
    ctx.font = `300 ${H * 0.038}px "Noto Serif JP", sans-serif`;
    ctx.fillStyle = "rgba(232,226,217,0.3)";
    ctx.fillText(location + (time ? ` · ${time}` : ""), PAD, H * 0.835);
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(201,169,110,0.3)";
    ctx.fillText(SITE_URL, W - PAD, H * 0.835);
    ctx.restore();
    return;
  }

  // Square (default)
  ctx.save();
  ctx.fillStyle = emo.color; ctx.globalAlpha = 0.55;
  ctx.fillRect(0, H * 0.22, 3, H * 0.56);
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "rgba(201,169,110,0.13)"; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(PAD, H * 0.13); ctx.lineTo(W - PAD, H * 0.13); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(PAD, H * 0.87); ctx.lineTo(W - PAD, H * 0.87); ctx.stroke();
  ctx.restore();
  // Logo
  ctx.save();
  ctx.font = `300 ${W * 0.035}px "Cormorant Garamond", serif`;
  ctx.fillStyle = "#c9a96e"; ctx.globalAlpha = 0.9;
  ctx.fillText("間", PAD, H * 0.1);
  ctx.font = `300 ${W * 0.013}px "Noto Serif JP", sans-serif`;
  ctx.fillStyle = "rgba(201,169,110,0.45)";
  ctx.fillText("MA · 記憶の地図", PAD + W * 0.042, H * 0.097);
  ctx.textAlign = "right";
  ctx.font = `300 ${W * 0.013}px "Cormorant Garamond", serif`;
  ctx.fillStyle = emo.color; ctx.globalAlpha = 0.7;
  ctx.fillText(emotion, W - PAD, H * 0.097);
  ctx.restore();
  // Quote
  drawQuote(ctx, text, PAD, W * 0.4, W - PAD * 2, W * 0.042, W * 0.038);
  // Meta
  const metaY = H * 0.77;
  ctx.save();
  ctx.font = `300 ${W * 0.016}px "Noto Serif JP", sans-serif`;
  ctx.fillStyle = emo.color; ctx.globalAlpha = 0.65;
  ctx.fillText(emo.ja, PAD, metaY);
  ctx.fillStyle = "rgba(232,226,217,0.35)"; ctx.globalAlpha = 1;
  ctx.font = `300 ${W * 0.014}px "Noto Serif JP", sans-serif`;
  ctx.fillText(location, PAD, metaY + W * 0.03);
  if (time) {
    ctx.fillStyle = "rgba(232,226,217,0.2)";
    ctx.fillText(time, PAD, metaY + W * 0.055);
  }
  ctx.font = `300 ${W * 0.014}px "Noto Serif JP", sans-serif`;
  ctx.fillStyle = "rgba(201,169,110,0.3)";
  ctx.fillText(SITE_URL, PAD, H * 0.916);
  ctx.restore();
}

// ── Component ─────────────────────────────────────────────

interface Props { locale: string }

export function ShareCardTool({ locale }: Props) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const searchParams = useSearchParams();

  const [emotion, setEmotion] = useState<EmotionKey>("Solitude");
  const [text, setText] = useState("雨が降ると、東京は少し正直になる。");
  const [location, setLocation] = useState("新宿 · Shinjuku");
  const [time, setTime] = useState("午前3時");
  const [styleName, setStyleName] = useState<StyleKey>("dark");
  const [format, setFormat] = useState<FormatKey>("square");
  const [aiLoading, setAiLoading] = useState<"ja" | "en" | null>(null);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Read URL params on mount
  useEffect(() => {
    const e = searchParams.get("e") as EmotionKey | null;
    const l = searchParams.get("l");
    const q = searchParams.get("q");
    if (e && EMOTIONS.find(em => em.key === e)) setEmotion(e);
    if (l) setLocation(decodeURIComponent(l));
    if (q) setText(decodeURIComponent(q));
  }, [searchParams]);

  // Render canvas whenever state changes
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    document.fonts.ready.then(() =>
      renderCanvas(canvas, emotion, text, location, time, styleName, format)
    );
  }, [emotion, text, location, time, styleName, format]);

  useEffect(() => { render(); }, [render]);

  function handlePreset(p: typeof PRESETS[number]) {
    setEmotion(p.emotion);
    setText(p.text);
    setLocation(p.location);
    setTime(p.time);
  }

  function aiGenerate(lang: "ja" | "en") {
    setAiLoading(lang);
    const pool = lang === "ja" ? AI_QUOTES_JA[emotion] : AI_QUOTES_EN[emotion];
    setTimeout(() => {
      setText(pool[Math.floor(Math.random() * pool.length)]);
      setAiLoading(null);
    }, 600);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const safe = (emotion + "_" + location).replace(/[^a-zA-Z0-9぀-鿿]/g, "").slice(0, 16);
    link.download = `ma-${format}-${safe.toLowerCase() || "card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function copyLink() {
    const p = new URLSearchParams({ e: emotion, l: location, q: text });
    const url = window.location.origin + window.location.pathname + "?" + p.toString();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const fmt = FORMATS[format as FormatKey];
  const emoObj = EMOTIONS.find(e => e.key === emotion) ?? EMOTIONS[0];

  return (
    <div style={{ padding: "1.5rem 1rem 4rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "0.5px solid rgba(201,169,110,0.15)" }}>
        <div style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)", fontSize: "1.4rem", letterSpacing: "0.35em", color: "#c9a96e", marginBottom: "0.25rem" }}>
          間 / MA
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(90,84,80,1)", textTransform: "uppercase" }}>
          記憶カード生成器 · Memory Share Card Generator
        </div>
      </div>

      {/* Format tabs */}
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        {(Object.keys(FORMATS) as FormatKey[]).map(f => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            style={{
              background: f === format ? "rgba(201,169,110,0.06)" : "#1a1510",
              border: `0.5px solid ${f === format ? "#c9a96e" : "rgba(255,255,255,0.06)"}`,
              color: f === format ? "#c9a96e" : "rgba(90,84,80,1)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "7px 16px",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "all .2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span style={{ fontSize: "1rem", opacity: f === format ? 1 : 0.5 }}>
              {f === "square" ? "⬛" : f === "story" ? "▬" : f === "twitter" ? "▭" : "◻"}
            </span>
            {f === "square" ? "IG Square" : f === "story" ? "IG Story" : f === "twitter" ? "X / Twitter" : "Minimal"}
            <span style={{ fontSize: "0.55rem", opacity: 0.5 }}>
              {FORMATS[f].label.split(" · ")[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: "920px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

        {/* ── Left: Controls ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

          {/* Emotion grid */}
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              感情 · Emotion
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "5px" }}>
              {EMOTIONS.map(e => (
                <button
                  key={e.key}
                  onClick={() => setEmotion(e.key)}
                  style={{
                    background: emotion === e.key ? "rgba(201,169,110,0.1)" : "#1a1510",
                    border: `0.5px solid ${emotion === e.key ? "#c9a96e" : "rgba(255,255,255,0.06)"}`,
                    color: emotion === e.key ? "#c9a96e" : "rgba(154,144,136,1)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.04em",
                    padding: "6px 2px",
                    cursor: "pointer",
                    borderRadius: "2px",
                    transition: "all .2s",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: e.color, margin: "0 auto 3px" }} />
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.04em" }}>{e.key}</div>
                  <div style={{ fontSize: "0.65rem", color: e.color, opacity: 0.8 }}>{e.ja}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              テキスト · Text
            </span>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="雨が降ると、東京は少し正直になる。"
              style={{
                width: "100%", background: "#1a1510", border: "0.5px solid rgba(255,255,255,0.06)",
                borderRadius: "2px", color: "#e8e2d9",
                fontFamily: "'Cormorant Garamond', var(--font-display), serif",
                fontSize: "1rem", lineHeight: 1.7, padding: ".7rem .9rem",
                resize: "none", outline: "none", height: "110px",
              }}
            />
            <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
              {(["ja", "en"] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => aiGenerate(lang)}
                  disabled={aiLoading !== null}
                  style={{
                    flex: 1, background: "transparent",
                    border: "0.5px solid rgba(255,255,255,0.06)",
                    color: "rgba(90,84,80,1)", fontSize: "0.72rem", letterSpacing: "0.1em",
                    padding: "9px 6px", cursor: "pointer", borderRadius: "2px",
                    transition: "all .2s", textAlign: "center",
                    opacity: aiLoading !== null ? 0.5 : 1,
                  }}
                >
                  {aiLoading === lang ? "生成中…" : lang === "ja" ? "✦ AI生成（日本語）" : "✦ AI generate (EN)"}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              場所 · Location
            </span>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="新宿 · Shinjuku"
              style={{
                width: "100%", background: "#1a1510", border: "0.5px solid rgba(255,255,255,0.06)",
                borderRadius: "2px", color: "#e8e2d9",
                fontFamily: "var(--font-body, 'Noto Serif JP', sans-serif)",
                fontSize: ".85rem", padding: ".7rem .9rem", outline: "none",
              }}
            />
          </div>

          {/* Time */}
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              時間 · Time (optional)
            </span>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="午前3時 · 3am"
              style={{
                width: "100%", background: "#1a1510", border: "0.5px solid rgba(255,255,255,0.06)",
                borderRadius: "2px", color: "#e8e2d9",
                fontFamily: "var(--font-body, 'Noto Serif JP', sans-serif)",
                fontSize: ".85rem", padding: ".7rem .9rem", outline: "none",
              }}
            />
          </div>

          {/* Background style */}
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              背景スタイル · Background
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
              {STYLES.map(s => (
                <div
                  key={s.key}
                  onClick={() => setStyleName(s.key)}
                  style={{
                    background: styleName === s.key ? "rgba(201,169,110,0.06)" : "#1a1510",
                    border: `0.5px solid ${styleName === s.key ? "#c9a96e" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "2px", padding: "8px 4px 6px", cursor: "pointer",
                    transition: "all .2s", textAlign: "center",
                  }}
                >
                  <div style={{ height: "28px", borderRadius: "2px", marginBottom: "5px", background: `linear-gradient(135deg,${s.colors[0]},${s.colors[1]})` }} />
                  <div style={{ fontSize: "0.62rem", color: styleName === s.key ? "#c9a96e" : "rgba(90,84,80,1)", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={render}
            style={{
              width: "100%", background: "transparent",
              border: "0.5px solid #8a6e45", color: "#c9a96e",
              fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
              fontSize: ".95rem", letterSpacing: ".2em",
              padding: "13px", cursor: "pointer", borderRadius: "2px", transition: "all .2s",
            }}
          >
            カードを生成 · Generate
          </button>

          {/* Presets */}
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              サンプル · Presets
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {PRESETS.map((p, i) => (
                <div
                  key={i}
                  onClick={() => handlePreset(p)}
                  style={{
                    background: "#1a1510", border: "0.5px solid rgba(255,255,255,0.06)",
                    borderRadius: "2px", padding: "9px 11px", cursor: "pointer", transition: "all .2s",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#8a6e45", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "2px" }}>
                    {p.emotion} · {p.location}{p.time ? ` · ${p.time}` : ""}
                  </div>
                  <div style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)", fontSize: ".88rem", color: "rgba(154,144,136,1)", lineHeight: 1.45 }}>
                    {p.text.length > 55 ? p.text.slice(0, 55) + "…" : p.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Preview ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: ".9rem", position: "sticky", top: "1.5rem" }}>
          {/* Canvas wrapper */}
          <div style={{
            position: "relative", width: "100%", overflow: "hidden",
            borderRadius: "2px", border: "0.5px solid rgba(201,169,110,0.15)",
            background: "#0a0806",
            aspectRatio: `${fmt.W}/${fmt.H}`,
          }}>
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "7px" }}>
            <button
              onClick={download}
              style={{
                flex: 1, background: "#1a1510",
                border: "0.5px solid #8a6e45", color: "#c9a96e",
                fontFamily: "var(--font-mono)", fontSize: ".68rem",
                letterSpacing: ".14em", textTransform: "uppercase",
                padding: "10px", cursor: "pointer", borderRadius: "2px",
                transition: "all .2s", textAlign: "center",
              }}
            >
              ↓ PNG download
            </button>
            <button
              onClick={copyLink}
              style={{
                flex: 1, background: "#1a1510",
                border: "0.5px solid rgba(255,255,255,0.06)", color: "rgba(154,144,136,1)",
                fontFamily: "var(--font-mono)", fontSize: ".68rem",
                letterSpacing: ".14em", textTransform: "uppercase",
                padding: "10px", cursor: "pointer", borderRadius: "2px",
                transition: "all .2s", textAlign: "center",
              }}
            >
              {copied ? "コピー完了 ✓" : "⎘ Copy link"}
            </button>
          </div>

          <div style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "rgba(90,84,80,1)", letterSpacing: ".08em", textAlign: "center", lineHeight: 1.7 }}>
            {fmt.label}
          </div>

          {/* Back link */}
          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <Link
              href={`${prefix}/`}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.18em", color: "rgba(90,84,80,0.7)", textDecoration: "none" }}
            >
              ← Back to Arthur
            </Link>
          </div>
        </div>
      </div>

      {/* Integration guide */}
      <div style={{ maxWidth: "920px", margin: "3rem auto 0", borderTop: "0.5px solid rgba(201,169,110,0.15)", paddingTop: "2rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".22em", color: "#8a6e45", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          ウェブサイトへの組み込み · Integration Guide
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            {
              step: "STEP 01", title: "地図ページからリンク",
              body: <>地図の各記憶ピンに「カードを作成」ボタンを追加。クリック時に emotion と location を渡す：<code style={{ fontFamily: "monospace", fontSize: ".72rem", background: "rgba(255,255,255,0.05)", padding: "1px 5px", borderRadius: "2px", color: "#c9a96e" }}>/share-card?e=Solitude&l=新宿</code></>,
            },
            {
              step: "STEP 02", title: "ストーリーページに追加",
              body: "各ストーリー（moments）の末尾に「この記憶をシェア」ボタン。その記事の文章を自動入力する。読者がそのままカードを作れる。",
            },
            {
              step: "STEP 03", title: "近隣ページに追加",
              body: "各街（neighborhood）ページから、そのエリアで作った記憶をカード化できるよう連携。location を自動セットしたリンクを提供。",
            },
          ].map((card) => (
            <div key={card.step} style={{ background: "#1a1510", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "2px", padding: "1.1rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "#8a6e45", letterSpacing: ".15em", marginBottom: ".4rem" }}>{card.step}</div>
              <div style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)", fontSize: "1rem", color: "#e8e2d9", marginBottom: ".5rem" }}>{card.title}</div>
              <div style={{ fontSize: ".75rem", color: "rgba(154,144,136,1)", lineHeight: 1.7 }}>{card.body}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
