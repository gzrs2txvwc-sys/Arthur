import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPickById, getPicksForDay, getAllPickIds } from "@/lib/dailyPicks";
import { moodMeta } from "@/lib/mapData";
import { PickDetail } from "@/components/today/PickDetail";
import { WorldBridge } from "@/components/ui/WorldBridge";

export function generateStaticParams() {
  return getAllPickIds().map((id) => ({ id }));
}

type DetailMessages = Record<string, {
  title: string;
  hook: string;
  body: string;
  navigation?: string;
  atmosphere?: string;
  food?: string;
  bestTime?: string;
}>;

export default async function TodayDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const pick = getPickById(id);
  if (!pick) notFound();

  const t = await getTranslations("today");
  const messages = await getMessages();
  const pickMessages = (
    (messages as Record<string, unknown>).today as Record<string, unknown>
  )?.picks as DetailMessages | undefined ?? {} as DetailMessages;

  const copy = pickMessages[id] ?? { title: id, hook: "", body: "" };

  // The other pick of the same day
  const dayPicks = getPicksForDay(pick.dayOfWeek);
  const otherPick = pick.type === "event" ? dayPicks.task : (dayPicks.event ?? null);
  const otherCopy = otherPick ? (pickMessages[otherPick.id] ?? { title: otherPick.id, hook: "" }) : null;

  return (
    <div className="min-h-screen bg-[var(--color-ink)] pt-20 pb-24">
      <div className="max-w-xl mx-auto px-5 md:px-8">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/today"
            className="text-[9px] font-mono tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
            style={{ color: "var(--color-muted)", opacity: 0.5 }}
          >
            ← {t("back_to_today")}
          </Link>
        </div>

        <PickDetail
          pick={pick}
          typeLabel={pick.type === "event" ? t("event_label") : t("task_label")}
          title={copy.title}
          hook={copy.hook}
          body={copy.body}
          navigation={copy.navigation}
          atmosphere={copy.atmosphere}
          food={copy.food}
          bestTime={copy.bestTime}
        />

        {/* ── Also today ──────────────────────────── */}
        {otherPick && otherCopy && (
          <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(200,184,154,0.06)" }}>
            <p
              className="font-mono mb-5"
              style={{ fontSize: "9px", letterSpacing: "0.28em", color: "var(--color-muted)", opacity: 0.35 }}
            >
              ALSO TODAY IN TOKYO
            </p>
            <Link
              href={`/today/${otherPick.id}`}
              className="group flex gap-5 items-start py-5 transition-opacity hover:opacity-100"
              style={{ opacity: 0.85 }}
            >
              <div
                className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={otherPick.imageUrl}
                  alt={otherCopy.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.4) brightness(0.55) contrast(1.1)" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: moodMeta[otherPick.mood].color,
                    opacity: 0.7,
                  }}
                >
                  {otherPick.neighborhood.toUpperCase()}
                </span>
                <p
                  className="text-sm font-display font-light leading-snug"
                  style={{ color: "var(--color-parchment)" }}
                >
                  {otherCopy.title}
                </p>
                {otherCopy.hook && (
                  <p
                    className="text-xs italic leading-relaxed"
                    style={{ color: "var(--color-muted)", opacity: 0.55 }}
                  >
                    {otherCopy.hook}
                  </p>
                )}
                <span
                  className="text-[9px] font-mono mt-1 flex items-center gap-1.5 group-hover:gap-2 transition-all"
                  style={{ color: "var(--color-sand)", opacity: 0.6 }}
                >
                  See details →
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* ── World bridge ────────────────────────── */}
        <WorldBridge
          exclude="tonight"
          locale={locale}
          mood={pick.mood}
          seed={id.charCodeAt(0) % 3}
        />

      </div>
    </div>
  );
}
