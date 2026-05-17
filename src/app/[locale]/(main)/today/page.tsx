import { getMessages, getTranslations } from "next-intl/server";
import { getPicksForDay } from "@/lib/dailyPicks";
import { DailyPickCard } from "@/components/today/DailyPickCard";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { getTokyoWeather, weatherLabel, isWeatherMismatch } from "@/lib/weather";
import { tokyoDate, getDayType, getTokyoSeason, shouldPreviewTomorrow } from "@/lib/season";
import Link from "next/link";

export const revalidate = 1800; // weather cache: refresh every 30 min

const DAY_NAMES_EN = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
] as const;

type PickMessages = Record<string, {
  title: string;
  hook: string;
  body: string;
  whyToday?: string;
}>;

export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const now = Date.now();
  const tokyo = tokyoDate(now);
  const dayIndex = tokyo.getUTCDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const dayType = getDayType(tokyo);
  const season = getTokyoSeason(tokyo);
  const showTomorrow = shouldPreviewTomorrow(now);

  const [t, messages, weather] = await Promise.all([
    getTranslations("today"),
    getMessages(),
    getTokyoWeather(),
  ]);

  const pickMessages = (
    (messages as Record<string, unknown>).today as Record<string, unknown>
  )?.picks as PickMessages | undefined ?? {} as PickMessages;

  const picks = getPicksForDay(dayIndex);
  const dayName = DAY_NAMES_EN[dayIndex];

  const eventCopy = pickMessages[picks.event.id] ?? { title: picks.event.id, hook: "", body: "" };
  const taskCopy  = pickMessages[picks.task.id]  ?? { title: picks.task.id,  hook: "", body: "" };

  // Tomorrow preview (shown after 21:00 Tokyo time)
  const tomorrowIndex = ((dayIndex + 1) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const tomorrowPicks = getPicksForDay(tomorrowIndex);
  const tomorrowCopy = pickMessages[tomorrowPicks.task.id] ?? {
    title: tomorrowPicks.task.id, hook: "",
  };
  const tomorrowDayName = DAY_NAMES_EN[tomorrowIndex];

  const eventWeatherMismatch = isWeatherMismatch(picks.event.weatherSuitability, weather.condition);
  const taskWeatherMismatch  = isWeatherMismatch(picks.task.weatherSuitability, weather.condition);

  const pageTitle   = dayType === "weekday" ? t("weekday_title") : t("title");
  const pageTagline = dayType === "weekday" ? t("weekday_tagline") : t("tagline");

  const taskWeatherNote =
    taskWeatherMismatch           ? t("weather_note_mismatch") :
    weather.feeling === "cold"    ? t("weather_note_cold") :
    weather.feeling === "hot"     ? t("weather_note_hot") :
    undefined;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24">
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      <div className="max-w-xl mx-auto px-5 md:px-8">

        {/* ── Header ─────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <p
              className="text-[9px] font-mono tracking-[0.25em] uppercase"
              style={{ color: "var(--color-muted)", opacity: 0.5 }}
            >
              {dayName} · Tokyo
            </p>
            <span className="text-[9px]" style={{ color: "var(--color-muted)", opacity: 0.25 }}>·</span>
            <span
              className="text-[9px] font-mono tracking-[0.12em] capitalize"
              style={{ color: "var(--color-muted)", opacity: 0.4 }}
            >
              {season}
            </span>
            {/* Live weather chip */}
            <span
              className="ml-auto text-[9px] font-mono tracking-[0.1em] px-2 py-0.5 rounded-sm"
              style={{
                background: weather.isRaining
                  ? "rgba(91,127,166,0.12)"
                  : "rgba(168,181,160,0.09)",
                color: weather.isRaining ? "#5B7FA6" : "#A8B5A0",
                border: `1px solid ${weather.isRaining ? "rgba(91,127,166,0.2)" : "rgba(168,181,160,0.15)"}`,
              }}
            >
              {weatherLabel(weather.condition)} · {weather.temperatureC}°C
            </span>
          </div>

          <h1
            className="font-display text-3xl md:text-4xl font-light leading-tight mb-4"
            style={{ color: "var(--color-parchment)" }}
          >
            {pageTitle}
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-muted)", opacity: 0.6 }}
          >
            {pageTagline}
          </p>

          <div
            className="mt-8"
            style={{
              height: "1px",
              background: "linear-gradient(to right, rgba(200,184,154,0.15), transparent)",
            }}
          />
        </header>

        {/* ── WEEKEND: Event + Task ──────────────────── */}
        {dayType === "weekend" && (
          <>
            <section className="mb-16">
              <DailyPickCard
                pick={picks.event}
                typeLabel={t("event_label")}
                title={eventCopy.title}
                hook={eventCopy.hook}
                body={eventCopy.body}
                whyToday={eventCopy.whyToday}
                weatherNote={
                  eventWeatherMismatch ? t("weather_note_mismatch") :
                  weather.isRaining ? t("weather_note_rainy") :
                  undefined
                }
              />
            </section>

            <div className="mb-14" style={{ height: "1px", background: "rgba(200,184,154,0.08)" }} />

            <section className="mb-16">
              <DailyPickCard
                pick={picks.task}
                typeLabel={t("task_label")}
                title={taskCopy.title}
                hook={taskCopy.hook}
                body={taskCopy.body}
                whyToday={taskCopy.whyToday}
                weatherNote={taskWeatherNote}
              />
            </section>
          </>
        )}

        {/* ── WEEKDAY: One focused task ─────────────── */}
        {dayType === "weekday" && (
          <section className="mb-16">
            <DailyPickCard
              pick={picks.task}
              typeLabel={t("task_label")}
              title={taskCopy.title}
              hook={taskCopy.hook}
              body={taskCopy.body}
              whyToday={taskCopy.whyToday}
              weatherNote={taskWeatherNote}
            />
          </section>
        )}

        {/* ── 21:00 Tomorrow preview ─────────────────── */}
        {showTomorrow && (
          <>
            <div className="mb-10" style={{ height: "1px", background: "rgba(200,184,154,0.06)" }} />
            <section
              className="mb-14 rounded-sm px-6 py-6"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(200,184,154,0.06)",
              }}
            >
              <p
                className="text-[9px] font-mono tracking-[0.25em] uppercase mb-4"
                style={{ color: "var(--color-muted)", opacity: 0.35 }}
              >
                {t("preview_label")} · {tomorrowDayName}
              </p>
              <h3
                className="font-display text-xl font-light leading-snug mb-2"
                style={{ color: "var(--color-parchment)", opacity: 0.6 }}
              >
                {tomorrowCopy.title}
              </h3>
              <p
                className="text-sm italic leading-relaxed mb-5"
                style={{ color: "var(--color-sand)", opacity: 0.45 }}
              >
                {tomorrowCopy.hook}
              </p>
              <p
                className="text-[9px] font-mono tracking-[0.12em]"
                style={{ color: "var(--color-muted)", opacity: 0.28 }}
              >
                {t("preview_tagline")}
              </p>
            </section>
          </>
        )}

        {/* ── Map bridge ─────────────────────────────── */}
        <footer
          className="rounded-sm px-6 py-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(200,184,154,0.07)",
          }}
        >
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--color-muted)", opacity: 0.7 }}
          >
            {t("map_bridge")}
          </p>
          <Link
            href="/map"
            className="text-[10px] font-mono tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-100"
            style={{ color: "var(--color-sand)", opacity: 0.8 }}
          >
            {t("map_link")} →
          </Link>
        </footer>

      </div>
    </div>
  );
}
