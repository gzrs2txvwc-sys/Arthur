import type { FragmentMood } from "./postcards";

export interface DailyPickMeta {
  id: string;
  type: "event" | "task";
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  neighborhood: string;
  city: "tokyo" | "kyoto" | "osaka";
  coordinates: [number, number];
  startTime?: string;
  endTime?: string;
  price?: string;
  imageUrl: string;
  mood: FragmentMood;
  tags: string[];

  // Navigation — structural facts, language-agnostic
  nearestStation: string;
  stationExit: string;
  walkingMinutes: number;
  officialUrl?: string;

  // Real-world links
  instagramUrl?: string;
  googleMapsUrl?: string;

  // Weather suitability: 'any' | 'clear' | 'cloudy' | 'rainy' | 'foggy' | 'snowy'
  // Used to flag weather mismatch without hiding the pick
  weatherSuitability: string[];

  // Event-specific extras
  performers?: string[];
  vendors?: string[];
}

export interface DayPicks {
  event: DailyPickMeta;
  task: DailyPickMeta;
}

// One event + one task per day of the week.
// Editorial copy (title, hook, body, navigation, atmosphere, food, bestTime)
// lives in messages/*/today.picks.{id}.*
const picks: DailyPickMeta[] = [
  // ── SUNDAY ─────────────────────────────────────────────
  {
    id: "yoyogi-sunday",
    type: "event",
    dayOfWeek: 0,
    neighborhood: "Harajuku / Yoyogi",
    city: "tokyo",
    coordinates: [35.6715, 139.6953],
    startTime: "10:00",
    endTime: "17:00",
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=75",
    mood: "belonging",
    tags: ["yoyogi", "park", "sunday", "people", "outdoor"],
    nearestStation: "Harajuku Station",
    stationExit: "Omotesando Exit (表参道口)",
    walkingMinutes: 5,
    googleMapsUrl: "https://maps.app.goo.gl/yoyogi",
    weatherSuitability: ["clear", "cloudy"],
  },
  {
    id: "shimokitazawa-sunday-task",
    type: "task",
    dayOfWeek: 0,
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6614, 139.6682],
    imageUrl: "https://images.unsplash.com/photo-1513018188-81cbc6e10d36?w=1200&q=75",
    mood: "wandering",
    tags: ["shimokitazawa", "vintage", "sunday", "slow"],
    nearestStation: "Shimokitazawa Station",
    stationExit: "North Exit (北口)",
    walkingMinutes: 3,
    googleMapsUrl: "https://maps.app.goo.gl/shimokitazawa",
    weatherSuitability: ["any"],
  },

  // ── MONDAY ─────────────────────────────────────────────
  {
    id: "sensoji-monday",
    type: "event",
    dayOfWeek: 1,
    neighborhood: "Asakusa",
    city: "tokyo",
    coordinates: [35.7148, 139.7967],
    startTime: "07:00",
    endTime: "09:00",
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=75",
    mood: "quiet",
    tags: ["asakusa", "sensoji", "morning", "temple", "early"],
    nearestStation: "Asakusa Station",
    stationExit: "Exit 1 (Kaminarimon side)",
    walkingMinutes: 5,
    officialUrl: "https://www.senso-ji.jp/",
    googleMapsUrl: "https://maps.app.goo.gl/sensoji",
    weatherSuitability: ["any"],
  },
  {
    id: "nakameguro-monday-task",
    type: "task",
    dayOfWeek: 1,
    neighborhood: "Nakameguro",
    city: "tokyo",
    coordinates: [35.6406, 139.6980],
    imageUrl: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1200&q=75",
    mood: "quiet",
    tags: ["nakameguro", "canal", "evening", "night"],
    nearestStation: "Nakameguro Station",
    stationExit: "Main Exit (正面口)",
    walkingMinutes: 2,
    instagramUrl: "https://www.instagram.com/explore/tags/nakameguro/",
    googleMapsUrl: "https://maps.app.goo.gl/nakameguro",
    weatherSuitability: ["clear", "cloudy"],
  },

  // ── TUESDAY ────────────────────────────────────────────
  {
    id: "top-museum-tuesday",
    type: "event",
    dayOfWeek: 2,
    neighborhood: "Ebisu / Yebisu",
    city: "tokyo",
    coordinates: [35.6350, 139.7163],
    startTime: "10:00",
    endTime: "18:00",
    price: "¥500–900",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=75",
    mood: "adrift",
    tags: ["photography", "museum", "yebisu", "exhibition"],
    nearestStation: "Ebisu Station",
    stationExit: "East Exit (東口)",
    walkingMinutes: 12,
    officialUrl: "https://topmuseum.jp/",
    instagramUrl: "https://www.instagram.com/topmuseum_jp/",
    googleMapsUrl: "https://maps.app.goo.gl/topmuseum",
    weatherSuitability: ["any"],
  },
  {
    id: "kuramae-tuesday-task",
    type: "task",
    dayOfWeek: 2,
    neighborhood: "Kuramae",
    city: "tokyo",
    coordinates: [35.7064, 139.7945],
    imageUrl: "https://images.unsplash.com/photo-1609861522049-7e4b06fc2680?w=1200&q=75",
    mood: "anchored",
    tags: ["kuramae", "craft", "design", "makers"],
    nearestStation: "Kuramae Station",
    stationExit: "A3 Exit (Oedo Line side)",
    walkingMinutes: 5,
    googleMapsUrl: "https://maps.app.goo.gl/kuramae",
    weatherSuitability: ["any"],
  },

  // ── WEDNESDAY ──────────────────────────────────────────
  {
    id: "language-exchange-wednesday",
    type: "event",
    dayOfWeek: 3,
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6615, 139.6685],
    startTime: "18:30",
    endTime: "21:00",
    price: "free + drink",
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=75",
    mood: "belonging",
    tags: ["language-exchange", "social", "weekday", "evening"],
    nearestStation: "Shimokitazawa Station",
    stationExit: "South Exit (南口)",
    walkingMinutes: 5,
    googleMapsUrl: "https://maps.app.goo.gl/shimokitazawa-south",
    weatherSuitability: ["any"],
  },
  {
    id: "yanaka-wednesday-task",
    type: "task",
    dayOfWeek: 3,
    neighborhood: "Yanaka",
    city: "tokyo",
    coordinates: [35.7264, 139.7680],
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&q=75",
    mood: "adrift",
    tags: ["yanaka", "old-tokyo", "dusk", "cats"],
    nearestStation: "Nippori Station",
    stationExit: "West Exit (西口)",
    walkingMinutes: 8,
    googleMapsUrl: "https://maps.app.goo.gl/yanaka",
    weatherSuitability: ["clear", "cloudy"],
  },

  // ── THURSDAY ───────────────────────────────────────────
  {
    id: "koenji-jazz-thursday",
    type: "event",
    dayOfWeek: 4,
    neighborhood: "Kōenji",
    city: "tokyo",
    coordinates: [35.7061, 139.6499],
    startTime: "20:00",
    price: "¥500–1,500 + drinks",
    imageUrl: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=1200&q=75",
    mood: "solitude",
    tags: ["jazz", "koenji", "evening", "bar", "music"],
    nearestStation: "Kōenji Station",
    stationExit: "South Exit (南口)",
    walkingMinutes: 5,
    googleMapsUrl: "https://maps.app.goo.gl/koenji-south",
    weatherSuitability: ["any"],
  },
  {
    id: "arakawa-thursday-task",
    type: "task",
    dayOfWeek: 4,
    neighborhood: "Arakawa",
    city: "tokyo",
    coordinates: [35.7547, 139.8423],
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1200&q=75",
    mood: "quiet",
    tags: ["arakawa", "river", "evening", "walk", "embankment"],
    nearestStation: "Nishi-Arakawa Station",
    stationExit: "Main exit (Toden Arakawa Line)",
    walkingMinutes: 3,
    googleMapsUrl: "https://maps.app.goo.gl/arakawa-river",
    weatherSuitability: ["clear", "cloudy"],
  },

  // ── FRIDAY ─────────────────────────────────────────────
  {
    id: "shimokitazawa-music-friday",
    type: "event",
    dayOfWeek: 5,
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6609, 139.6678],
    startTime: "19:30",
    endTime: "23:00",
    price: "¥1,500–3,000",
    imageUrl: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=1200&q=75",
    mood: "belonging",
    tags: ["shimokitazawa", "live-music", "friday", "evening"],
    nearestStation: "Shimokitazawa Station",
    stationExit: "South Exit (南口)",
    walkingMinutes: 5,
    googleMapsUrl: "https://maps.app.goo.gl/shimokitazawa-music",
    weatherSuitability: ["any"],
  },
  {
    id: "golden-gai-friday-task",
    type: "task",
    dayOfWeek: 5,
    neighborhood: "Shinjuku",
    city: "tokyo",
    coordinates: [35.6942, 139.7037],
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=75",
    mood: "belonging",
    tags: ["golden-gai", "shinjuku", "bars", "solo", "night"],
    nearestStation: "Shinjuku Station",
    stationExit: "East Exit (東口)",
    walkingMinutes: 8,
    googleMapsUrl: "https://maps.app.goo.gl/golden-gai",
    weatherSuitability: ["any"],
  },

  // ── SATURDAY ───────────────────────────────────────────
  {
    id: "koenji-market-saturday",
    type: "event",
    dayOfWeek: 6,
    neighborhood: "Kōenji",
    city: "tokyo",
    coordinates: [35.7059, 139.6501],
    startTime: "09:00",
    endTime: "15:00",
    price: "free entry",
    imageUrl: "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?w=1200&q=75",
    mood: "wandering",
    tags: ["koenji", "flea-market", "records", "saturday", "morning"],
    nearestStation: "Kōenji Station",
    stationExit: "North Exit (北口)",
    walkingMinutes: 10,
    googleMapsUrl: "https://maps.app.goo.gl/koenji-market",
    weatherSuitability: ["clear", "cloudy"],
  },
  {
    id: "nishi-ogikubo-saturday-task",
    type: "task",
    dayOfWeek: 6,
    neighborhood: "Nishi-Ogikubo",
    city: "tokyo",
    coordinates: [35.7037, 139.5995],
    imageUrl: "https://images.unsplash.com/photo-1581922786083-02a3d3cd4ade?w=1200&q=75",
    mood: "wandering",
    tags: ["nishi-ogikubo", "antiques", "saturday", "browsing"],
    nearestStation: "Nishi-Ogikubo Station",
    stationExit: "North Exit (北口)",
    walkingMinutes: 3,
    googleMapsUrl: "https://maps.app.goo.gl/nishi-ogikubo",
    weatherSuitability: ["any"],
  },
];

const byDay = new Map<number, DayPicks>();
const byId = new Map<string, DailyPickMeta>();
picks.forEach((p) => {
  const entry = byDay.get(p.dayOfWeek) ?? ({} as DayPicks);
  if (p.type === "event") entry.event = p;
  else entry.task = p;
  byDay.set(p.dayOfWeek, entry);
  byId.set(p.id, p);
});

export function getPicksForDay(dayIndex: 0|1|2|3|4|5|6): DayPicks {
  return byDay.get(dayIndex)!;
}

export function getPickById(id: string): DailyPickMeta | undefined {
  return byId.get(id);
}

export function getAllPickIds(): string[] {
  return picks.map((p) => p.id);
}
