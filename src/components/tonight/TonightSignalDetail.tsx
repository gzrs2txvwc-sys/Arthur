"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
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
} from "@/lib/tonightSignals";

interface Props {
  signal: TonightSignal;
  open: boolean;
  onClose: () => void;
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

export function TonightSignalDetail({ signal, open, onClose }: Props) {
  const locale = useLocale();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(tokyoNow()));
    const tick = setInterval(() => setTime(formatTime(tokyoNow())), 60_000);
    return () => clearInterval(tick);
  }, []);

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

  const credentialLine = [
    signal.rating ? `${signal.rating}` : null,
    crowdNote ?? recentBuzz,
  ]
    .filter(Boolean)
    .join(" · ");

  const mapLabel = g === "ja" ? "地図 →" : g === "zh" ? "地圖 →" : "map →";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(8,5,2,0.72)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />

          {/* Card */}
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              bottom: 28,
              left: "50%",
              translateX: "-50%",
              zIndex: 51,
              width: "calc(100vw - 48px)",
              maxWidth: 360,
              background: "rgba(18, 12, 7, 0.96)",
              border: "1px solid rgba(200,150,42,0.12)",
              borderRadius: "3px",
              padding: "24px 24px 22px",
              boxShadow: "0 8px 48px rgba(0,0,0,0.6), 0 0 32px rgba(200,150,42,0.06)",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 transition-opacity hover:opacity-100"
              style={{
                color: "rgba(200,184,154,0.35)",
                fontSize: "16px",
                lineHeight: 1,
                opacity: 0.7,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px 4px",
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Time · neighborhood */}
            <p
              className="font-mono mb-4"
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "rgba(200,184,154,0.4)",
              }}
            >
              {time ?? "–:––"} · {neighborhood}
            </p>

            {/* Venue name */}
            <h2
              className="font-display font-light mb-4 leading-tight"
              style={{
                fontSize: "20px",
                color: "rgba(235,224,206,0.95)",
                letterSpacing: "0.01em",
              }}
            >
              {venueName}
            </h2>

            {/* Divider */}
            <div
              className="mb-4"
              style={{ height: "1px", background: "rgba(200,150,42,0.08)" }}
            />

            {/* Crowd reason */}
            {crowdReason && (
              <p
                className="font-sans leading-relaxed mb-3"
                style={{
                  fontSize: "13px",
                  color: "rgba(220,208,188,0.82)",
                  lineHeight: 1.65,
                }}
              >
                {crowdReason}
              </p>
            )}

            {/* Observation */}
            <p
              className="font-sans leading-relaxed mb-3"
              style={{
                fontSize: "13px",
                color: "rgba(200,184,154,0.68)",
                lineHeight: 1.65,
              }}
            >
              {observation}
            </p>

            {/* Walking approach — the city gently unfolding toward you */}
            {(approachMins || approachNote) && (
              <div className="mb-4 mt-1">
                {approachMins && (
                  <p
                    className="font-mono mb-1"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      color: "rgba(200,150,42,0.45)",
                    }}
                  >
                    {approachTimeLabel(approachMins, g)}
                  </p>
                )}
                {approachNote && (
                  <p
                    className="font-sans leading-relaxed"
                    style={{
                      fontSize: "12px",
                      color: "rgba(188,174,152,0.55)",
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
                className="font-sans leading-relaxed mb-4"
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
                  color: "rgba(200,184,154,0.35)",
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
                    color: "rgba(200,184,154,0.38)",
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
                    color: "rgba(200,164,80,0.58)",
                    opacity: 0.8,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {mapLabel}
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
