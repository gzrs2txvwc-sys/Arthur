"use client";

import { useMemo } from "react";
import type { DailyEvent } from "@/lib/events";
import { tokyoHour } from "@/lib/events";
import { eventCategoryMeta } from "@/lib/events";

interface AfterWorkBannerProps {
  event: DailyEvent | null;
  label: string;      // "Step outside tonight"
  subLabel: string;   // "Recommended for after school/work"
  noEventLabel: string; // "No events tonight — try the map"
}

export function AfterWorkBanner({
  event,
  label,
  subLabel,
  noEventLabel,
}: AfterWorkBannerProps) {
  const hour = useMemo(() => tokyoHour(), []);
  // Show banner from 15:00–22:00 Tokyo time
  const isAfterWorkHour = hour >= 15 && hour < 22;

  if (!isAfterWorkHour) return null;

  if (!event) {
    return (
      <div
        className="rounded-sm px-5 py-4 text-caption text-[var(--color-muted)] text-center"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(200,184,154,0.07)",
        }}
      >
        {noEventLabel}
      </div>
    );
  }

  const meta = eventCategoryMeta[event.category];

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{
        background: "rgba(78,205,196,0.05)",
        border: "1px solid rgba(78,205,196,0.2)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(78,205,196,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4ECDC4" }}
          />
          <span
            className="text-[10px] font-mono tracking-[0.15em] uppercase"
            style={{ color: "#4ECDC4" }}
          >
            {label}
          </span>
        </div>
        <span
          className="text-[9px] font-mono"
          style={{ color: "var(--color-muted)", opacity: 0.6 }}
        >
          {subLabel}
        </span>
      </div>

      {/* Event summary */}
      <div className="flex gap-4 px-5 py-4">
        <div className="flex-1 min-w-0">
          <span
            className="text-[9px] font-mono tracking-[0.12em] uppercase"
            style={{ color: meta.color }}
          >
            {meta.label}
          </span>
          <h3
            className="font-display text-base font-light mt-1 mb-1"
            style={{ color: "var(--color-parchment)" }}
          >
            {event.title}
          </h3>
          <p
            className="text-xs leading-relaxed mb-3"
            style={{ color: "var(--color-muted)" }}
          >
            {event.hook}
          </p>
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] font-mono"
              style={{ color: "var(--color-muted)", opacity: 0.7 }}
            >
              {event.neighborhood} · from {event.startTime.replace(":", "h")}
            </span>
            {event.price && (
              <span
                className="text-[10px] font-mono"
                style={{ color: "var(--color-sand)" }}
              >
                {event.price}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        <div
          className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.55) contrast(1.05) brightness(0.8)" }}
          />
        </div>
      </div>
    </div>
  );
}
