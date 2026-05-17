import type { WeatherCondition, TemperatureFeeling } from "./weather";

export type AtmospherePeriod =
  | "latenight" | "dawn" | "morning" | "daytime" | "sunset" | "evening" | "night";

interface AtmosphereTint {
  color: string;
  opacity: number;
}

// Base tint per time-of-day period — very low opacities, felt not seen
const PERIOD_TINTS: Record<AtmospherePeriod, AtmosphereTint | null> = {
  latenight: { color: "#060b20", opacity: 0.038 }, // deep blue-black
  dawn:      { color: "#b4c8e1", opacity: 0.055 }, // pale silver-blue
  morning:   { color: "#a5bcd6", opacity: 0.042 }, // cool morning light
  daytime:   { color: "#8d9188", opacity: 0.030 }, // concrete neutral
  sunset:    { color: "#d48040", opacity: 0.062 }, // amber-orange glow
  evening:   { color: "#a06040", opacity: 0.030 }, // quieter amber
  night:     null,                                  // current dark palette is already correct
};

function hourToPeriod(hour: number): AtmospherePeriod {
  if (hour < 4)  return "latenight";
  if (hour < 6)  return "dawn";
  if (hour < 10) return "morning";
  if (hour < 16) return "daytime";
  if (hour < 19) return "sunset";
  if (hour < 21) return "evening";
  return "night";
}

function blendHex(a: string, b: string, t: number): string {
  const parse = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b2 = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b2.toString(16).padStart(2, "0")}`;
}

export interface AtmosphereResult {
  period: AtmospherePeriod;
  tintColor: string | null;
  tintOpacity: number;
}

export function computeAtmosphere(
  tokyoHour: number,
  condition: WeatherCondition,
  feeling: TemperatureFeeling,
): AtmosphereResult {
  const period = hourToPeriod(tokyoHour);
  const base = PERIOD_TINTS[period];

  if (!base) {
    // Night: only weather can add a tint
    if (condition === "rainy" || condition === "foggy") {
      return { period, tintColor: "#2a3d52", tintOpacity: 0.028 };
    }
    return { period, tintColor: null, tintOpacity: 0 };
  }

  let { color, opacity } = base;

  // Weather modifiers — subtle color blends
  if (condition === "rainy" || condition === "foggy") {
    color = blendHex(color, "#5b7590", 0.35);
    opacity += 0.018;
  } else if (condition === "snowy") {
    color = blendHex(color, "#c8d8e8", 0.30);
    opacity += 0.012;
  }

  // Temperature feeling modifiers
  if (feeling === "hot") {
    color = blendHex(color, "#c88830", 0.25);
    opacity += 0.012;
  } else if (feeling === "cold") {
    color = blendHex(color, "#8eb0cc", 0.20);
    opacity += 0.010;
  }

  return { period, tintColor: color, tintOpacity: Math.min(opacity, 0.10) };
}

// Tokyo is UTC+9 with no DST
export function tokyoHour(): number {
  return (new Date().getUTCHours() + 9) % 24;
}
