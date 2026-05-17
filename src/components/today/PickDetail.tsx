import type { DailyPickMeta } from "@/lib/dailyPicks";
import { moodMeta } from "@/lib/mapData";

interface PickDetailProps {
  pick: DailyPickMeta;
  typeLabel: string;
  title: string;
  hook: string;
  body: string;
  navigation?: string;
  atmosphere?: string;
  food?: string;
  bestTime?: string;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[9px] font-mono tracking-[0.25em] uppercase mb-3"
      style={{ color: "var(--color-muted)", opacity: 0.45 }}
    >
      {children}
    </p>
  );
}

function Divider({ moodColor }: { moodColor: string }) {
  return (
    <div
      className="my-10"
      style={{ height: "1px", background: `${moodColor}22` }}
    />
  );
}

export function PickDetail({
  pick,
  typeLabel,
  title,
  hook,
  body,
  navigation,
  atmosphere,
  food,
  bestTime,
}: PickDetailProps) {
  const mood = moodMeta[pick.mood];
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <article>

      {/* ── Hero image ──────────────────────────── */}
      <div
        className="w-full overflow-hidden rounded-sm mb-8"
        style={{ aspectRatio: "16/9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pick.imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.5) contrast(1.06) brightness(0.72)" }}
        />
      </div>

      {/* ── Header ──────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[9px] font-mono tracking-[0.2em] uppercase"
          style={{ color: mood.color }}
        >
          {typeLabel}
        </span>
        <span
          className="text-[9px] font-mono tracking-[0.08em]"
          style={{ color: "var(--color-muted)", opacity: 0.5 }}
        >
          {pick.neighborhood.toUpperCase()}
        </span>
      </div>

      <h1
        className="font-display text-3xl md:text-4xl font-light leading-tight mb-5"
        style={{ color: "var(--color-parchment)" }}
      >
        {title}
      </h1>

      <p
        className="text-sm md:text-base italic leading-relaxed mb-6"
        style={{ color: "var(--color-sand)", opacity: 0.9 }}
      >
        {hook}
      </p>

      <div className="w-8 mb-7" style={{ height: "1px", background: mood.color, opacity: 0.35 }} />

      {/* ── Body ───────────────────────────────── */}
      <div className="flex flex-col gap-4 mb-2">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* ── Time / Price ────────────────────────── */}
      {(pick.startTime || pick.price) && (
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          {pick.startTime && (
            <span
              className="text-[10px] font-mono tracking-[0.1em]"
              style={{ color: "var(--color-muted)", opacity: 0.7 }}
            >
              {pick.startTime}{pick.endTime ? ` – ${pick.endTime}` : ""}
            </span>
          )}
          {pick.price && (
            <span
              className="text-[10px] font-mono tracking-[0.08em] px-2 py-0.5 rounded-sm"
              style={{
                background: "rgba(201,169,110,0.1)",
                color: "#C9A96E",
                border: "1px solid rgba(201,169,110,0.2)",
              }}
            >
              {pick.price}
            </span>
          )}
        </div>
      )}

      <Divider moodColor={mood.color} />

      {/* ── Getting there ────────────────────────── */}
      <section className="mb-10">
        <SectionLabel>Getting there</SectionLabel>

        {/* Station chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(200,184,154,0.1)",
            }}
          >
            <span className="text-[9px]" style={{ color: "var(--color-muted)", opacity: 0.5 }}>
              STATION
            </span>
            <span
              className="text-[11px] font-mono"
              style={{ color: "var(--color-parchment)" }}
            >
              {pick.nearestStation}
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(200,184,154,0.1)",
            }}
          >
            <span className="text-[9px]" style={{ color: "var(--color-muted)", opacity: 0.5 }}>
              EXIT
            </span>
            <span
              className="text-[11px] font-mono"
              style={{ color: "var(--color-parchment)" }}
            >
              {pick.stationExit}
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(200,184,154,0.1)",
            }}
          >
            <span className="text-[9px]" style={{ color: "var(--color-muted)", opacity: 0.5 }}>
              WALK
            </span>
            <span
              className="text-[11px] font-mono"
              style={{ color: "var(--color-parchment)" }}
            >
              {pick.walkingMinutes} min
            </span>
          </div>
        </div>

        {navigation && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {navigation}
          </p>
        )}
      </section>

      {/* ── Atmosphere ───────────────────────────── */}
      {atmosphere && (
        <section className="mb-10">
          <SectionLabel>What it feels like</SectionLabel>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {atmosphere}
          </p>
        </section>
      )}

      {/* ── Food / Drinks ────────────────────────── */}
      {food && (
        <section className="mb-10">
          <SectionLabel>Worth trying</SectionLabel>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {food}
          </p>
        </section>
      )}

      {/* ── Best time ────────────────────────────── */}
      {bestTime && (
        <section className="mb-10">
          <SectionLabel>Best time to arrive</SectionLabel>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {bestTime}
          </p>
        </section>
      )}

      {/* ── Real-world links ─────────────────────── */}
      {(pick.officialUrl || pick.instagramUrl || pick.googleMapsUrl) && (
        <div
          className="rounded-sm px-5 py-5 mt-8 flex flex-col gap-3"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(200,184,154,0.07)",
          }}
        >
          <SectionLabel>Continue deeper</SectionLabel>

          {pick.googleMapsUrl && (
            <a
              href={pick.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[10px] font-mono tracking-[0.1em] transition-opacity hover:opacity-100 group"
              style={{ color: "var(--color-muted)", opacity: 0.7 }}
            >
              <span
                className="text-[8px] px-1.5 py-0.5 rounded-sm flex-shrink-0"
                style={{
                  background: "rgba(107,158,138,0.12)",
                  color: "#6B9E8A",
                  border: "1px solid rgba(107,158,138,0.2)",
                }}
              >
                MAPS
              </span>
              <span className="group-hover:underline truncate">{pick.neighborhood}</span>
              <span className="ml-auto flex-shrink-0">↗</span>
            </a>
          )}

          {pick.officialUrl && (
            <a
              href={pick.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[10px] font-mono tracking-[0.1em] transition-opacity hover:opacity-100 group"
              style={{ color: "var(--color-muted)", opacity: 0.7 }}
            >
              <span
                className="text-[8px] px-1.5 py-0.5 rounded-sm flex-shrink-0"
                style={{
                  background: "rgba(201,169,110,0.1)",
                  color: "#C9A96E",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                WEB
              </span>
              <span className="group-hover:underline truncate">{pick.officialUrl.replace(/^https?:\/\//, "")}</span>
              <span className="ml-auto flex-shrink-0">↗</span>
            </a>
          )}

          {pick.instagramUrl && (
            <a
              href={pick.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[10px] font-mono tracking-[0.1em] transition-opacity hover:opacity-100 group"
              style={{ color: "var(--color-muted)", opacity: 0.7 }}
            >
              <span
                className="text-[8px] px-1.5 py-0.5 rounded-sm flex-shrink-0"
                style={{
                  background: "rgba(123,141,179,0.1)",
                  color: "#7B8DB3",
                  border: "1px solid rgba(123,141,179,0.2)",
                }}
              >
                IG
              </span>
              <span className="group-hover:underline truncate">Instagram</span>
              <span className="ml-auto flex-shrink-0">↗</span>
            </a>
          )}
        </div>
      )}

    </article>
  );
}
