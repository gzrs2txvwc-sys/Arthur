"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { categoryMeta } from "@/lib/mapData";
import type { MapPin } from "@/lib/mapData";
import { FilmGrain } from "@/components/ui/FilmGrain";

interface UnlockOverlayProps {
  pin: MapPin | null;
  onClose: () => void;
  onCollect: (pin: MapPin) => void;
  alreadyCollected: boolean;
}

function formatCoords([lat, lng]: [number, number]): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${latDir}  ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}

export function UnlockOverlay({ pin, onClose, onCollect, alreadyCollected }: UnlockOverlayProps) {
  const t = useTranslations("map");
  const meta = pin ? categoryMeta[pin.category] : null;

  return (
    <AnimatePresence>
      {pin && meta && (
        <motion.div
          key={`unlock-${pin.id}`}
          className="fixed inset-0 z-[800] flex flex-col"
          style={{ background: "rgba(4,4,6,0.97)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={pin.imageUrl}
              alt={pin.title}
              fill
              className="object-cover"
              style={{ filter: "saturate(0.35) brightness(0.22) contrast(1.12)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#040406]/50 via-transparent to-[#040406]/95" />
          </div>

          <FilmGrain opacity={0.085} className="z-[3]" />

          {/* Header bar */}
          <motion.div
            className="relative z-10 flex items-center justify-between px-6 pt-10 pb-4"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: meta.color, boxShadow: `0 0 8px ${meta.glow}` }}
              />
              <span className="text-caption tracking-[0.22em]" style={{ color: meta.color }}>
                {t("unlock_overlay_label")}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full
                bg-white/5 text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                hover:bg-white/10 transition-all duration-200"
            >
              <X size={16} />
            </button>
          </motion.div>

          {/* Coordinate + timestamp */}
          <motion.div
            className="relative z-10 px-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <p
              className="font-mono text-[10px] tracking-[0.15em]"
              style={{ color: "#FF7400", textShadow: "0 0 8px rgba(255,90,0,0.45)", opacity: 0.65 }}
            >
              {formatCoords(pin.coordinates)}
              {pin.year && <span className="ml-4 opacity-70">· {pin.year}</span>}
            </p>
          </motion.div>

          {/* Story content */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <p className="text-caption capitalize mb-3" style={{ color: meta.color }}>
                {pin.city}
              </p>
              <h2
                className="font-display font-light text-[var(--color-parchment)] mb-3 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
              >
                {pin.title}
              </h2>
              <p className="text-[var(--color-sand)] italic mb-8 leading-relaxed text-sm md:text-base">
                {pin.subtitle}
              </p>
              <div
                className="h-px mb-8"
                style={{ background: `linear-gradient(90deg, ${meta.color}50, transparent)` }}
              />
              <p className="text-[var(--color-parchment-warm)] text-sm md:text-base leading-relaxed md:leading-loose">
                {pin.story}
              </p>
              {pin.attribution && (
                <p className="text-caption text-[var(--color-muted)] italic mt-8 pt-6 border-t border-white/5">
                  {pin.attribution}
                </p>
              )}
            </motion.div>
          </div>

          {/* Collect button */}
          <motion.div
            className="relative z-10 px-6 pb-10 pt-5 shrink-0"
            style={{
              background: "linear-gradient(to top, rgba(4,4,6,1) 0%, rgba(4,4,6,0.8) 60%, transparent 100%)",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            {alreadyCollected ? (
              <div className="flex items-center justify-center gap-2.5 py-3.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C9A96E" }} />
                <span className="text-caption tracking-[0.18em] text-[var(--color-sand)]">
                  {t("collected_label")}
                </span>
              </div>
            ) : (
              <button
                onClick={() => onCollect(pin)}
                className="w-full py-4 font-mono text-xs tracking-[0.14em] uppercase
                  transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]"
                style={{
                  background: `linear-gradient(135deg, ${meta.color}18 0%, ${meta.color}08 100%)`,
                  border: `1px solid ${meta.color}55`,
                  color: meta.color,
                  boxShadow: `0 0 28px ${meta.glow}, inset 0 1px 0 ${meta.color}20`,
                }}
              >
                {t("collect_button")}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
