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
  const title    = getWalkTitle(walk, g);
  const tagline  = getWalkTagline(walk, g);
  const desc     = getWalkDesc(walk, g);
  const route    = getWalkRouteHint(walk, g);
  const others   = getWalkOthersCount(walk.id);

  const othersLabel =
    g === "ja" ? `今夜 ${others} 人`
    : g === "zh" ? `今晚 ${others} 人`
    : `${others} others tonight`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.12 }}
    >
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left"
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(200,150,42,0.08)",
            paddingTop: "18px",
            paddingBottom: expanded ? "4px" : "18px",
          }}
        >
          {/* Time + route hint */}
          {(walk.time || route) && (
            <p
              className="font-mono mb-2"
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "rgba(200,150,42,0.38)",
              }}
            >
              {[walk.time, route].filter(Boolean).join("  ·  ")}
            </p>
          )}

          {/* Walk title */}
          <h3
            className="font-display font-light leading-tight mb-2"
            style={{
              fontSize: "17px",
              color: "var(--color-parchment)",
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </h3>

          {/* Tagline */}
          <p
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              opacity: 0.62,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {tagline}
          </p>
        </div>
      </button>

      {/* Expanded description */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-muted)",
                opacity: 0.52,
                lineHeight: 1.75,
                paddingTop: "10px",
                paddingBottom: "18px",
              }}
            >
              {desc}
            </p>

            {/* Others count — quiet social proof */}
            <p
              className="font-mono"
              style={{
                fontSize: "9px",
                letterSpacing: "0.16em",
                color: "rgba(200,150,42,0.28)",
                paddingBottom: "18px",
              }}
            >
              {othersLabel}
            </p>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
      style={{ maxWidth: 340 }}
    >
      {/* Eyebrow */}
      <p
        className="font-mono mb-5"
        style={{
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          opacity: 0.32,
        }}
      >
        {sectionLabel}
      </p>

      {walks.map((walk, i) => (
        <WalkCard key={walk.id} walk={walk} g={g} index={i} />
      ))}
    </motion.section>
  );
}
