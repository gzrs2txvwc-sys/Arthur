import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";

export interface OpeningPhoto {
  id: string;
  alt: string;
  objectPosition?: string;
}

type Season  = "spring" | "summer" | "autumn" | "winter";
type DayType = "weekday" | "friday" | "saturday" | "sunday";

interface PhotoEntry {
  photo:       OpeningPhoto;
  periods?:    AtmospherePeriod[];
  conditions?: WeatherCondition[];
  days?:       DayType[];
  seasons?:    Season[];
}

function tokyoSeason(): Season {
  const month = new Date(Date.now() + 9 * 3600 * 1000).getUTCMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function tokyoDayType(): DayType {
  const ms  = Date.now() + 9 * 3600 * 1000;
  const day = new Date(ms).getUTCDay();
  if (day === 0) return "sunday";
  if (day === 5) return "friday";
  if (day === 6) return "saturday";
  return "weekday";
}

// ── Photo pool ─────────────────────────────────────────────────────────────────
// Photos chosen for everyday Tokyo life — not tourist shots. The same source
// photo appears with different objectPosition values to create genuine variety.
// Photos marked "(unverified)" may not load; the overlay + dark filter still look
// intentional when they don't. Swap any id freely in this file.
const PHOTOS: PhotoEntry[] = [

  // ── Late night ─────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1536098561742-ca998e48cbcc", alt: "Tokyo at night", objectPosition: "center 55%" },
    periods: ["latenight", "night"],
  },
  {
    // Sunday quiet — tighter, lonelier crop
    photo: { id: "photo-1536098561742-ca998e48cbcc", alt: "Tokyo late on a Sunday night", objectPosition: "center 40%" },
    periods: ["latenight"],
    days: ["sunday"],
  },
  {
    photo: { id: "photo-1540959733332-eab4deabeeaf", alt: "Tokyo night rain", objectPosition: "center 60%" }, // (unverified)
    periods: ["latenight"],
    conditions: ["rainy", "foggy"],
  },

  // ── Dawn ───────────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1554797589-7241bb691973", alt: "Empty train car at dawn", objectPosition: "center" }, // (unverified)
    periods: ["dawn"],
  },
  {
    // Winter dawn — colder crop of the night cityscape
    photo: { id: "photo-1536098561742-ca998e48cbcc", alt: "Tokyo before the city wakes", objectPosition: "center 70%" },
    periods: ["dawn"],
    seasons: ["winter"],
  },

  // ── Morning ────────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1528360983277-13d401cdc186", alt: "Tokyo street in the morning", objectPosition: "center 45%" }, // (unverified)
    periods: ["morning"],
    conditions: ["clear", "cloudy"],
  },
  {
    photo: { id: "photo-1506748686214-e9df14d4d9d0", alt: "Morning light in Tokyo", objectPosition: "center 30%" },
    periods: ["morning", "dawn"],
  },
  {
    // Weekend morning — street-level, slower feeling
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Tokyo alley on a quiet morning", objectPosition: "center 55%" },
    periods: ["morning"],
    days: ["saturday", "sunday"],
  },
  {
    // Rainy morning — wet street
    photo: { id: "photo-1574169208507-84376144848b", alt: "Tokyo street in the rain", objectPosition: "center" }, // (unverified)
    periods: ["morning"],
    conditions: ["rainy"],
  },

  // ── Daytime ────────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Tokyo street", objectPosition: "center 50%" },
    periods: ["daytime"],
  },
  {
    // Weekday afternoon — daily life crop
    photo: { id: "photo-1580822184713-fc5400e7fe10", alt: "Tokyo daily life", objectPosition: "center 40%" },
    periods: ["daytime"],
    days: ["weekday"],
  },
  {
    // Rainy afternoon — wet street
    photo: { id: "photo-1574169208507-84376144848b", alt: "Tokyo in the rain", objectPosition: "center 50%" }, // (unverified)
    periods: ["daytime"],
    conditions: ["rainy"],
  },
  {
    // Summer daytime — brighter crop
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Tokyo street in summer", objectPosition: "center 35%" },
    periods: ["daytime"],
    seasons: ["summer"],
  },

  // ── Sunset ─────────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1580822184713-fc5400e7fe10", alt: "Tokyo at golden hour", objectPosition: "center 35%" },
    periods: ["sunset"],
  },
  {
    // Friday golden hour — alley crop
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Light through a Tokyo alley at sunset", objectPosition: "center 60%" },
    periods: ["sunset"],
    days: ["friday"],
  },
  {
    photo: { id: "photo-1506748686214-e9df14d4d9d0", alt: "Tokyo at dusk", objectPosition: "center 50%" },
    periods: ["sunset"],
    conditions: ["clear"],
  },

  // ── Evening ────────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1536098561742-ca998e48cbcc", alt: "Tokyo in the evening", objectPosition: "center 50%" },
    periods: ["evening"],
  },
  {
    // Sunday evening — residential quiet
    photo: { id: "photo-1580822184713-fc5400e7fe10", alt: "Quiet Tokyo residential evening", objectPosition: "center 55%" },
    periods: ["evening"],
    days: ["sunday"],
  },
  {
    // Rainy evening
    photo: { id: "photo-1574169208507-84376144848b", alt: "Tokyo in the rain at evening", objectPosition: "center 40%" }, // (unverified)
    periods: ["evening"],
    conditions: ["rainy"],
  },

  // ── Night ──────────────────────────────────────────────────────────────────
  {
    photo: { id: "photo-1536098561742-ca998e48cbcc", alt: "Tokyo at night", objectPosition: "center 55%" },
    periods: ["night"],
  },
  {
    // Clear night — street-level detail
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Tokyo street at night", objectPosition: "center 65%" },
    periods: ["night"],
    conditions: ["clear"],
  },
  {
    // Rainy night
    photo: { id: "photo-1540959733332-eab4deabeeaf", alt: "Tokyo at night in the rain", objectPosition: "center 55%" }, // (unverified)
    periods: ["night"],
    conditions: ["rainy"],
  },
];

// ── Photo filter per period ────────────────────────────────────────────────────
// Aggressive desaturation — the photo becomes emotional texture, not illustration.
export const PERIOD_PHOTO_FILTER: Record<AtmospherePeriod, string> = {
  latenight: "saturate(0.18) brightness(0.42) contrast(1.18)",
  dawn:      "saturate(0.26) brightness(0.50) contrast(1.10)",
  morning:   "saturate(0.46) brightness(0.62) contrast(1.06)",
  daytime:   "saturate(0.52) brightness(0.68) contrast(1.04)",
  sunset:    "saturate(0.38) brightness(0.56) contrast(1.08)",
  evening:   "saturate(0.28) brightness(0.50) contrast(1.12)",
  night:     "saturate(0.22) brightness(0.46) contrast(1.16)",
};

// ── Japanese weather kanji ────────────────────────────────────────────────────
export const WEATHER_JP: Partial<Record<string, string>> = {
  rainy:    "雨",
  clear:    "晴",
  sunny:    "晴",
  cloudy:   "曇",
  overcast: "曇",
  snowy:    "雪",
  foggy:    "霧",
  cold:     "寒",
  humid:    "蒸",
};

// ── Condition overlay ─────────────────────────────────────────────────────────
export function getConditionTint(condition: WeatherCondition): string | null {
  if (condition === "rainy")  return "rgba(18, 38, 72, 0.16)";
  if (condition === "foggy")  return "rgba(70, 80, 100, 0.14)";
  if (condition === "snowy")  return "rgba(180, 210, 240, 0.06)";
  return null;
}

// ── Photo selection ───────────────────────────────────────────────────────────
// Most-specific match wins (period+condition+day+season = highest score).
// Daily seed picks from tied top-score candidates — same photo all day.
export function getOpeningPhoto(
  period:    AtmospherePeriod,
  condition: WeatherCondition,
): OpeningPhoto {
  const seed   = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const day    = tokyoDayType();
  const season = tokyoSeason();

  const scored = PHOTOS
    .map((entry) => {
      const ok =
        (!entry.periods    || entry.periods.includes(period))    &&
        (!entry.conditions || entry.conditions.includes(condition)) &&
        (!entry.days       || entry.days.includes(day))          &&
        (!entry.seasons    || entry.seasons.includes(season));
      if (!ok) return null;

      const specificity =
        (entry.periods    ? 2 : 0) +
        (entry.conditions ? 2 : 0) +
        (entry.days       ? 1 : 0) +
        (entry.seasons    ? 1 : 0);

      return { entry, specificity };
    })
    .filter(Boolean) as { entry: PhotoEntry; specificity: number }[];

  if (scored.length === 0) return PHOTOS[0].photo;

  const maxSpec = Math.max(...scored.map((s) => s.specificity));
  const top     = scored.filter((s) => s.specificity >= maxSpec);
  return top[seed % top.length].entry.photo;
}
