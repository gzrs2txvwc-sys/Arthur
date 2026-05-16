"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapPins, categoryMeta, mapCenter, mapDefaultZoom } from "@/lib/mapData";
import type { MapPin, PinCategory, PinState } from "@/lib/mapData";

// ── Fly-to helper ──────────────────────────────────
function MapController({ selectedPin }: { selectedPin: MapPin | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPin) {
      map.flyTo(selectedPin.coordinates, Math.max(map.getZoom(), 12), {
        duration: 1.4,
        easeLinearity: 0.3,
      });
    }
  }, [selectedPin, map]);
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
      if (enabled) {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      }
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

// ── Custom pin icon factory ────────────────────────
function createPinIcon(
  category: PinCategory,
  isActive: boolean,
  state: PinState = "locked",
  geoModeOn: boolean,
  entering = false
) {
  const { color, glow } = categoryMeta[category];

  const isCollected = state === "collected";
  const isUnlocked = state === "unlocked";
  const isNearby = state === "nearby";
  const isLocked = geoModeOn && state === "locked";

  const dotColor = isCollected ? "#C9A96E" : color;
  const dotGlow = isCollected ? "rgba(201,169,110,0.55)" : glow;

  const stateClass = [
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
    html: `
      <div class="map-pin ${stateClass}"
           style="--pin-color:${dotColor};--pin-glow:${dotGlow}">
        <div class="map-pin__pulse"></div>
        <div class="map-pin__pulse-2"></div>
        <div class="map-pin__ring"></div>
        <div class="map-pin__dot"></div>
      </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

// ── Props ──────────────────────────────────────────
interface JapanMapProps {
  selectedPin: MapPin | null;
  activeCategory: PinCategory | "all";
  onPinSelect: (pin: MapPin) => void;
  onMapReady?: (map: L.Map) => void;
  pinStates?: Record<string, PinState>;
  userPosition?: [number, number] | null;
  simulationMode?: boolean;
  onSimulationClick?: (latlng: [number, number]) => void;
}

export default function JapanMap({
  selectedPin,
  activeCategory,
  onPinSelect,
  onMapReady,
  pinStates = {},
  userPosition,
  simulationMode = false,
  onSimulationClick,
}: JapanMapProps) {
  const markersRef = useRef<Record<string, L.Marker>>({});
  const geoModeOn = Object.keys(pinStates).length > 0;

  const visiblePins =
    activeCategory === "all"
      ? mapPins
      : mapPins.filter((p) => p.category === activeCategory);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapDefaultZoom}
      zoomControl={false}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", cursor: simulationMode ? "crosshair" : undefined }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      <MapController selectedPin={selectedPin} />
      {onMapReady && <MapInstanceBridge onMapReady={onMapReady} />}
      <ZoomControl />

      <SimulationClickHandler
        enabled={simulationMode}
        onMapClick={onSimulationClick ?? (() => {})}
      />

      {userPosition && <UserMarker position={userPosition} />}

      <PinLayer
        pins={visiblePins}
        selectedPin={selectedPin}
        markersRef={markersRef}
        onPinSelect={onPinSelect}
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
  pins: MapPin[];
  selectedPin: MapPin | null;
  markersRef: React.MutableRefObject<Record<string, L.Marker>>;
  onPinSelect: (pin: MapPin) => void;
  pinStates: Record<string, PinState>;
  geoModeOn: boolean;
}

function PinLayer({ pins, selectedPin, markersRef, onPinSelect, pinStates, geoModeOn }: PinLayerProps) {
  const map = useMap();
  const isInitialRef = useRef(true);

  useEffect(() => {
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const entering = isInitialRef.current;
    isInitialRef.current = false;

    pins.forEach((pin, index) => {
      const isActive = selectedPin?.id === pin.id;
      const state = pinStates[pin.id] ?? "locked";
      const icon = createPinIcon(pin.category, isActive, state, geoModeOn, entering);

      const marker = L.marker(pin.coordinates, { icon })
        .addTo(map)
        .on("click", () => onPinSelect(pin));

      if (entering) {
        const delay = 180 + index * 55;
        setTimeout(() => {
          marker.getElement()?.querySelector(".map-pin")?.classList.remove("map-pin--entering");
        }, delay + 650);
      }

      markersRef.current[pin.id] = marker;
    });

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
    };
  }, [pins, selectedPin, map, onPinSelect, pinStates, geoModeOn, markersRef]);

  return null;
}
