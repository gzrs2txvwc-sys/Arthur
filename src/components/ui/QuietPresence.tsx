"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { getPresenceFragment, getFragmentText } from "@/lib/presenceFragments";

export function QuietPresence() {
  const locale = useLocale();
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const fragment = getPresenceFragment();
    setText(getFragmentText(fragment, locale));

    // Swap quietly when the 20-minute window turns
    const msUntilNextWindow =
      20 * 60 * 1000 - ((Date.now() + 9 * 3600 * 1000) % (20 * 60 * 1000));
    const t = setTimeout(() => {
      setText(getFragmentText(getPresenceFragment(), locale));
    }, msUntilNextWindow);

    return () => clearTimeout(t);
  }, [locale]);

  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.p
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.32 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 2.4 }}
          style={{
            fontSize: "12px",
            lineHeight: 1.75,
            color: "var(--color-muted)",
            letterSpacing: "0.02em",
            maxWidth: 300,
            textAlign: "center",
          }}
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
