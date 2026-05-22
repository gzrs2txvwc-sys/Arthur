"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import type { TonightSignal } from "@/lib/tonightSignals";
import {
  getLocaleGroup,
  getSignalVenueName,
  getSignalNeighborhood,
  getSignalCrowdReason,
  getSignalLimitedItem,
  getSignalObservation,
} from "@/lib/tonightSignals";
import { TonightSignalDetail } from "./TonightSignalDetail";

interface Props {
  signal: TonightSignal | null;
}

function tokyoNow(): Date {
  return new Date(Date.now() + 9 * 3600 * 1000);
}

function formatTime(d: Date): string {
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function tonightLabel(g: string): string {
  if (g === "ja") return "今夜";
  if (g === "zh") return "今晚";
  return "TONIGHT";
}

function tapLabel(g: string): string {
  if (g === "ja") return "詳細を見る →";
  if (g === "zh") return "查看詳情 →";
  return "tap to explore →";
}

async function fetchSignal(): Promise<TonightSignal | null> {
  try {
    const res = await fetch("/api/tonight-signal", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.signal as TonightSignal) ?? null;
  } catch {
    return null;
  }
}

export function TonightSignalFloat({ signal: initialSignal }: Props) {
  const locale = useLocale();
  const [signal, setSignal]         = useState<TonightSignal | null>(initialSignal);
  const [shown, setShown]           = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dismissed, setDismissed]   = useState(false);
  const [pulsing, setPulsing]       = useState(false);
  const [time, setTime]             = useState<string | null>(null);
  const lastSignalId                = useRef<string | null>(initialSignal?.id ?? null);

  useEffect(() => {
    setTime(formatTime(tokyoNow()));
    const tick = setInterval(() => setTime(formatTime(tokyoNow())), 60_000);
    return () => clearInterval(tick);
  }, []);

  // Show sooner — first impression matters
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const refresh = useCallback(async () => {
    const fresh = await fetchSignal();
    if (!fresh) return;
    if (fresh.id !== lastSignalId.current) {
      lastSignalId.current = fresh.id;
      setPulsing(true);
      setTimeout(() => {
        setSignal(fresh);
        setPulsing(false);
      }, 400);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(refresh, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [refresh]);

  if (!signal || dismissed) return null;

  const g            = getLocaleGroup(locale);
  const venueName    = getSignalVenueName(signal, g);
  const neighborhood = getSignalNeighborhood(signal, g);
  const crowdReason  = getSignalCrowdReason(signal, g);
  const observation  = getSignalObservation(signal, g);
  const limitedItem  = getSignalLimitedItem(signal, g);
  const primaryText  = crowdReason ?? limitedItem ?? observation;
  const tonight      = tonightLabel(g);
  const tap          = tapLabel(g);

  return (
    <>
      <AnimatePresence>
        {shown && !detailOpen && (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.28 } }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              bottom: 28,
              left: 24,
              zIndex: 40,
              maxWidth: 272,
              cursor: "pointer",
            }}
            onClick={() => setDetailOpen(true)}
          >
            {/* Main card */}
            <motion.div
              animate={pulsing ? {
                boxShadow: [
                  "0 0 0 1px rgba(200,148,40,0.24), 0 8px 32px rgba(0,0,0,0.52)",
                  "0 0 0 1px rgba(200,148,40,0.60), 0 0 48px rgba(200,148,40,0.22), 0 8px 32px rgba(0,0,0,0.52)",
                  "0 0 0 1px rgba(200,148,40,0.24), 0 8px 32px rgba(0,0,0,0.52)",
                ],
              } : {
                boxShadow: [
                  "0 0 0 1px rgba(200,148,40,0.22), 0 8px 32px rgba(0,0,0,0.52), 0 0 24px rgba(180,100,10,0.08)",
                  "0 0 0 1px rgba(200,148,40,0.32), 0 8px 32px rgba(0,0,0,0.52), 0 0 48px rgba(180,100,10,0.16)",
                ],
                opacity: [0.92, 1],
              }}
              transition={pulsing ? { duration: 0.75, ease: "easeInOut" } : {
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                background: "rgba(18, 11, 4, 0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "3px",
                padding: "16px 18px 15px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left accent bar — amber vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background:
                    "linear-gradient(to bottom, rgba(210,152,38,0) 0%, rgba(210,152,38,0.85) 25%, rgba(210,152,38,0.85) 75%, rgba(210,152,38,0) 100%)",
                }}
              />

              {/* Header: live dot + TONIGHT + time */}
              <div className="flex items-center gap-2 mb-3">
                <span className="live-dot" />
                <span
                  className="font-mono"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.28em",
                    color: "rgba(210,152,38,0.90)",
                    textTransform: "uppercase",
                  }}
                >
                  {tonight}
                </span>
                <span
                  className="font-mono ml-auto"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.14em",
                    color: "rgba(200,178,148,0.44)",
                  }}
                >
                  {time ?? "–:––"}
                </span>
              </div>

              {/* Neighborhood */}
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.16em",
                  color: "rgba(200,178,148,0.52)",
                }}
              >
                {neighborhood}
              </p>

              {/* Venue name — the event anchor */}
              <p
                className="font-display font-light leading-tight mb-2"
                style={{
                  fontSize: "16px",
                  color: "rgba(240,228,210,0.97)",
                  letterSpacing: "0.01em",
                }}
              >
                {venueName}
              </p>

              {/* What's happening — the pull */}
              {primaryText && (
                <p
                  className="font-sans leading-snug mb-3"
                  style={{
                    fontSize: "12px",
                    color: "rgba(210,195,172,0.72)",
                    lineHeight: 1.55,
                  }}
                >
                  {primaryText}
                </p>
              )}

              {/* Tap label */}
              <p
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  color: "rgba(210,152,38,0.58)",
                }}
              >
                {tap}
              </p>
            </motion.div>

            {/* Dismiss */}
            <button
              onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
              className="absolute -top-2 -right-2 flex items-center justify-center transition-opacity hover:opacity-100"
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "rgba(28,18,8,0.95)",
                border: "1px solid rgba(200,148,40,0.20)",
                color: "rgba(200,178,148,0.52)",
                fontSize: "10px",
                opacity: 0.75,
                cursor: "pointer",
              }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <TonightSignalDetail
        signal={signal}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
