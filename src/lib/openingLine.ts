import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";

type DayType = "weekday" | "friday" | "saturday" | "sunday";

interface ObservationLine {
  periods?:    AtmospherePeriod[];
  conditions?: WeatherCondition[];
  days?:       DayType[];
  text:        string;
}

// ── Observation lines ───────────────────────────────────────────────────────
// These should read like something someone who actually lives in Tokyo
// would suddenly think, not like a composed sentence. Specific over poetic.
const LINES: ObservationLine[] = [
  // Latenight ──────────────────────────────────────────────────────────────
  { periods: ["latenight"], conditions: ["rainy"],
    text: "The kind of rain that makes konbini lighting look warmer than usual." },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "Someone didn't make the last train. They're figuring it out." },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "At this hour the streets belong to people who didn't plan on being out." },
  { periods: ["latenight"], days: ["sunday"],
    text: "Sunday night here has a particular kind of weight." },
  { periods: ["latenight"], days: ["friday", "saturday"],
    text: "The people who know where they're going are still out." },
  { periods: ["latenight"],
    text: "Tonight someone in Nakano waited past the last train." },
  { periods: ["latenight"],
    text: "The vending machine on the corner is the only warm light on this block." },
  { periods: ["latenight"],
    text: "A convenience store is always open. You probably already knew that." },
  { periods: ["latenight"],
    text: "After midnight, Tokyo is still making noise somewhere." },

  // Dawn ────────────────────────────────────────────────────────────────────
  { periods: ["dawn"], conditions: ["rainy"],
    text: "Rain before the city wakes up." },
  { periods: ["dawn"],
    text: "Before 6am, the city runs on maintenance crews and early bakers." },
  { periods: ["dawn"],
    text: "The first train carries people who slept somewhere they didn't plan to." },
  { periods: ["dawn"],
    text: "Tokyo is very quiet before 6am. It won't be for long." },

  // Morning ─────────────────────────────────────────────────────────────────
  { periods: ["morning"], conditions: ["rainy"],
    text: "A konbini umbrella costs 500 yen. Everyone has forgotten one before." },
  { periods: ["morning"], conditions: ["rainy"],
    text: "Rain before 9am makes people a little more patient at the crosswalk." },
  { periods: ["morning"], days: ["saturday"],
    text: "Saturday mornings move slower. The city cooperates." },
  { periods: ["morning"], days: ["sunday"],
    text: "The cafes fill up an hour later on Sundays." },
  { periods: ["morning"], days: ["weekday", "friday"],
    text: "The morning trains are full of people going somewhere decided." },
  { periods: ["morning"],
    text: "Mornings here arrive early and don't apologize for it." },

  // Daytime ─────────────────────────────────────────────────────────────────
  { periods: ["daytime"], conditions: ["rainy"],
    text: "Rainy weekday afternoons belong to people with nowhere they have to be." },
  { periods: ["daytime"], conditions: ["rainy"],
    text: "The covered walkways between buildings have a rhythm to them in rain." },
  { periods: ["daytime"], conditions: ["clear"],
    text: "Clear days in Tokyo feel like the city is cooperating." },
  { periods: ["daytime"],
    text: "Somewhere in this city, someone is eating alone and that's fine." },
  { periods: ["daytime"],
    text: "Afternoon is when Tokyo asks the least of you." },

  // Sunset / Evening ────────────────────────────────────────────────────────
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "Rain in the evening makes the city feel smaller and easier." },
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "The wet streets reflect the signs. It's a slightly different city tonight." },
  { periods: ["sunset", "evening"], days: ["friday"],
    text: "Friday evening in Tokyo has its own particular energy." },
  { periods: ["sunset", "evening"], days: ["sunday"],
    text: "Sunday evening and the city is already thinking about tomorrow." },
  { periods: ["sunset", "evening"],
    text: "After 6pm the city becomes a slightly different city." },
  { periods: ["sunset", "evening"],
    text: "There's a moment around 7pm when the trains switch from crowded to possible." },

  // Night ───────────────────────────────────────────────────────────────────
  { periods: ["night"], conditions: ["rainy"],
    text: "A wet night. The alley lights reflect off the pavement." },
  { periods: ["night"], conditions: ["rainy"],
    text: "There's a shop in Shimokitazawa that's still lit tonight." },
  { periods: ["night"], days: ["sunday"],
    text: "Sunday night has its own particular silence." },
  { periods: ["night"], days: ["friday", "saturday"],
    text: "On Friday nights, the city gives itself permission." },
  { periods: ["night"],
    text: "The city has more rooms than most people ever find." },
  { periods: ["night"],
    text: "Some people have a corner of this city that belongs only to them." },
  { periods: ["night"],
    text: "Tonight someone decided to stay out one more hour." },

  // Universal ───────────────────────────────────────────────────────────────
  { text: "Convenience stores look warmer in winter." },
  { text: "Some people arrive in Tokyo without knowing how long they'll stay." },
  { text: "The city has a way of becoming familiar without asking permission." },
  { text: "Some things here only make sense on the third time." },
  { text: "There's always a part of this city you haven't walked through yet." },
];

function tokyoDayType(): DayType {
  const ms  = Date.now() + 9 * 3600 * 1000;
  const day = new Date(ms).getUTCDay(); // 0 = Sun … 6 = Sat
  if (day === 0) return "sunday";
  if (day === 5) return "friday";
  if (day === 6) return "saturday";
  return "weekday";
}

function dailySeed(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
}

// Picks the most contextually specific line for the current moment.
// More specific lines (period + condition + day) score higher than generic ones.
// Daily seed ensures a different line each day within the matched pool.
export function getOpeningLine(
  period:    AtmospherePeriod,
  condition: WeatherCondition,
): string {
  const day  = tokyoDayType();
  const seed = dailySeed();

  const scored = LINES
    .map((line) => {
      const periodMatch    = !line.periods    || line.periods.includes(period);
      const conditionMatch = !line.conditions || line.conditions.includes(condition);
      const dayMatch       = !line.days       || line.days.includes(day);
      if (!periodMatch || !conditionMatch || !dayMatch) return null;

      const specificity =
        (line.periods    ? 2 : 0) +
        (line.conditions ? 2 : 0) +
        (line.days       ? 1 : 0);

      return { line, specificity };
    })
    .filter(Boolean) as { line: ObservationLine; specificity: number }[];

  if (scored.length === 0) return LINES[seed % LINES.length].text;

  const maxSpec = Math.max(...scored.map((s) => s.specificity));
  const top     = scored.filter((s) => s.specificity >= maxSpec);
  return top[seed % top.length].line.text;
}
