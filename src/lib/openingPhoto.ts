import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";

export interface OpeningPhoto {
  id: string;
  alt: string;
  objectPosition?: string;
}

interface PhotoEntry {
  photo:   OpeningPhoto;
  periods: AtmospherePeriod[];
}

// ── Photo pool ─────────────────────────────────────────────────────────────────
// Photos that feel like someone who actually lives in Tokyo took them —
// not tourist shots. Each period has 1-2 options; the daily seed rotates.
// objectPosition anchors the focal point when the image crops.
const PHOTOS: PhotoEntry[] = [
  // Latenight — empty streets, vending machine glow, the city past midnight
  {
    photo: { id: "photo-1536098561742-ca998e48cbcc", alt: "Tokyo at night", objectPosition: "center 55%" },
    periods: ["latenight", "night"],
  },
  {
    photo: { id: "photo-1540959733332-eab4deabeeaf", alt: "Tokyo night street", objectPosition: "center 60%" },
    periods: ["latenight"],
  },

  // Dawn — empty train cars, platforms before the city starts
  {
    photo: { id: "photo-1554797589-7241bb691973", alt: "Empty train car at dawn", objectPosition: "center" },
    periods: ["dawn"],
  },

  // Morning — streets waking up, light arriving
  {
    photo: { id: "photo-1506748686214-e9df14d4d9d0", alt: "Tokyo morning", objectPosition: "center 35%" },
    periods: ["morning"],
  },

  // Daytime — alleys, ordinary streets, the city working
  {
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Tokyo street", objectPosition: "center 50%" },
    periods: ["daytime", "morning"],
  },

  // Sunset / evening — city shifting registers
  {
    photo: { id: "photo-1580822184713-fc5400e7fe10", alt: "Tokyo daily life", objectPosition: "center 40%" },
    periods: ["sunset", "evening"],
  },

  // Night — after dark, just before last trains
  {
    photo: { id: "photo-1542051841857-5f90071e7989", alt: "Tokyo at night", objectPosition: "center 65%" },
    periods: ["night", "evening"],
  },
];

// ── Photo filter per period ────────────────────────────────────────────────────
// Aggressive desaturation and darkening — the photo becomes texture,
// not illustration. Text and atmosphere are primary.
export const PERIOD_PHOTO_FILTER: Record<AtmospherePeriod, string> = {
  latenight: "saturate(0.1) brightness(0.28) contrast(1.25)",
  dawn:      "saturate(0.18) brightness(0.38) contrast(1.12)",
  morning:   "saturate(0.38) brightness(0.52) contrast(1.08)",
  daytime:   "saturate(0.42) brightness(0.58) contrast(1.06)",
  sunset:    "saturate(0.28) brightness(0.44) contrast(1.12)",
  evening:   "saturate(0.16) brightness(0.36) contrast(1.18)",
  night:     "saturate(0.1) brightness(0.3) contrast(1.22)",
};

// ── Japanese weather kanji ────────────────────────────────────────────────────
// Small detail that makes the opening line feel bilingual, not translated.
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
// Adds a cool blue-grey tint for rain/fog over the photo filter.
export function getConditionTint(condition: WeatherCondition): string | null {
  if (condition === "rainy")  return "rgba(18, 38, 72, 0.16)";
  if (condition === "foggy")  return "rgba(70, 80, 100, 0.14)";
  if (condition === "snowy")  return "rgba(180, 210, 240, 0.06)";
  return null;
}

// ── Photo selection ───────────────────────────────────────────────────────────
// Daily seed picks from period-matched photos; same photo all day.
export function getOpeningPhoto(period: AtmospherePeriod): OpeningPhoto {
  const seed    = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const matches = PHOTOS.filter((e) => e.periods.includes(period));
  if (matches.length === 0) return PHOTOS[0].photo;
  return matches[seed % matches.length].photo;
}
