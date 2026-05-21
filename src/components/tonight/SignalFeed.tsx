"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { TonightSignal } from "@/lib/tonightSignals";
import {
  getLocaleGroup,
  getSignalVenueName,
  getSignalNeighborhood,
  getSignalObservation,
  getSignalCrowdReason,
  getSignalLimitedItem,
  getSignalCrowdNote,
  getSignalRecentBuzz,
  getSignalStationLine,
  getSignalMapsUrl,
  getSignalApproachNote,
  getSignalApproachMinutes,
  getSignalEmotionalFit,
} from "@/lib/tonightSignals";
import { TonightSignalDetail } from "./TonightSignalDetail";

interface SignalFeedProps {
  signals: TonightSignal[];
}

function tokyoNow(): Date {
  return new Date(Date.now() + 9 * 3600 * 1000);
}

function formatTime(d: Date): string {
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function approachTimeLabel(minutes: number, g: string): string {
  if (g === "ja") return `${minutes} 分`;
  if (g === "zh") return `${minutes} 分鐘`;
  return `${minutes} minutes from here.`;
}

export function SignalFeed({ signals }: SignalFeedProps) {
  const locale = useLocale();
  const [now, setNow]           = useState<Date | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    setNow(tokyoNow());
    const id = setInterval(() => setNow(tokyoNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  const signal = signals[0];
  if (!signal) return null;

  const g            = getLocaleGroup(locale);
  const venueName    = getSignalVenueName(signal, g);
  const neighborhood = getSignalNeighborhood(signal, g);
  const observation  = getSignalObservation(signal, g);
  const crowdReason  = getSignalCrowdReason(signal, g);
  const limitedItem  = getSignalLimitedItem(signal, g);
  const crowdNote    = getSignalCrowdNote(signal, g);
  const recentBuzz   = getSignalRecentBuzz(signal, g);
  const stationLine  = getSignalStationLine(signal, g);
  const mapsUrl      = getSignalMapsUrl(signal);
  const approachNote = getSignalApproachNote(signal, g);
  const approachMins = getSignalApproachMinutes(signal);
  const emotionalFit = getSignalEmotionalFit(signal, g);

  const credentialLine = [
    signal.rating ? `${signal.rating}` : null,
    crowdNote ?? recentBuzz,
  ]
    .filter(Boolean)
    .join(" · ");

  const mapLabel = g === "ja" ? "地図 →" : g === "zh" ? "地圖 →" : "map →";

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Section eyebrow */}
        <p
          className="font-mono mb-6"
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            opacity: 0.38,
          }}
        >
          {g === "ja" ? "東京の今夜" : g === "zh" ? "東京今晚" : "TONIGHT IN TOKYO"}
        </p>

        {/* Time · neighborhood */}
        <p
          className="font-mono mb-3"
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "var(--color-muted)",
            opacity: 0.45,
          }}
        >
          {now ? formatTime(now) : "–:––"} · {neighborhood}
        </p>

        {/* Partner emotional framing — the need comes before the venue */}
        {emotionalFit && (
          <p
            className="leading-relaxed mb-3"
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              opacity: 0.55,
              lineHeight: 1.72,
              fontStyle: "italic",
            }}
          >
            {emotionalFit}
          </p>
        )}

        {/* Venue name — tappable to open detail */}
        <button
          onClick={() => setDetailOpen(true)}
          className="text-left block mb-4 transition-opacity hover:opacity-80"
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <h2
            className="font-display font-light leading-tight"
            style={{
              fontSize: "22px",
              color: "var(--color-parchment)",
              letterSpacing: "0.01em",
            }}
          >
            {venueName}
          </h2>
        </button>

        {/* Crowd reason */}
        {crowdReason && (
          <p
            className="leading-relaxed mb-3"
            style={{
              fontSize: "14px",
              color: "var(--color-parchment)",
              opacity: 0.82,
              lineHeight: 1.65,
            }}
          >
            {crowdReason}
          </p>
        )}

        {/* Observation */}
        <p
          className="leading-relaxed mb-3"
          style={{
            fontSize: "14px",
            color: "var(--color-muted)",
            opacity: 0.65,
            lineHeight: 1.65,
          }}
        >
          {observation}
        </p>

        {/* Walking approach — the city gently unfolding toward you */}
        {(approachMins || approachNote) && (
          <div className="mb-3 mt-1">
            {approachMins && (
              <p
                className="font-mono mb-1"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(200,150,42,0.42)",
                }}
              >
                {approachTimeLabel(approachMins, g)}
              </p>
            )}
            {approachNote && (
              <p
                className="font-sans leading-relaxed"
                style={{
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  opacity: 0.48,
                  lineHeight: 1.72,
                }}
              >
                {approachNote}
              </p>
            )}
          </div>
        )}

        {/* Limited item */}
        {limitedItem && (
          <p
            className="leading-relaxed mb-4"
            style={{
              fontSize: "12px",
              color: "rgba(200,170,100,0.65)",
              lineHeight: 1.6,
            }}
          >
            {limitedItem}
          </p>
        )}

        {/* Credibility whisper */}
        {credentialLine && (
          <p
            className="font-mono mb-3"
            style={{
              fontSize: "10px",
              letterSpacing: "0.06em",
              color: "var(--color-muted)",
              opacity: 0.38,
            }}
          >
            {credentialLine}
          </p>
        )}

        {/* Station + maps */}
        {stationLine && (
          <div className="flex items-center gap-3">
            <span
              className="font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.06em",
                color: "var(--color-muted)",
                opacity: 0.42,
              }}
            >
              {stationLine}
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono transition-opacity hover:opacity-100"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--color-sand)",
                opacity: 0.55,
              }}
            >
              {mapLabel}
            </a>
          </div>
        )}
      </motion.section>

      <TonightSignalDetail
        signal={signal}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
