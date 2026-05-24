// Behavioral memory — tracks visit patterns and walk engagement
// localStorage: full history (client-only)
// Cookie arthur_b: compact profile summary, readable server-side on next render

export type HourBand = "early" | "evening" | "late" | "midnight" | "any";

export interface BehaviorProfile {
  hourBand:        HourBand;
  walkAffinities:  string[];  // walk IDs the user has expanded
  consecutiveDays: number;    // 1 = just today, 2 = today + yesterday, etc.
  gapDays:         number;    // days gap before this visit (0 = visited yesterday)
  isReturning:     boolean;   // has visited on at least 2 distinct days
}

const LS_KEY     = "arthur_bm";
const COOKIE     = "arthur_b";
const COOKIE_TTL = 90; // days

interface MemoryStore {
  visitHours:    number[];  // last 10 Tokyo-hour values
  expandedWalks: string[];  // walk IDs, most recent first (max 10)
  visitDates:    string[];  // YYYY-MM-DD last 14 days (Tokyo time)
}

function tokyoDateStr(): string {
  const d = new Date(Date.now() + 9 * 3600 * 1000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  return Math.round(
    (new Date(b + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime()) /
      86_400_000,
  );
}

function readStore(): MemoryStore {
  if (typeof window === "undefined") return { visitHours: [], expandedWalks: [], visitDates: [] };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { visitHours: [], expandedWalks: [], visitDates: [] };
    return JSON.parse(raw) as MemoryStore;
  } catch {
    return { visitHours: [], expandedWalks: [], visitDates: [] };
  }
}

function writeStore(store: MemoryStore): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(LS_KEY, JSON.stringify(store)); } catch {}
}

function computeHourBand(hours: number[]): HourBand {
  if (hours.length === 0) return "any";
  // Wrap hours < 5 to 24+ so midnight-to-4am averages correctly
  const wrapped = hours.map((h) => (h < 5 ? h + 24 : h));
  const avg = wrapped.reduce((a, b) => a + b, 0) / wrapped.length;
  if (avg >= 23 || avg <= 5)  return "midnight";
  if (avg >= 21)              return "late";
  if (avg >= 17)              return "evening";
  if (avg >= 5 && avg <= 11) return "early";
  return "any";
}

function computeConsecutiveDays(uniqueSortedDesc: string[]): number {
  const today = tokyoDateStr();
  if (uniqueSortedDesc.length === 0 || uniqueSortedDesc[0] !== today) return 1;
  let c = 1;
  for (let i = 1; i < uniqueSortedDesc.length; i++) {
    if (daysBetween(uniqueSortedDesc[i], uniqueSortedDesc[i - 1]) === 1) c++;
    else break;
  }
  return c;
}

function deriveProfile(store: MemoryStore, gapDays: number): BehaviorProfile {
  const uniqueDates = [...new Set(store.visitDates)].sort().reverse();
  return {
    hourBand:        computeHourBand(store.visitHours),
    walkAffinities:  [...new Set(store.expandedWalks)],
    consecutiveDays: computeConsecutiveDays(uniqueDates),
    gapDays,
    isReturning:     uniqueDates.length >= 2,
  };
}

function writeCookie(profile: BehaviorProfile): void {
  if (typeof document === "undefined") return;
  try {
    const val = JSON.stringify({
      hb:  profile.hourBand,
      wa:  profile.walkAffinities.slice(0, 6),
      cd:  profile.consecutiveDays,
      gd:  profile.gapDays,
      ret: profile.isReturning,
    });
    const exp = new Date(Date.now() + COOKIE_TTL * 86_400_000).toUTCString();
    document.cookie = `${COOKIE}=${encodeURIComponent(val)}; expires=${exp}; path=/; SameSite=Lax`;
  } catch {}
}

// ── Public API ─────────────────────────────────────────────────────────────

// Called once per page mount — updates visit history and refreshes cookie
export function touchMemory(hour: number): void {
  const store = readStore();
  const today = tokyoDateStr();

  // Compute gap BEFORE adding today so it reflects the previous session's date
  const prevDates = [...new Set(store.visitDates)].sort().reverse();
  const gapDays =
    prevDates.length > 0 && prevDates[0] !== today
      ? Math.max(0, daysBetween(prevDates[0], today) - 1)
      : 0;

  const visitDates  = [...new Set([today, ...store.visitDates])].slice(0, 14);
  const visitHours  = [hour, ...store.visitHours].slice(0, 10);
  const updated: MemoryStore = { ...store, visitHours, visitDates };
  writeStore(updated);

  const profile = deriveProfile(updated, gapDays);
  writeCookie(profile);
}

// Called when a walk card is expanded — records engagement
export function recordWalkExpansion(walkId: string): void {
  if (typeof window === "undefined") return;
  const store = readStore();
  const walks = [walkId, ...store.expandedWalks.filter((w) => w !== walkId)].slice(0, 10);
  const updated: MemoryStore = { ...store, expandedWalks: walks };
  writeStore(updated);
  const today = tokyoDateStr();
  const prevDates = [...new Set(store.visitDates)].sort().reverse();
  const gapDays = prevDates.length > 0 && prevDates[0] !== today ? Math.max(0, daysBetween(prevDates[0], today) - 1) : 0;
  writeCookie(deriveProfile(updated, gapDays));
}

// Server-side: parse the cookie value into a BehaviorProfile
export function parseCookieProfile(cookieVal: string | undefined): BehaviorProfile | null {
  if (!cookieVal) return null;
  try {
    const raw = JSON.parse(decodeURIComponent(cookieVal));
    return {
      hourBand:        (raw.hb as HourBand) ?? "any",
      walkAffinities:  Array.isArray(raw.wa) ? (raw.wa as string[]) : [],
      consecutiveDays: Number(raw.cd) || 1,
      gapDays:         Number(raw.gd) || 0,
      isReturning:     Boolean(raw.ret),
    };
  } catch {
    return null;
  }
}
