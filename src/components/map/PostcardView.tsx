"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { moodMeta } from "@/lib/mapData";
import { getDriftLine } from "@/lib/moodThread";
import type { MemoryPostcard } from "@/lib/mapData";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { getNeighborhoodCount } from "@/lib/visitLog";

const STATIC_EXITS = [
  { label: "Tonight",    href: "/today",   color: "#7B8DB3" },
  { label: "Daily Life", href: "/living",  color: "#A8B5A0" },
] as const;

interface NearbyHint {
  postcard: MemoryPostcard;
  distanceM: number;
}

function walkingMinutes(distanceM: number): string {
  const mins = Math.round(distanceM / 80);
  if (mins < 2) return "2 min walk";
  if (mins < 60) return `${mins} min walk`;
  return `${(distanceM / 1000).toFixed(1)} km`;
}

interface PostcardViewProps {
  postcard: MemoryPostcard | null;
  mode: "browse" | "unlock";
  onClose: () => void;
  onCollect?: (postcard: MemoryPostcard) => void;
  alreadyCollected?: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  nearbyPostcards?: NearbyHint[];
  onSelectNearby?: (postcard: MemoryPostcard) => void;
}

// Deterministic subtle rotation per postcard id
function cardRotation(id: string): number {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const steps = [-1.6, -1.0, -0.5, 0, 0, 0.5, 1.0, 1.6];
  return steps[hash % steps.length];
}

function formatCoords([lat, lng]: [number, number]): string {
  return `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? "N" : "S"}  ${Math.abs(lng).toFixed(4)}°${lng >= 0 ? "E" : "W"}`;
}

const TIME_LABELS: Record<string, string> = {
  dawn: "dawn", morning: "morning", afternoon: "afternoon",
  evening: "evening", night: "night", latenight: "late night",
};

const WEATHER_LABELS: Record<string, string> = {
  rain: "rain", clear: "clear", overcast: "overcast",
  fog: "fog", humid: "humid", cold: "cold",
};

export function PostcardView({
  postcard,
  mode,
  onClose,
  onCollect,
  alreadyCollected = false,
  hasNext = false,
  hasPrev = false,
  onNext,
  onPrev,
  nearbyPostcards = [],
  onSelectNearby,
}: PostcardViewProps) {
  const t = useTranslations("map");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const meta = postcard ? moodMeta[postcard.mood] : null;
  const rotation = useMemo(() => (postcard ? cardRotation(postcard.id) : 0), [postcard]);
  const familiarityCount = useMemo(
    () => (postcard ? getNeighborhoodCount(postcard.neighborhood ?? postcard.city) : 0),
    [postcard],
  );

  return (
    <AnimatePresence>
      {postcard && meta && (
        <>
          {/* Backdrop */}
          <motion.div
            key="postcard-backdrop"
            className="fixed inset-0 z-[600] bg-black/70"
            style={{ backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Card container — centered */}
          <div className="fixed inset-0 z-[610] flex items-center justify-center px-4 py-6 pointer-events-none">
            <motion.div
              key={`postcard-${postcard.id}`}
              className="pointer-events-auto w-full flex flex-col"
              style={{ maxWidth: 360 }}
              initial={{ opacity: 0, y: 28, rotate: rotation - 2 }}
              animate={{ opacity: 1, y: 0, rotate: rotation }}
              exit={{ opacity: 0, y: 16, rotate: rotation + 1.5, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
            >
              {/* ── Image section ───────────────────────────── */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4 / 3",
                  background: "#0a0a0a",
                  boxShadow: "0 2px 0 rgba(255,255,255,0.06)",
                }}
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={postcard.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={postcard.imageUrl}
                      alt={postcard.imageAlt}
                      fill
                      className="object-cover postcard-img"
                      sizes="360px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Gradient fade to text section */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20"
                  style={{ background: "linear-gradient(to top, var(--bg-elevated), transparent)" }}
                />
                <FilmGrain opacity={0.07} className="z-[4]" />

                {/* Mood badge — top left */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: meta.color, boxShadow: `0 0 6px ${meta.glow}` }}
                  />
                  <span
                    className="text-[10px] font-mono tracking-[0.14em] uppercase"
                    style={{ color: meta.color }}
                  >
                    {t(`mood_${postcard.mood as "solitude"}`)}
                  </span>
                </div>

                {/* Coordinates — bottom left */}
                <div className="absolute bottom-3 left-3 z-10">
                  <p
                    className="font-mono text-[9px] tracking-[0.1em]"
                    style={{ color: "#FF7400", opacity: 0.6, textShadow: "0 0 6px rgba(255,90,0,0.4)" }}
                  >
                    {formatCoords(postcard.coordinates)}
                  </p>
                </div>

                {/* Year — bottom right */}
                {postcard.year && (
                  <div className="absolute bottom-3 right-3 z-10">
                    <p
                      className="font-mono text-[9px] tracking-[0.1em]"
                      style={{ color: "#FF7400", opacity: 0.5 }}
                    >
                      {postcard.year}
                    </p>
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center
                    rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-black/75
                    transition-all duration-150"
                >
                  <X size={13} />
                </button>
              </div>

              {/* ── Text section ────────────────────────────── */}
              <div
                className="flex flex-col"
                style={{
                  background: "var(--bg-elevated)",
                  borderTop: `1px solid ${meta.color}22`,
                }}
              >
                {/* Context chips */}
                <div className="flex items-center gap-2 px-4 pt-3 pb-0 flex-wrap">
                  {postcard.streetHint && (
                    <span className="text-[10px] font-mono text-[var(--color-muted)] opacity-60 capitalize">
                      {postcard.streetHint}
                    </span>
                  )}
                  {(postcard.timeOfDay || postcard.weather) && (
                    <span className="text-[10px] font-mono text-[var(--color-muted)] opacity-40">
                      {[
                        postcard.timeOfDay ? TIME_LABELS[postcard.timeOfDay] : null,
                        postcard.weather ? WEATHER_LABELS[postcard.weather] : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </div>

                {/* Caption */}
                <div className="px-4 pt-3">
                  <p
                    className="font-display font-light leading-snug text-[var(--color-parchment)]"
                    style={{ fontSize: "1.05rem" }}
                  >
                    {postcard.caption}
                  </p>
                </div>

                {/* Memory text — scrollable */}
                <div
                  className="px-4 pt-3 pb-0 overflow-y-auto"
                  style={{ maxHeight: 160 }}
                >
                  {postcard.memory.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[var(--color-muted)] text-[13px] leading-relaxed mb-3 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Attribution */}
                {postcard.author && (
                  <p className="px-4 pt-2 text-[11px] font-mono text-[var(--color-muted)] opacity-40">
                    — {postcard.author}
                  </p>
                )}

                {/* Footprint — quiet anonymous presence */}
                {postcard.footprint && (
                  <p className="px-4 pt-1 text-[9px] font-mono tracking-[0.12em]"
                    style={{ color: "var(--color-muted)", opacity: 0.22 }}>
                    {postcard.footprint}
                  </p>
                )}

                {/* District familiarity — appears after 3+ visits to this neighborhood */}
                {familiarityCount >= 3 && (
                  <p className="px-4 pt-1 text-[9px] font-mono tracking-[0.12em]"
                    style={{ color: "var(--color-muted)", opacity: 0.28 }}>
                    {familiarityCount >= 7
                      ? "You know this part of the city well."
                      : "This neighborhood is becoming familiar."}
                  </p>
                )}

                {/* ── Action row ──────────────────────────── */}
                <div
                  className="px-4 py-4 mt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {/* Prev / Next (browse mode) */}
                  {mode === "browse" && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={onPrev}
                        disabled={!hasPrev}
                        className="text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                          disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                          disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}

                  {/* Spacer in browse mode */}
                  {mode === "browse" && <div className="flex-1" />}

                  {/* Collect / collected (unlock mode) */}
                  {mode === "unlock" && (
                    alreadyCollected ? (
                      <div className="flex items-center gap-2 w-full justify-center py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A96E" }} />
                        <span className="text-[11px] font-mono tracking-[0.14em] text-[var(--color-sand)]">
                          {t("collected_label")}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onCollect?.(postcard)}
                        className="w-full py-2.5 text-[11px] font-mono tracking-[0.14em] uppercase
                          transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          background: `linear-gradient(135deg, ${meta.color}18, ${meta.color}08)`,
                          border: `1px solid ${meta.color}50`,
                          color: meta.color,
                          boxShadow: `0 0 20px ${meta.glow}`,
                        }}
                      >
                        {t("collect_button")}
                      </button>
                    )
                  )}

                  {/* Browse mode: "go here to collect" hint */}
                  {mode === "browse" && (
                    <span className="text-[10px] font-mono text-[var(--color-muted)] opacity-40 text-right">
                      {alreadyCollected
                        ? t("collected_label")
                        : t("browse_collect_hint")}
                    </span>
                  )}
                </div>

                {/* ── Nearby walking hints (browse mode) ── */}
                {mode === "browse" && nearbyPostcards.length > 0 && (
                  <div
                    className="px-4 pt-3 pb-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    {nearbyPostcards.map(({ postcard: nearby, distanceM }) => {
                      const nearbyMoodColor = moodMeta[nearby.mood].color;
                      return (
                        <button
                          key={nearby.id}
                          onClick={() => onSelectNearby?.(nearby)}
                          className="w-full text-left flex items-center gap-2 py-1 transition-opacity duration-200 hover:opacity-80"
                          style={{ opacity: 0.28 }}
                        >
                          <span
                            className="font-mono"
                            style={{ fontSize: "9px", color: "var(--color-muted)" }}
                          >
                            ↳
                          </span>
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: nearbyMoodColor }}
                          />
                          <span
                            className="font-mono tracking-[0.1em]"
                            style={{ fontSize: "9px", color: "var(--color-muted)" }}
                          >
                            {(nearby.neighborhood ?? nearby.city).toUpperCase()}
                          </span>
                          <span
                            className="font-mono"
                            style={{ fontSize: "9px", color: "var(--color-muted)", opacity: 0.6 }}
                          >
                            · {walkingMinutes(distanceM)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Drift line + world exits ──────────── */}
                <div
                  className="px-4 pb-4 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
                >
                  {/* Mood-specific atmospheric pull */}
                  <p
                    className="italic mb-3"
                    style={{
                      fontSize: "10px",
                      color: "var(--color-muted)",
                      opacity: 0.3,
                      lineHeight: 1.5,
                    }}
                  >
                    {getDriftLine(postcard.mood, postcard.id.charCodeAt(0))}
                  </p>
                  <div className="flex items-center gap-5">
                  {/* Stories link — city-filtered */}
                  <Link
                    href={`${prefix}/moments`}
                    className="flex items-center gap-1 transition-opacity duration-150 hover:opacity-100"
                    style={{
                      fontSize: "9px",
                      fontFamily: "var(--font-mono, monospace)",
                      letterSpacing: "0.16em",
                      color: "#C9A96E",
                      opacity: 0.4,
                    }}
                  >
                    Stories →
                  </Link>
                  {STATIC_EXITS.map(({ label, href, color }) => (
                    <Link
                      key={href}
                      href={`${prefix}${href}`}
                      className="flex items-center gap-1 transition-opacity duration-150 hover:opacity-100"
                      style={{
                        fontSize: "9px",
                        fontFamily: "var(--font-mono, monospace)",
                        letterSpacing: "0.16em",
                        color,
                        opacity: 0.4,
                      }}
                    >
                      {label} →
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
