import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";
import type { TokyoChapter } from "./tokyoRelationship";

interface NudgeLine {
  periods?:    AtmospherePeriod[];
  conditions?: WeatherCondition[];
  text:        string;
}

// ── Chapter-specific nudge pools ───────────────────────────────────────────
// Each chapter carries its own emotional register. The writing here is the
// actual relationship — it needs to be honest, not performative.

// ARRIVING — first sessions, city is still unfamiliar.
// Platform gives permission to be disoriented. No pressure, no fixing.
const ARRIVING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "Cities feel different at night when you don't know them yet. That changes slowly." },
  { periods: ["latenight"],                     text: "The konbini at 1am. You'll start to have a preferred one eventually." },
  { periods: ["dawn"],                          text: "Being up before the city knows what it's doing is a way of entering it." },
  { periods: ["morning"],                       text: "You don't know this city yet. That's not a problem right now." },
  { periods: ["morning"],  conditions: ["clear"],  text: "Morning in Tokyo looks simple from outside. It isn't, but you'll figure it out." },
  { periods: ["daytime"],                       text: "Getting lost in the first weeks means you're paying attention." },
  { periods: ["daytime"],  conditions: ["rainy"],  text: "A rainy afternoon inside counts as part of arriving somewhere new." },
  { periods: ["sunset", "evening"],             text: "The city after 5pm is different from the city you stepped off the plane into." },
  { periods: ["night"],                         text: "Still early. You'll know this city much better than you do right now." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Your first rainy nights in a new city count for something." },
  {                                             text: "Every neighborhood looks the same until one suddenly doesn't." },
  {                                             text: "Some things about Tokyo only become clear on the third time." },
  {                                             text: "The first month is mostly logistics. That is not a failure." },
  {                                             text: "Tokyo asks a lot in the beginning. It does that to everyone." },
  {                                             text: "One small thing today is enough." },
  {                                             text: "You're still in the part where nothing feels like it fits yet." },
  {                                             text: "The city has a lot of rooms. You haven't found yours yet. That's fine." },
];

// ADJUSTING — the harder middle months. The wall period.
// This is the most important chapter to write honestly.
// The platform should not perform cheerfulness here. It should simply be present.
const ADJUSTING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "Late nights are harder when home still feels uncertain." },
  { periods: ["latenight"],                     text: "Being awake at this hour during a hard month is its own particular thing." },
  { periods: ["latenight"], conditions: ["rainy"], text: "Rain at 1am during a difficult stretch. You're not the first person here for this." },
  { periods: ["dawn"],                          text: "Being up this early during a hard period is not the same as being okay. That's fine." },
  { periods: ["morning"],                       text: "Not every morning here needs to be a good one." },
  { periods: ["morning"],                       text: "Getting up and doing the basic things is enough for now." },
  { periods: ["morning"],  conditions: ["rainy"],  text: "Rain on a difficult morning. The city asks less of you today." },
  { periods: ["daytime"],                       text: "Some days the city just asks too much." },
  { periods: ["daytime"],  conditions: ["rainy"],  text: "Rainy afternoons inside are allowed. You don't have to make them mean anything." },
  { periods: ["evening"],                       text: "It gets easier to be out in the evenings once you have even one or two places." },
  { periods: ["evening"],  conditions: ["rainy"],  text: "Rain in the evening is when Tokyo asks the least of you." },
  { periods: ["night"],                         text: "Some nights this city is very good at being alive without you. That does change." },
  { periods: ["night"],    conditions: ["rainy"],  text: "There's a particular loneliness that rain at night makes legible. You're not imagining it." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Rain at 10pm when you're in the hard months. You're among a specific few out tonight." },
  {                                             text: "Some weeks Tokyo is just endurance. That's allowed." },
  {                                             text: "Month three is when most people struggle. You're not the exception, and you're not failing." },
  {                                             text: "Loneliness in a crowd is its own particular weight. The city doesn't fix that." },
  {                                             text: "You can have a hard month here and still be okay." },
  {                                             text: "The silence here isn't unfriendly. It's just not talking to you yet." },
  {                                             text: "Not every day here has to mean something." },
  {                                             text: "The people who stay knew a hard month was coming. You're in it." },
  {                                             text: "Tokyo has a way of making loneliness feel like a personal failure. It isn't." },
  {                                             text: "You're allowed to be having a difficult time here." },
];

// FEELING — something is beginning to stick. Quiet emerging rootedness.
// Platform notices without making it a celebration.
const FEELING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "The city starts to feel different when you know which vending machine is around the corner." },
  { periods: ["dawn"],                          text: "You've started to know what the city sounds like at this hour." },
  { periods: ["morning"],                       text: "You already know which direction to walk from here." },
  { periods: ["morning"],  conditions: ["clear"],  text: "Morning here starts to feel different once you know what it leads to." },
  { periods: ["daytime"],                       text: "Some alleys are starting to look familiar before you know their names." },
  { periods: ["daytime"],  conditions: ["rainy"],  text: "You know which covered route to take now." },
  { periods: ["sunset"],                        text: "You've seen this light before." },
  { periods: ["evening"],                       text: "You've started to have a few places. That matters more than it sounds." },
  { periods: ["night"],                         text: "You know what kind of night this is now." },
  { periods: ["night"],    conditions: ["rainy"],  text: "The rain sounds different on a street you've walked before." },
  {                                             text: "Something is starting to stick." },
  {                                             text: "The city is starting to organize itself around your routes." },
  {                                             text: "There's a version of Tokyo that's beginning to be yours." },
  {                                             text: "You know which konbini you prefer. That's belonging in miniature." },
  {                                             text: "Some places are starting to feel less like directions and more like somewhere you go." },
  {                                             text: "You've started to have preferences about this city. That's a different relationship." },
  {                                             text: "The city has started to feel the same size as you." },
];

// BELONGING — routines exist, places are yours, the city organized itself around you.
// Platform speaks from familiarity, not encouragement.
const BELONGING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "You know what the city sounds like at this hour." },
  { periods: ["dawn"],                          text: "The city before 7am still belongs to almost no one. Including you." },
  { periods: ["morning"],                       text: "You've walked this way before." },
  { periods: ["morning"],  conditions: ["clear"],  text: "A clear morning in a city you know. That's a different thing than it used to be." },
  { periods: ["daytime"],                       text: "There are parts of this city that have started to feel like yours." },
  { periods: ["sunset"],                        text: "You've watched this light change before." },
  { periods: ["sunset", "evening"],             text: "The city asks less of you now." },
  { periods: ["night"],                         text: "Late in a city that became familiar before you noticed." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Rain on a street you know well." },
  { periods: ["night"],    conditions: ["rainy"],  text: "You know where to walk in weather like this." },
  {                                             text: "The places that are yours are yours now." },
  {                                             text: "Some corners of this city know you by now." },
  {                                             text: "Tokyo asked a lot and you stayed. That's not nothing." },
  {                                             text: "You've earned a certain kind of quiet here." },
  {                                             text: "The city adjusted to you, a little." },
  {                                             text: "You're no longer arriving. You live here now." },
];

// HOME — long-term presence. Seasonal memory. Wistful, earned, unhurried.
// Platform speaks the way someone does after years somewhere.
const HOME: NudgeLine[] = [
  { periods: ["latenight"],                     text: "This is a familiar quiet now." },
  { periods: ["dawn"],                          text: "You've watched this city wake up before." },
  { periods: ["morning"],  conditions: ["clear"],  text: "Clear morning. The mountains are probably visible from the right platform." },
  { periods: ["morning"],                       text: "The city before 7am still asks nothing of you." },
  { periods: ["evening"],                       text: "Another evening in a city that became home without you deciding it." },
  { periods: ["night"],                         text: "Still in this city. That wasn't obvious when you arrived." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Rain in Tokyo. You know what this sounds like from inside now." },
  { periods: ["night"],    conditions: ["rainy"],  text: "You've walked in weather like this before. You know what it costs." },
  {                        conditions: ["snowy"],   text: "Snow in Tokyo again. You recognize this particular quiet." },
  {                                             text: "The cold has come back. You recognize it this time." },
  {                                             text: "A year ago this corner was still unfamiliar." },
  {                                             text: "You know what Tokyo sounds like in February now." },
  {                                             text: "The city is different when you've watched it change." },
  {                                             text: "You've been here through one full summer." },
  {                                             text: "Tokyo is where you live. You found that out slowly." },
  {                                             text: "The seasons have a different meaning once you've seen them here before." },
];

const CHAPTER_NUDGES: Record<TokyoChapter, NudgeLine[]> = {
  arriving:   ARRIVING,
  adjusting:  ADJUSTING,
  feeling:    FEELING,
  belonging:  BELONGING,
  home:       HOME,
};

// ── Return nudges — shown when returning after 7+ day gap ─────────────────
// The city quietly acknowledges the absence. One day only, then back to chapter tone.
const RETURN_SHORT: string[] = [    // 7–14 day gap
  "The city is still here.",
  "You were away for a while.",
  "Some time away and then back.",
];
const RETURN_MEDIUM: string[] = [   // 14–30 days
  "You were away for a while. Tokyo hasn't changed much.",
  "The city waited.",
  "Longer away this time.",
];
const RETURN_LONG: string[] = [     // 30+ days
  "Coming back after a long time. Tokyo looks the same from outside.",
  "Some time away. The city is quieter than you remembered, or you're quieter.",
  "Back. That's something.",
];

// ── Generic fallback nudges (period × weather, no chapter context) ────────
type PeriodNudges = Partial<Record<WeatherCondition | "any", string[]>>;

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

// ── Selection ──────────────────────────────────────────────────────────────

// Consistent within a calendar day (UTC+9) so the line stays the same all day
function dailySeed(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
}

function pick<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}

function fromPool(pool: NudgeLine[], period: AtmospherePeriod, condition: WeatherCondition, seed: number): string | null {
  // Best match: period + condition
  let candidates = pool.filter(
    (l) =>
      (!l.periods    || l.periods.includes(period)) &&
      (!l.conditions || l.conditions.includes(condition)),
  );
  if (candidates.length > 0) return pick(candidates, seed).text;

  // Fallback: period only
  candidates = pool.filter(
    (l) => !l.conditions && (!l.periods || l.periods.includes(period)),
  );
  if (candidates.length > 0) return pick(candidates, seed).text;

  // Fallback: generic within chapter pool
  candidates = pool.filter((l) => !l.periods && !l.conditions);
  if (candidates.length > 0) return pick(candidates, seed).text;

  return null;
}

export function getDailyNudge(
  period:     AtmospherePeriod,
  condition:  WeatherCondition,
  chapter?:   TokyoChapter,
  returning?: boolean,    // true when returning after 7+ day gap
  gapDays?:   number,     // days absent — shapes return line selection
): string {
  const seed = dailySeed();

  // Return recognition takes priority on the day of return — the city quietly
  // acknowledges the absence, then the next day returns to chapter tone.
  if (returning) {
    const days = gapDays ?? 0;
    if (days >= 30) return pick(RETURN_LONG, seed);
    if (days >= 14) return pick(RETURN_MEDIUM, seed);
    return pick(RETURN_SHORT, seed);
  }

  // Chapter-specific nudge
  if (chapter) {
    const chapterLine = fromPool(CHAPTER_NUDGES[chapter], period, condition, seed);
    if (chapterLine) return chapterLine;
  }

  // Generic period × weather fallback
  const periodNudges = NUDGES[period];
  if (periodNudges) {
    const bucket = periodNudges[condition] ?? periodNudges.any;
    if (bucket && bucket.length > 0) return pick(bucket, seed);
  }

  return pick(FALLBACK, seed);
}
