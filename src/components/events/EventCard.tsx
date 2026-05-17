import type { DailyEvent } from "@/lib/events";
import { eventCategoryMeta } from "@/lib/events";

interface EventCardProps {
  event: DailyEvent;
  highlighted?: boolean;
}

function formatTimeRange(start: string, end?: string): string {
  const fmt = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? "pm" : "am";
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return m === "00" ? `${display}${suffix}` : `${display}:${m}${suffix}`;
  };
  return end ? `${fmt(start)} – ${fmt(end)}` : `from ${fmt(start)}`;
}

export function EventCard({ event, highlighted = false }: EventCardProps) {
  const meta = eventCategoryMeta[event.category];

  return (
    <article
      className="flex gap-4 rounded-sm overflow-hidden transition-all duration-200"
      style={{
        background: highlighted
          ? "rgba(201,169,110,0.06)"
          : "rgba(255,255,255,0.025)",
        border: highlighted
          ? "1px solid rgba(201,169,110,0.18)"
          : "1px solid rgba(200,184,154,0.07)",
      }}
    >
      {/* Image */}
      <div className="w-24 md:w-28 flex-shrink-0 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          style={{
            filter: "saturate(0.6) contrast(1.05) brightness(0.82)",
            minHeight: "96px",
          }}
        />
        {highlighted && (
          <div
            className="absolute top-2 left-2 px-1.5 py-0.5 rounded-sm text-[9px] font-mono tracking-widest uppercase"
            style={{ background: "#C9A96E", color: "#0a0a0a" }}
          >
            Now
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 py-3 pr-4 flex flex-col justify-between min-w-0">
        {/* Category chip + time */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className="text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm"
            style={{
              background: `${meta.color}18`,
              color: meta.color,
              border: `1px solid ${meta.color}30`,
            }}
          >
            {meta.label}
          </span>
          <span
            className="text-[10px] font-mono text-right flex-shrink-0"
            style={{ color: "var(--color-muted)", letterSpacing: "0.05em" }}
          >
            {formatTimeRange(event.startTime, event.endTime)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display text-sm font-light leading-snug mb-1 truncate"
          style={{ color: "var(--color-parchment)" }}
        >
          {event.title}
        </h3>

        {/* Hook */}
        <p
          className="text-[11px] leading-relaxed line-clamp-2 mb-2"
          style={{ color: "var(--color-muted)" }}
        >
          {event.hook}
        </p>

        {/* Footer: neighborhood + price */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--color-muted)", opacity: 0.7 }}
          >
            {event.neighborhood}
          </span>
          {event.price && (
            <span
              className="text-[10px] font-mono"
              style={{ color: "var(--color-sand)", opacity: 0.85 }}
            >
              {event.price}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
