import type { BehaviorProfile } from "./tokyoMemory";

export interface TokyoWalk {
  id: string;
  time?: string;        // suggested time label, e.g. "23:40"
  routeHint?: string;   // e.g. "Nakano → Koenji"
  routeHintJa?: string;
  routeHintZh?: string;

  // Emotional state — the walk's reason for being
  titleEn: string;
  titleJa: string;
  titleZh: string;

  taglineEn: string;
  taglineJa: string;
  taglineZh: string;

  // Longer atmospheric description
  descEn: string;
  descJa: string;
  descZh: string;

  // Conditions when this walk feels right
  conditions: {
    periods?: string[];   // "evening" | "night" | "lateNight" | "earlyMorning" | "morning" | "afternoon"
    weather?: string[];   // "rainy" | "clear" | "cloudy" | "foggy" | "snowy" | "humid"
    dayTypes?: string[];  // "weekday" | "friday" | "saturday" | "sunday"
  };

  // Score weight — higher = more likely to surface
  weight: number;

  // Only surfaces when hour >= 23 or period is latenight
  lateNightOnly?: boolean;
}

export const ALL_WALKS: TokyoWalk[] = [
  {
    id: "last-train-walk",
    time: "23:40",
    routeHint: "Nakano → Koenji",
    routeHintJa: "中野 → 高円寺",
    routeHintZh: "中野 → 高円寺",
    titleEn: "Last Train Walk",
    titleJa: "終電後の散歩",
    titleZh: "末班車後的散步",
    taglineEn: "For people who haven't wanted to go home yet.",
    taglineJa: "まだ帰りたくない人のために。",
    taglineZh: "給還不想回家的人。",
    descEn: "The trains are almost done. The streets are quieter now but not empty. The night belongs to people who decided to stay a little longer.",
    descJa: "電車はもうすぐ終わり。街は静かになったけど、まだ誰かがいる。この時間は、もう少しだけ夜の中にいることを選んだ人たちのものだ。",
    descZh: "最後的電車快來了。街道安靜下來，但還不是空的。這個時間屬於決定再多待一會兒的人。",
    conditions: {
      periods: ["night", "lateNight"],
      dayTypes: ["friday", "saturday"],
    },
    weight: 2,
    lateNightOnly: true,
  },
  {
    id: "rain-walk",
    titleEn: "Rain Walk",
    titleJa: "雨の散歩",
    titleZh: "雨中散步",
    taglineEn: "Tokyo gets more honest when it rains.",
    taglineJa: "雨が降ると、東京は少し正直になる。",
    taglineZh: "下雨的時候，東京變得更誠實了。",
    descEn: "Wet umbrellas. Reflections on the pavement. The city slows down slightly and the sounds change. Tonight is a good night to walk with nowhere particular to be.",
    descJa: "濡れた傘。舗道に映る光。街のリズムが少し落ちて、音が変わる。今夜は、どこかに向かわなくてもいい散歩の夜。",
    descZh: "濕透的雨傘。路面的倒影。城市的節奏稍微慢了下來，聲音也不同了。今晚是適合漫無目的地走走的夜晚。",
    conditions: {
      weather: ["rainy", "foggy"],
    },
    weight: 3,
  },
  {
    id: "konbini-walk",
    titleEn: "Konbini Walk",
    titleJa: "コンビニの夜",
    titleZh: "便利商店之夜",
    taglineEn: "Some Tokyo nights are just convenience stores and silence.",
    taglineJa: "東京の夜は、コンビニと静けさだけでいい夜もある。",
    taglineZh: "有些東京的夜晚，就只是便利商店和沉默。",
    descEn: "No destination. Walk until you find a konbini with the right feeling. Get something small. Stand outside for a moment. Keep walking. The point is the in-between.",
    descJa: "目的地はない。感じのいいコンビニを見つけるまで歩く。何か小さいものを買う。少しだけ外に立つ。また歩く。大事なのは、その合間の時間だ。",
    descZh: "沒有目的地。走到找到感覺對的便利商店。買點小東西。在外面站一會兒。繼續走。重點是那些空檔的時間。",
    conditions: {
      periods: ["night", "lateNight"],
    },
    weight: 1,
  },
  {
    id: "first-month-walk",
    titleEn: "First Month Walk",
    titleJa: "はじめての月の散歩",
    titleZh: "初來乍到的散步",
    taglineEn: "For people still learning how to exist here.",
    taglineJa: "ここでの生き方をまだ覚えている人のために。",
    taglineZh: "給還在學習如何在這裡生活的人。",
    descEn: "Everything is still a little unfamiliar. The streets don't feel automatic yet. That's not a problem — that's what makes them worth noticing. Walk slowly. You're allowed to be a beginner.",
    descJa: "まだ何もかもが少し慣れない。街はまだ自動的に感じられない。それは問題じゃない。それが、街を気にかけるきっかけになる。ゆっくり歩いていい。初心者でいい。",
    descZh: "一切都還有點陌生。街道還沒有成為習慣。這不是問題——這讓它們值得被注意。慢慢走。你可以是個新手。",
    conditions: {
      periods: ["evening", "night"],
    },
    weight: 1,
  },
  {
    id: "river-walk",
    titleEn: "River Walk",
    titleJa: "川沿いの散歩",
    titleZh: "沿河散步",
    taglineEn: "The city thinks differently next to water.",
    taglineJa: "川の近くだと、街は違う顔を見せる。",
    taglineZh: "在水邊，城市的思維不同了。",
    descEn: "Find a river. The canal in Koenji. The Kanda River somewhere quiet. The Meguro River after the lights reflect. Walk alongside it and don't plan anything.",
    descJa: "川を見つける。高円寺の運河。静かな場所の神田川。光が映った後の目黒川。何も計画せず、ただ川沿いを歩く。",
    descZh: "找條河。高円寺的運河。神田川某個安靜的地方。目黒川在燈光倒映之後。沿著它走，什麼也不計畫。",
    conditions: {
      periods: ["evening", "night"],
      weather: ["clear", "cloudy"],
    },
    weight: 1,
  },
  {
    id: "end-of-line-walk",
    titleEn: "End of Line Walk",
    titleJa: "終点の散歩",
    titleZh: "終點站散步",
    taglineEn: "Take the train to somewhere you've never gotten off.",
    taglineJa: "降りたことのない駅まで電車に乗っていく。",
    taglineZh: "搭電車去一個你從未下車的地方。",
    descEn: "Pick a line going away from the center. Ride it further than you normally would. Get off somewhere unfamiliar. The streets there are ordinary in a way the famous places aren't.",
    descJa: "中心部から離れていく路線を選ぶ。いつもより先まで乗っていく。知らない駅で降りる。そこの街は、有名な場所とは違う普通さを持っている。",
    descZh: "選一條遠離市中心的路線。搭得比平時更遠一點。在一個陌生的地方下車。那裡的街道有著著名地方所沒有的普通感。",
    conditions: {
      periods: ["afternoon", "evening"],
      dayTypes: ["saturday", "sunday"],
    },
    weight: 1,
  },
  {
    id: "early-morning-walk",
    titleEn: "Early Morning Walk",
    titleJa: "早朝の散歩",
    titleZh: "清晨散步",
    taglineEn: "Tokyo before most people arrive.",
    taglineJa: "ほとんどの人が来る前の東京。",
    taglineZh: "在大多數人到來之前的東京。",
    descEn: "Before six. The city is technically awake but still undecided. The air is different. The people who are out have their reasons. You don't need one.",
    descJa: "六時前。街は一応目覚めているけど、まだ定まっていない。空気が違う。出ている人たちには理由がある。あなたは必要ない。",
    descZh: "六點前。城市技術上醒著但還未確定。空氣不同了。那些出門的人都有各自的理由。你不需要理由。",
    conditions: {
      periods: ["earlyMorning"],
    },
    weight: 2,
  },
  {
    id: "arcade-walk",
    titleEn: "Arcade Walk",
    titleJa: "商店街の散歩",
    titleZh: "商店街散步",
    taglineEn: "Find a covered shopping street and slow down inside it.",
    taglineJa: "アーケードを見つけて、その中でゆっくりする。",
    taglineZh: "找一條有屋頂的商店街，在裡面慢下來。",
    descEn: "Shotengai. Covered arcades that existed before anyone decided where the city should be. Oyama, Musashi-Koyama, Musashino. Walk through one slowly. Most of the shops will be closed. The covered street still feels like protection.",
    descJa: "商店街。街がどこにあるべきか誰かが決める前からあった屋根付きの場所。大山、武蔵小山、武蔵野。ゆっくり歩く。ほとんどの店は閉まっている。それでも屋根のある街は、守られている感じがする。",
    descZh: "商店街。那些在有人決定城市應該在哪裡之前就存在的有頂棚購物街。大山、武蔵小山、武蔵野。慢慢穿行其中。大多數店都關著。有頂棚的街道仍然給人一種庇護感。",
    conditions: {
      periods: ["evening", "night"],
    },
    weight: 1,
  },
  {
    id: "after-show-walk",
    titleEn: "After Show Walk",
    titleJa: "ライブの後の散歩",
    titleZh: "演出後的散步",
    taglineEn: "For the feeling that lingers after music ends.",
    taglineJa: "音楽が終わった後に残る感覚のために。",
    taglineZh: "為了音樂結束後還留著的那種感覺。",
    descEn: "You've been somewhere loud and now the street is quiet by comparison. Your ears are still adjusting. Walk without headphones. Let the city be the next sound.",
    descJa: "どこかうるさい場所にいた。今、街は比べると静かだ。耳はまだ慣れようとしている。イヤホンなしで歩く。街を次の音にする。",
    descZh: "你剛從一個喧鬧的地方出來。現在街道相比之下很安靜。你的耳朵還在調整。不戴耳機走路。讓城市成為下一個聲音。",
    conditions: {
      periods: ["night", "lateNight"],
      dayTypes: ["friday", "saturday"],
    },
    weight: 1,
  },
  {
    id: "platform-walk",
    titleEn: "Platform Walk",
    titleJa: "ホームの散歩",
    titleZh: "月台散步",
    taglineEn: "Nowhere to be. A train eventually.",
    taglineJa: "どこにも行かなくていい。いつか、電車が来る。",
    taglineZh: "不用去哪裡。終究會有一班電車來。",
    descEn: "Stand on a platform and let one or two trains pass. Watch the city carry people somewhere. When you're ready, get on. The city has been doing this without you all day.",
    descJa: "ホームに立って、一本か二本の電車を見送る。街が人々をどこかに運んでいるのを見る。準備ができたら乗る。街は今日ずっと、あなたなしでこれをやってきた。",
    descZh: "站在月台上，讓一兩班電車過去。看著城市把人們帶到某個地方。準備好了就上車。城市整天都在沒有你的情況下做著這件事。",
    conditions: {
      periods: ["evening", "night"],
    },
    weight: 1,
  },
  {
    id: "midnight-neighborhood",
    time: "01:00",
    titleEn: "The Neighborhood After Midnight",
    titleJa: "深夜の住宅街",
    titleZh: "午夜後的住宅區",
    taglineEn: "The same streets. A different city.",
    taglineJa: "同じ道。でも違う街。",
    taglineZh: "同樣的街道。不同的城市。",
    descEn: "After midnight, residential streets become something else. No one is rushing. The lights in windows mean something different now. Walk through somewhere you know and look at it as if you're seeing it for the first time.",
    descJa: "深夜になると、住宅街は別のものになる。急いでいる人はいない。窓の明かりが、今は違う意味を持つ。知っている場所を歩いて、初めて見るように見る。",
    descZh: "過了午夜，住宅街道變成了另一番景象。沒有人在趕時間。窗戶裡的燈光現在有了不同的意義。走過你熟悉的地方，把它看成是第一次見到的樣子。",
    conditions: {
      periods: ["latenight"],
    },
    weight: 3,
    lateNightOnly: true,
  },
];

function seededRng(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

export function getActiveWalks(
  period: string,
  condition: string,
  dayType: string,
  hour: number,
  profile?: BehaviorProfile | null,
): TokyoWalk[] {
  const isLate = hour >= 23 || period === "latenight";

  const scored = ALL_WALKS.filter((w) => {
    if (w.lateNightOnly && !isLate) return false;
    return true;
  }).map((w) => {
    let score = w.weight;

    if (w.conditions.periods && w.conditions.periods.includes(period)) score += 2;
    if (w.conditions.weather && w.conditions.weather.includes(condition)) score += 2;
    if (w.conditions.dayTypes && w.conditions.dayTypes.includes(dayType)) score += 1;
    if (w.lateNightOnly && isLate) score += 2;

    // Behavioral memory — gentle, invisible bias toward familiar content
    if (profile) {
      if (profile.walkAffinities.includes(w.id)) score += 1.2;
      if (profile.hourBand === "late"     && w.lateNightOnly) score += 0.8;
      if (profile.hourBand === "midnight" && w.lateNightOnly) score += 1.4;
    }

    // Deterministic daily noise
    const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
    const rng = seededRng(dailySeed * 97 + w.id.charCodeAt(0) + hour);
    score += rng() * 0.5;

    return { walk: w, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map((s) => s.walk);
}

// Returns a stable "N others tonight" count for a given walk — 1–4 range
export function getWalkOthersCount(walkId: string): number {
  const windowMs = 30 * 60 * 1000;
  const windowSeed = Math.floor((Date.now() + 9 * 3600 * 1000) / windowMs);
  const rng = seededRng(windowSeed * 131 + walkId.charCodeAt(0));
  return 1 + Math.floor(rng() * 4); // 1–4
}

// Locale-aware getters
export function getWalkTitle(w: TokyoWalk, g: string): string {
  if (g === "ja") return w.titleJa;
  if (g === "zh") return w.titleZh;
  return w.titleEn;
}

export function getWalkTagline(w: TokyoWalk, g: string): string {
  if (g === "ja") return w.taglineJa;
  if (g === "zh") return w.taglineZh;
  return w.taglineEn;
}

export function getWalkDesc(w: TokyoWalk, g: string): string {
  if (g === "ja") return w.descJa;
  if (g === "zh") return w.descZh;
  return w.descEn;
}

export function getWalkRouteHint(w: TokyoWalk, g: string): string | undefined {
  if (g === "ja") return w.routeHintJa ?? w.routeHint;
  if (g === "zh") return w.routeHintZh ?? w.routeHint;
  return w.routeHint;
}

// Why the city surfaced this walk tonight — shown before the title
export function getWalkSurfacedReason(
  w: TokyoWalk,
  condition: string,
  period:    string,
  g:         string,
): string | null {
  const isRainy = condition === "rainy" || condition === "foggy";
  const isLate  = period === "night" || period === "latenight";
  const isMorning = period === "earlyMorning" || period === "dawn" || period === "morning";

  if (w.id === "rain-walk" && isRainy) {
    if (g === "ja") return "雨が降っているから。";
    if (g === "zh") return "因為今晚下著雨。";
    return "Because it's raining tonight.";
  }

  if (w.id === "last-train-walk" && isLate) {
    if (g === "ja") return "もう夜が深いから。";
    if (g === "zh") return "因為夜已深了。";
    return "Because the night is late.";
  }

  if (w.id === "early-morning-walk" && isMorning) {
    if (g === "ja") return "朝がここにある。";
    if (g === "zh") return "因為早晨在這裡。";
    return "Because morning is here.";
  }

  if (w.id === "after-show-walk" && isLate) {
    if (g === "ja") return "夜がまだ続いているから。";
    if (g === "zh") return "因為夜晚還沒結束。";
    return "Because the night is still going.";
  }

  if (w.id === "river-walk" && isRainy) {
    if (g === "ja") return "雨が川を変えるから。";
    if (g === "zh") return "因為雨讓河流不一樣了。";
    return "Because rain changes the river.";
  }

  if (w.id === "konbini-walk" && isLate) {
    if (g === "ja") return "今夜はどこへも行かなくていい。";
    if (g === "zh") return "今晚不用去任何地方。";
    return "Tonight needs no destination.";
  }

  if (w.id === "end-of-line-walk") {
    if (g === "ja") return "今夜は遠くまで行きたい夜。";
    if (g === "zh") return "今晚適合走遠一點。";
    return "Tonight feels right for going further.";
  }

  if (w.id === "first-month-walk") {
    if (g === "ja") return "東京に慣れている途中だから。";
    if (g === "zh") return "還在熟悉東京的過程中。";
    return "For people still finding their rhythm here.";
  }

  if (w.id === "arcade-walk" && isLate) {
    if (g === "ja") return "夜の商店街に灯りがある。";
    if (g === "zh") return "商店街夜裡還有燈光。";
    return "The arcade still has light at night.";
  }

  if (w.id === "platform-walk") {
    if (g === "ja") return "今夜は電車を見送りたい気分。";
    if (g === "zh") return "今晚想讓幾班車過去。";
    return "Tonight feels right for watching trains leave.";
  }

  if (w.id === "midnight-neighborhood") {
    if (g === "ja") return "深夜だから見えるものがある。";
    if (g === "zh") return "深夜才能看見的東西。";
    return "Only visible after midnight.";
  }

  return null;
}
