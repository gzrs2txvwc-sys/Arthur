import Image from "next/image";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { AnchorMoment } from "@/components/ui/AnchorMoment";
import type { AtmospherePeriod } from "@/lib/atmosphere";
import type { WeatherCondition } from "@/lib/weather";
import type { OpeningPhoto } from "@/lib/openingPhoto";
import { PERIOD_PHOTO_FILTER, getConditionTint } from "@/lib/openingPhoto";

interface Props {
  timeStr:      string;
  weatherLabel: string;
  weatherJp:    string;
  openingLine:  string;
  photo:        OpeningPhoto;
  period:       AtmospherePeriod;
  condition:    WeatherCondition;
}

// Server component — all cinematic logic computable at render time.
export function OpeningHero({
  timeStr, weatherLabel, weatherJp,
  openingLine, photo, period, condition,
}: Props) {
  const photoFilter    = PERIOD_PHOTO_FILTER[period];
  const conditionTint  = getConditionTint(condition);

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      // 100svh = viewport-aware height (excludes browser chrome on mobile)
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Background photo ── cinematic, heavily desaturated */}
      <Image
        src={`https://images.unsplash.com/${photo.id}?w=2400&q=80&fit=crop`}
        alt={photo.alt}
        fill
        priority
        className="object-cover"
        style={{
          filter: photoFilter,
          objectPosition: photo.objectPosition ?? "center",
        }}
      />

      {/* ── Film grain over photo ─────────────────────────────── */}
      <FilmGrain opacity={0.055} className="z-10 pointer-events-none" />

      {/* ── Top vignette — cinematic framing ───────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 38%)" }}
      />

      {/* ── Bottom gradient — text legibility zone ─────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.74) 16%, rgba(0,0,0,0.36) 40%, transparent 65%)" }}
      />

      {/* ── Weather/condition tint ──────────────────────────────── */}
      {conditionTint && (
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: conditionTint }} />
      )}

      {/* ── 間 — barely-there watermark over the photo ────────── */}
      <span
        aria-hidden="true"
        className="absolute z-10 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display, serif)",
          fontSize: "clamp(20rem, 48vw, 44rem)",
          color: "white",
          opacity: 0.025,
          lineHeight: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -48%)",
        }}
      >
        間
      </span>

      {/* ── Main content — lives at the bottom ────────────────── */}
      <div className="relative z-20 w-full max-w-screen-xl mx-auto px-8 md:px-16 pb-16 md:pb-24">

        {/* Time — monumental, film-clock */}
        <div className="animate-fade-up">
          <span
            className="font-mono block"
            style={{
              fontSize: "clamp(5rem, 16vw, 12rem)",
              color: "var(--color-parchment)",
              opacity: 0.93,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {timeStr}
          </span>
        </div>

        {/* Weather kanji + label + city — bilingual micro-label */}
        <div className="mt-5 mb-9 md:mb-10 animate-fade-up delay-75">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "var(--color-sand)",
              opacity: 0.42,
            }}
          >
            {weatherJp && <>{weatherJp}&ensp;</>}
            {weatherLabel ? `${weatherLabel.toUpperCase()}  ·  ` : ""}TOKYO
          </span>
        </div>

        {/* Observation — Cormorant Garamond, light, generous breathing */}
        <p
          className="font-display font-light animate-fade-up delay-150"
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            color: "var(--color-parchment)",
            opacity: 0.68,
            maxWidth: "33rem",
            lineHeight: 1.9,
          }}
        >
          {openingLine}
        </p>
      </div>

      {/* ── Scroll hint — single descending line ──────────────── */}
      <div
        className="absolute bottom-8 inset-x-0 flex justify-center z-20 animate-fade-up"
        style={{ animationDelay: "2.4s", animationFillMode: "backwards" }}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "var(--color-parchment)",
            opacity: 0.14,
          }}
        />
      </div>

      {/* Anchor moment — one-time question on session 2+ */}
      <AnchorMoment />
    </section>
  );
}
