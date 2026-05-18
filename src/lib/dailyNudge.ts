import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";

type PeriodNudges = Partial<Record<WeatherCondition | "any", string[]>>;

// Curated lines keyed to time period and weather.
// Each bucket has 2-4 options; a daily seed picks one so the line changes tomorrow.
const NUDGES: Partial<Record<AtmospherePeriod, PeriodNudges>> = {
  latenight: {
    clear: [
      "Somewhere in Kōenji a vending machine is the only warm thing on the block.",
      "The convenience stores are quieter after midnight.",
      "The last train already passed. No reason to hurry anywhere.",
    ],
    rainy: [
      "Rain at 1am has a different weight than rain at noon.",
      "The underground passages stay dry. You don't have to.",
      "Konbini umbrellas are ¥500. Probably worth it tonight.",
    ],
    foggy: [
      "Fog in Tokyo is rare. Worth going out in.",
      "The city fades out around 200 meters tonight.",
    ],
    any: [
      "The city after midnight belongs to a smaller Tokyo.",
      "There are fewer people out. That's different from being alone.",
    ],
  },
  dawn: {
    clear: [
      "The bicycle lots are still half-empty for another twenty minutes.",
      "Platforms carry a different population before 7am.",
      "The city before 7am belongs to almost no one.",
    ],
    rainy: [
      "Dawn rain in Tokyo. The city comes awake into it.",
    ],
    any: [
      "The city before 7am belongs to almost no one.",
      "Morning platforms carry a different weight.",
    ],
  },
  morning: {
    clear: [
      "Yanaka before noon, before the café queues.",
      "Concrete in winter morning light looks like a different material.",
      "The same route looks different before noon.",
    ],
    rainy: [
      "Rain gives the morning permission to slow down.",
      "Coin laundries are usually empty before 9.",
      "A covered shotengai somewhere is doing fine today.",
    ],
    any: [
      "The discount stickers don't go on until this evening.",
      "Morning in Tokyo belongs mostly to people who live here.",
    ],
  },
  daytime: {
    clear: [
      "Some alleys only reveal themselves in afternoon light.",
      "Thirty minutes on the Tamagawa embankment costs nothing.",
      "A platform somewhere has a view of the mountains on clear days.",
    ],
    rainy: [
      "Rainy afternoon: family restaurant, drip coffee, no one hurrying you.",
      "The covered shopping streets earned their roofs today.",
    ],
    foggy: [
      "Fog at midday in Tokyo is disorienting in a good way.",
    ],
    any: [
      "Some places are better visited without a plan.",
    ],
  },
  sunset: {
    clear: [
      "Bridges catch the light for about twenty minutes around now.",
      "The Tamagawa embankment, side-lit before it gets dark.",
      "The vegetable vendors are packing up.",
    ],
    rainy: [
      "The wet street doubles everything it reflects right now.",
      "Find somewhere with a window facing out.",
    ],
    any: [
      "A reasonable hour to leave your room.",
      "The city changes in the thirty minutes after sundown.",
    ],
  },
  evening: {
    clear: [
      "The discount sticker hour is 7pm at the local Seiyu. Worth knowing.",
      "Canal benches after 9pm: mostly empty, occasionally herons.",
      "The evening platforms carry people who have just stopped working.",
    ],
    rainy: [
      "Rain in the evening is the most Tokyo kind of weather.",
      "Someone else is also deciding whether to go out tonight.",
      "The overpasses near Shimbashi stay dry enough.",
    ],
    any: [
      "Still an hour or two before it gets late.",
      "The city at this hour has already made most of its decisions.",
    ],
  },
  night: {
    clear: [
      "The residential streets in Nerima don't perform being Tokyo.",
      "The bookshop district in Jimbochō goes quiet after 9.",
      "Still time before midnight.",
    ],
    rainy: [
      "Rain at 10pm. Unusually good walking weather.",
      "The coin laundry glows in the rain.",
      "If you go out now you'll be among the few.",
    ],
    foggy: [
      "Fog tonight. The city fades out around 200 meters.",
    ],
    cloudy: [
      "Overcast nights make the city lights diffuse in a good way.",
    ],
    any: [
      "Cold enough to make a vending machine coffee mean something.",
      "The city at night is a different size than the city by day.",
    ],
  },
};

const FALLBACK = [
  "Tokyo has more rooms than you've seen.",
  "One small thing tonight.",
  "The city is still out there.",
  "You don't have to go far.",
];

// Consistent within a calendar day (UTC+9), rotates by bucket size
function dailySeed(): number {
  const tokyoDay = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  return tokyoDay;
}

export function getDailyNudge(
  period: AtmospherePeriod,
  condition: WeatherCondition,
): string {
  const seed = dailySeed();
  const periodNudges = NUDGES[period];
  if (periodNudges) {
    const bucket = periodNudges[condition] ?? periodNudges.any;
    if (bucket && bucket.length > 0) {
      return bucket[seed % bucket.length];
    }
  }
  return FALLBACK[seed % FALLBACK.length];
}
