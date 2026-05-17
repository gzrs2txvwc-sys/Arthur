export type FragmentMood =
  | "solitude"
  | "wandering"
  | "homesick"
  | "belonging"
  | "quiet"
  | "restless"
  | "invisible"
  | "tender"
  | "adrift"
  | "anchored";

export type FragmentWeather = "rain" | "clear" | "overcast" | "fog" | "humid" | "cold";

export type TimeOfDay =
  | "dawn"
  | "morning"
  | "afternoon"
  | "evening"
  | "night"
  | "latenight";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type UrbanFragmentType =
  | "vending-machine"
  | "konbini"
  | "alley"
  | "train-crossing"
  | "riverside"
  | "cafe"
  | "staircase"
  | "utility-pole"
  | "sidewalk"
  | "intersection"
  | "station-platform"
  | "laundromat"
  | "bridge"
  | "park-bench"
  | "street-corner"
  | "bicycle-parking"
  | "family-restaurant"
  | "supermarket"
  | "parking-structure"
  | "embankment";

export type PinState = "locked" | "nearby" | "unlocked" | "collected";

export interface MemoryPostcard {
  id: string;

  // Content
  title: string;
  caption: string;   // One sentence, first-person
  memory: string;    // Full memory, 1-3 paragraphs, "\n\n" separated

  // Location
  coordinates: [number, number]; // [lat, lng]
  city: "tokyo" | "kyoto" | "osaka" | "other";
  neighborhood?: string;
  streetHint?: string; // Vague, evocative — not a full address

  // Classification
  fragmentType: UrbanFragmentType;
  mood: FragmentMood;

  // Context
  weather?: FragmentWeather;
  timeOfDay?: TimeOfDay;
  season?: Season;

  // Image — should feel like street photography, not travel promo
  imageUrl: string;
  imageAlt: string;

  // Attribution
  author?: string;
  year?: string;

  // Discovery mechanics
  unlockRadius?: number; // meters, defaults to 120

  tags: string[];
}

export const moodMeta: Record<FragmentMood, { color: string; glow: string }> = {
  solitude:  { color: "#7B8DB3", glow: "rgba(123,141,179,0.45)" },
  wandering: { color: "#C9A96E", glow: "rgba(201,169,110,0.45)" },
  homesick:  { color: "#8B7E9E", glow: "rgba(139,126,158,0.45)" },
  belonging: { color: "#6B9E8A", glow: "rgba(107,158,138,0.45)" },
  quiet:     { color: "#A8B5A0", glow: "rgba(168,181,160,0.45)" },
  restless:  { color: "#C87D6B", glow: "rgba(200,125,107,0.45)" },
  invisible: { color: "#787890", glow: "rgba(120,120,144,0.45)" },
  tender:    { color: "#D4A5B5", glow: "rgba(212,165,181,0.45)" },
  adrift:    { color: "#5B7FA6", glow: "rgba(91,127,166,0.45)" },
  anchored:  { color: "#7A9E7E", glow: "rgba(122,158,126,0.45)" },
};
