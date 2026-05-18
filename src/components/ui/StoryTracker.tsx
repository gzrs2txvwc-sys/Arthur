"use client";

import { useEffect } from "react";
import { logStoryRead } from "@/lib/storyMemory";
import type { FragmentMood } from "@/lib/mapData";

interface Props {
  slug:  string;
  mood:  FragmentMood;
  city:  string;
  tags:  string[];
}

// Invisible client component embedded in each story page.
// Records the read in localStorage so the map can quietly echo it later.
export function StoryTracker({ slug, mood, city, tags }: Props) {
  useEffect(() => {
    logStoryRead(slug, mood, city, tags);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
