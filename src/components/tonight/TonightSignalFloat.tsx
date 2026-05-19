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

function pulseLabel(g: string): string {
  const h = String(tokyoNow().getUTCHours()).padStart(2, "0");
  if (g === "ja") return `${h}:00 のシグナル`;
  if (g === "zh") return `${h}:00 訊號`;
  return `signal at ${h}:00`;
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

  // Live clock
  useEffect(() => {
    setTime(formatTime(tokyoNow()));
    const tick = setInterval(() => setTime(formatTime(tokyoNow())), 60_000);
    return () => clearInterval(tick);
  }, []);

  // Delayed entrance
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 4500);
    return () => clearTimeout(t);
  }, []);

  // Poll for signal changes every 5 minutes
  const refresh = useCallback(async () => {
    const fresh = await fetchSignal();
    if (!fresh) return;
    if (fresh.id !== lastSignalId.current) {
      lastSignalId.current = fresh.id;
      // Flash glow, then swap content
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

  const g           = getLocaleGroup(locale);
  const venueName   = getSignalVenueName(signal, g);
  const neighborhood = getSignalNeighborhood(signal, g);
  const primaryText = getSignalCrowdReason(signal, g) ?? getSignalLimitedItem(signal, g);
  const pulse       = pulseLabel(g);

  return (
    <>
      <AnimatePresence>
        {shown && !detailOpen && (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.3 } }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              bottom: 28,
              left: 28,
              zIndex: 40,
              maxWidth: 230,
              cursor: "pointer",
            }}
            onClick={() => setDetailOpen(true)}
          >
            {/* Breathing / pulse glow */}
            <motion.div
              animate={pulsing ? {
                boxShadow: [
                  "0 0 18px rgba(200,150,42,0.05), 0 4px 20px rgba(0,0,0,0.38)",
                  "0 0 52px rgba(200,150,42,0.28), 0 4px 20px rgba(0,0,0,0.38)",
                  "0 0 18px rgba(200,150,42,0.05), 0 4px 20px rgba(0,0,0,0.38)",
                ],
              } : {
                boxShadow: [
                  "0 0 18px rgba(200,150,42,0.05), 0 4px 20px rgba(0,0,0,0.38)",
                  "0 0 36px rgba(200,150,42,0.13), 0 4px 20px rgba(0,0,0,0.38)",
                ],
                opacity: [0.78, 0.96],
              }}
              transition={pulsing ? {
                duration: 0.8,
                ease: "easeInOut",
              } : {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                background: "rgba(16, 11, 6, 0.86)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(200,150,42,0.1)",
                borderRadius: "2px",
                padding: "14px 16px 13px",
              }}
            >
              {/* Pulse label — "signal at HH:00" */}
              <p
                className="font-mono mb-1"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.22em",
                  color: "rgba(200,150,42,0.36)",
                  textTransform: "uppercase",
                }}
              >
                {pulse}
              </p>

              {/* Time · neighborhood */}
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: "rgba(200,184,154,0.45)",
                }}
              >
                {time ?? "–:––"} · {neighborhood}
              </p>

              {/* Venue name */}
              <p
                className="font-display font-light mb-2 leading-tight"
                style={{
                  fontSize: "13px",
                  color: "rgba(230,220,200,0.92)",
                  letterSpacing: "0.01em",
                }}
              >
                {venueName}
              </p>

              {/* Primary text */}
              {primaryText && (
                <p
                  className="font-sans leading-snug"
                  style={{
                    fontSize: "11px",
                    color: "rgba(200,184,154,0.62)",
                    lineHeight: 1.5,
                  }}
                >
                  {primaryText}
                </p>
              )}
            </motion.div>

            {/* Dismiss */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
              }}
              className="absolute -top-2 -right-2 flex items-center justify-center transition-opacity hover:opacity-100"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(30,22,14,0.9)",
                border: "1px solid rgba(200,150,42,0.15)",
                color: "rgba(200,184,154,0.4)",
                fontSize: "9px",
                opacity: 0.7,
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
