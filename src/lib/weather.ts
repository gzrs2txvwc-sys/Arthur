export type WeatherCondition = "clear" | "cloudy" | "rainy" | "snowy" | "foggy";
export type TemperatureFeeling = "cold" | "cool" | "comfortable" | "warm" | "hot";

export interface TokyoWeather {
  condition: WeatherCondition;
  temperatureC: number;
  feeling: TemperatureFeeling;
  precipitationMm: number;
  isRaining: boolean;
}

// WMO weather interpretation codes → simplified condition
function wmoToCondition(code: number): WeatherCondition {
  if (code <= 1) return "clear";
  if (code <= 3) return "cloudy";
  if (code <= 48) return "foggy";
  if (code <= 67 || (code >= 80 && code <= 82)) return "rainy";
  if (code <= 77) return "snowy";
  return "rainy"; // thunderstorm → treat as rainy for curation
}

function tempToFeeling(temp: number): TemperatureFeeling {
  if (temp < 10) return "cold";
  if (temp < 18) return "cool";
  if (temp < 25) return "comfortable";
  if (temp < 30) return "warm";
  return "hot";
}

const FALLBACK: TokyoWeather = {
  condition: "clear",
  temperatureC: 20,
  feeling: "comfortable",
  precipitationMm: 0,
  isRaining: false,
};

export async function getTokyoWeather(): Promise<TokyoWeather> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=weather_code,temperature_2m,precipitation&timezone=Asia%2FTokyo",
      { next: { revalidate: 1800 } }, // 30-min cache
    );
    if (!res.ok) return FALLBACK;
    const json = await res.json();
    const c = json.current;
    const condition = wmoToCondition(c.weather_code ?? 0);
    const tempC = Math.round(c.temperature_2m ?? 20);
    const precipMm = c.precipitation ?? 0;
    return {
      condition,
      temperatureC: tempC,
      feeling: tempToFeeling(tempC),
      precipitationMm: precipMm,
      isRaining: condition === "rainy" || precipMm > 0.5,
    };
  } catch {
    return FALLBACK;
  }
}

export function weatherLabel(condition: WeatherCondition): string {
  const labels: Record<WeatherCondition, string> = {
    clear: "Clear",
    cloudy: "Overcast",
    rainy: "Rain",
    snowy: "Snow",
    foggy: "Fog",
  };
  return labels[condition];
}

// Returns true when this pick's mood/type is still worth recommending in current weather.
// Outdoor events in heavy rain get a flag rather than being hidden — the user decides.
export function isWeatherMismatch(
  weatherSuitability: string[],
  condition: WeatherCondition,
): boolean {
  if (weatherSuitability.includes("any")) return false;
  return !weatherSuitability.includes(condition);
}
