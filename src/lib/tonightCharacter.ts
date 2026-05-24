// Tonight's emotional character — a single observational sentence about what's specific
// to tonight. Changes daily (seeded), reflects conditions, time, and day of week.
// Not poetic atmosphere — more like the city taking its own temperature.

import type { BehaviorProfile, HourBand } from "./tokyoMemory";
import type { TokyoChapter } from "./tokyoRelationship";

const CHAPTER_ORDER: TokyoChapter[] = ["arriving", "adjusting", "feeling", "belonging", "home"];

function chapterIndex(ch: TokyoChapter): number {
  return CHAPTER_ORDER.indexOf(ch);
}

function seededRng(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface CharEntry {
  conditions: {
    period?:             string[];
    weather?:            string[];
    dayType?:            string[];
    hourMin?:            number;
    hourMax?:            number;
    // Profile-gated: only shown when behavioral memory matches
    consecutiveDaysMin?: number;
    gapDaysMin?:         number;
    hourBands?:          HourBand[];
    requiresReturn?:     boolean;   // only shown to returning visitors
    minChapter?:         TokyoChapter; // only shown at this chapter depth or deeper
    requiresWalkAffinity?: string[];   // any of these walk IDs must be in affinities
  };
  weight: number;
  en: string;
  ja: string;
  zh: string;
}

const ENTRIES: CharEntry[] = [
  // ── After midnight ────────────────────────────────────────────────────────
  {
    conditions: { hourMin: 0, hourMax: 3 },
    weight: 4,
    en: "Past midnight. Tokyo is down to its last crowd.",
    ja: "日付が変わった。残った人たちの東京がある。",
    zh: "過了午夜。城市只剩下最後一批人了。",
  },
  {
    conditions: { hourMin: 0, hourMax: 3, weather: ["rainy", "foggy"] },
    weight: 5,
    en: "Rain after midnight. The city turned inward.",
    ja: "深夜に雨。街が内側を向いた。",
    zh: "午夜後下雨。城市向內轉了。",
  },
  {
    conditions: { hourMin: 1, hourMax: 4, period: ["latenight"] },
    weight: 3,
    en: "The hours when Tokyo belongs to different people.",
    ja: "東京が別の人たちのものになる時間。",
    zh: "東京屬於另一群人的時間。",
  },

  // ── Late night (22–23) ─────────────────────────────────────────────────
  {
    conditions: { hourMin: 23, dayType: ["friday", "saturday"] },
    weight: 4,
    en: "Late. People found reasons to stay out.",
    ja: "深夜。みんな外にいる理由を見つけた。",
    zh: "深夜了。大家都找到了留下來的理由。",
  },
  {
    conditions: { hourMin: 22, hourMax: 23, dayType: ["weekday"] },
    weight: 3,
    en: "Late weeknight. Tokyo settling down.",
    ja: "平日の深夜。東京が落ち着いてきた。",
    zh: "平日深夜。東京正在平靜下來。",
  },
  {
    conditions: { hourMin: 22, period: ["night", "latenight"] },
    weight: 2,
    en: "Late. The trains still running for now.",
    ja: "深夜。電車はまだ動いている。",
    zh: "深夜了。電車還在跑。",
  },

  // ── Rain ──────────────────────────────────────────────────────────────────
  {
    conditions: { weather: ["rainy", "foggy"], period: ["evening", "night", "latenight"] },
    weight: 4,
    en: "Rain changed the city tonight.",
    ja: "雨が街を変えた夜。",
    zh: "雨改變了今晚的城市。",
  },
  {
    conditions: { weather: ["rainy", "foggy"], dayType: ["friday", "saturday"] },
    weight: 5,
    en: "Rain on a weekend night. The warm places are full.",
    ja: "週末の雨の夜。温かい場所はいっぱいだ。",
    zh: "週末雨夜。暖和的地方坐滿了人。",
  },
  {
    conditions: { weather: ["rainy", "foggy"], period: ["morning", "daytime"] },
    weight: 3,
    en: "Rain this morning. The city moving with umbrellas.",
    ja: "朝から雨。傘の街になっている。",
    zh: "早上下雨。城市成了一片傘的海洋。",
  },
  {
    conditions: { weather: ["rainy"] },
    weight: 2,
    en: "Rain since earlier. The air is different now.",
    ja: "さっきから雨。空気が変わった。",
    zh: "早些時候就開始下雨了。空氣現在不一樣了。",
  },

  // ── Fog ───────────────────────────────────────────────────────────────────
  {
    conditions: { weather: ["foggy"] },
    weight: 4,
    en: "Fog in the city. The districts feel closer tonight.",
    ja: "霧の夜。街が近くなった気がする。",
    zh: "霧夜。各區感覺靠近了。",
  },

  // ── Snow ──────────────────────────────────────────────────────────────────
  {
    conditions: { weather: ["snowy"] },
    weight: 5,
    en: "Snow somewhere in Tokyo. The city went careful.",
    ja: "東京のどこかで雪。街が慎重になった。",
    zh: "東京某處有雪。城市變得謹慎了。",
  },

  // ── Cold ──────────────────────────────────────────────────────────────────
  {
    conditions: { weather: ["cold"], period: ["evening", "night", "latenight"] },
    weight: 3,
    en: "Cold tonight. People walking faster than usual.",
    ja: "今夜は冷える。みんな少し早足で歩いている。",
    zh: "今晚很冷。人們走得比平時快了一點。",
  },

  // ── Humid ─────────────────────────────────────────────────────────────────
  {
    conditions: { weather: ["humid"] },
    weight: 3,
    en: "Heavy air tonight. The kind of night that stays.",
    ja: "空気が重い夜。手放してくれない夜。",
    zh: "今晚空氣沉重。這種夜晚不輕易放人走。",
  },

  // ── Clear nights ──────────────────────────────────────────────────────────
  {
    conditions: { weather: ["clear", "sunny"], period: ["night", "latenight"] },
    weight: 2,
    en: "Clear night. Good air. Tokyo visible to the edges.",
    ja: "晴れた夜。空気がいい。東京の端まで見える。",
    zh: "晴朗夜晚。空氣清新。東京的輪廓清晰可見。",
  },

  // ── Friday ────────────────────────────────────────────────────────────────
  {
    conditions: { dayType: ["friday"], period: ["evening", "night"] },
    weight: 4,
    en: "Friday night. The weekend already started at the station.",
    ja: "金曜の夜。週末はもうホームで始まっている。",
    zh: "週五晚上。週末在車站月台已經開始了。",
  },
  {
    conditions: { dayType: ["friday"], weather: ["clear", "sunny"] },
    weight: 3,
    en: "Clear Friday. A good night to be outside.",
    ja: "晴れた金曜。外にいていい夜。",
    zh: "晴朗的週五。適合待在外面的夜晚。",
  },

  // ── Saturday ──────────────────────────────────────────────────────────────
  {
    conditions: { dayType: ["saturday"], period: ["evening", "night"] },
    weight: 3,
    en: "Saturday night. Tokyo at its most awake right now.",
    ja: "土曜の夜。今、東京が一番目を覚ましている時間。",
    zh: "週六晚上。此刻是東京最清醒的時刻。",
  },

  // ── Sunday ────────────────────────────────────────────────────────────────
  {
    conditions: { dayType: ["sunday"], period: ["evening", "night"] },
    weight: 4,
    en: "Sunday quiet. The lights stayed on.",
    ja: "日曜の静けさ。でも灯りは消えていない。",
    zh: "週日的安靜。但燈還亮著。",
  },
  {
    conditions: { dayType: ["sunday"], period: ["latenight"] },
    weight: 4,
    en: "Late Sunday. The week starts in a few hours.",
    ja: "日曜の深夜。数時間後に週が始まる。",
    zh: "週日深夜。幾小時後新的一週就開始了。",
  },

  // ── Weekday evening ───────────────────────────────────────────────────────
  {
    conditions: { dayType: ["weekday"], period: ["evening"] },
    weight: 1,
    en: "Weeknight. The city shifting gears.",
    ja: "平日の夜。街がギアを切り替えている。",
    zh: "平日晚上。城市正在換檔。",
  },

  // ── Dawn ──────────────────────────────────────────────────────────────────
  {
    conditions: { period: ["dawn"] },
    weight: 4,
    en: "Almost dawn. The city still deciding.",
    ja: "夜明け近く。街はまだ向きを決めていない。",
    zh: "快天亮了。城市還在決定方向。",
  },

  // ── Morning ───────────────────────────────────────────────────────────────
  {
    conditions: { period: ["morning"] },
    weight: 3,
    en: "Morning still quiet. Most of the city hasn't started.",
    ja: "静かな朝。まだほとんどの街は動いていない。",
    zh: "清晨還很安靜。大部分的城市還沒開始。",
  },

  // ── General night variants — daily seed picks between these ──────────────
  {
    conditions: { period: ["night", "latenight", "evening"] },
    weight: 0.6,
    en: "The city is moving tonight.",
    ja: "今夜も街は動いている。",
    zh: "城市今晚還在動。",
  },
  {
    conditions: { period: ["night", "latenight"] },
    weight: 0.5,
    en: "Tonight in Tokyo.",
    ja: "今夜の東京。",
    zh: "今晚的東京。",
  },
  {
    conditions: { period: ["night"] },
    weight: 0.7,
    en: "The city has its own reasons tonight.",
    ja: "今夜、街には街の理由がある。",
    zh: "城市今晚有自己的理由。",
  },

  // ── Memory / return-aware — only surface when profile conditions match ────
  {
    conditions: {
      consecutiveDaysMin: 2,
      period: ["evening", "night", "latenight"],
      requiresReturn: true,
    },
    weight: 5,
    en: "Again tonight.",
    ja: "また今夜。",
    zh: "又是今晚。",
  },
  {
    conditions: {
      consecutiveDaysMin: 2,
      period: ["latenight"],
      requiresReturn: true,
    },
    weight: 5,
    en: "Still awake. Still here.",
    ja: "まだ起きている。まだここにいる。",
    zh: "還沒睡。還在這裡。",
  },
  {
    conditions: {
      consecutiveDaysMin: 5,
      period: ["night", "latenight"],
      requiresReturn: true,
    },
    weight: 6,
    en: "Tokyo knows your hours now.",
    ja: "東京は、もうあなたの時間を知っている。",
    zh: "東京現在已經知道你的時間了。",
  },
  {
    conditions: {
      consecutiveDaysMin: 3,
      hourBands: ["midnight", "late"],
      requiresReturn: true,
    },
    weight: 5,
    en: "You keep showing up at this hour.",
    ja: "あなたはいつもこの時間に現れる。",
    zh: "你總是在這個時間出現。",
  },
  {
    conditions: {
      gapDaysMin: 5,
      period: ["evening", "night", "latenight"],
      requiresReturn: true,
    },
    weight: 6,
    en: "Tokyo kept going.",
    ja: "東京はずっと動いていた。",
    zh: "東京一直在動。",
  },
  {
    conditions: {
      gapDaysMin: 14,
      requiresReturn: true,
    },
    weight: 7,
    en: "Still here. Both of you.",
    ja: "まだここにいる。あなたも、東京も。",
    zh: "還在這裡。你和東京都是。",
  },

  // ── Chapter-depth sentences — surface as relationship deepens ─────────────
  {
    conditions: {
      minChapter: "adjusting",
      period: ["evening", "night", "latenight"],
      requiresReturn: true,
    },
    weight: 3,
    en: "Your routes are starting to repeat.",
    ja: "歩く道が、少しずつ同じになってきた。",
    zh: "你走的路開始重複了。",
  },
  {
    conditions: {
      minChapter: "feeling",
      period: ["evening", "night", "latenight"],
      requiresReturn: true,
    },
    weight: 4,
    en: "Some parts of Tokyo are starting to feel like yours.",
    ja: "東京の一部が、あなたのものになってきた気がする。",
    zh: "東京的某些部分開始感覺像是你的了。",
  },
  {
    conditions: {
      minChapter: "belonging",
      requiresReturn: true,
    },
    weight: 5,
    en: "This city knows your rhythms now.",
    ja: "東京は、もうあなたのリズムを知っている。",
    zh: "這座城市現在了解你的節奏了。",
  },
  {
    conditions: {
      minChapter: "home",
      requiresReturn: true,
    },
    weight: 6,
    en: "You've been through Tokyo's seasons.",
    ja: "あなたは東京の季節をくぐり抜けた。",
    zh: "你已經經歷了東京的四季。",
  },

  // ── Walk-affinity sentences — surface when user has engaged with specific walks ──
  {
    conditions: {
      requiresWalkAffinity: ["rain-walk"],
      weather: ["rainy", "foggy"],
      requiresReturn: true,
    },
    weight: 5,
    en: "Another rainy night.",
    ja: "また雨の夜。",
    zh: "又是一個雨夜。",
  },
  {
    conditions: {
      requiresWalkAffinity: ["last-train-walk", "midnight-neighborhood", "early-hours-walk"],
      hourMin: 22,
      requiresReturn: true,
    },
    weight: 5,
    en: "Late again.",
    ja: "また遅くなった。",
    zh: "又是這麼晚了。",
  },
  {
    conditions: {
      requiresWalkAffinity: ["river-walk"],
      weather: ["rainy", "foggy"],
      requiresReturn: true,
    },
    weight: 5,
    en: "You know this kind of night.",
    ja: "こういう夜のことを、あなたは知っている。",
    zh: "你認識這種夜晚。",
  },
];

function scoreEntry(
  entry: CharEntry,
  hour: number,
  condition: string,
  period: string,
  dayType: string,
  profile: BehaviorProfile | null,
): number {
  let score = entry.weight;
  const c = entry.conditions;

  if (c.hourMin !== undefined && hour < c.hourMin) return -1;
  if (c.hourMax !== undefined && hour > c.hourMax) return -1;

  if (c.period  && !c.period.includes(period))    return -1;
  if (c.weather && !c.weather.includes(condition)) return -1;
  if (c.dayType && !c.dayType.includes(dayType))   return -1;

  // Profile-gated — these entries only appear for users with behavioral history
  if (c.requiresReturn && (!profile || !profile.isReturning)) return -1;
  if (c.consecutiveDaysMin !== undefined) {
    if (!profile || profile.consecutiveDays < c.consecutiveDaysMin) return -1;
    score += 1.5;
  }
  if (c.gapDaysMin !== undefined) {
    if (!profile || profile.gapDays < c.gapDaysMin) return -1;
    score += 1.5;
  }
  if (c.hourBands) {
    if (!profile || !c.hourBands.includes(profile.hourBand)) return -1;
    score += 1.2;
  }
  if (c.minChapter !== undefined) {
    if (!profile || chapterIndex(profile.chapter) < chapterIndex(c.minChapter)) return -1;
    score += 1.0;
  }
  if (c.requiresWalkAffinity) {
    if (!profile || !c.requiresWalkAffinity.some((id) => profile.walkAffinities.includes(id))) return -1;
    score += 1.3;
  }

  // Boost for specific condition matches
  if (c.weather?.includes(condition)) score += 1.5;
  if (c.dayType?.includes(dayType))   score += 1.0;
  if (c.period?.includes(period))     score += 0.8;
  if (c.hourMin !== undefined)        score += 1.2;

  return score;
}

export function getTonightCharacter(
  hour: number,
  condition: string,
  period: string,
  dayType: string,
  locale: string,
  profile: BehaviorProfile | null = null,
): string | null {
  const localeGroup =
    locale === "ja" ? "ja" :
    locale === "zh-TW" || locale.startsWith("zh") ? "zh" : "en";

  // Score all entries
  const scored = ENTRIES.map((e) => ({
    entry: e,
    score: scoreEntry(e, hour, condition, period, dayType, profile),
  })).filter((x) => x.score > 0);

  if (scored.length === 0) return null;

  scored.sort((a, b) => b.score - a.score);

  // Daily seed picks from the top-3 scorers for variety across days
  const topN = scored.slice(0, 3);
  const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const rng = seededRng(dailySeed * 7919 + hour * 13 + condition.charCodeAt(0));
  const chosen = topN[Math.floor(rng() * topN.length)];

  if (localeGroup === "ja") return chosen.entry.ja;
  if (localeGroup === "zh") return chosen.entry.zh;
  return chosen.entry.en;
}
