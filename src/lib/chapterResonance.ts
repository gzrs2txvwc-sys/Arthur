import type { MemoryPostcard, FragmentMood, UrbanFragmentType } from "@/lib/mapData";
import type { TokyoChapter } from "@/lib/tokyoRelationship";

// ── Mood resonance per chapter ─────────────────────────────────────────────
// 0 = neutral  1 = mild  2 = present  3 = strongly resonant
// "Arriving" favors disorientation/wandering. "Home" favors rootedness/quiet.
const MOOD_RESONANCE: Record<TokyoChapter, Record<FragmentMood, number>> = {
  arriving: {
    wandering:  3,
    adrift:     3,
    restless:   2,
    solitude:   2,
    invisible:  2,
    homesick:   1,
    quiet:      1,
    tender:     0,
    belonging:  0,
    anchored:   0,
  },
  adjusting: {
    homesick:   3,
    adrift:     3,
    invisible:  3,
    restless:   2,
    solitude:   2,
    tender:     1,
    wandering:  1,
    quiet:      1,
    belonging:  0,
    anchored:   0,
  },
  feeling: {
    quiet:      3,
    tender:     3,
    solitude:   2,
    belonging:  2,
    wandering:  2,
    restless:   1,
    anchored:   1,
    adrift:     0,
    homesick:   0,
    invisible:  0,
  },
  belonging: {
    belonging:  3,
    anchored:   3,
    tender:     2,
    quiet:      2,
    solitude:   2,
    wandering:  1,
    restless:   0,
    adrift:     0,
    homesick:   0,
    invisible:  0,
  },
  home: {
    anchored:   3,
    belonging:  3,
    quiet:      3,
    tender:     2,
    solitude:   2,
    wandering:  1,
    restless:   0,
    adrift:     0,
    homesick:   0,
    invisible:  0,
  },
};

// ── Fragment type resonance per chapter ────────────────────────────────────
// Only nonzero entries listed — everything else defaults to 0.
// Fragment type adds texture on top of mood; max contribution is 2.
const FRAGMENT_RESONANCE: Partial<Record<TokyoChapter, Partial<Record<UrbanFragmentType, number>>>> = {
  arriving: {
    "station-platform":  2,
    "konbini":           2,
    "vending-machine":   2,
    "alley":             1,
    "intersection":      1,
    "sidewalk":          1,
  },
  adjusting: {
    "laundromat":        2,
    "family-restaurant": 2,
    "konbini":           2,
    "vending-machine":   1,
    "park-bench":        1,
    "embankment":        1,
    "staircase":         1,
  },
  feeling: {
    "cafe":              2,
    "riverside":         2,
    "park-bench":        2,
    "alley":             1,
    "bicycle-parking":   1,
    "sidewalk":          1,
  },
  belonging: {
    "bridge":            2,
    "riverside":         2,
    "embankment":        2,
    "cafe":              2,
    "street-corner":     1,
    "train-crossing":    1,
    "utility-pole":      1,
  },
  home: {
    "bridge":            2,
    "embankment":        2,
    "riverside":         2,
    "street-corner":     1,
    "train-crossing":    1,
    "utility-pole":      1,
    "sidewalk":          1,
    "cafe":              1,
  },
};

// ── Daily noise — prevents mechanical determinism ─────────────────────────
// Each postcard gets a stable daily offset (0–1) that shifts the sort order
// slightly each day. Postcards with the same resonance score will appear in
// different orders on different days, keeping the map feeling alive.
function dailyNoise(postcardId: string): number {
  const day = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  let h = day * 2654435761;
  for (let i = 0; i < postcardId.length; i++) {
    h = Math.imul(h ^ postcardId.charCodeAt(i), 2654435761);
  }
  return (Math.abs(h) >>> 0) / 0xffffffff; // 0–1
}

// ── Public scoring function ────────────────────────────────────────────────
// Returns a raw score (0–~7). Higher = stronger emotional resonance with
// the chapter. Includes daily noise so ties sort differently each day.
// The score is only meaningful comparatively — not as an absolute value.
export function getChapterResonance(postcard: MemoryPostcard, chapter: TokyoChapter): number {
  const moodScore     = MOOD_RESONANCE[chapter][postcard.mood] ?? 0;
  const fragmentScore = FRAGMENT_RESONANCE[chapter]?.[postcard.fragmentType] ?? 0;
  const noise         = dailyNoise(postcard.id);

  // Mood (0–3) + fragment (0–2) + noise (0–1) = 0–6 effective range
  return moodScore + fragmentScore + noise;
}
