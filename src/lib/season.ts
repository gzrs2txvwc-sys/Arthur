export type TokyoSeason =
  | "winter"
  | "sakura"
  | "spring"
  | "tsuyu"
  | "summer"
  | "autumn";

export type DayType = "weekday" | "weekend";

// Tokyo seasonal bands (approximate, adjusted yearly by JMA)
export function getTokyoSeason(date: Date): TokyoSeason {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if (m === 12 || m <= 2) return "winter";
  if (m === 3 || (m === 4 && d <= 20)) return "sakura";
  if (m === 4 || m === 5) return "spring";
  if (m === 6) return "tsuyu";       // rainy season
  if (m <= 9) return "summer";
  return "autumn";
}

// Fixed Japanese public holidays (national holidays with fixed dates)
const FIXED_HOLIDAYS: [number, number][] = [
  [1, 1],   // New Year's Day
  [2, 11],  // National Foundation Day
  [2, 23],  // Emperor's Birthday
  [4, 29],  // Showa Day
  [5, 3],   // Constitution Memorial Day
  [5, 4],   // Greenery Day
  [5, 5],   // Children's Day
  [8, 11],  // Mountain Day
  [11, 3],  // Culture Day
  [11, 23], // Labor Thanksgiving Day
];

// Happy Monday nth-weekday holidays (rough approximation for current decade)
function nthWeekday(year: number, month: number, weekday: number, n: number): number {
  let count = 0;
  for (let d = 1; d <= 31; d++) {
    const dt = new Date(year, month - 1, d);
    if (dt.getMonth() !== month - 1) break;
    if (dt.getDay() === weekday) {
      count++;
      if (count === n) return d;
    }
  }
  return -1;
}

export function isJapaneseHoliday(date: Date): boolean {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();

  // Fixed holidays
  if (FIXED_HOLIDAYS.some(([hm, hd]) => hm === m && hd === d)) return true;

  // Golden Week substitute — May 6 when May 3-5 fall on weekends (approximate)
  if (m === 5 && d === 6) {
    const may3 = new Date(y, 4, 3).getDay();
    if (may3 === 0 || may3 === 6) return true;
  }

  // Coming of Age Day: 2nd Monday of January
  if (m === 1 && d === nthWeekday(y, 1, 1, 2)) return true;

  // Marine Day: 3rd Monday of July
  if (m === 7 && d === nthWeekday(y, 7, 1, 3)) return true;

  // Respect for the Aged Day: 3rd Monday of September
  if (m === 9 && d === nthWeekday(y, 9, 1, 3)) return true;

  // Sports Day: 2nd Monday of October
  if (m === 10 && d === nthWeekday(y, 10, 1, 2)) return true;

  return false;
}

export function getDayType(date: Date): DayType {
  const dow = date.getDay();
  if (dow === 0 || dow === 6) return "weekend";
  if (isJapaneseHoliday(date)) return "weekend";
  return "weekday";
}

// Returns the Tokyo date object (UTC+9) from a UTC timestamp
export function tokyoDate(utcMs: number = Date.now()): Date {
  const tokyoMs = utcMs + 9 * 60 * 60 * 1000;
  return new Date(tokyoMs);
}

export function tokyoHour(utcMs: number = Date.now()): number {
  return tokyoDate(utcMs).getUTCHours();
}

// After 21:00 Tokyo time, we preview tomorrow's picks
export function shouldPreviewTomorrow(utcMs: number = Date.now()): boolean {
  return tokyoHour(utcMs) >= 21;
}
