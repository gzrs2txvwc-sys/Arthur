"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ScrollIndicator() {
  const t = useTranslations("common");

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-caption text-[var(--color-muted)]">{t("scroll")}</span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-[var(--color-sand)] to-transparent"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}
