"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { getLocaleGroup } from "@/lib/tonightSignals";
import { readRelationshipStore } from "@/lib/tokyoRelationship";
import { getWeekNote } from "@/lib/tokyoWeeks";

export function WeekNote() {
  const locale = useLocale();
  const g      = getLocaleGroup(locale);

  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    const rel = readRelationshipStore();
    const n = getWeekNote(rel.anchorAnswer, rel.firstSeenAt, g);
    setNote(n);
  }, [g]);

  if (!note) return null;

  return (
    <p
      className="font-mono text-center"
      style={{
        fontSize: "9px",
        letterSpacing: "0.14em",
        color: "rgba(200,184,154,0.30)",
        lineHeight: 1.7,
      }}
    >
      {note}
    </p>
  );
}
