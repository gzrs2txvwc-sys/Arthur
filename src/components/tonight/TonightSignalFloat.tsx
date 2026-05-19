"use client";

import { useState, useEffect } from "react";
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

export function TonightSignalFloat({ signal }: Props) {
  const locale = useLocale();
  const [shown, setShown] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(tokyoNow()));
    const tick = setInterval(() => setTime(formatTime(tokyoNow())), 60_000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 4500);
    return () => clearTimeout(t);
  }, []);

  if (!signal || dismissed) return null;

  const g = getLocaleGroup(locale);
  const venueName = getSignalVenueName(signal, g);
  const neighborhood = getSignalNeighborhood(signal, g);
  const primaryText = getSignalCrowdReason(signal, g) ?? getSignalLimitedItem(signal, g);

  return (
    <>
      <AnimatePresence>
        {shown && !detailOpen && (
          <motion.div
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
            {/* Breathing glow wrapper */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 18px rgba(200,150,42,0.05), 0 4px 20px rgba(0,0,0,0.38)",
                  "0 0 36px rgba(200,150,42,0.13), 0 4px 20px rgba(0,0,0,0.38)",
                ],
                opacity: [0.78, 0.96],
              }}
              transition={{
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

              {/* Primary text (crowd reason or limited item) */}
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

            {/* Dismiss button */}
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
