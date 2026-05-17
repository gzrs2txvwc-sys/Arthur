import type { FragmentMood } from "./postcards";

// Which moods flow naturally into which — emotional proximity, not taxonomy
export const MOOD_NEIGHBORS: Record<FragmentMood, FragmentMood[]> = {
  solitude:  ["quiet", "adrift", "invisible", "homesick"],
  quiet:     ["solitude", "anchored", "tender", "adrift"],
  adrift:    ["wandering", "invisible", "homesick", "solitude"],
  homesick:  ["solitude", "tender", "adrift", "quiet"],
  wandering: ["adrift", "restless", "belonging", "quiet"],
  belonging: ["anchored", "tender", "wandering", "quiet"],
  anchored:  ["belonging", "quiet", "tender", "solitude"],
  tender:    ["homesick", "belonging", "quiet", "solitude"],
  restless:  ["wandering", "adrift", "invisible", "solitude"],
  invisible: ["solitude", "adrift", "quiet", "homesick"],
};

// One atmospheric sentence per mood — bridges where you are to what comes next.
// Should feel like a thought, not a label.
export const MOOD_CONNECTOR: Record<FragmentMood, string> = {
  solitude:  "The city carries that feeling in other rooms too.",
  quiet:     "There is more stillness nearby, if you look for it.",
  adrift:    "This feeling moves. It finds you in other places.",
  homesick:  "Distance does something particular at this hour.",
  wandering: "There is always one more street.",
  belonging: "You start to notice things that stay the same.",
  anchored:  "Some places keep you still for a while.",
  tender:    "Small things have weight here.",
  restless:  "The city has edges you haven't reached yet.",
  invisible: "Tokyo runs parallel to its own surface.",
};

// Short second-person lines — the feeling of drifting between spaces
export const DRIFT_LINES: Record<FragmentMood, string[]> = {
  solitude: [
    "It's later than you meant to stay.",
    "The platform is almost empty.",
    "You've stopped expecting company.",
  ],
  quiet: [
    "Something is being held carefully nearby.",
    "Morning hasn't fully arrived yet.",
    "The noise doesn't reach here.",
  ],
  adrift: [
    "You forgot which direction you came from.",
    "The map is no longer helping.",
    "You're somewhere. That's enough.",
  ],
  homesick: [
    "You think about calling. You don't.",
    "The vending machine is the only light.",
    "This specific hour feels too far.",
  ],
  wandering: [
    "There's a side street you haven't tried.",
    "The sign says something you can't read.",
    "You've been going this way for twenty minutes.",
  ],
  belonging: [
    "You stopped checking the map a few weeks ago.",
    "The person at the counter recognized you.",
    "This corner feels like it might be yours.",
  ],
  anchored: [
    "You have a regular hour here.",
    "Saturday morning, always.",
    "This view doesn't need explaining anymore.",
  ],
  tender: [
    "Something small and exact happened near here.",
    "You remember this without knowing why.",
    "It was a Tuesday. Maybe a Thursday.",
  ],
  restless: [
    "The city has another face after midnight.",
    "You left the apartment for no reason.",
    "Waiting, without knowing what for.",
  ],
  invisible: [
    "Nobody noticed you come in. That was good.",
    "You've been sitting here an hour.",
    "The city runs past you, not through you.",
  ],
};

export function getDriftLine(mood: FragmentMood, seed = 0): string {
  const lines = DRIFT_LINES[mood];
  return lines[seed % lines.length];
}

// Derive a mood from story tags — ordered by specificity
const TAG_MOOD: Record<string, FragmentMood> = {
  solitude:  "solitude",
  "3am":     "solitude",
  midnight:  "tender",
  night:     "solitude",
  rain:      "adrift",
  silence:   "quiet",
  quiet:     "quiet",
  dawn:      "quiet",
  morning:   "quiet",
  temples:   "quiet",
  shrine:    "anchored",
  wandering: "wandering",
  homesick:  "homesick",
  foreign:   "adrift",
  belonging: "belonging",
  warmth:    "tender",
  food:      "tender",
  ramen:     "tender",
  cafe:      "quiet",
  konbini:   "quiet",
  invisible: "invisible",
  restless:  "restless",
};

export function getMoodFromTags(tags: string[]): FragmentMood {
  for (const tag of tags) {
    const m = TAG_MOOD[tag.toLowerCase()];
    if (m) return m;
  }
  return "wandering";
}
