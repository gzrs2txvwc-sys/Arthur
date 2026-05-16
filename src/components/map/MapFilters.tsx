"use client";

import { useTranslations } from "next-intl";
import { categoryMeta } from "@/lib/mapData";
import type { PinCategory } from "@/lib/mapData";

interface MapFiltersProps {
  active: PinCategory | "all";
  onChange: (cat: PinCategory | "all") => void;
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

      {(Object.keys(categoryMeta) as PinCategory[]).map((cat) => {
        const { color } = categoryMeta[cat];
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
            {t(`category_${cat as "memory"}`)}
            <span className="opacity-60">{counts[cat] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
