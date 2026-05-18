import { getTranslations } from "next-intl/server";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { DailyNudge } from "@/components/ui/DailyNudge";
import { AnchorMoment } from "@/components/ui/AnchorMoment";
import { HomepagePortals } from "@/components/ui/HomepagePortals";
import type { PortalData } from "@/components/ui/HomepagePortals";
import { getTokyoWeather } from "@/lib/weather";
import { tokyoHour, tokyoTimeString, computeAtmosphere } from "@/lib/atmosphere";
import { getOpeningLine } from "@/lib/openingLine";

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

  const weather     = await getTokyoWeather();
  const hour        = tokyoHour();
  const timeStr     = tokyoTimeString();
  const { period }  = computeAtmosphere(hour, weather.condition, weather.feeling);
  const openingLine = getOpeningLine(period, weather.condition);
  const weatherLabel = WEATHER_LABEL[weather.condition] ?? "";

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
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      {/* ── Opening moment ────────────────────────────────────────────────────
          First 3-5 seconds. Almost empty. Time, weather, one observation.
          Portals are in the DOM below but hidden — they surface after a delay. */}
      <div
        className="relative flex flex-col items-center justify-center pt-40 pb-32 px-6 text-center overflow-hidden"
        style={{ minHeight: "30rem" }}
      >
        {/* 間 — ambient watermark */}
        <span
          className="font-display font-light select-none pointer-events-none absolute"
          style={{
            fontSize: "clamp(10rem, 28vw, 22rem)",
            color: "var(--color-sand)",
            opacity: 0.04,
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -40%)",
          }}
          aria-hidden="true"
        >
          間
        </span>

        {/* Tokyo time + weather — very quiet, anchors the moment in reality */}
        <div className="relative animate-fade-up">
          <span
            className="font-mono"
            style={{ fontSize: "10px", letterSpacing: "0.24em", color: "var(--color-muted)", opacity: 0.3 }}
          >
            {timeStr}{weatherLabel ? `  ·  ${weatherLabel}` : ""}
          </span>
        </div>

        {/* Observation — one real thought about Tokyo right now */}
        <p
          className="relative mt-6 leading-relaxed max-w-[18rem] animate-fade-up delay-100"
          style={{
            color: "var(--color-parchment)",
            opacity: 0.7,
            fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
          }}
        >
          {openingLine}
        </p>

        {/* Anchor moment — surfaces quietly on second session */}
        <AnchorMoment />
      </div>

      {/* ── World Portals — fade in after opening moment has had its moment */}
      <HomepagePortals portals={portals} />

      {/* ── Daily nudge — chapter-aware, scrolled to ──── */}
      <div className="py-16 flex justify-center px-6">
        <DailyNudge period={period} condition={weather.condition} />
      </div>
    </div>
  );
}
