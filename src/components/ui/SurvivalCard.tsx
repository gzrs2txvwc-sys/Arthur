"use client";

import type { SurvivalTruth, SurvivalUrgency } from "@/lib/community";

const urgencyColors: Record<SurvivalUrgency, string> = {
  "day-one":   "#e85d4a",
  "week-one":  "#c9a96e",
  "month-one": "#7AADCA",
  "ongoing":   "#888077",
};

interface SurvivalCardProps {
  truth: SurvivalTruth;
  urgencyLabel: string;
}

export function SurvivalCard({ truth, urgencyLabel }: SurvivalCardProps) {
  const color = urgencyColors[truth.urgency];
  const urgency = { label: urgencyLabel, color };

  return (
    <article
      className="relative group"
      style={{
        padding: "28px 28px 28px 24px",
        borderLeft: `2px solid ${urgency.color}`,
        background: "rgba(255,255,255,0.018)",
        backdropFilter: "blur(8px)",
        transition: "background 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.032)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.018)";
      }}
    >
      {/* Number + urgency row */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-mono"
          style={{ fontSize: "11px", letterSpacing: "0.08em", color: urgency.color, opacity: 0.7 }}
        >
          {String(truth.number).padStart(2, "0")}
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "9px",
            letterSpacing: "0.14em",
            color: urgency.color,
            padding: "3px 8px",
            border: `1px solid ${urgency.color}40`,
            borderRadius: "1px",
          }}
        >
          {urgency.label}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display font-light text-[var(--color-parchment)] leading-snug mb-3"
        style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)" }}
      >
        {truth.title}
      </h3>

      {/* Hook */}
      <p
        className="text-[var(--color-sand)] italic leading-snug mb-4"
        style={{ fontSize: "0.82rem" }}
      >
        {truth.hook}
      </p>

      {/* Divider */}
      <div
        className="mb-4"
        style={{
          height: "1px",
          background: `linear-gradient(90deg, ${urgency.color}30, transparent)`,
        }}
      />

      {/* Body */}
      <p
        className="text-[var(--color-muted)] leading-relaxed"
        style={{ fontSize: "0.825rem" }}
      >
        {truth.body}
      </p>
    </article>
  );
}
