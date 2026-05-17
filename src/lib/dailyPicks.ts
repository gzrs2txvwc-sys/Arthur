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
}

export interface DayPicks {
  event: DailyPickMeta;
  task: DailyPickMeta;
}

// One event + one task per day of the week.
// Editorial copy (title, hook, body) lives in messages/*/today.picks.{id}.*
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
    imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200&q=80",
    mood: "belonging",
    tags: ["yoyogi", "park", "sunday", "people", "outdoor"],
  },
  {
    id: "shimokitazawa-sunday-task",
    type: "task",
    dayOfWeek: 0,
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6614, 139.6682],
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
    mood: "wandering",
    tags: ["shimokitazawa", "vintage", "sunday", "slow"],
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
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
    mood: "quiet",
    tags: ["asakusa", "sensoji", "morning", "temple", "early"],
  },
  {
    id: "nakameguro-monday-task",
    type: "task",
    dayOfWeek: 1,
    neighborhood: "Nakameguro",
    city: "tokyo",
    coordinates: [35.6406, 139.6980],
    imageUrl: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1200&q=80",
    mood: "quiet",
    tags: ["nakameguro", "canal", "evening", "night"],
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
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    mood: "adrift",
    tags: ["photography", "museum", "yebisu", "exhibition"],
  },
  {
    id: "kuramae-tuesday-task",
    type: "task",
    dayOfWeek: 2,
    neighborhood: "Kuramae",
    city: "tokyo",
    coordinates: [35.7064, 139.7945],
    imageUrl: "https://images.unsplash.com/photo-1609861522049-7e4b06fc2680?w=1200&q=80",
    mood: "anchored",
    tags: ["kuramae", "craft", "design", "makers"],
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
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80",
    mood: "belonging",
    tags: ["language-exchange", "social", "weekday", "evening"],
  },
  {
    id: "yanaka-wednesday-task",
    type: "task",
    dayOfWeek: 3,
    neighborhood: "Yanaka",
    city: "tokyo",
    coordinates: [35.7264, 139.7680],
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&q=80",
    mood: "adrift",
    tags: ["yanaka", "old-tokyo", "dusk", "cats"],
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
    imageUrl: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=1200&q=80",
    mood: "solitude",
    tags: ["jazz", "koenji", "evening", "bar", "music"],
  },
  {
    id: "arakawa-thursday-task",
    type: "task",
    dayOfWeek: 4,
    neighborhood: "Arakawa",
    city: "tokyo",
    coordinates: [35.7547, 139.8423],
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1200&q=80",
    mood: "quiet",
    tags: ["arakawa", "river", "evening", "walk", "embankment"],
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
    imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&q=80",
    mood: "belonging",
    tags: ["shimokitazawa", "live-music", "friday", "evening"],
  },
  {
    id: "golden-gai-friday-task",
    type: "task",
    dayOfWeek: 5,
    neighborhood: "Shinjuku",
    city: "tokyo",
    coordinates: [35.6942, 139.7037],
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80",
    mood: "belonging",
    tags: ["golden-gai", "shinjuku", "bars", "solo", "night"],
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
    imageUrl: "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?w=1200&q=80",
    mood: "wandering",
    tags: ["koenji", "flea-market", "records", "saturday", "morning"],
  },
  {
    id: "nishi-ogikubo-saturday-task",
    type: "task",
    dayOfWeek: 6,
    neighborhood: "Nishi-Ogikubo",
    city: "tokyo",
    coordinates: [35.7037, 139.5995],
    imageUrl: "https://images.unsplash.com/photo-1581922786083-02a3d3cd4ade?w=1200&q=80",
    mood: "wandering",
    tags: ["nishi-ogikubo", "antiques", "saturday", "browsing"],
  },
];

const byDay = new Map<number, DayPicks>();
picks.forEach((p) => {
  const entry = byDay.get(p.dayOfWeek) ?? ({} as DayPicks);
  if (p.type === "event") entry.event = p;
  else entry.task = p;
  byDay.set(p.dayOfWeek, entry);
});

export function getPicksForDay(dayIndex: 0|1|2|3|4|5|6): DayPicks {
  return byDay.get(dayIndex)!;
}
