"use client";

import { useTranslations } from "next-intl";
import { moodMeta } from "@/lib/mapData";
import type { FragmentMood } from "@/lib/mapData";

interface MapFiltersProps {
  active: FragmentMood | "all";
  onChange: (mood: FragmentMood | "all") => void;
  counts: Record<string, number>;
}

export function MapFilters({ active, onChange, counts }: MapFiltersProps) {
  const t = useTranslations("map");

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        onClick={() => onChange("all")}
        className="map-filter-pill"
        style={
          active === "all"
            ? { background: "var(--color-sand)", color: "var(--color-ink)" }
            : {}
        }
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: active === "all" ? "var(--color-ink)" : "var(--color-muted)" }}
        />
        {t("all_memories")}
        <span className="opacity-60">{counts["all"] ?? 0}</span>
      </button>

      {(Object.keys(moodMeta) as FragmentMood[]).map((mood) => {
        const { color } = moodMeta[mood];
        const isActive = active === mood;
        return (
          <button
            key={mood}
            onClick={() => onChange(mood)}
            className="map-filter-pill"
            style={
              isActive
                ? { background: color, color: "#0a0a0a", borderColor: "transparent" }
                : { color: "var(--color-muted)" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isActive ? "#0a0a0a" : color }}
            />
            {t(`mood_${mood as "solitude"}`)}
            <span className="opacity-60">{counts[mood] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
