import type { WeatherCondition, TemperatureFeeling } from "./weather";

export type AtmospherePeriod =
  | "latenight" | "dawn" | "morning" | "daytime" | "sunset" | "evening" | "night";

interface AtmosphereTint {
  color: string;
  opacity: number;
}

// Subtle color tints — still used on top of the CSS var environment shift
// Daytime/morning periods no longer carry a base tint (CSS vars handle the big shift)
const PERIOD_TINTS: Record<AtmospherePeriod, AtmosphereTint | null> = {
  latenight: { color: "#060b20", opacity: 0.038 },
  dawn:      { color: "#b4c8e1", opacity: 0.032 },
  morning:   null,
  daytime:   null,
  sunset:    { color: "#d48040", opacity: 0.055 },
  evening:   { color: "#a06040", opacity: 0.028 },
  night:     null,
};

// CSS variable overrides injected via <style> tag — these create the true day/night shift
// Overriding --color-ink changes body bg, nav-glass, and all var(--color-ink) references
const PERIOD_CSS_VARS: Partial<Record<AtmospherePeriod, string>> = {
  latenight: `:root{--color-ink:#070910;--bg-elevated:#0c0e18;}`,
  dawn: `:root{--color-ink:#0c1018;--bg-elevated:#101820;--color-parchment:#c8d8f4;--color-parchment-warm:#b8ccec;--color-sand:#6888b8;--color-muted:#4a6888;}`,
  morning: `:root{--color-ink:#c8cdd4;--bg-elevated:#d4dae0;--color-parchment:#1a2030;--color-parchment-warm:#252e3c;--color-sand:#3a4a60;--color-sand-light:#6a8aaa;--color-muted:#607080;}`,
  daytime: `:root{--color-ink:#d8d4cc;--bg-elevated:#e0dbd5;--color-parchment:#201c18;--color-parchment-warm:#2a2420;--color-sand:#5c5046;--color-sand-light:#8a7a6a;--color-muted:#7a706a;}`,
  sunset:  `:root{--color-ink:#1c1408;--bg-elevated:#241c10;--color-parchment:#f0dcc8;--color-parchment-warm:#e8d4bc;--color-sand:#c89858;--color-sand-light:#e0bc90;--color-muted:#8a7050;}`,
  evening: `:root{--color-ink:#0e0c0a;--bg-elevated:#181410;--color-parchment:#f0e8dc;--color-parchment-warm:#e8e0d4;--color-sand:#c8a870;--color-muted:#907870;}`,
  // night: no override — stylesheet defaults are the correct night environment
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
  cssVars: string; // CSS variable overrides to inject into <style>
}

export function computeAtmosphere(
  tokyoHour: number,
  condition: WeatherCondition,
  feeling: TemperatureFeeling,
): AtmosphereResult {
  const period = hourToPeriod(tokyoHour);
  const base = PERIOD_TINTS[period];
  const cssVars = PERIOD_CSS_VARS[period] ?? "";

  if (!base) {
    if (condition === "rainy" || condition === "foggy") {
      return { period, tintColor: "#2a3d52", tintOpacity: 0.022, cssVars };
    }
    return { period, tintColor: null, tintOpacity: 0, cssVars };
  }

  let { color, opacity } = base;

  if (condition === "rainy" || condition === "foggy") {
    color = blendHex(color, "#5b7590", 0.35);
    opacity += 0.015;
  } else if (condition === "snowy") {
    color = blendHex(color, "#c8d8e8", 0.30);
    opacity += 0.010;
  }

  if (feeling === "hot") {
    color = blendHex(color, "#c88830", 0.25);
    opacity += 0.010;
  } else if (feeling === "cold") {
    color = blendHex(color, "#8eb0cc", 0.20);
    opacity += 0.008;
  }

  return { period, tintColor: color, tintOpacity: Math.min(opacity, 0.08), cssVars };
}

// Tokyo is UTC+9 with no DST
export function tokyoHour(): number {
  return (new Date().getUTCHours() + 9) % 24;
}

export function tokyoTimeString(): string {
  const ms = Date.now() + 9 * 3600 * 1000;
  const d  = new Date(ms);
  const h  = String(d.getUTCHours()).padStart(2, "0");
  const m  = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}
