import { getTranslations } from "next-intl/server";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { DailyNudge } from "@/components/ui/DailyNudge";
import { OpeningHero } from "@/components/ui/OpeningHero";
import { HomepagePortals } from "@/components/ui/HomepagePortals";
import type { PortalData } from "@/components/ui/HomepagePortals";
import { TonightSignalFloat } from "@/components/tonight/TonightSignalFloat";
import { getTokyoWeather } from "@/lib/weather";
import { tokyoHour, tokyoTimeString, computeAtmosphere } from "@/lib/atmosphere";
import { getOpeningLine } from "@/lib/openingLine";
import { getOpeningPhoto, WEATHER_JP } from "@/lib/openingPhoto";
import { getTonightSignal } from "@/lib/tonightSignals";
import { tokyoDate, getDayType } from "@/lib/season";

const WEATHER_LABEL: Partial<Record<string, string>> = {
  clear:    "Clear",
  sunny:    "Clear",
  cloudy:   "Cloudy",
  overcast: "Overcast",
  rainy:    "Rain",
  foggy:    "Fog",
  snowy:    "Snow",
  cold:     "Cold",
  humid:    "Humid",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const weather      = await getTokyoWeather();
  const hour         = tokyoHour();
  const timeStr      = tokyoTimeString();
  const { period }   = computeAtmosphere(hour, weather.condition, weather.feeling);
  const openingLine  = getOpeningLine(period, weather.condition, locale);
  const photo        = getOpeningPhoto(period, weather.condition);
  const weatherLabel = WEATHER_LABEL[weather.condition] ?? "";
  const weatherJp    = WEATHER_JP[weather.condition] ?? "";

  const tokyo    = tokyoDate(Date.now());
  const dayOfWeek = tokyo.getUTCDay();
  const signalDayType =
    dayOfWeek === 5 ? "friday" :
    dayOfWeek === 6 ? "saturday" :
    dayOfWeek === 0 ? "sunday" : "weekday";
  const tonightSignal = getTonightSignal(hour, weather.condition, period, signalDayType);

  const portals: PortalData[] = [
    {
      numeral:     t("worlds.tonight.numeral"),
      title:       t("worlds.tonight.title"),
      tagline:     t("worlds.tonight.tagline"),
      enterLabel:  t("worlds.tonight.enter"),
      href:        `${prefix}/today`,
      imageUrl:    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=75",
      imageFilter: "saturate(0.28) brightness(0.22) contrast(1.2)",
      tint:        "rgba(18, 28, 52, 0.28)",
      accentColor: "#7B8DB3",
    },
    {
      numeral:     t("worlds.wander.numeral"),
      title:       t("worlds.wander.title"),
      tagline:     t("worlds.wander.tagline"),
      enterLabel:  t("worlds.wander.enter"),
      href:        `${prefix}/map`,
      imageUrl:    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=75",
      imageFilter: "saturate(0.48) brightness(0.3) contrast(1.06)",
      tint:        "rgba(14, 32, 22, 0.18)",
      accentColor: "#7A9E7E",
    },
    {
      numeral:     t("worlds.stories.numeral"),
      title:       t("worlds.stories.title"),
      tagline:     t("worlds.stories.tagline"),
      enterLabel:  t("worlds.stories.enter"),
      href:        `${prefix}/moments`,
      imageUrl:    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=75",
      imageFilter: "saturate(0.22) brightness(0.24) contrast(1.14) sepia(0.3)",
      tint:        "rgba(48, 32, 12, 0.22)",
      accentColor: "#C9A96E",
    },
    {
      numeral:     t("worlds.living.numeral"),
      title:       t("worlds.living.title"),
      tagline:     t("worlds.living.tagline"),
      enterLabel:  t("worlds.living.enter"),
      href:        `${prefix}/living`,
      imageUrl:    "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=75",
      imageFilter: "saturate(0.52) brightness(0.34) contrast(1.04)",
      tint:        "rgba(12, 18, 38, 0.14)",
      accentColor: "#A8B5A0",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      {/* Page-level grain — also applies beneath the hero overlay */}
      <FilmGrain opacity={0.032} className="z-0 pointer-events-none" />

      {/* ── Cinematic opening — full viewport, photo background ── */}
      <OpeningHero
        timeStr={timeStr}
        weatherLabel={weatherLabel}
        weatherJp={weatherJp}
        openingLine={openingLine}
        photo={photo}
        period={period}
        condition={weather.condition}
        locale={locale}
      />

      {/* ── World Portals — revealed after 3.5s, just below fold ── */}
      <HomepagePortals portals={portals} />

      {/* ── Daily nudge — chapter-aware, scrolled to ──── */}
      <div className="py-16 flex justify-center px-6">
        <DailyNudge period={period} condition={weather.condition} />
      </div>

      {/* ── Tonight signal — floats in after portals, bottom-left ── */}
      <TonightSignalFloat signal={tonightSignal} />
    </div>
  );
}
