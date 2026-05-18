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

// Server component — all cinematic values computable at render time.
export function OpeningHero({
  timeStr, weatherLabel, weatherJp,
  openingLine, photo, period, condition,
}: Props) {
  const photoFilter   = PERIOD_PHOTO_FILTER[period];
  const conditionTint = getConditionTint(condition);

  return (
    <section
      // Mobile: content centered. Desktop: content anchored at bottom.
      className="relative flex flex-col justify-center md:justify-end overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Responsive font sizes injected as scoped CSS — avoids large inline-style duplication */}
      <style>{`
        .oph-time {
          font-size: clamp(4.5rem, 28vw, 8rem);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .oph-time { font-size: clamp(5rem, 16vw, 12rem); }
        }
        .oph-obs {
          font-size: 1.05rem;
          line-height: 1.9;
          max-width: min(33rem, 90vw);
        }
        @media (min-width: 768px) {
          .oph-obs {
            font-size: clamp(0.95rem, 1.5vw, 1.1rem);
            max-width: 33rem;
          }
        }
      `}</style>

      {/* ── Background photo ── cinematic, period-filtered */}
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

      {/* ── Film grain directly over photo ─────────────────────── */}
      <FilmGrain opacity={0.055} className="z-10 pointer-events-none" />

      {/* ── Top vignette — cinematic framing ───────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 38%)" }}
      />

      {/* ── Bottom gradient — anchors desktop text at bottom ────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.74) 16%, rgba(0,0,0,0.36) 40%, transparent 65%)" }}
      />

      {/* ── Mobile center overlay — ensures centered text is always legible
           regardless of what the photo shows at the vertical midpoint ─── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{ background: "rgba(0,0,0,0.38)" }}
      />

      {/* ── Condition tint ───────────────────────────────────────── */}
      {conditionTint && (
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: conditionTint }} />
      )}

      {/* ── 間 — barely-visible watermark over the photo ─────────── */}
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

      {/* ── Content block ─────────────────────────────────────────
           Mobile:  centered horizontally and vertically, text-center
           Desktop: left-aligned, pinned to bottom via justify-end   */}
      <div
        className="
          relative z-20 w-full max-w-screen-xl mx-auto
          px-8 md:px-16
          pb-8 md:pb-24
          flex flex-col items-center text-center
          md:items-start md:text-left
        "
      >
        {/* Time — dominant, film-clock weight */}
        <div className="animate-fade-up">
          <span
            className="font-mono block oph-time"
            style={{ color: "var(--color-parchment)", opacity: 0.93 }}
          >
            {timeStr}
          </span>
        </div>

        {/* Weather kanji + English label + city — bilingual micro-detail */}
        <div className="mt-4 mb-6 md:mt-5 md:mb-9 animate-fade-up delay-75">
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

        {/* Observation — Cormorant Garamond, light weight, generous leading */}
        <p
          className="font-display font-light animate-fade-up delay-150 oph-obs"
          style={{ color: "var(--color-parchment)", opacity: 0.68 }}
        >
          {openingLine}
        </p>
      </div>

      {/* ── Scroll hint — always at bottom regardless of layout ────── */}
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

      {/* Anchor moment — one-time question, session 2+ */}
      <AnchorMoment />
    </section>
  );
}
