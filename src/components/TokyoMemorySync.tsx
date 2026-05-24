"use client";

import { useEffect } from "react";
import { touchMemory } from "@/lib/tokyoMemory";
import { getChapter } from "@/lib/tokyoRelationship";

interface Props {
  hour: number;
}

export function TokyoMemorySync({ hour }: Props) {
  useEffect(() => {
    touchMemory(hour, getChapter());
  }, [hour]);
  return null;
}
