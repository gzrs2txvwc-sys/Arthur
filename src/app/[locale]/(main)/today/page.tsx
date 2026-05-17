import { getMessages, getTranslations } from "next-intl/server";
import { getPicksForDay } from "@/lib/dailyPicks";
import { DailyPickCard } from "@/components/today/DailyPickCard";
import { FilmGrain } from "@/components/ui/FilmGrain";
import Link from "next/link";

const DAY_NAMES_EN = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
] as const;

function tokyoDayIndex(): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
  const tokyoMs = Date.now() + 9 * 60 * 60 * 1000;
  return new Date(tokyoMs).getUTCDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

type PickMessages = Record<string, { title: string; hook: string; body: string }>;

export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations("today");
  const messages = await getMessages();
  // Access pick editorial copy via raw messages to avoid dynamic-key TS issues
  const pickMessages = (
    (messages as Record<string, unknown>).today as Record<string, unknown>
  )?.picks as PickMessages | undefined ?? {} as PickMessages;

  const dayIndex = tokyoDayIndex();
  const picks = getPicksForDay(dayIndex);
  const dayName = DAY_NAMES_EN[dayIndex];

  const eventCopy = pickMessages[picks.event.id] ?? {
    title: picks.event.id,
    hook: "",
    body: "",
  };
  const taskCopy = pickMessages[picks.task.id] ?? {
    title: picks.task.id,
    hook: "",
    body: "",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24">
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      <div className="max-w-xl mx-auto px-5 md:px-8">

        {/* ── Header ─────────────────────────────────── */}
        <header className="mb-12">
          <p
            className="text-[9px] font-mono tracking-[0.25em] uppercase mb-3"
            style={{ color: "var(--color-muted)", opacity: 0.5 }}
          >
            {dayName} · Tokyo
          </p>
          <h1
            className="font-display text-3xl md:text-4xl font-light leading-tight mb-4"
            style={{ color: "var(--color-parchment)" }}
          >
            {t("title")}
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-muted)", opacity: 0.6 }}
          >
            {t("tagline")}
          </p>

          {/* Divider */}
          <div
            className="mt-8"
            style={{
              height: "1px",
              background: "linear-gradient(to right, rgba(200,184,154,0.15), transparent)",
            }}
          />
        </header>

        {/* ── Today's Event ──────────────────────────── */}
        <section className="mb-16">
          <DailyPickCard
            pick={picks.event}
            typeLabel={t("event_label")}
            title={eventCopy.title}
            hook={eventCopy.hook}
            body={eventCopy.body}
          />
        </section>

        {/* ── Section divider ────────────────────────── */}
        <div
          className="mb-14"
          style={{
            height: "1px",
            background: "rgba(200,184,154,0.08)",
          }}
        />

        {/* ── Today's Task ───────────────────────────── */}
        <section className="mb-16">
          <DailyPickCard
            pick={picks.task}
            typeLabel={t("task_label")}
            title={taskCopy.title}
            hook={taskCopy.hook}
            body={taskCopy.body}
          />
        </section>

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
