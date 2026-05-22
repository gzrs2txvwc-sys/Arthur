"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { getDailyNudge } from "@/lib/dailyNudge";
import { getChapter, consumeReturnSignal } from "@/lib/tokyoRelationship";
import type { AtmospherePeriod } from "@/lib/atmosphere";
import type { WeatherCondition } from "@/lib/weather";

interface DailyNudgeProps {
  period:    AtmospherePeriod;
  condition: WeatherCondition;
}

function eyebrowLabel(locale: string): string {
  if (locale === "ja" || locale.startsWith("ja")) return "今夜の一言";
  if (locale === "zh-TW" || locale.startsWith("zh")) return "今晚";
  if (locale === "ko") return "오늘 밤";
  return "TONIGHT";
}

export function DailyNudge({ period, condition }: DailyNudgeProps) {
  const [nudge, setNudge] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const chapter = getChapter();
    const { returning, gapDays } = consumeReturnSignal();
    const text = getDailyNudge(period, condition, chapter, returning, gapDays, locale);
    setNudge(text ?? null);
  }, [period, condition, locale]);

  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {/* Live eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="live-dot" />
            <span
              className="font-mono"
              style={{
                fontSize: "9px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(210,152,38,0.78)",
              }}
            >
              {eyebrowLabel(locale)}
            </span>
          </div>

          {/* Nudge text */}
          <motion.p
            className="font-display font-light text-center"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              letterSpacing: "0.01em",
              color: "rgba(238,226,208,0.82)",
              maxWidth: "28rem",
              lineHeight: 1.72,
              fontStyle: "italic",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.6 }}
          >
            {nudge}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
