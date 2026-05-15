"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapPins, categoryMeta, mapCenter, mapDefaultZoom } from "@/lib/mapData";
import type { MapPin, PinCategory } from "@/lib/mapData";

// ── Fly-to helper (runs inside map context) ────────
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

// ── Map instance bridge (exposes map to parent) ────
function MapInstanceBridge({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

// ── Custom div-icon factory ────────────────────────
function createPinIcon(category: PinCategory, isActive: boolean, entering = false) {
  const { color, glow } = categoryMeta[category];
  return L.divIcon({
    className: "",
    html: `
      <div class="map-pin${isActive ? " map-pin--active" : ""}${entering ? " map-pin--entering" : ""}"
           style="--pin-color:${color};--pin-glow:${glow}">
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
}

export default function JapanMap({
  selectedPin,
  activeCategory,
  onPinSelect,
  onMapReady,
}: JapanMapProps) {
  const markersRef = useRef<Record<string, L.Marker>>({});

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
      style={{ height: "100%", width: "100%" }}
    >
      {/* CartoDB Dark Matter — no API key required */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* Fly controller */}
      <MapController selectedPin={selectedPin} />

      {/* Expose map instance to parent */}
      {onMapReady && <MapInstanceBridge onMapReady={onMapReady} />}

      {/* Zoom control — bottom right */}
      <ZoomControl />

      {/* Pins */}
      <PinLayer
        pins={visiblePins}
        selectedPin={selectedPin}
        markersRef={markersRef}
        onPinSelect={onPinSelect}
      />
    </MapContainer>
  );
}

// ── Zoom control placed bottom-right ──────────────
function ZoomControl() {
  const map = useMap();
  useEffect(() => {
    L.control.zoom({ position: "bottomright" }).addTo(map);
  }, [map]);
  return null;
}

// ── Pins layer — creates/updates Leaflet markers ──
interface PinLayerProps {
  pins: MapPin[];
  selectedPin: MapPin | null;
  markersRef: React.MutableRefObject<Record<string, L.Marker>>;
  onPinSelect: (pin: MapPin) => void;
}

function PinLayer({ pins, selectedPin, markersRef, onPinSelect }: PinLayerProps) {
  const map = useMap();
  const isInitialRef = useRef(true);

  useEffect(() => {
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const entering = isInitialRef.current;
    isInitialRef.current = false;

    pins.forEach((pin, index) => {
      const isActive = selectedPin?.id === pin.id;
      const icon = createPinIcon(pin.category, isActive, entering);
      const marker = L.marker(pin.coordinates, { icon })
        .addTo(map)
        .on("click", () => onPinSelect(pin));

      if (entering) {
        // Remove entrance class after stagger delay + animation duration
        const delay = 180 + index * 55;
        setTimeout(() => {
          const el = marker.getElement()?.querySelector(".map-pin");
          if (el) el.classList.remove("map-pin--entering");
        }, delay + 650);
      }

      markersRef.current[pin.id] = marker;
    });

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
    };
  }, [pins, selectedPin, map, onPinSelect, markersRef]);

  return null;
}
