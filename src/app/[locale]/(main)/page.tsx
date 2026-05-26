import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { DailyNudge } from "@/components/ui/DailyNudge";
import { QuietPresence } from "@/components/ui/QuietPresence";
import { TokyoWalksWidget } from "@/components/walks/TokyoWalksWidget";
import { NeighborhoodsByTaste } from "@/components/neighborhoods/NeighborhoodsByTaste";
import { OpeningHero } from "@/components/ui/OpeningHero";
import { HomepagePortals } from "@/components/ui/HomepagePortals";
import type { PortalData } from "@/components/ui/HomepagePortals";
import { TonightSignalFloat } from "@/components/tonight/TonightSignalFloat";
import { TokyoMemorySync } from "@/components/TokyoMemorySync";
import { TokyoIdentitySignal } from "@/components/ui/TokyoIdentitySignal";
import { AnchorPrompt } from "@/components/ui/AnchorPrompt";
import { WeekNote } from "@/components/ui/WeekNote";
import { TonightSection } from "@/components/ui/TonightSection";
import { getTokyoWeather } from "@/lib/weather";
import { tokyoHour, tokyoTimeString, computeAtmosphere } from "@/lib/atmosphere";
import { getOpeningLine } from "@/lib/openingLine";
import { getOpeningPhoto, WEATHER_JP } from "@/lib/openingPhoto";
import { getTonightSignal } from "@/lib/tonightSignals";
import { tokyoDate, getDayType } from "@/lib/season";
import { getActiveWalks } from "@/lib/tokyoWalks";
import { getTonightsPlaces, getActivePlacesCount } from "@/lib/tokyoPlaces";
import { getBecomingStatement, shouldShowIdentity } from "@/lib/tokyoTaste";
import { getTickerNotes } from "@/lib/districtTicker";
import { getTonightCharacter } from "@/lib/tonightCharacter";
import { parseCookieProfile } from "@/lib/tokyoMemory";
import { getLocaleGroup } from "@/lib/tonightSignals";

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

  // Behavioral memory — read on server, used to subtly influence content selection
  const cookieJar     = await cookies();
  const memoryProfile = parseCookieProfile(cookieJar.get("arthur_b")?.value);

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
  const tonightSignal    = getTonightSignal(hour, weather.condition, period, signalDayType);
  const activeWalks    = getActiveWalks(period, weather.condition, signalDayType, hour, memoryProfile);
  const tonightsPlaces = getTonightsPlaces(period, 3);
  const placesCount    = getActivePlacesCount(period);
  const localeGroup    = getLocaleGroup(locale);
  const identityStatement   = shouldShowIdentity(memoryProfile)
    ? getBecomingStatement(memoryProfile, localeGroup)
    : null;
  const tickerItems      = getTickerNotes(period, weather.condition, signalDayType, locale);
  const tonightCharacter = getTonightCharacter(hour, weather.condition, period, signalDayType, locale, memoryProfile);

  const portals: PortalData[] = [
    {
      numeral:     t("worlds.tonight.numeral"),
      title:       t("worlds.tonight.title"),
      tagline:     t("worlds.tonight.tagline"),
      enterLabel:  t("worlds.tonight.enter"),
      href:        `${prefix}/today`,
      imageUrl:    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=75",
      imageFilter: "saturate(0.42) brightness(0.42) contrast(1.08)",
      tint:        "rgba(18, 28, 52, 0.18)",
      accentColor: "#7B8DB3",
    },
    {
      numeral:     t("worlds.wander.numeral"),
      title:       t("worlds.wander.title"),
      tagline:     t("worlds.wander.tagline"),
      enterLabel:  t("worlds.wander.enter"),
      href:        `${prefix}/map`,
      imageUrl:    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=75",
      imageFilter: "saturate(0.55) brightness(0.46) contrast(1.03)",
      tint:        "rgba(14, 32, 22, 0.14)",
      accentColor: "#7A9E7E",
    },
    {
      numeral:     t("worlds.stories.numeral"),
      title:       t("worlds.stories.title"),
      tagline:     t("worlds.stories.tagline"),
      enterLabel:  t("worlds.stories.enter"),
      href:        `${prefix}/moments`,
      imageUrl:    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=75",
      imageFilter: "saturate(0.40) brightness(0.44) contrast(1.06) sepia(0.16)",
      tint:        "rgba(48, 32, 12, 0.16)",
      accentColor: "#C9A96E",
    },
    {
      numeral:     t("worlds.living.numeral"),
      title:       t("worlds.living.title"),
      tagline:     t("worlds.living.tagline"),
      enterLabel:  t("worlds.living.enter"),
      href:        `${prefix}/living`,
      imageUrl:    "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=75",
      imageFilter: "saturate(0.60) brightness(0.52) contrast(1.02)",
      tint:        "rgba(12, 18, 38, 0.10)",
      accentColor: "#A8B5A0",
    },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: "#100c07" }}>
      {/* Persistent warm city-sky glow — ambient ray breathes across the full page */}
      <div className="ambient-ray" aria-hidden="true" />

      {/* Page-level grain */}
      <FilmGrain opacity={0.036} className="z-[1] pointer-events-none" />

      {/* Memory sync — updates visit history + cookie on each mount (client-only) */}
      <TokyoMemorySync hour={hour} />

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
        hour={hour}
        walksCount={activeWalks.length}
        placesCount={placesCount}
        tickerItems={tickerItems}
        tonightCharacter={tonightCharacter}
      />

      {/* Warm seam — konbini / station light bleeding between hero and tonight section */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent 6%, rgba(180,105,20,0.26) 32%, rgba(195,120,28,0.32) 50%, rgba(180,105,20,0.26) 68%, transparent 94%)",
        }}
      />

      {/* ── TONIGHT — product statement + places, high on page ── */}
      <TonightSection places={tonightsPlaces} condition={weather.condition} locale={locale} />

      <div className="section-seam mx-8 md:mx-16" />

      {/* ── World Portals — revealed below the live content ── */}
      <HomepagePortals portals={portals} />

      {/* ── Lower page — text sections in a warm ambient field ── */}
      <div className="relative">
        {/* Warm spill from above */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(165,88,12,0.072) 0%, transparent 58%)",
          }}
        />

        {/* ── Identity signal — quiet "you're becoming" for returning users ── */}
        {identityStatement && (
          <div className="pt-16 pb-0">
            <TokyoIdentitySignal statement={identityStatement} />
          </div>
        )}

        {/* ── Week note — long-stay time marker ── */}
        <div className={`${identityStatement ? "pt-4" : "pt-16"} pb-0 flex justify-center px-6`}>
          <WeekNote />
        </div>

        {/* ── Anchor question — where are you in Tokyo? ── */}
        <div className="pt-10 pb-0">
          <AnchorPrompt />
        </div>

        {/* ── Daily nudge — chapter-aware ── */}
        <div className={`${identityStatement ? "pt-8" : "pt-10"} pb-14 flex justify-center px-6`}>
          <DailyNudge period={period} condition={weather.condition} />
        </div>

        <div className="section-seam mx-8 md:mx-16" />

        {/* ── Find Your Tokyo — neighborhoods grouped by taste identity ── */}
        <div className="pt-14">
          <NeighborhoodsByTaste locale={locale} />
        </div>

        <div className="section-seam mx-8 md:mx-16" />

        {/* ── Tokyo walks — tonight's routes ── */}
        <div className="pt-14 pb-16 flex justify-center px-6">
          <TokyoWalksWidget
            walks={activeWalks}
            condition={weather.condition}
            period={period}
          />
        </div>

        <div className="section-seam mx-8 md:mx-16" />

        {/* ── Quiet presence — small evidence other people are here too ── */}
        <div className="pt-14 pb-28 flex justify-center px-6">
          <QuietPresence />
        </div>

        {/* iPhone home indicator safe area */}
        <div aria-hidden="true" style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>

      {/* ── Tonight signal — floats in after portals, bottom-left ── */}
      <TonightSignalFloat signal={tonightSignal} />
    </div>
  );
}
