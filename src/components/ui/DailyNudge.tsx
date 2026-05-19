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

// Client-side nudge component — reads chapter and return signal from localStorage,
// then selects the appropriate line. Fades in gently to avoid a hydration flash.
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
        <motion.p
          className="font-mono text-center"
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "var(--color-muted)",
            opacity: 0.28,
            maxWidth: "32rem",
            lineHeight: 1.9,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          transition={{ duration: 1.8, delay: 0.4 }}
        >
          {nudge}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
