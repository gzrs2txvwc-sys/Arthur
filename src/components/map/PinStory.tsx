"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { categoryMeta } from "@/lib/mapData";
import type { MapPin } from "@/lib/mapData";
import { FilmGrain } from "@/components/ui/FilmGrain";

interface PinStoryProps {
  pin: MapPin | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

function pinTimestamp(pin: MapPin): string {
  const c = pin.id;
  const mm  = String((c.charCodeAt(0) % 11) + 1).padStart(2, "0");
  const dd  = String((c.charCodeAt(1) % 27) + 1).padStart(2, "0");
  const hh  = String(c.charCodeAt(2) % 24).padStart(2, "0");
  const min = String(c.charCodeAt(3) % 60).padStart(2, "0");
  return `${pin.year ?? "20xx"}.${mm}.${dd}  ${hh}:${min}`;
}

export function PinStory({
  pin,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: PinStoryProps) {
  const t = useTranslations("map");
  const meta = pin ? categoryMeta[pin.category] : null;

  return (
    <AnimatePresence>
      {pin && meta && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[500] bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            className="fixed z-[600] flex flex-col overflow-hidden
              bottom-0 left-0 right-0 max-h-[75dvh] rounded-t-2xl
              md:bottom-0 md:top-0 md:left-auto md:right-0 md:w-[420px]
              md:max-h-none md:rounded-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(12,12,16,0.98) 0%, rgba(10,10,10,0.99) 100%)",
              borderLeft: "1px solid rgba(200,184,154,0.08)",
              borderTop: "1px solid rgba(200,184,154,0.08)",
              backdropFilter: "blur(24px)",
            }}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${meta.color} 50%, transparent 100%)`,
                boxShadow: `0 0 18px 2px ${meta.glow}`,
                zIndex: 1,
              }}
            />

            <div className="relative h-52 md:h-64 shrink-0 overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={pin.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                >
                  <Image
                    src={pin.imageUrl}
                    alt={pin.title}
                    fill
                    className="object-cover ken-burns img-analog"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <FilmGrain opacity={0.09} className="z-[7]" />
              <div className="light-leak-el" />

              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: meta.color, boxShadow: `0 0 8px ${meta.glow}` }}
                />
                <span className="text-caption" style={{ color: meta.color }}>
                  {t(`category_${pin.category as "memory"}`)}
                </span>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                  rounded-full bg-black/50 text-[var(--color-muted)] z-10
                  hover:text-[var(--color-parchment)] hover:bg-black/80
                  transition-all duration-200 backdrop-blur-sm"
              >
                <X size={14} />
              </button>

              <div
                className="absolute bottom-4 left-4 z-10 pointer-events-none select-none font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.07em",
                  color: "#FF7400",
                  textShadow: "0 0 6px rgba(255,90,0,0.55)",
                  opacity: 0.72,
                }}
              >
                {pinTimestamp(pin)}
              </div>
            </div>

            <motion.div
              key={pin.id}
              className="flex-1 overflow-y-auto px-6 py-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="text-caption capitalize mb-2" style={{ color: meta.color }}>
                {pin.city}
              </p>

              <h2 className="font-display text-2xl font-light text-[var(--color-parchment)] mb-2 leading-snug">
                {pin.title}
              </h2>

              <p className="text-sm text-[var(--color-sand)] italic mb-6 leading-relaxed">
                {pin.subtitle}
              </p>

              <div
                className="h-px mb-6 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${meta.color}40, transparent)`,
                }}
              />

              <p className="text-[var(--color-parchment-warm)] text-sm leading-relaxed md:text-base">
                {pin.story}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {pin.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-[0.1em] uppercase
                      px-2.5 py-1 border border-white/8 text-[var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {pin.attribution && (
                <p className="text-caption text-[var(--color-muted)] italic mt-6 pt-4 border-t border-white/5">
                  {pin.attribution}
                </p>
              )}
            </motion.div>

            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between shrink-0">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="text-caption text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200
                  flex items-center gap-2"
              >
                {t("prev")}
              </button>

              <span className="text-caption text-[var(--color-muted)]">
                {t(`cat_desc_${pin.category as "memory"}`)}
              </span>

              <button
                onClick={onNext}
                disabled={!hasNext}
                className="text-caption text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200
                  flex items-center gap-2"
              >
                {t("next")} <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
