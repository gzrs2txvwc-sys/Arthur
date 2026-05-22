import type { AtmospherePeriod } from "./atmosphere";
import type { WeatherCondition } from "./weather";

export interface TickerNote {
  districtJa: string;
  districtEn: string;
  districtZh: string;
  noteJa: string;
  noteEn: string;
  noteZh: string;
  conditions?: {
    periods?:  string[];
    weather?:  string[];
    dayTypes?: string[];
  };
  weight: number;
}

export interface TickerItem {
  districtJa: string;
  note:        string;
}

// ── Pool — incidental city observations, not recommendations ──────────────────
const TICKER_POOL: TickerNote[] = [
  {
    districtJa: "渋谷",
    districtEn: "Shibuya",
    districtZh: "澀谷",
    noteJa: "まだ人が動いてる",
    noteEn: "still moving",
    noteZh: "人還在移動",
    conditions: { periods: ["evening", "night"] },
    weight: 2,
  },
  {
    districtJa: "下北沢",
    districtEn: "Shimokitazawa",
    districtZh: "下北澤",
    noteJa: "ライブが終わったころ",
    noteEn: "shows just ended",
    noteZh: "演出剛結束",
    conditions: { periods: ["night", "latenight"], dayTypes: ["friday", "saturday"] },
    weight: 3,
  },
  {
    districtJa: "高円寺",
    districtEn: "Koenji",
    districtZh: "高円寺",
    noteJa: "そろそろ静かになる",
    noteEn: "getting quiet now",
    noteZh: "快要靜下來了",
    conditions: { periods: ["night", "latenight"] },
    weight: 2,
  },
  {
    districtJa: "中野",
    districtEn: "Nakano",
    districtZh: "中野",
    noteJa: "終電まであと少し",
    noteEn: "close to last train",
    noteZh: "快到末班車了",
    conditions: { periods: ["night", "latenight"] },
    weight: 2,
  },
  {
    districtJa: "新宿",
    districtEn: "Shinjuku",
    districtZh: "新宿",
    noteJa: "いつもの夜が続いている",
    noteEn: "same as every night",
    noteZh: "還是那個夜晚",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 1,
  },
  {
    districtJa: "世田谷",
    districtEn: "Setagaya",
    districtZh: "世田谷",
    noteJa: "窓に灯りがついてる",
    noteEn: "windows are lit",
    noteZh: "窗裡有燈光",
    conditions: { periods: ["evening", "night"] },
    weight: 2,
  },
  {
    districtJa: "吉祥寺",
    districtEn: "Kichijoji",
    districtZh: "吉祥寺",
    noteJa: "ハーモニカ横丁、混んでる",
    noteEn: "Harmonica Alley busy",
    noteZh: "口琴橫丁很熱鬧",
    conditions: { periods: ["evening", "night"], dayTypes: ["friday", "saturday"] },
    weight: 2,
  },
  {
    districtJa: "三軒茶屋",
    districtEn: "Sangenjaya",
    districtZh: "三軒茶屋",
    noteJa: "最後の一杯をしてる人たち",
    noteEn: "last drinks",
    noteZh: "最後一杯",
    conditions: { periods: ["night", "latenight"] },
    weight: 2,
  },
  {
    districtJa: "代々木",
    districtEn: "Yoyogi",
    districtZh: "代代木",
    noteJa: "公園側は静かになった",
    noteEn: "park side quiet",
    noteZh: "公園那邊已經靜了",
    conditions: { periods: ["evening", "night"] },
    weight: 1,
  },
  {
    districtJa: "目黒川",
    districtEn: "Meguro River",
    districtZh: "目黑川",
    noteJa: "雨の反射",
    noteEn: "rain on the water",
    noteZh: "雨水映在水面",
    conditions: { weather: ["rainy", "foggy"] },
    weight: 4,
  },
  {
    districtJa: "神保町",
    districtEn: "Jimbocho",
    districtZh: "神保町",
    noteJa: "本屋の灯り、まだある",
    noteEn: "bookshop lights still on",
    noteZh: "書店還亮著燈",
    conditions: { weather: ["rainy", "foggy"] },
    weight: 3,
  },
  {
    districtJa: "代官山",
    districtEn: "Daikanyama",
    districtZh: "代官山",
    noteJa: "雨で静かになった",
    noteEn: "rain slowed it down",
    noteZh: "雨讓這裡安靜了",
    conditions: { weather: ["rainy", "foggy"] },
    weight: 3,
  },
  {
    districtJa: "中目黒",
    districtEn: "Nakameguro",
    districtZh: "中目黒",
    noteJa: "橋の下で止まってる人",
    noteEn: "people stopped under bridges",
    noteZh: "有人停在橋下",
    conditions: { weather: ["rainy"] },
    weight: 3,
  },
  {
    districtJa: "池袋",
    districtEn: "Ikebukuro",
    districtZh: "池袋",
    noteJa: "北口は今が本番",
    noteEn: "north exit peaking",
    noteZh: "北口剛開始熱起來",
    conditions: { periods: ["night", "latenight"], dayTypes: ["friday", "saturday"] },
    weight: 2,
  },
  {
    districtJa: "荻窪",
    districtEn: "Ogikubo",
    districtZh: "荻窪",
    noteJa: "終電前のいつも",
    noteEn: "before last train",
    noteZh: "末班車前的平靜",
    conditions: { periods: ["night", "latenight"] },
    weight: 2,
  },
  {
    districtJa: "北千住",
    districtEn: "Kita-Senju",
    districtZh: "北千住",
    noteJa: "今日の終わり",
    noteEn: "end of the day",
    noteZh: "今天結束了",
    conditions: { periods: ["evening", "night"] },
    weight: 1,
  },
  {
    districtJa: "蒲田",
    districtEn: "Kamata",
    districtZh: "蒲田",
    noteJa: "居酒屋帰りの人",
    noteEn: "izakaya crowd heading home",
    noteZh: "居酒屋散場",
    conditions: { periods: ["night", "latenight"] },
    weight: 1,
  },
  {
    districtJa: "恵比寿",
    districtEn: "Ebisu",
    districtZh: "惠比壽",
    noteJa: "今夜も人が出てる",
    noteEn: "out tonight",
    noteZh: "今晚依然有人",
    conditions: { periods: ["evening", "night"], dayTypes: ["friday", "saturday"] },
    weight: 1,
  },
  {
    districtJa: "練馬",
    districtEn: "Nerima",
    districtZh: "練馬",
    noteJa: "住宅街の夜",
    noteEn: "residential night",
    noteZh: "住宅區的夜晚",
    conditions: { periods: ["evening", "night"], dayTypes: ["weekday"] },
    weight: 1,
  },
  {
    districtJa: "亀有",
    districtEn: "Kameari",
    districtZh: "龜有",
    noteJa: "静かな夜",
    noteEn: "quiet tonight",
    noteZh: "安靜的夜晚",
    conditions: { periods: ["night"], dayTypes: ["weekday"] },
    weight: 1,
  },
  {
    districtJa: "武蔵小山",
    districtEn: "Musashi-Koyama",
    districtZh: "武蔵小山",
    noteJa: "パルム商店街、灯りがある",
    noteEn: "Palm arcade still lit",
    noteZh: "棕梠商店街還有燈",
    conditions: { periods: ["evening", "night"] },
    weight: 1,
  },
  {
    districtJa: "高田馬場",
    districtEn: "Takadanobaba",
    districtZh: "高田馬場",
    noteJa: "居酒屋、締まり始め",
    noteEn: "izakayas starting to close",
    noteZh: "居酒屋開始收",
    conditions: { periods: ["latenight"] },
    weight: 2,
  },
  {
    districtJa: "築地",
    districtEn: "Tsukiji",
    districtZh: "築地",
    noteJa: "仕事がもう始まってる",
    noteEn: "work has started",
    noteZh: "工作已經開始了",
    conditions: { periods: ["earlyMorning", "dawn"] },
    weight: 4,
  },
  {
    districtJa: "代々木公園",
    districtEn: "Yoyogi Park",
    districtZh: "代代木公園",
    noteJa: "朝のランナー",
    noteEn: "morning runners",
    noteZh: "早起跑步的人",
    conditions: { periods: ["earlyMorning", "dawn", "morning"] },
    weight: 3,
  },
  {
    districtJa: "表参道",
    districtEn: "Omotesando",
    districtZh: "表參道",
    noteJa: "少し落ち着いてきた",
    noteEn: "calming down",
    noteZh: "慢慢安靜下來",
    conditions: { periods: ["night"] },
    weight: 1,
  },
  {
    districtJa: "雪の東京",
    districtEn: "Tokyo",
    districtZh: "東京",
    noteJa: "雪が降っている",
    noteEn: "it's snowing somewhere",
    noteZh: "某處在下雪",
    conditions: { weather: ["snowy"] },
    weight: 5,
  },
  {
    districtJa: "歌舞伎町",
    districtEn: "Kabukicho",
    districtZh: "歌舞伎町",
    noteJa: "まだ夜の中に",
    noteEn: "still deep in the night",
    noteZh: "還在夜的深處",
    conditions: { periods: ["latenight"] },
    weight: 2,
  },
  {
    districtJa: "九段下",
    districtEn: "Kudanshita",
    districtZh: "九段下",
    noteJa: "橋の上、風がある",
    noteEn: "wind on the bridge",
    noteZh: "橋上有風",
    weight: 1,
  },
];

function seededRng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function getTickerNotes(
  period:    AtmospherePeriod | string,
  condition: WeatherCondition | string,
  dayType:   string,
  locale:    string,
  count = 10,
): TickerItem[] {
  const hourlySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (3600 * 1000));
  const rng = seededRng(hourlySeed * 53);

  const scored = TICKER_POOL.map((n) => {
    let score = n.weight;
    if (n.conditions?.periods  && n.conditions.periods.includes(period))       score += 3;
    if (n.conditions?.weather  && n.conditions.weather.includes(condition))    score += 3;
    if (n.conditions?.dayTypes && n.conditions.dayTypes.includes(dayType))     score += 1;
    score += rng() * 1.2;
    return { note: n, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, Math.min(count, scored.length)).map((s) => s.note);

  return top.map((n) => ({
    districtJa: n.districtJa,
    note: locale === "ja" ? n.noteJa
        : locale === "zh-TW" || locale === "zh" ? `${n.noteZh}`
        : n.noteEn,
  }));
}
