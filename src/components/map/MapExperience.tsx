"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Map as LeafletMap } from "leaflet";
import { memoryPostcards, moodMeta } from "@/lib/mapData";
import type { MemoryPostcard, FragmentMood, PinState } from "@/lib/mapData";
import { haversineDistance, getPinState, UNLOCK_RADIUS } from "@/lib/geoProximity";
import { getArchive, addToArchive } from "@/lib/userArchive";
import type { ArchiveEntry } from "@/lib/userArchive";
import { logPostcardVisit, getQuietObservation } from "@/lib/visitLog";
import { MapFilters } from "./MapFilters";
import { MapAtmosphere } from "./MapAtmosphere";
import { PostcardView } from "./PostcardView";
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

export function MapExperience({ initialPinId }: { initialPinId?: string }) {
  const t = useTranslations("map");

  // ── Browse state ──────────────────────────────────
  const [selectedPostcard, setSelectedPostcard] = useState<MemoryPostcard | null>(null);
  const [activeMood, setActiveMood] = useState<FragmentMood | "all">("all");
  const [introGone, setIntroGone] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null) as { current: LeafletMap | null };

  // ── Tokyo time (drives hidden fragment visibility) ─
  const [tokyoHour, setTokyoHour] = useState(0);
  useEffect(() => {
    const hour = () => (new Date().getUTCHours() + 9) % 24;
    setTokyoHour(hour());
    const interval = setInterval(() => setTokyoHour(hour()), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Quiet observation ──────────────────────────────
  const [observation, setObservation] = useState<string | null>(null);
  const [showObservation, setShowObservation] = useState(false);
  useEffect(() => {
    const obs = getQuietObservation();
    if (!obs) return;
    setObservation(obs);
    const t1 = setTimeout(() => setShowObservation(true), 2200);
    const t2 = setTimeout(() => setShowObservation(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Geo / exploration state ───────────────────────
  const [geoMode, setGeoMode] = useState<GeoMode>("off");
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());
  const [archiveEntries, setArchiveEntries] = useState<ArchiveEntry[]>([]);
  const [unlockTarget, setUnlockTarget] = useState<MemoryPostcard | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // Load archive on mount + auto-select pin from URL
  useEffect(() => {
    const entries = getArchive();
    setArchiveEntries(entries);
    setCollectedIds(new Set(entries.map((e) => e.pinId)));
    if (initialPinId) {
      const target = memoryPostcards.find((p) => p.id === initialPinId);
      if (target) setSelectedPostcard(target);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup GPS watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ── Pin states (computed only in geo mode) ────────
  const pinStates = useMemo((): Record<string, PinState> => {
    if (geoMode === "off") return {};
    const states: Record<string, PinState> = {};
    memoryPostcards.forEach((p) => {
      states[p.id] = getPinState(
        userPosition,
        p.coordinates,
        collectedIds.has(p.id),
        p.unlockRadius ?? UNLOCK_RADIUS
      );
    });
    return states;
  }, [geoMode, userPosition, collectedIds]);

  // ── Visible postcards (filter by mood + time visibility) ─
  const visiblePostcards = useMemo(() => {
    const isVisible = (p: MemoryPostcard) => {
      if (!p.visibility) return true;
      if (p.visibility === "night")     return tokyoHour >= 21 || tokyoHour < 6;
      if (p.visibility === "latenight") return tokyoHour >= 23 || tokyoHour < 5;
      if (p.visibility === "dawn")      return tokyoHour >= 4 && tokyoHour < 7;
      return true;
    };
    const base = activeMood === "all"
      ? memoryPostcards
      : memoryPostcards.filter((p) => p.mood === activeMood);
    return base.filter(isVisible);
  }, [activeMood, tokyoHour]);

  const selectedIndex = selectedPostcard
    ? visiblePostcards.findIndex((p) => p.id === selectedPostcard.id)
    : -1;

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: memoryPostcards.length };
    (Object.keys(moodMeta) as FragmentMood[]).forEach((mood) => {
      c[mood] = memoryPostcards.filter((p) => p.mood === mood).length;
    });
    return c;
  }, []);

  const handleMapReady = useCallback((map: LeafletMap) => {
    mapRef.current = map;
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex < visiblePostcards.length - 1)
      setSelectedPostcard(visiblePostcards[selectedIndex + 1]);
  }, [selectedIndex, visiblePostcards]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0)
      setSelectedPostcard(visiblePostcards[selectedIndex - 1]);
  }, [selectedIndex, visiblePostcards]);

  // ── Postcard select (geo-aware) ───────────────────
  const handleSelect = useCallback(
    (postcard: MemoryPostcard) => {
      logPostcardVisit(
        postcard.id,
        postcard.neighborhood ?? postcard.city,
        postcard.mood,
        tokyoHour,
      );
      if (geoMode === "off") {
        setSelectedPostcard(postcard);
        return;
      }
      const state = pinStates[postcard.id] ?? "locked";
      if (state === "unlocked" || state === "collected") {
        setUnlockTarget(postcard);
      }
      // locked / nearby: silently ignore (walk there)
    },
    [geoMode, pinStates, tokyoHour]
  );

  // ── Collect ───────────────────────────────────────
  const handleCollect = useCallback((postcard: MemoryPostcard) => {
    const entry: ArchiveEntry = {
      pinId: postcard.id,
      collectedAt: new Date().toISOString(),
      city: postcard.city,
      title: postcard.title,
      category: postcard.mood,
    };
    addToArchive(entry);
    const updated = getArchive();
    setArchiveEntries(updated);
    setCollectedIds(new Set(updated.map((e) => e.pinId)));
    setUnlockTarget(null);
  }, []);

  // ── GPS ───────────────────────────────────────────
  const enableGPS = useCallback(() => {
    if (!navigator.geolocation) return;
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    const id = navigator.geolocation.watchPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );
    watchIdRef.current = id;
    setGeoMode("gps");
    setSelectedPostcard(null);
  }, []);

  const enableSimulation = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoMode("simulation");
    setSelectedPostcard(null);
  }, []);

  const handleSimulationClick = useCallback((latlng: [number, number]) => {
    setUserPosition(latlng);
  }, []);

  const disableGeo = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoMode("off");
    setUserPosition(null);
  }, []);

  const handleArchiveClear = useCallback(() => {
    setArchiveEntries([]);
    setCollectedIds(new Set());
  }, []);

  // ── Nearest unlockable distance ───────────────────
  const nearestDistance = useMemo(() => {
    if (!userPosition || geoMode === "off") return null;
    let min = Infinity;
    memoryPostcards.forEach((p) => {
      if (collectedIds.has(p.id)) return;
      const d = haversineDistance(userPosition, p.coordinates);
      if (d < min) min = d;
    });
    return min === Infinity ? null : min;
  }, [userPosition, geoMode, collectedIds]);

  const unlockableCount = useMemo(
    () => Object.values(pinStates).filter((s) => s === "unlocked").length,
    [pinStates]
  );

  // Nearest 2 postcards to the currently selected one — powers the walking hints
  const nearbyPostcards = useMemo(() => {
    if (!selectedPostcard) return [];
    return visiblePostcards
      .filter((p) => p.id !== selectedPostcard.id)
      .map((p) => ({ postcard: p, distanceM: haversineDistance(selectedPostcard.coordinates, p.coordinates) }))
      .sort((a, b) => a.distanceM - b.distanceM)
      .slice(0, 2);
  }, [selectedPostcard, visiblePostcards]);

  const isSimulation = geoMode === "simulation";

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

      {/* ── Quiet observation ───────────────────── */}
      <AnimatePresence>
        {showObservation && observation && (
          <motion.p
            className="absolute bottom-36 left-0 right-0 text-center z-[200] pointer-events-none
              font-mono tracking-[0.18em]"
            style={{ fontSize: "10px", color: "var(--color-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.42 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
          >
            {observation}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <JapanMap
          selected={selectedPostcard}
          activeMood={activeMood}
          onSelect={handleSelect}
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
        <MapFilters active={activeMood} onChange={setActiveMood} counts={counts} />
      </div>

      {/* ── Soundscape ──────────────────────────── */}
      <div className="absolute bottom-24 right-4 md:right-8 z-[450]">
        <AmbientSoundscape />
      </div>

      {/* ── Bottom-left controls ─────────────────── */}
      <div className="absolute bottom-6 left-4 md:left-8 z-[450] flex flex-col gap-2 items-start">
        {/* Count + archive */}
        <div className="flex items-center gap-2">
          <div
            className="px-4 py-2 rounded-sm text-caption text-[var(--color-muted)]"
            style={{
              background: "rgba(10,10,10,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200,184,154,0.08)",
            }}
          >
            {geoMode !== "off" && unlockableCount > 0
              ? `${unlockableCount} ${t("unlock_available")}`
              : t("memories_count", { n: visiblePostcards.length })}
            {activeMood !== "all" && (
              <span className="ml-2 opacity-60">
                · {t(`mood_${activeMood as "solitude"}`)}
              </span>
            )}
          </div>

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
        <div className="flex items-center gap-2 flex-wrap">
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
                  background: isSimulation ? "rgba(201,169,110,0.1)" : "rgba(78,205,196,0.1)",
                  border: isSimulation
                    ? "1px solid rgba(201,169,110,0.3)"
                    : "1px solid rgba(78,205,196,0.3)",
                  color: isSimulation ? "#C9A96E" : "#4ECDC4",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "currentColor" }}
                />
                {isSimulation
                  ? userPosition
                    ? t("simulation_active")
                    : t("simulation_hint")
                  : t("enable_gps")}
              </div>
              {userPosition && nearestDistance !== null && nearestDistance > UNLOCK_RADIUS && (
                <span className="text-caption text-[var(--color-muted)] hidden md:block">
                  {`${Math.round(nearestDistance)}m`}
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

      {/* ── Postcard view (browse mode) ─────────── */}
      <PostcardView
        postcard={geoMode === "off" ? selectedPostcard : null}
        mode="browse"
        onClose={() => setSelectedPostcard(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex < visiblePostcards.length - 1}
        hasPrev={selectedIndex > 0}
        alreadyCollected={
          selectedPostcard ? collectedIds.has(selectedPostcard.id) : false
        }
        nearbyPostcards={nearbyPostcards}
        onSelectNearby={setSelectedPostcard}
      />

      {/* ── Postcard view (unlock mode) ─────────── */}
      <PostcardView
        postcard={unlockTarget}
        mode="unlock"
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
