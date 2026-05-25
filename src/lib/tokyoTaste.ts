// Tokyo taste system — quiet identity that emerges from how you use the city.
// Not a score. Not a dashboard. Just a reflection.

import type { BehaviorProfile, HourBand } from "./tokyoMemory";
import type { TokyoChapter } from "./tokyoRelationship";

// Five taste dimensions — what kind of Tokyo person you're becoming
export type TokyoTasteId = "quiet" | "cafe" | "residential" | "latenight" | "creative";

// Which neighborhoods map to which taste dimensions (for future tracking)
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

interface BecomingLine {
  en: string;
  ja: string;
  zh: string;
}

// Per chapter, per hourBand — the quiet acknowledgment
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
  chapterEntry: NonNullable<typeof BECOMING[TokyoChapter]>,
  hourBand: HourBand,
): BecomingLine {
  if ((hourBand === "late" || hourBand === "midnight") && chapterEntry.midnight) {
    return chapterEntry.midnight;
  }
  if (hourBand === "late" && chapterEntry.late) return chapterEntry.late;
  if (hourBand === "midnight" && chapterEntry.midnight) return chapterEntry.midnight;
  if (hourBand === "early" && chapterEntry.early) return chapterEntry.early;
  return chapterEntry.default;
}

export function getBecomingStatement(
  profile?: BehaviorProfile | null,
  g: string = "en",
): string | null {
  if (!profile) return null;
  const chapter    = profile.chapter ?? "arriving";
  const hourBand   = profile.hourBand ?? "any";
  const chapterEntry = BECOMING[chapter];
  if (!chapterEntry) return null; // "arriving" — too early

  const line = pickLine(chapterEntry, hourBand);
  if (g === "ja") return line.ja;
  if (g === "zh") return line.zh;
  return line.en;
}

// Whether to show the identity signal at all
export function shouldShowIdentity(profile?: BehaviorProfile | null): boolean {
  if (!profile) return false;
  const chapter = profile.chapter ?? "arriving";
  return chapter !== "arriving";
}
