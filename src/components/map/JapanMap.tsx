"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memoryPostcards, moodMeta, mapCenter, mapDefaultZoom } from "@/lib/mapData";
import type { MemoryPostcard, FragmentMood, PinState } from "@/lib/mapData";

// ── Fly-to helper ──────────────────────────────────
function MapController({ selected }: { selected: MemoryPostcard | null }) {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      map.flyTo(selected.coordinates, Math.max(map.getZoom(), 13), {
        duration: 1.4,
        easeLinearity: 0.3,
      });
    }
  }, [selected, map]);
  return null;
}

// ── Map instance bridge ────────────────────────────
function MapInstanceBridge({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

// ── Simulation click handler ───────────────────────
function SimulationClickHandler({
  enabled,
  onMapClick,
}: {
  enabled: boolean;
  onMapClick: (latlng: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      if (enabled) onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// ── User position marker ───────────────────────────
function UserMarker({ position }: { position: [number, number] }) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const icon = L.divIcon({
      className: "",
      html: `<div class="user-location-marker">
        <div class="user-location-marker__ring"></div>
        <div class="user-location-marker__dot"></div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    if (markerRef.current) {
      markerRef.current.setLatLng(position);
      markerRef.current.setIcon(icon);
    } else {
      markerRef.current = L.marker(position, { icon, zIndexOffset: 2000 }).addTo(map);
    }

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
    };
  }, [position, map]);

  return null;
}

// ── Pin icon factory ───────────────────────────────
function createPinIcon(
  mood: FragmentMood,
  isActive: boolean,
  state: PinState,
  geoModeOn: boolean,
  entering = false
) {
  const { color, glow } = moodMeta[mood];
  const isCollected = state === "collected";
  const isUnlocked = state === "unlocked";
  const isNearby = state === "nearby";
  const isLocked = geoModeOn && state === "locked";

  const dotColor = isCollected ? "#C9A96E" : color;
  const dotGlow = isCollected ? "rgba(201,169,110,0.55)" : glow;

  const cls = [
    "map-pin",
    isLocked ? "map-pin--locked" : "",
    isNearby ? "map-pin--nearby" : "",
    isUnlocked ? "map-pin--unlocked" : "",
    isCollected ? "map-pin--collected" : "",
    isActive ? "map-pin--active" : "",
    entering ? "map-pin--entering" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return L.divIcon({
    className: "",
    html: `<div class="${cls}" style="--pin-color:${dotColor};--pin-glow:${dotGlow}">
      <div class="map-pin__pulse"></div>
      <div class="map-pin__pulse-2"></div>
      <div class="map-pin__ring"></div>
      <div class="map-pin__dot"></div>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

const TILE_URLS = {
  dark:  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
} as const;

// ── Props ──────────────────────────────────────────
interface JapanMapProps {
  selected: MemoryPostcard | null;
  activeMood: FragmentMood | "all";
  onSelect: (postcard: MemoryPostcard) => void;
  onMapReady?: (map: L.Map) => void;
  pinStates?: Record<string, PinState>;
  userPosition?: [number, number] | null;
  simulationMode?: boolean;
  onSimulationClick?: (latlng: [number, number]) => void;
  tileStyle?: "dark" | "light";
}

export default function JapanMap({
  selected,
  activeMood,
  onSelect,
  onMapReady,
  pinStates = {},
  userPosition,
  simulationMode = false,
  onSimulationClick,
  tileStyle = "dark",
}: JapanMapProps) {
  const markersRef = useRef<Record<string, L.Marker>>({});
  const geoModeOn = Object.keys(pinStates).length > 0;

  const visible =
    activeMood === "all"
      ? memoryPostcards
      : memoryPostcards.filter((p) => p.mood === activeMood);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapDefaultZoom}
      zoomControl={false}
      scrollWheelZoom
      style={{
        height: "100%",
        width: "100%",
        cursor: simulationMode ? "crosshair" : undefined,
      }}
    >
      <TileLayer
        key={tileStyle}
        url={TILE_URLS[tileStyle]}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      <MapController selected={selected} />
      {onMapReady && <MapInstanceBridge onMapReady={onMapReady} />}
      <ZoomControl />

      <SimulationClickHandler
        enabled={simulationMode}
        onMapClick={onSimulationClick ?? (() => {})}
      />

      {userPosition && <UserMarker position={userPosition} />}

      <PinLayer
        postcards={visible}
        selected={selected}
        markersRef={markersRef}
        onSelect={onSelect}
        pinStates={pinStates}
        geoModeOn={geoModeOn}
      />
    </MapContainer>
  );
}

// ── Zoom control ───────────────────────────────────
function ZoomControl() {
  const map = useMap();
  useEffect(() => {
    L.control.zoom({ position: "bottomright" }).addTo(map);
  }, [map]);
  return null;
}

// ── Pins layer ─────────────────────────────────────
interface PinLayerProps {
  postcards: MemoryPostcard[];
  selected: MemoryPostcard | null;
  markersRef: React.MutableRefObject<Record<string, L.Marker>>;
  onSelect: (postcard: MemoryPostcard) => void;
  pinStates: Record<string, PinState>;
  geoModeOn: boolean;
}

function PinLayer({ postcards, selected, markersRef, onSelect, pinStates, geoModeOn }: PinLayerProps) {
  const map = useMap();
  const isInitialRef = useRef(true);

  useEffect(() => {
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const entering = isInitialRef.current;
    isInitialRef.current = false;

    postcards.forEach((postcard, index) => {
      const isActive = selected?.id === postcard.id;
      const state = pinStates[postcard.id] ?? "locked";
      const icon = createPinIcon(postcard.mood, isActive, state, geoModeOn, entering);

      const marker = L.marker(postcard.coordinates, { icon })
        .addTo(map)
        .on("click", () => onSelect(postcard));

      if (entering) {
        const delay = 180 + index * 55;
        setTimeout(() => {
          marker.getElement()?.querySelector(".map-pin")?.classList.remove("map-pin--entering");
        }, delay + 650);
      }

      markersRef.current[postcard.id] = marker;
    });

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
    };
  }, [postcards, selected, map, onSelect, pinStates, geoModeOn, markersRef]);

  return null;
}
