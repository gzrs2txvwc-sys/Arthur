"use client";

import { useEffect } from "react";
import { touchMemory } from "@/lib/tokyoMemory";
import { getChapter } from "@/lib/tokyoRelationship";
import { getTasteProfile } from "@/lib/tokyoTaste";

interface Props {
  hour: number;
}

export function TokyoMemorySync({ hour }: Props) {
  useEffect(() => {
    const taste = getTasteProfile();
    touchMemory(hour, getChapter(), taste.dominant ?? undefined);
  }, [hour]);
  return null;
}
