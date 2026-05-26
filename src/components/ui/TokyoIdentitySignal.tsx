"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTasteProfile, getTasteStatement } from "@/lib/tokyoTaste";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface Props {
  // Chapter-based statement from server — shown immediately, may upgrade client-side
  statement: string | null;
}

// Quiet line telling the user who they're becoming.
// Starts with chapter statement (from server cookie), upgrades to taste
// statement (from localStorage) once client mounts.
// Links to /my-tokyo.
export function TokyoIdentitySignal({ statement }: Props) {
  const locale = useLocale();
  const g      = getLocaleGroup(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [display, setDisplay] = useState<string | null>(statement);

  useEffect(() => {
    const taste = getTasteProfile();
    if (taste.dominant && taste.totalUniqueCount >= 2) {
      const s = getTasteStatement(taste.dominant, g);
      if (s) setDisplay(s);
    }
  }, [g]);

  if (!display) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut", delay: 1.0 }}
      className="flex justify-center px-6"
    >
      <Link
        href={`${prefix}/my-tokyo`}
        className="group"
        style={{ textDecoration: "none" }}
      >
        <p
          className="font-mono text-center transition-colors duration-300"
          style={{
            fontSize: "10px",
            letterSpacing: "0.10em",
            color: "rgba(200,184,154,0.38)",
            maxWidth: 320,
            lineHeight: 1.7,
          }}
        >
          {display}
        </p>
      </Link>
    </motion.div>
  );
}
