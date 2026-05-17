import { getTranslations } from "next-intl/server";
import { getEventsForDay, groupEventsByPeriod, getAfterWorkEvent } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { AfterWorkBanner } from "@/components/events/AfterWorkBanner";
import { FilmGrain } from "@/components/ui/FilmGrain";
import Link from "next/link";

const PERIOD_LABELS = {
  morning:   { en: "Morning",   range: "Before noon" },
  afternoon: { en: "Afternoon", range: "12:00 – 17:00" },
  evening:   { en: "Evening",   range: "After 17:00" },
} as const;

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const;

export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale unused for now — events are in English only
  const t = await getTranslations("today");

  // Compute Tokyo local day (UTC+9)
  const nowUtcMs = Date.now();
  const tokyoMs = nowUtcMs + 9 * 60 * 60 * 1000;
  const tokyoDate = new Date(tokyoMs);
  const dayIndex = tokyoDate.getUTCDay(); // 0=Sun
  const dayName = DAY_NAMES[dayIndex];

  const todayEvents = getEventsForDay(dayIndex, "tokyo");
  const groups = groupEventsByPeriod(todayEvents);
  const afterWork = getAfterWorkEvent(todayEvents);

  const periodKeys = ["morning", "afternoon", "evening"] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 md:px-8">

        {/* ── Header ──────────────────────────────────── */}
        <div className="mb-10">
          <p
            className="text-caption mb-2 tracking-[0.2em]"
            style={{ color: "var(--color-sand)" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="font-display text-3xl md:text-4xl font-light mb-2"
            style={{ color: "var(--color-parchment)" }}
          >
            {t("title")}
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {dayName} · {t("city_tokyo")} · {todayEvents.length} {t("events_count_suffix")}
          </p>
        </div>

        {/* ── After-work banner (client: time-aware) ── */}
        <div className="mb-8">
          <AfterWorkBanner
            event={afterWork}
            label={t("after_work_label")}
            subLabel={t("after_work_sub")}
            noEventLabel={t("after_work_empty")}
          />
        </div>

        {/* ── Event groups by period ─────────────────── */}
        {periodKeys.map((period) => {
          const events = groups[period];
          if (events.length === 0) return null;

          return (
            <section key={period} className="mb-10">
              <div className="flex items-baseline gap-3 mb-4">
                <h2
                  className="font-display text-lg font-light"
                  style={{ color: "var(--color-parchment)" }}
                >
                  {t(`period_${period}`)}
                </h2>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: "var(--color-muted)", opacity: 0.5 }}
                >
                  {PERIOD_LABELS[period].range}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    highlighted={event.id === afterWork?.id}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ── Map link ──────────────────────────────── */}
        <div
          className="rounded-sm px-6 py-5 flex flex-col gap-3"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(200,184,154,0.08)",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {t("map_cta_body")}
          </p>
          <Link
            href="/map"
            className="self-start text-caption tracking-[0.12em] uppercase transition-colors duration-200"
            style={{ color: "var(--color-sand)" }}
          >
            {t("map_cta_link")} →
          </Link>
        </div>

      </div>
    </div>
  );
}
