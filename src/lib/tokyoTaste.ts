// Tokyo taste system — quiet identity that emerges from how you use the city.
// Not a score. Not a dashboard. Just a reflection.

import type { BehaviorProfile, HourBand } from "./tokyoMemory";
import type { TokyoChapter } from "./tokyoRelationship";

// Five taste dimensions — what kind of Tokyo person you're becoming
export type TokyoTasteId = "quiet" | "cafe" | "residential" | "latenight" | "creative";

// Which neighborhoods map to which taste dimensions
export const NEIGHBORHOOD_TASTES: Record<string, TokyoTasteId[]> = {
  "nakameguro":        ["latenight", "quiet"],
  "daikanyama":        ["quiet", "cafe"],
  "shimokitazawa":     ["latenight", "creative"],
  "aoyama":            ["quiet", "cafe"],
  "nishi-ogikubo":     ["residential", "cafe"],
  "kagurazaka":        ["creative", "quiet"],
  "koenji":            ["latenight", "creative"],
  "kiyosumi-shirakawa":["cafe", "quiet"],
  "yanaka":            ["residential", "quiet"],
  "sangenjaya":        ["residential", "latenight"],
  "gakugeidaigaku":    ["residential", "quiet"],
};

// ── Taste profile derived from neighborhood visits ─────────────────────────

export interface TasteProfile {
  dominant: TokyoTasteId | null;
  counts: Record<TokyoTasteId, number>;
  uniqueNeighborhoods: string[]; // sorted by visit count desc
  totalUniqueCount: number;
}

function emptyProfile(): TasteProfile {
  return {
    dominant: null,
    counts: { quiet: 0, cafe: 0, residential: 0, latenight: 0, creative: 0 },
    uniqueNeighborhoods: [],
    totalUniqueCount: 0,
  };
}

// Reads from the relationship store (tokyo_relationship_v1 in localStorage).
// Must be called client-side.
export function getTasteProfile(): TasteProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = localStorage.getItem("tokyo_relationship_v1");
    if (!raw) return emptyProfile();
    const data = JSON.parse(raw) as { neighborhoodVisits?: Record<string, number> };
    const nv = data.neighborhoodVisits ?? {};

    const counts: Record<TokyoTasteId, number> = { quiet: 0, cafe: 0, residential: 0, latenight: 0, creative: 0 };
    for (const [slug, visitCount] of Object.entries(nv)) {
      for (const t of (NEIGHBORHOOD_TASTES[slug] ?? [])) counts[t] += visitCount;
    }

    const uniqueNeighborhoods = Object.keys(nv).sort((a, b) => (nv[b] ?? 0) - (nv[a] ?? 0));
    const totalUniqueCount = uniqueNeighborhoods.length;

    if (totalUniqueCount < 2) {
      return { dominant: null, counts, uniqueNeighborhoods, totalUniqueCount };
    }

    const sorted = (Object.entries(counts) as [TokyoTasteId, number][]).sort(([, a], [, b]) => b - a);
    const dominant: TokyoTasteId | null = sorted[0][1] > 0 ? sorted[0][0] : null;

    return { dominant, counts, uniqueNeighborhoods, totalUniqueCount };
  } catch {
    return emptyProfile();
  }
}

// ── Taste-specific "you keep finding" statements ───────────────────────────

interface Line { en: string; ja: string; zh: string }

const TASTE_STATEMENTS: Record<TokyoTasteId, Line[]> = {
  quiet: [
    {
      en: "You keep finding the quieter end of Tokyo.",
      ja: "あなたはいつも、東京の静かな側を見つけている。",
      zh: "你總是找到東京安靜的那一端。",
    },
    {
      en: "You're drawn to the parts of Tokyo that don't announce themselves.",
      ja: "自分を主張しない東京の場所に惹かれている。",
      zh: "你被東京那些不自我宣傳的地方所吸引。",
    },
  ],
  cafe: [
    {
      en: "You've found the Tokyo that lives inside good coffee shops.",
      ja: "いいコーヒーショップの中に生きている東京を見つけた。",
      zh: "你找到了存在於好咖啡館裡的東京。",
    },
    {
      en: "You're building a relationship with Tokyo's coffee culture.",
      ja: "東京のコーヒー文化と関係を築いている。",
      zh: "你正在建立與東京咖啡文化的關係。",
    },
  ],
  residential: [
    {
      en: "You're starting to love the Tokyo that wasn't made for you.",
      ja: "あなたのために作られなかった東京を、好きになりつつある。",
      zh: "你開始愛上那個不是為你而設計的東京。",
    },
    {
      en: "You gravitate toward the neighborhoods people actually live in.",
      ja: "人が実際に住んでいる街に惹かれている。",
      zh: "你被人們真正居住的街區所吸引。",
    },
  ],
  latenight: [
    {
      en: "You know Tokyo after 10pm. Most people don't get that far.",
      ja: "夜の十時以降の東京を知っている。ほとんどの人はそこまで行かない。",
      zh: "你了解晚上十點後的東京。大多數人沒走那麼遠。",
    },
    {
      en: "Late-night Tokyo is becoming your Tokyo.",
      ja: "深夜の東京が、あなたの東京になりつつある。",
      zh: "深夜的東京正在成為你的東京。",
    },
  ],
  creative: [
    {
      en: "You navigate toward the Tokyo that makes things.",
      ja: "何かを作っている東京に向かって歩いている。",
      zh: "你向著那個在創造事物的東京前進。",
    },
    {
      en: "You're finding the creative layer that most people walk past.",
      ja: "ほとんどの人が通り過ぎる創造的な層を見つけている。",
      zh: "你找到了大多數人走過的那個創意層次。",
    },
  ],
};

export function getTasteStatement(tasteId: TokyoTasteId, g: string): string | null {
  const lines = TASTE_STATEMENTS[tasteId];
  if (!lines?.length) return null;
  const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const line = lines[dailySeed % lines.length];
  if (g === "ja") return line.ja;
  if (g === "zh") return line.zh;
  return line.en;
}

// ── Taste labels — identity name ───────────────────────────────────────────

const TASTE_LABELS: Record<TokyoTasteId, Line> = {
  quiet:       { en: "QUIET TOKYO",       ja: "静かな東京",    zh: "安靜的東京" },
  cafe:        { en: "CAFÉ TOKYO",        ja: "コーヒーの東京", zh: "咖啡東京"  },
  residential: { en: "RESIDENTIAL TOKYO", ja: "生活の東京",    zh: "生活東京"  },
  latenight:   { en: "LATE-NIGHT TOKYO",  ja: "深夜の東京",    zh: "深夜東京"  },
  creative:    { en: "CREATIVE TOKYO",    ja: "創造の東京",    zh: "創意東京"  },
};

export function getTasteLabel(tasteId: TokyoTasteId, g: string): string {
  const label = TASTE_LABELS[tasteId];
  if (g === "ja") return label.ja;
  if (g === "zh") return label.zh;
  return label.en;
}

// ── Chapter-based "becoming" (fallback when no taste established) ──────────

interface BecomingLine { en: string; ja: string; zh: string }

const BECOMING: Partial<Record<
  TokyoChapter,
  { default: BecomingLine; early?: BecomingLine; late?: BecomingLine; midnight?: BecomingLine }
>> = {
  adjusting: {
    default: {
      en: "You're starting to see past the tourist circuits.",
      ja: "観光の回路の向こう側が見え始めている。",
      zh: "你開始看見觀光迴路之外的地方。",
    },
    early: {
      en: "You're discovering the Tokyo that exists before noon.",
      ja: "正午前に存在する東京を見つけ始めている。",
      zh: "你正在發現正午前存在的東京。",
    },
    late: {
      en: "You've seen Tokyo after 11pm. Most visitors haven't.",
      ja: "夜の十一時以降の東京を知っている。ほとんどの旅行者は知らない。",
      zh: "你見過深夜十一點後的東京。大多數遊客沒有。",
    },
    midnight: {
      en: "You belong to the Tokyo that most people are already asleep for.",
      ja: "ほとんどの人が眠っている時間の東京に、あなたはいる。",
      zh: "你屬於大多數人已經入睡時的那個東京。",
    },
  },
  feeling: {
    default: {
      en: "You're finding your Tokyo — the parts most visitors never reach.",
      ja: "自分だけの東京が見えてきた——ほとんどの人が辿り着けない場所。",
      zh: "你正在找到屬於你的東京——大多數訪客從未到達的地方。",
    },
    early: {
      en: "You're a morning person in one of the best cities for mornings.",
      ja: "あなたは、朝に一番いい街のひとつで、朝型の人間だ。",
      zh: "你是一個在最適合早晨的城市之一的早起者。",
    },
    late: {
      en: "You know the neighborhoods that don't come alive until after 9pm.",
      ja: "夜の九時を過ぎてから動き出す街を知っている。",
      zh: "你了解那些要到晚上九點後才活起來的街區。",
    },
    midnight: {
      en: "You know late-night Tokyo. That's a different Tokyo entirely.",
      ja: "深夜の東京を知っている。それはまったく違う東京だ。",
      zh: "你了解深夜的東京。那是一個完全不同的東京。",
    },
  },
  belonging: {
    default: {
      en: "You know this city in a way that takes time to earn.",
      ja: "この街を知るには時間がかかる。あなたはその時間をかけた。",
      zh: "你對這個城市的了解，是需要時間才能獲得的那種。",
    },
  },
  home: {
    default: {
      en: "This is your Tokyo now.",
      ja: "もうここは、あなたの東京だ。",
      zh: "這已經是你的東京了。",
    },
  },
};

function pickLine(
  entry: NonNullable<typeof BECOMING[TokyoChapter]>,
  hourBand: HourBand,
): BecomingLine {
  if (hourBand === "midnight" && entry.midnight) return entry.midnight;
  if (hourBand === "late"     && entry.late)     return entry.late;
  if (hourBand === "early"    && entry.early)     return entry.early;
  return entry.default;
}

export function getBecomingStatement(
  profile?: BehaviorProfile | null,
  g: string = "en",
): string | null {
  if (!profile) return null;
  const chapter    = profile.chapter ?? "arriving";
  const hourBand   = profile.hourBand ?? "any";
  const entry = BECOMING[chapter];
  if (!entry) return null;
  const line = pickLine(entry, hourBand);
  if (g === "ja") return line.ja;
  if (g === "zh") return line.zh;
  return line.en;
}

export function shouldShowIdentity(profile?: BehaviorProfile | null): boolean {
  if (!profile) return false;
  return (profile.chapter ?? "arriving") !== "arriving";
}

// ── Hour band label (for My Tokyo page) ───────────────────────────────────

const HOUR_LABELS: Record<HourBand, Line> = {
  early:    { en: "You're a morning person.",          ja: "あなたは朝型だ。",         zh: "你是早起的人。" },
  evening:  { en: "You come in the evenings.",         ja: "夕方に来る。",             zh: "你在傍晚來。" },
  late:     { en: "You come late.",                    ja: "遅い時間に来る。",          zh: "你來得晚。" },
  midnight: { en: "You come when most people are home.", ja: "ほとんどの人が帰った後に来る。", zh: "你在大多數人回家後才來。" },
  any:      { en: "You come whenever the city calls.", ja: "街に呼ばれたときに来る。",   zh: "當城市呼喚時你就來。" },
};

export function getHourLabel(hourBand: HourBand, g: string): string {
  const label = HOUR_LABELS[hourBand];
  if (g === "ja") return label.ja;
  if (g === "zh") return label.zh;
  return label.en;
}
