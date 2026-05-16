"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Map as LeafletMap } from "leaflet";
import { mapPins, categoryMeta } from "@/lib/mapData";
import type { MapPin, PinCategory } from "@/lib/mapData";
import { MapFilters } from "./MapFilters";
import { PinStory } from "./PinStory";
import { MapAtmosphere } from "./MapAtmosphere";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { AmbientSoundscape } from "./AmbientSoundscape";

const JapanMap = dynamic(() => import("./JapanMap"), {
  ssr: false,
  loading: () => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-[var(--color-sand)]/30 animate-pulse" />
          <p className="text-caption text-[var(--color-muted)]">Loading map…</p>
        </div>
      </div>
    );
  },
});

export function MapExperience() {
  const t = useTranslations("map");
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [activeCategory, setActiveCategory] = useState<PinCategory | "all">("all");
  const [introGone, setIntroGone] = useState(false);

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
      {!introGone && (
        <motion.div
          className="absolute inset-0 z-[900] bg-[#0a0a0a] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          onAnimationComplete={() => setIntroGone(true)}
        />
      )}

      <div className="absolute inset-0 z-0">
        <JapanMap
          selectedPin={selectedPin}
          activeCategory={activeCategory}
          onPinSelect={handlePinSelect}
          onMapReady={handleMapReady}
        />
      </div>

      <MapAtmosphere mapRef={mapRef} />
      <div className="map-depth-haze" />
      <div className="map-scanlines" />
      <FilmGrain opacity={0.06} className="z-[6]" />
      <div className="map-vignette" />

      <div className="absolute top-0 left-0 right-0 z-[450] pt-20 px-4 md:px-8">
        <div className="mb-5 max-w-lg">
          <p className="text-caption text-[var(--color-sand)] mb-1 tracking-[0.2em]">
            {t("subtitle")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-[var(--color-parchment)]">
            {t("title")}
          </h1>
        </div>

        <MapFilters
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />
      </div>

      <div className="absolute bottom-24 right-4 md:right-8 z-[450]">
        <AmbientSoundscape />
      </div>

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
          {t("memories_count", { n: visiblePins.length })}
          {activeCategory !== "all" && (
            <span className="ml-2 opacity-60">
              · {t(`category_${activeCategory as "memory"}`)}
            </span>
          )}
        </div>

        {!selectedPin && (
          <p className="text-caption text-[var(--color-muted)] opacity-60 hidden md:block">
            {t("click_pin")}
          </p>
        )}
      </div>

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
