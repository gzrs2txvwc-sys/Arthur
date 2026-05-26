import Image from "next/image";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { AnchorMoment } from "@/components/ui/AnchorMoment";
import { DistrictTicker } from "@/components/ui/DistrictTicker";
import type { AtmospherePeriod } from "@/lib/atmosphere";
import type { WeatherCondition } from "@/lib/weather";
import type { OpeningPhoto } from "@/lib/openingPhoto";
import { PERIOD_PHOTO_FILTER, getConditionTint } from "@/lib/openingPhoto";
import type { TickerItem } from "@/lib/districtTicker";

const CITY_LABEL: Record<string, string> = {
  ja:      "東京",
  "zh-TW": "東京",
  ko:      "도쿄",
};

interface Props {
  timeStr:          string;
  weatherLabel:     string;
  weatherJp:        string;
  openingLine:      string;
  photo:            OpeningPhoto;
  period:           AtmospherePeriod;
  condition:        WeatherCondition;
  locale?:          string;
  hour:             number;
  walksCount:       number;
  placesCount:      number;
  tickerItems:      TickerItem[];
  tonightCharacter: string | null;
}

function heroAnchor(hour: number, condition: string, locale: string): string {
  const isLate    = hour >= 23 || hour < 4;
  const isEvening = hour >= 18 && hour < 23;
  const isMorning = hour >= 5  && hour < 10;
  const isRainy   = condition === "rainy" || condition === "foggy";
  const isSnowy   = condition === "snowy";

  if (locale === "ja") {
    if (isRainy)   return "雨の夜、東京は少し違う顔を見せる。";
    if (isSnowy)   return "雪の東京は静かで、でも確かにそこにいる。";
    if (isLate)    return "東京は、まだ眠っていない。";
    if (isEvening) return "東京の夜は、今夜も動いている。";
    if (isMorning) return "東京の朝は、まだ始まったばかり。";
    return "今夜の東京。";
  }
  if (locale === "zh-TW") {
    if (isRainy)   return "雨夜裡，東京顯現出另一面。";
    if (isSnowy)   return "雪中的東京，安靜但確實存在。";
    if (isLate)    return "東京還醒著。";
    if (isEvening) return "今晚的東京正在流動。";
    if (isMorning) return "東京的早晨，剛剛開始。";
    return "今晚的東京。";
  }
  if (locale === "ko") {
    if (isLate)  return "도쿄는 아직 깨어 있다.";
    if (isRainy) return "비가 오늘 밤 도쿄를 바꿔 놓았다.";
    return "오늘 밤의 도쿄.";
  }

  if (isRainy)   return "Rain changed the city tonight.";
  if (isSnowy)   return "Snow is falling somewhere in Tokyo.";
  if (isLate)    return "Tokyo is still awake.";
  if (isEvening) return "Tokyo is still going tonight.";
  if (isMorning) return "Tokyo is just getting started.";
  return "Somewhere in Tokyo tonight.";
}

function liveStrip(condition: string, walksCount: number, placesCount: number, locale: string): string {
  const isRainy = condition === "rainy" || condition === "foggy";

  if (locale === "ja") {
    return [
      `${placesCount} ヶ所のスポット`,
      isRainy ? `雨の散歩 ${walksCount} 本` : `散歩 ${walksCount} 本`,
    ].join("  ·  ");
  }
  if (locale === "zh-TW") {
    return [
      `${placesCount} 個地方`,
      isRainy ? `${walksCount} 條雨夜路線` : `${walksCount} 條路線`,
    ].join("  ·  ");
  }
  if (locale === "ko") {
    return `${placesCount}개 장소  ·  ${walksCount}개의 산책`;
  }

  return [
    `${placesCount} place${placesCount !== 1 ? "s" : ""} tonight`,
    isRainy
      ? `${walksCount} rain walk${walksCount !== 1 ? "s" : ""}`
      : `${walksCount} walk${walksCount !== 1 ? "s" : ""}`,
  ].join("  ·  ");
}

export function OpeningHero({
  timeStr, weatherLabel, weatherJp,
  openingLine, photo, period, condition,
  locale = "en", hour, walksCount, placesCount, tickerItems, tonightCharacter,
}: Props) {
  const photoFilter   = PERIOD_PHOTO_FILTER[period];
  const conditionTint = getConditionTint(condition);
  const cityLabel     = CITY_LABEL[locale] ?? "TOKYO";
  const anchor        = heroAnchor(hour, condition, locale);
  const strip         = liveStrip(condition, walksCount, placesCount, locale);

  return (
    <section
      className="relative flex flex-col justify-center md:justify-end overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      <style>{`
        .oph-time {
          font-size: clamp(4.5rem, 28vw, 8rem);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .oph-time { font-size: clamp(5rem, 16vw, 12rem); }
        }
        .oph-anchor {
          font-size: clamp(1rem, 3.6vw, 1.4rem);
          line-height: 1.4;
        }
        @media (min-width: 768px) {
          .oph-anchor { font-size: clamp(1.05rem, 2vw, 1.35rem); }
        }
        .oph-obs {
          font-size: 0.95rem;
          line-height: 1.85;
          max-width: min(30rem, 88vw);
        }
        @media (min-width: 768px) {
          .oph-obs {
            font-size: clamp(0.88rem, 1.35vw, 1rem);
            max-width: 30rem;
          }
        }
        @keyframes oph-pulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1;    }
        }
        .oph-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(220, 155, 40, 0.95);
          animation: oph-pulse 2.8s ease-in-out infinite;
          vertical-align: middle;
          margin-right: 7px;
          margin-bottom: 1.5px;
          flex-shrink: 0;
        }
      `}</style>

      {/* Background photo */}
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

      {/* Film grain */}
      <FilmGrain opacity={0.048} className="z-10 pointer-events-none" />

      {/* Top vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(10,5,0,0.26) 0%, transparent 32%)" }}
      />

      {/* Bottom gradient — warm amber-black, less crushing than before */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(14,7,0,0.88) 0%, rgba(12,5,0,0.64) 20%, rgba(8,3,0,0.24) 46%, transparent 68%)",
        }}
      />

      {/* Mobile center overlay — lighter and warmer than before */}
      <div
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{ background: "rgba(10,5,0,0.18)" }}
      />

      {/* Condition tint */}
      {conditionTint && (
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: conditionTint }} />
      )}

      {/* 間 watermark */}
      <span
        aria-hidden="true"
        className="absolute z-10 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display, serif)",
          fontSize: "clamp(20rem, 48vw, 44rem)",
          color: "white",
          opacity: 0.022,
          lineHeight: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -48%)",
        }}
      >
        間
      </span>

      {/* Content block */}
      <div
        className="
          relative z-20 w-full max-w-screen-xl mx-auto
          px-8 md:px-16
          pb-10 md:pb-24
          flex flex-col items-center text-center
          md:items-start md:text-left
        "
      >
        {/* Time */}
        <div className="animate-fade-up">
          <span
            className="font-mono block oph-time"
            style={{ color: "var(--color-parchment)", opacity: 1 }}
          >
            {timeStr}
          </span>
        </div>

        {/* Anchor tagline — "Tokyo is still awake." */}
        <div className="mt-3 mb-5 md:mt-4 md:mb-7 animate-fade-up delay-75">
          <p
            className="font-display font-light oph-anchor"
            style={{
              color: "var(--color-parchment)",
              opacity: 0.92,
              letterSpacing: "0.01em",
              fontStyle: "italic",
            }}
          >
            {anchor}
          </p>
        </div>

        {/* Weather kanji · label · city */}
        <div className="mb-4 md:mb-5 animate-fade-up delay-100">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "var(--color-sand)",
              opacity: 0.58,
            }}
          >
            {weatherJp && <>{weatherJp}&ensp;</>}
            {weatherLabel ? `${weatherLabel.toUpperCase()}  ·  ` : ""}{cityLabel}
          </span>
        </div>

        {/* Opening line — cinematic, secondary to anchor */}
        <p
          className="font-display font-light animate-fade-up delay-150 oph-obs"
          style={{ color: "var(--color-parchment)", opacity: 0.72 }}
        >
          {openingLine}
        </p>

        {/* Tonight character — city taking its own temperature */}
        {tonightCharacter && (
          <p
            className="font-mono animate-fade-up"
            style={{
              marginTop: "14px",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(210,178,120,0.60)",
              animationDelay: "0.42s",
              animationFillMode: "backwards",
              maxWidth: "min(30rem, 88vw)",
            }}
          >
            {tonightCharacter}
          </p>
        )}

        {/* Live strip — "● Signal surfaced tonight · 3 walks tonight" */}
        <div
          className="mt-6 md:mt-7 animate-fade-up flex items-center"
          style={{ animationDelay: "0.55s", animationFillMode: "backwards" }}
        >
          <span className="oph-dot" aria-hidden="true" />
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              color: "rgba(220,155,40,0.72)",
            }}
          >
            {strip}
          </span>
        </div>

        {/* District ticker — city scanning itself */}
        {tickerItems.length > 0 && (
          <div
            className="mt-5 animate-fade-up w-full md:w-[min(480px,80vw)]"
            style={{ animationDelay: "0.8s", animationFillMode: "backwards" }}
          >
            <DistrictTicker items={tickerItems} />
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 inset-x-0 flex justify-center z-20 animate-fade-up"
        style={{ animationDelay: "2.6s", animationFillMode: "backwards" }}
      >
        <div
          style={{
            width: "1px",
            height: "36px",
            background: "rgba(220,184,140,0.22)",
          }}
        />
      </div>

      <AnchorMoment />
    </section>
  );
}
