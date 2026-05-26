"use client";

import { useEffect } from "react";
import { recordNeighborhoodVisit } from "@/lib/tokyoRelationship";

// Fires once on mount — records this neighborhood visit in the relationship
// store so the taste profile and chapter inference can use it.
export function NeighborhoodTracker({ slug }: { slug: string }) {
  useEffect(() => {
    recordNeighborhoodVisit(slug);
  }, [slug]);
  return null;
}
