// Neighborhood layer — living Tokyo, not tourist Tokyo.
// Surfaces 2 neighborhoods per night with a condition-aware reason why.

import type { BehaviorProfile } from "./tokyoMemory";
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

interface NeighborhoodSignal {
  conditions?: {
    periods?: string[];
    weather?: string[];
    dayTypes?: string[];
    hourMin?: number;
    hourMax?: number;
  };
  en: string;
  ja: string;
  zh: string;
}

export interface TokyoNeighborhood {
  id: string;
  nameEn: string;
  nameJa: string;
  nameZh: string;

  // One or two sentences — what makes this place what it is
  characterEn: string;
  characterJa: string;
  characterZh: string;

  // Condition-specific "why tonight" signals
  signals: NeighborhoodSignal[];

  // Fallback signal when no condition matches
  defaultEn: string;
  defaultJa: string;
  defaultZh: string;

  // When this neighborhood is most alive
  conditions: {
    periods?: string[];
    weather?: string[];
    dayTypes?: string[];
    hourMin?: number;
  };

  weight: number;
  minChapter?: TokyoChapter;
}

const ALL_NEIGHBORHOODS: TokyoNeighborhood[] = [
  // ── Nakameguro ────────────────────────────────────────────────────────────
  {
    id: "nakameguro",
    nameEn: "Nakameguro",
    nameJa: "中目黒",
    nameZh: "中目黑",
    characterEn: "A river runs through it. The city organized itself around the water, which is why this place feels different from anywhere else.",
    characterJa: "川が流れている。街が水を中心に組み立てられている。だから、ここは他の場所とは違う感じがする。",
    characterZh: "有條河流過。城市圍繞著水建立起來，這就是為什麼這個地方和其他任何地方感覺都不同。",
    signals: [
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Rainy nights, this river is better than anywhere.",
        ja: "雨の夜は、ここの川が一番いい。",
        zh: "雨夜，這裡的河流是最好的。",
      },
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "The after-work crowd makes the riverside theirs.",
        ja: "仕事終わりの人たちが、川沿いを自分たちのものにしている。",
        zh: "下班後的人群把河邊變成了自己的地方。",
      },
      {
        conditions: { dayTypes: ["friday", "saturday"], periods: ["evening", "night"] },
        en: "Weekend evening. People gather at the river without meaning to.",
        ja: "週末の夜。意図せず、川に人が集まってくる。",
        zh: "週末夜晚。人們不知不覺地聚集在河邊。",
      },
      {
        conditions: { periods: ["night", "latenight"], weather: ["clear", "cloudy"] },
        en: "The canal lights at night.",
        ja: "夜の川沿いの光。",
        zh: "夜晚河邊的燈光。",
      },
    ],
    defaultEn: "The river is there whenever you need it.",
    defaultJa: "川はいつでもそこにある。",
    defaultZh: "河流永遠在那裡。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 2,
  },

  // ── Daikanyama ────────────────────────────────────────────────────────────
  {
    id: "daikanyama",
    nameEn: "Daikanyama",
    nameJa: "代官山",
    nameZh: "代官山",
    characterEn: "Quiet and designed without being cold. The streets here make you slow down before you decide to.",
    characterJa: "静かで、でも冷たくはない。ここの道は、気づく前に足を遅くさせる。",
    characterZh: "安靜而有設計感，但不顯冷漠。這裡的街道讓你不自覺地放慢腳步。",
    signals: [
      {
        conditions: { periods: ["evening"], weather: ["clear", "cloudy"] },
        en: "The street air in Daikanyama changes around sunset.",
        ja: "夕方になると、代官山の空気が変わる。",
        zh: "傍晚時分，代官山的空氣改變了。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Shop lights in the wet streets. Daikanyama handles rain well.",
        ja: "濡れた道に店の灯り。代官山は雨が似合う。",
        zh: "潮濕街道上的店面燈光。代官山很適合雨天。",
      },
      {
        conditions: { periods: ["night"], weather: ["clear"] },
        en: "Quiet and lit at night. The kind of walking that doesn't need a reason.",
        ja: "夜は静かで、灯りがある。理由のいらない散歩。",
        zh: "夜晚安靜而明亮。不需要理由的那種散步。",
      },
      {
        conditions: { dayTypes: ["sunday"], periods: ["afternoon"] },
        en: "Sunday afternoon. Daikanyama at its most unhurried.",
        ja: "日曜の午後。一番ゆっくりした代官山。",
        zh: "週日下午。代官山最不匆忙的時刻。",
      },
    ],
    defaultEn: "For when you want Tokyo elegant and unhurried.",
    defaultJa: "上品でゆっくりした東京を求めるときに。",
    defaultZh: "當你想要優雅從容的東京時。",
    conditions: { periods: ["evening", "night"] },
    weight: 2,
  },

  // ── Shimokitazawa ─────────────────────────────────────────────────────────
  {
    id: "shimokitazawa",
    nameEn: "Shimokitazawa",
    nameJa: "下北沢",
    nameZh: "下北澤",
    characterEn: "Music venues, vintage shops, thirty-year-old coffee shops. The part of Tokyo that still does what it wants.",
    characterJa: "ライブハウス、古着屋、三十年続く喫茶店。東京の中で、今もやりたいことをやっている場所。",
    characterZh: "音樂場所、古著店、開了三十年的咖啡館。東京中仍在做自己想做的事情的地方。",
    signals: [
      {
        conditions: { dayTypes: ["friday", "saturday"], periods: ["night", "latenight"] },
        en: "Weekend night. Shimokitazawa is doing its thing.",
        ja: "週末の夜。下北沢は下北沢をやっている。",
        zh: "週末夜晚。下北澤正在做它自己的事。",
      },
      {
        conditions: { weather: ["rainy", "foggy"], periods: ["night", "latenight"] },
        en: "Even in the rain, this neighborhood doesn't stop.",
        ja: "雨でも、ここは止まらない。",
        zh: "即使下雨，這個街區也不停歇。",
      },
      {
        conditions: { periods: ["latenight"] },
        en: "Still going. It always ends later here.",
        ja: "まだ続いている。いつもここは遅く終わる。",
        zh: "還在繼續。這裡總是結束得更晚。",
      },
      {
        conditions: { dayTypes: ["saturday", "sunday"], periods: ["afternoon"] },
        en: "Afternoon. Vintage shops and records and no rush.",
        ja: "午後。古着とレコードと、急がなくていい時間。",
        zh: "下午。古著、黑膠唱片，還有不用趕的時光。",
      },
    ],
    defaultEn: "Something is always happening.",
    defaultJa: "いつも何かやっている。",
    defaultZh: "總是有什麼事情在發生。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 2,
  },

  // ── Aoyama ────────────────────────────────────────────────────────────────
  {
    id: "aoyama",
    nameEn: "Aoyama",
    nameJa: "青山",
    nameZh: "青山",
    characterEn: "Select shops, small galleries, coffee that takes itself seriously. The version of Tokyo that grew up.",
    characterJa: "セレクトショップ、小さなギャラリー、本格的なコーヒー。大人になった東京。",
    characterZh: "精選店鋪、小型畫廊、認真對待咖啡的地方。長大了的東京。",
    signals: [
      {
        conditions: { periods: ["afternoon"], weather: ["clear", "cloudy"] },
        en: "Afternoon Aoyama. The lanes are quiet and worth walking.",
        ja: "青山の午後。路地が静かで、歩く価値がある。",
        zh: "青山的下午。小巷安靜，值得走走。",
      },
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "After the rush, this neighborhood belongs to fewer people.",
        ja: "ラッシュが終わると、少ない人のための街になる。",
        zh: "高峰期過後，這個街區屬於較少的人。",
      },
      {
        conditions: { periods: ["evening"], weather: ["clear"] },
        en: "The shopfronts at evening. Elegant, unhurried.",
        ja: "夕方の店の前。上品で、急いでいない。",
        zh: "傍晚的店面。優雅，從容。",
      },
    ],
    defaultEn: "The grown-up side of Tokyo.",
    defaultJa: "大人の東京。",
    defaultZh: "東京成熟的一面。",
    conditions: { periods: ["afternoon", "evening"] },
    weight: 1,
  },

  // ── Nishi-Ogikubo ─────────────────────────────────────────────────────────
  {
    id: "nishi-ogikubo",
    nameEn: "Nishi-Ogikubo",
    nameJa: "西荻窪",
    nameZh: "西荻窪",
    characterEn: "Old bookshops, old kissaten, old residents. A neighborhood that exists for the people living in it, not for visitors.",
    characterJa: "古書店、古い喫茶店、古くからの住民。訪れる人のためではなく、住む人のために存在している街。",
    characterZh: "舊書店、老喫茶店、老居民。一個為居住者而存在的街區，不是為了遊客。",
    signals: [
      {
        conditions: { dayTypes: ["saturday", "sunday"], periods: ["afternoon"] },
        en: "Weekend afternoon. The right time for the old bookshops.",
        ja: "週末の午後。古書店のための時間。",
        zh: "週末下午。舊書店的最佳時機。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Rain. A kissaten window. An afternoon in Nishi-Ogikubo.",
        ja: "雨。喫茶店の窓。西荻窪の午後。",
        zh: "下雨。喫茶店的窗邊。西荻窪的午後。",
      },
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "Weekday evening. The neighborhood belongs to itself.",
        ja: "平日の夕方。街が自分のものになる時間。",
        zh: "平日傍晚。街區回歸自己的狀態。",
      },
    ],
    defaultEn: "The Tokyo that wasn't designed to be visited.",
    defaultJa: "観光用に設計されていない東京。",
    defaultZh: "不是為了被參觀而設計的東京。",
    conditions: { periods: ["afternoon", "evening"] },
    weight: 1,
  },

  // ── Kagurazaka ────────────────────────────────────────────────────────────
  {
    id: "kagurazaka",
    nameEn: "Kagurazaka",
    nameJa: "神楽坂",
    nameZh: "神樂坂",
    characterEn: "Cobblestone alleys, French influence, hidden restaurants from another era. A neighborhood that kept its history.",
    characterJa: "石畳の路地、フランスの影響、別の時代からの隠れた料理屋。歴史を保ち続けた街。",
    characterZh: "鵝卵石小巷、法式影響、來自另一個時代的隱藏餐廳。一個保留了歷史的街區。",
    signals: [
      {
        conditions: { weather: ["rainy", "foggy"], periods: ["evening", "night"] },
        en: "Rain on the stone alleys. Kagurazaka is what it really is tonight.",
        ja: "石畳に雨が降る。今夜の神楽坂は本当の姿をしている。",
        zh: "雨落在石板小巷上。今晚的神樂坂才是它真正的樣子。",
      },
      {
        conditions: { periods: ["evening"] },
        en: "The hidden restaurants are filling. The alleys quiet down.",
        ja: "隠れた料理屋に人が集まり始める。路地が静かになる。",
        zh: "隱藏的餐廳開始有人了。小巷靜下來。",
      },
      {
        conditions: { periods: ["night"] },
        en: "After dark, the stone paths feel like somewhere else.",
        ja: "暗くなると、石畳の道はどこか別の場所になる。",
        zh: "天黑後，石板路感覺像另一個地方。",
      },
    ],
    defaultEn: "A neighborhood with a past.",
    defaultJa: "過去を持つ街。",
    defaultZh: "一個有過去的街區。",
    conditions: { periods: ["evening", "night"], weather: ["rainy", "foggy"] },
    weight: 2,
  },

  // ── Koenji ────────────────────────────────────────────────────────────────
  {
    id: "koenji",
    nameEn: "Koenji",
    nameJa: "高円寺",
    nameZh: "高円寺",
    characterEn: "Eclectic, unpredictable, completely itself. Tokyo without pretension.",
    characterJa: "折衷的で、予測できなくて、完全に自分らしい。気取りのない東京。",
    characterZh: "折衷、難以預測、完全做自己。不裝模作樣的東京。",
    signals: [
      {
        conditions: { periods: ["night", "latenight"] },
        en: "Something is always happening in Koenji at night.",
        ja: "夜の高円寺は、いつも何かやっている。",
        zh: "高円寺的夜晚，總是有些什麼在發生。",
      },
      {
        conditions: { dayTypes: ["friday", "saturday"] },
        en: "Weekend nights here are their own thing.",
        ja: "ここの週末の夜は、独自のものだ。",
        zh: "這裡的週末夜晚是自成一格的。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Koenji stays open. The covered shopping street.",
        ja: "高円寺は開いている。屋根付きの商店街。",
        zh: "高円寺不關門。有屋頂的商店街。",
      },
    ],
    defaultEn: "Fully, reliably itself.",
    defaultJa: "完全に、ずっと、自分らしい。",
    defaultZh: "完全地，始終如一地做自己。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 1,
  },

  // ── Kiyosumi-Shirakawa ────────────────────────────────────────────────────
  {
    id: "kiyosumi-shirakawa",
    nameEn: "Kiyosumi-Shirakawa",
    nameJa: "清澄白河",
    nameZh: "清澄白河",
    characterEn: "Roasters, small galleries, the river close. People built a neighborhood around good coffee, and it worked.",
    characterJa: "焙煎所、小さなギャラリー、近くに川。いいコーヒーを中心に、街が作られた。そしてそれは機能した。",
    characterZh: "烘焙坊、小型畫廊、河流就在附近。人們圍繞著好咖啡建立了一個街區，而這竟然成功了。",
    signals: [
      {
        conditions: { periods: ["morning", "earlyMorning"] },
        en: "The coffee is ready. The neighborhood is just starting.",
        ja: "コーヒーが準備できている。街が動き始めた。",
        zh: "咖啡準備好了。街區才剛開始醒來。",
      },
      {
        conditions: { periods: ["afternoon"], weather: ["clear", "cloudy"] },
        en: "Afternoon between the roasters. Good air for walking.",
        ja: "焙煎所の間の午後。歩くのにいい空気。",
        zh: "在各烘焙坊之間的下午。適合步行的好空氣。",
      },
      {
        conditions: { dayTypes: ["saturday", "sunday"] },
        en: "Weekend in Kiyosumi. The pace is different here.",
        ja: "清澄白河の週末。ここのペースは違う。",
        zh: "清澄白河的週末。這裡的節奏不同。",
      },
    ],
    defaultEn: "Coffee and the river.",
    defaultJa: "コーヒーと川。",
    defaultZh: "咖啡和河流。",
    conditions: { periods: ["morning", "earlyMorning", "afternoon"] },
    weight: 1,
  },

  // ── Yanaka ────────────────────────────────────────────────────────────────
  {
    id: "yanaka",
    nameEn: "Yanaka",
    nameJa: "谷中",
    nameZh: "谷中",
    characterEn: "The old shitamachi that didn't get knocked down. Temple paths, narrow shotengai, cats. Tokyo before everything changed.",
    characterJa: "取り壊されなかった古い下町。寺の道、細い商店街、猫。何もかもが変わる前の東京。",
    characterZh: "沒有被拆掉的老下町。寺廟小徑、狹窄商店街、貓。一切改變之前的東京。",
    signals: [
      {
        conditions: { periods: ["morning", "earlyMorning"], weather: ["clear", "cloudy"] },
        en: "Clear morning. Yanaka is the closest thing to old Tokyo.",
        ja: "晴れた朝。谷中は、古い東京に一番近い場所。",
        zh: "晴朗的早晨。谷中是最接近舊東京的地方。",
      },
      {
        conditions: { periods: ["afternoon"], dayTypes: ["saturday", "sunday"] },
        en: "The shopping street on a slow afternoon.",
        ja: "ゆっくりした午後の商店街。",
        zh: "悠閒下午的商店街。",
      },
      {
        conditions: { periods: ["afternoon", "morning"] },
        en: "The part of Tokyo that doesn't rush.",
        ja: "急がない東京。",
        zh: "不趕時間的東京。",
      },
    ],
    defaultEn: "The city that was.",
    defaultJa: "かつての街。",
    defaultZh: "曾經的城市。",
    conditions: { periods: ["morning", "earlyMorning", "afternoon"] },
    weight: 1,
  },

  // ── Sangenjaya ────────────────────────────────────────────────────────────
  {
    id: "sangenjaya",
    nameEn: "Sangenjaya",
    nameJa: "三軒茶屋",
    nameZh: "三軒茶屋",
    characterEn: "Dense, lived-in, unpretentious. Not designed for anyone to come and see — just a neighborhood that people end up calling theirs.",
    characterJa: "密度が高く、生活感があって、気取らない。誰かに来てもらうために設計されたわけじゃない。ただ、気づいたら自分の街になっている場所。",
    characterZh: "密集、充滿生活氣息、不裝樣。不是為了讓人來參觀而設計的——只是一個人們最終稱之為自己的地方的街區。",
    signals: [
      {
        conditions: { periods: ["night", "latenight"] },
        en: "Sangenjaya doesn't quiet down early.",
        ja: "三茶は、早く静かにならない。",
        zh: "三軒茶屋不早睡。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "The covered market and the izakayas. Rain doesn't change this neighborhood.",
        ja: "屋根付きの商店街と居酒屋。雨は、ここを変えない。",
        zh: "有頂棚的市場和居酒屋。雨不會改變這個街區。",
      },
      {
        conditions: { dayTypes: ["friday", "saturday"], periods: ["evening", "night"] },
        en: "Weekend night. People choosing to stay out.",
        ja: "週末の夜。外に残ることを選んだ人たち。",
        zh: "週末夜晚。選擇留在外面的人們。",
      },
    ],
    defaultEn: "The neighborhood people end up calling theirs.",
    defaultJa: "気づいたら自分の街になっている場所。",
    defaultZh: "人們最終稱之為自己的那個街區。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 1,
  },

  // ── Gakugeidaigaku (depth-gated — feeling+) ───────────────────────────────
  {
    id: "gakugeidaigaku",
    nameEn: "Gakugeidaigaku",
    nameJa: "学芸大学",
    nameZh: "學藝大學",
    characterEn: "Small shops, friendly bars, nothing remarkable about it — which is the point. A neighborhood for living in, not visiting.",
    characterJa: "小さい店、気さくなバー、特に何も目立たない——それがいいんだ。観光じゃなく、生活するための街。",
    characterZh: "小店、友善的酒吧、沒有什麼特別的——這正是重點。一個用來生活的街區，不是用來參觀的。",
    signals: [
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "After work, very local. The bars here feel like your neighborhood bar.",
        ja: "仕事終わり、とてもローカル。ここのバーは、地元のバーみたいな感じがする。",
        zh: "下班後，非常在地。這裡的酒吧感覺就像你的街坊酒吧。",
      },
      {
        conditions: { periods: ["night"] },
        en: "The small bars on quiet streets.",
        ja: "静かな道の小さいバー。",
        zh: "安靜街道上的小酒吧。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "The covered shotengai is good in rain.",
        ja: "雨の日は、商店街の屋根がいい。",
        zh: "雨天，有屋頂的商店街很好。",
      },
    ],
    defaultEn: "Very local. Very quiet. Very good.",
    defaultJa: "とてもローカル。とても静か。とてもいい。",
    defaultZh: "非常在地。非常安靜。非常好。",
    conditions: { periods: ["evening", "night"] },
    weight: 1,
    minChapter: "feeling",
  },
];

// ── Signal selection ────────────────────────────────────────────────────────

function pickSignal(
  n: TokyoNeighborhood,
  period: string,
  condition: string,
  dayType: string,
): { en: string; ja: string; zh: string } {
  const matching = n.signals.filter((s) => {
    if (!s.conditions) return true;
    const c = s.conditions;
    if (c.periods  && !c.periods.includes(period))    return false;
    if (c.weather  && !c.weather.includes(condition))  return false;
    if (c.dayTypes && !c.dayTypes.includes(dayType))   return false;
    return true;
  });
  if (matching.length === 0) return { en: n.defaultEn, ja: n.defaultJa, zh: n.defaultZh };
  const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const rng = seededRng(dailySeed * 53 + n.id.charCodeAt(0));
  return matching[Math.floor(rng() * matching.length)];
}

// ── Public API ──────────────────────────────────────────────────────────────

export function getActiveNeighborhoods(
  period: string,
  condition: string,
  dayType: string,
  hour: number,
  profile?: BehaviorProfile | null,
): TokyoNeighborhood[] {
  const userChapter = profile?.chapter ?? "arriving";

  const scored = ALL_NEIGHBORHOODS.filter((n) => {
    if (n.minChapter && chapterIndex(userChapter) < chapterIndex(n.minChapter)) return false;
    return true;
  }).map((n) => {
    let score = n.weight;
    if (n.conditions.periods?.includes(period))    score += 2;
    if (n.conditions.weather?.includes(condition)) score += 2;
    if (n.conditions.dayTypes?.includes(dayType))  score += 1;

    const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
    const rng = seededRng(dailySeed * 71 + n.id.charCodeAt(0) + hour);
    score += rng() * 0.6;

    return { n, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 2).map((s) => s.n);
}

// Locale-aware getters
export function getNeighborhoodName(n: TokyoNeighborhood, g: string): string {
  if (g === "ja") return n.nameJa;
  if (g === "zh") return n.nameZh;
  return n.nameEn;
}

export function getNeighborhoodCharacter(n: TokyoNeighborhood, g: string): string {
  if (g === "ja") return n.characterJa;
  if (g === "zh") return n.characterZh;
  return n.characterEn;
}

export function getNeighborhoodSignalText(
  n: TokyoNeighborhood,
  period: string,
  condition: string,
  dayType: string,
  g: string,
): string {
  const signal = pickSignal(n, period, condition, dayType);
  if (g === "ja") return signal.ja;
  if (g === "zh") return signal.zh;
  return signal.en;
}
