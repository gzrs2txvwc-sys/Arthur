import { recordNeighborhoodVisit } from "./tokyoRelationship";
import type { TokyoChapter } from "./tokyoRelationship";

type Locale = string;

// ── Locale-specific observation strings ──────────────────────────────────────
const OBS = {
  en: {
    findingWayAround:    "You've been finding your way around.",
    stillFindingLate:    "Still finding things at this hour.",
    outLateAgain:        "Out late again this week.",
    spendingAlone:       "You've been spending time alone in the city.",
    outLateMore:         "You've been out late more than usual this week.",
    keepComingBack:      (n: string) => `You keep coming back to ${n}.`,
    walkingMore:         "You've been walking more lately.",
    neighborhoodYours:   (n: string) => `${n} has started to feel like yours.`,
    beenAWhile:          "It's been a while.",
    awayAWhile:          "You were away for a while.",
    stillOutLate:        "Still out this late.",
    quietPlaces:         "You've been finding quiet places lately.",
    keepMoving:          "You keep moving.",
    aloneInCity:         "You've been spending time alone in the city.",
    warmerParts:         "You've been drawn to warmer parts of the city.",
  },
  ja: {
    findingWayAround:    "少しずつ、街の道がわかってきている。",
    stillFindingLate:    "この時間にも、まだ何かを見つけている。",
    outLateAgain:        "今週も遅くまでいる。",
    spendingAlone:       "街の中で、一人の時間が増えている。",
    outLateMore:         "今週は、いつもより遅い時間が多い。",
    keepComingBack:      (n: string) => `${n}に、また戻ってきた。`,
    walkingMore:         "最近、歩く量が増えている。",
    neighborhoodYours:   (n: string) => `${n}が、少し自分のものになってきた。`,
    beenAWhile:          "しばらくぶりだ。",
    awayAWhile:          "少し離れていた。",
    stillOutLate:        "この時間まで。",
    quietPlaces:         "最近、静かな場所を探している。",
    keepMoving:          "ずっと動き続けている。",
    aloneInCity:         "街の中で、一人の時間が増えている。",
    warmerParts:         "温かい場所に引き寄せられている。",
  },
  "zh-TW": {
    findingWayAround:    "慢慢地，開始認識這座城市了。",
    stillFindingLate:    "這個時間還在找東西。",
    outLateAgain:        "這週又待到很晚。",
    spendingAlone:       "在城市裡獨處的時間多了。",
    outLateMore:         "這週待到很晚的次數比平常多。",
    keepComingBack:      (n: string) => `一直回到${n}。`,
    walkingMore:         "最近走路的時間多了。",
    neighborhoodYours:   (n: string) => `${n}開始有點像你的地方了。`,
    beenAWhile:          "有一段時間了。",
    awayAWhile:          "離開了一陣子。",
    stillOutLate:        "還在外面。",
    quietPlaces:         "最近一直在找安靜的地方。",
    keepMoving:          "一直在走動。",
    aloneInCity:         "在城市裡獨處的時間多了。",
    warmerParts:         "被城市裡比較溫暖的角落吸引著。",
  },
  ko: {
    findingWayAround:    "조금씩 이 도시의 길이 익숙해지고 있어.",
    stillFindingLate:    "이 시간에도 아직 찾고 있어.",
    outLateAgain:        "이번 주에도 늦게까지 있었어.",
    spendingAlone:       "도시 안에서 혼자 있는 시간이 많아졌어.",
    outLateMore:         "이번 주는 평소보다 늦은 시간이 많아.",
    keepComingBack:      (n: string) => `${n}에 자꾸 돌아오게 돼.`,
    walkingMore:         "요즘 걷는 시간이 늘었어.",
    neighborhoodYours:   (n: string) => `${n}이 조금씩 내 것처럼 느껴져.`,
    beenAWhile:          "오랜만이야.",
    awayAWhile:          "잠깐 자리를 비웠어.",
    stillOutLate:        "아직 밖에 있어.",
    quietPlaces:         "요즘 조용한 곳을 찾고 있어.",
    keepMoving:          "계속 움직이고 있어.",
    aloneInCity:         "도시 안에서 혼자 있는 시간이 많아졌어.",
    warmerParts:         "도시의 따뜻한 곳에 끌리고 있어.",
  },
} as const;

const VISIT_KEY = "arthur:visit-log";
const MAX_ENTRIES = 200;

interface VisitEntry {
  postcardId: string;
  neighborhood: string;
  mood: string;
  tokyoHour: number;
  ts: number;
}

function loadEntries(): VisitEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(VISIT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveEntries(entries: VisitEntry[]) {
  localStorage.setItem(VISIT_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
}

// Deduplicated by postcardId within a 5-minute window
export function logPostcardVisit(
  postcardId: string,
  neighborhood: string,
  mood: string,
  tokyoHour: number,
) {
  const entries = loadEntries();
  const recent = entries.find(
    (e) => e.postcardId === postcardId && Date.now() - e.ts < 5 * 60 * 1000,
  );
  if (recent) return;
  entries.push({ postcardId, neighborhood, mood, tokyoHour, ts: Date.now() });
  saveEntries(entries);
  recordNeighborhoodVisit(neighborhood);
}

export function getNeighborhoodCount(neighborhood: string): number {
  return loadEntries().filter((e) => e.neighborhood === neighborhood).length;
}

function getMoodPattern(entries: VisitEntry[], locale: Locale = "en"): string | null {
  if (entries.length < 6) return null;
  const counts: Record<string, number> = {};
  entries.forEach((e) => { counts[e.mood] = (counts[e.mood] ?? 0) + 1; });
  const [[top, count]] = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (count < 3) return null;
  const s = OBS[locale as keyof typeof OBS] ?? OBS.en;
  if (["quiet", "solitude", "anchored"].includes(top))   return s.quietPlaces;
  if (["wandering", "restless"].includes(top))           return s.keepMoving;
  if (["adrift", "invisible", "homesick"].includes(top)) return s.aloneInCity;
  if (["tender", "belonging"].includes(top))             return s.warmerParts;
  return null;
}

export function getQuietObservation(chapter?: TokyoChapter, locale: Locale = "en"): string | null {
  const entries = loadEntries();
  if (entries.length < 2) return null;

  const s = OBS[locale as keyof typeof OBS] ?? OBS.en;

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 3600 * 1000;
  const thisWeek = entries.filter((e) => e.ts > weekAgo);
  const nightThisWeek = thisWeek.filter((e) => e.tokyoHour >= 21 || e.tokyoHour < 4);
  const currentHour = (new Date().getUTCHours() + 9) % 24;
  const isLate = currentHour >= 22 || currentHour < 4;

  const neighborhoodCounts: Record<string, number> = {};
  entries.forEach((e) => {
    neighborhoodCounts[e.neighborhood] = (neighborhoodCounts[e.neighborhood] ?? 0) + 1;
  });
  const [[topNeighborhood, topCount]] = Object.entries(neighborhoodCounts)
    .sort((a, b) => b[1] - a[1]).concat([["", 0]]);
  const uniqueNeighborhoods = Object.keys(neighborhoodCounts).length;

  const lastTs = entries[entries.length - 2]?.ts;
  const daysSinceLast = lastTs ? (now - lastTs) / (1000 * 3600 * 24) : 0;

  if (chapter === "arriving") {
    if (uniqueNeighborhoods >= 5 && entries.length >= 4) return s.findingWayAround;
    if (entries.length >= 3 && isLate) return s.stillFindingLate;
  }

  if (chapter === "adjusting") {
    if (isLate && nightThisWeek.length >= 2) return s.outLateAgain;
    const heavyMoods = entries.filter(
      (e) => e.mood === "adrift" || e.mood === "invisible" || e.mood === "homesick",
    );
    if (heavyMoods.length >= 3) return s.spendingAlone;
    if (nightThisWeek.length >= 3) return s.outLateMore;
  }

  if (chapter === "feeling") {
    if (entries.length >= 8 && topCount >= 3) return s.keepComingBack(topNeighborhood);
    if (thisWeek.length >= 4) return s.walkingMore;
  }

  if (chapter === "belonging" || chapter === "home") {
    if (topCount >= 6) return s.neighborhoodYours(topNeighborhood);
    if (entries.length >= 10 && topCount >= 4) return s.keepComingBack(topNeighborhood);
  }

  if (isLate && nightThisWeek.length >= 2) return s.outLateAgain;
  if (nightThisWeek.length >= 3) return s.outLateMore;
  if (entries.length >= 10 && topCount >= 4) return s.keepComingBack(topNeighborhood);
  if (thisWeek.length >= 5) return s.walkingMore;
  if (daysSinceLast > 30) return s.beenAWhile;
  if (daysSinceLast > 7) return s.awayAWhile;
  if (entries.length >= 3 && isLate) return s.stillOutLate;

  return getMoodPattern(entries, locale);
}
