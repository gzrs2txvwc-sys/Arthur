"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { TonightSignal } from "@/lib/tonightSignals";
import { getSignalMapsUrl } from "@/lib/tonightSignals";

interface SignalFeedProps {
  signals: TonightSignal[];
}

// Type-appropriate dot colors
const TYPE_COLORS: Record<TonightSignal["type"], string> = {
  jazz:   "#C8962A", // amber
  market: "#7A9E7E", // sage green
  food:   "#C4A882", // warm sand
  art:    "#7A92A8", // blue-grey
  bar:    "#A07420", // dark amber
  popup:  "#82A882", // sage
  film:   "#6A8AAC", // cool blue
  book:   "#9A8870", // muted warm
};

// Stable hash of a string to a non-negative integer
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Displayed time offset per signal: (idHash % 18) + i * 16 minutes behind current Tokyo time
function signalOffsetMinutes(id: string, index: number): number {
  return (hashString(id) % 18) + index * 16;
}

function tokyoNow(): Date {
  return new Date(Date.now() + 9 * 3600 * 1000);
}

function formatTime(date: Date, offsetMinutes: number): string {
  const ms = date.getTime() - offsetMinutes * 60 * 1000;
  const d = new Date(ms);
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function SignalFeed({ signals }: SignalFeedProps) {
  const locale = useLocale();
  const isJa = locale === "ja";

  const [now, setNow] = useState<Date>(tokyoNow);

  useEffect(() => {
    const id = setInterval(() => setNow(tokyoNow()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (signals.length === 0) return null;

  return (
    <section>
      {/* Section header */}
      <p
        className="text-[9px] font-mono tracking-[0.25em] uppercase mb-8"
        style={{ color: "var(--color-muted)", opacity: 0.38 }}
      >
        {isJa ? "東京の今夜" : "TONIGHT IN TOKYO"}
      </p>

      <div className="flex flex-col">
        {signals.map((signal, i) => {
          const time = formatTime(now, signalOffsetMinutes(signal.id, i));
          const neighborhood = isJa ? signal.neighborhood : signal.neighborhoodEn;
          const observation = isJa ? signal.observation : signal.observationEn;
          const stationLine = isJa
            ? `${signal.station}駅 · 徒歩 ${signal.walkMinutes} 分`
            : `${signal.stationEn} · ${signal.walkMinutes} min walk`;
          const mapsLabel = isJa ? "地図 →" : "map →";
          const mapsUrl = getSignalMapsUrl(signal);
          const dotColor = TYPE_COLORS[signal.type];

          return (
            <motion.div
              key={signal.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              {/* Signal block */}
              <div className="py-5">
                {/* Time + neighborhood line */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    style={{
                      display: "inline-block",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: dotColor,
                      flexShrink: 0,
                      opacity: 0.75,
                    }}
                  />
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      color: "var(--color-muted)",
                      opacity: 0.45,
                    }}
                  >
                    {time} · {neighborhood}
                  </p>
                </div>

                {/* Observation text */}
                <p
                  className="font-display font-light leading-relaxed mb-4"
                  style={{
                    fontSize: "1rem",
                    color: "var(--color-parchment)",
                    opacity: 0.82,
                  }}
                >
                  {observation}
                </p>

                {/* Station + maps */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: "var(--color-muted)",
                      opacity: 0.45,
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
                    {mapsLabel}
                  </a>
                </div>
              </div>

              {/* Divider (not after last item) */}
              {i < signals.length - 1 && (
                <div
                  style={{
                    height: "1px",
                    background: "rgba(200,184,154,0.07)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
