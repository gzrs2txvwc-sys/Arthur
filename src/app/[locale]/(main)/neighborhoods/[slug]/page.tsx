import { notFound } from "next/navigation";
import Link from "next/link";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { WorldBridge } from "@/components/ui/WorldBridge";
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

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <FilmGrain opacity={0.038} className="z-0 pointer-events-none" />

      {/* ── Cinematic header ─────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "clamp(300px, 50vh, 560px)" }}>
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
              style={{ fontSize: "13px", color: "rgba(200,184,154,0.45)" }}
            >
              {n.nameJa}
            </p>
          )}

          {/* For whom — identity framing, the new product core */}
          <p
            className="mt-4"
            style={{
              fontSize: "13px",
              color: "rgba(220,205,182,0.60)",
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
      <div className="max-w-xl mx-auto px-6 md:px-8 pt-14 pb-28">

        {/* Long character */}
        <p
          className="leading-loose mb-14"
          style={{
            fontSize: "15px",
            color: "rgba(220,205,182,0.80)",
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
                style={{ borderTop: "1px solid rgba(200,184,154,0.06)" }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(220,205,182,0.72)",
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
            background: "linear-gradient(to right, rgba(200,184,154,0.08), transparent)",
          }}
        />

        {/* World bridge */}
        <WorldBridge exclude="living" locale={locale} />
      </div>
    </div>
  );
}
