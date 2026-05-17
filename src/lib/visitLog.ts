const VISIT_KEY = "arthur:visit-log";
const MAX_ENTRIES = 200;

interface VisitEntry {
  postcardId: string;
  neighborhood: string;
  mood: string;
  tokyoHour: number;
  ts: number;
}

function loadEntries(): VisitEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(VISIT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveEntries(entries: VisitEntry[]) {
  localStorage.setItem(VISIT_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
}

// Deduplicated by postcardId within a 5-minute window
export function logPostcardVisit(
  postcardId: string,
  neighborhood: string,
  mood: string,
  tokyoHour: number,
) {
  const entries = loadEntries();
  const recent = entries.find(
    (e) => e.postcardId === postcardId && Date.now() - e.ts < 5 * 60 * 1000,
  );
  if (recent) return;
  entries.push({ postcardId, neighborhood, mood, tokyoHour, ts: Date.now() });
  saveEntries(entries);
}

export function getNeighborhoodCount(neighborhood: string): number {
  return loadEntries().filter((e) => e.neighborhood === neighborhood).length;
}

// Returns a quiet observational sentence, or null if nothing meaningful yet
export function getQuietObservation(): string | null {
  const entries = loadEntries();
  if (entries.length < 2) return null;

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 3600 * 1000;
  const thisWeek = entries.filter((e) => e.ts > weekAgo);
  const nightThisWeek = thisWeek.filter((e) => e.tokyoHour >= 21 || e.tokyoHour < 4);
  const currentHour = (new Date().getUTCHours() + 9) % 24;
  const isLate = currentHour >= 22 || currentHour < 4;

  const neighborhoodCounts: Record<string, number> = {};
  entries.forEach((e) => {
    neighborhoodCounts[e.neighborhood] = (neighborhoodCounts[e.neighborhood] ?? 0) + 1;
  });
  const sorted = Object.entries(neighborhoodCounts).sort((a, b) => b[1] - a[1]);
  const [topNeighborhood, topCount] = sorted[0] ?? [null, 0];

  const lastTs = entries[entries.length - 2]?.ts;
  const daysSinceLast = lastTs ? (now - lastTs) / (1000 * 3600 * 24) : 0;

  if (isLate && nightThisWeek.length >= 2) return "Third night outside this week.";
  if (nightThisWeek.length >= 3) return "You've been out late more than usual this week.";
  if (entries.length >= 10 && topNeighborhood && topCount >= 4)
    return `You keep coming back to ${topNeighborhood}.`;
  if (thisWeek.length >= 5) return "You've been walking more lately.";
  if (daysSinceLast > 10) return "You were away for a while.";
  if (entries.length >= 3 && isLate) return "Still out this late.";

  return null;
}
