// Browser-only — reads/writes localStorage.
// Tracks which stories were read and how recently, producing influence signals
// that the map resonance system uses to softly echo story moods.

import type { FragmentMood } from "@/lib/mapData";

const KEY = "tokyo_story_memory_v1";
const MAX_ENTRIES = 50;
const DEDUP_MS = 30 * 60 * 1000; // same story within 30 min = one read

interface StoryReadEntry {
  slug:  string;
  mood:  FragmentMood;
  city:  string;
  tags:  string[];
  ts:    number;
}

export interface StoryInfluences {
  // Mood boost 0–2: postcards with this mood get extra resonance on the map
  moodBoosts:   Partial<Record<FragmentMood, number>>;
  // City boost 0–1: postcards from this city get a small resonance nudge
  cityBoosts:   Record<string, number>;
  // Moods read within the last 7 days — used for the in-postcard story echo
  recentMoods:  FragmentMood[];
  hasReadAny:   boolean;
}

// ── Persistence ─────────────────────────────────────────────────────────────

function load(): StoryReadEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as StoryReadEntry[];
  } catch {
    return [];
  }
}

function save(entries: StoryReadEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {}
}

// ── Public API ───────────────────────────────────────────────────────────────

// Called when a story page opens. Deduplicated per 30-minute window so a
// single reading session only counts once, but returning days later counts again.
export function logStoryRead(slug: string, mood: FragmentMood, city: string, tags: string[]): void {
  const entries = load();
  const recent = entries.find((e) => e.slug === slug && Date.now() - e.ts < DEDUP_MS);
  if (recent) return;
  entries.push({ slug, mood, city, tags, ts: Date.now() });
  save(entries);
}

// Returns emotional influence signals derived from reading history.
// Mood boosts decay: full weight within 7 days, half weight 7–14 days, gone after.
export function getStoryInfluences(): StoryInfluences {
  const entries = load();
  const now = Date.now();
  const window14 = 14 * 86_400_000;
  const window7  =  7 * 86_400_000;

  const recent = entries.filter((e) => now - e.ts < window14);

  const moodBoosts: Partial<Record<FragmentMood, number>> = {};
  const cityBoosts: Record<string, number> = {};

  recent.forEach((e) => {
    const decay = now - e.ts < window7 ? 1.0 : 0.5;
    moodBoosts[e.mood] = Math.min(2, (moodBoosts[e.mood] ?? 0) + decay);
    cityBoosts[e.city] = Math.min(1, (cityBoosts[e.city] ?? 0) + 0.4);
  });

  const recentMoods = [
    ...new Set(entries.filter((e) => now - e.ts < window7).map((e) => e.mood)),
  ] as FragmentMood[];

  return {
    moodBoosts,
    cityBoosts,
    recentMoods,
    hasReadAny: entries.length > 0,
  };
}

// Returns true if the user has read a story with this specific mood recently.
// Used by PostcardView to decide whether to show the story echo line.
export function hasReadMoodRecently(mood: FragmentMood): boolean {
  return getStoryInfluences().recentMoods.includes(mood);
}
