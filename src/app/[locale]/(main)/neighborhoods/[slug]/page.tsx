import { notFound } from "next/navigation";
import Link from "next/link";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { WorldBridge } from "@/components/ui/WorldBridge";
import { NeighborhoodTracker } from "@/components/neighborhoods/NeighborhoodTracker";
import { NeighborhoodPlaces } from "@/components/neighborhoods/NeighborhoodPlaces";
import { getTokyoWeather } from "@/lib/weather";
import { tokyoHour, computeAtmosphere } from "@/lib/atmosphere";
import { tokyoDate } from "@/lib/season";
import { getLocaleGroup } from "@/lib/tonightSignals";
import {
  getNeighborhoodById,
  getAllNeighborhoodIds,
  getNeighborhoodName,
  getNeighborhoodForWhom,
  getNeighborhoodLongCharacter,
  getNeighborhoodMoment,
  getNeighborhoodSignalText,
} from "@/lib/tokyoNeighborhoods";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllNeighborhoodIds().map((id) => ({ slug: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const n = getNeighborhoodById(slug);
  if (!n) return {};
  const g = getLocaleGroup(locale);
  return {
    title: getNeighborhoodName(n, g),
    description:
      g === "ja" ? n.longCharacterJa
      : g === "zh" ? n.longCharacterZh
      : n.longCharacterEn,
  };
}

// Neighborhood-specific ambient glow — each area has its own light character
const NEIGHBORHOOD_GLOW: Record<string, string> = {
  nakameguro:          "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(140,65,130,0.09) 0%, rgba(100,48,105,0.04) 52%, transparent 80%)",
  daikanyama:          "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(195,118,25,0.10) 0%, rgba(165,88,12,0.04) 52%, transparent 80%)",
  "kiyosumi-shirakawa":"radial-gradient(ellipse 70% 50% at 50% 30%, rgba(52,78,125,0.09) 0%, rgba(38,58,102,0.04) 52%, transparent 80%)",
  shimokitazawa:       "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(108,152,52,0.08) 0%, rgba(80,120,38,0.03) 52%, transparent 80%)",
  yanaka:              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(200,130,42,0.09) 0%, rgba(175,105,28,0.04) 52%, transparent 80%)",
  aoyama:              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(92,115,185,0.08) 0%, rgba(68,90,160,0.03) 52%, transparent 80%)",
  koenji:              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(190,112,22,0.09) 0%, rgba(160,85,15,0.04) 52%, transparent 80%)",
  sangenjaya:          "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(192,132,28,0.10) 0%, rgba(165,105,18,0.04) 52%, transparent 80%)",
  "nishi-ogikubo":     "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(185,122,52,0.08) 0%, rgba(155,98,38,0.04) 52%, transparent 80%)",
  kagurazaka:          "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(195,122,42,0.09) 0%, rgba(168,95,28,0.04) 52%, transparent 80%)",
  gakugeidaigaku:      "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(188,112,46,0.08) 0%, rgba(158,88,32,0.03) 52%, transparent 80%)",
};

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const n = getNeighborhoodById(slug);
  if (!n) notFound();

  const g = getLocaleGroup(locale);
  const weather = await getTokyoWeather();
  const hour = tokyoHour();
  const { period } = computeAtmosphere(hour, weather.condition, weather.feeling);

  const tokyo = tokyoDate(Date.now());
  const dayOfWeek = tokyo.getUTCDay();
  const dayType =
    dayOfWeek === 5 ? "friday" :
    dayOfWeek === 6 ? "saturday" :
    dayOfWeek === 0 ? "sunday" : "weekday";

  const name          = getNeighborhoodName(n, g);
  const forWhom       = getNeighborhoodForWhom(n, g);
  const longCharacter = getNeighborhoodLongCharacter(n, g);
  const signalText    = getNeighborhoodSignalText(n, period, weather.condition, dayType, g);

  const backLabel = g === "ja" ? "← 戻る" : g === "zh" ? "← 返回" : "← Back";

  const neighborhoodGlow = NEIGHBORHOOD_GLOW[slug] ?? NEIGHBORHOOD_GLOW["koenji"];

  return (
    <div className="min-h-screen" style={{ background: "#0d0906" }}>
      {/* Fixed edge vignette — deeper darkness at the periphery, city-room feel */}
      <div className="page-vignette" aria-hidden="true" />
      {/* Neighborhood-specific ambient glow — each area has its own light temperature */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ background: neighborhoodGlow, zIndex: 0 }}
      />
      <FilmGrain opacity={0.055} className="z-[2] pointer-events-none" />
      <NeighborhoodTracker slug={slug} />

      {/* ── Cinematic header ─────────────────────────── */}
      <div className="relative z-[3] overflow-hidden" style={{ height: "clamp(300px, 50vh, 560px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${n.imageUrl}`}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: n.imageFilter }}
        />
        {/* Warm haze overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(8, 6, 4, 0.22)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 100%, transparent) 0%, color-mix(in srgb, var(--color-ink) 40%, transparent) 35%, transparent 65%)",
          }}
        />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-6">
          <Link
            href={`${locale === "en" ? "" : `/${locale}`}/`}
            className="font-mono transition-opacity hover:opacity-100"
            style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(200,184,154,0.55)" }}
          >
            {backLabel}
          </Link>
        </div>

        {/* Name + signal */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10">
          <p
            className="font-mono mb-4"
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              color: "rgba(210,152,38,0.82)",
            }}
          >
            {signalText}
          </p>
          <h1
            className="font-display font-light leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              color: "var(--color-parchment)",
              letterSpacing: "-0.01em",
            }}
          >
            {name}
          </h1>
          {g === "en" && (
            <p
              className="mt-1"
              style={{ fontSize: "13px", color: "rgba(200,178,138,0.60)" }}
            >
              {n.nameJa}
            </p>
          )}

          {/* For whom — identity framing, the new product core */}
          <p
            className="mt-4"
            style={{
              fontSize: "13px",
              color: "rgba(222,208,180,0.74)",
              fontStyle: "italic",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            {forWhom}
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="content-atmos max-w-xl mx-auto px-6 md:px-8 pt-14 pb-28 relative z-[3]">

        {/* Long character */}
        <p
          className="leading-loose mb-14"
          style={{
            fontSize: "15px",
            color: "rgba(222,210,182,0.88)",
            lineHeight: 1.9,
          }}
        >
          {longCharacter}
        </p>

        {/* Seam */}
        <div
          className="mb-12"
          style={{
            height: "1px",
            background: "linear-gradient(to right, rgba(200,148,40,0.20), transparent)",
          }}
        />

        {/* Moments */}
        <div className="mb-14">
          <p
            className="font-mono mb-8"
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              color: "rgba(210,152,38,0.65)",
              textTransform: "uppercase",
            }}
          >
            {g === "ja" ? "この街で起きること" : g === "zh" ? "在這裡發生的事" : "WHAT HAPPENS HERE"}
          </p>

          <div className="flex flex-col gap-0">
            {n.moments.map((moment, i) => (
              <div
                key={i}
                className="py-6"
                style={{ borderTop: "1px solid rgba(200,155,65,0.12)" }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(222,208,180,0.84)",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  {getNeighborhoodMoment(moment, g)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seam */}
        <div
          className="mb-12"
          style={{
            height: "1px",
            background: "linear-gradient(to right, rgba(200,155,65,0.16), transparent)",
          }}
        />

        {/* Places */}
        <NeighborhoodPlaces neighborhoodId={slug} period={period} locale={locale} />

        {/* Seam */}
        <div
          className="mb-12"
          style={{
            height: "1px",
            background: "linear-gradient(to right, rgba(200,155,65,0.12), transparent)",
          }}
        />

        {/* World bridge */}
        <WorldBridge exclude="living" locale={locale} />
      </div>
    </div>
  );
}
