"use client";

import { useEffect } from "react";
import { touchSession } from "@/lib/tokyoRelationship";

// Invisible component — calls touchSession on every page mount.
// Placed in the main layout so every route participates.
export function RelationshipTracker() {
  useEffect(() => {
    touchSession();
  }, []);
  return null;
}
