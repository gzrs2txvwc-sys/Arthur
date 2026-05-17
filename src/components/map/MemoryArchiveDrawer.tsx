"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { moodMeta, memoryPostcards } from "@/lib/mapData";
import { type ArchiveEntry, clearArchive } from "@/lib/userArchive";

interface MemoryArchiveDrawerProps {
  open: boolean;
  entries: ArchiveEntry[];
  onClose: () => void;
  onClear: () => void;
}

const CITIES = [
  { key: "tokyo",  label: "Tokyo" },
  { key: "kyoto",  label: "Kyoto" },
  { key: "osaka",  label: "Osaka" },
] as const;

function cityTotal(city: string) {
  return memoryPostcards.filter((p) => p.city === city).length;
}

export function MemoryArchiveDrawer({
  open,
  entries,
  onClose,
  onClear,
}: MemoryArchiveDrawerProps) {
  const t = useTranslations("map");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="archive-backdrop"
            className="fixed inset-0 z-[700] bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="archive-panel"
            className="fixed z-[710] top-0 bottom-0 left-0 w-full max-w-xs flex flex-col overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(10,10,16,0.99) 0%, rgba(8,8,12,0.99) 100%)",
              borderRight: "1px solid rgba(200,184,154,0.07)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-10 pb-6 border-b border-white/5 shrink-0">
              <div>
                <p className="text-caption text-[var(--color-sand)] tracking-[0.18em] mb-2">
                  {t("archive_title")}
                </p>
                <p className="font-display text-2xl font-light text-[var(--color-parchment)]">
                  {t("archive_collected", { n: entries.length })}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full
                  bg-white/5 text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                  transition-all duration-200 mt-1 shrink-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {entries.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    {t("archive_empty")}
                  </p>
                  <p className="text-caption text-[var(--color-muted)] mt-2 opacity-50">
                    {t("archive_empty_sub")}
                  </p>
                </div>
              ) : (
                <div className="px-6 py-6 space-y-8">
                  {CITIES.map(({ key: city, label }) => {
                    const collected = entries.filter((e) => e.city === city);
                    if (collected.length === 0) return null;
                    const total = cityTotal(city);
                    const pct = Math.round((collected.length / total) * 100);

                    return (
                      <div key={city}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-caption text-[var(--color-sand)] tracking-[0.18em]">
                            {label}
                          </h3>
                          <span className="text-caption text-[var(--color-muted)]">
                            {t("city_progress", { collected: collected.length, total })}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-px bg-white/5 mb-4 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, #C9A96E 0%, #E8D5A3 100%)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          />
                        </div>

                        {/* Memory list */}
                        <div className="space-y-2">
                          {collected.map((entry) => {
                            const meta = moodMeta[entry.category as keyof typeof moodMeta];
                            const date = new Date(entry.collectedAt);
                            return (
                              <div
                                key={entry.pinId}
                                className="px-4 py-3 rounded-sm border border-white/5"
                                style={{ background: "rgba(255,255,255,0.02)" }}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[5px]"
                                    style={{ background: meta?.color ?? "#C9A96E" }}
                                  />
                                  <div className="min-w-0">
                                    <p className="text-[var(--color-parchment)] text-sm leading-snug">
                                      {entry.title}
                                    </p>
                                    <p className="text-caption text-[var(--color-muted)] mt-1">
                                      {date.toLocaleDateString(undefined, {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {entries.length > 0 && (
              <div className="px-6 py-4 border-t border-white/5 shrink-0">
                <button
                  onClick={() => {
                    clearArchive();
                    onClear();
                  }}
                  className="flex items-center gap-2 text-caption text-[var(--color-muted)]
                    hover:text-red-400/80 transition-colors duration-200"
                >
                  <Trash2 size={11} />
                  Clear archive
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
