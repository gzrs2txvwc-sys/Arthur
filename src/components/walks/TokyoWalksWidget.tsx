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
} from "@/lib/tokyoWalks";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface TokyoWalksWidgetProps {
  walks: TokyoWalk[];
}

function WalkCard({ walk, g, index }: { walk: TokyoWalk; g: string; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const title  = getWalkTitle(walk, g);
  const tagline = getWalkTagline(walk, g);
  const desc   = getWalkDesc(walk, g);
  const route  = getWalkRouteHint(walk, g);
  const others = getWalkOthersCount(walk.id);

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
      {/* Walk card border */}
      <div style={{ borderTop: "1px solid rgba(200,148,40,0.20)" }}>
        <button
          className="walk-card-btn"
          onClick={() => setExpanded((p) => !p)}
        >
          <div style={{ paddingTop: "20px", paddingBottom: expanded ? "6px" : "20px" }}>
            {/* Route hint — amber, prominent */}
            {(walk.time || route) && (
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(210,152,38,0.78)",
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
            <p
              style={{
                fontSize: "13px",
                color: "rgba(215,200,176,0.62)",
                lineHeight: 1.85,
                paddingTop: "12px",
                paddingBottom: "16px",
              }}
            >
              {desc}
            </p>

            {/* Others count — quiet live energy */}
            <div className="flex items-center gap-2 pb-20px" style={{ paddingBottom: "20px" }}>
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

export function TokyoWalksWidget({ walks }: TokyoWalksWidgetProps) {
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
      {/* Section header — live dot + label */}
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
        <WalkCard key={walk.id} walk={walk} g={g} index={i} />
      ))}
    </motion.section>
  );
}
