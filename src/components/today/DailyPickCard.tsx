import type { DailyPickMeta } from "@/lib/dailyPicks";
import { moodMeta } from "@/lib/mapData";

interface DailyPickCardProps {
  pick: DailyPickMeta;
  typeLabel: string;  // localized "TODAY'S EVENT" / "TODAY'S TASK"
  title: string;
  hook: string;
  body: string;       // \n\n-separated paragraphs
}

function TimePrice({
  startTime,
  endTime,
  price,
}: {
  startTime?: string;
  endTime?: string;
  price?: string;
}) {
  if (!startTime && !price) return null;
  return (
    <div className="flex items-center gap-3 mt-5 flex-wrap">
      {startTime && (
        <span
          className="text-[10px] font-mono tracking-[0.1em]"
          style={{ color: "var(--color-muted)", opacity: 0.7 }}
        >
          {startTime}{endTime ? ` – ${endTime}` : ""}
        </span>
      )}
      {price && (
        <span
          className="text-[10px] font-mono tracking-[0.08em] px-2 py-0.5 rounded-sm"
          style={{
            background: "rgba(201,169,110,0.1)",
            color: "#C9A96E",
            border: "1px solid rgba(201,169,110,0.2)",
          }}
        >
          {price}
        </span>
      )}
    </div>
  );
}

// Feature card — the day's main event. Image-first, editorial text below.
function FeatureCard({ pick, typeLabel, title, hook, body }: DailyPickCardProps) {
  const mood = moodMeta[pick.mood];
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <article>
      {/* Image */}
      <div
        className="w-full overflow-hidden rounded-sm"
        style={{ aspectRatio: "16/9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pick.imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            filter: "saturate(0.55) contrast(1.08) brightness(0.78)",
          }}
        />
      </div>

      {/* Content */}
      <div className="pt-6">
        {/* Type label + neighborhood */}
        <div className="flex items-center justify-between mb-4">
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

        {/* Title */}
        <h2
          className="font-display text-2xl md:text-3xl font-light leading-tight mb-4"
          style={{ color: "var(--color-parchment)" }}
        >
          {title}
        </h2>

        {/* Hook */}
        <p
          className="text-sm md:text-base italic leading-relaxed mb-5"
          style={{ color: "var(--color-sand)", opacity: 0.9 }}
        >
          {hook}
        </p>

        {/* Mood accent line */}
        <div
          className="w-8 mb-5"
          style={{ height: "1px", background: mood.color, opacity: 0.4 }}
        />

        {/* Editorial body */}
        <div className="flex flex-col gap-4">
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

        <TimePrice
          startTime={pick.startTime}
          endTime={pick.endTime}
          price={pick.price}
        />
      </div>
    </article>
  );
}

// Task card — personal exploration mission. More text-forward, intimate.
function TaskCard({ pick, typeLabel, title, hook, body }: DailyPickCardProps) {
  const mood = moodMeta[pick.mood];
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <article
      className="rounded-sm overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(200,184,154,0.07)",
      }}
    >
      {/* Image strip */}
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: "21/9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pick.imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            filter: "saturate(0.5) contrast(1.06) brightness(0.72)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Type label */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-1 h-1 rounded-full flex-shrink-0"
            style={{ background: mood.color }}
          />
          <span
            className="text-[9px] font-mono tracking-[0.2em] uppercase"
            style={{ color: mood.color }}
          >
            {typeLabel}
          </span>
          <span
            className="text-[9px] font-mono"
            style={{ color: "var(--color-muted)", opacity: 0.4 }}
          >
            · {pick.neighborhood}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-display text-xl md:text-2xl font-light leading-snug mb-3"
          style={{ color: "var(--color-parchment)" }}
        >
          {title}
        </h2>

        {/* Hook */}
        <p
          className="text-sm italic leading-relaxed mb-4"
          style={{ color: "var(--color-sand)", opacity: 0.85 }}
        >
          {hook}
        </p>

        {/* Body */}
        <div className="flex flex-col gap-3">
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

        <TimePrice price={pick.price} />
      </div>
    </article>
  );
}

export function DailyPickCard(props: DailyPickCardProps) {
  return props.pick.type === "event"
    ? <FeatureCard {...props} />
    : <TaskCard {...props} />;
}
