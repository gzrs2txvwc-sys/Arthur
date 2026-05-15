"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { worlds, paths } from "@/lib/worlds";
import type { PathId } from "@/lib/worlds";

export interface PathTranslations {
  student: { label: string; description: string };
  work: { label: string; description: string };
  travel: { label: string; description: string };
  lost: { label: string; description: string };
  culture: { label: string; description: string };
  recommended: string;
}

interface PathSelectorProps {
  locale: string;
  labelText: string;
  titleText: string;
  subtitleText: string;
  pathTranslations: PathTranslations;
}

export function PathSelector({
  locale,
  labelText,
  titleText,
  subtitleText,
  pathTranslations,
}: PathSelectorProps) {
  const [selected, setSelected] = useState<PathId | null>(null);

  const selectedPath = selected ? paths.find((p) => p.id === selected) : null;
  const recommendedWorlds = selectedPath
    ? selectedPath.worldIds
        .map((id) => worlds.find((w) => w.id === id))
        .filter(Boolean)
    : [];

  function getPathLabel(id: PathId): string {
    return pathTranslations[id].label;
  }

  function getPathDesc(id: PathId): string {
    return pathTranslations[id].description;
  }

  return (
    <div>
      {/* Header */}
      <p className="text-caption text-[var(--color-sand)] mb-3 tracking-[0.2em]">
        {labelText}
      </p>
      <h2 className="text-display-lg text-[var(--color-parchment)] mb-2">
        {titleText}
      </h2>
      <p className="text-[var(--color-muted)] mb-10 text-sm leading-relaxed max-w-xl">
        {subtitleText}
      </p>

      {/* Path cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {paths.map((path) => {
          const isSelected = selected === path.id;
          return (
            <button
              key={path.id}
              onClick={() => setSelected(isSelected ? null : path.id)}
              className="flex-shrink-0 text-left"
              style={{
                width: "200px",
                padding: "20px 18px",
                borderLeft: `2px solid ${isSelected ? path.color : "rgba(200,184,154,0.12)"}`,
                background: isSelected
                  ? `linear-gradient(135deg, ${path.color}12, ${path.color}06)`
                  : "rgba(255,255,255,0.02)",
                boxShadow: isSelected ? `0 0 24px ${path.color}20` : "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderLeftColor = `${path.color}60`;
                  el.style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderLeftColor = "rgba(200,184,154,0.12)";
                  el.style.background = "rgba(255,255,255,0.02)";
                }
              }}
            >
              <span className="block text-2xl mb-3" aria-hidden="true">
                {path.icon}
              </span>
              <p
                className="font-display font-light leading-snug mb-2"
                style={{
                  fontSize: "1rem",
                  color: isSelected ? path.color : "var(--color-parchment)",
                  transition: "color 0.2s",
                }}
              >
                {getPathLabel(path.id)}
              </p>
              <p
                className="text-[var(--color-muted)] leading-snug"
                style={{ fontSize: "0.72rem" }}
              >
                {getPathDesc(path.id)}
              </p>
              {isSelected && (
                <div
                  className="mt-4 flex items-center gap-1"
                  style={{ fontSize: "9px", letterSpacing: "0.1em", color: path.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: path.color }} />
                  ▸
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Recommended worlds strip */}
      {selectedPath && recommendedWorlds.length > 0 && (
        <div className="mt-10">
          <p
            className="text-caption mb-5"
            style={{ color: selectedPath.color, opacity: 0.75 }}
          >
            {pathTranslations.recommended}
          </p>

          <div
            className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {recommendedWorlds.map((world) => {
              if (!world) return null;
              const href = locale === "en" ? world.path : `/${locale}${world.path}`;
              return (
                <Link
                  key={world.id}
                  href={href}
                  className="flex-shrink-0 relative overflow-hidden block group"
                  style={{ width: "220px", height: "150px" }}
                >
                  <Image
                    src={world.imageUrl}
                    alt={world.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "saturate(0.65) brightness(0.45)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <span
                      className="font-mono uppercase mb-1"
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.12em",
                        color: selectedPath.color,
                        opacity: 0.8,
                      }}
                    >
                      {world.category}
                    </span>
                    <p
                      className="font-display font-light text-[var(--color-parchment)] leading-snug"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {world.title}
                    </p>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `1px solid ${selectedPath.color}40` }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
