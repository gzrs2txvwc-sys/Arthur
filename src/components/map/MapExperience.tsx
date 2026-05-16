"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Map as LeafletMap } from "leaflet";
import { mapPins, categoryMeta } from "@/lib/mapData";
import type { MapPin, PinCategory, PinState } from "@/lib/mapData";
import { haversineDistance, getPinState, UNLOCK_RADIUS } from "@/lib/geoProximity";
import { getArchive, addToArchive } from "@/lib/userArchive";
import type { ArchiveEntry } from "@/lib/userArchive";
import { MapFilters } from "./MapFilters";
import { PinStory } from "./PinStory";
import { MapAtmosphere } from "./MapAtmosphere";
import { UnlockOverlay } from "./UnlockOverlay";
import { MemoryArchiveDrawer } from "./MemoryArchiveDrawer";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { AmbientSoundscape } from "./AmbientSoundscape";

const JapanMap = dynamic(() => import("./JapanMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-[var(--color-sand)]/30 animate-pulse" />
        <p className="text-caption text-[var(--color-muted)]">Loading map…</p>
      </div>
    </div>
  ),
});

type GeoMode = "off" | "gps" | "simulation";

export function MapExperience() {
  const t = useTranslations("map");

  // ── Browse state ──────────────────────────────────
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [activeCategory, setActiveCategory] = useState<PinCategory | "all">("all");
  const [introGone, setIntroGone] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null) as { current: LeafletMap | null };

  // ── Geo / exploration state ───────────────────────
  const [geoMode, setGeoMode] = useState<GeoMode>("off");
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());
  const [archiveEntries, setArchiveEntries] = useState<ArchiveEntry[]>([]);
  const [unlockTarget, setUnlockTarget] = useState<MapPin | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // Load archive on mount
  useEffect(() => {
    const entries = getArchive();
    setArchiveEntries(entries);
    setCollectedIds(new Set(entries.map((e) => e.pinId)));
  }, []);

  // Cleanup GPS watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ── Computed pin states (only when geo is active) ─
  const pinStates = useMemo((): Record<string, PinState> => {
    if (geoMode === "off") return {};
    const states: Record<string, PinState> = {};
    mapPins.forEach((pin) => {
      states[pin.id] = getPinState(
        userPosition,
        pin.coordinates,
        collectedIds.has(pin.id)
      );
    });
    return states;
  }, [geoMode, userPosition, collectedIds]);

  // ── Unlockable count for display ──────────────────
  const unlockableCount = useMemo(
    () =>
      Object.values(pinStates).filter((s) => s === "unlocked" || s === "nearby").length,
    [pinStates]
  );

  // ── Visible pins for browse navigation ───────────
  const visiblePins = useMemo(
    () => (activeCategory === "all" ? mapPins : mapPins.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const selectedIndex = selectedPin
    ? visiblePins.findIndex((p) => p.id === selectedPin.id)
    : -1;

  const handleMapReady = useCallback((map: LeafletMap) => {
    mapRef.current = map;
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex < visiblePins.length - 1) setSelectedPin(visiblePins[selectedIndex + 1]);
  }, [selectedIndex, visiblePins]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedPin(visiblePins[selectedIndex - 1]);
  }, [selectedIndex, visiblePins]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: mapPins.length };
    (Object.keys(categoryMeta) as PinCategory[]).forEach((cat) => {
      c[cat] = mapPins.filter((p) => p.category === cat).length;
    });
    return c;
  }, []);

  // ── Pin select handler (geo-aware) ────────────────
  const handlePinSelect = useCallback(
    (pin: MapPin) => {
      if (geoMode === "off") {
        setSelectedPin(pin);
        return;
      }
      const state = pinStates[pin.id] ?? "locked";
      if (state === "unlocked" || state === "collected") {
        setUnlockTarget(pin);
      }
      // locked / nearby: silently ignore (must physically walk there)
    },
    [geoMode, pinStates]
  );

  // ── Collect a memory ──────────────────────────────
  const handleCollect = useCallback((pin: MapPin) => {
    const entry: ArchiveEntry = {
      pinId: pin.id,
      collectedAt: new Date().toISOString(),
      city: pin.city,
      title: pin.title,
      category: pin.category,
    };
    addToArchive(entry);
    const updated = getArchive();
    setArchiveEntries(updated);
    setCollectedIds(new Set(updated.map((e) => e.pinId)));
    setUnlockTarget(null);
  }, []);

  // ── GPS enable ────────────────────────────────────
  const enableGPS = useCallback(() => {
    if (!navigator.geolocation) return;
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );
    watchIdRef.current = id;
    setGeoMode("gps");
    setSelectedPin(null);
  }, []);

  // ── Simulation mode ───────────────────────────────
  const enableSimulation = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoMode("simulation");
    setSelectedPin(null);
  }, []);

  const handleSimulationClick = useCallback((latlng: [number, number]) => {
    setUserPosition(latlng);
  }, []);

  // ── Exit geo ──────────────────────────────────────
  const disableGeo = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoMode("off");
    setUserPosition(null);
  }, []);

  // ── Archive helpers ───────────────────────────────
  const handleArchiveClear = useCallback(() => {
    setArchiveEntries([]);
    setCollectedIds(new Set());
  }, []);

  // ── Nearest unlockable pin distance ──────────────
  const nearestDistance = useMemo(() => {
    if (!userPosition || geoMode === "off") return null;
    let min = Infinity;
    mapPins.forEach((pin) => {
      if (collectedIds.has(pin.id)) return;
      const d = haversineDistance(userPosition, pin.coordinates);
      if (d < min) min = d;
    });
    return min === Infinity ? null : min;
  }, [userPosition, geoMode, collectedIds]);

  const isSimulation = geoMode === "simulation";
  const isGPSOn = geoMode === "gps";

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
          pinStates={pinStates}
          userPosition={userPosition}
          simulationMode={isSimulation}
          onSimulationClick={handleSimulationClick}
        />
      </div>

      <MapAtmosphere mapRef={mapRef} />
      <div className="map-depth-haze" />
      <div className="map-scanlines" />
      <FilmGrain opacity={0.06} className="z-[6]" />
      <div className="map-vignette" />

      {/* ── Title + filters ─────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-[450] pt-20 px-4 md:px-8">
        <div className="mb-5 max-w-lg">
          <p className="text-caption text-[var(--color-sand)] mb-1 tracking-[0.2em]">
            {t("subtitle")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-[var(--color-parchment)]">
            {t("title")}
          </h1>
        </div>
        <MapFilters active={activeCategory} onChange={setActiveCategory} counts={counts} />
      </div>

      {/* ── Soundscape ──────────────────────────── */}
      <div className="absolute bottom-24 right-4 md:right-8 z-[450]">
        <AmbientSoundscape />
      </div>

      {/* ── Bottom-left status bar ──────────────── */}
      <div className="absolute bottom-6 left-4 md:left-8 z-[450] flex flex-col gap-2 items-start">
        {/* Memory count + archive toggle */}
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-sm text-caption text-[var(--color-muted)]"
            style={{
              background: "rgba(10,10,10,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200,184,154,0.08)",
            }}
          >
            {geoMode !== "off" && unlockableCount > 0
              ? t("memories_count", { n: unlockableCount }) + " " + t("nearby_label")
              : t("memories_count", { n: visiblePins.length })}
            {activeCategory !== "all" && (
              <span className="ml-2 opacity-60">
                · {t(`category_${activeCategory as "memory"}`)}
              </span>
            )}
          </div>

          {/* Archive button */}
          <button
            onClick={() => setArchiveOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-sm text-caption
              text-[var(--color-muted)] hover:text-[var(--color-parchment)]
              transition-colors duration-200"
            style={{
              background: "rgba(10,10,10,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200,184,154,0.08)",
            }}
          >
            {archiveEntries.length > 0 && (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono"
                style={{ background: "#C9A96E", color: "#0a0a0a" }}
              >
                {archiveEntries.length}
              </span>
            )}
            {t("archive_open")}
          </button>
        </div>

        {/* Geo controls */}
        <div className="flex items-center gap-2">
          {geoMode === "off" ? (
            <>
              <button
                onClick={enableSimulation}
                className="px-3 py-1.5 rounded-sm text-caption text-[var(--color-muted)]
                  hover:text-[var(--color-parchment)] transition-colors duration-200"
                style={{
                  background: "rgba(10,10,10,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,184,154,0.08)",
                }}
              >
                {t("use_simulation")}
              </button>
              <button
                onClick={enableGPS}
                className="px-3 py-1.5 rounded-sm text-caption transition-colors duration-200"
                style={{
                  background: "rgba(78,205,196,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(78,205,196,0.25)",
                  color: "#4ECDC4",
                }}
              >
                {t("enable_gps")}
              </button>
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-caption"
                style={{
                  background: isSimulation
                    ? "rgba(201,169,110,0.1)"
                    : "rgba(78,205,196,0.1)",
                  border: isSimulation
                    ? "1px solid rgba(201,169,110,0.3)"
                    : "1px solid rgba(78,205,196,0.3)",
                  color: isSimulation ? "#C9A96E" : "#4ECDC4",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "currentColor" }} />
                {isSimulation
                  ? userPosition
                    ? t("simulation_active")
                    : t("simulation_hint")
                  : t("enable_gps")}
              </div>
              {isSimulation && !userPosition && (
                <span className="text-caption text-[var(--color-muted)] opacity-60 hidden md:block">
                  {t("simulation_hint")}
                </span>
              )}
              {userPosition && nearestDistance !== null && (
                <span className="text-caption text-[var(--color-muted)] hidden md:block">
                  {nearestDistance < UNLOCK_RADIUS
                    ? t("unlock_available")
                    : `${Math.round(nearestDistance)}m to nearest`}
                </span>
              )}
              <button
                onClick={disableGeo}
                className="px-3 py-1.5 rounded-sm text-caption text-[var(--color-muted)]
                  hover:text-[var(--color-parchment)] transition-colors duration-200"
                style={{
                  background: "rgba(10,10,10,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,184,154,0.08)",
                }}
              >
                {t("exit_geo")}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Browse click hint (only in browse mode) ─ */}
      {geoMode === "off" && !selectedPin && (
        <div className="absolute bottom-6 right-20 z-[450] hidden md:block">
          <p className="text-caption text-[var(--color-muted)] opacity-60">
            {t("click_pin")}
          </p>
        </div>
      )}

      {/* ── PinStory (browse mode only) ─────────── */}
      {geoMode === "off" && (
        <PinStory
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedIndex < visiblePins.length - 1}
          hasPrev={selectedIndex > 0}
        />
      )}

      {/* ── Unlock overlay (geo mode) ───────────── */}
      <UnlockOverlay
        pin={unlockTarget}
        onClose={() => setUnlockTarget(null)}
        onCollect={handleCollect}
        alreadyCollected={unlockTarget ? collectedIds.has(unlockTarget.id) : false}
      />

      {/* ── Archive drawer ──────────────────────── */}
      <MemoryArchiveDrawer
        open={archiveOpen}
        entries={archiveEntries}
        onClose={() => setArchiveOpen(false)}
        onClear={handleArchiveClear}
      />
    </div>
  );
}
