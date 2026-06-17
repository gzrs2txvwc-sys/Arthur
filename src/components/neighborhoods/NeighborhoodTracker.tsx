"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { recordNeighborhoodVisit } from "@/lib/tokyoRelationship";

// Fires once on mount — records this neighborhood visit in the relationship
// store so the taste profile and chapter inference can use it.
export function NeighborhoodTracker({ slug }: { slug: string }) {
  useEffect(() => {
    recordNeighborhoodVisit(slug);
    track("neighborhood_view", { slug });
  }, [slug]);
  return null;
}
