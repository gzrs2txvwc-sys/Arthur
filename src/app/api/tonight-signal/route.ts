import { getTokyoWeather } from "@/lib/weather";
import { tokyoHour, computeAtmosphere } from "@/lib/atmosphere";
import { tokyoDate } from "@/lib/season";
import { getTonightSignal, getPulseHour } from "@/lib/tonightSignals";

export const dynamic = "force-dynamic";

export async function GET() {
  const weather    = await getTokyoWeather();
  const hour       = tokyoHour();
  const { period } = computeAtmosphere(hour, weather.condition, weather.feeling);

  const tokyo      = tokyoDate(Date.now());
  const dow        = tokyo.getUTCDay();
  const dayType    =
    dow === 5 ? "friday" :
    dow === 6 ? "saturday" :
    dow === 0 ? "sunday" : "weekday";

  const signal    = getTonightSignal(hour, weather.condition, period, dayType);
  const pulseHour = getPulseHour();

  return Response.json(
    { signal, hour, period, pulseHour },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
      },
    },
  );
}
