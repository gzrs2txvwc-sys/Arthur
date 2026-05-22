"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import type { TokyoWalk } from "@/lib/tokyoWalks";
import {
  getWalkTitle,
  getWalkTagline,
  getWalkDesc,
  getWalkRouteHint,
  getWalkOthersCount,
  getWalkSurfacedReason,
} from "@/lib/tokyoWalks";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface TokyoWalksWidgetProps {
  walks:     TokyoWalk[];
  condition: string;
  period:    string;
}

function WalkCard({
  walk, g, index, condition, period,
}: {
  walk: TokyoWalk; g: string; index: number;
  condition: string; period: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const title    = getWalkTitle(walk, g);
  const tagline  = getWalkTagline(walk, g);
  const desc     = getWalkDesc(walk, g);
  const route    = getWalkRouteHint(walk, g);
  const others   = getWalkOthersCount(walk.id);
  const surfaced = getWalkSurfacedReason(walk, condition, period, g);

  const othersLabel =
    g === "ja" ? `今夜 ${others} 人が歩いている`
    : g === "zh" ? `今晚 ${others} 人正在走`
    : `${others} ${others === 1 ? "person" : "people"} on this walk tonight`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.14 }}
    >
      <div style={{ borderTop: "1px solid rgba(200,148,40,0.20)" }}>
        <button
          className="walk-card-btn"
          onClick={() => setExpanded((p) => !p)}
        >
          <div style={{ paddingTop: "20px", paddingBottom: expanded ? "6px" : "20px" }}>

            {/* Surfaced reason — why the city chose this tonight */}
            {surfaced && (
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: "rgba(210,152,38,0.72)",
                }}
              >
                {surfaced}
              </p>
            )}

            {/* Route hint (when no surfaced reason, or alongside it) */}
            {!surfaced && (walk.time || route) && (
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(210,152,38,0.72)",
                }}
              >
                {[walk.time, route].filter(Boolean).join("  ·  ")}
              </p>
            )}

            {/* Walk title */}
            <h3
              className="font-display font-light leading-tight mb-2"
              style={{
                fontSize: "19px",
                color: "rgba(242,232,215,0.97)",
                letterSpacing: "0.01em",
              }}
            >
              {title}
            </h3>

            {/* Tagline */}
            <p
              style={{
                fontSize: "13px",
                color: "rgba(220,205,182,0.65)",
                lineHeight: 1.65,
                fontStyle: "italic",
              }}
            >
              {tagline}
            </p>
          </div>
        </button>
      </div>

      {/* Expanded description */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/* Route hint in expanded state if there was a surfaced reason above */}
            {surfaced && (walk.time || route) && (
              <p
                className="font-mono mt-2 mb-0"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(200,148,40,0.52)",
                }}
              >
                {[walk.time, route].filter(Boolean).join("  ·  ")}
              </p>
            )}

            <p
              style={{
                fontSize: "13px",
                color: "rgba(215,200,176,0.62)",
                lineHeight: 1.85,
                paddingTop: "14px",
                paddingBottom: "16px",
              }}
            >
              {desc}
            </p>

            {/* Others count */}
            <div className="flex items-center gap-2" style={{ paddingBottom: "20px" }}>
              <span className="live-dot" style={{ width: 4, height: 4 }} />
              <p
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.16em",
                  color: "rgba(210,152,38,0.62)",
                }}
              >
                {othersLabel}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TokyoWalksWidget({ walks, condition, period }: TokyoWalksWidgetProps) {
  const locale = useLocale();
  const g      = getLocaleGroup(locale);

  if (walks.length === 0) return null;

  const sectionLabel =
    g === "ja" ? "今夜の散歩"
    : g === "zh" ? "今晚散步"
    : "WALKS TONIGHT";

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      style={{ maxWidth: 340 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="live-dot" />
        <p
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(210,152,38,0.82)",
          }}
        >
          {sectionLabel}
        </p>
      </div>

      {walks.map((walk, i) => (
        <WalkCard
          key={walk.id}
          walk={walk}
          g={g}
          index={i}
          condition={condition}
          period={period}
        />
      ))}
    </motion.section>
  );
}
