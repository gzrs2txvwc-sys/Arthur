"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import type { Map as LeafletMap } from "leaflet";
import { mapPins, categoryMeta } from "@/lib/mapData";
import type { MapPin, PinCategory } from "@/lib/mapData";
import { MapFilters } from "./MapFilters";
import { PinStory } from "./PinStory";
import { MapAtmosphere } from "./MapAtmosphere";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { AmbientSoundscape } from "./AmbientSoundscape";

// Leaflet cannot run on the server
const JapanMap = dynamic(() => import("./JapanMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border border-[var(--color-sand)]/30
            animate-pulse"
        />
        <p className="text-caption text-[var(--color-muted)]">Loading map…</p>
      </div>
    </div>
  ),
});

interface MapExperienceProps {
  title: string;
  subtitle: string;
}

export function MapExperience({ title, subtitle }: MapExperienceProps) {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [activeCategory, setActiveCategory] = useState<PinCategory | "all">("all");
  const [introGone, setIntroGone] = useState(false);

  // Ref to receive the Leaflet map instance from JapanMap
  const mapRef = useRef<LeafletMap | null>(null) as { current: LeafletMap | null };

  const handleMapReady = useCallback((map: LeafletMap) => {
    mapRef.current = map;
  }, [mapRef]);

  const visiblePins = useMemo(
    () =>
      activeCategory === "all"
        ? mapPins
        : mapPins.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const selectedIndex = selectedPin
    ? visiblePins.findIndex((p) => p.id === selectedPin.id)
    : -1;

  const handlePinSelect = useCallback((pin: MapPin) => {
    setSelectedPin(pin);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex < visiblePins.length - 1) {
      setSelectedPin(visiblePins[selectedIndex + 1]);
    }
  }, [selectedIndex, visiblePins]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedPin(visiblePins[selectedIndex - 1]);
    }
  }, [selectedIndex, visiblePins]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: mapPins.length };
    (Object.keys(categoryMeta) as PinCategory[]).forEach((cat) => {
      c[cat] = mapPins.filter((p) => p.category === cat).length;
    });
    return c;
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a0a]">
      {/* ── Cinematic intro overlay ────────────────── */}
      {!introGone && (
        <motion.div
          className="absolute inset-0 z-[900] bg-[#0a0a0a] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          onAnimationComplete={() => setIntroGone(true)}
        />
      )}

      {/* ── Map ───────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <JapanMap
          selectedPin={selectedPin}
          activeCategory={activeCategory}
          onPinSelect={handlePinSelect}
          onMapReady={handleMapReady}
        />
      </div>

      {/* ── Atmospheric city halos ────────────────── */}
      <MapAtmosphere mapRef={mapRef} />

      {/* Cinematic depth layers */}
      <div className="map-depth-haze" />
      <div className="map-scanlines" />

      {/* Film grain — above canvas, below UI */}
      <FilmGrain opacity={0.06} className="z-[6]" />

      {/* Vignette */}
      <div className="map-vignette" />

      {/* ── Top overlay: title + filters ─────────── */}
      <div className="absolute top-0 left-0 right-0 z-[450] pt-20 px-4 md:px-8">
        {/* Header */}
        <div className="mb-5 max-w-lg">
          <p className="text-caption text-[var(--color-sand)] mb-1 tracking-[0.2em]">
            {subtitle}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-[var(--color-parchment)]">
            {title}
          </h1>
        </div>

        {/* Filters */}
        <MapFilters
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />
      </div>

      {/* ── Ambient audio toggle ──────────────────── */}
      <div className="absolute bottom-24 right-4 md:right-8 z-[450]">
        <AmbientSoundscape />
      </div>

      {/* ── Bottom overlay: pin count + hint ─────── */}
      <div
        className="absolute bottom-6 left-4 md:left-8 z-[450] flex items-center gap-4
          pointer-events-none"
      >
        <div
          className="px-4 py-2 rounded-sm text-caption text-[var(--color-muted)]"
          style={{
            background: "rgba(10,10,10,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,184,154,0.08)",
          }}
        >
          {visiblePins.length} memor{visiblePins.length === 1 ? "y" : "ies"}
          {activeCategory !== "all" && (
            <span className="ml-2 opacity-60">
              · {categoryMeta[activeCategory].label}
            </span>
          )}
        </div>

        {!selectedPin && (
          <p className="text-caption text-[var(--color-muted)] opacity-60 hidden md:block">
            Click a pin to read the story
          </p>
        )}
      </div>

      {/* ── Story panel ──────────────────────────── */}
      <PinStory
        pin={selectedPin}
        onClose={() => setSelectedPin(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex < visiblePins.length - 1}
        hasPrev={selectedIndex > 0}
      />
    </div>
  );
}
