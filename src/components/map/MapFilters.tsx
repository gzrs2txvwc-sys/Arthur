"use client";

import { categoryMeta } from "@/lib/mapData";
import type { PinCategory } from "@/lib/mapData";

interface MapFiltersProps {
  active: PinCategory | "all";
  onChange: (cat: PinCategory | "all") => void;
  counts: Record<string, number>;
}

const ALL_LABEL = "All memories";

export function MapFilters({ active, onChange, counts }: MapFiltersProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      {/* All pill */}
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
        {ALL_LABEL}
        <span className="opacity-60">{counts["all"] ?? 0}</span>
      </button>

      {/* Category pills */}
      {(Object.keys(categoryMeta) as PinCategory[]).map((cat) => {
        const { label, color } = categoryMeta[cat];
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="map-filter-pill map-filter-pill--active"
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
            {label}
            <span className="opacity-60">{counts[cat] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
