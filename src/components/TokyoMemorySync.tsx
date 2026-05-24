"use client";

import { useEffect } from "react";
import { touchMemory } from "@/lib/tokyoMemory";

interface Props {
  hour: number;
}

export function TokyoMemorySync({ hour }: Props) {
  useEffect(() => {
    touchMemory(hour);
  }, [hour]);
  return null;
}
